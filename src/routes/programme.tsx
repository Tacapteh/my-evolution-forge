import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/forge/AppShell";
import { FocusSessionPanel, ProgramHeader } from "@/components/forge/program-components";
import { ExerciseSwapModal } from "@/components/forge/ExerciseSwapModal";
import { useForge, todayISO, toISO } from "@/lib/forge-store";
import { createTrainingEngine } from "@/engine/trainingEngine";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Sun,
  Sunrise,
  Sunset,
  Brain,
  Clock,
  Sparkles,
  Play,
  Waves,
  Dumbbell,
  Timer,
  Footprints,
  RotateCcw,
  Pencil,
  Check,
  CheckCircle2,
  Calendar,
  Award,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/programme")({
  component: ProgrammePage,
  head: () => ({ meta: [{ title: "Programme - FORGE" }] }),
});

const MOMENT_ICONS = {
  morning: Sunrise,
  afternoon: Sun,
  evening: Sunset,
  psychotechniques: Brain,
};

const MOMENT_LABELS = {
  morning: "Matin",
  afternoon: "Après-midi",
  evening: "Soir",
  psychotechniques: "Psychotechniques",
};

const TASK_ICONS = {
  swim: Waves,
  pull: Dumbbell,
  chair: Timer,
  run: Footprints,
  psycho: Brain,
  stretch: RotateCcw,
  hydration: Sparkles,
  custom: Check,
};

