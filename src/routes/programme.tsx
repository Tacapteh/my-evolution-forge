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
  Moon,
  Brain,
  Clock,
  Flag,
  Sparkles,
  Play,
  Waves,
  Dumbbell,
  Timer,
  Footprints,
  RotateCcw,
  Check,
  CheckCircle2,
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
  const { state, hydrated, toggleTask, startSession } = useForge();
  const today = todayISO();
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

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      <PageHeader title="Programme" subtitle="Planification hebdomadaire et suivi quotidien." />

      <div className="px-4 md:px-8 space-y-6 max-w-7xl mx-auto">
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

        {/* Contrôles de la semaine */}
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

            // Grouper les tâches par moment
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
                        <span className="text-sm text-muted-foreground font-medium">
                          {day.dayNumber} {new Date(`${day.iso}T12:00:00`).toLocaleDateString("fr-FR", { month: "short" })}
                        </span>
                        {isToday && (
                          <Badge variant="default" className="text-[10px] py-0 px-2 h-5 font-bold uppercase tracking-wider bg-primary text-primary-foreground animate-pulse">
                            Aujourd'hui
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {mission.objective}
                      </p>
                    </div>

                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] uppercase font-bold tracking-wider",
                        mission.priority === "Haute" && "border-red-500/30 text-red-500 bg-red-500/5",
                        mission.priority === "Normale" && "border-blue-500/30 text-blue-500 bg-blue-500/5",
                        mission.priority === "Recuperation" && "border-emerald-500/30 text-emerald-500 bg-emerald-500/5"
                      )}
                    >
                      {mission.priority === "Recuperation" ? "Récup" : mission.priority}
                    </Badge>
                  </div>

                  {/* Barre de progression du jour */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {mission.doneCount}/{mission.totalCount} Terminé{mission.doneCount > 1 ? "s" : ""}
                      </span>
                      <span className={cn("font-semibold", completed ? "text-emerald-500" : "text-primary")}>
                        {mission.completionPct}%
                      </span>
                    </div>
                    <Progress value={mission.completionPct} className="h-1 bg-muted" />
                  </div>
                </div>

                {/* Blocs de moments de la journée */}
                <div className="p-5 flex-1 space-y-4">
                  {moments.map(({ key, tasks }) => {
                    if (tasks.length === 0) return null;
                    const MomentIcon = MOMENT_ICONS[key];

                    return (
                      <div key={key} className="space-y-2">
                        {/* En-tête du moment */}
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground/80">
                          <MomentIcon className={cn(
                            "h-3.5 w-3.5",
                            key === "morning" && "text-amber-500",
                            key === "afternoon" && "text-orange-500",
                            key === "evening" && "text-blue-400",
                            key === "psychotechniques" && "text-purple-400"
                          )} />
                          <span>{MOMENT_LABELS[key]}</span>
                        </div>

                        {/* Liste des tâches du moment */}
                        <ul className="space-y-1.5 pl-5">
                          {tasks.map((task) => {
                            const isDone = !!checked[task.id];
                            const TaskIcon = TASK_ICONS[task.type] ?? Check;

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
                                  id={task.id}
                                  checked={isDone}
                                  onCheckedChange={() => handleToggleForISO(task.id, day.iso)}
                                  className="mt-0.5"
                                />
                                <div className="min-w-0 flex-1">
                                  <label
                                    htmlFor={task.id}
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
                      <span className="flex items-center gap-1">
                        <Sparkles className="h-3 w-3" /> +{mission.tasks.reduce((acc, t) => acc + (checked[t.id] ? t.xp : 0), 0)}/{mission.tasks.reduce((acc, t) => acc + t.xp, 0)} XP
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
