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
    const workouts = item.workouts ?? item.health?.workouts ?? [];
    return {
      date: item.date ?? new Date().toISOString().slice(0, 10),
      steps: item.steps ?? item.health?.steps,
      avgHeartRate: item.avgHeartRate ?? item.health?.avgHeartRate,
      activeCalories: item.activeCalories ?? item.health?.activeCalories,
      exerciseMinutes: item.exerciseMinutes ?? item.health?.exerciseMinutes,
      workouts: workouts,
      health: item.health ?? {
        steps: item.steps,
        avgHeartRate: item.avgHeartRate,
        activeCalories: item.activeCalories,
        exerciseMinutes: item.exerciseMinutes,
        workouts: workouts,
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

    let calories: number | undefined = undefined;
    const rawActiveCal = String(w.activeCalories ?? w.calories ?? w.activeEnergyBurned ?? "");
    if (rawActiveCal) {
      const numMatch = rawActiveCal.replace(",", ".").match(/(\d+(?:\.\d+)?)/);
      if (numMatch) {
        const val = Math.round(parseFloat(numMatch[1]));
        if (val > 0) calories = val;
      }
    }

    let rawType = String(
      w.type ?? w.activityType ?? w.workoutActivityType ?? w.name ?? w.workoutType ?? w.title ?? "",
    ).trim();

    if (rawType.startsWith("{")) {
      try {
        const parsedType = JSON.parse(rawType);
        if (parsedType && typeof parsedType === "object") {
          if (parsedType.activeCalories && !calories) {
            const numMatch = String(parsedType.activeCalories).replace(",", ".").match(/(\d+(?:\.\d+)?)/);
            if (numMatch) calories = Math.round(parseFloat(numMatch[1]));
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
      w.durationMinutes ?? w.duration ?? w.durationInMinutes ?? w.elapsedTime ?? w.totalDuration ?? 0,
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
        w.distanceWalkingRunningMeters,
    );
    const dKm = parseDistNum(
      w.distanceKm ??
        w.distanceInKm ??
        w.swimmingDistanceKm ??
        w.distanceSwimmingKm ??
        w.distanceWalkingRunning,
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
    });
  }

  return results;
}

async function mergeHealthIntoServerStates(payload: any) {
  try {
    const todayISO = new Date().toISOString().slice(0, 10);
    const rawDate = payload.date ? String(payload.date).trim() : todayISO;
    const date = rawDate.length >= 10 ? rawDate.slice(0, 10) : todayISO;

    const steps = payload.health?.steps ?? payload.steps ?? payload.stepCount;
    const avgHeartRate = payload.health?.avgHeartRate ?? payload.avgHeartRate ?? payload.heartRate;
    const activeCalories = payload.health?.activeCalories ?? payload.activeCalories ?? payload.calories ?? payload.moveCalories;
    const exerciseMinutes = payload.health?.exerciseMinutes ?? payload.exerciseMinutes ?? payload.exerciseTime ?? payload.workoutMinutes;
    const standHours = payload.health?.standHours ?? payload.standHours ?? payload.appleStandHours ?? payload.standTime;
    const rawWorkouts = payload.workouts ?? payload.health?.workouts ?? [];
    const normalizedWorkouts = normalizeWorkoutsServer(rawWorkouts);

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
          let payload: any = null;
          try {
            payload = await request.json();
          } catch (e) {
            const text = await request.text().catch(() => "");
            if (text) {
              try {
                payload = JSON.parse(text);
              } catch (err) {}
            }
          }

          if (typeof payload === "string") {
            try { payload = JSON.parse(payload); } catch (e) {}
          }

          if (!payload || typeof payload !== "object") {
            return new Response(
              JSON.stringify({ error: "Invalid payload format" }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          // Normalize workouts and update payload before adding to queue or writing
          const rawWorkouts = payload.workouts ?? payload.health?.workouts ?? [];
          const normalizedWorkouts = normalizeWorkoutsServer(rawWorkouts);
          payload.workouts = normalizedWorkouts;
          if (!payload.health || typeof payload.health !== "object") {
            payload.health = {};
          }
          payload.health.workouts = normalizedWorkouts;

          // Push/update in memory queue
          const queue = globalThis.__HEALTH_SYNC_QUEUE__ || [];
          const dateKey = payload.date ? String(payload.date).slice(0, 10) : new Date().toISOString().slice(0, 10);
          const existingIdx = queue.findIndex((q: any) => q && q.date && String(q.date).slice(0, 10) === dateKey);

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
