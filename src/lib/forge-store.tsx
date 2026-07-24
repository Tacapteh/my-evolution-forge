import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { WEEK, BADGES, DEFAULT_TARGET_DATE, type TaskTemplate } from "./forge-data";
import { militarySeptemberProgram } from "../data/programs/military-september";

const TRAINING_START = new Date("2026-07-20T12:00:00");
const TRAINING_WEEKS = militarySeptemberProgram.weeks;

// --- Types

export interface TaskRealization {
  actual: number;
  target: number;
  unit: "m" | "km";
  penalty: boolean;
  xpAwarded: number;
}

export interface DayRecord {
  checked: Record<string, boolean>; // taskId -> done
  taskRealizations?: Record<string, TaskRealization>; // taskId -> realization
  session?: {
    startedAt?: string;
    completedAt?: string;
  };
  journal?: {
    energy?: number; // 1..10
    fatigue?: number;
    pain?: number;
    sleep?: number; // hours
    hydration?: number; // L
    mood?: number; // 1..10
    notes?: string;
  };
  psycho?: {
    score?: number;
    duration?: number; // s
    type?: string;
  };
  health?: {
    steps?: number;
    avgHeartRate?: number;
    activeCalories?: number; // Bouger (kcal)
    exerciseMinutes?: number; // M'entraîner (min)
    standHours?: number; // Me lever (heures)
    workouts?: Array<{
      type: string;
      durationMinutes?: number;
      distanceKm?: number;
      distanceMeters?: number;
      calories?: number;
    }>;
  };
  swaps?: Record<string, string>;
}

export interface PerfEntry {
  id: string;
  date: string; // ISO
  type:
    | "pull"
    | "pull_lsit"
    | "pull_supine_iso"
    | "pull_supine_neg"
    | "push_military"
    | "push_diamond"
    | "push_declined"
    | "push_triceps"
    | "chair"
    | "squat"
    | "lunge"
    | "calves"
    | "commando"
    | "luc"
    | "vma"
    | "run5"
    | "run10"
    | "weight"
    | "hr"
    | "sleep";
  value: number;
}

export interface ForgeState {
  targetDate: string;
  userName: string;
  days: Record<string, DayRecord>; // yyyy-mm-dd
  perf: PerfEntry[];
  badges: string[]; // ids unlocked
  activeSession?: {
    date: string;
    startedAt: string;
  };
  healthToken?: string;
  updatedAt?: string;
}

const KEY = "forge.state.v1";

const initial: ForgeState = {
  targetDate: DEFAULT_TARGET_DATE,
  userName: "Quentin",
  days: {},
  perf: [],
  badges: [],
  healthToken: "my-super-secret-token",
  updatedAt: new Date("2026-07-20T12:00:00").toISOString(),
};

// --- Context

interface Ctx {
  state: ForgeState;
  setState: (s: ForgeState | ((prev: ForgeState) => ForgeState)) => void;
  toggleTask: (date: string, taskId: string) => void;
  startSession: (date: string) => void;
  finishSession: (date: string) => void;
  setJournal: (date: string, journal: DayRecord["journal"]) => void;
  setPsycho: (date: string, psycho: DayRecord["psycho"]) => void;
  setHealth: (date: string, health: DayRecord["health"]) => void;
  setMomentSwap: (date: string, moment: string, activityId: string) => void;
  setTaskSwap: (date: string, taskId: string, activityId: string) => void;
  setTaskRealization: (date: string, taskId: string, realization: TaskRealization) => void;
  addPerf: (entry: Omit<PerfEntry, "id">) => void;
  removePerf: (id: string) => void;
  reset: () => void;
  hydrated: boolean;
}

const ForgeCtx = createContext<Ctx | null>(null);

