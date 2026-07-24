import { toISO } from "../lib/forge-store";
import type { ForgeState } from "../lib/forge-store";
import { militarySeptemberProgram } from "../data/programs/military-september";
import type { TrainingMission, TrainingProgress, TrainingWeeklyCompletion, TrainingDaySummary } from "../types/training";

export interface ActivityPreset {
  id: string;
  label: string;
  detail: string;
  type: "swim" | "run" | "pull" | "chair" | "stretch" | "psycho" | "custom";
  estimatedMinutes: number;
  xp: number;
  steps: string[];
  swapTags: string[];
  isIsolation?: boolean;
}

export const ACTIVITY_PRESETS: Record<string, ActivityPreset> = {
  natation: {
    id: "natation",
    label: "Natation — 1000m continu & éducatifs aquatiques",
    detail: "Travail d'aisance aquatique et endurance respiratoire",
    type: "swim",
    estimatedMinutes: 45,
    xp: 25,
    steps: ["Échauffement 200m coulée", "800m nage libre / brasse", "Récupération 100m"],
    swapTags: ["cardio", "aquatique", "endurance"],
  },
  course: {
    id: "course",
    label: "Course à pied — Endurance fondamentale",
    detail: "45 min à 75% VMA en aisance respiratoire",
    type: "run",
    estimatedMinutes: 45,
    xp: 25,
    steps: ["Échauffement 5 min", "40 min course continue", "Retour au calme 5 min"],
    swapTags: ["cardio", "course", "endurance"],
  },
  fractionne: {
    id: "fractionne",
    label: "Course — Fractionné court 30/30",
    detail: "12 répétitions (30s rapide / 30s trotté)",
    type: "run",
    estimatedMinutes: 35,
    xp: 30,
    steps: ["10 min footing d'échauffement", "12 x (30s VMA / 30s marche)", "5 min retour au calme"],
    swapTags: ["cardio", "course", "vma"],
  },
  tractions: {
    id: "tractions",
    label: "Tractions — Séries adaptatives",
    detail: "Renforcement musculaire du dos et des bras",
    type: "pull",
    estimatedMinutes: 30,
    xp: 20,
    steps: ["Échauffement épaules", "Séries adaptées à votre max • Repos strict 90s", "Étirements"],
    swapTags: ["tirage", "dos", "biceps", "tirage_poly"],
  },
  pompes_militaires: {
    id: "pompes_militaires",
    label: "Pompes Militaires — Renforcement Pectoraux & Triceps",
    detail: "Tempo 2010 (2s descente, 0s pause, 1s montée, 0s pause) • Repos strict : 90s • Consignes : Coudes à 45°, corps gainé, poitrine effleurant le sol",
    type: "pull",
    estimatedMinutes: 25,
    xp: 20,
    steps: ["Consignes : Coudes à 45°, corps parfaitement gainé, poitrine sol à chaque rep", "Exécution Tempo 2010", "Repos strict : 90s entre les séries"],
    swapTags: ["poussée", "pectoraux", "triceps", "poussée_poly"],
  },
  pompes_diamant: {
    id: "pompes_diamant",
    label: "Pompes Diamant — Triceps & Sternum",
    detail: "Tempo 2010 • Repos strict : 90s • Consignes : Mains jointes en diamant sous le sternum, coudes serrés",
    type: "pull",
    estimatedMinutes: 25,
    xp: 20,
    steps: ["Consignes : Mains jointes en diamant sous le sternum, coudes serrés le long du corps", "Exécution Tempo 2010", "Repos strict : 90s"],
    swapTags: ["poussée", "triceps", "triceps_heavy", "poussée_poly"],
  },
  pompes_declinees: {
    id: "pompes_declinees",
    label: "Pompes Déclinées sur chaise — Haut de Poitrine & Épaules",
    detail: "Tempo 2010 • Repos strict : 90s • Consignes : Pieds surélevés sur chaise/banc, corps aligné",
    type: "pull",
    estimatedMinutes: 25,
    xp: 20,
    steps: ["Consignes : Pieds surélevés sur chaise, corps aligné sans creuser le dos", "Exécution Tempo 2010", "Repos strict : 90s"],
    swapTags: ["poussée", "pectoraux_haut", "épaules", "poussée_poly"],
  },
  tractions_lsit: {
    id: "tractions_lsit",
    label: "Tractions L-Sit — Tirage Horizontal & Core",
    detail: "Tirage vertical & gainage L-Sit (Jambes à 90°) • Option Tuck L-Sit (genoux pliés) • Repos strict : 90s",
    type: "pull",
    estimatedMinutes: 25,
    xp: 20,
    steps: [
      "Consignes : Suspendu à la barre, lever les jambes tendues à 90° (parallèles au sol)",
      "Tirer le menton au-dessus de la barre en maintaining le buste et les jambes immobiles",
      "Option régression : Replier les genoux à 90° (Tuck L-Sit) si les jambes tendues sont trop exigeantes",
      "Repos strict : 90s entre les séries",
    ],
    swapTags: ["tirage", "dos", "biceps", "core", "tirage_poly"],
  },
  squat_iso: {
    id: "squat_iso",
    label: "Squat Isométrique — Cuisses au mur (90°)",
    detail: "Tempo Isométrie 1000 (maintien statique à 90°) • Repos strict : 60s",
    type: "chair",
    estimatedMinutes: 20,
    xp: 20,
    steps: ["Dos plaqué au mur, cuisses parallèles au sol (90°)", "Maintien statique continu", "Repos strict : 60s"],
    swapTags: ["cuisses", "isométrie", "bas_du_corps"],
  },
  gainage_commando: {
    id: "gainage_commando",
    label: "Gainage Commando — Planche Coudes ↔ Bras tendus",
    detail: "Passage dynamique coudes à bras tendus • Repos strict : 60s",
    type: "chair",
    estimatedMinutes: 15,
    xp: 20,
    steps: ["Départ en planche sur les coudes", "Passage dynamique bras tendus alternativement", "3 séries de 45s • Repos 60s"],
    swapTags: ["core", "gainage", "abdominaux"],
  },
  bras_diamant: {
    id: "bras_diamant",
    label: "Pompes Diamant — Triceps (Échec)",
    detail: "Module Bras Explosion [1/4] • Mains en diamant, coudes serrés",
    type: "pull",
    estimatedMinutes: 6,
    xp: 15,
    steps: ["Mains jointes en diamant sous le sternum", "3 séries à l'échec strict", "Repos 60s"],
    swapTags: ["poussée", "triceps", "triceps_heavy", "poussée_isolation"],
    isIsolation: true,
  },
  bras_biceps_iso: {
    id: "bras_biceps_iso",
    label: "Tractions Supination — Blocage Iso 90°",
    detail: "Module Bras Explosion [2/4] • Supination serrée (3 × 30s)",
    type: "pull",
    estimatedMinutes: 6,
    xp: 15,
    steps: ["Supination serrée", "Blocage isométrique à 90° d'angle", "3 séries de 30s • Repos 60s"],
    swapTags: ["tirage", "biceps", "biceps_iso", "tirage_isolation"],
    isIsolation: true,
  },
  bras_triceps_sol: {
    id: "bras_triceps_sol",
    label: "Extensions Triceps au Sol (Pompes Sphinx)",
    detail: "Module Bras Explosion [3/4] • Coudes posés -> bras tendus (Pompes Sphinx)",
    type: "pull",
    estimatedMinutes: 6,
    xp: 15,
    steps: ["Planche sur avant-bras", "Poussée sur paumes pour tendre les bras (Pompes Sphinx)", "3 séries à l'échec • Repos 60s"],
    swapTags: ["poussée", "triceps", "triceps_heavy", "poussée_isolation"],
    isIsolation: true,
  },
  bras_biceps_neg: {
    id: "bras_biceps_neg",
    label: "Tractions Supination Négatives 5s",
    detail: "Module Bras Explosion [4/4] • Contrôle descente 5s (3 × 6-8 reps)",
    type: "pull",
    estimatedMinutes: 6,
    xp: 15,
    steps: ["Départ menton au-dessus de la barre", "Freinage de la descente sur 5 secondes", "3 × 6-8 reps à l'échec • Repos 60s"],
    swapTags: ["tirage", "biceps", "biceps_excentrique", "tirage_isolation"],
    isIsolation: true,
  },
  psycho: {
    id: "psycho",
    label: "Psychotechniques — Calcul mental & Logique",
    detail: "Entraînement aux tests d'aptitude militaire",
    type: "psycho",
    estimatedMinutes: 20,
    xp: 15,
    steps: ["Série de calcul rapide", "Tests de suites numériques", "Test d'attention"],
    swapTags: ["psycho", "mental"],
  },
  repos: {
    id: "repos",
    label: "Récupération active & Étirements musculaires",
    detail: "Mobilité, relaxation et récupération musculaire",
    type: "stretch",
    estimatedMinutes: 20,
    xp: 15,
    steps: ["10 min étirements doux", "5 min automassages", "5 min exercices de respiration"],
    swapTags: ["stretch", "recup"],
  },
};

