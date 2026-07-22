import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/forge/AppShell";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useForge, todayISO } from "@/lib/forge-store";
import { buildDayMission, buildHistoryItems } from "@/lib/forge-program";
import { DailyProgressBar, SessionHistoryItem } from "@/components/forge/program-components";
import { Dumbbell, Timer, Footprints, Waves, Brain, Award } from "lucide-react";
import { AppleHealthDataCard } from "@/components/forge/AppleHealthDataCard";

export const Route = createFileRoute("/progression")({
  component: ProgressionPage,
  head: () => ({ meta: [{ title: "Progression - FORGE" }] }),
});

function ProgressionPage() {
  const { state } = useForge();
  const today = todayISO();
  const mission = buildDayMission(state, today);
  const history = buildHistoryItems(state, today, 6);
  const best = (t: string) =>
    Math.max(0, ...state.perf.filter((p) => p.type === t).map((p) => p.value));
  const psychoDays = Object.values(state.days).filter(
    (d) => d.psycho?.score != null || d.psycho?.duration != null,
  ).length;

  const cards = [
    { icon: Dumbbell, label: "Tractions", cur: best("pull"), target: 17, unit: "reps" },
    { icon: Timer, label: "Chaise", cur: best("chair"), target: 168, unit: "s" },
    { icon: Footprints, label: "Course 10 km", cur: best("run10"), target: 10, unit: "km" },
    { icon: Award, label: "Luc Leger", cur: best("luc"), target: 12, unit: "paliers" },
    { icon: Waves, label: "Natation totale", cur: 0, target: 50, unit: "km" },
    { icon: Brain, label: "Psychotechniques", cur: psychoDays, target: 60, unit: "jours" },
  ];

  return (
    <div>
      <PageHeader title="Progression" subtitle="Journee en cours, regularite, données réelles et objectifs." />

      <div className="space-y-6 px-4 pb-10 md:px-8">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
          <DailyProgressBar mission={mission} />
          <Card className="card-forge p-5">
            <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Aujourd'hui
            </div>
            <div className="mt-3 text-2xl font-semibold text-primary">+{mission.xp} XP</div>
            <div className="mt-1 text-sm text-muted-foreground">{mission.summary}</div>
          </Card>
        </div>

        {/* Section compacte Données Réelles Apple Santé */}
        <AppleHealthDataCard />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const pct = Math.min(100, (card.cur / card.target) * 100);
            return (
              <Card key={card.label} className="card-forge p-5">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-primary/15 text-primary">
                    <card.icon className="h-3.5 w-3.5" />
                  </span>
                  {card.label}
                </div>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <div className="text-3xl font-semibold tracking-tight">{card.cur}</div>
                  <div className="text-xs text-muted-foreground">
                    / {card.target} {card.unit}
                  </div>
                </div>
                <Progress value={pct} className="mt-3 h-1.5" />
                <div className="mt-2 text-[11px] text-muted-foreground">
                  {Math.round(pct)}% de l'objectif
                </div>
              </Card>
            );
          })}
        </div>

        <div>
          <div className="mb-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Historique simple
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {history.map((item) => (
              <SessionHistoryItem key={item.iso} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
