export type TrainingTaskType =
  | "swim"
  | "pull"
  | "chair"
  | "run"
  | "psycho"
  | "stretch"
  | "hydration"
  | "custom";

export type TrainingDayStatus = "a_faire" | "en_cours" | "termine";
export type TrainingPriority = "Haute" | "Normale" | "Recuperation";

export interface TrainingTask {
  id: string;
  label: string;
  type: TrainingTaskType;
  detail?: string;
  moment?: "morning" | "afternoon" | "evening" | "psychotechniques";
  estimatedMinutes?: number;
  rest?: string;
  steps?: string[];
  xp: number;
  completed?: boolean;
}

export interface TrainingObjective {
  id: string;
  label: string;
  target: number;
  unit: string;
}

export interface TrainingExercise extends TrainingTask {}

export interface TrainingSession {
  id: string;
  title: string;
  type: string;
  exercises: TrainingExercise[];
}

export interface TrainingDayDefinition {
  id?: string;
  name: string;
  objective: string;
  title?: string;
  priority?: TrainingPriority;
  tasks?: TrainingTask[];
  sessions?: TrainingSession[];
}

export interface TrainingWeekDefinition {
  id: string;
  label: string;
  days: TrainingDayDefinition[];
}

export interface TrainingProgram {
  id: string;
  name: string;
  description: string;
  objectives: TrainingObjective[];
  weeks: TrainingWeekDefinition[];
  tests: Array<{ id: string; name: string; description: string }>;
  tips: string[];
}

export interface TrainingMission {
  programId: string;
  weekId: string;
  iso: string;
  dayName: string;
  title: string;
  objective: string;
  priority: TrainingPriority;
  tasks: TrainingTask[];
  doneCount: number;
  remainingCount: number;
  totalCount: number;
  completionPct: number;
  xp: number;
  estimatedMinutes: number;
  status: TrainingDayStatus;
  psychotechnique?: {
    label: string;
    detail: string;
    durationTarget: number;
    score?: number;
    done: boolean;
  };
  summary: string;
}

export interface TrainingDaySummary {
  iso: string;
  label: string;
  dayNumber: number;
  dayName: string;
  title: string;
  objective: string;
  completionPct: number;
  doneCount: number;
  totalCount: number;
  taskCount: number;
  isToday: boolean;
  sessions: string[];
}

export interface TrainingProgress {
  iso: string;
  completionPct: number;
  doneCount: number;
  remainingCount: number;
  totalCount: number;
  status: TrainingDayStatus;
  xp: number;
}

export interface TrainingWeeklyCompletion {
  completedDays: number;
  totalDays: number;
  completionPct: number;
  completedTasks: number;
  totalTasks: number;
  xp: number;
}
