import { describe, expect, test } from "bun:test";
import {
  buildWeekDays,
  buildDayMission,
  buildHistoryItems,
  groupTasksByMoment,
} from "./forge-program";
import type { ForgeState } from "./forge-store";

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
      journal: { notes: "Tractions propres, bonne energie." },
      psycho: { type: "Calcul mental", score: 42, duration: 1200 },
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

describe("forge program helpers", () => {
  test("buildWeekDays returns a monday-first week and marks today", () => {
    const week = buildWeekDays(new Date("2026-07-21T12:00:00"), state, "2026-07-21");

    expect(week.map((day) => day.iso)).toEqual([
      "2026-07-20",
      "2026-07-21",
      "2026-07-22",
      "2026-07-23",
      "2026-07-24",
      "2026-07-25",
      "2026-07-26",
    ]);
    expect(week[1].isToday).toBe(true);
    expect(week[0].completionPct).toBe(100);
  });

  test("buildDayMission summarizes completion, XP, duration, and psychotech status", () => {
    const mission = buildDayMission(state, "2026-07-21");

    expect(mission.doneCount).toBe(1);
    expect(mission.remainingCount).toBe(3);
    expect(mission.completionPct).toBe(25);
    expect(mission.xp).toBe(50);
    expect(mission.estimatedMinutes).toBe(82);
    expect(mission.status).toBe("en_cours");
    expect(mission.psychotechnique?.label).toContain("Memoire");
    expect(mission.psychotechnique?.done).toBe(false);
  });

  test("groupTasksByMoment keeps psychotechniques as a daily mission bucket", () => {
    const mission = buildDayMission(state, "2026-07-21");
    const grouped = groupTasksByMoment(mission.tasks);

    expect(grouped.morning.map((task) => task.id)).toEqual([]);
    expect(grouped.afternoon.map((task) => task.id)).toEqual(["run-2"]);
    expect(grouped.evening.map((task) => task.id)).toEqual(["stretch-2", "hydro-2"]);
    expect(grouped.psychotechniques.map((task) => task.id)).toEqual(["psycho-2"]);
  });

  test("buildHistoryItems returns recent day completion and highlights", () => {
    const history = buildHistoryItems(state, "2026-07-21", 3);

    expect(history[0]).toMatchObject({
      iso: "2026-07-21",
      doneCount: 1,
      completionPct: 25,
      completed: false,
      highlight: "Course - 5 km",
    });
    expect(history[1]).toMatchObject({
      iso: "2026-07-20",
      completionPct: 100,
      completed: true,
      note: "Tractions propres, bonne energie.",
    });
  });
});
