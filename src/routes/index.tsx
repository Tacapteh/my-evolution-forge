import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/forge/AppShell";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Flame, Target, Sparkles, Trophy, ArrowRight, Quote } from "lucide-react";
import {
  useForge,
  todayISO,
  tasksForDate,
  dayTemplate,
  xpForDate,
  computeStreak,
  daysUntil,
  totalXP,
} from "@/lib/forge-store";
import { QUOTES, GOALS } from "@/lib/forge-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — FORGE" }] }),
});

function Dashboard() {
  const { state, hydrated, toggleTask } = useForge();
  const iso = todayISO();
  const tpl = dayTemplate(iso);
  const tasks = tasksForDate(iso);
  const day = state.days[iso];
  const done = tasks.filter((t) => day?.checked[t.id]).length;
  const pct = tasks.length ? (done / tasks.length) * 100 : 0;
  const xpToday = xpForDate(state, iso);
  const streak = hydrated ? computeStreak(state) : 0;
  const dLeft = daysUntil(state.targetDate);
  const quote = useMemo(() => QUOTES[new Date().getDate() % QUOTES.length], []);
  const total = totalXP(state);
  const overallProgress = Math.min(100, Math.round((total / 5000) * 100));

  // Weekly objectives from goals + current best
  const bestPull = Math.max(0, ...state.perf.filter((p) => p.type === "pull").map((p) => p.value));
  const bestChair = Math.max(0, ...state.perf.filter((p) => p.type === "chair").map((p) => p.value));
  const totalRun = state.perf.filter((p) => p.type === "run5" || p.type === "run10").reduce((s, p) => s + p.value, 0);
  const bestLuc = Math.max(0, ...state.perf.filter((p) => p.type === "luc").map((p) => p.value));

  const [celebrate, setCelebrate] = useState(false);
  useEffect(() => {
    if (hydrated && tasks.length && done === tasks.length) {
      setCelebrate(true);
      const t = setTimeout(() => setCelebrate(false), 2400);
      return () => clearTimeout(t);
    }
  }, [done, tasks.length, hydrated]);

  return (
    <div>
      <PageHeader
        title={`Bonjour ${state.userName}`}
        subtitle={`Mission du jour · ${tpl.name} — ${tpl.objective}`}
        right={
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="hidden sm:inline">J-{dLeft}</span>
            <Badge variant="outline" className="border-primary/30 text-primary">
              <Flame className="h-3 w-3 mr-1" /> {streak}j
            </Badge>
          </div>
        }
      />

      <div className="px-4 md:px-8 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Top row stats */}
        <StatCard icon={<Target className="h-4 w-4" />} label="J avant les tests" value={String(dLeft)} suffix="jours" />
        <StatCard icon={<Sparkles className="h-4 w-4" />} label="XP aujourd'hui" value={`+${xpToday}`} suffix="pts" accent />
        <StatCard icon={<Trophy className="h-4 w-4" />} label="Progression générale" value={`${overallProgress}%`} progress={overallProgress} />

        {/* Mission du jour */}
        <Card className="lg:col-span-2 card-forge p-5 md:p-6 relative overflow-hidden">
          {celebrate && (
            <div className="absolute inset-0 pointer-events-none animate-fade-in bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
          )}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Mission du jour</div>
              <h2 className="text-lg md:text-xl font-semibold mt-1">{tpl.objective}</h2>
            </div>
            <Link to="/programme" className="text-xs text-primary inline-flex items-center gap-1 hover:underline">
              Programme <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>{done} / {tasks.length} tâches</span>
              <span>{Math.round(pct)}%</span>
            </div>
            <Progress value={pct} className="h-2" />
          </div>
          <ul className="space-y-1.5">
            {tasks.map((t) => {
              const checked = !!day?.checked[t.id];
              return (
                <li
                  key={t.id}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 border border-transparent transition-all",
                    checked ? "bg-primary/10 border-primary/20" : "hover:bg-muted/60",
                  )}
                >
                  <Checkbox checked={checked} onCheckedChange={() => toggleTask(iso, t.id)} />
                  <div className="min-w-0 flex-1">
                    <div className={cn("text-sm truncate", checked && "line-through text-muted-foreground")}>{t.label}</div>
                    {t.detail && <div className="text-[11px] text-muted-foreground truncate">{t.detail}</div>}
                  </div>
                  <span className={cn("text-[11px] shrink-0 font-medium", checked ? "text-primary" : "text-muted-foreground")}>+{t.xp} XP</span>
                </li>
              );
            })}
          </ul>
        </Card>

        {/* Side column */}
        <div className="space-y-4 md:space-y-6">
          <Card className="card-forge p-5">
            <div className="flex items-start gap-3">
              <Quote className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-balance leading-relaxed">{quote}</p>
            </div>
          </Card>

          <Card className="card-forge p-5">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">Objectifs</div>
            <div className="space-y-3">
              <GoalRow label="Tractions" current={bestPull} target={17} unit="reps" />
              <GoalRow label="Chaise" current={bestChair} target={168} unit="s" />
              <GoalRow label="Course cumulée" current={Math.round(totalRun)} target={100} unit="km" />
              <GoalRow label="Luc Léger" current={bestLuc} target={12} unit="paliers" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  suffix,
  accent,
  progress,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix?: string;
  accent?: boolean;
  progress?: number;
}) {
  return (
    <Card className="card-forge p-5">
      <div className="flex items-center gap-2 text-muted-foreground text-[11px] uppercase tracking-wider">
        <span className={cn("h-6 w-6 grid place-items-center rounded-md", accent ? "bg-primary/15 text-primary" : "bg-muted")}>
          {icon}
        </span>
        {label}
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <div className={cn("text-3xl font-semibold tracking-tight", accent && "text-primary")}>{value}</div>
        {suffix && <div className="text-xs text-muted-foreground">{suffix}</div>}
      </div>
      {typeof progress === "number" && <Progress value={progress} className="h-1.5 mt-3" />}
    </Card>
  );
}

function GoalRow({ label, current, target, unit }: { label: string; current: number; target: number; unit: string }) {
  const pct = Math.min(100, (current / target) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-foreground/90">{label}</span>
        <span className="text-muted-foreground">
          {current} / {target} {unit}
        </span>
      </div>
      <Progress value={pct} className="h-1.5" />
    </div>
  );
}
