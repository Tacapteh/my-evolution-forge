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
    const weeklyCompletion = engine.getWeeklyCompletion();
    const dailyXP = engine.getDailyXP();

    expect(mission.dayName).toBe("Mardi");
    expect(mission.doneCount).toBe(1);
    expect(mission.completionPct).toBe(25);
    expect(progress.completionPct).toBe(25);
    expect(weeklyCompletion.completionPct).toBe(14);
    expect(dailyXP).toBe(50);
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
