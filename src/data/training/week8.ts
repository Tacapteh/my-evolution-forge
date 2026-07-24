import type { TrainingWeekDefinition } from "@/types/training";

export const week8: TrainingWeekDefinition = {
  id: "week-8",
  label: "Semaine 8 — Affûtage",
  days: [
    {
      name: "Lundi",
      objective: "Affûtage & Fraîcheur",
      title: "Volume réduit -40%",
      priority: "Normale",
      tasks: [
        { id: "w8-mon-swim", label: "Natation — 45 min", type: "swim", moment: "morning", detail: "Piscine + échauffement", estimatedMinutes: 45, xp: 35, completed: false },
        { id: "w8-mon-pull", label: "Tractions (Affûtage -50% vol) — 3 × 4 reps légères", type: "pull", moment: "morning", detail: "Volume réduit pour fraîcheur musculaire • RIR 3-4", estimatedMinutes: 10, xp: 20, completed: false },
        { id: "w8-mon-chair", label: "Chaise (Affûtage -50% vol) — 2 × 45 s max", type: "chair", moment: "morning", detail: "Maintien statique sous-maximal • Repos 60s", estimatedMinutes: 6, xp: 15, completed: false },
        { id: "w8-mon-run", label: "Course en duo — footing 5 km", type: "run", moment: "evening", detail: "Allure confortable", estimatedMinutes: 40, xp: 50, completed: false },
        { id: "w8-mon-psycho", label: "Psychotechnique — Calcul mental", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Mardi",
      objective: "Régularité",
      title: "Rythme léger",
      priority: "Haute",
      tasks: [
        { id: "w8-tue-core", label: "Gainage — 15 min", type: "custom", moment: "afternoon", detail: "Stabilité du tronc", estimatedMinutes: 15, xp: 15, completed: false },
        { id: "w8-tue-run", label: "Course en duo — footing", type: "run", moment: "evening", detail: "Allure facile", estimatedMinutes: 35, xp: 50, completed: false },
        { id: "w8-tue-psycho", label: "Psychotechnique — Logique", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Mercredi",
      objective: "Volume réduit",
      title: "Mobilité & Légèreté",
      priority: "Normale",
      tasks: [
        { id: "w8-wed-swim", label: "Natation — 45 min", type: "swim", moment: "morning", detail: "Échauffement + technique", estimatedMinutes: 45, xp: 35, completed: false },
        { id: "w8-wed-pull", label: "Tractions (Affûtage -50% vol) — 3 × 4 reps légères", type: "pull", moment: "morning", detail: "Volume réduit pour fraîcheur musculaire • RIR 3-4", estimatedMinutes: 10, xp: 20, completed: false },
        { id: "w8-wed-chair", label: "Chaise (Affûtage -50% vol) — 2 × 45 s max", type: "chair", moment: "morning", detail: "Maintien statique sous-maximal • Repos 60s", estimatedMinutes: 6, xp: 15, completed: false },
        { id: "w8-wed-run", label: "Course en duo — footing facile", type: "run", moment: "evening", detail: "Allure douce", estimatedMinutes: 35, xp: 50, completed: false },
        { id: "w8-wed-psycho", label: "Psychotechnique — Mémoire", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Jeudi",
      objective: "Cardio & Test Final",
      title: "Test Final Luc Léger",
      priority: "Haute",
      tasks: [
        { id: "w8-thu-fraction", label: "Fractionné spécifique — Test final Luc Léger", type: "run", moment: "afternoon", detail: "Test final Luc Léger", estimatedMinutes: 30, xp: 50, completed: false },
        { id: "w8-thu-run", label: "Course en duo — tranquille", type: "run", moment: "evening", detail: "Récupération", estimatedMinutes: 30, xp: 50, completed: false },
        { id: "w8-thu-psycho", label: "Psychotechnique — Suites numériques", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Vendredi",
      objective: "Récupération active & Affûtage",
      title: "Dernier rappel léger",
      priority: "Normale",
      tasks: [
        { id: "w8-fri-swim", label: "Natation — 45 min", type: "swim", moment: "morning", detail: "Récupération active", estimatedMinutes: 45, xp: 35, completed: false },
        { id: "w8-fri-pull", label: "Tractions (Affûtage -50% vol) — 3 × 4 reps légères", type: "pull", moment: "morning", detail: "Volume réduit pour fraîcheur musculaire • RIR 3-4", estimatedMinutes: 10, xp: 20, completed: false },
        { id: "w8-fri-chair", label: "Chaise (Affûtage -50% vol) — 2 × 45 s max", type: "chair", moment: "morning", detail: "Maintien statique sous-maximal • Repos 60s", estimatedMinutes: 6, xp: 15, completed: false },
        { id: "w8-fri-psycho", label: "Psychotechnique — Orientation spatiale", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
    {
      name: "Samedi",
      objective: "Endurance légère",
      title: "Sortie longue d'affûtage",
      priority: "Haute",
      tasks: [
        { id: "w8-sat-run", label: "Sortie longue — 6 km facile", type: "run", moment: "morning", detail: "Seul ou en duo", estimatedMinutes: 45, xp: 50, completed: false },
        { id: "w8-sat-core", label: "Gainage — 15 min", type: "custom", moment: "afternoon", detail: "Stabilité du tronc", estimatedMinutes: 15, xp: 15, completed: false },
        { id: "w8-sat-rest", label: "Repos — soir", type: "custom", moment: "evening", detail: "Récupération", estimatedMinutes: 0, xp: 5, completed: false },
        { id: "w8-sat-psycho", label: "Psychotechnique — Test complet chronométré", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 40, xp: 20, completed: false },
      ],
    },
    {
      name: "Dimanche",
      objective: "Récupération finale",
      title: "Repos complet",
      priority: "Recuperation",
      tasks: [
        { id: "w8-sun-mobility", label: "Repos / marche / mobilité", type: "custom", moment: "morning", detail: "Activité douce", estimatedMinutes: 30, xp: 10, completed: false },
        { id: "w8-sun-rest", label: "Repos — soir", type: "custom", moment: "evening", detail: "Complète récupération", estimatedMinutes: 0, xp: 5, completed: false },
        { id: "w8-sun-psycho", label: "Psychotechnique — Correction des erreurs", type: "psycho", moment: "psychotechniques", detail: "30-45 min", estimatedMinutes: 35, xp: 20, completed: false },
      ],
    },
  ],
};

