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
  await ensureDir();
  const fileItems: any[] = [];
  try {
    const raw = await fs.readFile(SYNC_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) fileItems.push(...parsed);
  } catch (error) {}

  // Combine memory queue + file items
  const combined = [...globalThis.__HEALTH_SYNC_QUEUE__, ...fileItems];
  return combined;
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

function normalizeWorkoutsServer(rawWorkouts: any[]): any[] {
  if (!Array.isArray(rawWorkouts)) return [];
  return rawWorkouts.map((w) => {
    if (typeof w === "string") {
      try {
        w = JSON.parse(w);
      } catch (e) {
        w = { type: w };
      }
    }
    if (!w || typeof w !== "object") return { type: "Exercice" };
    const rawType = String(
      w.type ?? w.activityType ?? w.workoutActivityType ?? w.name ?? w.workoutType ?? w.title ?? "Exercice",
    ).toLowerCase();
    let type = "Exercice";
    if (
      rawType.includes("swim") ||
      rawType.includes("natat") ||
      rawType.includes("nage") ||
      rawType.includes("hkworkoutactivitytypeswimming")
    )
      type = "Natation";
    else if (
      rawType.includes("run") ||
      rawType.includes("cours") ||
      rawType.includes("footing") ||
      rawType.includes("hkworkoutactivitytyperunning")
    )
      type = "Course";
    else if (
      rawType.includes("walk") ||
      rawType.includes("march") ||
      rawType.includes("hkworkoutactivitytypewalking")
    )
      type = "Marche";
    else if (
      rawType.includes("cycle") ||
      rawType.includes("velo") ||
      rawType.includes("bike") ||
      rawType.includes("hkworkoutactivitytypecycling")
    )
      type = "Cyclisme";
    else type = w.type ?? w.activityType ?? w.name ?? "Exercice";

    let durationMinutes: number | undefined = undefined;
    const rawDuration = Number(
      w.durationMinutes ?? w.duration ?? w.durationInMinutes ?? w.elapsedTime ?? w.totalDuration ?? 0,
    );
    if (w.durationSec != null) {
      durationMinutes = Math.round(Number(w.durationSec) / 60);
    } else if (rawDuration > 0) {
      durationMinutes = rawDuration > 300 ? Math.round(rawDuration / 60) : rawDuration;
    }

    let distanceKm: number | undefined = undefined;
    let distanceMeters: number | undefined = undefined;

    const rawDist = Number(
      w.distanceMeters ?? w.distanceInMeters ?? w.distanceKm ?? w.distanceInKm ?? w.distance ?? w.totalDistance ?? 0,
    );

    if (w.distanceMeters != null || w.distanceInMeters != null) {
      const meters = Number(w.distanceMeters ?? w.distanceInMeters);
      if (meters > 0) {
        distanceMeters = meters;
        distanceKm = Number((meters / 1000).toFixed(2));
      }
    } else if (w.distanceKm != null || w.distanceInKm != null) {
      const km = Number(w.distanceKm ?? w.distanceInKm);
      if (km > 0) {
        distanceKm = km;
        distanceMeters = Math.round(km * 1000);
      }
    } else if (rawDist > 0) {
      if (rawDist > 50) {
        distanceMeters = rawDist;
        distanceKm = Number((rawDist / 1000).toFixed(2));
      } else {
        distanceKm = rawDist;
        distanceMeters = Math.round(rawDist * 1000);
      }
    }

    return {
      type,
      durationMinutes: durationMinutes && durationMinutes > 0 ? durationMinutes : undefined,
      distanceKm: distanceKm && !isNaN(distanceKm) ? distanceKm : undefined,
      distanceMeters: distanceMeters && !isNaN(distanceMeters) ? distanceMeters : undefined,
      calories: w.calories != null ? Number(w.calories) : undefined,
    };
  });
}

async function mergeHealthIntoServerStates(payload: any) {
  try {
    const todayISO = new Date().toISOString().slice(0, 10);
    const rawDate = payload.date ? String(payload.date).trim() : todayISO;
    const date = rawDate.length >= 10 ? rawDate.slice(0, 10) : todayISO;

    const steps = payload.health?.steps ?? payload.steps ?? payload.stepCount;
    const avgHeartRate = payload.health?.avgHeartRate ?? payload.avgHeartRate ?? payload.heartRate;
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

          // Add payload to memory queue & disk
          globalThis.__HEALTH_SYNC_QUEUE__.push(payload);
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
