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
import { Trash2, Sparkles, Filter, Check } from "lucide-react";
import { BADGES, unlockBadges } from "@/lib/forge-store";
import { AppleHealthDataCard } from "@/components/forge/AppleHealthDataCard";
import { toast } from "sonner";

export const Route = createFileRoute("/performances")({
  component: PerformancesPage,
  head: () => ({ meta: [{ title: "Performances — FORGE" }] }),
});

const TYPES = [
  { v: "pull", l: "Tractions Pronation (reps)" },
  { v: "pull_lsit", l: "Tractions L-Sit (reps)" },
  { v: "pull_supine_iso", l: "Supination Iso 90° (s)" },
  { v: "pull_supine_neg", l: "Supination Négatives (reps)" },
  { v: "push_military", l: "Pompes Militaires (reps)" },
  { v: "push_diamond", l: "Pompes Diamant (reps)" },
  { v: "push_declined", l: "Pompes Déclinées (reps)" },
  { v: "push_triceps", l: "Extensions Triceps Sol (reps)" },
  { v: "chair", l: "Chaise au Mur (s)" },
  { v: "squat", l: "Squats (reps)" },
  { v: "lunge", l: "Fentes (reps/jambe)" },
  { v: "calves", l: "Extensions Mollets (reps)" },
  { v: "commando", l: "Gainage Commando (s)" },
  { v: "luc", l: "Luc Léger (paliers)" },
  { v: "vma", l: "VMA estimée (km/h)" },
  { v: "run5", l: "5 km (min)" },
  { v: "run10", l: "10 km (min)" },
  { v: "weight", l: "Poids (kg)" },
  { v: "hr", l: "Fréquence cardiaque (bpm)" },
  { v: "sleep", l: "Sommeil (h)" },
] as const;

interface CatalogExercise {
  type: (typeof TYPES)[number]["v"];
  label: string;
  category: "pull" | "push" | "legs" | "core" | "cardio" | "health";
  unit: string;
  fallback: number;
  icon: string;
  step?: string;
}

const ALL_CATALOG_EXERCISES: CatalogExercise[] = [
  // Tirage
  { type: "pull", label: "Tractions Pronation", category: "pull", unit: "reps", fallback: 10, icon: "🏋️" },
  { type: "pull_lsit", label: "Tractions L-Sit", category: "pull", unit: "reps", fallback: 6, icon: "🦵" },
  { type: "pull_supine_iso", label: "Supination Iso 90°", category: "pull", unit: "s", fallback: 30, icon: "⏱️" },
  { type: "pull_supine_neg", label: "Supination Négatives", category: "pull", unit: "reps", fallback: 8, icon: "⏳" },

  // Poussée
  { type: "push_military", label: "Pompes Militaires", category: "push", unit: "reps", fallback: 25, icon: "💥" },
  { type: "push_diamond", label: "Pompes Diamant", category: "push", unit: "reps", fallback: 20, icon: "💎" },
  { type: "push_declined", label: "Pompes Déclinées", category: "push", unit: "reps", fallback: 20, icon: "🪑" },
  { type: "push_triceps", label: "Extensions Triceps Sol", category: "push", unit: "reps", fallback: 15, icon: "💪" },

  // Bas du corps
  { type: "chair", label: "Chaise au Mur", category: "legs", unit: "s", fallback: 60, icon: "🧱" },
  { type: "squat", label: "Squats", category: "legs", unit: "reps", fallback: 40, icon: "🦵" },
  { type: "lunge", label: "Fentes", category: "legs", unit: "reps", fallback: 20, icon: "🏃" },
  { type: "calves", label: "Extensions Mollets", category: "legs", unit: "reps", fallback: 30, icon: "🦶" },

  // Core
  { type: "commando", label: "Gainage Commando", category: "core", unit: "s", fallback: 90, icon: "⚡" },

  // Cardio
  { type: "luc", label: "Luc Léger", category: "cardio", unit: "palier", fallback: 7.0, icon: "🔊", step: "0.5" },
  { type: "vma", label: "VMA estimée", category: "cardio", unit: "km/h", fallback: 14.5, icon: "🏃", step: "0.1" },
  { type: "run5", label: "5 km Chrono", category: "cardio", unit: "min", fallback: 25, icon: "⏱️" },
  { type: "run10", label: "10 km Chrono", category: "cardio", unit: "min", fallback: 52, icon: "🏁" },

  // Santé
  { type: "weight", label: "Poids", category: "health", unit: "kg", fallback: 75, icon: "⚖️", step: "0.5" },
  { type: "hr", label: "Fréquence Cardiaque Repos", category: "health", unit: "bpm", fallback: 60, icon: "❤️" },
  { type: "sleep", label: "Sommeil", category: "health", unit: "h", fallback: 8, icon: "😴", step: "0.5" },
];

