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
    // 75% of 30 pushups = 22.5 => 23
    expect(calculateDynamicReps(30, 0.75)).toBe(23);
    // 75% of 12 pullups = 9
    expect(calculateDynamicReps(12, 0.75)).toBe(9);
    // 40% of 30 pushups = 12
    expect(calculateDynamicReps(30, 0.40)).toBe(12);
  });

  test("calculates isometric duration correctly based on userMaxSeconds and intensity", () => {
    // 65% of 90s wall sit = 58.5 => 59s
    expect(calculateIsometricDuration(90, 0.65)).toBe(59);
    // 65% of 120s plank = 78s
    expect(calculateIsometricDuration(120, 0.65)).toBe(78);
  });

  test("generates weekly schedule with 7 days and MATIN, APRÈS-MIDI, SOIR sessions", () => {
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
  });

  test("Monday has Natation MATIN, Tirage APRÈS-MIDI, Core SOIR", () => {
    const program = generateWeeklyProgram(mockUserStats);
    const monday = program.schedule.find((d) => d.dayName === "Lundi")!;

    const moments = monday.sessions.map((s) => s.moment);
    expect(moments).toEqual(["MATIN", "APRÈS-MIDI", "SOIR"]);

    const morningSwim = monday.sessions[0].exercises.find((e) => e.category === "swim");
    expect(morningSwim).toBeDefined();

    const afternoonPull = monday.sessions[1].exercises.filter((e) => e.category === "pull");
    expect(afternoonPull).toHaveLength(2); // Pronation + Supination Iso
    expect(afternoonPull[0].targetReps).toBe(9); // 75% of 12
  });

  test("Tuesday focuses on Poussée Lourde MATIN, Triceps/Core APRÈS-MIDI", () => {
    const program = generateWeeklyProgram(mockUserStats);
    const tuesday = program.schedule.find((d) => d.dayName === "Mardi")!;

    const morningPush = tuesday.sessions[0].exercises.filter((e) => e.category === "push");
    expect(morningPush).toHaveLength(2); // Militaires + Déclinées
    expect(morningPush[0].targetReps).toBe(23); // 75% of 30

    const afternoonTriceps = tuesday.sessions[1].exercises.find((e) => e.id === "pushups-sphinx");
    expect(afternoonTriceps).toBeDefined();
    expect(afternoonTriceps?.targetReps).toBe(18); // 60% of 30
  });

  test("Thursday has light Poussée pre-activation MATIN and Luc Léger APRÈS-MIDI", () => {
    const program = generateWeeklyProgram(mockUserStats);
    const thursday = program.schedule.find((d) => d.dayName === "Jeudi")!;

    const morningPreAct = thursday.sessions[0].exercises.find((e) => e.id === "pushups-diamond-preact");
    expect(morningPreAct).toBeDefined();
    expect(morningPreAct?.targetReps).toBe(12); // 40% of 30

    const afternoonLuc = thursday.sessions[1].exercises.find((e) => e.id === "luc-leger-session");
    expect(afternoonLuc).toBeDefined();
  });

  test("Friday has static Plank core (max 1x per week)", () => {
    const program = generateWeeklyProgram(mockUserStats);
    
    // Check static plank occurs on Friday
    const friday = program.schedule.find((d) => d.dayName === "Vendredi")!;
    const staticPlank = friday.sessions.flatMap((s) => s.exercises).find((e) => e.id === "plank-friday");
    expect(staticPlank).toBeDefined();
    expect(staticPlank?.targetDurationSeconds).toBe(78); // 65% of 120s

    // Verify static plank is not present on other days
    const otherDays = program.schedule.filter((d) => d.dayName !== "Vendredi");
    const otherPlanks = otherDays
      .flatMap((d) => d.sessions)
      .flatMap((s) => s.exercises)
      .filter((e) => e.id === "plank-friday");
    expect(otherPlanks).toHaveLength(0);
  });

  test("Saturday features 3-tour metabolic circuit", () => {
    const program = generateWeeklyProgram(mockUserStats);
    const saturday = program.schedule.find((d) => d.dayName === "Samedi")!;

    const circuitExercises = saturday.sessions[0].exercises;
    expect(circuitExercises).toHaveLength(3); // Pompes, Chaise, Commando
    expect(circuitExercises.every((e) => e.sets === 3)).toBeTrue();
  });

  test("Sunday is rest & mobility with no heavy physical work", () => {
    const program = generateWeeklyProgram(mockUserStats);
    const sunday = program.schedule.find((d) => d.dayName === "Dimanche")!;

    const exercises = sunday.sessions.flatMap((s) => s.exercises);
    expect(exercises).toHaveLength(1);
    expect(exercises[0].category).toBe("mobility");
  });
});
