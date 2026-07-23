import { toISO } from "../lib/forge-store";
import type { ForgeState } from "../lib/forge-store";
import { militarySeptemberProgram } from "../data/programs/military-september";
import type { TrainingMission, TrainingProgress, TrainingWeeklyCompletion, TrainingDaySummary } from "../types/training";

export const ACTIVITY_PRESETS: Record<string, { id: string; label: string; detail: string; type: "swim" | "run" | "pull" | "chair" | "stretch" | "psycho" | "custom"; estimatedMinutes: number; xp: number; steps: string[] }> = {
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
    label: "Tractions — Séries adaptatives",
    detail: "Renforcement musculaire du dos et des bras",
    type: "pull",
    estimatedMinutes: 30,
    xp: 20,
    steps: ["Échauffement épaules", "Séries adaptées à votre max • Repos strict 90s", "Étirements"],
  },
  pompes_militaires: {
    id: "pompes_militaires",
    label: "Pompes Militaires — Renforcement Pectoraux & Triceps",
    detail: "Tempo 2010 (2s descente, 0s pause, 1s montée, 0s pause) • Repos strict : 90s • Consignes : Coudes à 45°, corps gainé, poitrine effleurant le sol",
    type: "pull",
    estimatedMinutes: 25,
    xp: 20,
    steps: ["Consignes : Coudes à 45°, corps parfaitement gainé, poitrine sol à chaque rep", "Exécution Tempo 2010", "Repos strict : 90s entre les séries"],
  },
  pompes_diamant: {
    id: "pompes_diamant",
    label: "Pompes Diamant — Triceps & Sternum",
    detail: "Tempo 2010 • Repos strict : 90s • Consignes : Mains jointes en diamant sous le sternum, coudes serrés",
    type: "pull",
    estimatedMinutes: 25,
    xp: 20,
    steps: ["Consignes : Mains jointes en diamant sous le sternum, coudes serrés le long du corps", "Exécution Tempo 2010", "Repos strict : 90s"],
  },
  pompes_declinees: {
    id: "pompes_declinees",
    label: "Pompes Déclinées sur chaise — Haut de Poitrine & Épaules",
    detail: "Tempo 2010 • Repos strict : 90s • Consignes : Pieds surélevés sur chaise/banc, corps aligné",
    type: "pull",
    estimatedMinutes: 25,
    xp: 20,
    steps: ["Consignes : Pieds surélevés sur chaise, corps aligné sans creuser le dos", "Exécution Tempo 2010", "Repos strict : 90s"],
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
      "Tirer le menton au-dessus de la barre en maintenant le buste et les jambes immobiles",
      "Option régression : Replier les genoux à 90° (Tuck L-Sit) si les jambes tendues sont trop exigeantes",
      "Repos strict : 90s entre les séries",
    ],
  },
  squat_iso: {
    id: "squat_iso",
    label: "Squat Isométrique — Cuisses au mur (90°)",
    detail: "Tempo Isométrie 1000 (maintien statique à 90°) • Repos strict : 60s",
    type: "chair",
    estimatedMinutes: 20,
    xp: 20,
    steps: ["Dos plaqué au mur, cuisses parallèles au sol (90°)", "Maintien statique continu", "Repos strict : 60s"],
  },
  gainage_commando: {
    id: "gainage_commando",
    label: "Gainage Commando — Planche Coudes ↔ Bras tendus",
    detail: "Passage dynamique coudes à bras tendus • Repos strict : 60s",
    type: "chair",
    estimatedMinutes: 15,
    xp: 20,
    steps: ["Départ en planche sur les coudes", "Passage dynamique bras tendus alternativement", "3 séries de 45s • Repos 60s"],
  },
  bras_diamant: {
    id: "bras_diamant",
    label: "Pompes Diamant — Triceps (Échec)",
    detail: "Module Bras Explosion [1/4] • Mains en diamant, coudes serrés",
    type: "pull",
    estimatedMinutes: 6,
    xp: 15,
    steps: ["Mains jointes en diamant sous le sternum", "3 séries à l'échec strict", "Repos 60s"],
  },
  bras_biceps_iso: {
    id: "bras_biceps_iso",
    label: "Tractions Supination — Blocage Iso 90°",
    detail: "Module Bras Explosion [2/4] • Supination serrée (3 × 30s)",
    type: "pull",
    estimatedMinutes: 6,
    xp: 15,
    steps: ["Supination serrée", "Blocage isométrique à 90° d'angle", "3 séries de 30s • Repos 60s"],
  },
  bras_triceps_sol: {
    id: "bras_triceps_sol",
    label: "Extensions Triceps au Sol",
    detail: "Module Bras Explosion [3/4] • Coudes posés -> bras tendus",
    type: "pull",
    estimatedMinutes: 6,
    xp: 15,
    steps: ["Planche sur avant-bras", "Poussée sur paumes pour tendre les bras", "3 séries à l'échec • Repos 60s"],
  },
  bras_biceps_neg: {
    id: "bras_biceps_neg",
    label: "Tractions Supination Négatives 5s",
    detail: "Module Bras Explosion [4/4] • Contrôle descente 5s (3 × 6-8 reps)",
    type: "pull",
    estimatedMinutes: 6,
    xp: 15,
    steps: ["Départ menton au-dessus de la barre", "Freinage de la descente sur 5 secondes", "3 × 6-8 reps à l'échec • Repos 60s"],
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
    label: "Récupération active & Étirements musculaires",
    detail: "Mobilité, relaxation et récupération musculaire",
    type: "stretch",
    estimatedMinutes: 20,
    xp: 15,
    steps: ["10 min étirements doux", "5 min automassages", "5 min exercices de respiration"],
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

    const pushPerfs = (state.perf ?? []).filter((p: any) => p.type === "push").map((p: any) => p.value);
    const userMaxPush = pushPerfs.length > 0 ? Math.max(...pushPerfs) : Math.max(15, Math.round(userMaxPull * 2.5));

    const chairPerfs = (state.perf ?? []).filter((p) => p.type === "chair").map((p) => p.value);
    const userMaxChair = chairPerfs.length > 0 ? Math.max(...chairPerfs) : 60;

    const lucPerfs = (state.perf ?? []).filter((p) => p.type === "luc").map((p) => p.value);
    const userMaxLuc = lucPerfs.length > 0 ? Math.max(...lucPerfs) : 7.0;

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
          detail = `1 série à l'échec strict • Tempo 2010 • Repos strict 120s • Saisis ton score pour adapter les 2 prochaines semaines (Max: ${userMaxPull} / Obj: 17-20)`;
          steps = ["Échauffement haut du corps et mobilité des épaules", "1 série unique à l'échec strict (Tempo 2010)", "Saisir le score dans l'application"];
        } else if (hasMorningSwim) {
          // Natation détectée -> Programme Maintien / Technique (50-60% Max)
          const reps = Math.max(3, Math.round(userMaxPull * 0.55));
          label = `Tractions (Maintien / Technique) — 5 × ${reps} reps (50-60% Max)`;
          detail = `Programme Maintien & Technique (post-natation, moins taxant) • 50-60% du Max (${userMaxPull}) • Tempo 2010 • Repos strict : 90s`;
          steps = [
            "Échauffement articulaire et mobilité des épaules post-natation",
            `5 séries de ${reps} tractions sous-maximales (50-60% du max ${userMaxPull})`,
            "Tempo 2010 : 2s descente freinée, 1s montée contrôlée, sans chercher l'échec",
            "Repos strict : 90s entre les séries",
          ];
        } else if (dayIndex === 0) {
          // Sans Natation -> Lundi : Pyramide lourde axée 17-20 tractions
          const peak = Math.max(4, Math.min(10, Math.round(userMaxPull * 0.85)));
          const p1 = 1;
          const p2 = Math.max(2, Math.round(peak * 0.4));
          const p3 = Math.max(3, Math.round(peak * 0.7));
          const p4 = peak;
          label = `Tractions — Pyramide Force & Volume : ${p1}-${p2}-${p3}-${p4}-${p3}-${p2}-${p1} reps (Obj 17-20)`;
          detail = `Format Pyramidal Lourd (Pic à ${p4} reps) • Axé sur l'objectif 17-20 tractions (Max: ${userMaxPull}) • Tempo 2010 • Repos strict : 90s`;
          steps = [
            "Échauffement haut du corps et mobilité des épaules",
            `Enchaîner la pyramide lourde : ${p1}-${p2}-${p3}-${p4}-${p3}-${p2}-${p1} reps`,
            "Tempo 2010 : 2s descente freinée, 1s montée explosive menton par-dessus la barre",
            "Repos strict : 90s entre chaque palier",
          ];
        } else if (dayIndex === 1) {
          const reps = Math.max(3, Math.round(userMaxPull * 0.70));
          label = `Tractions — Force & Volume : 5 × ${reps} reps (Obj 17-20)`;
          detail = `5 séries lourdes (70% Max=${userMaxPull}) • Axé sur la progression 17-20 tractions • Tempo 2010 • Repos strict : 90s`;
          steps = [
            "Échauffement haut du corps",
            `5 séries de ${reps} tractions lourdes et explosives`,
            "Tempo 2010 : 2s descente, 1s montée menton au-dessus de la barre",
            "Repos strict : 90s entre les séries",
          ];
        } else if (dayIndex === 2) {
          const r1 = Math.max(3, userMaxPull);
          const r2 = Math.max(2, userMaxPull - 1);
          const r3 = Math.max(2, userMaxPull - 2);
          const r4 = Math.max(1, userMaxPull - 3);
          const r5 = Math.max(1, userMaxPull - 4);
          label = `Tractions — Dégressif Lourd : ${r1}-${r2}-${r3}-${r4}-${r5} reps (Obj 17-20)`;
          detail = `Format Dégressif d'épuisement (Max=${userMaxPull}) • Axé sur l'objectif 17-20 tractions • Tempo 2010 • Repos strict : 90s`;
          steps = [
            "Échauffement dos & biceps",
            `Enchaîner : ${r1}-${r2}-${r3}-${r4}-${r5} reps`,
            "Tempo 2010 : poussée explosive, retour contrôlé 2s",
            "Repos strict : 90s après chaque série",
          ];
        } else if (dayIndex === 3) {
          label = "Tractions (Pré-activation) — 4 × 3-4 reps (Sous-maximales)";
          detail = `Pré-activation du haut du corps sans échec • Conserver la fraîcheur des jambes avant le Luc Léger de l'après-midi • Repos : 90s`;
          steps = [
            "Échauffement articulaire et mobilité des épaules",
            "4 séries de 3 à 4 tractions sous-maximales contrôlées (Tempo 2010)",
            "Ne pas aller à l'échec : pré-activation pour préserver les jambes avant le Luc Léger de l'après-midi",
            "Repos strict : 90s entre les séries",
          ];
        } else {
          const reps = Math.max(3, Math.round(userMaxPull * 0.65));
          label = `Tractions — Force & Volume : 5 × ${reps} reps (Obj 17-20)`;
          detail = `Format Force & Volume (65% Max=${userMaxPull}) • Tempo 2010 • Repos strict : 90s`;
          steps = [
            "Échauffement propre",
            `5 séries de ${reps} tractions régulières`,
            "Tempo 2010 : forme irréprochable",
            "Repos strict : 90s entre les séries",
          ];
        }
      } else if (task.type === "chair") {
        if (isTestMaxDay) {
          label = "⚠️ TEST MAX CHAISE (Obligatoire — Cycle 2 semaines)";
          detail = `1 série max à 90° jusqu'à l'échec strict • Tempo Isométrie 1000 • Repos 120s • (Record: ${userMaxChair}s / Obj: 168s)`;
          steps = ["Dos collé au mur à 90°", "Chronométrer jusqu'à l'échec strict", "Saisir le temps en secondes dans l'application"];
        } else if (hasMorningSwim) {
          label = "Chaise — 3 × 1 min (60s)";
          detail = "3 séries de 1 minute (60s) à 90° contre le mur • Tempo Isométrie 1000 • Repos strict : 60s";
          steps = [
            "Dos plaqué au mur, cuisses parallèles au sol à 90° exacts",
            "3 séries de 60 secondes de maintien statique continu",
            "Tempo Isométrie 1000 : verrouillage postural continu",
            "Repos strict : 60s entre les séries",
          ];
        } else if (dayIndex === 3) {
          label = "Pré-activation Bas du corps & Stabilité — Chaise 3 × 30s";
          detail = "Activation bas du corps légère sans charge lourde et sans échec • Préserve la fraîcheur des jambes avant le Luc Léger de l'après-midi • Repos : 60s";
          steps = [
            "Placement à 90° contre le mur sans charge lourde",
            "3 séries de 30 secondes de maintien statique léger (sans échec)",
            "Mobilité des chevilles et éveil neuromusculaire des fessiers",
            "Repos strict : 60s entre les séries",
          ];
        } else if (dayIndex === 0 || dayIndex === 2) {
          const secs = Math.max(30, Math.round(userMaxChair * 0.75));
          label = `Chaise — Séries réparties : 4 × ${secs}s (75% Max)`;
          detail = `4 séries isométriques à 90° • Tempo Isométrie 1000 • Repos strict : 60s`;
          steps = [
            "Dos bien à plat contre le mur, genoux à 90° exacts",
            `4 séries de ${secs} secondes de maintien`,
            "Tempo Isométrie 1000 : maintien continu",
            "Repos strict : 60s entre les séries",
          ];
        } else if (dayIndex === 1 || dayIndex === 5) {
          const c1 = Math.max(20, Math.round(userMaxChair * 0.60));
          const c2 = Math.max(30, Math.round(userMaxChair * 0.80));
          const c3 = Math.max(35, Math.round(userMaxChair * 0.95));
          label = `Chaise — Pyramide : ${c1}s - ${c2}s - ${c3}s - ${c2}s - ${c1}s`;
          detail = `Format Pyramidal (Pic à ${c3}s) • Tempo Isométrie 1000 • Repos strict : 60s`;
          steps = [
            "Placement à 90° contre le mur",
            `Séries pyramidales : ${c1}s - ${c2}s - ${c3}s - ${c2}s - ${c1}s`,
            "Tempo Isométrie 1000 : verrouillage postural",
            "Repos strict : 60s entre chaque palier",
          ];
        } else {
          const s1 = Math.max(25, userMaxChair - 10);
          const s2 = Math.max(20, userMaxChair - 20);
          const s3 = Math.max(15, userMaxChair - 30);
          const s4 = Math.max(10, userMaxChair - 40);
          label = `Chaise — Dégressif : ${s1}s - ${s2}s - ${s3}s - ${s4}s`;
          detail = `Format Dégressif d'épuisement isométrique • Tempo Isométrie 1000 • Repos strict : 60s`;
          steps = [
            "Posture 90° contre le mur",
            `Enchaîner : ${s1}s - ${s2}s - ${s3}s - ${s4}s`,
            "Tempo Isométrie 1000 : maintien continu",
            "Repos strict : 60s après chaque série",
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

    const hasStrength = dayIndex !== 3 && rawTasks.some(
      (t) => t.type === "pull" || t.type === "chair" || (t.type === "custom" && t.id.includes("core"))
    );

    if (hasStrength && !isTestMaxDay) {
      if (hasMorningSwim) {
        tasks.push(
          {
            id: `bras-1-diamant-${dateISO}`,
            label: "💧 Bras Explosion (Régénération / Volume doux) [1/4] — Pompes Diamant (2-3 séries • RIR 2-3)",
            detail: "Exo 1 (Triceps) • Mode Régénération post-natation • 2 à 3 séries sous-maximales (2-3 reps en réserve / RIR 2-3) • Repos : 90s",
            type: "pull",
            moment: "afternoon",
            estimatedMinutes: 5,
            xp: 15,
            completed: false,
            steps: [
              "Consignes : Mains jointes en diamant sous le sternum, coudes collés au corps",
              "Descente contrôlée et poussée sans aller à l'échec strict (Garder 2-3 reps de réserve / RIR 2-3)",
              "2 à 3 séries sous-maximales avec tempo fluide • Repos 90s",
            ],
          },
          {
            id: `bras-2-biceps-iso-${dateISO}`,
            label: "💧 Bras Explosion (Régénération / Volume doux) [2/4] — Tractions supination (Iso 90° : 2-3 × 15-20s)",
            detail: "Exo 2 (Biceps) • Mode Régénération post-natation • Prise supination serrée • Maintien isométrique modéré (2-3 × 15-20s) • Repos : 90s",
            type: "pull",
            moment: "afternoon",
            estimatedMinutes: 5,
            xp: 15,
            completed: false,
            steps: [
              "Consignes : Prise supination serrée (paumes vers vous, mains écartées de 10-15 cm)",
              "Tirer jusqu'à 90° et maintenir 15-20 secondes sans aller au bout des capacités",
              "2 à 3 séries avec réserve d'énergie (RIR 2-3) • Repos 90s",
            ],
          },
          {
            id: `bras-3-triceps-sol-${dateISO}`,
            label: "💧 Bras Explosion (Régénération / Volume doux) [3/4] — Extensions triceps au sol (2-3 séries • RIR 2-3)",
            detail: "Exo 3 (Triceps) • Mode Régénération post-natation • Coudes posés -> bras tendus • 2 à 3 séries contrôlées (RIR 2-3) • Repos : 90s",
            type: "pull",
            moment: "afternoon",
            estimatedMinutes: 5,
            xp: 15,
            completed: false,
            steps: [
              "Consignes : Avant-bras au sol en planche, coudes posés, mains à plat",
              "Poussée fluide sans verrouillage articulaire brusque",
              "2 à 3 séries sous-maximales (2-3 reps en réserve / RIR 2-3) • Repos 90s",
            ],
          },
          {
            id: `bras-4-biceps-neg-${dateISO}`,
            label: "💧 Bras Explosion (Régénération / Volume doux) [4/4] — Tractions supination négatives 5s (2-3 × 4-5 reps)",
            detail: "Exo 4 (Biceps) • Mode Régénération post-natation • Contrôle de la négative (5s descente) • 2 à 3 séries sous-maximales • Repos : 90s",
            type: "pull",
            moment: "afternoon",
            estimatedMinutes: 5,
            xp: 15,
            completed: false,
            steps: [
              "Consignes : Supination serrée, descente freinée en 5 secondes",
              "2 à 3 séries de 4 à 5 répétitions contrôlées sans échec (RIR 2-3)",
              "Repos strict : 90s",
            ],
          }
        );
      } else {
        tasks.push(
          {
            id: `bras-1-diamant-${dateISO}`,
            label: "🔥 Bras Explosion [1/4] — Pompes Diamant (3 séries à l'échec)",
            detail: "Exo 1 (Triceps) • Mains en diamant sous le sternum, coudes serrés • 3 séries à l'échec strict • Repos : 60s",
            type: "pull",
            moment: "afternoon",
            estimatedMinutes: 6,
            xp: 15,
            completed: false,
            steps: [
              "Consignes : Mains jointes en diamant sous le sternum, coudes collés au corps",
              "Descente contrôlée et poussée jusqu'à l'extension complète des bras",
              "3 séries exécutées à l'échec strict • Repos 60s entre les séries",
            ],
          },
          {
            id: `bras-2-biceps-iso-${dateISO}`,
            label: "🔥 Bras Explosion [2/4] — Tractions supination serrée (Iso 90° : 3 × 30s)",
            detail: "Exo 2 (Biceps) • Prise supination serrée • Blocage isométrique à 90° • 3 × 30s maintien max • Repos : 60s",
            type: "pull",
            moment: "afternoon",
            estimatedMinutes: 6,
            xp: 15,
            completed: false,
            steps: [
              "Consignes : Prise supination serrée (paumes vers vous, mains écartées de 10-15 cm)",
              "Tirer jusqu'à l'angle de 90° des coudes et bloquer fermement la position",
              "3 séries de 30 secondes de maintien maximal continu • Repos 60s",
            ],
          },
          {
            id: `bras-3-triceps-sol-${dateISO}`,
            label: "🔥 Bras Explosion [3/4] — Extensions triceps au sol (3 séries à l'échec)",
            detail: "Exo 3 (Triceps) • Coudes posés sur avant-bras -> poussée bras tendus • 3 séries à l'échec strict • Repos : 60s",
            type: "pull",
            moment: "afternoon",
            estimatedMinutes: 6,
            xp: 15,
            completed: false,
            steps: [
              "Consignes : Avant-bras au sol en planche, coudes posés, mains à plat",
              "Pousser fort sur les paumes pour décoller les coudes et tendre complètement les bras (Tempo contrôlé)",
              "3 séries exécutées à l'échec strict • Repos 60s entre les séries",
            ],
          },
          {
            id: `bras-4-biceps-neg-${dateISO}`,
            label: "🔥 Bras Explosion [4/4] — Tractions supination négatives 5s (3 × 6-8 reps)",
            detail: "Exo 4 (Biceps) • Supination serrée • Contrôle strict de la négative (5s descente) • 3 × 6-8 reps à l'échec • Repos : 60s",
            type: "pull",
            moment: "afternoon",
            estimatedMinutes: 6,
            xp: 15,
            completed: false,
            steps: [
              "Consignes : Supination serrée, menton au-dessus de la barre (avec saut si besoin)",
              "Freiner la descente très lentement sur 5 secondes complètes jusqu'aux bras tendus",
              "3 séries de 6 à 8 répétitions à l'échec strict • Repos 60s",
            ],
          }
        );
      }
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
        if (swaps[taskId]) {
          // Remplacement individuel au niveau de l'exercice
          finalTasks.push(
            resolveSmartSwappedTask(t, dateISO, moment, swapId, userMaxPull, userMaxChair, userMaxPush)
          );
        } else if (!processedMoments.has(moment)) {
          // Remplacement global au niveau du moment
          processedMoments.add(moment);
          finalTasks.push(
            resolveSmartSwappedTask(t, dateISO, moment, swapId, userMaxPull, userMaxChair, userMaxPush)
          );
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
  userMaxPull: number,
  userMaxChair: number,
  userMaxPush: number,
) {
  const preset = ACTIVITY_PRESETS[swapId];
  if (!preset) return t;

  const originalLabel = t.label ?? "";
  const isPyramid = originalLabel.toLowerCase().includes("pyramide");
  const isDegressive = originalLabel.toLowerCase().includes("dégressif") || originalLabel.toLowerCase().includes("degressif");

  let label = preset.label;
  let detail = preset.detail;
  let steps = preset.steps;

  if (swapId === "pompes_militaires" || swapId === "pompes_diamant" || swapId === "pompes_declinees" || swapId === "tractions_lsit") {
    const isLsit = swapId === "tractions_lsit";
    const pPushMax = isLsit ? userMaxPull : userMaxPush;
    const peak = isLsit ? Math.max(3, Math.round(userMaxPull * 0.70)) : Math.max(6, Math.round(pPushMax * 0.40));
    const p1 = Math.max(1, Math.round(peak * 0.25));
    const p2 = Math.max(2, Math.round(peak * 0.50));
    const p3 = Math.max(4, Math.round(peak * 0.75));
    const p4 = peak;
    const pyramidStr = `${p1}-${p2}-${p3}-${p4}-${p3}-${p2}-${p1}`;

    const submaxReps = isLsit ? Math.max(3, Math.round(userMaxPull * 0.50)) : Math.max(6, Math.round(pPushMax * 0.65));
    const degressiveStr = isLsit
      ? `${Math.round(userMaxPull * 0.60)}-${Math.round(userMaxPull * 0.50)}-${Math.round(userMaxPull * 0.40)}-${Math.round(userMaxPull * 0.30)}-${Math.round(userMaxPull * 0.20)}`
      : `${Math.round(pPushMax * 0.65)}-${Math.round(pPushMax * 0.55)}-${Math.round(pPushMax * 0.45)}-${Math.round(pPushMax * 0.35)}-${Math.round(pPushMax * 0.25)}`;

    const formConsignesMap: Record<string, string> = {
      pompes_militaires: "Coudes à 45°, corps parfaitement gainé, poitrine effleurant le sol",
      pompes_diamant: "Mains jointes en diamant sous le sternum, coudes serrés le long du corps",
      pompes_declinees: "Pieds surélevés sur chaise/banc, corps aligné sans creuser le dos",
      tractions_lsit: "Jambes tendues à 90° (ou genoux pliés en Tuck L-Sit au besoin), tirage menton au-dessus de la barre",
    };

    const nameMap: Record<string, string> = {
      pompes_militaires: "Pompes Militaires",
      pompes_diamant: "Pompes Diamant",
      pompes_declinees: "Pompes Déclinées (chaise)",
      tractions_lsit: "Tractions L-Sit (Tirage / Core)",
    };

    const exerciseName = nameMap[swapId] ?? "Pompes";
    const consignes = formConsignesMap[swapId] ?? "Forme stricte";

    if (isPyramid) {
      label = `${exerciseName} — Pyramide : ${pyramidStr} reps`;
      detail = `Format Pyramidal (Pic à ${p4} reps) • Tempo 2010 (2s descente, 0s pause, 1s montée, 0s pause) • Repos strict : 90s • Consignes : ${consignes}`;
      steps = [
        `Consignes : ${consignes}`,
        `Pyramide de reps : ${pyramidStr}`,
        "Tempo 2010 : poussée explosive, 2s descente contrôlée",
        "Repos strict : 90s entre les paliers",
      ];
    } else if (isDegressive) {
      label = `${exerciseName} — Dégressif : ${degressiveStr} reps`;
      detail = `Format Dégressif d'épuisement • Tempo 2010 • Repos strict : 90s • Consignes : ${consignes}`;
      steps = [
        `Consignes : ${consignes}`,
        `Séries dégressives : ${degressiveStr} reps`,
        "Tempo 2010",
        "Repos strict : 90s après chaque série",
      ];
    } else {
      label = `${exerciseName} — Séries réparties : 5 × ${submaxReps} reps`;
      detail = `5 séries (65% Max=${pPushMax}) • Tempo 2010 • Repos strict : 90s • Consignes : ${consignes}`;
      steps = [
        `Consignes : ${consignes}`,
        `5 séries de ${submaxReps} répétitions`,
        "Tempo 2010 : régularité et contrôle",
        "Repos strict : 90s entre les séries",
      ];
    }
  } else if (swapId === "squat_iso" || swapId === "gainage_planche") {
    const chairMax = userMaxChair;
    const submaxSecs = Math.max(30, Math.round(chairMax * 0.70));
    const c1 = Math.max(15, Math.round(chairMax * 0.45));
    const c2 = Math.max(25, Math.round(chairMax * 0.70));
    const c3 = Math.max(35, Math.round(chairMax * 0.90));
    const pyramidStr = `${c1}s - ${c2}s - ${c3}s - ${c2}s - ${c1}s`;
    const degressiveStr = `${Math.round(chairMax * 0.8)}s - ${Math.round(chairMax * 0.65)}s - ${Math.round(chairMax * 0.5)}s - ${Math.round(chairMax * 0.35)}s`;

    const isoName = swapId === "gainage_planche" ? "Gainage Abdominal Planche" : "Squat Isométrique (Mur)";
    const isoConsignes = swapId === "gainage_planche"
      ? "Coudes sous épaules, corps parfaitement aligné, fessiers & abdos contractés"
      : "Dos plaqué au mur, cuisses parallèles au sol à 90° exacts";

    if (isPyramid) {
      label = `${isoName} — Pyramide : ${pyramidStr}`;
      detail = `Format Pyramidal (Pic à ${c3}s) • Tempo Isométrie 1000 • Repos strict : 60s • Consignes : ${isoConsignes}`;
      steps = [`Consignes : ${isoConsignes}`, `Pyramide statique : ${pyramidStr}`, "Tempo Isométrie 1000", "Repos strict : 60s entre les paliers"];
    } else if (isDegressive) {
      label = `${isoName} — Dégressif : ${degressiveStr}`;
      detail = `Format Dégressif d'épuisement • Tempo Isométrie 1000 • Repos strict : 60s • Consignes : ${isoConsignes}`;
      steps = [`Consignes : ${isoConsignes}`, `Enchaîner : ${degressiveStr}`, "Tempo Isométrie 1000", "Repos strict : 60s"];
    } else {
      label = `${isoName} — Séries réparties : 4 × ${submaxSecs}s`;
      detail = `4 séries (70% Max=${chairMax}s) • Tempo Isométrie 1000 • Repos strict : 60s • Consignes : ${isoConsignes}`;
      steps = [`Consignes : ${isoConsignes}`, `4 séries de ${submaxSecs} secondes`, "Tempo Isométrie 1000", "Repos strict : 60s entre les séries"];
    }
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
    originalLabel: t.label,
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