function ProgrammePage() {
  const { state, hydrated, toggleTask, startSession, addPerf, setMomentSwap, setTaskSwap, setTaskRealization } = useForge();
  const today = todayISO();
  const [viewMode, setViewMode] = useState<"today" | "week">("today");
  const [anchor, setAnchor] = useState(() => new Date());
  const [focusOpen, setFocusOpen] = useState(false);
  const [focusISO, setFocusISO] = useState(today);

  const [swapModalState, setSwapModalState] = useState<{
    open: boolean;
    dateISO: string;
    moment: string;
    task?: any;
  }>({ open: false, dateISO: "", moment: "" });

  const handleLogDistance = (task: any, dateISO: string) => {
    const targetDist = task.targetDistance ?? 5;
    const unit = task.unit ?? "km";
    const promptMsg =
      `Saisissez la distance réellement effectuée pour "${task.label}" :\n` +
      `Objectif cible : ${targetDist} ${unit}\n\n` +
      `Distance réalisée (${unit}) :`;

    const input = window.prompt(promptMsg, String(task.actualDistance ?? targetDist));
    if (input === null) return;

    const actual = parseFloat(input.replace(",", "."));
    if (isNaN(actual) || actual < 0) return;

    const penalty = actual < targetDist;
    const baseXP = task.xp ?? 35;
    const xpAwarded = penalty ? Math.max(5, Math.round(baseXP * (actual / targetDist))) : baseXP;

    setTaskRealization(dateISO, task.id, {
      actual,
      target: targetDist,
      unit,
      penalty,
      xpAwarded,
    });

    if (penalty) {
      const gap = +(targetDist - actual).toFixed(1);
      toast.error(`⚠️ Pénalité appliquée pour ${task.label}`, {
        description: `Distance effectuée (${actual} ${unit}) inférieure à la cible (${targetDist} ${unit}). Écart: -${gap} ${unit}. Gain réduit à ${xpAwarded} XP.`,
        duration: 5000,
      });
    } else {
      toast.success(`✅ Objectif distance validé !`, {
        description: `${actual} ${unit} réalisés sur ${targetDist} ${unit} cible. +${xpAwarded} XP enregistrés.`,
        duration: 4000,
      });
    }
  };

  const handleSwapTask = (date: string, task: any) => {
    setSwapModalState({ open: true, dateISO: date, moment: task.moment, task });
  };

  const handleSwapMoment = (date: string, moment: string) => {
    setSwapModalState({ open: true, dateISO: date, moment, task: null });
  };

  const handleSelectSwap = (swapId: string) => {
    if (!swapModalState.dateISO) return;
    if (swapModalState.task?.id) {
      setTaskSwap(swapModalState.dateISO, swapModalState.task.id, swapId);
    } else if (swapModalState.moment) {
      setMomentSwap(swapModalState.dateISO, swapModalState.moment, swapId);
    }
    toast.success("Exercice remplacé avec succès !", {
      description: `L'alternative préserve l'intention de la séance et s'adapte à vos Max.`,
    });
  };

  const handleResetSwap = () => {
    if (!swapModalState.dateISO) return;
    if (swapModalState.task?.id) {
      setTaskSwap(swapModalState.dateISO, swapModalState.task.id, "");
    } else if (swapModalState.moment) {
      setMomentSwap(swapModalState.dateISO, swapModalState.moment, "");
    }
    toast.info("Exercice d'origine restauré.", {
      description: `La programmation initiale a été rétablie pour cet exercice.`,
    });
  };

  const engine = useMemo(
    () => createTrainingEngine(state, { toggleTask }, { todayISO: today }),
    [state, toggleTask, today],
  );

  const week = useMemo(() => engine.getCurrentWeek(toISO(anchor)), [anchor, engine]);

  const weekMissions = useMemo(() => {
    return (week || []).map((day) => {
      const mission = engine.getMission(day.iso);
      const checked = state.days?.[day.iso]?.checked ?? {};
      return {
        day,
        mission,
        checked,
      };
    });
  }, [week, engine, state.days]);

  const todayMission = useMemo(() => engine.getMission(today), [engine, today]);
  const todayChecked = state.days?.[today]?.checked ?? {};

  const focusMission = useMemo(() => engine.getMission(focusISO), [engine, focusISO]);
  const focusChecked = state.days?.[focusISO]?.checked ?? {};

  // Progression globale de la semaine
  const weekProgress = useMemo(() => {
    let totalTasks = 0;
    let completedTasks = 0;
    weekMissions.forEach(({ mission }) => {
      totalTasks += mission.totalCount;
      completedTasks += mission.doneCount;
    });
    return totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  }, [weekMissions]);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Sparkles className="h-10 w-10 text-primary animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Chargement du planning...</span>
        </div>
      </div>
    );
  }

  const weekLabel = `${formatShortDate(week[0].iso)} - ${formatShortDate(week[6].iso)}`;

  const handleToggleForISO = (taskId: string, iso: string) => {
    const dayMission = engine.getMission(iso);
    const task = dayMission.tasks.find((item) => item.id === taskId);
    const dayChecked = state.days?.[iso]?.checked ?? {};
    const wasDone = !!dayChecked[taskId];

    toggleTask(iso, taskId);

    if (task && !wasDone) {
      toast.success(`+${task.xp} XP`, {
        description: task.label,
        duration: 2000,
      });

      if (task.label.includes("TEST MAX") || task.type === "pull" || task.type === "chair") {
        setTimeout(() => {
          if (task.type === "pull" || task.label.includes("TRACTIONS")) {
            const currentMax = engine.getUserMaxes?.()?.userMaxPull ?? 6;
            const input = window.prompt(
              `Validation Tractions (RIR 1-2) — Combien de tractions as-tu réalisées sur la dernière série ?\n(Max actuel : ${currentMax} reps)`,
              String(currentMax)
            );
            if (input) {
              const val = parseInt(input, 10);
              if (!isNaN(val) && val > currentMax) {
                addPerf({ type: "pull", value: val, date: iso });
                toast.success(`🎉 Nouveau Max Tractions enregistré : ${val} reps !`, {
                  description: "Les cibles et volumes des séances suivantes ont été recalculés automatiquement.",
                  duration: 4000,
                });
              }
            }
          } else if (task.type === "chair" || task.label.includes("CHAISE")) {
            const currentMax = engine.getUserMaxes?.()?.userMaxChair ?? 60;
            const input = window.prompt(
              `Validation Chaise Isométrique — Combien de secondes as-tu tenues sur la dernière série ?\n(Record actuel : ${currentMax}s)`,
              String(currentMax)
            );
            if (input) {
              const val = parseInt(input, 10);
              if (!isNaN(val) && val > currentMax) {
                addPerf({ type: "chair", value: val, date: iso });
                toast.success(`🎉 Nouveau Record Chaise enregistré : ${val}s !`, {
                  description: "Les cibles et volumes des séances suivantes ont été recalculés automatiquement.",
                  duration: 4000,
                });
              }
            }
          } else if (task.label.includes("LUC LÉGER")) {
            const input = window.prompt("Bravo pour ton Test Luc Léger ! Quel Palier as-tu atteint (ex: 8.5) ?", "8.0");
            if (input) {
              const val = parseFloat(input);
              if (!isNaN(val) && val > 0) {
                addPerf({ type: "luc", value: val, date: iso });
                toast.success(`Nouveau Palier Luc Léger enregistré : Palier ${val} !`, {
                  description: "Tes allures de fractionné VMA pour les 2 prochaines semaines ont été recalculées.",
                  duration: 4000,
                });
              }
            }
          }
        }, 100);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      <PageHeader title="Programme" subtitle="Planification d'entraînement militaire adaptatif." />

      <div className="px-4 md:px-8 space-y-6 max-w-7xl mx-auto">
        {/* En-tête avec sélecteur de Vue (Aujourd'hui vs Semaine complète) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 bg-card border border-border/80 rounded-xl shadow-sm">
            <button
              onClick={() => setViewMode("today")}
              className={cn(
                "px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2",
                viewMode === "today"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Sun className="h-4 w-4" /> Aujourd'hui
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={cn(
                "px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2",
                viewMode === "week"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Calendar className="h-4 w-4" /> Semaine complète
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="outline" className="border-primary/40 text-primary px-2.5 py-1">
              <Dumbbell className="mr-1.5 h-3.5 w-3.5" /> Tractions : {Math.max(6, ...(state.perf?.filter(p => p.type === "pull").map(p => p.value) ?? []))} reps
            </Badge>
            <Badge variant="outline" className="border-primary/40 text-primary px-2.5 py-1">
              <Timer className="mr-1.5 h-3.5 w-3.5" /> Chaise : {Math.max(60, ...(state.perf?.filter(p => p.type === "chair").map(p => p.value) ?? []))}s
            </Badge>
            <Badge variant="outline" className="border-primary/40 text-primary px-2.5 py-1">
              <Footprints className="mr-1.5 h-3.5 w-3.5" /> Luc Léger : Palier {Math.max(7.0, ...(state.perf?.filter(p => p.type === "luc").map(p => p.value) ?? []))}
            </Badge>
          </div>
        </div>

        {/* --- VUE AUJOURD'HUI --- */}
        {viewMode === "today" && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 md:p-8 border-primary/40 bg-card/60 backdrop-blur-md shadow-glow relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/60">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">Mission Du Jour — {todayMission.dayName}</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">{todayMission.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{todayMission.objective}</p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground block font-medium">Complétion</span>
                    <span className="text-2xl font-black text-primary">{todayMission.completionPct}%</span>
                  </div>
                  <Button
                    size="lg"
                    className="gap-2 shadow-lg hover:shadow-primary/20"
                    onClick={() => {
                      startSession(today);
                      setFocusISO(today);
                      setFocusOpen(true);
                    }}
                  >
                    <Play className="h-4 w-4" /> Lancer la Séance
                  </Button>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                  <span>Progression : {todayMission.doneCount} / {todayMission.totalCount} tâches faites</span>
                  <span>{todayMission.xp} XP accumulés</span>
                </div>
                <Progress value={todayMission.completionPct} className="h-2.5 bg-muted" />
              </div>

              {/* Blocs du jour (Matin, Après-midi, Soir, Psychotechniques) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {(["morning", "afternoon", "evening", "psychotechniques"] as const).map((momentKey) => {
                  const Icon = MOMENT_ICONS[momentKey];
                  const label = MOMENT_LABELS[momentKey];
                  const tasks = todayMission.tasks.filter((t) => t.moment === momentKey);

                  if (tasks.length === 0) {
                    return (
                      <div key={momentKey} className="rounded-xl border border-border/40 bg-muted/10 p-4 space-y-2 opacity-80 hover:opacity-100 transition-opacity">
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border/40">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-muted-foreground/50" />
                            <span>{label}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-[10px] px-2 text-primary hover:text-primary gap-1"
                            onClick={() => handleSwapMoment(today, momentKey)}
                            title="Ajouter une activité"
                          >
                            <Pencil className="h-3 w-3" /> + Ajouter
                          </Button>
                        </div>
                        <p className="text-[11px] text-muted-foreground/70 italic">Aucune activité programmée.</p>
                      </div>
                    );
                  }

                  return (
                    <div key={momentKey} className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border/40">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-primary" />
                          <span>{label}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-[10px] px-2 text-muted-foreground hover:text-primary gap-1"
                          onClick={() => handleSwapMoment(today, momentKey)}
                          title="Modifier l'activité de ce moment"
                        >
                          <Pencil className="h-3 w-3" /> Modifier
                        </Button>
                      </div>
                      <ul className="space-y-2">
                        {tasks.map((task) => {
                          const isDone = !!todayChecked[task.id];
                          const hasDistTarget = task.targetDistance != null;

                          return (
                            <li
                              key={task.id}
                              className={cn(
                                "flex flex-col gap-2 p-3 rounded-lg border transition-all",
                                task.isPenalized
                                  ? "bg-red-500/10 border-red-500/30 text-foreground"
                                  : isDone
                                  ? "bg-primary/10 border-primary/30 text-muted-foreground"
                                  : "bg-card border-border/60 hover:border-primary/40"
                              )}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3 flex-1 min-w-0">
                                  <Checkbox
                                    id={`today-${task.id}`}
                                    checked={isDone}
                                    onCheckedChange={() => handleToggleForISO(task.id, today)}
                                    className="mt-0.5"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <label
                                      htmlFor={`today-${task.id}`}
                                      className={cn(
                                        "text-sm font-semibold block cursor-pointer select-none",
                                        isDone ? "line-through text-muted-foreground/70" : "text-foreground"
                                      )}
                                    >
                                      {task.label}
                                    </label>
                                    {task.detail && (
                                      <span className="text-xs text-muted-foreground mt-0.5 block">
                                        {task.detail}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  {hasDistTarget && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className={cn(
                                        "h-6 text-[10px] px-2 gap-1 border-primary/30",
                                        task.isPenalized
                                          ? "border-red-500/50 bg-red-500/20 text-red-300 hover:bg-red-500/30"
                                          : task.actualDistance != null
                                          ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                                          : "text-primary hover:bg-primary/10"
                                      )}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleLogDistance(task, today);
                                      }}
                                      title="Saisir la distance réellement effectuée"
                                    >
                                      <Footprints className="h-3 w-3" />
                                      {task.actualDistance != null
                                        ? `${task.actualDistance}/${task.targetDistance} ${task.unit}`
                                        : `Cible: ${task.targetDistance} ${task.unit}`}
                                    </Button>
                                  )}

                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-muted-foreground/60 hover:text-primary hover:bg-primary/10"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSwapTask(today, task);
                                    }}
                                    title="Modifier cet exercice indépendamment"
                                  >
                                    <Pencil className="h-3 w-3" />
                                  </Button>

                                  <span
                                    className={cn(
                                      "text-xs font-bold shrink-0",
                                      task.isPenalized ? "text-red-400" : "text-primary"
                                    )}
                                  >
                                    +{task.xp} XP
                                  </span>
                                </div>
                              </div>

                              {/* Affichage Pénalité ou Validation Distance */}
                              {task.isPenalized && (
                                <div className="text-[11px] font-bold text-red-400 bg-red-500/15 border border-red-500/30 px-2.5 py-1 rounded-md flex items-center justify-between">
                                  <span>⚠️ PÉNALITÉ : {task.actualDistance}/{task.targetDistance} {task.unit} ({task.penaltyText || "Malus d'XP appliqué"})</span>
                                </div>
                              )}
                              {!task.isPenalized && task.actualDistance != null && (
                                <div className="text-[11px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                  <span>Objectif atteint : {task.actualDistance} {task.unit} / {task.targetDistance} {task.unit}</span>
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {/* --- VUE SEMAINE COMPLÈTE --- */}
        {viewMode === "week" && (
          <div className="space-y-6 animate-fade-in">
            {/* Barre de progression de la semaine */}
            <div className="rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-md shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Progression Hebdomadaire</span>
                <h3 className="text-xl font-bold mt-1">Complétion de la semaine</h3>
              </div>
              <div className="flex-1 max-w-md w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Objectif global</span>
                  <span className="font-semibold text-primary">{weekProgress}%</span>
                </div>
                <Progress value={weekProgress} className="h-2 bg-muted" />
              </div>
            </div>

            {/* Contrôles de navigation dans la semaine */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <ProgramHeader
                weekLabel={weekLabel}
                onPrevious={() => setAnchor(shiftWeek(anchor, -1))}
                onNext={() => setAnchor(shiftWeek(anchor, 1))}
                onToday={() => setAnchor(new Date())}
              />
            </div>

            {/* Grille des jours de la semaine */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {weekMissions.map(({ day, mission, checked }) => {
                const isToday = day.iso === today;
                const completed = mission.status === "termine";

                const morningTasks = mission.tasks.filter((t) => t.moment === "morning");
                const afternoonTasks = mission.tasks.filter((t) => t.moment === "afternoon");
                const eveningTasks = mission.tasks.filter((t) => t.moment === "evening");
                const psychoTasks = mission.tasks.filter((t) => t.moment === "psychotechniques");

                const moments = [
                  { key: "morning" as const, tasks: morningTasks },
                  { key: "afternoon" as const, tasks: afternoonTasks },
                  { key: "evening" as const, tasks: eveningTasks },
                  { key: "psychotechniques" as const, tasks: psychoTasks },
                ];

                return (
                  <Card
                    key={day.iso}
                    className={cn(
                      "relative flex flex-col justify-between overflow-hidden border transition-all duration-300 shadow-sm hover:shadow-md",
                      isToday
                        ? "border-primary bg-primary/5 shadow-glow"
                        : "border-border bg-card/60 hover:border-primary/30"
                    )}
                  >
                    {/* Header du jour */}
                    <div className="p-5 border-b border-border/60">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xl font-bold tracking-tight">
                              {day.dayName}
                            </h4>
                            <span className="text-xs text-muted-foreground tabular-nums">
                              {formatShortDate(day.iso)}
                            </span>
                            {isToday && (
                              <Badge variant="default" className="text-[10px] uppercase font-bold py-0.5 px-2">
                                Aujourd'hui
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground font-medium mt-1">
                            {mission.objective}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-1.5">
                        <div className="flex justify-between text-[11px] text-muted-foreground font-medium">
                          <span>{mission.doneCount}/{mission.totalCount} faits</span>
                          <span>{mission.completionPct}%</span>
                        </div>
                        <Progress value={mission.completionPct} className="h-1.5 bg-muted" />
                      </div>
                    </div>

                    {/* Liste des exercices par moment */}
                    <div className="p-5 space-y-4 flex-1">
                      {moments.map(({ key, tasks }) => {
                        const Icon = MOMENT_ICONS[key];
                        const label = MOMENT_LABELS[key];

                        if (tasks.length === 0) {
                          return (
                            <div key={key} className="flex items-center justify-between text-[10px] text-muted-foreground/60 py-1 border-b border-border/20 last:border-0">
                              <div className="flex items-center gap-1.5 font-semibold uppercase">
                                <Icon className="h-3 w-3 text-muted-foreground/40" />
                                <span>{label}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-5 text-[9px] px-1 text-primary hover:text-primary gap-0.5"
                                onClick={() => handleSwapMoment(day.iso, key)}
                              >
                                <Pencil className="h-2.5 w-2.5" /> + Ajouter
                              </Button>
                            </div>
                          );
                        }

                        return (
                          <div key={key} className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              <div className="flex items-center gap-1.5">
                                <Icon className="h-3 w-3 text-primary" />
                                <span>{label}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-5 text-[9px] px-1.5 text-muted-foreground hover:text-primary gap-1"
                                onClick={() => handleSwapMoment(day.iso, key)}
                                title="Modifier l'activité de ce moment"
                              >
                                <Pencil className="h-2.5 w-2.5" /> Modifier
                              </Button>
                            </div>

                            <ul className="space-y-1.5">
                              {tasks.map((task) => {
                                const isDone = !!checked[task.id];
                                const hasDistTarget = task.targetDistance != null;

                                return (
                                  <li
                                    key={task.id}
                                    className={cn(
                                      "group flex flex-col gap-1.5 rounded-lg px-2.5 py-1.5 border transition-all duration-200",
                                      task.isPenalized
                                        ? "bg-red-500/10 border-red-500/30 text-foreground"
                                        : isDone
                                        ? "bg-primary/5 border-transparent text-muted-foreground"
                                        : "border-transparent hover:bg-muted/40 hover:border-border/60"
                                    )}
                                  >
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                                        <Checkbox
                                          id={`week-${day.iso}-${task.id}`}
                                          checked={isDone}
                                          onCheckedChange={() => handleToggleForISO(task.id, day.iso)}
                                          className="mt-0.5"
                                        />
                                        <div className="min-w-0 flex-1">
                                          <label
                                            htmlFor={`week-${day.iso}-${task.id}`}
                                            className={cn(
                                              "text-xs leading-relaxed font-medium block cursor-pointer select-none",
                                              isDone ? "line-through text-muted-foreground/70" : "text-foreground"
                                            )}
                                          >
                                            {task.label}
                                          </label>
                                          {task.detail && (
                                            <span className="text-[10px] text-muted-foreground block line-clamp-1">
                                              {task.detail}
                                            </span>
                                          )}
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-1.5 shrink-0">
                                        {hasDistTarget && (
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className={cn(
                                              "h-5 text-[9px] px-1.5 gap-0.5 border-primary/30",
                                              task.isPenalized
                                                ? "border-red-500/50 bg-red-500/20 text-red-300 hover:bg-red-500/30"
                                                : task.actualDistance != null
                                                ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300 hover:emerald-500/30"
                                                : "text-primary hover:bg-primary/10"
                                            )}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleLogDistance(task, day.iso);
                                            }}
                                            title="Saisir la distance réalisée"
                                          >
                                            <Footprints className="h-2.5 w-2.5" />
                                            {task.actualDistance != null
                                              ? `${task.actualDistance}/${task.targetDistance}${task.unit}`
                                              : `${task.targetDistance}${task.unit}`}
                                          </Button>
                                        )}

                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-5 w-5 text-muted-foreground/60 hover:text-primary hover:bg-primary/10"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleSwapTask(day.iso, task);
                                          }}
                                          title="Modifier cet exercice indépendamment"
                                        >
                                          <Pencil className="h-2.5 w-2.5" />
                                        </Button>

                                        <span className={cn(
                                          "text-[10px] font-bold tabular-nums shrink-0 self-center",
                                          task.isPenalized ? "text-red-400" : isDone ? "text-primary/70" : "text-primary"
                                        )}>
                                          +{task.xp} XP
                                        </span>
                                      </div>
                                    </div>

                                    {task.isPenalized && (
                                      <div className="text-[9px] font-bold text-red-400 bg-red-500/15 border border-red-500/30 px-2 py-0.5 rounded flex items-center justify-between">
                                        <span>⚠️ Pénalité: {task.actualDistance}/{task.targetDistance} {task.unit} ({task.penaltyText || "Malus XP"})</span>
                                      </div>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}

                      {mission.totalCount === 0 && (
                        <div className="h-full flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                          <CheckCircle2 className="h-8 w-8 text-emerald-500/60 mb-2" />
                          <span className="text-xs font-semibold">Aucun entraînement prévu</span>
                          <span className="text-[10px] mt-0.5">Profitez de votre repos</span>
                        </div>
                      )}
                    </div>

                    {/* Footer du jour avec bouton focus */}
                    {mission.totalCount > 0 && (
                      <div className="px-5 py-4 border-t border-border/40 bg-muted/20 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-semibold">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> ~{mission.estimatedMinutes}m
                          </span>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-3 text-xs gap-1.5 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                          onClick={() => {
                            startSession(day.iso);
                            setFocusISO(day.iso);
                            setFocusOpen(true);
                          }}
                          disabled={completed}
                        >
                          <Play className="h-3 w-3" />
                          Focus
                        </Button>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <FocusSessionPanel
        open={focusOpen}
        mission={focusMission}
        checked={focusChecked}
        onToggle={(taskId) => handleToggleForISO(taskId, focusISO)}
        onClose={() => setFocusOpen(false)}
      />

      <ExerciseSwapModal
        open={swapModalState.open}
        onClose={() => setSwapModalState((prev) => ({ ...prev, open: false }))}
        dateISO={swapModalState.dateISO}
        moment={swapModalState.moment}
        momentLabel={MOMENT_LABELS[swapModalState.moment as keyof typeof MOMENT_LABELS] ?? swapModalState.moment}
        currentTask={swapModalState.task}
        userMaxPull={Math.max(6, ...(state.perf?.filter((p) => p.type === "pull").map((p) => p.value) ?? []))}
        userMaxChair={Math.max(60, ...(state.perf?.filter((p) => p.type === "chair").map((p) => p.value) ?? []))}
        userMaxPush={Math.max(15, ...(state.perf?.filter((p: any) => p.type === "push").map((p: any) => p.value) ?? []))}
        onSelectAlternative={handleSelectSwap}
        onReset={handleResetSwap}
      />
    </div>
  );
}

function shiftWeek(date: Date, amount: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount * 7);
  return next;
}

function formatShortDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
}
