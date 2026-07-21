import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/forge/AppShell";
import {
  DailyProgressBar,
  DayMissionCard,
  FocusSessionPanel,
  ProgramHeader,
  PsychotechniqueCard,
  SessionHistoryItem,
  WeeklyProgramView,
} from "@/components/forge/program-components";
import { useForge, todayISO, toISO } from "@/lib/forge-store";
import { createTrainingEngine } from "@/engine/trainingEngine";
import { toast } from "sonner";

export const Route = createFileRoute("/programme")({
  component: ProgrammePage,
  head: () => ({ meta: [{ title: "Programme - FORGE" }] }),
});

function ProgrammePage() {
  const { state, toggleTask, startSession } = useForge();
  const today = todayISO();
  const [anchor, setAnchor] = useState(() => new Date());
  const [selectedISO, setSelectedISO] = useState(today);
  const [focusOpen, setFocusOpen] = useState(false);

  const engine = useMemo(
    () => createTrainingEngine(state, { toggleTask }, { todayISO: today }),
    [state, toggleTask, today],
  );
  const week = useMemo(() => engine.getCurrentWeek(toISO(anchor)), [anchor, engine]);
  const mission = useMemo(() => engine.getMission(selectedISO), [engine, selectedISO]);
  const history = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => {
      const date = new Date(`${today}T12:00:00`);
      date.setDate(date.getDate() - index);
      const iso = toISO(date);
      const item = engine.getMission(iso);
      return {
        iso,
        dayName: item.dayName,
        completionPct: item.completionPct,
        completed: item.status === "termine",
        highlight: item.tasks.find((task) => !!state.days[iso]?.checked[task.id])?.label ?? item.tasks[0]?.label ?? "Repos",
        note: state.days[iso]?.journal?.notes,
      };
    });
  }, [engine, state.days, today]);
  const checked = state.days[selectedISO]?.checked ?? {};

  const weekLabel = `${formatShortDate(week[0].iso)} - ${formatShortDate(week[6].iso)}`;

  const handleToggle = (taskId: string) => {
    const task = mission.tasks.find((item) => item.id === taskId);
    const wasDone = !!checked[taskId];
    engine.completeExercise(taskId, selectedISO);
    if (task && !wasDone) toast.success(`+${task.xp} XP`, { description: task.label });
  };

  return (
    <div>
      <PageHeader title="Programme" subtitle="Ce qu'il faut faire, aujourd'hui et cette semaine." />

      <div className="px-4 pb-10 md:px-8">
        <div className="sticky top-0 z-20 -mx-4 mb-5 border-b border-border bg-background/92 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
          <DailyProgressBar mission={engine.getCurrentDay(today)} />
        </div>

        <div className="space-y-6">
          <ProgramHeader
            weekLabel={weekLabel}
            onPrevious={() => setAnchor(shiftWeek(anchor, -1))}
            onNext={() => setAnchor(shiftWeek(anchor, 1))}
            onToday={() => {
              setAnchor(new Date());
              setSelectedISO(today);
            }}
          />

          <WeeklyProgramView days={week} selectedISO={selectedISO} onSelect={setSelectedISO} />

          <DayMissionCard
            mission={mission}
            checked={checked}
            onToggle={handleToggle}
            onStart={() => {
              startSession(selectedISO);
              setFocusOpen(true);
            }}
          />

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
            <PsychotechniqueCard
              mission={mission}
              onStart={() => {
                startSession(selectedISO);
                setFocusOpen(true);
              }}
            />

            <div className="space-y-3">
              <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Derniers jours
              </div>
              {history.map((item) => (
                <SessionHistoryItem key={item.iso} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <FocusSessionPanel
        open={focusOpen}
        mission={mission}
        checked={checked}
        onToggle={handleToggle}
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
