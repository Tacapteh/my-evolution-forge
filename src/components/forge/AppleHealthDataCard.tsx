import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  Footprints,
  Waves,
  Activity,
  Flame,
  CheckCircle2,
  Calendar,
  Sparkles,
  Dumbbell,
} from "lucide-react";
import { useForge, normalizeWorkouts, toISO } from "@/lib/forge-store";
import { cn } from "@/lib/utils";

export function AppleHealthDataCard({ className }: { className?: string }) {
  const { state } = useForge();

  const healthAnalysis = useMemo(() => {
    const daysWithData: Array<{
      iso: string;
      steps?: number;
      avgHeartRate?: number;
      activeCalories?: number;
      exerciseMinutes?: number;
      workouts: any[];
      swimMeters: number;
      runKm: number;
    }> = [];

    let totalSteps = 0;
    let totalHeartRate = 0;
    let hrCount = 0;
    let totalSwimMeters = 0;
    let totalRunKm = 0;
    let totalActiveCalories = 0;

    const allISOs = Object.keys(state.days || {}).sort().reverse();

    for (const iso of allISOs) {
      const day = state.days[iso];
      if (!day || !day.health) continue;

      const h = day.health;
      const normalizedW = normalizeWorkouts(h.workouts);

      let daySwimMeters = 0;
      let dayRunKm = 0;

      for (const w of normalizedW) {
        const typeStr = String(w.type || "").toLowerCase();
        const isSwim = typeStr.includes("natat") || typeStr.includes("swim") || typeStr.includes("nage");
        const isRun = typeStr.includes("cours") || typeStr.includes("run") || typeStr.includes("footing");

        const m = w.distanceMeters ?? (w.distanceKm ? Math.round(w.distanceKm * 1000) : 0);
        const km = w.distanceKm ?? (m ? m / 1000 : 0);

        if (isSwim) {
          daySwimMeters += m;
        } else if (isRun) {
          dayRunKm += km;
        }
      }

      const hasData =
        (h.steps != null && h.steps > 0) ||
        (h.avgHeartRate != null && h.avgHeartRate > 0) ||
        normalizedW.length > 0;

      if (hasData) {
        if (h.steps) totalSteps += h.steps;
        if (h.avgHeartRate) {
          totalHeartRate += h.avgHeartRate;
          hrCount++;
        }
        if (h.activeCalories) totalActiveCalories += h.activeCalories;

        totalSwimMeters += daySwimMeters;
        totalRunKm += dayRunKm;

        daysWithData.push({
          iso,
          steps: h.steps,
          avgHeartRate: h.avgHeartRate,
          activeCalories: h.activeCalories,
          exerciseMinutes: h.exerciseMinutes,
          workouts: normalizedW,
          swimMeters: daySwimMeters,
          runKm: dayRunKm,
        });
      }
    }

    const recordedDaysCount = daysWithData.length;
    const avgSteps = recordedDaysCount ? Math.round(totalSteps / recordedDaysCount) : 0;
    const avgBpm = hrCount ? Math.round(totalHeartRate / hrCount) : 0;

    return {
      daysWithData: daysWithData.slice(0, 7), // 7 derniers jours enregistrés
      recordedDaysCount,
      avgSteps,
      avgBpm,
      totalSwimMeters,
      totalSwimKm: Number((totalSwimMeters / 1000).toFixed(2)),
      totalRunKm: Number(totalRunKm.toFixed(1)),
      totalActiveCalories,
    };
  }, [state.days]);

  // Objectifs du programme pour comparaison
  const targetRunKm = 100;
  const targetSwimMeters = 10000;
  const targetDailySteps = 8000;

  const runPct = Math.min(100, Math.round((healthAnalysis.totalRunKm / targetRunKm) * 100));
  const swimPct = Math.min(100, Math.round((healthAnalysis.totalSwimMeters / targetSwimMeters) * 100));
  const stepsPct = Math.min(100, Math.round((healthAnalysis.avgSteps / targetDailySteps) * 100));

  return (
    <Card className={cn("card-forge p-5 md:p-6 border-primary/30 bg-card/80 backdrop-blur-md space-y-6 shadow-md", className)}>
      {/* En-tête de la carte */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-primary/15 text-primary grid place-items-center shrink-0">
            <Heart className="h-5 w-5 text-red-500 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold tracking-tight">Données Réelles (Apple Santé)</h3>
              <Badge variant="outline" className="border-primary/30 text-primary text-[9px] uppercase font-bold px-1.5 py-0">
                iOS Sync
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Croisement synthétique des capteurs Apple Health & du programme.
            </p>
          </div>
        </div>

        <div className="text-right text-xs font-semibold text-muted-foreground">
          <span className="text-foreground">{healthAnalysis.recordedDaysCount}</span> jour(s) synchronisé(s)
        </div>
      </div>

      {/* Grille de croisement synthétique */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Course Réelle vs Obj */}
        <div className="p-3.5 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-foreground">
              <Footprints className="h-4 w-4 text-emerald-400" /> Course Réelle
            </span>
            <span className="text-emerald-400 font-bold">{runPct}%</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold tabular-nums text-foreground">
              {healthAnalysis.totalRunKm} <span className="text-xs font-normal text-muted-foreground">km</span>
            </span>
            <span className="text-xs text-muted-foreground">Cible : {targetRunKm} km</span>
          </div>
          <Progress value={runPct} className="h-1.5 bg-muted" />
        </div>

        {/* Natation Réelle vs Obj */}
        <div className="p-3.5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-foreground">
              <Waves className="h-4 w-4 text-cyan-400" /> Natation Réelle
            </span>
            <span className="text-cyan-400 font-bold">{swimPct}%</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold tabular-nums text-foreground">
              {healthAnalysis.totalSwimMeters >= 1000
                ? `${healthAnalysis.totalSwimKm} km`
                : `${healthAnalysis.totalSwimMeters} m`}
            </span>
            <span className="text-xs text-muted-foreground">Cible : 10 km</span>
          </div>
          <Progress value={swimPct} className="h-1.5 bg-muted" />
        </div>

        {/* Pas Moyens vs Obj */}
        <div className="p-3.5 rounded-xl border border-primary/20 bg-background/50 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-foreground">
              <Activity className="h-4 w-4 text-primary" /> Pas Quotidien
            </span>
            <span className="text-primary font-bold">{stepsPct}%</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold tabular-nums text-foreground">
              {healthAnalysis.avgSteps.toLocaleString()}{" "}
              <span className="text-xs font-normal text-muted-foreground">pas/j</span>
            </span>
            <span className="text-xs text-muted-foreground">Cible : 8k</span>
          </div>
          <Progress value={stepsPct} className="h-1.5 bg-muted" />
        </div>

        {/* FC Moyenne */}
        <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-foreground">
              <Heart className="h-4 w-4 text-red-500" /> Rythme Cardiaque
            </span>
            <span className="text-red-400 font-bold">Moyenne</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold tabular-nums text-foreground">
              {healthAnalysis.avgBpm ? `${healthAnalysis.avgBpm}` : "--"}{" "}
              <span className="text-xs font-normal text-muted-foreground">bpm</span>
            </span>
            <span className="text-xs text-muted-foreground">Repos / Effots</span>
          </div>
          <div className="text-[10px] text-muted-foreground italic">Capteurs Apple Watch</div>
        </div>
      </div>

      {/* Mini Récapitulatif Historique Synthétique */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-primary" /> 7 Derniers Jours Enregistrés
        </h4>

        {healthAnalysis.daysWithData.length === 0 ? (
          <div className="p-4 text-center text-xs text-muted-foreground italic rounded-lg border border-border/40 bg-muted/10">
            Aucune donnée Apple Santé synchronisée pour l'instant.
          </div>
        ) : (
          <div className="space-y-2">
            {healthAnalysis.daysWithData.map((d) => (
              <div
                key={d.iso}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border border-border/60 bg-card/60 hover:bg-muted/20 transition-colors text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-foreground w-20 shrink-0">
                    {formatShortDate(d.iso)}
                  </span>
                  <div className="flex flex-wrap gap-2 text-muted-foreground font-medium">
                    {d.steps != null && d.steps > 0 && (
                      <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">
                        <Footprints className="h-3 w-3" /> {d.steps.toLocaleString()} pas
                      </span>
                    )}
                    {d.avgHeartRate != null && d.avgHeartRate > 0 && (
                      <span className="inline-flex items-center gap-1 bg-red-500/10 text-red-400 px-2 py-0.5 rounded font-bold">
                        <Heart className="h-3 w-3" /> {d.avgHeartRate} bpm
                      </span>
                    )}
                    {d.activeCalories != null && d.activeCalories > 0 && (
                      <span className="inline-flex items-center gap-1 text-amber-400">
                        <Flame className="h-3 w-3" /> {d.activeCalories} kcal
                      </span>
                    )}
                  </div>
                </div>

                {d.workouts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 shrink-0">
                    {d.workouts.map((w: any, idx: number) => {
                      const tStr = String(w.type || "").toLowerCase();
                      const isSwim = tStr.includes("natat") || tStr.includes("swim") || tStr.includes("nage") || w.type === "Natation";
                      const isRun = tStr.includes("cours") || tStr.includes("run") || tStr.includes("footing");

                      const distStr = w.distanceMeters
                        ? isSwim || w.distanceMeters < 1000
                          ? `${w.distanceMeters}m`
                          : `${(w.distanceMeters / 1000).toFixed(1)}km`
                        : w.distanceKm
                        ? `${w.distanceKm}km`
                        : "";
                      const durStr = w.durationMinutes ? `${w.durationMinutes} min` : "";
                      const calStr = w.calories ? `${w.calories} kcal` : "";

                      const subInfo = [durStr, distStr, calStr].filter(Boolean).join(" • ");

                      return (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 border border-border bg-background px-2 py-0.5 rounded text-[10px] text-foreground font-semibold"
                        >
                          {isSwim ? (
                            <Waves className="h-3 w-3 text-cyan-400" />
                          ) : isRun ? (
                            <Footprints className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <Dumbbell className="h-3 w-3 text-primary" />
                          )}
                          {w.type || "Natation"} {subInfo && `• ${subInfo}`}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

function formatShortDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
}
