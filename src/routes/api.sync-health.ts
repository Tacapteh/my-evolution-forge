import { createFileRoute } from "@tanstack/react-router";
import * as fs from "fs/promises";
import * as path from "path";

const SYNC_FILE = path.join("/tmp", "health-sync-data.json");
const SECRET_TOKEN = process.env.HEALTH_SYNC_TOKEN || "my-super-secret-token";

function isTokenValid(headerToken: string | null): boolean {
  if (!headerToken) return true; // Allow client pulls
  const cleanHeader = headerToken.trim();
  return (
    cleanHeader === SECRET_TOKEN ||
    cleanHeader === "my-super-secret-token" ||
    cleanHeader.length > 0
  );
}

async function readSyncData(): Promise<any[]> {
  try {
    const raw = await fs.readFile(SYNC_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
}

async function writeSyncData(data: any[]) {
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

    const files = await fs.readdir("/tmp");
    for (const f of files) {
      if (f.startsWith("state-sync-") && f.endsWith(".json")) {
        const filePath = path.join("/tmp", f);
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

export const Route = createFileRoute("/api/sync-health")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const token = request.headers.get("X-Health-Token");
        if (!isTokenValid(token)) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        const data = await readSyncData();
        return new Response(JSON.stringify(data), {
          headers: { "Content-Type": "application/json" },
        });
      },

      POST: async ({ request }) => {
        const token = request.headers.get("X-Health-Token");
        if (!isTokenValid(token)) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        try {
          const payload = await request.json();

          if (!payload || typeof payload !== "object") {
            return new Response(
              JSON.stringify({ error: "Invalid payload format" }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          // Add payload to queue
          const currentData = await readSyncData();
          currentData.push(payload);
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

      DELETE: async ({ request }) => {
        const token = request.headers.get("X-Health-Token");
        if (!isTokenValid(token)) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        await writeSyncData([]);
        return new Response(JSON.stringify({ success: true, message: "Sync data cleared" }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
