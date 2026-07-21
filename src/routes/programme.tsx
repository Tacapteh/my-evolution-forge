import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/forge/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useForge, tasksForDate, dayTemplate, toISO, dowMon } from "@/lib/forge-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/programme")({
  component: ProgrammePage,
  head: () => ({ meta: [{ title: "Programme — FORGE" }] }),
});

function startOfWeek(d: Date) {
  const nd = new Date(d);
  const dow = dowMon(nd); // 1..7
  nd.setDate(nd.getDate() - (dow - 1));
  nd.setHours(12, 0, 0, 0);
  return nd;
}

function ProgrammePage() {
  const { state, toggleTask } = useForge();
  const [anchor, setAnchor] = useState(() => startOfWeek(new Date()));
  const [selectedISO, setSelectedISO] = useState(toISO(new Date()));

  const week = useMemo(() => {
    const days: string[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(anchor);
      d.setDate(anchor.getDate() + i);
      days.push(toISO(d));
    }
    return days;
  }, [anchor]);

  const tpl = dayTemplate(selectedISO);
  const tasks = tasksForDate(selectedISO);
  const day = state.days[selectedISO];
  const done = tasks.filter((t) => day?.checked[t.id]).length;
  const pct = tasks.length ? (done / tasks.length) * 100 : 0;

  const groupedByMoment = useMemo(() => {
    // Simple grouping: swim/run/pull/chair = matin/aprem/soir buckets
    const morning: typeof tasks = [];
    const afternoon: typeof tasks = [];
    const evening: typeof tasks = [];
    tasks.forEach((t, i) => {
      if (i % 3 === 0) morning.push(t);
      else if (i % 3 === 1) afternoon.push(t);
      else evening.push(t);
    });
    return { morning, afternoon, evening };
  }, [tasks]);

  return (
    <div>
      <PageHeader
        title="Programme"
        subtitle="Ta semaine, séance par séance."
        right={
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const nd = new Date(anchor);
                nd.setDate(anchor.getDate() - 7);
                setAnchor(nd);
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const nd = new Date(anchor);
                nd.setDate(anchor.getDate() + 7);
                setAnchor(nd);
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        }
      />

      <div className="px-4 md:px-8 pb-10 space-y-6">
        {/* Week strip */}
        <div className="grid grid-cols-7 gap-2">
          {week.map((iso) => {
            const d = new Date(iso + "T12:00:00");
            const isSel = iso === selectedISO;
            const t = tasksForDate(iso);
            const dd = state.days[iso];
            const ratio = t.length ? t.filter((x) => dd?.checked[x.id]).length / t.length : 0;
            return (
              <button
                key={iso}
                onClick={() => setSelectedISO(iso)}
                className={cn(
                  "rounded-xl border p-3 text-left transition-all",
                  isSel
                    ? "border-primary/50 bg-primary/10"
                    : "border-border bg-card hover:border-primary/20",
                )}
              >
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"][dowMon(d) - 1]}
                </div>
                <div className="text-lg font-semibold mt-0.5">{d.getDate()}</div>
                <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary transition-all" style={{ width: `${ratio * 100}%` }} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Day detail */}
        <Card className="card-forge p-5 md:p-6">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                {tpl.name} — {new Date(selectedISO + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
              </div>
              <h2 className="text-xl md:text-2xl font-semibold mt-1">{tpl.objective}</h2>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">{done}/{tasks.length}</div>
              <div className="text-lg font-semibold text-primary">{Math.round(pct)}%</div>
            </div>
          </div>
          <Progress value={pct} className="h-1.5 mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(
              [
                ["Matin", groupedByMoment.morning],
                ["Après-midi", groupedByMoment.afternoon],
                ["Soir", groupedByMoment.evening],
              ] as const
            ).map(([label, list]) => (
              <div key={label} className="rounded-xl border border-border bg-background/40 p-4">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">{label}</div>
                {list.length === 0 ? (
                  <div className="text-sm text-muted-foreground/60">—</div>
                ) : (
                  <ul className="space-y-2">
                    {list.map((t) => {
                      const checked = !!day?.checked[t.id];
                      return (
                        <li key={t.id} className="flex items-start gap-2.5">
                          <Checkbox checked={checked} onCheckedChange={() => toggleTask(selectedISO, t.id)} className="mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <div className={cn("text-sm", checked && "line-through text-muted-foreground")}>{t.label}</div>
                            {t.detail && <div className="text-[11px] text-muted-foreground">{t.detail}</div>}
                          </div>
                          <span className="text-[11px] text-primary shrink-0">+{t.xp}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
