import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/forge/AppShell";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForge, todayISO } from "@/lib/forge-store";
import { toast } from "sonner";

export const Route = createFileRoute("/journal")({
  component: JournalPage,
  head: () => ({ meta: [{ title: "Journal — FORGE" }] }),
});

function JournalPage() {
  const { state, setJournal } = useForge();
  const [date, setDate] = useState(todayISO());
  const j = state.days[date]?.journal ?? {};

  const setField = (k: string, v: any) => setJournal(date, { ...j, [k]: v });

  const sliderRow = (key: string, label: string, min = 1, max = 10) => (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label className="text-xs">{label}</Label>
        <span className="text-sm text-primary font-medium tabular-nums">{(j as any)[key] ?? "—"}</span>
      </div>
      <Slider
        value={[(j as any)[key] ?? Math.round((min + max) / 2)]}
        min={min}
        max={max}
        step={1}
        onValueChange={(v) => setField(key, v[0])}
      />
    </div>
  );

  const recent = Object.entries(state.days)
    .filter(([, d]) => d.journal && Object.keys(d.journal).length > 0)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 10);

  return (
    <div>
      <PageHeader title="Journal" subtitle="Note l'invisible : énergie, humeur, sommeil, douleurs." />

      <div className="px-4 md:px-8 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="card-forge p-5 lg:col-span-2 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <Label className="text-xs">Sommeil (h)</Label>
              <Input
                type="number"
                step="0.5"
                value={j.sleep ?? ""}
                onChange={(e) => setField("sleep", parseFloat(e.target.value) || undefined)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {sliderRow("energy", "Énergie")}
            {sliderRow("fatigue", "Fatigue")}
            {sliderRow("mood", "Humeur")}
            {sliderRow("pain", "Douleurs", 0, 10)}
          </div>

          <div>
            <Label className="text-xs">Hydratation (L)</Label>
            <Input
              type="number"
              step="0.1"
              value={j.hydration ?? ""}
              onChange={(e) => setField("hydration", parseFloat(e.target.value) || undefined)}
            />
          </div>

          <div>
            <Label className="text-xs">Commentaires</Label>
            <Textarea
              rows={5}
              value={j.notes ?? ""}
              onChange={(e) => setField("notes", e.target.value)}
              placeholder="Comment s'est passée la journée ?"
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={() => toast.success("Journal enregistré")}>Enregistrer</Button>
          </div>
        </Card>

        <Card className="card-forge p-5">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">Journées récentes</div>
          {recent.length === 0 ? (
            <div className="text-sm text-muted-foreground">Aucune entrée pour l'instant.</div>
          ) : (
            <ul className="space-y-3">
              {recent.map(([d, day]) => (
                <li key={d} className="rounded-lg border border-border bg-background/40 p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">{d}</div>
                    <div className="text-xs">
                      {day.journal?.energy != null && <span className="text-primary mr-2">E {day.journal.energy}</span>}
                      {day.journal?.mood != null && <span className="text-primary">H {day.journal.mood}</span>}
                    </div>
                  </div>
                  {day.journal?.notes && (
                    <div className="text-xs mt-1.5 text-muted-foreground line-clamp-2">{day.journal.notes}</div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
