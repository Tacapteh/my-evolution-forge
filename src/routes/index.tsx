import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/forge/AppShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Flame,
  Target,
  ArrowRight,
  Dumbbell,
  Timer,
  Footprints,
  Award,
  CheckCircle2,
  Heart,
  Activity,
  Plus,
  Waves,
  Sparkles,
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
import { createTrainingEngine } from "@/engine/trainingEngine";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard - FORGE" }] }),
});

function Dashboard() {
  const { state, hydrated, toggleTask, startSession, setHealth } = useForge();
  const iso = todayISO();
  const engine = useMemo(() => createTrainingEngine(state, { toggleTask }, { todayISO: iso }), [iso, state, toggleTask]);
  const mission = engine.getTodayProgram();
  const tasks = mission.tasks;
  const checked = state.days[iso]?.checked ?? {};
  const done = mission.doneCount;
  const xpToday = engine.getDailyXP(iso);
  const streak = hydrated ? computeStreak(state) : 0;
  const dLeft = daysUntil(state.targetDate);
  const total = totalXP(state);
  const rawHealth = state.days[iso]?.health;
  const latestHealthFromState = Object.values(state.days || {})
    .map((d) => d?.health)
    .filter((h) => h && (h.steps != null || h.avgHeartRate != null || (h.workouts && h.workouts.length > 0)))
    .pop();

  const healthData =
    rawHealth &&
    (rawHealth.steps != null ||
      rawHealth.avgHeartRate != null ||
      (rawHealth.workouts && rawHealth.workouts.length > 0))
      ? rawHealth
      : latestHealthFromState;

  const hasHealthData =
    healthData &&
    (healthData.steps != null ||
      healthData.avgHeartRate != null ||
      (healthData.workouts && healthData.workouts.length > 0));

  const [focus, setFocus] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    if (hydrated && tasks.length && done === tasks.length) {
      setCelebrate(true);
      const t = setTimeout(() => setCelebrate(false), 2400);
      return () => clearTimeout(t);
    }
  }, [done, tasks.length, hydrated]);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Activity className="h-10 w-10 text-primary animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Chargement de FORGE...</span>
        </div>
      </div>
    );
  }

  const weekDone = engine.getWeeklyCompletion(iso).completedDays;
  const sessionsDone = Object.values(state.days || {}).filter((d) =>
    d && d.checked && Object.values(d.checked).some(Boolean),
  ).length;
  const perfList = state.perf || [];
  const bestPull = Math.max(0, ...perfList.filter((p) => p.type === "pull").map((p) => p.value));
  const bestChair = Math.max(
    0,
    ...perfList.filter((p) => p.type === "chair").map((p) => p.value),
  );
  const totalRun = perfList
    .filter((p) => p.type === "run5" || p.type === "run10")
    .reduce((s, p) => s + p.value, 0);
  const bestLuc = Math.max(0, ...perfList.filter((p) => p.type === "luc").map((p) => p.value));

  const handleToggle = (id: string) => {
    const task = tasks.find((item) => item.id === id);
    const wasDone = !!checked[id];
    engine.completeExercise(id, iso);
    if (task && !wasDone) toast.success(`+${task.xp} XP`, { description: task.label });
  };

  const handleManualHealthInput = () => {
    const stepsInput = window.prompt("Saisir votre nombre de pas du jour (ex: 8500) :", String(healthData?.steps ?? 8500));
    if (stepsInput === null) return;
    const hrInput = window.prompt("Saisir votre fréquence cardiaque moyenne en bpm (ex: 68) :", String(healthData?.avgHeartRate ?? 68));
    if (hrInput === null) return;

    const addWorkout = window.confirm("Souhaitez-vous inclure une séance de Natation (1000m, 45 min) à la synchro ?");

    const steps = parseInt(stepsInput, 10);
    const hr = parseInt(hrInput, 10);

    const workouts = [...(healthData?.workouts ?? [])];
    if (addWorkout) {
      workouts.unshift({
        type: "Natation",
        durationMinutes: 45,
        distanceMeters: 1000,
        distanceKm: 1.0,
        calories: 320,
      });
    }

    const updatedHealth = {
      steps: !isNaN(steps) ? steps : healthData?.steps,
      avgHeartRate: !isNaN(hr) ? hr : healthData?.avgHeartRate,
      workouts,
    };

    setHealth(iso, updatedHealth);
    toast.success("Données Santé enregistrées !", {
      description: `${steps} pas • FC: ${hr} bpm ${addWorkout ? "• Natation 1000m (45 min)" : ""}`,
    });
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
          <Card className="card-forge p-5">
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

          <Card className="card-forge p-5 flex flex-col justify-between">
            <div>
              <SectionTitle
                action={
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-muted-foreground hover:text-foreground gap-1" onClick={handleManualHealthInput}>
                      <Plus className="h-3 w-3" /> Saisie
                    </Button>
                    <Badge variant="outline" className="border-primary/30 text-primary flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider">
                      <Heart className="h-3 w-3 text-red-500 animate-pulse" /> Live
                    </Badge>
                  </div>
                }
              >
                Santé Connectée
              </SectionTitle>
              
              {hasHealthData ? (
                <div className="space-y-4 mt-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="flex items-center gap-3">
                      <Footprints className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Pas du jour</div>
                        <div className="text-lg font-bold tabular-nums">{healthData.steps?.toLocaleString() ?? "0"}</div>
                      </div>
                    </div>
                    {healthData.steps && healthData.steps >= 8000 ? (
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px] hover:bg-emerald-500/10">Objectif</Badge>
                    ) : (
                      <span className="text-[10px] text-muted-foreground">Cible: 8k</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                    <Heart className="h-5 w-5 text-red-500" />
                    <div>
                      <div className="text-xs text-muted-foreground">Fréquence cardiaque</div>
                      <div className="text-lg font-bold tabular-nums">
                        {healthData.avgHeartRate ? `${healthData.avgHeartRate} bpm` : "--"}
                      </div>
                    </div>
                  </div>

                  {healthData.workouts && healthData.workouts.length > 0 && (
                    <div className="space-y-2 mt-3 pt-3 border-t border-border/40">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        Exercices synchronisés ({healthData.workouts.length})
                      </div>
                      <div className="space-y-2">
                        {healthData.workouts.map((w: any, idx: number) => {
                          const isSwim = String(w.type).toLowerCase().includes("natat") || String(w.type).toLowerCase().includes("swim") || String(w.type).toLowerCase().includes("nage");
                          const isRun = String(w.type).toLowerCase().includes("cours") || String(w.type).toLowerCase().includes("run");

                          let distLabel = "";
                          if (w.distanceMeters) {
                            distLabel = w.distanceMeters >= 1000 && w.distanceMeters % 1000 === 0
                              ? `${w.distanceMeters}m (${(w.distanceMeters / 1000).toFixed(1)} km)`
                              : `${w.distanceMeters}m`;
                          } else if (w.distanceKm) {
                            distLabel = w.distanceKm < 2 ? `${Math.round(w.distanceKm * 1000)}m` : `${w.distanceKm} km`;
                          }

                          return (
                            <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-primary/20 bg-primary/5">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                                  {isSwim ? <Waves className="h-4 w-4" /> : isRun ? <Footprints className="h-4 w-4" /> : <Dumbbell className="h-4 w-4" />}
                                </div>
                                <div>
                                  <div className="text-xs font-bold capitalize flex items-center gap-1.5">
                                    {w.type}
                                    <Badge variant="outline" className="text-[9px] py-0 px-1.5 border-primary/30 text-primary">Apple Health</Badge>
                                  </div>
                                  <div className="text-[10px] text-muted-foreground">
                                    Durée: <span className="font-semibold text-foreground">{w.durationMinutes} min</span>
                                    {distLabel && <> • Distance: <span className="font-semibold text-foreground">{distLabel}</span></>}
                                  </div>
                                </div>
                              </div>
                              {w.calories && (
                                <span className="text-[10px] font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                                  {w.calories} kcal
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-6 text-center text-muted-foreground space-y-3 mt-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-xs font-semibold">En attente de synchronisation...</div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed px-4">
                    Utilisez un Raccourci iOS avec l'URL de votre site pour synchroniser automatiquement vos pas, votre rythme cardiaque et vos séances.
                  </p>
                </div>
              )}
            </div>
            
            <div className="border-t border-border/40 pt-3 mt-4 text-[10px] text-muted-foreground flex justify-between items-center">
              <span>Endpoint: `/api/sync-health`</span>
              <span className="font-semibold text-primary">Prêt</span>
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
