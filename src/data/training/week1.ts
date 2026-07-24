import type { TrainingWeekDefinition } from "@/types/training";

export const week1: TrainingWeekDefinition = {
  id: "week-1",
  label: "Semaine 1",
  days: [
    {
      name: "Lundi",
      objective: "Endurance + force",
      title: "Ouverture du cycle",
      priority: "Normale",
      tasks: [
        { id: "w1-mon-swim", label: "Natation — 45 min", type: "swim", moment: "morning", detail: "Piscine + échauffement", estimatedMinutes: 45, xp: 35, completed: false },
        { id: "w1-mon-pull", label: "Tractions (Séries Droites RIR 1-2) — 4 × 4 reps", type: "pull", moment: "morning", detail: "4 séries droites • RIR 1-2 • Test RIR sur dernière série", estimatedMinutes: 15, xp: 25, completed: false },
        { id: "w1-mon-chair", label: "Chaise Isométrique — 3 × 45 s", type: "chair", moment: "morning", detail: "Maintien statique à 90°", estimatedMinutes: 10, xp: 15, completed: false },
        { id: "w1-mon-run", label: "Course en duo — footing 5 km", type: "run", moment: "evening", detail: "Allure confortable", estimatedMinutes: 40, xp: 50, completed: false },
        { id: "w1-mon-psycho", label: "Psychotechnique — Calcul mental", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Mardi",
      objective: "Régularité",
      title: "Rythme stable",
      priority: "Haute",
      tasks: [
        { id: "w1-tue-core", label: "Gainage — 15 min", type: "custom", moment: "afternoon", detail: "Stabilité du tronc", estimatedMinutes: 15, xp: 15, completed: false },
        { id: "w1-tue-run", label: "Course en duo — footing", type: "run", moment: "evening", detail: "Allure facile", estimatedMinutes: 35, xp: 50, completed: false },
        { id: "w1-tue-psycho", label: "Psychotechnique — Logique", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Mercredi",
      objective: "Volume",
      title: "Rythme fluide",
      priority: "Normale",
      tasks: [
        { id: "w1-wed-swim", label: "Natation — 45 min", type: "swim", moment: "morning", detail: "Échauffement + technique", estimatedMinutes: 45, xp: 35, completed: false },
        { id: "w1-wed-pull", label: "Tractions (Séries Droites RIR 1-2) — 4 × 4 reps", type: "pull", moment: "morning", detail: "4 séries droites • RIR 1-2 • Test RIR sur dernière série", estimatedMinutes: 15, xp: 25, completed: false },
        { id: "w1-wed-chair", label: "Chaise Isométrique — 3 × 45 s", type: "chair", moment: "morning", detail: "Maintien statique à 90°", estimatedMinutes: 10, xp: 15, completed: false },
        { id: "w1-wed-run", label: "Course en duo — footing facile", type: "run", moment: "evening", detail: "Allure douce", estimatedMinutes: 35, xp: 50, completed: false },
        { id: "w1-wed-psycho", label: "Psychotechnique — Mémoire", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Jeudi",
      objective: "Cardio + force",
      title: "Séance équilibrée",
      priority: "Haute",
      tasks: [
        { id: "w1-thu-pull", label: "Tractions (Pré-activation) — 4 × 3 reps", type: "pull", moment: "morning", detail: "Pré-activation sous-maximale sans échec (RIR 3-4) avant le cardio de l'après-midi", estimatedMinutes: 12, xp: 20, completed: false },
        { id: "w1-thu-chair", label: "Chaise (Pré-activation) — 3 × 30 s", type: "chair", moment: "morning", detail: "Éveil statique léger sans échec", estimatedMinutes: 8, xp: 10, completed: false },
        { id: "w1-thu-fraction", label: "Fractionné spécifique — 8×200 m", type: "run", moment: "afternoon", detail: "Récupération courte", estimatedMinutes: 30, xp: 50, completed: false },
        { id: "w1-thu-run", label: "Course en duo — tranquille", type: "run", moment: "evening", detail: "Récupération", estimatedMinutes: 30, xp: 50, completed: false },
        { id: "w1-thu-psycho", label: "Psychotechnique — Suites numériques", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Vendredi",
      objective: "Récupération active & Renforcement",
      title: "Séance 3 de la semaine",
      priority: "Normale",
      tasks: [
        { id: "w1-fri-swim", label: "Natation — 45 min", type: "swim", moment: "morning", detail: "Récupération active", estimatedMinutes: 45, xp: 35, completed: false },
        { id: "w1-fri-pull", label: "Tractions (Séries Droites RIR 1-2) — 4 × 4 reps", type: "pull", moment: "morning", detail: "4 séries droites • RIR 1-2 • Test RIR sur dernière série", estimatedMinutes: 15, xp: 25, completed: false },
        { id: "w1-fri-chair", label: "Chaise Isométrique — 3 × 45 s", type: "chair", moment: "morning", detail: "Maintien statique à 90°", estimatedMinutes: 10, xp: 15, completed: false },
        { id: "w1-fri-psycho", label: "Psychotechnique — Orientation spatiale", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Samedi",
      objective: "Endurance",
      title: "Sortie longue",
      priority: "Haute",
      tasks: [
        { id: "w1-sat-run", label: "Sortie longue — 6 km", type: "run", moment: "morning", detail: "Seul ou en duo", estimatedMinutes: 50, xp: 50, completed: false },
        { id: "w1-sat-core", label: "Gainage — 15 min", type: "custom", moment: "afternoon", detail: "Stabilité du tronc", estimatedMinutes: 15, xp: 15, completed: false },
        { id: "w1-sat-rest", label: "Repos — soir", type: "custom", moment: "evening", detail: "Récupération", estimatedMinutes: 0, xp: 5, completed: false },
        { id: "w1-sat-psycho", label: "Psychotechnique — Test complet chronométré", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 40, xp: 20, completed: false },
      ],
    },
    {
      name: "Dimanche",
      objective: "Récupération",
      title: "Repos utile",
      priority: "Recuperation",
      tasks: [
        { id: "w1-sun-mobility", label: "Repos / marche / mobilité", type: "custom", moment: "morning", detail: "Activité douce", estimatedMinutes: 30, xp: 10, completed: false },
        { id: "w1-sun-rest", label: "Repos — soir", type: "custom", moment: "evening", detail: "Complète récupération", estimatedMinutes: 0, xp: 5, completed: false },
        { id: "w1-sun-psycho", label: "Psychotechnique — Correction des erreurs", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
  ],
};

