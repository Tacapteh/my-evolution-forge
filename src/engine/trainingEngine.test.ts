import { describe, expect, test } from "bun:test";
import { createTrainingEngine, getUserMaxes } from "./trainingEngine";
import type { ForgeState } from "../lib/forge-store";

const state: ForgeState = {
  targetDate: "2026-12-01",
  userName: "Quentin",
  days: {
    "2026-07-20": {
      checked: {
        "custom-pull-1": true,
      },
      customTasks: [
        {
          id: "custom-pull-1",
          label: "Tractions Pronation",
          type: "pull",
          moment: "morning",
          estimatedMinutes: 15,
          xp: 25,
        },
      ],
    },
  },
  perf: [
    { id: "p1", type: "pull", value: 12, date: "2026-07-15" },
    { id: "push1", type: "push_military", value: 30, date: "2026-07-15" },
    { id: "c1", type: "chair", value: 90, date: "2026-07-15" },
    { id: "cm1", type: "commando", value: 120, date: "2026-07-15" },
    { id: "vma1", type: "vma", value: 14.5, date: "2026-07-15" },
  ],
  badges: [],
};

describe("training engine", () => {
  test("returns today's mission and progress from custom tasks engine", () => {
    const engine = createTrainingEngine(state, { toggleTask: () => {} }, { todayISO: "2026-07-20" });

    const mission = engine.getTodayProgram();
    expect(mission.dayName).toBe("Lundi");
    expect(mission.doneCount).toBe(1);
    expect(mission.totalCount).toBe(2); // custom-pull-1 + psycho
  });

  test("getUserMaxes correctly derives metrics for all catalog exercises", () => {
    const maxes = getUserMaxes(state);
    expect(maxes.userMaxPull).toBe(12);
    expect(maxes.userMaxPushMilitary).toBe(30);
    expect(maxes.userMaxChair).toBe(90);
    expect(maxes.userMaxCommando).toBe(120);
  });
});
