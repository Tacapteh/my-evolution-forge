import { WEEK, type TaskTemplate } from "./forge-data";
import type { ForgeState } from "./forge-store";

export type ProgramMoment = "morning" | "afternoon" | "evening" | "psychotechniques";
export type DayStatus = "a_faire" | "en_cours" | "termine";

export interface ProgramTask extends TaskTemplate {
  moment: ProgramMoment;
  estimatedMinutes: number;
  rest?: string;
  steps: string[];
}

export interface WeekDaySummary {
  iso: string;
  label: string;
  dayNumber: number;
  isToday: boolean;
  objective: string;
  taskCount: number;
  doneCount: number;
  completionPct: number;
  sessions: string[];
}

export interface DayMission {
  iso: string;
  title: string;
  dayName: string;
  objective: string;
  priority: "Haute" | "Normale" | "Recuperation";
  tasks: ProgramTask[];
  doneCount: number;
  remainingCount: number;
  totalCount: number;
  completionPct: number;
  xp: number;
  estimatedMinutes: number;
  status: DayStatus;
  psychotechnique?: {
    label: string;
    detail: string;
    durationTarget: number;
    score?: number;
    done: boolean;
  };
  summary: string;
}

export interface SessionHistoryItem {
  iso: string;
  dayName: string;
  doneCount: number;
  totalCount: number;
  completionPct: number;
  completed: boolean;
  highlight: string;
  note?: string;
}

const DURATION_BY_TYPE: Record<TaskTemplate["type"], number> = {
  swim: 45,
  pull: 15,
  chair: 10,
  run: 50,
  psycho: 20,
  stretch: 10,
  hydration: 2,
  custom: 10,
};

const REST_BY_TYPE: Partial<Record<TaskTemplate["type"], string>> = {
  swim: "30s entre blocs",
  pull: "90s",
  chair: "45s",
  run: "Marche 3 min si besoin",
  stretch: "Respiration lente",
};

const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export function toLocalISO(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function mondayIndex(date: Date) {
  const day = date.getDay();
  return day === 0 ? 7 : day;
}

export function startOfProgramWeek(date: Date) {
  const monday = new Date(date);
  monday.setHours(12, 0, 0, 0);
  monday.setDate(monday.getDate() - (mondayIndex(monday) - 1));
  return monday;
}

export function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

export function templateForDate(dateISO: string) {
  const date = new Date(`${dateISO}T12:00:00`);
  return WEEK[mondayIndex(date)];
}

export function programTasksForDate(dateISO: string): ProgramTask[] {
  const template = templateForDate(dateISO);
  return template.tasks.map((task, index) => ({
    ...task,
    label: normalizeText(task.label),
    detail: task.detail ? normalizeText(task.detail) : task.detail,
    moment: task.moment ?? inferMoment(task.type, index),
    estimatedMinutes: task.estimatedMinutes ?? DURATION_BY_TYPE[task.type],
    rest: task.rest ?? REST_BY_TYPE[task.type],
    steps: task.steps ?? defaultSteps(task),
  }));
}

export function groupTasksByMoment(tasks: ProgramTask[]) {
  return {
    morning: tasks.filter((task) => task.moment === "morning"),
    afternoon: tasks.filter((task) => task.moment === "afternoon"),
    evening: tasks.filter((task) => task.moment === "evening"),
    psychotechniques: tasks.filter((task) => task.moment === "psychotechniques"),
  };
}

import { createTrainingEngine } from "../engine/trainingEngine";

export function buildDayMission(state: ForgeState, dateISO: string): DayMission {
  const engine = createTrainingEngine(state, { toggleTask: () => {} }, { todayISO: dateISO });
  const mission = engine.getMission(dateISO);
  return {
    iso: mission.iso,
    title: mission.title,
    dayName: mission.dayName,
    objective: mission.objective,
    priority: mission.priority,
    tasks: mission.tasks.map((task) => ({
      ...task,
      moment: task.moment ?? "afternoon",
      estimatedMinutes: task.estimatedMinutes ?? 15,
      steps: task.steps ?? [task.label],
    })),
    doneCount: mission.doneCount,
    remainingCount: mission.remainingCount,
    totalCount: mission.totalCount,
    completionPct: mission.completionPct,
    xp: mission.xp,
    estimatedMinutes: mission.estimatedMinutes,
    status: mission.status,
    psychotechnique: mission.psychotechnique,
    summary: mission.summary,
  };
}

export function buildWeekDays(anchor: Date, state: ForgeState, todayISO = toLocalISO(new Date())) {
  const start = startOfProgramWeek(anchor);

  return Array.from({ length: 7 }, (_, index): WeekDaySummary => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const iso = toLocalISO(date);
    const mission = buildDayMission(state, iso);
    return {
      iso,
      label: DAY_LABELS[index],
      dayNumber: date.getDate(),
      isToday: iso === todayISO,
      objective: mission.objective,
      taskCount: mission.totalCount,
      doneCount: mission.doneCount,
      completionPct: mission.completionPct,
      sessions: sessionLabels(mission.tasks),
    };
  });
}

