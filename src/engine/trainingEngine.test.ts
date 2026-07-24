import { describe, expect, test } from "bun:test";
import { createTrainingEngine, getUserMaxes } from "./trainingEngine";
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
    expect(mission.totalCount).toBe(3);
    expect(mission.completionPct).toBe(33);
    expect(progress.completionPct).toBe(33);

    // Vérification de la suppression stricte de Bras Explosion
    const brasTasks = mission.tasks.filter((t) => t.id.startsWith("bras-"));
    expect(brasTasks.length).toBe(0);
  });

  test("loads swim day program with strict discipline isolation (no runs, no secondary arm modules)", () => {
    const engine = createTrainingEngine(state, { toggleTask: () => {} }, { todayISO: "2026-07-24" });

    // 2026-07-24 est un Vendredi (Natation le matin) -> Seulement Swim + Pull + Chair + Psycho (Aucune course)
    const friMission = engine.getMission("2026-07-24");
    expect(friMission.tasks[0].label).toBe("Natation — 45 min");
    expect(friMission.tasks.some((t) => t.type === "pull")).toBe(true);
    expect(friMission.tasks.some((t) => t.type === "chair")).toBe(true);

    // Aucune course à pied et aucun exercice bras secondaire ne doit être présent
    const runTasks = friMission.tasks.filter((t) => t.type === "run");
    expect(runTasks.length).toBe(0);

    const brasTasks = friMission.tasks.filter((t) => t.id.startsWith("bras-"));
    expect(brasTasks.length).toBe(0);
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
    expect(pullTask?.detail).toContain("fraîcheur");

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

    // Course en DUO est systématiquement le soir
    const duoTask = mission.tasks.find((t) => t.label.toLowerCase().includes("duo"));
    if (duoTask) {
      expect(duoTask.moment).toBe("evening");
    }
  });

  test("supports tractions_lsit smart swap and dynamic recalculation via userMax", () => {
    const customState: ForgeState = {
      ...state,
      perf: [
        { id: "p1", type: "pull", value: 16, date: "2026-07-15" },
        { id: "c1", type: "chair", value: 120, date: "2026-07-15" },
      ],
      days: {
        "2026-07-22": {
          checked: {},
          swaps: {
            "w1-wed-pull": "tractions_lsit",
          },
        },
      },
    };

    const engine = createTrainingEngine(customState, { toggleTask: () => {} }, { todayISO: "2026-07-22" });
    const mission = engine.getMission("2026-07-22");

    const lsitTask = mission.tasks.find((t) => t.id === "w1-wed-pull");
    expect(lsitTask?.label).toContain("Tractions L-Sit");
    expect(lsitTask?.steps.some((s) => s.toLowerCase().includes("jambes tendues"))).toBe(true);
    expect(lsitTask?.steps.some((s) => s.includes("Tuck L-Sit"))).toBe(true);

    // Le nombre de reps sur Tractions L-Sit est calculé à 65% de userMaxPullLSit (8 * 0.65 = 5)
    expect(lsitTask?.label).toContain("5 reps");
  });

  test("getUserMaxes correctly derives metrics for all catalog exercises", () => {
    const fullPerfState: ForgeState = {
      ...state,
      perf: [
        { id: "p1", type: "pull", value: 18, date: "2026-07-15" },
        { id: "sq1", type: "squat", value: 40, date: "2026-07-15" },
        { id: "cm1", type: "commando", value: 60, date: "2026-07-15" },
        { id: "pd1", type: "push_diamond", value: 20, date: "2026-07-15" },
      ],
    };

    const maxes = getUserMaxes(fullPerfState);
    expect(maxes.userMaxPull).toBe(18);
    expect(maxes.userMaxSquat).toBe(40);
    expect(maxes.userMaxCommando).toBe(60);
    expect(maxes.userMaxPushDiamond).toBe(20);

    // Vérifier que le jour de natation génère le gainage dynamique basé sur 70% de userMaxCommando=60 (42s)
    const engine = createTrainingEngine(fullPerfState, { toggleTask: () => {} }, { todayISO: "2026-07-20" });
    const mission = engine.getMission("2026-07-20");
    const commandoTask = mission.tasks.find((t) => t.id.startsWith("leg-3-gainage"));
    if (commandoTask) {
      expect(commandoTask.detail).toContain("42s");
    }
  });

  test("supports inter-module smart swap, block context retention and isolation intensity compensation", () => {
    const customState: ForgeState = {
      ...state,
      perf: [
        { id: "tr1", type: "push_triceps", value: 14, date: "2026-07-15" },
        { id: "p1", type: "pull", value: 16, date: "2026-07-15" },
      ],
      days: {
        "2026-07-20": {
          checked: {},
          swaps: {
            "w1-mon-pull": "bras_triceps_sol", // Remplacer l'exercice principal par un exercice du module finisher
          },
        },
      },
    };

    const engine = createTrainingEngine(customState, { toggleTask: () => {} }, { todayISO: "2026-07-20" });
    const mission = engine.getMission("2026-07-20");

    const swappedTask = mission.tasks.find((t) => t.id === "w1-mon-pull");
    expect(swappedTask?.label).toContain("Extensions Triceps au Sol");
    // Conservation de la structure 4 séries droites du bloc principal
    expect(swappedTask?.label).toContain("4 ×");
    // Calcul basé sur userMaxTriceps (14) avec compensation isolation (+15% volume => 14 * 0.65 * 1.15 = 10 reps)
    expect(swappedTask?.label).toContain("10 reps");
    expect(swappedTask?.detail).toContain("compensation isolation");
    expect(swappedTask?.isSwapped).toBe(true);
  });
});
