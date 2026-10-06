export interface Exercise {
  id: string;
  name: string;
  force: "pull" | "push" | null;
  level: "beginner" | "intermediate" | "expert";
  mechanic: "compound" | "isolation" | null;
  equipment: string | null;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  images: string[];
}

export interface WorkoutExerciseItem {
  exerciseId: string;
  name: string;
  sets: number;
  reps?: number;
  durationSeconds?: number;
  restSeconds: number;
}

export function getExerciseImageUrl(imagePath?: string): string {
  if (!imagePath) return "";
  return `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${imagePath}`;
}
