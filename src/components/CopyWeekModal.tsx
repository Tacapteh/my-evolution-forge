import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, Copy, Repeat, Sparkles, AlertCircle } from "lucide-react";
import { useForge, getMondayISO, addDaysISO } from "@/lib/forge-store";
import { toast } from "sonner";

export interface CopyWeekModalProps {
  open: boolean;
  onClose: () => void;
  sourceMondayISO: string;
  engine: any;
}

export function CopyWeekModal({ open, onClose, sourceMondayISO, engine }: CopyWeekModalProps) {
  const { copyWeekTasks } = useForge();

  // State for target start week offset (in weeks from sourceMondayISO)
  const [startOffsetWeeks, setStartOffsetWeeks] = useState<number>(1); // 1 = Next week

  // State for duration (how many consecutive weeks to populate)
  const [durationWeeks, setDurationWeeks] = useState<number>(4); // 4 = 1 month default

  // Mode: overwrite or append
  const [overwrite, setOverwrite] = useState<boolean>(false);

  if (!open) return null;

  const srcSundayISO = addDaysISO(sourceMondayISO, 6);

  // Compute target Monday ISO
  const targetMondayISO = addDaysISO(sourceMondayISO, startOffsetWeeks * 7);
  const targetLastSundayISO = addDaysISO(targetMondayISO, durationWeeks * 7 - 1);

  const formatShort = (iso: string) => {
    const [y, m, d] = iso.split("-");
    const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
    const monthName = months[parseInt(m, 10) - 1] || m;
    return `${parseInt(d, 10)} ${monthName}`;
  };

  const handleCopy = () => {
    copyWeekTasks(sourceMondayISO, targetMondayISO, {
      overwrite,
      repeatWeeks: durationWeeks,
      fallbackEngine: engine,
    });

    const periodText =
      durationWeeks === 1
        ? "1 semaine"
        : durationWeeks === 4
        ? "1 mois (4 semaines)"
        : durationWeeks === 8
        ? "2 mois (8 semaines)"
        : durationWeeks === 12
        ? "3 mois (12 semaines)"
        : `${durationWeeks} semaines`;

    toast.success("✅ Programme dupliqué avec succès !", {
      description: `Programme copié sur ${periodText} (du ${formatShort(targetMondayISO)} au ${formatShort(targetLastSundayISO)}).`,
      duration: 4000,
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-lg bg-card/95 border-border/80 backdrop-blur-xl text-foreground">
        <DialogHeader className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/15 text-primary">
              <Copy className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold">Dupliquer / Transférer le Programme</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Copiez l'intégralité des séances d'une semaine vers plusieurs semaines ou mois.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Source Week Box */}
          <div className="p-3.5 rounded-xl border border-primary/30 bg-primary/5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Semaine Source à Copier</span>
              <Badge variant="outline" className="border-primary/40 text-primary text-[10px]">
                7 Jours Sélectionnés
              </Badge>
            </div>
            <p className="text-sm font-semibold text-foreground">
              📅 {formatShort(sourceMondayISO)} — {formatShort(srcSundayISO)}
            </p>
          </div>

          {/* Destination Start Week */}
          <div className="space-y-2">
            <Label className="text-xs font-bold text-foreground block">Début du Transfert (Semaine Cible)</Label>
            <Select
              value={String(startOffsetWeeks)}
              onValueChange={(val) => setStartOffsetWeeks(parseInt(val, 10))}
            >
              <SelectTrigger className="h-10 text-xs bg-background">
                <SelectValue placeholder="Choisir la semaine cible" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Semaine suivante (+1 semaine)</SelectItem>
                <SelectItem value="2">Dans 2 semaines (+2 semaines)</SelectItem>
                <SelectItem value="3">Dans 3 semaines (+3 semaines)</SelectItem>
                <SelectItem value="4">Dans 4 semaines (+1 mois)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-[11px] text-muted-foreground">
              Début : <strong className="text-foreground">{formatShort(targetMondayISO)}</strong>
            </p>
          </div>

          {/* Duration / Multi-Month selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-foreground">Durée du Programme (Répéter sur)</Label>
              <span className="text-[11px] font-bold text-primary flex items-center gap-1">
                <Repeat className="h-3 w-3" />
                {durationWeeks >= 4 ? `${Math.round(durationWeeks / 4)} mois (${durationWeeks} sem)` : `${durationWeeks} sem`}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {[
                { label: "1 Semaine", weeks: 1 },
                { label: "1 Mois (4 sem)", weeks: 4 },
                { label: "2 Mois (8 sem)", weeks: 8 },
                { label: "3 Mois (12 sem)", weeks: 12 },
              ].map((item) => (
                <Button
                  key={item.weeks}
                  type="button"
                  variant={durationWeeks === item.weeks ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDurationWeeks(item.weeks)}
                  className="text-[11px] h-9 font-semibold"
                >
                  {item.label}
                </Button>
              ))}
            </div>

            {/* Custom weeks input if needed */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-muted-foreground whitespace-nowrap">Ou nombre de semaines exact :</span>
              <Input
                type="number"
                min="1"
                max="52"
                value={durationWeeks}
                onChange={(e) => setDurationWeeks(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="h-8 w-20 text-xs bg-background text-center font-bold"
              />
            </div>
          </div>

          {/* Merge vs Overwrite Mode */}
          <div className="space-y-2 p-3 rounded-xl border border-border/60 bg-background/50">
            <Label className="text-xs font-bold text-foreground block">Mode de Transfert</Label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOverwrite(false)}
                className={`p-2.5 rounded-lg border text-left text-xs font-semibold transition-all ${
                  !overwrite
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border/60 bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="font-bold">➕ Fusionner / Ajouter</div>
                <div className="text-[10px] opacity-80 font-normal mt-0.5">
                  Conserve les exercices existants et ajoute la copie.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setOverwrite(true)}
                className={`p-2.5 rounded-lg border text-left text-xs font-semibold transition-all ${
                  overwrite
                    ? "border-amber-500 bg-amber-500/10 text-foreground"
                    : "border-border/60 bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="font-bold text-amber-400">🔄 Remplacer</div>
                <div className="text-[10px] opacity-80 font-normal mt-0.5">
                  Écrase et remplace les séances des semaines cibles.
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border/60">
          <Button variant="outline" size="sm" onClick={onClose} className="text-xs">
            Annuler
          </Button>
          <Button size="sm" onClick={handleCopy} className="text-xs font-bold gap-1.5 shadow-md">
            <Sparkles className="h-3.5 w-3.5" /> Dupliquer le Programme ({durationWeeks} sem)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
