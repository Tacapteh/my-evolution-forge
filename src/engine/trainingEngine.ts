import { toISO } from "../lib/forge-store";
import type { ForgeState } from "../lib/forge-store";
import { militarySeptemberProgram } from "../data/programs/military-september";
import type { TrainingMission, TrainingProgress, TrainingWeeklyCompletion, TrainingDaySummary } from "../types/training";

const TRAINING_WEEKS = militarySeptemberProgram.weeks;
const TRAINING_START = new Date("2026-07-20T12:00:00");
const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

interface EngineDependencies {
  toggleTask: (date: string, taskId: string) => void;
}

interface EngineOptions {
  todayISO?: string;
}

export function createTrainingEngine(
  state: ForgeState,
  deps: EngineDependencies,
  options: EngineOptions = {},
) {
  const todayISO = options.todayISO ?? toISO(new Date());

  const getTrainingWeek = (dateISO: string) => {
    const date = new Date(`${dateISO}T12:00:00`);
    const dayIndex = (date.getDay() + 6) % 7;
    const diffDays = Math.floor((date.getTime() - TRAINING_START.getTime()) / 86400000);
    const weekIndex = Math.max(0, Math.min(TRAINING_WEEKS.length - 1, Math.floor(diffDays / 7)));
    const week = TRAINING_WEEKS[weekIndex];
    return { week, dayIndex };
  };

  const getProgramDefinition = (dateISO: string) => {
    const { week, dayIndex } = getTrainingWeek(dateISO);
    return week.days[dayIndex];
  };

  const buildMission = (dateISO: string): TrainingMission => {
    const { week, dayIndex } = getTrainingWeek(dateISO);
    const definition = week.days[dayIndex];
    const rawTasks = (definition.tasks ?? []).length
      ? definition.tasks ?? []
      : (definition.sessions ?? []).flatMap((session) => session.exercises);
    const tasks = rawTasks.map((task, index) => ({
      ...task,
      moment: task.moment ?? inferMoment(task.type, index),
      estimatedMinutes: task.estimatedMinutes ?? defaultDuration(task.type),
      rest: task.rest ?? defaultRest(task.type),
      steps: task.steps ?? defaultSteps(task),
    }));
    const day = state.days[dateISO];
    const checked = day?.checked ?? {};
    const doneCount = tasks.filter((task) => isTaskDone(task, checked)).length;
    const totalCount = tasks.length;
    const completionPct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;
    const remainingCount = Math.max(0, totalCount - doneCount);
    const status = doneCount === 0 ? "a_faire" : remainingCount === 0 ? "termine" : "en_cours";
    const psychoTask = tasks.find((task) => task.type === "psycho");
    const psychoDone = psychoTask ? isTaskDone(psychoTask, checked) : false;

    return {
      programId: militarySeptemberProgram.id,
      weekId: week.id,
      iso: dateISO,
      dayName: definition.name,
      title: definition.title ?? `${definition.name} - ${definition.objective}`,
      objective: definition.objective,
      priority: definition.priority ?? "Normale",
      tasks,
      doneCount,
      remainingCount,
      totalCount,
      completionPct,
      xp: tasks.reduce((sum, task) => sum + (isTaskDone(task, checked) ? task.xp : 0), 0),
      estimatedMinutes: tasks.reduce((sum, task) => sum + task.estimatedMinutes, 0),
      status,
      psychotechnique: psychoTask
        ? {
            label: psychoTask.label,
            detail: psychoTask.detail ?? "20 min",
            durationTarget: psychoTask.estimatedMinutes ?? 20,
            score: day?.psycho?.score,
            done: psychoDone,
          }
        : undefined,
      summary: buildSummary(doneCount, totalCount, remainingCount),
    };
  };

  const buildWeek = (dateISO: string): TrainingDaySummary[] => {
    const baseDate = new Date(`${dateISO}T12:00:00`);
    const start = new Date(baseDate);
    const dayOffset = (baseDate.getDay() + 6) % 7;
    start.setDate(baseDate.getDate() - dayOffset);

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      const iso = toISO(date);
      const mission = buildMission(iso);
      return {
        iso,
        label: DAY_LABELS[index],
        dayNumber: date.getDate(),
        dayName: mission.dayName,
        title: mission.title,
        objective: mission.objective,
        completionPct: mission.completionPct,
        doneCount: mission.doneCount,
        totalCount: mission.totalCount,
        taskCount: mission.totalCount,
        isToday: iso === todayISO,
        sessions: mission.tasks.slice(0, 2).map((task) => task.label),
      };
    });
  };

  const getWeeklyState = (dateISO: string) => {
    const week = buildWeek(dateISO);
    const completedDays = week.filter((day) => day.doneCount > 0).length;
    const totalDays = week.length;
    const completedTasks = week.reduce((sum, day) => sum + day.doneCount, 0);
    const totalTasks = week.reduce((sum, day) => sum + day.totalCount, 0);
    const xp = week.reduce((sum, day) => sum + buildMission(day.iso).xp, 0);

    return {
      completedDays,
      totalDays,
      completionPct: totalDays ? Math.round((completedDays / totalDays) * 100) : 0,
      completedTasks,
      totalTasks,
      xp,
    } satisfies TrainingWeeklyCompletion;
  };

  return {
    getTodayProgram: () => buildMission(todayISO),
    getCurrentWeek: (dateISO = todayISO) => buildWeek(dateISO),
    getCurrentDay: (dateISO = todayISO) => buildMission(dateISO),
    getMission: (dateISO: string) => buildMission(dateISO),
    getProgress: (dateISO = todayISO): TrainingProgress => {
      const mission = buildMission(dateISO);
      return {
        iso: mission.iso,
        completionPct: mission.completionPct,
        doneCount: mission.doneCount,
        remainingCount: mission.remainingCount,
        totalCount: mission.totalCount,
        status: mission.status,
        xp: mission.xp,
      };
    },
    completeExercise: (taskId: string, dateISO = todayISO) => {
      deps.toggleTask(dateISO, taskId);
    },
    getWeeklyCompletion: (dateISO = todayISO): TrainingWeeklyCompletion => getWeeklyState(dateISO),
    getDailyXP: (dateISO = todayISO) => buildMission(dateISO).xp,
  };
}

