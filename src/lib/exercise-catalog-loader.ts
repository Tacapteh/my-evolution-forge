import type { Exercise } from "@/types/exercise";
import {
  translateMuscle,
  translateEquipment,
  translateCategory,
  translateLevel,
  translateExerciseName,
} from "./exercise-translator";

export interface UnifiedExercise extends Exercise {
  nameFr: string;
  primaryMusclesFr: string[];
  secondaryMusclesFr: string[];
  equipmentFr: string;
  categoryFr: string;
  levelFr: string;
  searchKey: string;
}

export async function loadUnifiedExerciseCatalog(): Promise<UnifiedExercise[]> {
  try {
    const res = await fetch("/data/exercises.json");
    if (!res.ok) {
      throw new Error("Impossible de charger le fichier /data/exercises.json");
    }
    const rawList: Exercise[] = await res.json();

    // Enrich with French translations & search keys
    return rawList.map((ex) => {
      const { frName, aliases } = translateExerciseName(ex.name);
      const primaryMusclesFr = (ex.primaryMuscles || []).map(translateMuscle);
      const secondaryMusclesFr = (ex.secondaryMuscles || []).map(translateMuscle);
      const equipmentFr = translateEquipment(ex.equipment);
      const categoryFr = translateCategory(ex.category);
      const levelFr = translateLevel(ex.level);

      const searchKey = [
        frName,
        ex.name,
        ...aliases,
        ...primaryMusclesFr,
        ...ex.primaryMuscles,
        equipmentFr,
        ex.equipment || "",
        categoryFr,
      ]
        .join(" ")
        .toLowerCase();

      return {
        ...ex,
        nameFr: frName,
        primaryMusclesFr,
        secondaryMusclesFr,
        equipmentFr,
        categoryFr,
        levelFr,
        searchKey,
      };
    });
  } catch (error) {
    console.error("Erreur lors du chargement du catalogue d'exercices :", error);
    return [];
  }
}
