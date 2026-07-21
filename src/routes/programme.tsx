import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/forge/AppShell";
import { FocusSessionPanel, ProgramHeader } from "@/components/forge/program-components";
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
  Check,
  CheckCircle2,
  Calendar,
  Award,
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
  const { state, hydrated, toggleTask, startSession, addPerf } = useForge();
  const today = todayISO();
  const [viewMode, setViewMode] = useState<"today" | "week">("today");
  const [anchor, setAnchor] = useState(() => new Date());
  const [focusOpen, setFocusOpen] = useState(false);
  const [focusISO, setFocusISO] = useState(today);

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

      if (task.label.includes("TEST MAX")) {
        setTimeout(() => {
          const input = window.prompt("Bravo pour ton Test Max ! Combien de tractions as-tu réalisées ?", "8");
          if (input) {
            const val = parseInt(input, 10);
            if (!isNaN(val) && val > 0) {
              addPerf({ type: "pull", value: val, date: iso });
              toast.success(`Nouveau Max enregistré : ${val} tractions !`, {
                description: "Tes séances pour les 2 prochaines semaines ont été adaptées.",
                duration: 4000,
              });
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

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <Badge variant="outline" className="border-primary/40 text-primary px-3 py-1">
              <Award className="mr-1.5 h-3.5 w-3.5" /> Max Tractions : {Math.max(6, ...(state.perf?.filter(p => p.type === "pull").map(p => p.value) ?? []))} reps
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

                  if (tasks.length === 0) return null;

                  return (
                    <div key={momentKey} className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border/40">
                        <Icon className="h-4 w-4 text-primary" />
                        <span>{label}</span>
                      </div>
                      <ul className="space-y-2">
                        {tasks.map((task) => {
                          const isDone = !!todayChecked[task.id];
                          return (
                            <li
                              key={task.id}
                              className={cn(
                                "flex items-start gap-3 p-3 rounded-lg border transition-all",
                                isDone
                                  ? "bg-primary/10 border-primary/30 text-muted-foreground"
                                  : "bg-card border-border/60 hover:border-primary/40"
                              )}
                            >
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
                              <span className="text-xs font-bold text-primary shrink-0">+{task.xp} XP</span>
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
                        if (tasks.length === 0) return null;
                        const Icon = MOMENT_ICONS[key];
                        const label = MOMENT_LABELS[key];

                        return (
                          <div key={key} className="space-y-2">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              <Icon className="h-3 w-3 text-primary" />
                              <span>{label}</span>
                            </div>

                            <ul className="space-y-1.5">
                              {tasks.map((task) => {
                                const isDone = !!checked[task.id];
                                return (
                                  <li
                                    key={task.id}
                                    className={cn(
                                      "group flex items-start gap-2.5 rounded-lg px-2.5 py-1.5 border border-transparent transition-all duration-200",
                                      isDone
                                        ? "bg-primary/5 text-muted-foreground"
                                        : "hover:bg-muted/40 hover:border-border/60"
                                    )}
                                  >
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
                                    <span className={cn(
                                      "text-[10px] font-bold tabular-nums shrink-0 self-center",
                                      isDone ? "text-primary/70" : "text-primary"
                                    )}>
                                      +{task.xp} XP
                                    </span>
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
