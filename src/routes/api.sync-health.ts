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

async function mergeHealthIntoServerStates(payload: any) {
  try {
    const todayISO = new Date().toISOString().slice(0, 10);
    const rawDate = payload.date ? String(payload.date).trim() : todayISO;
    const date = rawDate.length >= 10 ? rawDate.slice(0, 10) : todayISO;

    const steps = payload.health?.steps ?? payload.steps ?? payload.stepCount;
    const avgHeartRate = payload.health?.avgHeartRate ?? payload.avgHeartRate ?? payload.heartRate;
    const workouts = payload.workouts ?? payload.health?.workouts ?? [];

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
                  workouts: Array.isArray(workouts) && workouts.length ? workouts : day.health?.workouts ?? [],
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
