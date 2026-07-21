import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/forge/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForge, todayISO, dowMon } from "@/lib/forge-store";
import { Play, Pause, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/psychotechniques")({
  component: PsychoPage,
  head: () => ({ meta: [{ title: "Psychotechniques — FORGE" }] }),
});

const TYPES_BY_DAY: Record<number, string> = {
  1: "Calcul mental",
  2: "Mémoire",
  3: "Logique",
  4: "Suites",
  5: "Rotation spatiale",
  6: "Mix rapide",
  7: "Test complet",
};

function PsychoPage() {
  const { state, setPsycho } = useForge();
  const iso = todayISO();
  const day = state.days[iso];
  const defType = TYPES_BY_DAY[dowMon(new Date(iso + "T12:00:00"))];

  const [type, setType] = useState(day?.psycho?.type ?? defType);
  const [score, setScore] = useState<string>(day?.psycho?.score?.toString() ?? "");

  // Timer
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef<number | null>(null);
  useEffect(() => {
    if (running) {
      ref.current = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => {
      if (ref.current) window.clearInterval(ref.current);
    };
  }, [running]);

  const format = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const history = Object.entries(state.days)
    .filter(([, d]) => d.psycho?.score != null || d.psycho?.duration)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 20);

  return (
    <div>
      <PageHeader title="Psychotechniques" subtitle={`Exercice du jour : ${defType}`} />

      <div className="px-4 md:px-8 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="card-forge p-5 lg:col-span-2">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-4">Séance</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Type d'exercice</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.values(TYPES_BY_DAY).filter((v, i, a) => a.indexOf(v) === i).map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Score</Label>
              <Input type="number" value={score} onChange={(e) => setScore(e.target.value)} placeholder="ex : 42" />
            </div>
          </div>

          {/* Chrono */}
          <div className="mt-6 rounded-xl border border-border bg-background/40 p-6 flex flex-col items-center">
            <div className="text-5xl font-mono tabular-nums tracking-tight">{format(seconds)}</div>
            <div className="mt-4 flex items-center gap-2">
              <Button onClick={() => setRunning((r) => !r)} variant={running ? "secondary" : "default"}>
                {running ? <><Pause className="h-4 w-4 mr-2" /> Pause</> : <><Play className="h-4 w-4 mr-2" /> Démarrer</>}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setRunning(false);
                  setSeconds(0);
                }}
              >
                <RotateCcw className="h-4 w-4 mr-2" /> Reset
              </Button>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <Button
              onClick={() => {
                setPsycho(iso, {
                  type,
                  score: score ? parseInt(score) : undefined,
                  duration: seconds || undefined,
                });
              }}
            >
              Enregistrer la séance
            </Button>
          </div>
        </Card>

        <Card className="card-forge p-5">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">Historique</div>
          {history.length === 0 ? (
            <div className="text-sm text-muted-foreground">Rien encore. Lance ton premier chrono.</div>
          ) : (
            <ul className="divide-y divide-border">
              {history.map(([date, d]) => (
                <li key={date} className="py-2.5 text-sm flex items-center gap-3">
                  <div className="text-xs text-muted-foreground w-20 shrink-0">{date.slice(5)}</div>
                  <div className="flex-1 truncate">{d.psycho?.type ?? "—"}</div>
                  <div className="text-xs">
                    {d.psycho?.score != null && <span className="text-primary font-medium">{d.psycho.score}</span>}
                    {d.psycho?.duration != null && (
                      <span className="text-muted-foreground ml-2">{format(d.psycho.duration)}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