export function ForgeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ForgeState>(initial);
  const [hydrated, setHydrated] = useState(false);

  const setLocalState = (s: ForgeState | ((prev: ForgeState) => ForgeState)) => {
    setState((prev) => {
      const next = typeof s === "function" ? s(prev) : s;
      const timestamp = next.updatedAt !== prev.updatedAt ? next.updatedAt : new Date().toISOString();
      return {
        ...next,
        updatedAt: timestamp,
      };
    });
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({
          ...initial,
          ...parsed,
          days: parsed.days && typeof parsed.days === "object" ? parsed.days : {},
          perf: Array.isArray(parsed.perf) ? parsed.perf : [],
          badges: Array.isArray(parsed.badges) ? parsed.badges : [],
        });
      }
    } catch {
      // Local storage can be unavailable in restricted browser contexts.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // Persistence is best-effort; the UI remains usable without it.
    }
  }, [state, hydrated]);

  // Cloud Sync: Pull from server on mount
  useEffect(() => {
    if (!hydrated) return;

    const token = state.healthToken || "my-super-secret-token";

    const pullState = async () => {
      try {
        const response = await fetch("/api/sync-state", {
          headers: {
            "X-Sync-Token": token,
          },
        });
        if (!response.ok) {
          if (response.status === 404) {
            // Push our initial state if server has none
            await fetch("/api/sync-state", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Sync-Token": token,
              },
              body: JSON.stringify(state),
            });
          }
          return;
        }

        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) return;

        const serverState = await response.json();
        if (serverState && serverState.updatedAt) {
          const serverTime = new Date(serverState.updatedAt).getTime();
          const localTime = new Date(state.updatedAt || 0).getTime();

          if (serverTime > localTime) {
            // Server has newer state, replace client state
            setState({
              ...initial,
              ...serverState,
              days: serverState.days && typeof serverState.days === "object" ? serverState.days : {},
              perf: Array.isArray(serverState.perf) ? serverState.perf : [],
              badges: Array.isArray(serverState.badges) ? serverState.badges : [],
            });
            import("sonner").then(({ toast }) => {
              toast.info("Données synchronisées", {
                description: "Votre progression a été mise à jour depuis le cloud.",
              });
            });
          } else if (localTime > serverTime) {
            // Client has newer state, push immediately
            await fetch("/api/sync-state", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Sync-Token": token,
              },
              body: JSON.stringify(state),
            });
          }
        }
      } catch (e) {
        console.error("Cloud sync pull failed:", e);
      }
    };

    pullState();
  }, [hydrated, state.healthToken]);

  // Cloud Sync: Push to server on state changes
  useEffect(() => {
    if (!hydrated) return;

    const token = state.healthToken || "my-super-secret-token";

    const pushState = async () => {
      try {
        await fetch("/api/sync-state", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Sync-Token": token,
          },
          body: JSON.stringify(state),
        });
      } catch (e) {
        console.error("Cloud sync push failed:", e);
      }
    };

    const timeout = setTimeout(pushState, 1500);
    return () => clearTimeout(timeout);
  }, [state, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    const token = state.healthToken || "my-super-secret-token";

    const runSync = async () => {
      try {
        const response = await fetch("/api/sync-health", {
          headers: {
            "X-Health-Token": token,
          },
        });
        if (!response.ok) return;
        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) return;
        const syncItems = await response.json();
        if (!Array.isArray(syncItems) || syncItems.length === 0) return;

        // Apply items to the state
        setState((prev) => {
          let updatedState = { ...prev };
          let updatedCount = 0;

          for (const item of syncItems) {
            const date = normalizeDateISO(item.date);
            const currentToday = todayISO();

            const day = updatedState.days[date] ?? { checked: {} };

            const steps = item.health?.steps ?? item.steps ?? item.stepCount ?? day.health?.steps;
            const rawWorkouts = item.workouts ?? item.health?.workouts ?? day.health?.workouts ?? [];
            const normalizedWorkoutsList = normalizeWorkouts(rawWorkouts);
            const mergedWorkouts = normalizedWorkoutsList.length > 0 ? normalizedWorkoutsList : day.health?.workouts ?? [];

            let activeCalories = item.health?.activeCalories ?? item.activeCalories ?? item.calories ?? item.moveCalories ?? day.health?.activeCalories;
            if ((activeCalories == null || isNaN(Number(activeCalories))) && mergedWorkouts.length > 0) {
              const sumCal = mergedWorkouts.reduce((acc: number, w: any) => acc + (w.calories || 0), 0);
              if (sumCal > 0) activeCalories = sumCal;
            }

            let avgHeartRate = item.health?.avgHeartRate ?? item.avgHeartRate ?? item.heartRate ?? item.averageHeartRate ?? item.meanHeartRate ?? day.health?.avgHeartRate;
            if ((avgHeartRate == null || isNaN(Number(avgHeartRate))) && mergedWorkouts.length > 0) {
              const hrs = mergedWorkouts.map((w: any) => w.avgHeartRate).filter((hr: any): hr is number => typeof hr === "number" && hr > 0);
              if (hrs.length > 0) avgHeartRate = Math.round(hrs.reduce((a: number, b: number) => a + b, 0) / hrs.length);
            }

            const health = {
              ...day.health,
              steps: steps != null ? Number(steps) : undefined,
              avgHeartRate: avgHeartRate != null ? Number(avgHeartRate) : undefined,
              activeCalories: activeCalories != null ? Number(activeCalories) : undefined,
              workouts: mergedWorkouts,
            };

            // Check workouts and auto-toggle corresponding tasks
            const checked = { ...day.checked };
            const tasks = tasksForDate(date);

            const hasSwimming = health.workouts?.some((w: any) => String(w.type).toLowerCase().includes("natat") || String(w.type).toLowerCase().includes("swim"));
            const hasRunning = health.workouts?.some((w: any) => String(w.type).toLowerCase().includes("cours") || String(w.type).toLowerCase().includes("run"));

            for (const task of tasks) {
              if (task.type === "swim" && hasSwimming && !checked[task.id]) {
                checked[task.id] = true;
              }
              if (task.type === "run" && hasRunning && !checked[task.id]) {
                checked[task.id] = true;
              }
            }

            const todayDay = updatedState.days[currentToday] ?? { checked: {} };

            updatedState.days = {
              ...updatedState.days,
              [date]: {
                ...day,
                checked,
                health,
              },
              [currentToday]: {
                ...todayDay,
                health: {
                  ...todayDay.health,
                  ...health,
                },
              },
            };
            updatedCount++;
          }

          if (updatedCount > 0) {
            updatedState = {
              ...updatedState,
              updatedAt: new Date().toISOString(),
            };
            try {
              localStorage.setItem(KEY, JSON.stringify(updatedState));
            } catch (e) {}

            fetch("/api/sync-state", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Sync-Token": token,
              },
              body: JSON.stringify(updatedState),
            }).catch(() => {});

            import("sonner").then(({ toast }) => {
              toast.success("Synchronisation Santé réussie", {
                description: `${updatedCount} jour(s) synchronisé(s) depuis Raccourcis iOS.`,
              });
            });
          }

          return updatedState;
        });

        // Clear server sync queue
        await fetch("/api/sync-health", {
          method: "DELETE",
          headers: {
            "X-Health-Token": token,
          },
        });
      } catch (error) {
        console.error("Health sync error:", error);
      }
    };

    runSync();
    const interval = setInterval(runSync, 4000);
    window.addEventListener("focus", runSync);
    window.addEventListener("visibilitychange", runSync);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", runSync);
      window.removeEventListener("visibilitychange", runSync);
    };
  }, [hydrated, state.healthToken]);

  const value: Ctx = useMemo(
    () => ({
      state,
      setState: setLocalState,
      hydrated,
      toggleTask: (date, taskId) =>
        setLocalState((prev) => {
          const day = prev.days[date] ?? { checked: {} };
          const checked = { ...day.checked, [taskId]: !day.checked[taskId] };
          const completed = tasksForDate(date).every((task) => checked[task.id]);
          const newBadges = new Set(prev.badges);
          if (Object.values(checked).some(Boolean)) newBadges.add("first");
          return {
            ...prev,
            activeSession:
              completed && prev.activeSession?.date === date ? undefined : prev.activeSession,
            days: {
              ...prev.days,
              [date]: {
                ...day,
                checked,
                session: {
                  ...day.session,
                  completedAt: completed ? new Date().toISOString() : undefined,
                },
              },
            },
            badges: [...newBadges],
          };
        }),
      startSession: (date) =>
        setLocalState((prev) => {
          const day = prev.days[date] ?? { checked: {} };
          const startedAt = day.session?.startedAt ?? new Date().toISOString();
          return {
            ...prev,
            activeSession: { date, startedAt },
            days: {
              ...prev.days,
              [date]: { ...day, session: { ...day.session, startedAt } },
            },
          };
        }),
      finishSession: (date) =>
        setLocalState((prev) => {
          const day = prev.days[date] ?? { checked: {} };
          const completedAt = new Date().toISOString();
          return {
            ...prev,
            activeSession: prev.activeSession?.date === date ? undefined : prev.activeSession,
            days: {
              ...prev.days,
              [date]: { ...day, session: { ...day.session, completedAt } },
            },
          };
        }),
      setJournal: (date, journal) =>
        setLocalState((prev) => {
          const day = prev.days[date] ?? { checked: {} };
          return {
            ...prev,
            days: { ...prev.days, [date]: { ...day, journal: { ...day.journal, ...journal } } },
          };
        }),
      setPsycho: (date, psycho) =>
        setLocalState((prev) => {
          const day = prev.days[date] ?? { checked: {} };
          return {
            ...prev,
            days: { ...prev.days, [date]: { ...day, psycho: { ...day.psycho, ...psycho } } },
          };
        }),
      setHealth: (date, health) =>
        setLocalState((prev) => {
          const day = prev.days[date] ?? { checked: {} };
          return {
            ...prev,
            days: { ...prev.days, [date]: { ...day, health: { ...day.health, ...health } } },
          };
        }),
      setMomentSwap: (date, moment, activityId) =>
        setLocalState((prev) => {
          const day = prev.days[date] ?? { checked: {} };
          const swaps = { ...day.swaps };
          if (activityId) {
            swaps[moment] = activityId;
          } else {
            delete swaps[moment];
          }
          return {
            ...prev,
            days: {
              ...prev.days,
              [date]: { ...day, swaps },
            },
          };
        }),
      setTaskSwap: (date, taskId, activityId) =>
        setLocalState((prev) => {
          const day = prev.days[date] ?? { checked: {} };
          const swaps = { ...day.swaps };
          if (activityId) {
            swaps[taskId] = activityId;
          } else {
            delete swaps[taskId];
          }
          return {
            ...prev,
            days: {
              ...prev.days,
              [date]: { ...day, swaps },
            },
          };
        }),
      setTaskRealization: (date, taskId, realization) =>
        setLocalState((prev) => {
          const day = prev.days[date] ?? { checked: {} };
          const taskRealizations = { ...day.taskRealizations, [taskId]: realization };
          const checked = { ...day.checked, [taskId]: true };
          return {
            ...prev,
            days: {
              ...prev.days,
              [date]: {
                ...day,
                checked,
                taskRealizations,
              },
            },
          };
        }),
      addPerf: (entry) =>
        setLocalState((prev) => {
          const withEntry = [...prev.perf, { ...entry, id: crypto.randomUUID() }];
          const badges = new Set(prev.badges);
          if (entry.type === "pull" && entry.value >= 10) badges.add("pull10");
          if (entry.type === "pull" && entry.value >= 15) badges.add("pull15");
          if (entry.type === "pull" && entry.value >= 17) badges.add("goalPull");
          if (entry.type === "chair" && entry.value >= 168) badges.add("goalChair");
          if (entry.type === "run10") badges.add("run10");
          if (entry.type === "luc" && entry.value >= 12) badges.add("goalLuc");
          return { ...prev, perf: withEntry, badges: [...badges] };
        }),
      removePerf: (id) =>
        setLocalState((prev) => ({ ...prev, perf: prev.perf.filter((p) => p.id !== id) })),
      reset: () => setLocalState(initial),
    }),
    [state, hydrated],
  );

  return <ForgeCtx.Provider value={value}>{children}</ForgeCtx.Provider>;
}

