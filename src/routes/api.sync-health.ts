import { createFileRoute } from "@tanstack/react-router";
import * as fs from "fs/promises";
import * as path from "path";

const isVercel = !!process.env.VERCEL;
const SYNC_DIR = isVercel ? "/tmp" : path.join(process.cwd(), ".data", "sync");
const SYNC_FILE = path.join(SYNC_DIR, "health-sync-data.json");

// In-memory memory queue for ultra-fast serverless sync
declare global {
  var __HEALTH_SYNC_QUEUE__: any[];
}
globalThis.__HEALTH_SYNC_QUEUE__ = globalThis.__HEALTH_SYNC_QUEUE__ || [];

async function ensureDir() {
  try {
    await fs.mkdir(SYNC_DIR, { recursive: true });
  } catch (e) {}
}

function normalizeWorkoutsServer(rawWorkouts: any): any[] {
  if (!rawWorkouts) return [];

  const workoutList: any[] = [];

  const addParsedItem = (item: any) => {
    if (typeof item === "string") {
      const matches = item.match(/\{[^{}]*\}/g);
      if (matches && matches.length > 0) {
        for (const m of matches) {
          try {
            workoutList.push(JSON.parse(m));
          } catch (e) {
            workoutList.push({ type: m });
          }
        }
        return;
      }
      try {
        workoutList.push(JSON.parse(item));
      } catch (e) {
        workoutList.push({ type: item });
      }
    } else if (Array.isArray(item)) {
      for (const sub of item) addParsedItem(sub);
    } else if (item && typeof item === "object") {
      workoutList.push(item);
    }
  };

  addParsedItem(rawWorkouts);

  const results: any[] = [];

  for (const w of workoutList) {
    if (!w || typeof w !== "object") continue;

    // 1. Strict Calories extraction - NEVER fallback to distance
    let calories: number | undefined = undefined;
    const rawActiveCal = String(
      w.activeCalories ??
        w.calories ??
        w.activeEnergyBurned ??
        w.activeEnergy ??
        w.energyBurned ??
        w.totalEnergyBurned ??
        w.workoutCalories ??
        w.totalCalories ??
        w.active_calories ??
        w.active_energy_burned ??
        ""
    );
    if (rawActiveCal) {
      const numMatch = rawActiveCal.replace(",", ".").match(/(\d+(?:\.\d+)?)/);
      if (numMatch) {
        const val = Math.round(parseFloat(numMatch[1]));
        if (val > 0) calories = val;
      }
    }

    // 2. Heart Rate extraction from workout object
    let avgHeartRate: number | undefined = undefined;
    const rawHR = String(
      w.avgHeartRate ??
        w.heartRate ??
        w.averageHeartRate ??
        w.meanHeartRate ??
        w.bpm ??
        w.heartRateAvg ??
        w.avg_heart_rate ??
        w.heart_rate ??
        ""
    );
    if (rawHR) {
      const numMatch = rawHR.replace(",", ".").match(/(\d+(?:\.\d+)?)/);
      if (numMatch) {
        const val = Math.round(parseFloat(numMatch[1]));
        if (val > 0 && val < 250) avgHeartRate = val;
      }
    }

    let rawType = String(
      w.type ?? w.activityType ?? w.workoutActivityType ?? w.name ?? w.workoutType ?? w.title ?? ""
    ).trim();

    if (rawType.startsWith("{")) {
      try {
        const parsedType = JSON.parse(rawType);
        if (parsedType && typeof parsedType === "object") {
          if (parsedType.activeCalories && !calories) {
            const numMatch = String(parsedType.activeCalories).replace(",", ".").match(/(\d+(?:\.\d+)?)/);
            if (numMatch) calories = Math.round(parseFloat(numMatch[1]));
          }
          if (parsedType.avgHeartRate && !avgHeartRate) {
            const numMatch = String(parsedType.avgHeartRate).replace(",", ".").match(/(\d+(?:\.\d+)?)/);
            if (numMatch) avgHeartRate = Math.round(parseFloat(numMatch[1]));
          }
          rawType = String(parsedType.type ?? parsedType.name ?? "");
        }
      } catch (e) {}
    }

    if (rawType.includes("kcal")) {
      const kcalMatch = rawType.replace(",", ".").match(/(\d+(?:\.\d+)?)\s*kcal/i);
      if (kcalMatch && !calories) {
        const val = Math.round(parseFloat(kcalMatch[1]));
        if (val > 0) calories = val;
      }
      rawType = "";
    }

    let type = "Natation";
    const lowerType = rawType.toLowerCase();

    if (
      lowerType.includes("swim") ||
      lowerType.includes("natat") ||
      lowerType.includes("nage") ||
      lowerType.includes("hkworkoutactivitytypeswimming")
    ) {
      type = "Natation";
    } else if (
      lowerType.includes("run") ||
      lowerType.includes("cours") ||
      lowerType.includes("footing") ||
      lowerType.includes("hkworkoutactivitytyperunning")
    ) {
      type = "Course";
    } else if (
      lowerType.includes("walk") ||
      lowerType.includes("march") ||
      lowerType.includes("hkworkoutactivitytypewalking")
    ) {
      type = "Marche";
    } else if (
      lowerType.includes("cycle") ||
      lowerType.includes("velo") ||
      lowerType.includes("bike") ||
      lowerType.includes("hkworkoutactivitytypecycling")
    ) {
      type = "Cyclisme";
    } else if (rawType && !rawType.includes("{") && !rawType.includes("kcal")) {
      type = rawType;
    }

    let durationMinutes: number | undefined = undefined;
    const rawDur = Number(
      w.durationMinutes ?? w.duration ?? w.durationInMinutes ?? w.elapsedTime ?? w.totalDuration ?? 0
    );
    if (w.durationSec != null && Number(w.durationSec) > 0) {
      durationMinutes = Math.round(Number(w.durationSec) / 60);
    } else if (rawDur > 0) {
      durationMinutes = rawDur > 300 ? Math.round(rawDur / 60) : rawDur;
    }

    let distanceKm: number | undefined = undefined;
    let distanceMeters: number | undefined = undefined;

    const parseDistNum = (val: any): number | undefined => {
      if (val == null) return undefined;
      const str = String(val).trim().replace(",", ".");
      if (str.includes("kcal")) return undefined;
      const match = str.match(/(\d+(?:\.\d+)?)/);
      if (!match) return undefined;
      const num = parseFloat(match[1]);
      return num > 0 ? num : undefined;
    };

    const dMeters = parseDistNum(
      w.distanceMeters ??
        w.distanceInMeters ??
        w.swimmingDistance ??
        w.swimmingDistanceMeters ??
        w.distanceSwimming ??
        w.distanceSwimmingMeters ??
        w.HKQuantityTypeIdentifierDistanceSwimming ??
        w.HKQuantityTypeIdentifierDistanceSwimmingMeters ??
        w.distanceWalkingRunningMeters
    );
    const dKm = parseDistNum(
      w.distanceKm ??
        w.distanceInKm ??
        w.swimmingDistanceKm ??
        w.distanceSwimmingKm ??
        w.distanceWalkingRunning
    );
    const dGen = parseDistNum(w.distance ?? w.totalDistance);

    if (dMeters) {
      distanceMeters = dMeters;
      distanceKm = Number((dMeters / 1000).toFixed(2));
    } else if (dKm) {
      distanceKm = dKm;
      distanceMeters = Math.round(dKm * 1000);
    } else if (dGen) {
      if (dGen > 50) {
        distanceMeters = dGen;
        distanceKm = Number((dGen / 1000).toFixed(2));
      } else {
        distanceKm = dGen;
        distanceMeters = Math.round(dGen * 1000);
      }
    }

    results.push({
      type: type || "Natation",
      durationMinutes: durationMinutes && durationMinutes > 0 ? durationMinutes : undefined,
      distanceKm,
      distanceMeters,
      calories,
      avgHeartRate,
    });
  }

  return results;
}

