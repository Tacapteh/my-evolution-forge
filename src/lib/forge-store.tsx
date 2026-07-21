import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { WEEK, BADGES, DEFAULT_TARGET_DATE, type TaskTemplate } from "./forge-data";

// --- Types

export interface DayRecord {
  checked: Record<string, boolean>; // taskId -> done
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
}

export interface PerfEntry {
  id: string;
  date: string; // ISO
  type: "pull" | "chair" | "run5" | "run10" | "luc" | "weight" | "hr" | "sleep";
  value: number;
}

export interface ForgeState {
  targetDate: string;
  userName: string;
  days: Record<string, DayRecord>; // yyyy-mm-dd
  perf: PerfEntry[];
  badges: string[]; // ids unlocked
}

const KEY = "forge.state.v1";

const initial: ForgeState = {
  targetDate: DEFAULT_TARGET_DATE,
  userName: "Quentin",
  days: {},
  perf: [],
  badges: [],
};

// --- Context

interface Ctx {
  state: ForgeState;
  setState: (s: ForgeState | ((prev: ForgeState) => ForgeState)) => void;
  toggleTask: (date: string, taskId: string) => void;
  setJournal: (date: string, journal: DayRecord["journal"]) => void;
  setPsycho: (date: string, psycho: DayRecord["psycho"]) => void;
  addPerf: (entry: Omit<PerfEntry, "id">) => void;
  removePerf: (id: string) => void;
  reset: () => void;
  hydrated: boolean;
}

const ForgeCtx = createContext<Ctx | null>(null);

export function ForgeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ForgeState>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...initial, ...JSON.parse(raw) });
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {}
  }, [state, hydrated]);

  const value: Ctx = useMemo(
    () => ({
      state,
      setState,
      hydrated,
      toggleTask: (date, taskId) =>
        setState((prev) => {
          const day = prev.days[date] ?? { checked: {} };
          const checked = { ...day.checked, [taskId]: !day.checked[taskId] };
          const newBadges = new Set(prev.badges);
          if (Object.values(checked).some(Boolean)) newBadges.add("first");
          return { ...prev, days: { ...prev.days, [date]: { ...day, checked } }, badges: [...newBadges] };
        }),
      setJournal: (date, journal) =>
        setState((prev) => {
          const day = prev.days[date] ?? { checked: {} };
          return { ...prev, days: { ...prev.days, [date]: { ...day, journal: { ...day.journal, ...journal } } } };
        }),
      setPsycho: (date, psycho) =>
        setState((prev) => {
          const day = prev.days[date] ?? { checked: {} };
          return { ...prev, days: { ...prev.days, [date]: { ...day, psycho: { ...day.psycho, ...psycho } } } };
        }),
      addPerf: (entry) =>
        setState((prev) => {
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
      removePerf: (id) => setState((prev) => ({ ...prev, perf: prev.perf.filter((p) => p.id !== id) })),
      reset: () => setState(initial),
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

export function dowMon(d: Date) {
  // 1 = Monday ... 7 = Sunday
  const dow = d.getDay();
  return dow === 0 ? 7 : dow;
}

export function tasksForDate(dateISO: string): TaskTemplate[] {
  const d = new Date(dateISO + "T12:00:00");
  return WEEK[dowMon(d)].tasks;
}

export function dayTemplate(dateISO: string) {
  const d = new Date(dateISO + "T12:00:00");
  return WEEK[dowMon(d)];
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
  const totalRun = state.perf.filter((p) => p.type === "run5" || p.type === "run10").reduce((s, p) => s + p.value, 0);
  if (totalRun >= 100) b.add("run100");
  const totalSwim = 0; // could sum a swim perf if added
  if (totalSwim >= 50) b.add("swim50");
  return [...b];
}

export { BADGES };
