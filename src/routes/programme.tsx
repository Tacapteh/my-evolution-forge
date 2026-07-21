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
import { useForge, todayISO } from "@/lib/forge-store";
import {
  buildDayMission,
  buildHistoryItems,
  buildWeekDays,
  startOfProgramWeek,
  toLocalISO,
} from "@/lib/forge-program";
import { toast } from "sonner";

export const Route = createFileRoute("/programme")({
  component: ProgrammePage,
  head: () => ({ meta: [{ title: "Programme - FORGE" }] }),
});

function ProgrammePage() {
  const { state, toggleTask, startSession } = useForge();
  const today = todayISO();
  const [anchor, setAnchor] = useState(() => startOfProgramWeek(new Date()));
  const [selectedISO, setSelectedISO] = useState(today);
  const [focusOpen, setFocusOpen] = useState(false);

  const week = useMemo(() => buildWeekDays(anchor, state, today), [anchor, state, today]);
  const mission = useMemo(() => buildDayMission(state, selectedISO), [state, selectedISO]);
  const history = useMemo(() => buildHistoryItems(state, today, 5), [state, today]);
  const checked = state.days[selectedISO]?.checked ?? {};

  const weekLabel = `${formatShortDate(week[0].iso)} - ${formatShortDate(week[6].iso)}`;

  const handleToggle = (taskId: string) => {
    const task = mission.tasks.find((item) => item.id === taskId);
    const wasDone = !!checked[taskId];
    toggleTask(selectedISO, taskId);
    if (task && !wasDone) toast.success(`+${task.xp} XP`, { description: task.label });
  };

  return (
    <div>
      <PageHeader title="Programme" subtitle="Ce qu'il faut faire, aujourd'hui et cette semaine." />

      <div className="px-4 pb-10 md:px-8">
        <div className="sticky top-0 z-20 -mx-4 mb-5 border-b border-border bg-background/92 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
          <DailyProgressBar mission={buildDayMission(state, today)} />
        </div>

        <div className="space-y-6">
          <ProgramHeader
            weekLabel={weekLabel}
            onPrevious={() => setAnchor(shiftWeek(anchor, -1))}
            onNext={() => setAnchor(shiftWeek(anchor, 1))}
            onToday={() => {
              setAnchor(startOfProgramWeek(new Date()));
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
  return startOfProgramWeek(next);
}

function formatShortDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
}
