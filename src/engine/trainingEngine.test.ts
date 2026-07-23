import { describe, expect, test } from "bun:test";
import { createTrainingEngine } from "./trainingEngine";
import type { ForgeState } from "../lib/forge-store";

const state: ForgeState = {
  targetDate: "2026-12-01",
  userName: "Quentin",
  days: {
    "2026-07-20": {
      checked: {
        "pull-1": true,
        "chair-1": true,
        "psycho-1": true,
        "stretch-1": true,
        "hydro-1": true,
      },
    },
    "2026-07-21": {
      checked: {
        "run-2": true,
        "psycho-2": false,
      },
    },
  },
  perf: [],
  badges: [],
};

describe("training engine", () => {
  test("returns today's mission and progress from the data-driven engine", () => {
    const engine = createTrainingEngine(state, { toggleTask: () => {} }, { todayISO: "2026-07-21" });

    const mission = engine.getTodayProgram();
    const progress = engine.getProgress();
    const dailyXP = engine.getDailyXP();

    expect(mission.dayName).toBe("Mardi");
    expect(mission.programId).toBe("military-september");
    expect(mission.weekId).toBe("week-1");
    expect(mission.doneCount).toBe(1);
    expect(mission.totalCount).toBe(8);
    expect(mission.completionPct).toBe(13);
    expect(progress.completionPct).toBe(13);
    expect(dailyXP).toBe(50);

    // Vérification du module Bras Explosion (4 exercices)
    const brasTasks = mission.tasks.filter((t) => t.id.startsWith("bras-"));
    expect(brasTasks.length).toBe(4);
    expect(brasTasks[0].label).toContain("Pompes Diamant");
    expect(brasTasks[1].label).toContain("Iso 90°");
    expect(brasTasks[2].label).toContain("Extensions triceps au sol");
    expect(brasTasks[3].label).toContain("négatives 5s");
  });

  test("loads the bifurcated program based on morning swim presence", () => {
    const engine = createTrainingEngine(state, { toggleTask: () => {} }, { todayISO: "2026-07-20" });

    // Lundi a Natation le matin -> Programme Maintien / Technique
    const swimMission = engine.getMission("2026-07-20");
    expect(swimMission.tasks[0].label).toBe("Natation — 45 min");
    expect(swimMission.tasks[1].label).toContain("Maintien / Technique");

    // Mardi n'a pas de Natation le matin -> Programme Force & Volume (axé 17-20 tractions)
    const noSwimMission = engine.getMission("2026-07-21");
    expect(noSwimMission.tasks[0].label).toContain("Force & Volume");
    expect(noSwimMission.tasks[0].label).toContain("Obj 17-20");
  });

  test("can complete an exercise through the engine", () => {
    let toggled: [string, string][] = [];
    const engine = createTrainingEngine(state, {
      toggleTask: (date, taskId) => {
        toggled.push([date, taskId]);
      },
    }, { todayISO: "2026-07-21" });

    engine.completeExercise("psycho-2", "2026-07-21");

    expect(toggled).toEqual([["2026-07-21", "psycho-2"]]);
  });

  test("generates light morning pre-activation and afternoon Luc Léger for Thursday", () => {
    const engine = createTrainingEngine(state, { toggleTask: () => {} }, { todayISO: "2026-07-23" });

    // 2026-07-23 est un Jeudi (dayIndex === 3)
    const mission = engine.getMission("2026-07-23");
    expect(mission.dayName).toBe("Jeudi");

    // Matin : Renforcement léger / pré-activation
    const pullTask = mission.tasks.find((t) => t.type === "pull");
    expect(pullTask?.moment).toBe("morning");
    expect(pullTask?.label).toContain("Pré-activation");
    expect(pullTask?.detail).toContain("fraîcheur des jambes");

    const chairTask = mission.tasks.find((t) => t.type === "chair");
    expect(chairTask?.moment).toBe("morning");
    expect(chairTask?.label).toContain("Pré-activation");
    expect(chairTask?.detail).toContain("sans charge lourde");

    // Après-midi : Test / Séance Luc Léger (cardio haute intensité & changements de direction)
    const lucTask = mission.tasks.find((t) => t.type === "run" && t.label.includes("Luc Léger"));
    expect(lucTask?.moment).toBe("afternoon");
    expect(lucTask?.detail).toContain("Cardio haute intensité");
    expect(lucTask?.detail).toContain("changements de direction");
  });

  test("allows per-task independent swapping and forces DUO runs to the evening", () => {
    const customState: ForgeState = {
      ...state,
      days: {
        "2026-07-21": {
          checked: {},
          swaps: {
            "w1-tue-core": "pompes_diamant", // Remplacer uniquement w1-tue-core (Gainage)
          },
        },
      },
    };

    const engine = createTrainingEngine(customState, { toggleTask: () => {} }, { todayISO: "2026-07-21" });
    const mission = engine.getMission("2026-07-21");

    // L'exercice w1-tue-core est remplacé par Pompes Diamant
    const swappedCoreTask = mission.tasks.find((t) => t.id === "w1-tue-core");
    expect(swappedCoreTask?.label).toContain("Pompes Diamant");
    expect(swappedCoreTask?.isSwapped).toBe(true);

    // Les autres exercices du même jour (ex: Tractions w1-tue-pull) restent intacts
    const pullTask = mission.tasks.find((t) => t.id === "w1-tue-pull");
    expect(pullTask?.label).toContain("Force & Volume");

    // Course en DUO est systématiquement le soir
    const duoTask = mission.tasks.find((t) => t.label.toLowerCase().includes("duo"));
    if (duoTask) {
      expect(duoTask.moment).toBe("evening");
    }
  });
});
