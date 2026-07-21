import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/forge/AppShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForge, totalXP, computeStreak } from "@/lib/forge-store";
import { toast } from "sonner";

export const Route = createFileRoute("/parametres")({
  component: SettingsPage,
  head: () => ({ meta: [{ title: "Paramètres — FORGE" }] }),
});

function SettingsPage() {
  const { state, setState, reset } = useForge();

  const daysWithActivity = Object.values(state.days).filter((d) => Object.values(d.checked).some(Boolean)).length;
  const daysMissed = Object.values(state.days).filter((d) => d.checked && Object.values(d.checked).every((v) => !v)).length;

  return (
    <div>
      <PageHeader title="Paramètres" subtitle="Personnalise ton compagnon FORGE." />

      <div className="px-4 md:px-8 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="card-forge p-5 space-y-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Profil</div>
          <div>
            <Label className="text-xs">Prénom</Label>
            <Input value={state.userName} onChange={(e) => setState({ ...state, userName: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs">Date cible (tests)</Label>
            <Input type="date" value={state.targetDate} onChange={(e) => setState({ ...state, targetDate: e.target.value })} />
          </div>
        </Card>

        <Card className="card-forge p-5">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-4">Statistiques globales</div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Stat label="Séances réalisées" value={daysWithActivity} />
            <Stat label="Séances manquées" value={daysMissed} />
            <Stat label="XP totale" value={totalXP(state)} accent />
            <Stat label="Streak actuel" value={computeStreak(state)} accent />
            <Stat label="Records enregistrés" value={state.perf.length} />
            <Stat label="Badges débloqués" value={state.badges.length} />
          </div>
        </Card>

        <Card className="card-forge p-5 lg:col-span-2">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">Données</div>
          <p className="text-sm text-muted-foreground mb-4">
            Tes données sont stockées localement dans ton navigateur. Aucun serveur, aucune analyse.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => {
                const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `forge-${new Date().toISOString().slice(0, 10)}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              Exporter
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirm("Réinitialiser toutes les données ?")) {
                  reset();
                  toast.success("Données réinitialisées");
                }
              }}
            >
              Réinitialiser
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 text-2xl font-semibold tracking-tight ${accent ? "text-primary" : ""}`}>{value}</div>
    </div>
  );
}
