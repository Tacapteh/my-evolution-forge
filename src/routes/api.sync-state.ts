import { createFileRoute } from "@tanstack/react-router";
import * as fs from "fs/promises";
import * as path from "path";

// In development, store in the project directory. In Vercel serverless, store in /tmp.
const isVercel = !!process.env.VERCEL;
const SYNC_DIR = isVercel ? "/tmp" : path.join(process.cwd(), ".data", "sync");
const SECRET_TOKEN = process.env.HEALTH_SYNC_TOKEN || "my-super-secret-token";

async function ensureDir() {
  if (!isVercel) {
    try {
      await fs.mkdir(SYNC_DIR, { recursive: true });
    } catch (e) {}
  }
}

async function readStateData(token: string): Promise<any | null> {
  await ensureDir();
  const filePath = path.join(SYNC_DIR, `state-sync-${token}.json`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

async function writeStateData(token: string, data: any) {
  await ensureDir();
  const filePath = path.join(SYNC_DIR, `state-sync-${token}.json`);
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write state sync file:", error);
  }
}

export const Route = createFileRoute("/api/sync-state")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // Authenticate request using X-Sync-Token
        const token = request.headers.get("X-Sync-Token") || SECRET_TOKEN;

        const data = await readStateData(token);
        if (!data) {
          return new Response(JSON.stringify({ error: "No state found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify(data), {
          headers: { "Content-Type": "application/json" },
        });
      },

      POST: async ({ request }) => {
        // Authenticate request using X-Sync-Token
        const token = request.headers.get("X-Sync-Token") || SECRET_TOKEN;

        try {
          const payload = await request.json();

          if (!payload || typeof payload !== "object") {
            return new Response(JSON.stringify({ error: "Invalid payload format" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          // Save the state
          await writeStateData(token, payload);

          return new Response(JSON.stringify({ success: true, message: "State saved successfully" }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (error: any) {
          return new Response(JSON.stringify({ error: "Failed to parse JSON state", details: error.message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
