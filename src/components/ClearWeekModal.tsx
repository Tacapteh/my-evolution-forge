import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Trash2, AlertTriangle, Sparkles } from "lucide-react";
import { useForge, addDaysISO } from "@/lib/forge-store";
import { toast } from "sonner";

export interface ClearWeekModalProps {
  open: boolean;
  onClose: () => void;
  mondayISO: string;
}

export function ClearWeekModal({ open, onClose, mondayISO }: ClearWeekModalProps) {
  const { clearWeekTasks } = useForge();
  const [durationWeeks, setDurationWeeks] = useState<number>(1);

  if (!open) return null;

  const sundayISO = addDaysISO(mondayISO, 6);
  const endSundayISO = addDaysISO(mondayISO, durationWeeks * 7 - 1);

  const formatShort = (iso: string) => {
    const [y, m, d] = iso.split("-");
    const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
    const monthName = months[parseInt(m, 10) - 1] || m;
    return `${parseInt(d, 10)} ${monthName}`;
  };

  const handleClear = () => {
    clearWeekTasks(mondayISO, { durationWeeks });

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

    toast.success("🗑️ Programme effacé avec succès", {
      description: `Séances réinitialisées du ${formatShort(mondayISO)} au ${formatShort(endSundayISO)} (${periodText}).`,
      duration: 4000,
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-md bg-card/95 border-border/80 backdrop-blur-xl text-foreground">
        <DialogHeader className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-destructive/15 text-destructive">
              <Trash2 className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-foreground">Effacer le Programme</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Recommencez sur une base vierge ou réinitialisez les séances d'une période.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Target Period Box */}
          <div className="p-3.5 rounded-xl border border-destructive/30 bg-destructive/5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-destructive uppercase tracking-wider">Période concernée</span>
              <Badge variant="outline" className="border-destructive/40 text-destructive text-[10px]">
                {durationWeeks === 1 ? "1 Semaine" : `${durationWeeks} Semaines`}
              </Badge>
            </div>
            <p className="text-sm font-semibold text-foreground">
              📅 Du {formatShort(mondayISO)} au {formatShort(endSundayISO)}
            </p>
          </div>

          {/* Duration Selector */}
          <div className="space-y-2">
            <Label className="text-xs font-bold text-foreground block">Période à effacer</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {[
                { label: "1 Semaine", weeks: 1 },
                { label: "1 Mois (4 sem)", weeks: 4 },
                { label: "2 Mois (8 sem)", weeks: 8 },
                { label: "3 Mois (12 sem)", weeks: 12 },
              ].map((item) => (
                <Button
                  key={item.weeks}
                  type="button"
                  variant={durationWeeks === item.weeks ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => setDurationWeeks(item.weeks)}
                  className="text-[11px] h-9 font-semibold"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2 p-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-400" />
            <span>
              Cette action supprimera tous les exercices programmés sur la période sélectionnée. Les données de santé et l'historique des séances terminées ne seront pas affectés.
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border/60">
          <Button variant="outline" size="sm" onClick={onClose} className="text-xs">
            Annuler
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleClear}
            className="text-xs font-bold gap-1.5 shadow-md"
          >
            <Trash2 className="h-3.5 w-3.5" /> Effacer les séances ({durationWeeks} sem)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
