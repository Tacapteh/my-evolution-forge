import { describe, expect, test } from "bun:test";
import { createTrainingEngine, getUserMaxes } from "./trainingEngine";
import type { ForgeState } from "../lib/forge-store";

const state: ForgeState = {
  targetDate: "2026-12-01",
  userName: "Quentin",
  days: {
    "2026-07-20": {
      checked: {
        "swim-1000m": true,
        "pullups-volume": true,
      },
    },
    "2026-07-21": {
      checked: {
        "evening-run-note-tue": true,
      },
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
  test("returns today's mission and progress from the dynamic engine", () => {
    const engine = createTrainingEngine(state, { toggleTask: () => {} }, { todayISO: "2026-07-21" });

    const mission = engine.getTodayProgram();
    const progress = engine.getProgress();

    expect(mission.dayName).toBe("Mardi");
    expect(mission.programId).toBe("military-september");
    expect(mission.weekId).toBe("week-1");
    expect(mission.doneCount).toBe(1);
    expect(mission.totalCount).toBe(6);
  });

  test("loads Monday swim day program with swim, pullups volume, pullups iso, and commando", () => {
    const engine = createTrainingEngine(state, { toggleTask: () => {} }, { todayISO: "2026-07-20" });

    const monMission = engine.getMission("2026-07-20");
    expect(monMission.dayName).toBe("Lundi");
    expect(monMission.tasks[0].label).toContain("Natation — 1000m");

    const pullTask = monMission.tasks.find((t) => t.id === "pullups-volume");
    expect(pullTask).toBeDefined();
    // 75% of 12 = 9 reps
    expect(pullTask?.detail).toContain("9 reps");

    const commandoTask = monMission.tasks.find((t) => t.id === "commando-lundi");
    expect(commandoTask).toBeDefined();
    // 60% of 120s = 72s
    expect(commandoTask?.detail).toContain("72s");
  });

  test("can complete an exercise through the engine", () => {
    let toggled: [string, string][] = [];
    const engine = createTrainingEngine(state, {
      toggleTask: (date, taskId) => {
        toggled.push([date, taskId]);
      },
    }, { todayISO: "2026-07-21" });

    engine.completeExercise("pushups-military", "2026-07-21");

    expect(toggled).toEqual([["2026-07-21", "pushups-military"]]);
  });

  test("generates light morning pre-activation and afternoon Luc Léger for Thursday", () => {
    const engine = createTrainingEngine(state, { toggleTask: () => {} }, { todayISO: "2026-07-23" });

    const mission = engine.getMission("2026-07-23");
    expect(mission.dayName).toBe("Jeudi");

    const preActTask = mission.tasks.find((t) => t.id === "pushups-diamond-preact");
    expect(preActTask?.moment).toBe("morning");
    expect(preActTask?.detail).toContain("40% Max");

    const lucTask = mission.tasks.find((t) => t.id === "luc-leger-session");
    expect(lucTask?.moment).toBe("afternoon");
    expect(lucTask?.label).toContain("Luc Léger");
  });

  test("getUserMaxes correctly derives metrics for all catalog exercises", () => {
    const maxes = getUserMaxes(state);
    expect(maxes.userMaxPull).toBe(12);
    expect(maxes.userMaxPushMilitary).toBe(30);
    expect(maxes.userMaxChair).toBe(90);
    expect(maxes.userMaxCommando).toBe(120);
  });
});