const CATEGORIES = [
  { id: "all", label: "Tous les exos", icon: "🔥" },
  { id: "pull", label: "Tirage / Dos", icon: "🏋️" },
  { id: "push", label: "Poussée / Bras", icon: "💥" },
  { id: "legs", label: "Bas du corps", icon: "🧱" },
  { id: "core", label: "Core & Abdo", icon: "⚡" },
  { id: "cardio", label: "Cardio & VMA", icon: "🏃" },
  { id: "health", label: "Santé", icon: "🩺" },
] as const;

function PerformancesPage() {
  const { state, addPerf, removePerf } = useForge();
  const [type, setType] = useState<(typeof TYPES)[number]["v"]>("pull");
  const [value, setValue] = useState("");
  const [date, setDate] = useState(todayISO());
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const seriesFor = (t: string) =>
    state.perf
      .filter((p) => p.type === t)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((p) => ({ date: p.date.slice(5), value: p.value }));

  const unlocked = new Set(unlockBadges(state));

  const filteredExercises = ALL_CATALOG_EXERCISES.filter(
    (ex) => selectedCategory === "all" || ex.category === selectedCategory
  );

  return (
    <div>
      <PageHeader title="Performances" subtitle="Historique des records, données réelles et ajustement des maxis." />

      <div className="px-4 md:px-8 pb-10 space-y-6">
        {/* Apple Health Real Data Card Compact */}
        <AppleHealthDataCard compact={true} />

        {/* Catalog Quick Max Entry for ALL exercises in the app */}
        <Card className="rounded-xl border border-primary/30 bg-primary/10 p-4 md:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> Tous les Exercices & Maxis de l'Application
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Renseigne directement tes répétitions et performances ci-dessous pour recalculer ton entraînement.
              </p>
            </div>
            <div className="text-xs text-primary font-semibold shrink-0">
              {ALL_CATALOG_EXERCISES.length} exercices configurés
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-background/60 text-muted-foreground hover:bg-background hover:text-foreground"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Grid of exercise cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pt-1">
            {filteredExercises.map((item) => {
              const currentMax = (() => {
                const list = state.perf.filter((p) => p.type === item.type).map((p) => p.value);
                return list.length > 0 ? Math.max(...list) : item.fallback;
              })();

              return (
                <div key={item.type} className="rounded-lg border border-border bg-background/90 p-3 space-y-2 hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground flex items-center gap-1.5 truncate">
                      <span>{item.icon}</span> <span className="truncate">{item.label}</span>
                    </span>
                    <span className="text-primary font-bold shrink-0">
                      {currentMax} {item.unit}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Input
                      type="number"
                      step={item.step || "1"}
                      placeholder={`Nouveau (${item.unit})`}
                      className="h-8 text-xs bg-card"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const val = parseFloat((e.target as HTMLInputElement).value);
                          if (!isNaN(val) && val > 0) {
                            addPerf({ type: item.type as any, value: val, date: todayISO() });
                            (e.target as HTMLInputElement).value = "";
                            toast.success(`${item.label} mis à jour : ${val} ${item.unit}`);
                          }
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      className="h-8 text-xs shrink-0 px-2.5"
                      onClick={(e) => {
                        const inputEl = (e.currentTarget.previousElementSibling as HTMLInputElement);
                        const val = parseFloat(inputEl.value);
                        if (!isNaN(val) && val > 0) {
                          addPerf({ type: item.type as any, value: val, date: todayISO() });
                          inputEl.value = "";
                          toast.success(`${item.label} mis à jour : ${val} ${item.unit}`);
                        }
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Standard Add form */}
        <Card className="card-forge p-5">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">Enregistrer une date personnalisée</div>
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
                  toast.success("Performance enregistrée avec succès");
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
