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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useForge, todayISO, toISO, computeStreak, daysUntil, totalXP, normalizeWorkouts } from "@/lib/forge-store";
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
  const [healthISO, setHealthISO] = useState(iso);

  const shiftHealthDate = (days: number) => {
    const d = new Date(`${healthISO}T12:00:00`);
    d.setDate(d.getDate() + days);
    const nextISO = toISO(d);
    if (nextISO <= iso) {
      setHealthISO(nextISO);
    }
  };

  const engine = useMemo(() => createTrainingEngine(state, { toggleTask }, { todayISO: iso }), [iso, state, toggleTask]);
  const mission = engine.getTodayProgram();
  const tasks = mission.tasks;
  const checked = state.days[iso]?.checked ?? {};
  const done = mission.doneCount;
  const xpToday = engine.getDailyXP(iso);
  const streak = hydrated ? computeStreak(state) : 0;
  const dLeft = daysUntil(state.targetDate);
  const total = totalXP(state);

  const rawHealth = state.days[healthISO]?.health;
  const latestHealthFromState = Object.values(state.days || {})
    .map((d) => d?.health)
    .filter((h) => h && (h.steps != null || h.avgHeartRate != null || h.activeCalories != null || h.exerciseMinutes != null || (h.workouts && h.workouts.length > 0)))
    .pop();

  const healthData =
    rawHealth &&
    (rawHealth.steps != null ||
      rawHealth.avgHeartRate != null ||
      rawHealth.activeCalories != null ||
      rawHealth.exerciseMinutes != null ||
      (rawHealth.workouts && rawHealth.workouts.length > 0))
      ? rawHealth
      : healthISO === iso ? latestHealthFromState : null;

  const hasHealthData =
    healthData &&
    (healthData.steps != null ||
      healthData.avgHeartRate != null ||
      healthData.activeCalories != null ||
      healthData.exerciseMinutes != null ||
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

    const addWorkout = window.confirm("Souhaitez-vous inclure une séance de Natation (1000m, 45 min, 320 kcal) à la synchro ?");

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
      ...healthData,
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-2 border-b border-border/40">
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

                {/* Navigation temporelle Apple Santé */}
                <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-lg border border-border/40 shrink-0 self-start sm:self-auto">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                    onClick={() => shiftHealthDate(-1)}
                    title="Jour précédent"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-[10px] px-2 font-semibold text-foreground hover:text-primary"
                    onClick={() => setHealthISO(iso)}
                    title="Revenir à aujourd'hui"
                  >
                    {healthISO === iso ? "Aujourd'hui" : new Date(`${healthISO}T12:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-foreground disabled:opacity-30"
                    disabled={healthISO >= iso}
                    onClick={() => shiftHealthDate(1)}
                    title="Jour suivant"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              
              {hasHealthData ? (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="flex items-center gap-2.5">
                        <Footprints className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">Pas du jour</div>
                          <div className="text-sm font-bold tabular-nums text-foreground mt-0.5">
                            {healthData.steps?.toLocaleString() ?? "0"} pas{" "}
                            {healthData.steps && healthData.steps > 0 && (
                              <span className="text-xs text-primary font-semibold">
                                ({((healthData.steps * 0.74) / 1000).toFixed(1)} km)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 p-3 rounded-lg bg-card border border-border">
                      <Heart className="h-5 w-5 text-red-500" />
                      <div>
                        <div className="text-xs text-muted-foreground">Fréquence cardiaque</div>
                        <div className="text-sm font-bold tabular-nums mt-0.5">
                          {healthData.avgHeartRate ? `${healthData.avgHeartRate} bpm` : "--"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {(() => {
                    const normalized = normalizeWorkouts(healthData.workouts);
                    if (!normalized || normalized.length === 0) return null;

                    return (
                      <div className="space-y-2 mt-3 pt-3 border-t border-border/40">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-primary" />
                          Exercices synchronisés ({normalized.length})
                        </div>
                        <div className="space-y-2">
                          {normalized.map((w: any, idx: number) => {
                            const typeStr = String(w.type || "Natation").toLowerCase();
                            const isSwim = typeStr.includes("natat") || typeStr.includes("swim") || typeStr.includes("nage");
                            const isRun = typeStr.includes("cours") || typeStr.includes("run") || typeStr.includes("footing");
                            const isCycle = typeStr.includes("velo") || typeStr.includes("cycle") || typeStr.includes("bike");
                            const displayType = w.type || "Natation";

                            const hasValidDur = w.durationMinutes != null && w.durationMinutes > 0 && w.durationMinutes < 1440;

                            const meters = w.distanceMeters ?? (w.distanceKm ? Math.round(w.distanceKm * 1000) : null);
                            const km = w.distanceKm ?? (w.distanceMeters ? Number((w.distanceMeters / 1000).toFixed(1)) : null);

                            let distanceStr = "";
                            if (meters && meters > 0) {
                              distanceStr = isSwim || meters < 1000 ? `${meters}m` : `${km ?? (meters / 1000).toFixed(1)} km`;
                            } else if (km && km > 0) {
                              distanceStr = isSwim || km < 1 ? `${Math.round(km * 1000)}m` : `${km} km`;
                            }

                            const hasValidDist = Boolean(distanceStr);

                            return (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-2.5 rounded-lg border border-primary/20 bg-primary/5"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                                    {isSwim ? (
                                      <Waves className="h-4 w-4 text-cyan-400" />
                                    ) : isRun ? (
                                      <Footprints className="h-4 w-4 text-emerald-400" />
                                    ) : (
                                      <Dumbbell className="h-4 w-4 text-primary" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="text-xs font-bold flex items-center gap-1.5">
                                      <span className="text-foreground">{displayType}</span>
                                      <Badge
                                        variant="outline"
                                        className="text-[9px] py-0 px-1.5 border-primary/30 text-primary"
                                      >
                                        Apple Health
                                      </Badge>
                                    </div>
                                    {hasValidDur || hasValidDist ? (
                                      <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">
                                        {hasValidDur && (
                                          <>
                                            Durée: <span className="font-semibold text-foreground">{w.durationMinutes} min</span>
                                          </>
                                        )}
                                        {hasValidDur && hasValidDist && <> • </>}
                                        {hasValidDist && (
                                          <>
                                            Distance: <span className="font-semibold text-foreground">{distanceStr}</span>
                                          </>
                                        )}
                                      </p>
                                    ) : null}
                                  </div>
                                </div>
                                {w.calories != null && w.calories > 0 && (
                                  <span className="text-[10px] font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                                    {w.calories} kcal
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
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
