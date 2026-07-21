// Programme hebdomadaire FORGE — modèle de séances pour chaque jour de la semaine.
// day = 0 (dimanche) ... 6 (samedi). Nous utilisons 1..7 avec lundi = 1.

export type TaskType =
  | "swim"
  | "pull"
  | "chair"
  | "run"
  | "psycho"
  | "stretch"
  | "hydration"
  | "custom";

export interface TaskTemplate {
  id: string;
  label: string;
  type: TaskType;
  detail?: string;
  xp: number;
}

export interface DayTemplate {
  name: string; // Lundi, Mardi...
  objective: string;
  tasks: TaskTemplate[];
}

export const XP_BY_TYPE: Record<TaskType, number> = {
  swim: 35,
  run: 50,
  pull: 25,
  chair: 15,
  psycho: 20,
  stretch: 10,
  hydration: 5,
  custom: 10,
};

// 1 = Lundi ... 7 = Dimanche
export const WEEK: Record<number, DayTemplate> = {
  1: {
    name: "Lundi",
    objective: "Force & endurance mentale",
    tasks: [
      { id: "pull-1", label: "Tractions — 4 x max", type: "pull", detail: "Repos 90s", xp: 25 },
      { id: "chair-1", label: "Chaise — 3 x 60s", type: "chair", detail: "Repos 45s", xp: 15 },
      { id: "psycho-1", label: "Psychotechniques — Calcul mental", type: "psycho", detail: "20 min", xp: 20 },
      { id: "stretch-1", label: "Étirements", type: "stretch", detail: "10 min", xp: 10 },
      { id: "hydro-1", label: "Hydratation — 2L", type: "hydration", xp: 5 },
    ],
  },
  2: {
    name: "Mardi",
    objective: "Cardio — course",
    tasks: [
      { id: "run-2", label: "Course — 5 km", type: "run", detail: "Allure 5:30/km", xp: 50 },
      { id: "psycho-2", label: "Psychotechniques — Mémoire", type: "psycho", detail: "20 min", xp: 20 },
      { id: "stretch-2", label: "Retour au calme", type: "stretch", detail: "10 min", xp: 10 },
      { id: "hydro-2", label: "Hydratation — 2L", type: "hydration", xp: 5 },
    ],
  },
  3: {
    name: "Mercredi",
    objective: "Aisance aquatique",
    tasks: [
      { id: "swim-3", label: "Natation — 1000 m", type: "swim", detail: "Échauffement + corps + retour", xp: 35 },
      { id: "pull-3", label: "Tractions — 3 x max", type: "pull", detail: "Repos 90s", xp: 25 },
      { id: "psycho-3", label: "Psychotechniques — Logique", type: "psycho", detail: "20 min", xp: 20 },
      { id: "hydro-3", label: "Hydratation — 2L", type: "hydration", xp: 5 },
    ],
  },
  4: {
    name: "Jeudi",
    objective: "Puissance des jambes",
    tasks: [
      { id: "chair-4", label: "Chaise — 4 x 90s", type: "chair", detail: "Repos 60s", xp: 15 },
      { id: "run-4", label: "Course — 3 km fractionné", type: "run", detail: "30/30", xp: 50 },
      { id: "psycho-4", label: "Psychotechniques — Suites", type: "psycho", detail: "20 min", xp: 20 },
      { id: "stretch-4", label: "Étirements", type: "stretch", detail: "10 min", xp: 10 },
      { id: "hydro-4", label: "Hydratation — 2L", type: "hydration", xp: 5 },
    ],
  },
  5: {
    name: "Vendredi",
    objective: "Force haut du corps",
    tasks: [
      { id: "pull-5", label: "Tractions — 5 x max", type: "pull", detail: "Repos 90s", xp: 25 },
      { id: "chair-5", label: "Chaise — 3 x 75s", type: "chair", detail: "Repos 45s", xp: 15 },
      { id: "psycho-5", label: "Psychotechniques — Rotation spatiale", type: "psycho", detail: "20 min", xp: 20 },
      { id: "stretch-5", label: "Étirements", type: "stretch", detail: "10 min", xp: 10 },
      { id: "hydro-5", label: "Hydratation — 2L", type: "hydration", xp: 5 },
    ],
  },
  6: {
    name: "Samedi",
    objective: "Endurance longue",
    tasks: [
      { id: "run-6", label: "Course — 10 km", type: "run", detail: "Allure confort", xp: 50 },
      { id: "swim-6", label: "Natation — 800 m récup", type: "swim", detail: "Souple", xp: 35 },
      { id: "stretch-6", label: "Étirements longs", type: "stretch", detail: "15 min", xp: 10 },
      { id: "hydro-6", label: "Hydratation — 3L", type: "hydration", xp: 5 },
    ],
  },
  7: {
    name: "Dimanche",
    objective: "Récupération active",
    tasks: [
      { id: "psycho-7", label: "Test Luc Léger simulé", type: "psycho", detail: "Objectif personnel", xp: 20 },
      { id: "stretch-7", label: "Mobilité complète", type: "stretch", detail: "20 min", xp: 10 },
      { id: "hydro-7", label: "Hydratation — 2L", type: "hydration", xp: 5 },
    ],
  },
};

export interface GoalDef {
  id: string;
  label: string;
  target: number;
  unit: string;
}

export const GOALS: GoalDef[] = [
  { id: "pull", label: "Tractions", target: 17, unit: "reps" },
  { id: "chair", label: "Chaise", target: 168, unit: "s" },
  { id: "run", label: "Course", target: 10, unit: "km" },
  { id: "luc", label: "Luc Léger", target: 12, unit: "paliers" },
];

export interface BadgeDef {
  id: string;
  label: string;
  description: string;
}

export const BADGES: BadgeDef[] = [
  { id: "first", label: "Première séance", description: "Coche ta première tâche" },
  { id: "streak7", label: "7 jours consécutifs", description: "Reviens 7 jours de suite" },
  { id: "streak30", label: "30 jours consécutifs", description: "Un mois de régularité" },
  { id: "run10", label: "Premier 10 km", description: "Course de 10 km enregistrée" },
  { id: "pull10", label: "10 tractions", description: "Record à 10 tractions" },
  { id: "pull15", label: "15 tractions", description: "Record à 15 tractions" },
  { id: "goalPull", label: "Objectif 17 atteint", description: "17 tractions" },
  { id: "goalChair", label: "Chaise 168s", description: "Objectif chaise" },
  { id: "goalLuc", label: "Luc Léger atteint", description: "Objectif Luc Léger" },
  { id: "run100", label: "100 km courus", description: "Total course" },
  { id: "swim50", label: "50 km nagés", description: "Total natation" },
];

export const QUOTES = [
  "La discipline dépasse la motivation.",
  "Fais aujourd'hui ce que les autres ne feront pas.",
  "Chaque répétition te construit.",
  "La régularité bat l'intensité.",
  "Sois plus fort qu'hier, plus humble que demain.",
  "Un pas chaque jour. Toujours.",
  "Le mental est un muscle.",
  "Rien de grand ne se construit vite.",
];

// Date de l'événement cible — modifiable dans Paramètres.
export const DEFAULT_TARGET_DATE = "2026-12-01";
