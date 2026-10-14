import { createFileRoute } from "@tanstack/react-router";
import * as fs from "fs/promises";
import * as path from "path";

declare global {
  var __STATE_SYNC_CACHE__: Record<string, any> | undefined;
}

globalThis.__STATE_SYNC_CACHE__ = globalThis.__STATE_SYNC_CACHE__ || {};

const isVercel = !!process.env.VERCEL;
const SYNC_DIR = isVercel ? "/tmp" : path.join(process.cwd(), ".data", "sync");
const SECRET_TOKEN = process.env.HEALTH_SYNC_TOKEN || "my-super-secret-token";

const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function ensureDir() {
  if (!isVercel) {
    try {
      await fs.mkdir(SYNC_DIR, { recursive: true });
    } catch (e) {}
  }
}

async function readStateData(token: string): Promise<any | null> {
  // 1. Try Upstash / Vercel KV REST if configured
  if (kvUrl && kvToken) {
    try {
      const res = await fetch(`${kvUrl}/get/state:${token}`, {
        headers: { Authorization: `Bearer ${kvToken}` },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.result) {
          const parsed = typeof json.result === "string" ? JSON.parse(json.result) : json.result;
          globalThis.__STATE_SYNC_CACHE__![token] = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.error("KV read failed:", e);
    }
  }

  // 2. Try In-Memory Cache
  if (globalThis.__STATE_SYNC_CACHE__![token]) {
    return globalThis.__STATE_SYNC_CACHE__![token];
  }

  // 3. Fallback to filesystem
  await ensureDir();
  const filePath = path.join(SYNC_DIR, `state-sync-${token}.json`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(raw);
    globalThis.__STATE_SYNC_CACHE__![token] = data;
    return data;
  } catch (error) {
    return null;
  }
}

async function writeStateData(token: string, data: any) {
  // Always update in-memory cache immediately
  globalThis.__STATE_SYNC_CACHE__![token] = data;

  // 1. Write to Upstash / Vercel KV REST if configured
  if (kvUrl && kvToken) {
    try {
      await fetch(`${kvUrl}/set/state:${token}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${kvToken}` },
        body: typeof data === "string" ? data : JSON.stringify(data),
      });
    } catch (e) {
      console.error("KV write failed:", e);
    }
  }

  // 2. Write to filesystem as backup
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
        const token = request.headers.get("X-Sync-Token") || SECRET_TOKEN;

        try {
          const payload = await request.json();

          if (!payload || typeof payload !== "object") {
            return new Response(JSON.stringify({ error: "Invalid payload format" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

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
