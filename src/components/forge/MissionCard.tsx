import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Clock, Flag } from "lucide-react";
import type { TaskTemplate } from "@/lib/forge-data";
import { ProgressRing } from "./primitives";

interface Props {
  dayName: string;
  objective: string;
  tasks: TaskTemplate[];
  done: number;
  onStart: () => void;
}

// Rough estimated duration per task type (minutes)
const DURATION: Record<string, number> = {
  swim: 45, run: 40, pull: 15, chair: 10, psycho: 20, stretch: 10, hydration: 2, custom: 10,
};

export function MissionCard({ dayName, objective, tasks, done, onStart }: Props) {
  const pct = tasks.length ? (done / tasks.length) * 100 : 0;
  const remaining = tasks.length - done;
  const duration = tasks.reduce((s, t) => s + (DURATION[t.type] ?? 10), 0);
  const priority = tasks.some((t) => t.type === "run" || t.type === "swim") ? "Haute" : "Normale";
  const allDone = tasks.length > 0 && done === tasks.length;

  return (
    <Card className="card-forge p-5 md:p-7 relative overflow-hidden">
      <div className="absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

      <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="border-primary/30 text-primary text-[10px] uppercase tracking-wider">
              Mission du jour
            </Badge>
            <span className="text-[11px] text-muted-foreground">{dayName}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-balance">{objective}</h2>
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />~{duration} min</span>
            <span className="inline-flex items-center gap-1.5"><Flag className="h-3.5 w-3.5" />Priorité {priority}</span>
            <span className="hidden sm:inline">{tasks.length} tâches</span>
          </div>
        </div>

        <ProgressRing value={pct} size={92} stroke={8}>
          <div className="text-center leading-none">
            <div className="text-xl font-semibold tabular-nums">{Math.round(pct)}%</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">{done}/{tasks.length}</div>
          </div>
        </ProgressRing>
      </div>

      <div className="relative mt-5">
        <Progress value={pct} className="h-1.5" />
      </div>

      <div className="relative mt-5 flex items-center justify-between gap-3">
        <div className="text-xs text-muted-foreground">
          {allDone ? "Séance terminée. Bien joué." : `${remaining} étape${remaining > 1 ? "s" : ""} à valider`}
        </div>
        <Button size="lg" onClick={onStart} disabled={allDone} className="shadow-sm">
          <Play className="h-4 w-4 mr-2" />
          {allDone ? "Séance complète" : done > 0 ? "Reprendre la séance" : "Commencer la séance"}
        </Button>
      </div>
    </Card>
  );
}
