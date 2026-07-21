import { toISO } from "../lib/forge-store";
import type { ForgeState } from "../lib/forge-store";
import { militarySeptemberProgram } from "../data/programs/military-september";
import type { TrainingMission, TrainingProgress, TrainingWeeklyCompletion, TrainingDaySummary } from "../types/training";

export const ACTIVITY_PRESETS: Record<string, { id: string; label: string; detail: string; type: "swim" | "run" | "pull" | "chair" | "stretch" | "psycho"; estimatedMinutes: number; xp: number; steps: string[] }> = {
  natation: {
    id: "natation",
    label: "Natation — 1000m continu & éducatifs aquatiques",
    detail: "Travail d'aisance aquatique et endurance respiratoire",
    type: "swim",
    estimatedMinutes: 45,
    xp: 25,
    steps: ["Échauffement 200m coulée", "800m nage libre / brasse", "Récupération 100m"],
  },
  course: {
    id: "course",
    label: "Course à pied — Endurance fondamentale",
    detail: "45 min à 75% VMA en aisance respiratoire",
    type: "run",
    estimatedMinutes: 45,
    xp: 25,
    steps: ["Échauffement 5 min", "40 min course continue", "Retour au calme 5 min"],
  },
  fractionne: {
    id: "fractionne",
    label: "Course — Fractionné court 30/30",
    detail: "12 répétitions (30s rapide / 30s trotté)",
    type: "run",
    estimatedMinutes: 35,
    xp: 30,
    steps: ["10 min footing d'échauffement", "12 x (30s VMA / 30s marche)", "5 min retour au calme"],
  },
  tractions: {
    id: "tractions",
    label: "Tractions & Haut du corps — Séries adaptatives",
    detail: "Renforcement musculaire du dos et des bras",
    type: "pull",
    estimatedMinutes: 30,
    xp: 20,
    steps: ["Échauffement épaules", "5 séries adaptées à votre max", "Étirements"],
  },
  chaise: {
    id: "chaise",
    label: "Chaise & Gainage — Séries isométriques",
    detail: "Renforcement des quadriceps et de la ceinture abdominale",
    type: "chair",
    estimatedMinutes: 25,
    xp: 20,
    steps: ["Échauffement genoux/cuisses", "4 séries de chaise à 90°", "Gainage 3x1 min"],
  },
  psycho: {
    id: "psycho",
    label: "Psychotechniques — Calcul mental & Logique",
    detail: "Entraînement aux tests d'aptitude militaire",
    type: "psycho",
    estimatedMinutes: 20,
    xp: 15,
    steps: ["Série de calcul rapide", "Tests de suites numériques", "Test d'attention"],
  },
  repos: {
    id: "repos",
    label: "Récupération active & Étirements",
    detail: "Mobilité, hydratation et récupération musculaire",
    type: "stretch",
    estimatedMinutes: 20,
    xp: 10,
    steps: ["Hydratation complète", "15 min d'étirements doux", "Sommeil réparateur"],
  },
};

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
    const week = TRAINING_WEEKS[weekIndex] ?? TRAINING_WEEKS[0];
    return { week, dayIndex };
  };

  const getProgramDefinition = (dateISO: string) => {
    const { week, dayIndex } = getTrainingWeek(dateISO);
    return week.days[dayIndex] ?? week.days[0];
  };

  const buildMission = (dateISO: string): TrainingMission => {
    const { week, dayIndex } = getTrainingWeek(dateISO);
    const date = new Date(`${dateISO}T12:00:00`);
    const diffDays = Math.floor((date.getTime() - TRAINING_START.getTime()) / 86400000);
    const weekIndex = Math.max(0, Math.min(TRAINING_WEEKS.length - 1, Math.floor(diffDays / 7)));

    const pullPerfs = (state.perf ?? []).filter((p) => p.type === "pull").map((p) => p.value);
    const userMaxPull = pullPerfs.length > 0 ? Math.max(...pullPerfs) : 6;

    const chairPerfs = (state.perf ?? []).filter((p) => p.type === "chair").map((p) => p.value);
    const userMaxChair = chairPerfs.length > 0 ? Math.max(...chairPerfs) : 60;

    const lucPerfs = (state.perf ?? []).filter((p) => p.type === "luc").map((p) => p.value);
    const userMaxLuc = lucPerfs.length > 0 ? Math.max(...lucPerfs) : 7.0;

    const isTestMaxDay = dayIndex === 6 && (weekIndex + 1) % 2 === 0;

    const definition = week.days[dayIndex] ?? week.days[0];
    const rawTasks = (definition?.tasks ?? []).length
      ? definition.tasks ?? []
      : (definition?.sessions ?? []).flatMap((session) => session.exercises);

    let tasks = rawTasks.map((task, index) => {
      let label = task.label;
      let detail = task.detail;
      let steps = task.steps;

      if (task.type === "pull") {
        if (isTestMaxDay) {
          label = "⚠️ TEST MAX TRACTIONS (Obligatoire)";
          detail = `1 série à l'échec strict • Saisis ton score pour adapter les 2 prochaines semaines (Max: ${userMaxPull} / Obj: 17-20)`;
          steps = ["Échauffement haut du corps", "1 série max strict jusqu'à l'échec", "Saisir le score dans l'application"];
        } else if (dayIndex === 0 || dayIndex === 2) {
          // Sous-maximal 65%
          const reps = Math.max(3, Math.round(userMaxPull * 0.65));
          label = `Tractions — 5 × ${reps} reps`;
          detail = `Sous-maximal (65% de Max=${userMaxPull}) • Repos 90s`;
        } else if (dayIndex === 3 || dayIndex === 4) {
          // Dégressif
          const r1 = Math.max(2, userMaxPull - 1);
          const r2 = Math.max(2, userMaxPull - 2);
          const r3 = Math.max(1, userMaxPull - 3);
          const r4 = Math.max(1, userMaxPull - 4);
          const r5 = Math.max(1, userMaxPull - 4);
          label = `Tractions — Dégressif : ${r1}-${r2}-${r3}-${r4}-${r5} reps`;
          detail = `Travail d'épuisement • Max=${userMaxPull} reps • Repos 90s`;
        } else {
          // Pyramide
          const p1 = Math.max(2, Math.round(userMaxPull * 0.50));
          const p2 = Math.max(3, Math.round(userMaxPull * 0.75));
          const p3 = Math.max(4, Math.round(userMaxPull * 0.90));
          const p4 = Math.max(3, Math.round(userMaxPull * 0.75));
          const p5 = Math.max(2, Math.round(userMaxPull * 0.50));
          label = `Tractions — Pyramide : ${p1}-${p2}-${p3}-${p4}-${p5} reps`;
          detail = `Pyramide de force (Pic à 90%) • Max=${userMaxPull} reps • Repos 90s`;
        }
      } else if (task.type === "chair") {
        if (isTestMaxDay) {
          label = "⚠️ TEST MAX CHAISE (Obligatoire)";
          detail = `1 série max à 90° jusqu'à l'échec • Saisis ton temps pour adapter les 2 prochaines semaines (Record: ${userMaxChair}s / Obj: 168s)`;
          steps = ["Dos collé au mur à 90°", "Chronométrer jusqu'à l'échec strict", "Saisir le temps en secondes dans l'application"];
        } else if (dayIndex === 0 || dayIndex === 2) {
          const secs = Math.max(30, Math.round(userMaxChair * 0.75));
          label = `Chaise — 4 × ${secs}s (75% du Max)`;
          detail = `Basé sur ton record (${userMaxChair}s) • Repos 60s`;
        } else if (dayIndex === 3 || dayIndex === 4) {
          const s1 = Math.max(20, userMaxChair - 10);
          const s2 = Math.max(15, userMaxChair - 20);
          const s3 = Math.max(15, userMaxChair - 30);
          const s4 = Math.max(10, userMaxChair - 40);
          label = `Chaise — Dégressif : ${s1}s - ${s2}s - ${s3}s - ${s4}s`;
          detail = `Épuisement isométrique • Record: ${userMaxChair}s • Repos 60s`;
        } else {
          const c1 = Math.max(20, Math.round(userMaxChair * 0.60));
          const c2 = Math.max(30, Math.round(userMaxChair * 0.85));
          const c3 = Math.max(35, Math.round(userMaxChair * 0.95));
          const c4 = Math.max(30, Math.round(userMaxChair * 0.85));
          const c5 = Math.max(20, Math.round(userMaxChair * 0.60));
          label = `Chaise — Pyramide : ${c1}s - ${c2}s - ${c3}s - ${c4}s - ${c5}s`;
          detail = `Pyramide d'effort (Pic à 95% = ${c3}s) • Repos 60s`;
        }
      } else if (task.type === "run") {
        const isThursday = dayIndex === 3;
        if (isThursday && isTestMaxDay) {
          label = "⚠️ TEST MAX LUC LÉGER (Bi-hebdomadaire)";
          detail = `Test navette 20m avec bande sonore du jeudi • Saisis ton Palier atteint (Actuel: Palier ${userMaxLuc} / Obj: Palier 12)`;
          steps = ["Tracer 20m avec balises", "Suivre les bips de la bande sonore Luc Léger", "Arrêt au 2ème manquement consécutif", "Saisir le Palier dans l'application"];
        } else if (isThursday) {
          const targetPalier = Math.min(12, +(userMaxLuc + 0.5).toFixed(1));
          label = `Entraînement Luc Léger — Allure Palier ${targetPalier}`;
          detail = `Séance spécifique Luc Léger (Navettes 20m) • Palier cible ${targetPalier} (Basé sur max Palier ${userMaxLuc})`;
          steps = ["Échauffement 10 min", `Navettes 20m au rythme Palier ${targetPalier}`, "5 min récupération active"];
        } else if (dayIndex === 1) {
          const targetPalier = Math.min(12, +(userMaxLuc + 0.5).toFixed(1));
          label = `Fractionné VMA 30/30 — 12 reps à l'allure Palier ${targetPalier}`;
          detail = `Allure sur-optimisée (+0.5 palier vs max ${userMaxLuc}) • 30s effort / 30s trotté`;
        } else if (dayIndex === 5) {
          const pMax = Math.min(12, +(userMaxLuc + 1.0).toFixed(1));
          label = `Fractionné Pyramidal — 1'-2'-3'-2'-1' (Allure Palier ${userMaxLuc} à ${pMax})`;
          detail = `Montée progressive d'intensité VMA • Repos = Temps d'effort`;
        } else {
          const endurancePalier = Math.max(5.0, +(userMaxLuc * 0.75).toFixed(1));
          label = `Endurance Fondamentale — 45 min à l'allure Palier ${endurancePalier}`;
          detail = `Aisance respiratoire (75% VMA) • Base cardiorespiratoire`;
        }
      }

      return {
        ...task,
        label,
        detail,
        moment: task.moment ?? inferMoment(task.type, index),
        estimatedMinutes: task.estimatedMinutes ?? defaultDuration(task.type),
        rest: task.rest ?? defaultRest(task.type),
        steps: steps ?? defaultSteps(task),
      };
    });

    // Éviter d'avoir deux Luc Léger le Jeudi : le soir est un footing léger
    let thuRunCount = 0;
    tasks = tasks.map((t) => {
      if (dayIndex === 3 && t.type === "run") {
        thuRunCount++;
        if (thuRunCount > 1) {
          return {
            ...t,
            label: "Course en duo — Footing de récupération léger",
            detail: "Footing très doux à allure confortable (Pas de Luc Léger le soir)",
            steps: ["Footing très doux 20-30 min", "Respiration aisée", "Étirements"],
          };
        }
      }
      return t;
    });

    // Appliquer les réagencements / modifications d'activités personnalisés
    const swaps = state.days[dateISO]?.swaps ?? {};
    const finalTasks: any[] = [];
    const processedMoments = new Set<string>();

    for (const t of tasks) {
      const moment = t.moment;
      const swapId = swaps[moment];
      if (swapId && ACTIVITY_PRESETS[swapId]) {
        if (!processedMoments.has(moment)) {
          processedMoments.add(moment);
          const preset = ACTIVITY_PRESETS[swapId];
          finalTasks.push({
            ...t,
            id: `swapped-${dateISO}-${moment}-${swapId}`,
            moment,
            label: preset.label,
            detail: preset.detail,
            type: preset.type,
            estimatedMinutes: preset.estimatedMinutes,
            xp: preset.xp,
            steps: preset.steps,
          });
        }
      } else {
        finalTasks.push(t);
      }
    }

    // Gérer aussi les moments qui n'avaient pas de tâche initiale sur ce jour
    const allMoments = ["morning", "afternoon", "evening", "psychotechniques"] as const;
    for (const mKey of allMoments) {
      const swapId = swaps[mKey];
      if (swapId && ACTIVITY_PRESETS[swapId] && !processedMoments.has(mKey)) {
        processedMoments.add(mKey);
        const preset = ACTIVITY_PRESETS[swapId];
        finalTasks.push({
          id: `swapped-${dateISO}-${mKey}-${swapId}`,
          moment: mKey,
          label: preset.label,
          detail: preset.detail,
          type: preset.type,
          estimatedMinutes: preset.estimatedMinutes,
          xp: preset.xp,
          steps: preset.steps,
          completed: false,
        });
      }
    }

    const momentOrder: Record<string, number> = { morning: 1, afternoon: 2, evening: 3, psychotechniques: 4 };
    finalTasks.sort((a, b) => (momentOrder[a.moment] ?? 5) - (momentOrder[b.moment] ?? 5));
    const day = state.days[dateISO];
    const checked = day?.checked ?? {};
    const doneCount = finalTasks.filter((task) => isTaskDone(task, checked)).length;
    const totalCount = finalTasks.length;
    const completionPct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;
    const remainingCount = Math.max(0, totalCount - doneCount);
    const status = doneCount === 0 ? "a_faire" : remainingCount === 0 ? "termine" : "en_cours";
    const psychoTask = finalTasks.find((task) => task.type === "psycho");
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