async function readSyncData(): Promise<any[]> {
  const fileItems: any[] = [];
  try {
    await ensureDir();
    const raw = await fs.readFile(SYNC_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) fileItems.push(...parsed);
  } catch (error) {}

  const memQueue = globalThis.__HEALTH_SYNC_QUEUE__ || [];

  const map = new Map<string, any>();
  for (const item of fileItems) {
    if (item && typeof item === "object") {
      const key = item.date ? String(item.date).slice(0, 10) : JSON.stringify(item);
      map.set(key, item);
    }
  }
  for (const item of memQueue) {
    if (item && typeof item === "object") {
      const key = item.date ? String(item.date).slice(0, 10) : JSON.stringify(item);
      const existing = map.get(key) || {};
      map.set(key, { ...existing, ...item });
    }
  }

  const rawList = map.size > 0 ? Array.from(map.values()) : memQueue;

  return rawList.map((item) => {
    const rawWorkouts = item.workouts ?? item.health?.workouts ?? [];
    const workouts = normalizeWorkoutsServer(rawWorkouts);

    // Active Calories extraction / fallback calculation from workouts
    const rawCal =
      item.activeCalories ??
      item.health?.activeCalories ??
      item.calories ??
      item.moveCalories ??
      item.activeEnergyBurned;
    let activeCalories = rawCal != null && !isNaN(Number(rawCal)) && Number(rawCal) > 0 ? Number(rawCal) : undefined;

    if (activeCalories == null && workouts.length > 0) {
      const sumCal = workouts.reduce((acc: number, w: any) => acc + (w.calories || 0), 0);
      if (sumCal > 0) activeCalories = sumCal;
    }

    // Average Heart Rate extraction / fallback calculation from workouts
    const rawHR =
      item.avgHeartRate ??
      item.health?.avgHeartRate ??
      item.heartRate ??
      item.averageHeartRate ??
      item.meanHeartRate;
    let avgHeartRate = rawHR != null && !isNaN(Number(rawHR)) && Number(rawHR) > 0 ? Number(rawHR) : undefined;

    if (avgHeartRate == null && workouts.length > 0) {
      const hrs = workouts.map((w: any) => w.avgHeartRate).filter((hr: any): hr is number => typeof hr === "number" && hr > 0);
      if (hrs.length > 0) {
        avgHeartRate = Math.round(hrs.reduce((a: number, b: number) => a + b, 0) / hrs.length);
      }
    }

    return {
      date: item.date ?? new Date().toISOString().slice(0, 10),
      steps: item.steps ?? item.health?.steps,
      avgHeartRate,
      activeCalories,
      exerciseMinutes: item.exerciseMinutes ?? item.health?.exerciseMinutes,
      workouts,
      health: item.health
        ? {
            ...item.health,
            avgHeartRate: avgHeartRate ?? item.health.avgHeartRate,
            activeCalories: activeCalories ?? item.health.activeCalories,
            workouts,
          }
        : {
            steps: item.steps,
            avgHeartRate,
            activeCalories,
            exerciseMinutes: item.exerciseMinutes,
            workouts,
          },
    };
  });
}

