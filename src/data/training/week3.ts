import type { TrainingWeekDefinition } from "@/types/training";

export const week3: TrainingWeekDefinition = {
  id: "week-3",
  label: "Semaine 3",
  days: [
    {
      name: "Lundi",
      objective: "Endurance + force",
      title: "Base solide",
      priority: "Normale",
      tasks: [
        { id: "w3-mon-swim", label: "Natation — 45 min", type: "swim", moment: "morning", detail: "Piscine + échauffement", estimatedMinutes: 45, xp: 35, completed: false },
        { id: "w3-mon-pull", label: "Tractions (Séries Droites RIR 1-2) — 5 × 4 reps", type: "pull", moment: "morning", detail: "5 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série", estimatedMinutes: 15, xp: 25, completed: false },
        { id: "w3-mon-chair", label: "Chaise Isométrique — 3 × 75 s", type: "chair", moment: "morning", detail: "Maintien statique à 90° • Repos 60s", estimatedMinutes: 10, xp: 15, completed: false },
        { id: "w3-mon-run", label: "Course en duo — footing 5 km", type: "run", moment: "evening", detail: "Allure confortable", estimatedMinutes: 40, xp: 50, completed: false },
        { id: "w3-mon-psycho", label: "Psychotechnique — Calcul mental", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Mardi",
      objective: "Régularité",
      title: "Rythme stable",
      priority: "Haute",
      tasks: [
        { id: "w3-tue-core", label: "Gainage — 15 min", type: "custom", moment: "afternoon", detail: "Stabilité du tronc", estimatedMinutes: 15, xp: 15, completed: false },
        { id: "w3-tue-run", label: "Course en duo — footing", type: "run", moment: "evening", detail: "Allure facile", estimatedMinutes: 35, xp: 50, completed: false },
        { id: "w3-tue-psycho", label: "Psychotechnique — Logique", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Mercredi",
      objective: "Volume",
      title: "Rythme fluide",
      priority: "Normale",
      tasks: [
        { id: "w3-wed-swim", label: "Natation — 45 min", type: "swim", moment: "morning", detail: "Échauffement + technique", estimatedMinutes: 45, xp: 35, completed: false },
        { id: "w3-wed-pull", label: "Tractions (Séries Droites RIR 1-2) — 5 × 4 reps", type: "pull", moment: "morning", detail: "5 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série", estimatedMinutes: 15, xp: 25, completed: false },
        { id: "w3-wed-chair", label: "Chaise Isométrique — 3 × 75 s", type: "chair", moment: "morning", detail: "Maintien statique à 90° • Repos 60s", estimatedMinutes: 10, xp: 15, completed: false },
        { id: "w3-wed-run", label: "Course en duo — footing facile", type: "run", moment: "evening", detail: "Allure douce", estimatedMinutes: 35, xp: 50, completed: false },
        { id: "w3-wed-psycho", label: "Psychotechnique — Mémoire", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Jeudi",
      objective: "Cardio + force",
      title: "Séance équilibrée",
      priority: "Haute",
      tasks: [
        { id: "w3-thu-pull", label: "Tractions (Pré-activation) — 4 × 3 reps", type: "pull", moment: "morning", detail: "Pré-activation sous-maximale sans échec (RIR 3-4)", estimatedMinutes: 12, xp: 20, completed: false },
        { id: "w3-thu-chair", label: "Chaise (Pré-activation) — 3 × 30 s", type: "chair", moment: "morning", detail: "Éveil statique léger sans échec", estimatedMinutes: 8, xp: 10, completed: false },
        { id: "w3-thu-fraction", label: "Fractionné spécifique — 6×400 m", type: "run", moment: "afternoon", detail: "Récupération courte", estimatedMinutes: 30, xp: 50, completed: false },
        { id: "w3-thu-run", label: "Course en duo — tranquille", type: "run", moment: "evening", detail: "Récupération", estimatedMinutes: 30, xp: 50, completed: false },
        { id: "w3-thu-psycho", label: "Psychotechnique — Suites numériques", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Vendredi",
      objective: "Récupération active & Renforcement",
      title: "Séance 3 de la semaine",
      priority: "Normale",
      tasks: [
        { id: "w3-fri-swim", label: "Natation — 45 min", type: "swim", moment: "morning", detail: "Récupération active", estimatedMinutes: 45, xp: 35, completed: false },
        { id: "w3-fri-pull", label: "Tractions (Séries Droites RIR 1-2) — 5 × 4 reps", type: "pull", moment: "morning", detail: "5 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série", estimatedMinutes: 15, xp: 25, completed: false },
        { id: "w3-fri-chair", label: "Chaise Isométrique — 3 × 75 s", type: "chair", moment: "morning", detail: "Maintien statique à 90° • Repos 60s", estimatedMinutes: 10, xp: 15, completed: false },
        { id: "w3-fri-run", label: "Course en duo — footing récupération 4-5 km", type: "run", moment: "evening", detail: "Allure souple", estimatedMinutes: 35, xp: 50, completed: false },
        { id: "w3-fri-psycho", label: "Psychotechnique — Orientation spatiale", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Samedi",
      objective: "Endurance",
      title: "Sortie longue",
      priority: "Haute",
      tasks: [
        { id: "w3-sat-run", label: "Sortie longue — 8 km", type: "run", moment: "morning", detail: "Seul ou en duo", estimatedMinutes: 60, xp: 50, completed: false },
        { id: "w3-sat-core", label: "Gainage — 15 min", type: "custom", moment: "afternoon", detail: "Stabilité du tronc", estimatedMinutes: 15, xp: 15, completed: false },
        { id: "w3-sat-rest", label: "Repos — soir", type: "custom", moment: "evening", detail: "Récupération", estimatedMinutes: 0, xp: 5, completed: false },
        { id: "w3-sat-psycho", label: "Psychotechnique — Test complet chronométré", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 40, xp: 20, completed: false },
      ],
    },
    {
      name: "Dimanche",
      objective: "Récupération",
      title: "Repos utile",
      priority: "Recuperation",
      tasks: [
        { id: "w3-sun-mobility", label: "Repos / marche / mobilité", type: "custom", moment: "morning", detail: "Activité douce", estimatedMinutes: 30, xp: 10, completed: false },
        { id: "w3-sun-rest", label: "Repos — soir", type: "custom", moment: "evening", detail: "Complète récupération", estimatedMinutes: 0, xp: 5, completed: false },
        { id: "w3-sun-psycho", label: "Psychotechnique — Correction des erreurs", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
  ],
};

