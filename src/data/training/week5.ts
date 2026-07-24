import type { TrainingWeekDefinition } from "@/types/training";

export const week5: TrainingWeekDefinition = {
  id: "week-5",
  label: "Semaine 5",
  days: [
    {
      name: "Lundi",
      objective: "Endurance + force",
      title: "Base solide",
      priority: "Normale",
      tasks: [
        { id: "w5-mon-swim", label: "Natation — 45 min", type: "swim", moment: "morning", detail: "Piscine + échauffement", estimatedMinutes: 45, xp: 35, completed: false },
        { id: "w5-mon-pull", label: "Tractions (Séries Droites RIR 1-2) — 4 × 6 reps", type: "pull", moment: "morning", detail: "4 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série", estimatedMinutes: 15, xp: 25, completed: false },
        { id: "w5-mon-chair", label: "Chaise Isométrique — 3 × 105 s", type: "chair", moment: "morning", detail: "Maintien statique à 90° • Repos 60s", estimatedMinutes: 10, xp: 15, completed: false },
        { id: "w5-mon-run", label: "Course en duo — footing 5 km", type: "run", moment: "evening", detail: "Allure confortable", estimatedMinutes: 40, xp: 50, completed: false },
        { id: "w5-mon-psycho", label: "Psychotechnique — Calcul mental", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Mardi",
      objective: "Régularité",
      title: "Rythme stable",
      priority: "Haute",
      tasks: [
        { id: "w5-tue-core", label: "Gainage — 15 min", type: "custom", moment: "afternoon", detail: "Stabilité du tronc", estimatedMinutes: 15, xp: 15, completed: false },
        { id: "w5-tue-run", label: "Course en duo — footing", type: "run", moment: "evening", detail: "Allure facile", estimatedMinutes: 35, xp: 50, completed: false },
        { id: "w5-tue-psycho", label: "Psychotechnique — Logique", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Mercredi",
      objective: "Volume",
      title: "Rythme fluide",
      priority: "Normale",
      tasks: [
        { id: "w5-wed-swim", label: "Natation — 45 min", type: "swim", moment: "morning", detail: "Échauffement + technique", estimatedMinutes: 45, xp: 35, completed: false },
        { id: "w5-wed-pull", label: "Tractions (Séries Droites RIR 1-2) — 4 × 6 reps", type: "pull", moment: "morning", detail: "4 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série", estimatedMinutes: 15, xp: 25, completed: false },
        { id: "w5-wed-chair", label: "Chaise Isométrique — 3 × 105 s", type: "chair", moment: "morning", detail: "Maintien statique à 90° • Repos 60s", estimatedMinutes: 10, xp: 15, completed: false },
        { id: "w5-wed-run", label: "Course en duo — footing facile", type: "run", moment: "evening", detail: "Allure douce", estimatedMinutes: 35, xp: 50, completed: false },
        { id: "w5-wed-psycho", label: "Psychotechnique — Mémoire", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Jeudi",
      objective: "Cardio + force",
      title: "Séance équilibrée",
      priority: "Haute",
      tasks: [
        { id: "w5-thu-pull", label: "Tractions (Pré-activation) — 4 × 3 reps", type: "pull", moment: "morning", detail: "Pré-activation sous-maximale sans échec (RIR 3-4)", estimatedMinutes: 12, xp: 20, completed: false },
        { id: "w5-thu-chair", label: "Chaise (Pré-activation) — 3 × 30 s", type: "chair", moment: "morning", detail: "Éveil statique léger sans échec", estimatedMinutes: 8, xp: 10, completed: false },
        { id: "w5-thu-fraction", label: "Fractionné spécifique — Luc Léger", type: "run", moment: "afternoon", detail: "Spécifique Luc Léger", estimatedMinutes: 30, xp: 50, completed: false },
        { id: "w5-thu-run", label: "Course en duo — tranquille", type: "run", moment: "evening", detail: "Récupération", estimatedMinutes: 30, xp: 50, completed: false },
        { id: "w5-thu-psycho", label: "Psychotechnique — Suites numériques", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Vendredi",
      objective: "Récupération active & Renforcement",
      title: "Séance 3 de la semaine",
      priority: "Normale",
      tasks: [
        { id: "w5-fri-swim", label: "Natation — 45 min", type: "swim", moment: "morning", detail: "Récupération active", estimatedMinutes: 45, xp: 35, completed: false },
        { id: "w5-fri-pull", label: "Tractions (Séries Droites RIR 1-2) — 4 × 6 reps", type: "pull", moment: "morning", detail: "4 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série", estimatedMinutes: 15, xp: 25, completed: false },
        { id: "w5-fri-chair", label: "Chaise Isométrique — 3 × 105 s", type: "chair", moment: "morning", detail: "Maintien statique à 90° • Repos 60s", estimatedMinutes: 10, xp: 15, completed: false },
        { id: "w5-fri-run", label: "Course en duo — footing récupération 4-5 km", type: "run", moment: "evening", detail: "Allure souple", estimatedMinutes: 35, xp: 50, completed: false },
        { id: "w5-fri-psycho", label: "Psychotechnique — Orientation spatiale", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Samedi",
      objective: "Endurance",
      title: "Sortie longue",
      priority: "Haute",
      tasks: [
        { id: "w5-sat-run", label: "Sortie longue — 9 km", type: "run", moment: "morning", detail: "Seul ou en duo", estimatedMinutes: 65, xp: 50, completed: false },
        { id: "w5-sat-core", label: "Gainage — 15 min", type: "custom", moment: "afternoon", detail: "Stabilité du tronc", estimatedMinutes: 15, xp: 15, completed: false },
        { id: "w5-sat-rest", label: "Repos — soir", type: "custom", moment: "evening", detail: "Récupération", estimatedMinutes: 0, xp: 5, completed: false },
        { id: "w5-sat-psycho", label: "Psychotechnique — Test complet chronométré", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 40, xp: 20, completed: false },
      ],
    },
    {
      name: "Dimanche",
      objective: "Récupération",
      title: "Repos utile",
      priority: "Recuperation",
      tasks: [
        { id: "w5-sun-mobility", label: "Repos / marche / mobilité", type: "custom", moment: "morning", detail: "Activité douce", estimatedMinutes: 30, xp: 10, completed: false },
        { id: "w5-sun-rest", label: "Repos — soir", type: "custom", moment: "evening", detail: "Complète récupération", estimatedMinutes: 0, xp: 5, completed: false },
        { id: "w5-sun-psycho", label: "Psychotechnique — Correction des erreurs", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
  ],
};