async function writeSyncData(data: any[]) {
  globalThis.__HEALTH_SYNC_QUEUE__ = data;
  await ensureDir();
  try {
    await fs.writeFile(SYNC_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write health sync file:", error);
  }
}

async function mergeHealthIntoServerStates(payload: any) {
  try {
    const todayISO = new Date().toISOString().slice(0, 10);
    const rawDate = payload.date ? String(payload.date).trim() : todayISO;
    const date = rawDate.length >= 10 ? rawDate.slice(0, 10) : todayISO;

    const rawWorkouts = payload.workouts ?? payload.health?.workouts ?? [];
    const normalizedWorkouts = normalizeWorkoutsServer(rawWorkouts);

    const steps = payload.health?.steps ?? payload.steps ?? payload.stepCount;

    let avgHeartRate =
      payload.health?.avgHeartRate ??
      payload.avgHeartRate ??
      payload.heartRate ??
      payload.averageHeartRate ??
      payload.meanHeartRate;
    if (avgHeartRate == null || isNaN(Number(avgHeartRate))) {
      const hrs = normalizedWorkouts
        .map((w: any) => w.avgHeartRate)
        .filter((hr: any): hr is number => typeof hr === "number" && hr > 0);
      if (hrs.length > 0) {
        avgHeartRate = Math.round(hrs.reduce((a: number, b: number) => a + b, 0) / hrs.length);
      }
    }

    let activeCalories =
      payload.health?.activeCalories ??
      payload.activeCalories ??
      payload.calories ??
      payload.moveCalories ??
      payload.activeEnergyBurned;
    if (activeCalories == null || isNaN(Number(activeCalories))) {
      const sumCal = normalizedWorkouts.reduce((acc: number, w: any) => acc + (w.calories || 0), 0);
      if (sumCal > 0) activeCalories = sumCal;
    }

    const exerciseMinutes = payload.health?.exerciseMinutes ?? payload.exerciseMinutes ?? payload.exerciseTime ?? payload.workoutMinutes;
    const standHours = payload.health?.standHours ?? payload.standHours ?? payload.appleStandHours ?? payload.standTime;

    const dirsToSearch = [SYNC_DIR, "/tmp"];
    for (const dir of dirsToSearch) {
      try {
        const files = await fs.readdir(dir);
        for (const f of files) {
          if (f.startsWith("state-sync-") && f.endsWith(".json")) {
            const filePath = path.join(dir, f);
            try {
              const raw = await fs.readFile(filePath, "utf-8");
              const state = JSON.parse(raw);
              if (state && typeof state === "object") {
                state.days = state.days || {};
                const day = state.days[date] || { checked: {} };
                day.health = {
                  ...day.health,
                  steps: steps != null ? Number(steps) : day.health?.steps,
                  avgHeartRate: avgHeartRate != null ? Number(avgHeartRate) : day.health?.avgHeartRate,
                  activeCalories: activeCalories != null ? Number(activeCalories) : day.health?.activeCalories,
                  exerciseMinutes: exerciseMinutes != null ? Number(exerciseMinutes) : day.health?.exerciseMinutes,
                  standHours: standHours != null ? Number(standHours) : day.health?.standHours,
                  workouts: normalizedWorkouts.length ? normalizedWorkouts : day.health?.workouts ?? [],
                };
                state.days[date] = day;
                state.updatedAt = new Date().toISOString();
                await fs.writeFile(filePath, JSON.stringify(state, null, 2), "utf-8");
              }
            } catch (e) {}
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
}

export const Route = createFileRoute("/api/sync-health")({
  server: {
    handlers: {
      GET: async () => {
        const data = await readSyncData();
        return new Response(JSON.stringify(data), {
          headers: { "Content-Type": "application/json" },
        });
      },

      POST: async ({ request }) => {
        try {
          let body: any = null;
          try {
            body = await request.json();
          } catch (e) {
            const text = await request.text().catch(() => "");
            if (text) {
              try {
                body = JSON.parse(text);
              } catch (err) {}
            }
          }

          if (typeof body === "string") {
            try {
              body = JSON.parse(body);
            } catch (e) {}
          }

          // Debug log as requested
          console.log("Payload reçu sync-health:", JSON.stringify(body, null, 2));

          if (!body || typeof body !== "object") {
            return new Response(
              JSON.stringify({ error: "Invalid payload format" }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          const payload = body;

          // Normalize workouts strictly without fallback to distance
          const rawWorkouts = payload.workouts ?? payload.health?.workouts ?? [];
          const normalizedWorkouts = normalizeWorkoutsServer(rawWorkouts);
          payload.workouts = normalizedWorkouts;
          if (!payload.health || typeof payload.health !== "object") {
            payload.health = {};
          }
          payload.health.workouts = normalizedWorkouts;

          // Compute global activeCalories from workouts if missing at root
          let globalActiveCal =
            payload.health?.activeCalories ??
            payload.activeCalories ??
            payload.calories ??
            payload.moveCalories ??
            payload.activeEnergyBurned;
          if (globalActiveCal == null || isNaN(Number(globalActiveCal))) {
            const sumCal = normalizedWorkouts.reduce((acc: number, w: any) => acc + (w.calories || 0), 0);
            if (sumCal > 0) {
              globalActiveCal = sumCal;
            }
          }
          if (globalActiveCal != null && !isNaN(Number(globalActiveCal))) {
            payload.activeCalories = Number(globalActiveCal);
            payload.health.activeCalories = Number(globalActiveCal);
          }

          // Compute global avgHeartRate from workouts if missing at root
          let globalAvgHR =
            payload.health?.avgHeartRate ??
            payload.avgHeartRate ??
            payload.heartRate ??
            payload.averageHeartRate ??
            payload.meanHeartRate;
          if (globalAvgHR == null || isNaN(Number(globalAvgHR))) {
            const hrs = normalizedWorkouts
              .map((w: any) => w.avgHeartRate)
              .filter((hr: any): hr is number => typeof hr === "number" && hr > 0);
            if (hrs.length > 0) {
              globalAvgHR = Math.round(hrs.reduce((a: number, b: number) => a + b, 0) / hrs.length);
            }
          }
          if (globalAvgHR != null && !isNaN(Number(globalAvgHR))) {
            payload.avgHeartRate = Number(globalAvgHR);
            payload.health.avgHeartRate = Number(globalAvgHR);
          }

          // Push/update in memory queue
          const queue = globalThis.__HEALTH_SYNC_QUEUE__ || [];
          const dateKey = payload.date
            ? String(payload.date).slice(0, 10)
            : new Date().toISOString().slice(0, 10);
          const existingIdx = queue.findIndex(
            (q: any) => q && q.date && String(q.date).slice(0, 10) === dateKey
          );

          if (existingIdx >= 0) {
            queue[existingIdx] = {
              ...queue[existingIdx],
              ...payload,
              workouts: normalizedWorkouts,
              health: {
                ...(queue[existingIdx].health || {}),
                ...payload.health,
                workouts: normalizedWorkouts,
              },
            };
          } else {
            queue.push(payload);
          }
          globalThis.__HEALTH_SYNC_QUEUE__ = queue;

          const currentData = await readSyncData();
          await writeSyncData(currentData);

          // Direct merge into server state sync files
          await mergeHealthIntoServerStates(payload);

          return new Response(
            JSON.stringify({ success: true, message: "Data synced successfully", date: payload.date }),
            {
              headers: { "Content-Type": "application/json" },
            }
          );
        } catch (error: any) {
          return new Response(
            JSON.stringify({ error: "Failed to parse JSON", details: error.message }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },

      DELETE: async () => {
        await writeSyncData([]);
        return new Response(JSON.stringify({ success: true, message: "Sync data cleared" }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});

