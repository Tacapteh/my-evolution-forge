import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/forge/AppShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForge, totalXP, computeStreak } from "@/lib/forge-store";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { Smartphone, RefreshCw, Copy, Check, Upload, Download, Key } from "lucide-react";

export const Route = createFileRoute("/parametres")({
  component: SettingsPage,
  head: () => ({ meta: [{ title: "Paramètres — FORGE" }] }),
});

function SettingsPage() {
  const { state, setState, reset } = useForge();
  const [copied, setCopied] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const daysWithActivity = Object.values(state.days).filter((d) => Object.values(d.checked).some(Boolean)).length;
  const daysMissed = Object.values(state.days).filter((d) => d.checked && Object.values(d.checked).every((v) => !v)).length;

  const currentToken = state.healthToken || "my-super-secret-token";

  const generateRandomToken = () => {
    const newToken = "forge-" + Math.random().toString(36).substring(2, 10);
    setState({ ...state, healthToken: newToken });
    toast.success("Nouveau Token de synchronisation généré !");
  };

  const copyToken = () => {
    navigator.clipboard.writeText(currentToken);
    setCopied(true);
    toast.success("Token copié dans le presse-papier !");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleForceSync = async () => {
    setSyncing(true);
    try {
      // 1. Send current state to Cloud
      const pushRes = await fetch("/api/sync-state", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Sync-Token": currentToken,
        },
        body: JSON.stringify(state),
      });

      if (!pushRes.ok) {
        throw new Error("Échec de l'envoi au cloud");
      }

      // 2. Fetch from cloud to ensure sync parity
      const getRes = await fetch("/api/sync-state", {
        headers: {
          "X-Sync-Token": currentToken,
        },
      });

      if (getRes.ok) {
        const cloudState = await getRes.json();
        if (cloudState && cloudState.days) {
          setState({
            ...state,
            ...cloudState,
          });
        }
      }

      toast.success("Synchronisation réussie !", {
        description: "Vos données et votre progression sont synchronisées avec le Cloud.",
      });
    } catch (e: any) {
      toast.error("Erreur de synchronisation", {
        description: e?.message || "Impossible de contacter le serveur cloud.",
      });
    } finally {
      setSyncing(false);
    }
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (imported && typeof imported === "object" && imported.days) {
          setState({
            ...state,
            ...imported,
          });
          toast.success("Données importées avec succès !");
        } else {
          toast.error("Fichier JSON invalide. Format FORGE non reconnu.");
        }
      } catch (err) {
        toast.error("Erreur de lecture du fichier JSON.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div>
      <PageHeader title="Paramètres" subtitle="Personnalise ton compagnon FORGE." />

      <div className="px-4 md:px-8 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="card-forge p-5 space-y-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Profil & Général</div>
          <div>
            <Label className="text-xs">Prénom</Label>
            <Input value={state.userName} onChange={(e) => setState({ ...state, userName: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs">Date cible (tests)</Label>
            <Input type="date" value={state.targetDate} onChange={(e) => setState({ ...state, targetDate: e.target.value })} />
          </div>
        </Card>

        {/* Dynamic Multi-Device Sync Card */}
        <Card className="card-forge p-5 space-y-4 border-primary/40 bg-gradient-to-br from-card via-card to-primary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-primary" />
              <span className="text-[11px] uppercase tracking-wider text-primary font-bold">Synchronisation Multi-Appareils (PC ↔ Mobile)</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">Actif</span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Pour synchroniser automatiquement vos séances et votre progression entre votre PC et votre Mobile, utilisez le **même Token de synchronisation** sur les deux appareils.
          </p>

          <div>
            <Label className="text-xs font-semibold flex items-center justify-between">
              <span>Token de Synchronisation Cloud</span>
              <button
                type="button"
                onClick={generateRandomToken}
                className="text-[10px] text-primary hover:underline flex items-center gap-1"
              >
                <Key className="h-3 w-3" /> Générer un nouveau token
              </button>
            </Label>
            <div className="flex items-center gap-2 mt-1.5">
              <Input
                type="text"
                value={state.healthToken || "my-super-secret-token"}
                onChange={(e) => setState({ ...state, healthToken: e.target.value })}
                placeholder="Ex: theo-forge-2026"
                className="font-mono text-xs bg-background/80"
              />
              <Button variant="outline" size="icon" onClick={copyToken} title="Copier le token">
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5">
              💡 Renseignez ce même token dans les Paramètres de votre téléphone mobile pour lier vos comptes.
            </p>
          </div>

          <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-3">
            <Button
              variant="default"
              size="sm"
              onClick={handleForceSync}
              disabled={syncing}
              className="w-full sm:w-auto gap-2 text-xs font-bold"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "Synchronisation..." : "Synchroniser maintenant"}
            </Button>
          </div>
        </Card>

        <Card className="card-forge p-5">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-4 font-semibold">Statistiques globales</div>
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
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3 font-semibold">Sauvegarde & Export Manuel</div>
          <p className="text-sm text-muted-foreground mb-4">
            Vous pouvez aussi exporter manuellement votre progression sous forme de fichier JSON ou importer une sauvegarde existante.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `forge-backup-${new Date().toISOString().slice(0, 10)}.json`;
                a.click();
                URL.revokeObjectURL(url);
                toast.success("Sauvegarde exportée avec succès !");
              }}
            >
              <Download className="h-4 w-4" /> Exporter (JSON)
            </Button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json,application/json"
              className="hidden"
            />

            <Button
              variant="outline"
              className="gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4" /> Importer (JSON)
            </Button>

            <Button
              variant="destructive"
              className="ml-auto"
              onClick={() => {
                if (confirm("Réinitialiser toutes les données ? Cette action est irréversible.")) {
                  reset();
                  toast.success("Toutes les données ont été réinitialisées.");
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
