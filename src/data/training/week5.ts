import type { TrainingWeekDefinition } from "@/types/training";

export const week5: TrainingWeekDefinition = {
  id: "week-5",
  label: "Semaine 5",
  days: [
    {
      name: "Lundi",
      objective: "Force de traction",
      title: "Base solide",
      priority: "Normale",
      tasks: [
        { id: "pull-1", label: "Tractions — 4 x max", type: "pull", detail: "Repos 90s", xp: 25 },
        { id: "chair-1", label: "Chaise — 3 x 60s", type: "chair", detail: "Repos 45s", xp: 15 },
        { id: "psycho-1", label: "Psychotechniques — Calcul mental", type: "psycho", detail: "20 min", xp: 20 },
        { id: "stretch-1", label: "Étirements", type: "stretch", detail: "10 min", xp: 10 },
        { id: "hydro-1", label: "Hydratation — 2L", type: "hydration", xp: 5 },
      ],
    },
    {
      name: "Mardi",
      objective: "Course de qualité",
      title: "Cadence douce",
      priority: "Haute",
      tasks: [
        { id: "run-2", label: "Course — 9 km", type: "run", detail: "Allure régulière", xp: 50 },
        { id: "psycho-2", label: "Psychotechniques — Mémoire", type: "psycho", detail: "20 min", xp: 20 },
        { id: "stretch-2", label: "Retour au calme", type: "stretch", detail: "10 min", xp: 10 },
        { id: "hydro-2", label: "Hydratation — 2L", type: "hydration", xp: 5 },
      ],
    },
    {
      name: "Mercredi",
      objective: "Technique aquatique",
      title: "Rythme fluide",
      priority: "Normale",
      tasks: [
        { id: "swim-3", label: "Natation — 1600 m", type: "swim", detail: "Échauffement + technique", xp: 35 },
        { id: "pull-3", label: "Tractions — 3 x max", type: "pull", detail: "Repos 90s", xp: 25 },
        { id: "psycho-3", label: "Psychotechniques — Logique", type: "psycho", detail: "20 min", xp: 20 },
        { id: "hydro-3", label: "Hydratation — 2L", type: "hydration", xp: 5 },
      ],
    },
    {
      name: "Jeudi",
      objective: "Puissance et stabilité",
      title: "Équilibre solide",
      priority: "Haute",
      tasks: [
        { id: "chair-4", label: "Chaise — 4 x 90s", type: "chair", detail: "Repos 60s", xp: 15 },
        { id: "run-4", label: "Course — 7 km fractionné", type: "run", detail: "40/20", xp: 50 },
        { id: "psycho-4", label: "Psychotechniques — Suites", type: "psycho", detail: "20 min", xp: 20 },
        { id: "stretch-4", label: "Étirements", type: "stretch", detail: "10 min", xp: 10 },
        { id: "hydro-4", label: "Hydratation — 2L", type: "hydration", xp: 5 },
      ],
    },
    {
      name: "Vendredi",
      objective: "Force de maintien",
      title: "Consolidation",
      priority: "Normale",
      tasks: [
        { id: "pull-5", label: "Tractions — 5 x max", type: "pull", detail: "Repos 90s", xp: 25 },
        { id: "chair-5", label: "Chaise — 3 x 75s", type: "chair", detail: "Repos 45s", xp: 15 },
        { id: "psycho-5", label: "Psychotechniques — Rotation spatiale", type: "psycho", detail: "20 min", xp: 20 },
        { id: "stretch-5", label: "Étirements", type: "stretch", detail: "10 min", xp: 10 },
        { id: "hydro-5", label: "Hydratation — 2L", type: "hydration", xp: 5 },
      ],
    },
    {
      name: "Samedi",
      objective: "Endurance prolongée",
      title: "Régularité",
      priority: "Haute",
      tasks: [
        { id: "run-6", label: "Course — 14 km", type: "run", detail: "Allure confort", xp: 50 },
        { id: "swim-6", label: "Natation — 1200 m récup", type: "swim", detail: "Souple", xp: 35 },
        { id: "stretch-6", label: "Étirements longs", type: "stretch", detail: "15 min", xp: 10 },
        { id: "hydro-6", label: "Hydratation — 3L", type: "hydration", xp: 5 },
      ],
    },
    {
      name: "Dimanche",
      objective: "Récupération active",
      title: "Repos utile",
      priority: "Recuperation",
      tasks: [
        { id: "psycho-7", label: "Test Luc Léger simulé", type: "psycho", detail: "Objectif personnel", xp: 20 },
        { id: "stretch-7", label: "Mobilité complète", type: "stretch", detail: "20 min", xp: 10 },
        { id: "hydro-7", label: "Hydratation — 2L", type: "hydration", xp: 5 },
      ],
    },
  ],
};
