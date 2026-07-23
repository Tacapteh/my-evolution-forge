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
});
