import { useEffect, useMemo, useState } from "react";
import {
  Brain,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Dumbbell,
  Flag,
  Footprints,
  ListChecks,
  Play,
  RotateCcw,
  Sparkles,
  Timer,
  Trophy,
  Waves,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { TrainingDaySummary, TrainingMission, TrainingTask } from "@/types/training";

type ToggleTask = (id: string) => void;

const MOMENTS = [
  ["morning", "Matin"],
  ["afternoon", "Apres-midi"],
  ["evening", "Soir"],
  ["psychotechniques", "Psychotechniques"],
] as const;

export function ProgramHeader({
  weekLabel,
  onPrevious,
  onNext,
  onToday,
}: {
  weekLabel: string;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Semaine courante
        </div>
        <div className="mt-1 text-lg font-semibold">{weekLabel}</div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onToday}>
          Aujourd'hui
        </Button>
        <Button variant="outline" size="icon" onClick={onPrevious} aria-label="Semaine precedente">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onNext} aria-label="Semaine suivante">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function WeeklyProgramView({
  days,
  selectedISO,
  onSelect,
}: {
  days: TrainingDaySummary[];
  selectedISO: string;
  onSelect: (iso: string) => void;
}) {
  return (
    <Tabs defaultValue="calendar" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2 sm:w-[260px]">
        <TabsTrigger value="calendar">
          <CalendarDays className="mr-2 h-4 w-4" />
          Calendrier
        </TabsTrigger>
        <TabsTrigger value="list">
          <ListChecks className="mr-2 h-4 w-4" />
          Liste
        </TabsTrigger>
      </TabsList>

      <TabsContent value="calendar" className="mt-0">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {days.map((day) => (
            <DaySummaryCard
              key={day.iso}
              day={day}
              selected={day.iso === selectedISO}
              onSelect={onSelect}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="list" className="mt-0">
        <div className="space-y-2">
          {days.map((day) => (
            <button
              key={day.iso}
              onClick={() => onSelect(day.iso)}
              className={cn(
                "w-full rounded-lg border bg-card px-4 py-3 text-left transition-colors",
                day.iso === selectedISO
                  ? "border-primary/50 bg-primary/10"
                  : "border-border hover:border-primary/25",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {day.label} {day.dayNumber}
                    </span>
                    {day.isToday && <Badge className="h-5 px-2 text-[10px]">Aujourd'hui</Badge>}
                  </div>
                  <div className="mt-1 truncate text-xs text-muted-foreground">{day.objective}</div>
                </div>
                <div className="text-right text-xs tabular-nums text-muted-foreground">
                  <div>
                    {day.doneCount}/{day.taskCount}
                  </div>
                  <div className="text-primary">{day.completionPct}%</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}

export function DaySummaryCard({
  day,
  selected,
  onSelect,
}: {
  day: TrainingDaySummary;
  selected: boolean;
  onSelect: (iso: string) => void;
}) {
  return (
    <button
      onClick={() => onSelect(day.iso)}
      className={cn(
        "min-h-[132px] rounded-lg border p-3 text-left transition-all",
        selected
          ? "border-primary/60 bg-primary/10 shadow-glow"
          : "border-border bg-card hover:border-primary/25",
        day.isToday && !selected && "border-primary/35",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {day.label}
          </div>
          <div className="text-2xl font-semibold tabular-nums">{day.dayNumber}</div>
        </div>
        {day.isToday && <span className="h-2 w-2 rounded-full bg-primary" />}
      </div>
      <div className="mt-3 line-clamp-2 text-xs text-muted-foreground">{day.objective}</div>
      <div className="mt-3 flex flex-wrap gap-1">
        {day.sessions.slice(0, 2).map((session) => (
          <span
            key={session}
            className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground"
          >
            {session}
          </span>
        ))}
      </div>
      <Progress value={day.completionPct} className="mt-3 h-1.5" />
    </button>
  );
}

export function DayMissionCard({
  mission,
  checked,
  onToggle,
  onStart,
}: {
  mission: TrainingMission;
  checked: Record<string, boolean>;
  onToggle: ToggleTask;
  onStart: () => void;
}) {
  const groups = useMemo(() => groupTasksByMoment(mission.tasks), [mission.tasks]);
  const allDone = mission.status === "termine";

  return (
    <Card className="card-forge overflow-hidden p-5 md:p-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-primary/30 text-primary">
              Mission du jour
            </Badge>
            <span className="text-xs text-muted-foreground">{mission.dayName}</span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{mission.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{mission.objective}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />~{mission.estimatedMinutes} min
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Flag className="h-3.5 w-3.5" />
              Priorite {mission.priority}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />+{mission.xp} XP
            </span>
          </div>
        </div>
        <DailyProgressBar mission={mission} compact />
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {MOMENTS.map(([key, label]) => (
          <SessionBlock
            key={key}
            title={label}
            tasks={groups[key]}
            checked={checked}
            onToggle={onToggle}
          />
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted-foreground">{mission.summary}</div>
        <Button size="lg" onClick={onStart} disabled={allDone} className="sm:w-auto">
          <Play className="mr-2 h-4 w-4" />
          {allDone
            ? "Journee terminee"
            : mission.doneCount
              ? "Reprendre la seance"
              : "Commencer la seance"}
        </Button>
      </div>
    </Card>
  );
}

export function SessionBlock({
  title,
  tasks,
  checked,
  onToggle,
}: {
  title: string;
  tasks: TrainingTask[];
  checked: Record<string, boolean>;
  onToggle: ToggleTask;
}) {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{title}</div>
        <span className="text-[11px] text-muted-foreground">
          {tasks.reduce((sum, task) => sum + task.estimatedMinutes, 0)} min
        </span>
      </div>
      <SessionChecklist tasks={tasks} checked={checked} onToggle={onToggle} dense />
    </div>
  );
}

export function SessionChecklist({
  tasks,
  checked,
  onToggle,
  dense = false,
}: {
  tasks: TrainingTask[];
  checked: Record<string, boolean>;
  onToggle: ToggleTask;
  dense?: boolean;
}) {
  if (tasks.length === 0) return <div className="text-sm text-muted-foreground/60">Libre</div>;

  return (
    <ul className={cn("space-y-2", dense && "space-y-1.5")}>
      {tasks.map((task) => {
        const done = !!checked[task.id];
        const Icon = iconForTask(task.type);
        return (
          <li
            key={task.id}
            className={cn(
              "flex items-start gap-2 rounded-lg border px-3 py-2 transition-all",
              done
                ? "border-primary/25 bg-primary/10"
                : "border-transparent hover:border-border hover:bg-muted/50",
            )}
          >
            <Checkbox checked={done} onCheckedChange={() => onToggle(task.id)} className="mt-0.5" />
            <Icon
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                done ? "text-primary" : "text-muted-foreground",
              )}
            />
            <div className="min-w-0 flex-1">
              <div
                className={cn("text-sm leading-snug", done && "text-muted-foreground line-through")}
              >
                {task.label}
              </div>
              <div className="mt-0.5 flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
                {task.detail && <span>{task.detail}</span>}
                {task.rest && <span>Repos {task.rest}</span>}
              </div>
            </div>
            <span className="shrink-0 text-[11px] text-primary">+{task.xp}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function FocusSessionPanel({
  open,
  mission,
  checked,
  onToggle,
  onClose,
}: {
  open: boolean;
  mission: TrainingMission;
  checked: Record<string, boolean>;
  onToggle: ToggleTask;
  onClose: () => void;
}) {
  const firstUndone = Math.max(
    0,
    mission.tasks.findIndex((task) => !checked[task.id]),
  );
  const [index, setIndex] = useState(firstUndone === -1 ? 0 : firstUndone);

  useEffect(() => {
    if (open) setIndex(firstUndone);
  }, [firstUndone, mission.iso, open]);

  if (!open) return null;

  const task = mission.tasks[index];
  const done = checked[task.id];
  const last = index === mission.tasks.length - 1;
  const complete = mission.status === "termine";

  return (
    <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 md:px-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Mode focus
          </div>
          <div className="text-xs tabular-nums text-muted-foreground">
            {index + 1}/{mission.totalCount}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Fermer">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid flex-1 place-items-center px-4 py-8">
          <div className="w-full max-w-2xl text-center">
            {complete ? (
              <div className="mx-auto max-w-md">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/15 text-primary">
                  <Trophy className="h-9 w-9" />
                </div>
                <h2 className="mt-6 text-3xl font-semibold">Seance terminee</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  XP ajoute, resume du jour mis a jour.
                </p>
                <Button className="mt-8" onClick={onClose}>
                  Retour mission
                </Button>
              </div>
            ) : (
              <>
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Etape {index + 1}
                </div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                  {task.label}
                </h2>
                {task.detail && <p className="mt-4 text-muted-foreground">{task.detail}</p>}

                <div className="mx-auto mt-6 grid max-w-md gap-2">
                  {task.steps.map((step) => (
                    <div
                      key={step}
                      className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-muted-foreground"
                    >
                      {step}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full border border-border px-3 py-1">
                    {task.estimatedMinutes} min
                  </span>
                  {task.rest && (
                    <span className="rounded-full border border-border px-3 py-1">
                      Repos {task.rest}
                    </span>
                  )}
                  <span className="rounded-full border border-primary/30 px-3 py-1 text-primary">
                    +{task.xp} XP
                  </span>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIndex((value) => Math.max(0, value - 1))}
                    disabled={index === 0}
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Precedent
                  </Button>
                  <Button
                    onClick={() => {
                      onToggle(task.id);
                      if (!done && !last) setIndex((value) => value + 1);
                    }}
                    className="min-w-[180px]"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    {done ? "Decocher" : "Valider"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setIndex((value) => Math.min(mission.tasks.length - 1, value + 1))
                    }
                    disabled={last}
                  >
                    Suivant
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="border-t border-border px-4 py-4 md:px-8">
          <DailyProgressBar mission={mission} />
        </div>
      </div>
    </div>
  );
}

export function DailyProgressBar({
  mission,
  compact = false,
}: {
  mission: TrainingMission;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-background/40 p-4",
        compact && "self-start",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Progression du jour
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {mission.doneCount}/{mission.totalCount} faites - {mission.remainingCount} restantes
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-semibold text-primary tabular-nums">
            {mission.completionPct}%
          </div>
          <div className="text-[11px] text-muted-foreground">
            {mission.status === "termine" ? "Termine" : "En cours"}
          </div>
        </div>
      </div>
      <Progress value={mission.completionPct} className="mt-3 h-1.5" />
    </div>
  );
}

export function PsychotechniqueCard({
  mission,
  onStart,
}: {
  mission: TrainingMission;
  onStart: () => void;
}) {
  const psycho = mission.psychotechnique;
  if (!psycho) return null;

  return (
    <Card className="card-forge p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Psychotechniques
          </div>
          <h3 className="mt-1 text-lg font-semibold">{psycho.label}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {psycho.durationTarget} min cible - {psycho.detail}
          </p>
        </div>
        <Badge variant={psycho.done ? "default" : "outline"}>
          {psycho.done ? "Fait" : "A faire"}
        </Badge>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">
          Score: <span className="text-foreground">{psycho.score ?? "-"}</span>
        </div>
        <Button variant="outline" onClick={onStart}>
          <Brain className="mr-2 h-4 w-4" />
          Focus
        </Button>
      </div>
    </Card>
  );
}

export function SessionHistoryItem({ item }: { item: SessionHistoryItemView }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs text-muted-foreground">
            {item.dayName} - {item.iso.slice(5)}
          </div>
          <div className="mt-1 text-sm font-medium">{item.highlight}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-primary tabular-nums">
            {item.completionPct}%
          </div>
          <Badge variant={item.completed ? "default" : "outline"} className="mt-1">
            {item.completed ? "Termine" : "En cours"}
          </Badge>
        </div>
      </div>
      <Progress value={item.completionPct} className="mt-3 h-1.5" />
      {item.note && (
        <div className="mt-2 line-clamp-2 text-xs text-muted-foreground">{item.note}</div>
      )}
    </div>
  );
}
function groupTasksByMoment(tasks: TrainingTask[]) {
  return {
    morning: tasks.filter((task) => task.moment === "morning"),
    afternoon: tasks.filter((task) => task.moment === "afternoon"),
    evening: tasks.filter((task) => task.moment === "evening"),
    psychotechniques: tasks.filter((task) => task.moment === "psychotechniques"),
  };
}

interface SessionHistoryItemView {
  iso: string;
  dayName: string;
  completionPct: number;
  completed: boolean;
  highlight: string;
  note?: string;
}
function iconForTask(type: TrainingTask["type"]) {
  if (type === "swim") return Waves;
  if (type === "pull") return Dumbbell;
  if (type === "chair") return Timer;
  if (type === "run") return Footprints;
  if (type === "psycho") return Brain;
  if (type === "hydration") return Sparkles;
  if (type === "stretch") return RotateCcw;
  return Check;
}