export function useForge() {
  const c = useContext(ForgeCtx);
  if (!c) throw new Error("useForge must be inside ForgeProvider");
  return c;
}

// --- Helpers

export function toISO(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayISO() {
  return toISO(new Date());
}

export function normalizeDateISO(inputDate?: any): string {
  if (!inputDate) return todayISO();
  const str = String(inputDate).trim();

  // If already YYYY-MM-DD...
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
    return str.slice(0, 10);
  }

  // If French format DD/MM/YYYY or DD-MM-YYYY
  const frMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (frMatch) {
    const day = frMatch[1].padStart(2, "0");
    const month = frMatch[2].padStart(2, "0");
    const year = frMatch[3];
    return `${year}-${month}-${day}`;
  }

  // Fallback: parse with Date constructor
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    return toISO(d);
  }

  return todayISO();
}

export function normalizeWorkouts(rawWorkouts: any): Array<{
  type: string;
  durationMinutes?: number;
  distanceKm?: number;
  distanceMeters?: number;
  calories?: number;
  avgHeartRate?: number;
}> {
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

  const results: Array<{
    type: string;
    durationMinutes?: number;
    distanceKm?: number;
    distanceMeters?: number;
    calories?: number;
    avgHeartRate?: number;
  }> = [];

  for (const w of workoutList) {
    if (!w || typeof w !== "object") continue;

    // 1. Calories extraction - STRICTLY from calorie fields, NEVER from distance
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

    // 2. Heart Rate extraction from workout
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

    // 3. Type resolution & cleaning
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

    let type = "Natation"; // Default if not explicitly specified
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

    // 4. Duration
    let durationMinutes: number | undefined = undefined;
    const rawDur = Number(
      w.durationMinutes ?? w.duration ?? w.durationInMinutes ?? w.elapsedTime ?? w.totalDuration ?? 0,
    );
    if (w.durationSec != null && Number(w.durationSec) > 0) {
      durationMinutes = Math.round(Number(w.durationSec) / 60);
    } else if (rawDur > 0) {
      durationMinutes = rawDur > 300 ? Math.round(rawDur / 60) : rawDur;
    }

    // 5. Distance (ignore non-numbers or "kcal")
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

    // Filter out dummy 0-duration 0-calorie empty objects
    if (!type) continue;

    results.push({
      type,
      durationMinutes: durationMinutes && durationMinutes > 0 ? durationMinutes : undefined,
      distanceKm,
      distanceMeters,
      calories,
      avgHeartRate,
    });
  }

  return results;
}