export function buildHistoryItems(
  state: ForgeState,
  todayISO: string,
  count = 7,
): SessionHistoryItem[] {
  const today = new Date(`${todayISO}T12:00:00`);

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - index);
    const iso = toLocalISO(date);
    const mission = buildDayMission(state, iso);
    const firstDone = mission.tasks.find((task) => state.days[iso]?.checked[task.id]);
    const firstPlanned = mission.tasks.find((task) => task.type !== "hydration");

    return {
      iso,
      dayName: mission.dayName,
      doneCount: mission.doneCount,
      totalCount: mission.totalCount,
      completionPct: mission.completionPct,
      completed: mission.status === "termine",
      highlight: firstDone?.label ?? firstPlanned?.label ?? "Repos",
      note: state.days[iso]?.journal?.notes,
    };
  });
}

function inferMoment(type: TaskTemplate["type"], index: number): ProgramMoment {
  if (type === "psycho") return "psychotechniques";
  if (type === "swim") return "morning";
  if (type === "run") return index === 0 ? "afternoon" : "evening";
  if (type === "pull" || type === "chair") return "afternoon";
  return "evening";
}

function inferPriority(tasks: ProgramTask[]): DayMission["priority"] {
  if (tasks.some((task) => task.type === "run" || task.type === "swim")) return "Haute";
  if (
    tasks.every(
      (task) => task.type === "stretch" || task.type === "hydration" || task.type === "psycho",
    )
  ) {
    return "Recuperation";
  }
  return "Normale";
}

function defaultSteps(task: TaskTemplate) {
  switch (task.type) {
    case "run":
      return ["Echauffement progressif", normalizeText(task.label), "Retour au calme"];
    case "swim":
      return ["Echauffement facile", normalizeText(task.label), "Retour souple"];
    case "pull":
    case "chair":
      return [normalizeText(task.label), "Repos indique", "Derniere serie propre"];
    case "psycho":
      return ["Timer 20 min", normalizeText(task.label), "Noter le score"];
    default:
      return [normalizeText(task.label)];
  }
}

function buildSummary(doneCount: number, totalCount: number, remainingCount: number) {
  if (totalCount === 0) return "Aucune action planifiee.";
  if (remainingCount === 0) return "Journee terminee. Resume pret pour le journal.";
  if (doneCount === 0) return "Mission prete. Lance la premiere action.";
  return `${doneCount} action${doneCount > 1 ? "s" : ""} validee${doneCount > 1 ? "s" : ""}, ${remainingCount} restante${remainingCount > 1 ? "s" : ""}.`;
}

function sessionLabels(tasks: ProgramTask[]) {
  const labels = new Set<string>();
  tasks.forEach((task) => {
    if (task.type === "swim") labels.add("Natation");
    if (task.type === "run") labels.add("Course");
    if (task.type === "pull" || task.type === "chair") labels.add("Force");
    if (task.type === "psycho") labels.add("Psycho");
    if (task.type === "stretch") labels.add("Mobilite");
  });
  return [...labels];
}