function inferMoment(type: string, index: number) {
  if (type === "psycho") return "psychotechniques";
  if (type === "swim") return "morning";
  if (type === "run") return index === 0 ? "afternoon" : "evening";
  if (type === "pull" || type === "chair") return "afternoon";
  return "evening";
}

function defaultDuration(type: string) {
  switch (type) {
    case "swim": return 45;
    case "pull": return 15;
    case "chair": return 10;
    case "run": return 50;
    case "psycho": return 20;
    case "stretch": return 10;
    case "hydration": return 2;
    default: return 10;
  }
}

function defaultRest(type: string) {
  switch (type) {
    case "swim": return "30s entre blocs";
    case "pull": return "90s";
    case "chair": return "45s";
    case "run": return "Marche 3 min si besoin";
    case "stretch": return "Respiration lente";
    default: return undefined;
  }
}

function defaultSteps(task: { type: string; label: string }) {
  switch (task.type) {
    case "run": return ["Échauffement progressif", task.label, "Retour au calme"];
    case "swim": return ["Échauffement facile", task.label, "Retour souple"];
    case "pull":
    case "chair": return [task.label, "Repos indiqué", "Dernière série propre"];
    case "psycho": return ["Timer 20 min", task.label, "Noter le score"];
    default: return [task.label];
  }
}

function buildSummary(doneCount: number, totalCount: number, remainingCount: number) {
  if (remainingCount === 0) return "Mission complète. La journée est bien avancée.";
  if (doneCount === 0) return "La journée commence, concentre-toi sur la première étape.";
  return `${doneCount}/${totalCount} terminés — ${remainingCount} restant${remainingCount > 1 ? "s" : ""}.`;
}

function isTaskDone(task: { id: string }, checked: Record<string, boolean>) {
  if (checked[task.id]) return true;

  const legacyAliases: Record<string, string[]> = {
    "w1-mon-pull": ["pull-1"],
    "w1-mon-chair": ["chair-1"],
    "w1-mon-psycho": ["psycho-1", "stretch-1", "hydro-1"],
    "w1-tue-run": ["run-2"],
    "w1-tue-psycho": ["psycho-2"],
  };

  return (legacyAliases[task.id] ?? []).some((alias) => checked[alias]);
}