export function dowMon(d: Date) {
  // 1 = Monday ... 7 = Sunday
  const dow = d.getDay();
  return dow === 0 ? 7 : dow;
}

export function tasksForDate(dateISO: string): TaskTemplate[] {
  const date = new Date(`${dateISO}T12:00:00`);
  const dayIndex = (date.getDay() + 6) % 7;
  const diffDays = Math.floor((date.getTime() - TRAINING_START.getTime()) / 86400000);
  const weekIndex = Math.max(0, Math.min(TRAINING_WEEKS.length - 1, Math.floor(diffDays / 7)));
  const week = TRAINING_WEEKS[weekIndex] ?? TRAINING_WEEKS[0];
  if (!week || !week.days) return [];
  const definition = week.days[dayIndex] ?? week.days[0];
  if (!definition) return [];
  const rawTasks = (definition.tasks ?? []).length
    ? definition.tasks ?? []
    : (definition.sessions ?? []).flatMap((session) => session?.exercises ?? []);
  return rawTasks.map((t, idx) => ({
    ...t,
    type: t.type as any,
    estimatedMinutes: t.estimatedMinutes ?? 10,
    xp: t.xp ?? 10,
  }));
}

export function dayTemplate(dateISO: string) {
  const date = new Date(`${dateISO}T12:00:00`);
  const dayIndex = (date.getDay() + 6) % 7;
  const diffDays = Math.floor((date.getTime() - TRAINING_START.getTime()) / 86400000);
  const weekIndex = Math.max(0, Math.min(TRAINING_WEEKS.length - 1, Math.floor(diffDays / 7)));
  const week = TRAINING_WEEKS[weekIndex] ?? TRAINING_WEEKS[0];
  return week?.days[dayIndex] ?? week?.days[0];
}

