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
    const [resPrimary, resSupplement] = await Promise.allSettled([
      fetch("/data/exercises.json"),
      fetch("/data/exercises-supplement.json"),
    ]);

    let primaryList: Exercise[] = [];
    if (resPrimary.status === "fulfilled" && resPrimary.value.ok) {
      primaryList = await resPrimary.value.json();
    }

    let supplementList: Exercise[] = [];
    if (resSupplement.status === "fulfilled" && resSupplement.value.ok) {
      supplementList = await resSupplement.value.json();
    }

    const combinedRaw = [...supplementList, ...primaryList];

    // Deduplication map by normalized name
    const seenMap = new Map<string, Exercise>();

    combinedRaw.forEach((ex) => {
      const normalizedKey = ex.name.toLowerCase().trim().replace(/[^a-z0-9]/g, "");
      if (!seenMap.has(normalizedKey)) {
        seenMap.set(normalizedKey, ex);
      }
    });

    const uniqueExercises = Array.from(seenMap.values());

    // Enrich with French translations & search keys
    return uniqueExercises.map((ex) => {
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
    console.error("Erreur lors du chargement du catalogue d'exercices unifié :", error);
    return [];
  }
}
