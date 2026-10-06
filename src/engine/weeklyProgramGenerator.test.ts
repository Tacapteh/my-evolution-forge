import { describe, expect, test } from "bun:test";
import {
  generateWeeklyProgram,
  calculateDynamicReps,
  calculateIsometricDuration,
  type UserStats,
} from "./weeklyProgramGenerator";

describe("weeklyProgramGenerator", () => {
  const mockUserStats: UserStats = {
    maxPullups: 12,
    maxPushups: 30,
    maxWallSitSeconds: 90,
    maxPlankSeconds: 120,
    vma: 14.5,
  };

  test("calculates dynamic reps correctly based on userMax and intensity", () => {
    expect(calculateDynamicReps(30, 0.75)).toBe(23);
    expect(calculateDynamicReps(12, 0.75)).toBe(9);
    expect(calculateDynamicReps(30, 0.40)).toBe(12);
  });

  test("calculates isometric duration correctly based on userMaxSeconds and intensity", () => {
    expect(calculateIsometricDuration(90, 0.65)).toBe(59);
    expect(calculateIsometricDuration(120, 0.65)).toBe(78);
  });

  test("generates blank weekly schedule by default for custom workout builder", () => {
    const program = generateWeeklyProgram(mockUserStats);

    expect(program.schedule).toHaveLength(7);
    expect(program.userStats).toEqual(mockUserStats);

    const days = program.schedule.map((d) => d.dayName);
    expect(days).toEqual([
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
      "Dimanche",
    ]);

    // Verify all days start blank (empty sessions)
    program.schedule.forEach((day) => {
      expect(day.sessions).toHaveLength(0);
    });
  });
});
