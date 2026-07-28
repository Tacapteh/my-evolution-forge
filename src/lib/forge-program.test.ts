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
        "swim-1000m": true,
        "pullups-volume": true,
      },
      journal: { notes: "Tractions propres, bonne energie." },
      psycho: { type: "Calcul mental", score: 42, duration: 1200 },
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
  ],
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
  });

  test("buildDayMission summarizes completion, XP, duration, and psychotech status", () => {
    const mission = buildDayMission(state, "2026-07-21");

    expect(mission.doneCount).toBe(1);
    expect(mission.totalCount).toBe(6);
    expect(mission.remainingCount).toBe(5);
    expect(mission.completionPct).toBe(17);
    expect(mission.status).toBe("en_cours");
  });

  test("groupTasksByMoment groups tasks correctly including psychotechniques", () => {
    const mission = buildDayMission(state, "2026-07-21");
    const grouped = groupTasksByMoment(mission.tasks);

    expect(grouped.psychotechniques.map((task) => task.type)).toEqual(["psycho"]);
  });

  test("buildHistoryItems returns recent day completion and highlights", () => {
    const history = buildHistoryItems(state, "2026-07-21", 3);

    expect(history[0]).toMatchObject({
      iso: "2026-07-21",
      doneCount: 1,
      completed: false,
    });
  });
});
