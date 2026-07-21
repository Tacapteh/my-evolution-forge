import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/forge/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useForge, todayISO } from "@/lib/forge-store";
import { Trash2 } from "lucide-react";
import { BADGES, unlockBadges } from "@/lib/forge-store";

export const Route = createFileRoute("/performances")({
  component: PerformancesPage,
  head: () => ({ meta: [{ title: "Performances — FORGE" }] }),
});

const TYPES = [
  { v: "pull", l: "Tractions (reps)" },
  { v: "chair", l: "Chaise (s)" },
  { v: "run5", l: "5 km (min)" },
  { v: "run10", l: "10 km (min)" },
  { v: "luc", l: "Luc Léger (paliers)" },
  { v: "weight", l: "Poids (kg)" },
  { v: "hr", l: "Fréquence cardiaque" },
  { v: "sleep", l: "Sommeil (h)" },
] as const;

function PerformancesPage() {
  const { state, addPerf, removePerf } = useForge();
  const [type, setType] = useState<(typeof TYPES)[number]["v"]>("pull");
  const [value, setValue] = useState("");
  const [date, setDate] = useState(todayISO());

  const seriesFor = (t: string) =>
    state.perf
      .filter((p) => p.type === t)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((p) => ({ date: p.date.slice(5), value: p.value }));

  const unlocked = new Set(unlockBadges(state));

  return (
    <div>
      <PageHeader title="Performances" subtitle="Historique des records et courbes d'évolution." />

      <div className="px-4 md:px-8 pb-10 space-y-6">
        {/* Add form */}
        <Card className="card-forge p-5">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-end">
            <div>
              <Label className="text-xs">Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as any)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TYPES.map((t) => (
                    <SelectItem key={t.v} value={t.v}>{t.l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Valeur</Label>
              <Input type="number" step="0.1" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <div>
              <Label className="text-xs">Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <Button
              onClick={() => {
                const n = parseFloat(value);
                if (!isNaN(n)) {
                  addPerf({ type: type as any, value: n, date });
                  setValue("");
                }
              }}
            >
              Enregistrer
            </Button>
          </div>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {TYPES.map((t) => {
            const data = seriesFor(t.v);
            const best = data.length ? Math.max(...data.map((d) => d.value)) : 0;
            return (
              <Card key={t.v} className="card-forge p-5">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{t.l}</div>
                    <div className="text-xl font-semibold mt-0.5">
                      {best || "—"}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{data.length} entrée{data.length > 1 ? "s" : ""}</div>
                </div>
                <div className="h-32">
                  {data.length > 1 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(0 0% 60%)" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: "hsl(0 0% 60%)" }} axisLine={false} tickLine={false} width={30} />
                        <Tooltip
                          contentStyle={{ background: "hsl(0 0% 15%)", border: "1px solid hsl(0 0% 25%)", borderRadius: 8, fontSize: 12 }}
                          labelStyle={{ color: "hsl(0 0% 80%)" }}
                        />
                        <Line type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={2} dot={{ r: 2 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full grid place-items-center text-xs text-muted-foreground/60">Ajoute au moins 2 valeurs</div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent entries */}
        <Card className="card-forge p-5">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">Historique récent</div>
          {state.perf.length === 0 ? (
            <div className="text-sm text-muted-foreground">Aucune performance enregistrée pour le moment.</div>
          ) : (
            <ul className="divide-y divide-border">
              {[...state.perf].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 15).map((p) => (
                <li key={p.id} className="py-2.5 flex items-center gap-3 text-sm">
                  <div className="w-24 text-muted-foreground text-xs">{p.date}</div>
                  <div className="flex-1 truncate">{TYPES.find((t) => t.v === p.type)?.l}</div>
                  <div className="font-medium">{p.value}</div>
                  <Button variant="ghost" size="icon" onClick={() => removePerf(p.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Badges */}
        <Card className="card-forge p-5">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">Badges</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {BADGES.map((b) => {
              const on = unlocked.has(b.id);
              return (
                <div
                  key={b.id}
                  className={`rounded-lg border p-3 transition-all ${on ? "border-primary/40 bg-primary/10" : "border-border bg-background/40 opacity-60"}`}
                >
                  <div className="text-sm font-medium">{b.label}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{b.description}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
