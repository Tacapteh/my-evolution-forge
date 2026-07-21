import { createFileRoute } from "@tanstack/react-router";
import * as fs from "fs/promises";
import * as path from "path";

const SYNC_FILE = path.join("/tmp", "health-sync-data.json");
const SECRET_TOKEN = process.env.HEALTH_SYNC_TOKEN || "my-super-secret-token";

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

export const Route = createFileRoute("/api/sync-health")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // Authenticate request
        const token = request.headers.get("X-Health-Token");
        if (token !== SECRET_TOKEN) {
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
        // Authenticate request
        const token = request.headers.get("X-Health-Token");
        if (token !== SECRET_TOKEN) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        try {
          const payload = await request.json();

          // Validate basic structure
          if (!payload || typeof payload !== "object" || !payload.date) {
            return new Response(JSON.stringify({ error: "Invalid payload format. 'date' is required." }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          // Add to sync queue
          const currentData = await readSyncData();
          currentData.push(payload);
          await writeSyncData(currentData);

          return new Response(JSON.stringify({ success: true, message: "Data synced successfully" }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (error: any) {
          return new Response(JSON.stringify({ error: "Failed to parse JSON", details: error.message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
      },

      DELETE: async ({ request }) => {
        // Authenticate request
        const token = request.headers.get("X-Health-Token");
        if (token !== SECRET_TOKEN) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Clear the sync list
        await writeSyncData([]);
        return new Response(JSON.stringify({ success: true, message: "Sync data cleared" }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
