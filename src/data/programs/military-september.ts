import type { TrainingProgram } from "@/types/training";
import { week1 } from "../training/week1";
import { week2 } from "../training/week2";
import { week3 } from "../training/week3";
import { week4 } from "../training/week4";
import { week5 } from "../training/week5";
import { week6 } from "../training/week6";
import { week7 } from "../training/week7";
import { week8 } from "../training/week8";

export const militarySeptemberProgram: TrainingProgram = {
  id: "military-september",
  name: "Programme militaire — Septembre",
  description: "Programme d'endurance, force et psychotechniques structuré en semaines et jours.",
  objectives: [
    { id: "endurance", label: "Endurance", target: 100, unit: "km" },
    { id: "strength", label: "Force", target: 17, unit: "tractions" },
    { id: "psychotech", label: "Psychotechniques", target: 60, unit: "jours" },
  ],
  weeks: [week1, week2, week3, week4, week5, week6, week7, week8],
  tests: [
    { id: "luc-test", name: "Test Luc Léger", description: "Évaluation régulière du seuil anaérobie" },
  ],
  tips: ["Hydrate-toi chaque jour", "Respecte le repos entre les blocs"],
};
