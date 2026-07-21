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
    expect(mission.programId).toBe("military-september");
    expect(mission.weekId).toBe("week-1");
    expect(mission.doneCount).toBe(1);
    expect(mission.completionPct).toBe(25);
    expect(progress.completionPct).toBe(25);
    expect(weeklyCompletion.completionPct).toBe(29);
    expect(dailyXP).toBe(50);
  });

  test("loads the personalized weekly program data from the training week files", () => {
    const engine = createTrainingEngine(state, { toggleTask: () => {} }, { todayISO: "2026-07-20" });

    const mission = engine.getMission("2026-07-20");

    expect(mission.tasks[0].label).toBe("Natation — 45 min");
    expect(mission.tasks[0].detail).toBe("Piscine + échauffement");
    expect(mission.tasks[0].estimatedMinutes).toBe(45);
    expect(mission.tasks[1].label).toBe("Tractions — 5×4");
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