export function daysUntil(targetISO: string) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const t = new Date(targetISO + "T00:00:00");
  return Math.max(0, Math.round((t.getTime() - now.getTime()) / 86400000));
}

export function xpForDate(state: ForgeState, dateISO: string) {
  const day = state.days[dateISO];
  if (!day) return 0;
  const tasks = tasksForDate(dateISO);
  return tasks.reduce((sum, t) => sum + (day.checked[t.id] ? t.xp : 0), 0);
}

export function totalXP(state: ForgeState) {
  return Object.keys(state.days).reduce((sum, d) => sum + xpForDate(state, d), 0);
}

export function computeStreak(state: ForgeState) {
  let streak = 0;
  const now = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const iso = toISO(d);
    const day = state.days[iso];
    const hasAny = day && Object.values(day.checked).some(Boolean);
    if (hasAny) streak++;
    else if (i > 0) break;
    else break;
  }
  // recompute: only count from most recent day with activity
  streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const iso = toISO(d);
    const day = state.days[iso];
    const done = day && Object.values(day.checked).some(Boolean);
    if (done) streak++;
    else break;
  }
  return streak;
}

export function dayCompletion(state: ForgeState, dateISO: string) {
  const tasks = tasksForDate(dateISO);
  const day = state.days[dateISO];
  if (!tasks.length) return 0;
  const done = tasks.filter((t) => day?.checked[t.id]).length;
  return done / tasks.length;
}

export function unlockBadges(state: ForgeState): string[] {
  const b = new Set(state.badges);
  const streak = computeStreak(state);
  if (streak >= 7) b.add("streak7");
  if (streak >= 30) b.add("streak30");
  const totalRun = state.perf
    .filter((p) => p.type === "run5" || p.type === "run10")
    .reduce((s, p) => s + p.value, 0);
  if (totalRun >= 100) b.add("run100");
  const totalSwim = 0; // could sum a swim perf if added
  if (totalSwim >= 50) b.add("swim50");
  return [...b];
}

export { BADGES };
