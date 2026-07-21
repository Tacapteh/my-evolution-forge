import type { TrainingWeekDefinition } from "@/types/training";

export const week4: TrainingWeekDefinition = {
  id: "week-4",
  label: "Semaine 4",
  days: [
    {
      name: "Lundi",
      objective: "Endurance + force",
      title: "Base solide",
      priority: "Normale",
      tasks: [
        { id: "w4-mon-swim", label: "Natation — 45 min", type: "swim", moment: "morning", detail: "Piscine + échauffement", estimatedMinutes: 45, xp: 35, completed: false },
        { id: "w4-mon-pull", label: "Tractions — 5×6", type: "pull", moment: "morning", detail: "Post-piscine", estimatedMinutes: 15, xp: 25, completed: false },
        { id: "w4-mon-chair", label: "Chaise — 3×105 s", type: "chair", moment: "morning", detail: "Renforcement musculaire", estimatedMinutes: 10, xp: 15, completed: false },
        { id: "w4-mon-run", label: "Course en duo — footing 5 km", type: "run", moment: "evening", detail: "Allure confortable", estimatedMinutes: 40, xp: 50, completed: false },
        { id: "w4-mon-psycho", label: "Psychotechnique — Calcul mental", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Mardi",
      objective: "Régularité",
      title: "Rythme stable",
      priority: "Haute",
      tasks: [
        { id: "w4-tue-pull", label: "Tractions — 5 séries réparties", type: "pull", moment: "morning", detail: "Matinée progressive", estimatedMinutes: 20, xp: 25, completed: false },
        { id: "w4-tue-core", label: "Gainage — 15 min", type: "custom", moment: "afternoon", detail: "Stabilité du tronc", estimatedMinutes: 15, xp: 15, completed: false },
        { id: "w4-tue-run", label: "Course en duo — footing", type: "run", moment: "evening", detail: "Allure facile", estimatedMinutes: 35, xp: 50, completed: false },
        { id: "w4-tue-psycho", label: "Psychotechnique — Logique", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Mercredi",
      objective: "Volume",
      title: "Rythme fluide",
      priority: "Normale",
      tasks: [
        { id: "w4-wed-swim", label: "Natation — 45 min", type: "swim", moment: "morning", detail: "Échauffement + technique", estimatedMinutes: 45, xp: 35, completed: false },
        { id: "w4-wed-pull", label: "Tractions — 5×6", type: "pull", moment: "morning", detail: "Renforcement", estimatedMinutes: 15, xp: 25, completed: false },
        { id: "w4-wed-run", label: "Course en duo — footing facile", type: "run", moment: "evening", detail: "Allure douce", estimatedMinutes: 35, xp: 50, completed: false },
        { id: "w4-wed-psycho", label: "Psychotechnique — Mémoire", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Jeudi",
      objective: "Cardio + force",
      title: "Séance équilibrée",
      priority: "Haute",
      tasks: [
        { id: "w4-thu-pull", label: "Tractions — 5×6", type: "pull", moment: "morning", detail: "Renforcement", estimatedMinutes: 15, xp: 25, completed: false },
        { id: "w4-thu-chair", label: "Chaise — 3×105 s", type: "chair", moment: "morning", detail: "Stabilité", estimatedMinutes: 10, xp: 15, completed: false },
        { id: "w4-thu-fraction", label: "Fractionné spécifique — Luc Léger", type: "run", moment: "afternoon", detail: "Spécifique Luc Léger", estimatedMinutes: 30, xp: 50, completed: false },
        { id: "w4-thu-run", label: "Course en duo — tranquille", type: "run", moment: "evening", detail: "Récupération", estimatedMinutes: 30, xp: 50, completed: false },
        { id: "w4-thu-psycho", label: "Psychotechnique — Suites numériques", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Vendredi",
      objective: "Récupération active",
      title: "Reprise légère",
      priority: "Normale",
      tasks: [
        { id: "w4-fri-swim", label: "Natation — 45 min", type: "swim", moment: "morning", detail: "Récupération active", estimatedMinutes: 45, xp: 35, completed: false },
        { id: "w4-fri-run", label: "Course en duo — footing récupération 4-5 km", type: "run", moment: "evening", detail: "Allure souple", estimatedMinutes: 35, xp: 50, completed: false },
        { id: "w4-fri-psycho", label: "Psychotechnique — Orientation spatiale", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Samedi",
      objective: "Endurance",
      title: "Sortie longue",
      priority: "Haute",
      tasks: [
        { id: "w4-sat-run", label: "Sortie longue — 8 km", type: "run", moment: "morning", detail: "Seul ou en duo", estimatedMinutes: 60, xp: 50, completed: false },
        { id: "w4-sat-pull", label: "Tractions — 5×6", type: "pull", moment: "afternoon", detail: "Post-sortie", estimatedMinutes: 15, xp: 25, completed: false },
        { id: "w4-sat-chair", label: "Chaise — 3×105 s", type: "chair", moment: "afternoon", detail: "Renforcement", estimatedMinutes: 10, xp: 15, completed: false },
        { id: "w4-sat-core", label: "Gainage — 15 min", type: "custom", moment: "afternoon", detail: "Stabilité", estimatedMinutes: 15, xp: 15, completed: false },
        { id: "w4-sat-rest", label: "Repos — soir", type: "custom", moment: "evening", detail: "Récupération", estimatedMinutes: 0, xp: 5, completed: false },
        { id: "w4-sat-psycho", label: "Psychotechnique — Test complet chronométré", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 40, xp: 20, completed: false },
      ],
    },
    {
      name: "Dimanche",
      objective: "Récupération",
      title: "Repos utile",
      priority: "Recuperation",
      tasks: [
        { id: "w4-sun-mobility", label: "Repos / marche / mobilité", type: "custom", moment: "morning", detail: "Activité douce", estimatedMinutes: 30, xp: 10, completed: false },
        { id: "w4-sun-rest", label: "Repos — soir", type: "custom", moment: "evening", detail: "Complète récupération", estimatedMinutes: 0, xp: 5, completed: false },
        { id: "w4-sun-psycho", label: "Psychotechnique — Correction des erreurs", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
  ],
};
