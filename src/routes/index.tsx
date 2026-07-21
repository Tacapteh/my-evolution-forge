import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/forge/AppShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Flame,
  Target,
  ArrowRight,
  Dumbbell,
  Timer,
  Footprints,
  Award,
  CheckCircle2,
} from "lucide-react";
import { useForge, todayISO, computeStreak, daysUntil, totalXP } from "@/lib/forge-store";
import {
  StatCard,
  XPCard,
  StreakCard,
  ObjectiveCard,
  SectionTitle,
} from "@/components/forge/primitives";
import { DailyChecklist } from "@/components/forge/DailyChecklist";
import { DayMissionCard, FocusSessionPanel } from "@/components/forge/program-components";
import { buildDayMission } from "@/lib/forge-program";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard - FORGE" }] }),
});

function Dashboard() {
  const { state, hydrated, toggleTask, startSession } = useForge();
  const iso = todayISO();
  const mission = buildDayMission(state, iso);
  const tasks = mission.tasks;
  const checked = state.days[iso]?.checked ?? {};
  const done = mission.doneCount;
  const xpToday = mission.xp;
  const streak = hydrated ? computeStreak(state) : 0;
  const dLeft = daysUntil(state.targetDate);
  const total = totalXP(state);

  const [focus, setFocus] = useState(false);

  const weekDone = (() => {
    let count = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const rec = state.days[key];
      if (rec && Object.values(rec.checked).some(Boolean)) count++;
    }
    return count;
  })();

  const sessionsDone = Object.values(state.days).filter((d) =>
    Object.values(d.checked).some(Boolean),
  ).length;
  const bestPull = Math.max(0, ...state.perf.filter((p) => p.type === "pull").map((p) => p.value));
  const bestChair = Math.max(
    0,
    ...state.perf.filter((p) => p.type === "chair").map((p) => p.value),
  );
  const totalRun = state.perf
    .filter((p) => p.type === "run5" || p.type === "run10")
    .reduce((s, p) => s + p.value, 0);
  const bestLuc = Math.max(0, ...state.perf.filter((p) => p.type === "luc").map((p) => p.value));

  const [celebrate, setCelebrate] = useState(false);
  useEffect(() => {
    if (hydrated && tasks.length && done === tasks.length) {
      setCelebrate(true);
      const t = setTimeout(() => setCelebrate(false), 2400);
      return () => clearTimeout(t);
    }
  }, [done, tasks.length, hydrated]);

  const handleToggle = (id: string) => {
    const task = tasks.find((item) => item.id === id);
    const wasDone = !!checked[id];
    toggleTask(iso, id);
    if (task && !wasDone) toast.success(`+${task.xp} XP`, { description: task.label });
  };

  return (
    <div>
      <PageHeader
        title={`Bonjour ${state.userName}`}
        subtitle={`${mission.dayName} - ${mission.objective}`}
        right={
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="border-primary/30 text-primary">
              <Flame className="mr-1 h-3 w-3" /> {streak}j
            </Badge>
            <span className="hidden items-center gap-1 sm:inline-flex">
              <Target className="h-3 w-3" /> J-{dLeft}
            </span>
          </div>
        }
      />

      <div className="space-y-6 px-4 pb-10 md:px-8">
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
          <div className="relative lg:col-span-2">
            {celebrate && (
              <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl animate-fade-in" />
            )}
            <DayMissionCard
              mission={mission}
              checked={checked}
              onToggle={handleToggle}
              onStart={() => {
                startSession(iso);
                setFocus(true);
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-1">
            <XPCard totalXP={total} xpToday={xpToday} />
            <StreakCard streak={streak} daysLeft={dLeft} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            icon={<CheckCircle2 className="h-4 w-4" />}
            label="Seances totales"
            value={sessionsDone}
            suffix="jours actifs"
          />
          <StatCard
            icon={<Flame className="h-4 w-4" />}
            label="Semaine"
            value={`${weekDone}/7`}
            progress={(weekDone / 7) * 100}
            accent
          />
          <StatCard
            icon={<Target className="h-4 w-4" />}
            label="Aujourd'hui"
            value={`${done}/${tasks.length}`}
            progress={mission.completionPct}
          />
          <StatCard
            icon={<Award className="h-4 w-4" />}
            label="Badges"
            value={state.badges.length}
            suffix="debloques"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
          <Card className="card-forge p-5 lg:col-span-2">
            <SectionTitle
              action={
                <Link
                  to="/programme"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  Programme <ArrowRight className="h-3 w-3" />
                </Link>
              }
            >
              Checklist du jour
            </SectionTitle>
            <DailyChecklist tasks={tasks} checked={checked} onToggle={handleToggle} />
          </Card>

          <Card className="card-forge p-5">
            <SectionTitle
              action={
                <Link
                  to="/progression"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  Voir <ArrowRight className="h-3 w-3" />
                </Link>
              }
            >
              Objectifs cles
            </SectionTitle>
            <div className="space-y-2.5">
              <ObjectiveCard
                label="Tractions"
                current={bestPull}
                target={17}
                unit="reps"
                icon={<Dumbbell className="h-3.5 w-3.5" />}
              />
              <ObjectiveCard
                label="Chaise"
                current={bestChair}
                target={168}
                unit="s"
                icon={<Timer className="h-3.5 w-3.5" />}
              />
              <ObjectiveCard
                label="Course cumulee"
                current={Math.round(totalRun)}
                target={100}
                unit="km"
                icon={<Footprints className="h-3.5 w-3.5" />}
              />
              <ObjectiveCard
                label="Luc Leger"
                current={bestLuc}
                target={12}
                unit="paliers"
                icon={<Award className="h-3.5 w-3.5" />}
              />
            </div>
          </Card>
        </div>
      </div>

      <FocusSessionPanel
        open={focus}
        onClose={() => setFocus(false)}
        mission={mission}
        checked={checked}
        onToggle={handleToggle}
      />
    </div>
  );
}
