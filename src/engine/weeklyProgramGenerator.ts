export interface UserStats {
  maxPullups: number; // ex: 12
  maxPushups: number; // ex: 30
  maxWallSitSeconds: number; // ex: 90
  maxPlankSeconds: number; // ex: 120
  vma: number; // ex: 14.5
}

export type MomentOfDay = "MATIN" | "APRÈS-MIDI" | "SOIR";

export type ExerciseCategory =
  | "cardio"
  | "pull"
  | "push"
  | "legs"
  | "core"
  | "swim"
  | "mobility";

export interface ProgramExercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  type: "dynamic" | "isometric" | "cardio" | "mobility";
  targetReps?: number;
  targetDurationSeconds?: number;
  sets: number;
  intensityPercentage: number;
  restSeconds: number;
  detail: string;
  instructions: string[];
}

export interface MomentSession {
  moment: MomentOfDay;
  title: string;
  exercises: ProgramExercise[];
}

export interface DayProgram {
  dayName:
    | "Lundi"
    | "Mardi"
    | "Mercredi"
    | "Jeudi"
    | "Vendredi"
    | "Samedi"
    | "Dimanche";
  focus: string;
  sessions: MomentSession[];
}

export interface WeeklyProgram {
  generatedAt: string;
  userStats: UserStats;
  schedule: DayProgram[];
}

/**
 * Extrait l'objet UserStats à partir de l'état global ForgeState (state.perf)
 */
export function getUserStatsFromState(state: { perf?: Array<{ type: string; value: number }> }): UserStats {
  const perfs = state?.perf ?? [];
  const getMax = (type: string, fallback: number) => {
    const list = perfs.filter((p) => p.type === type).map((p) => p.value);
    return list.length > 0 ? Math.max(...list) : fallback;
  };

  const userMaxPull = getMax("pull", 10);
  const userMaxPush = getMax("push_military", 25);
  const userMaxChair = getMax("chair", 60);
  const userMaxCommando = getMax("commando", 90);
  const userMaxLuc = getMax("luc", 7.0);
  const vma = getMax("vma", +(userMaxLuc * 1.5 + 4).toFixed(1));

  return {
    maxPullups: userMaxPull,
    maxPushups: userMaxPush,
    maxWallSitSeconds: userMaxChair,
    maxPlankSeconds: userMaxCommando,
    vma,
  };
}

export function calculateDynamicReps(
  userMax: number,
  intensityPercentage: number,
  minReps = 1
): number {
  const safeMax = Math.max(1, userMax);
  return Math.max(minReps, Math.round(safeMax * intensityPercentage));
}

export function calculateIsometricDuration(
  userMaxSeconds: number,
  intensityPercentage: number,
  minSeconds = 15
): number {
  const safeMax = Math.max(15, userMaxSeconds);
  return Math.max(minSeconds, Math.round(safeMax * intensityPercentage));
}

/**
 * Générateur principal de programme hebdomadaire :
 * Retourne un planning vierge par défaut, prêt pour la construction sur-mesure via le Workout Builder / Catalogue.
 */
export function generateWeeklyProgram(userStats: UserStats): WeeklyProgram {
  const days: DayProgram["dayName"][] = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  const schedule: DayProgram[] = days.map((dayName) => ({
    dayName,
    focus: "Repos & Récupération",
    sessions: [],
  }));

  return {
    generatedAt: new Date().toISOString(),
    userStats,
    schedule,
  };
}