export function extractTargetDistance(task: { label: string; detail?: string; type: string }): { targetValue: number; unit: "m" | "km" } | null {
  const str = `${task.label} ${task.detail ?? ""}`;

  const multMatch = str.match(/(\d+)\s*[\timesx×]\s*(\d+)\s*m/i);
  if (multMatch) {
    return { targetValue: parseInt(multMatch[1], 10) * parseInt(multMatch[2], 10), unit: "m" };
  }

  const kmMatch = str.match(/(\d+(?:[\.,]\d+)?)\s*km\b/i);
  if (kmMatch) {
    return { targetValue: parseFloat(kmMatch[1].replace(",", ".")), unit: "km" };
  }

  const metersMatch = str.match(/(\d+)\s*m\b/i);
  if (metersMatch && !str.includes("20m")) {
    const mVal = parseInt(metersMatch[1], 10);
    if (mVal >= 100) return { targetValue: mVal, unit: "m" };
  }

  if (task.type === "swim") return { targetValue: 1000, unit: "m" };
  if (task.type === "run") return { targetValue: 5, unit: "km" };

  return null;
}

const TRAINING_WEEKS = militarySeptemberProgram.weeks;
const TRAINING_START = new Date("2026-07-20T12:00:00");
const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export function getUserMaxes(state: ForgeState) {
  const perfs = state.perf ?? [];
  const getMax = (type: string, fallback: number) => {
    const list = perfs.filter((p) => p.type === type).map((p) => p.value);
    return list.length > 0 ? Math.max(...list) : fallback;
  };

  const userMaxPull = getMax("pull", 6);
  const userMaxPullLSit = getMax("pull_lsit", Math.max(3, Math.round(userMaxPull * 0.50)));
  const userMaxPullSupineIso = getMax("pull_supine_iso", 30);
  const userMaxPullSupineNeg = getMax("pull_supine_neg", 8);

  const userMaxPushMilitary = getMax("push_military", Math.max(15, Math.round(userMaxPull * 2.5)));
  const userMaxPushDiamond = getMax("push_diamond", Math.max(12, Math.round(userMaxPushMilitary * 0.8)));
  const userMaxPushDeclined = getMax("push_declined", Math.max(12, Math.round(userMaxPushMilitary * 0.85)));
  const userMaxTriceps = getMax("push_triceps", Math.max(10, Math.round(userMaxPushMilitary * 0.7)));

  const userMaxChair = getMax("chair", 60);
  const userMaxSquat = getMax("squat", 30);
  const userMaxLunge = getMax("lunge", 15);
  const userMaxCalves = getMax("calves", 25);

  const userMaxCommando = getMax("commando", 45);
  const userMaxLuc = getMax("luc", 7.0);
  const userMaxVMA = getMax("vma", +(userMaxLuc * 1.5 + 4).toFixed(1));

  return {
    userMaxPull,
    userMaxPullLSit,
    userMaxPullSupineIso,
    userMaxPullSupineNeg,
    userMaxPushMilitary,
    userMaxPushDiamond,
    userMaxPushDeclined,
    userMaxTriceps,
    userMaxChair,
    userMaxSquat,
    userMaxLunge,
    userMaxCalves,
    userMaxCommando,
    userMaxLuc,
    userMaxVMA,
  };
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
    return { week, dayIndex, weekIndex };
  };

  const buildMission = (dateISO: string): TrainingMission => {
    const { week, dayIndex, weekIndex } = getTrainingWeek(dateISO);
    
    const userMaxes = getUserMaxes(state);
    const userMaxPull = userMaxes.userMaxPull;
    const userMaxPush = userMaxes.userMaxPushMilitary;
    const userMaxChair = userMaxes.userMaxChair;
    const userMaxLuc = userMaxes.userMaxLuc;

    const isTestMaxDay = dayIndex === 6 && (weekIndex + 1) % 2 === 0;

    const definition = week.days[dayIndex] ?? week.days[0];
    const rawTasks = (definition?.tasks ?? []).length
      ? definition.tasks ?? []
      : (definition?.sessions ?? []).flatMap((session) => session.exercises);

    const dayRecord = state.days[dateISO];
    const checkedMap = dayRecord?.checked ?? {};
    const swapsMap = dayRecord?.swaps ?? {};

    const hasRawSwim = rawTasks.some(
      (t) => t.type === "swim" || (t.label && t.label.toLowerCase().includes("natation"))
    );
    const isSwimChecked = Object.keys(checkedMap).some((taskId) => {
      if (!checkedMap[taskId]) return false;
      const t = rawTasks.find((rt) => rt.id === taskId);
      return taskId.includes("swim") || (t && t.type === "swim");
    });
    const isSwimSwapped = swapsMap.morning === "natation";
    const hasHealthSwim = (dayRecord?.health?.workouts ?? []).some(
      (w) => w.type && (w.type.toLowerCase().includes("natation") || w.type.toLowerCase().includes("swim"))
    );

    const hasMorningSwim = hasRawSwim || isSwimChecked || isSwimSwapped || hasHealthSwim;

    let tasks = rawTasks.map((task, index) => {
      let label = task.label;
      let detail = task.detail;
      let steps = task.steps;

      if (task.type === "pull") {
        if (isTestMaxDay) {
          label = "⚠️ TEST MAX TRACTIONS (Obligatoire — Cycle 2 semaines)";
          detail = `1 série à l'échec strict • Tempo 2010 • Repos strict 120s • Saisis ton score pour adapter les séances futures (Max: ${userMaxPull} / Obj: 17-20)`;
          steps = ["Échauffement haut du corps et mobilité des épaules", "1 série unique à l'échec strict (Tempo 2010)", "Saisir le score dans l'application"];
        } else if (dayIndex === 3) {
          label = "Tractions (Pré-activation) — 4 × 3 reps (Sous-maximales)";
          detail = `Pré-activation du haut du corps sans échec (RIR 3-4) • Conserver la fraîcheur avant le cardio de l'après-midi • Repos : 90s`;
          steps = [
            "Échauffement articulaire et mobilité des épaules",
            "4 séries de 3 à 4 tractions sous-maximales contrôlées (Tempo 2010, RIR 3-4)",
            "Ne pas aller à l'échec : pré-activation pure",
            "Repos strict : 90s entre les séries",
          ];
        } else if (hasMorningSwim) {
          const reps = Math.max(3, Math.round(userMaxPull * 0.55));
          label = `Tractions (Maintien / Technique) — 4 × ${reps} reps (RIR 2-3)`;
          detail = `Programme Maintien & Technique (post-natation, RIR 2-3) • 50-60% du Max (${userMaxPull}) • Tempo 2010 • Repos strict : 90s`;
          steps = [
            "Échauffement articulaire et mobilité des épaules post-natation",
            `4 séries droites de ${reps} tractions sous-maximales (RIR 2-3)`,
            "Tempo 2010 : 2s descente freinée, 1s montée contrôlée",
            "Repos strict : 90s entre les séries",
          ];
        } else {
          // Séries Droites (RIR 1-2) pour l'entraînement principal (Lundi, Mercredi, Vendredi)
          let numSets = 4;
          let targetReps = Math.max(3, Math.round(userMaxPull * 0.70));

          const matchSetsReps = task.label.match(/(\d+)\s*[\timesx×]\s*(\d+)/i);
          if (matchSetsReps) {
            numSets = parseInt(matchSetsReps[1], 10);
            targetReps = Math.max(targetReps, parseInt(matchSetsReps[2], 10));
          }

          label = `Tractions (Séries Droites RIR 1-2) — ${numSets} × ${targetReps} reps`;
          detail = `${numSets} séries droites de ${targetReps} reps (RIR 1-2 • Max: ${userMaxPull}) • Tempo 2010 • Repos strict : 90s • Test RIR sur dernière série`;
          steps = [
            "Échauffement haut du corps et mobilité des épaules",
            `${numSets} séries droites de ${targetReps} reps irréprochables (Tempo 2010)`,
            "Conserver 1 à 2 répétitions en réserve (RIR 1-2) sur chaque série",
            "Sur la dernière série : valider les reps et enregistrer si nouveau max",
            "Repos strict : 90s entre les séries",
          ];
        }
      } else if (task.type === "chair") {
        if (isTestMaxDay) {
          label = "⚠️ TEST MAX CHAISE (Obligatoire — Cycle 2 semaines)";
          detail = `1 série max à 90° jusqu'à l'échec strict • Tempo Isométrie 1000 • Repos 120s • (Record: ${userMaxChair}s / Obj: 168s)`;
          steps = ["Dos collé au mur à 90°", "Chronométrer jusqu'à l'échec strict", "Saisir le temps en secondes dans l'application"];
        } else if (dayIndex === 3) {
          label = "Pré-activation Bas du corps & Stabilité — Chaise 3 × 30s";
          detail = "Activation bas du corps légère sans charge lourde et sans échec • Préserve la fraîcheur des jambes avant le cardio • Repos : 60s";
          steps = [
            "Placement à 90° contre le mur sans charge lourde",
            "3 séries de 30 secondes de maintien statique léger (sans échec)",
            "Mobilité des chevilles et éveil neuromusculaire des fessiers",
            "Repos strict : 60s entre les séries",
          ];
        } else {
          // Séries Droites Isométrie Chaise (Lundi, Mercredi, Vendredi)
          let numSets = 3;
          let targetSecs = Math.max(30, Math.round(userMaxChair * 0.75));

          const matchChairSecs = task.label.match(/(\d+)\s*[\timesx×]\s*(\d+)\s*s/i);
          if (matchChairSecs) {
            numSets = parseInt(matchChairSecs[1], 10);
            targetSecs = Math.max(targetSecs, parseInt(matchChairSecs[2], 10));
          }

          label = `Chaise Isométrique — ${numSets} × ${targetSecs} s`;
          detail = `${numSets} séries droites de ${targetSecs}s à 90° (Record: ${userMaxChair}s) • Tempo Isométrie 1000 • Repos strict : 60s`;
          steps = [
            "Dos bien à plat contre le mur, genoux à 90° exacts",
            `${numSets} séries de ${targetSecs} secondes de maintien statique continu`,
            "Tempo Isométrie 1000 : verrouillage postural continu",
            "Repos strict : 60s entre les séries",
          ];
        }
      } else if (task.type === "custom") {
        if (hasMorningSwim) {
          label = "Gainage Commando — 3 × 45s (Planche Coudes ↔ Bras tendus)";
          detail = "Passage dynamique coudes à bras tendus en gainage • Repos strict : 60s";
          steps = [
            "Position de départ : Planche sur les coudes, corps parfaitement droit",
            "Monter alternativement main droite puis gauche sur bras tendus, puis redescendre sur les coudes",
            "Bassin fixe sans balancement, verrouillage abdominal et fessiers",
            "3 séries de 45 secondes de mouvement continu • Repos strict : 60s",
          ];
        } else if (dayIndex === 3) {
          label = "Gainage & Mobilité (Pré-activation Core) — 3 × 45s";
          detail = "Activation du tronc & gainage statique pour stabiliser les changements de direction • Pré-activation sans échec • Repos : 60s";
          steps = [
            "Planche statique ou gainage latéral contrôlé sans surtaxer le bas du corps",
            "3 séries de 45 secondes de maintien neutre et contrôlé",
            "Pré-activation de la ceinture abdominale pour stabiliser les relances du Luc Léger de l'après-midi",
            "Repos strict : 60s entre les séries",
          ];
        } else {
          label = "Gainage Abdominal Planche — 4 × 60s";
          detail = "Verrouillage abdominal et fessiers • Tempo Isométrie 1000 • Repos strict : 60s";
          steps = [
            "Coudes sous les épaules, corps parfaitement aligné",
            "4 séries de 60 secondes de maintien statique",
            "Repos strict : 60s entre les séries",
          ];
        }
      } else if (task.type === "run") {
        const isThursday = dayIndex === 3;
        if (isThursday && isTestMaxDay) {
          label = "⚠️ TEST MAX LUC LÉGER (Bi-hebdomadaire — Cycle 2 semaines)";
          detail = `Test navette 20m avec bande sonore du jeudi • Focus : Cardio haute intensité & changements de direction (Actuel: Palier ${userMaxLuc} / Obj: Palier 12)`;
          steps = [
            "Échauffement cardio 10 min & mobilité dynamique des chevilles",
            "Test navettes 20m au rythme des bips sonores avec relances explosives et changements de direction à 180°",
            "Arrêt au 2ème manquement consécutif",
            "Saisir le Palier atteint dans l'application",
          ];
        } else if (isThursday) {
          const targetPalier = Math.min(12, +(userMaxLuc + 0.5).toFixed(1));
          label = `Test / Séance Luc Léger — Allure Palier ${targetPalier}`;
          detail = `Séance spécifique Luc Léger (Navettes 20m) • Focus : Cardio haute intensité et changements de direction rapides (Palier cible ${targetPalier} vs Max ${userMaxLuc})`;
          steps = [
            "Échauffement cardio 10 min & mobilité dynamique des chevilles",
            `Navettes 20m au rythme Palier ${targetPalier} avec relances explosives et changements de direction rapides`,
            "Montée progressive d'intensité au bip sonore",
            "5 min récupération active et étirements régressifs",
          ];
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

      let moment = task.moment ?? inferMoment(task.type, index);
      if (dayIndex === 3) {
        if (task.type === "pull" || task.type === "chair" || task.type === "custom") {
          moment = "morning";
        } else if (task.type === "run" && !label.includes("Footing")) {
          moment = "afternoon";
        }
      }

      return {
        ...task,
        label,
        detail,
        moment,
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

    // Interdiction stricte de la course à pied le même jour que la natation (ex: Vendredi)
    if (hasMorningSwim) {
      tasks = tasks.filter((t) => t.type !== "run");
    }

    // Appliquer les réagencements / modifications d'activités personnalisés (Intention héritée)
    const swaps = state.days[dateISO]?.swaps ?? {};
    let finalTasks: any[] = [];
    const processedMoments = new Set<string>();

    for (const t of tasks) {
      let moment = t.moment;
      const lowerLabel = String(t.label || "").toLowerCase();
      if (lowerLabel.includes("duo") || lowerLabel.includes("footing")) {
        moment = "evening";
        t.moment = "evening";
      }

      const taskId = t.id;
      const swapId = swaps[taskId] ?? swaps[moment];

      if (swapId && ACTIVITY_PRESETS[swapId]) {
        finalTasks.push(
          resolveSmartSwappedTask(t, dateISO, moment, swapId, userMaxes)
        );
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
    const taskRealizations = day?.taskRealizations ?? {};

    // Appliquer les réalisations de distance et les pénalités
    finalTasks = finalTasks.map((t) => {
      const targetDistInfo = extractTargetDistance(t);
      const realization = taskRealizations[t.id];

      let baseXP = t.xp ?? 35;
      let isPenalized = false;
      let actualDistance = realization?.actual;
      let targetDistance = realization?.target ?? targetDistInfo?.targetValue;
      let unit = realization?.unit ?? targetDistInfo?.unit ?? "km";
      let penaltyText = "";
      let xpAwarded = baseXP;

      if (realization) {
        isPenalized = realization.penalty;
        xpAwarded = realization.xpAwarded;
      } else if (targetDistInfo) {
        targetDistance = targetDistInfo.targetValue;
        unit = targetDistInfo.unit;
      }

      if (isPenalized && targetDistance != null && actualDistance != null) {
        const gap = +(targetDistance - actualDistance).toFixed(1);
        penaltyText = `⚠️ PÉNALITÉ : ${gap > 0 ? gap : 0} ${unit} manquants (XP réduit à ${xpAwarded} XP)`;
      }

      return {
        ...t,
        targetDistance,
        actualDistance,
        unit,
        isPenalized,
        penaltyText,
        xp: xpAwarded,
      };
    });

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
      tasks: finalTasks,
      doneCount,
      remainingCount,
      totalCount,
      completionPct,
      xp: finalTasks.reduce((sum, task) => sum + (isTaskDone(task, checked) ? task.xp : 0), 0),
      estimatedMinutes: finalTasks.reduce((sum, task) => sum + task.estimatedMinutes, 0),
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

function resolveSmartSwappedTask(
  t: any,
  dateISO: string,
  moment: string,
  swapId: string,
  userMaxes: ReturnType<typeof getUserMaxes>,
) {
  const preset = ACTIVITY_PRESETS[swapId];
  if (!preset) return t;

  const originalLabel = String(t.label ?? "").toLowerCase();
  const isPyramid = originalLabel.includes("pyramide");
  const isDegressive = originalLabel.includes("dégressif") || originalLabel.includes("degressif");
  const isIso = originalLabel.includes("isométrie") || originalLabel.includes("iso") || t.type === "chair";

  // Compensation d'intensité biomécanique si mouvement d'isolation remplace polyarticulaire
  const isTargetIsolation = !!preset.isIsolation;
  const compensationFactor = isTargetIsolation ? 1.15 : 1.0;

  // Obtenir le userMax propre à l'exercice entrant
  let targetMax = userMaxes.userMaxPull;
  if (swapId === "pompes_militaires") targetMax = userMaxes.userMaxPushMilitary;
  else if (swapId === "pompes_diamant" || swapId === "bras_diamant") targetMax = userMaxes.userMaxPushDiamond;
  else if (swapId === "pompes_declinees") targetMax = userMaxes.userMaxPushDeclined;
  else if (swapId === "bras_triceps_sol") targetMax = userMaxes.userMaxTriceps;
  else if (swapId === "tractions_lsit") targetMax = userMaxes.userMaxPullLSit;
  else if (swapId === "bras_biceps_iso") targetMax = userMaxes.userMaxPullSupineIso;
  else if (swapId === "bras_biceps_neg") targetMax = userMaxes.userMaxPullSupineNeg;
  else if (swapId === "squat_iso") targetMax = userMaxes.userMaxChair;
  else if (swapId === "gainage_commando") targetMax = userMaxes.userMaxCommando;

  let label = preset.label;
  let detail = preset.detail;
  let steps = preset.steps;

  if (isIso || preset.type === "chair") {
    const submaxSecs = Math.max(25, Math.round(targetMax * 0.70 * compensationFactor));
    label = `${preset.label} — Séries Droites : 4 × ${submaxSecs}s`;
    detail = `4 séries droites (70% Max=${targetMax}s${compensationFactor > 1 ? " + compensation isolation" : ""}) • Repos strict : 60s`;
    steps = [...preset.steps, `4 séries droites de ${submaxSecs} secondes`, "Repos strict : 60s entre les séries"];
  } else {
    const submaxReps = Math.max(3, Math.round(targetMax * 0.65 * compensationFactor));
    label = `${preset.label} — Séries Droites (RIR 1-2) : 4 × ${submaxReps} reps`;
    detail = `4 séries droites (65% Max=${targetMax}${compensationFactor > 1 ? " + compensation isolation" : ""}) • Tempo 2010 • Repos : 90s`;
    steps = [...preset.steps, `4 séries droites de ${submaxReps} répétitions (RIR 1-2)`, "Tempo 2010 • Repos strict : 90s entre les séries"];
  }

  return {
    ...t,
    id: t.id,
    moment,
    label,
    detail,
    type: preset.type,
    estimatedMinutes: preset.estimatedMinutes,
    xp: preset.xp,
    steps,
    isSwapped: true,
    swapId,
  };
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
