import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/forge/AppShell";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useForge } from "@/lib/forge-store";
import { Dumbbell, Timer, Footprints, Waves, Brain, Award } from "lucide-react";

export const Route = createFileRoute("/progression")({
  component: ProgressionPage,
  head: () => ({ meta: [{ title: "Progression — FORGE" }] }),
});

function ProgressionPage() {
  const { state } = useForge();
  const best = (t: string) => Math.max(0, ...state.perf.filter((p) => p.type === t).map((p) => p.value));
  const sum = (t: string) => state.perf.filter((p) => p.type === t).reduce((s, p) => s + p.value, 0);

  const psychoDays = Object.values(state.days).filter((d) => d.psycho?.score != null || d.psycho?.duration != null).length;

  const cards = [
    { icon: Dumbbell, label: "Tractions", cur: best("pull"), target: 17, unit: "reps" },
    { icon: Timer, label: "Chaise", cur: best("chair"), target: 168, unit: "s" },
    { icon: Footprints, label: "Course (10 km)", cur: best("run10"), target: 10, unit: "km" },
    { icon: Award, label: "Luc Léger", cur: best("luc"), target: 12, unit: "paliers" },
    { icon: Waves, label: "Natation totale", cur: sum("swim" as any), target: 50, unit: "km" },
    { icon: Brain, label: "Psychotechniques", cur: psychoDays, target: 60, unit: "jours" },
  ];

  return (
    <div>
      <PageHeader title="Progression" subtitle="Chaque objectif, à sa juste distance." />
      <div className="px-4 md:px-8 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {cards.map((c) => {
          const pct = Math.min(100, (c.cur / c.target) * 100);
          return (
            <Card key={c.label} className="card-forge p-5">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                <span className="h-7 w-7 grid place-items-center rounded-md bg-primary/15 text-primary">
                  <c.icon className="h-3.5 w-3.5" />
                </span>
                {c.label}
              </div>
              <div className="mt-4 flex items-baseline gap-1.5">
                <div className="text-3xl font-semibold tracking-tight">{c.cur}</div>
                <div className="text-xs text-muted-foreground">/ {c.target} {c.unit}</div>
              </div>
              <Progress value={pct} className="h-1.5 mt-3" />
              <div className="mt-2 text-[11px] text-muted-foreground">{Math.round(pct)}% de l'objectif</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
