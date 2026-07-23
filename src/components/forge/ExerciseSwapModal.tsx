import { useState } from "react";
import {
  Dumbbell,
  Shield,
  Gem,
  Armchair,
  Timer,
  Activity,
  Check,
  RotateCcw,
  X,
  Sparkles,
  Info,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { TrainingTask } from "@/types/training";

export interface ExerciseSwapModalProps {
  open: boolean;
  onClose: () => void;
  dateISO: string;
  moment: string;
  momentLabel: string;
  currentTask?: TrainingTask | null;
  userMaxPull: number;
  userMaxChair: number;
  userMaxPush: number;
  onSelectAlternative: (swapId: string) => void;
  onReset: () => void;
}

export function ExerciseSwapModal({
  open,
  onClose,
  dateISO,
  moment,
  momentLabel,
  currentTask,
  userMaxPull,
  userMaxChair,
  userMaxPush,
  onSelectAlternative,
  onReset,
}: ExerciseSwapModalProps) {
  if (!open) return null;

  // Déterminer l'intention de la séance à partir du type et du label de la tâche courante
  const taskLabel = currentTask?.label ?? "";
  const taskType = currentTask?.type ?? "pull";

  const isPyramid = taskLabel.toLowerCase().includes("pyramide");
  const isDegressive = taskLabel.toLowerCase().includes("dégressif") || taskLabel.toLowerCase().includes("degressif");
  const isSubmax = taskLabel.toLowerCase().includes("sous-maximal") || taskLabel.toLowerCase().includes("séries réparties");
  const isIso = taskType === "chair" || taskLabel.toLowerCase().includes("chaise") || taskLabel.toLowerCase().includes("gainage");

  let intentionName = "Séries réparties";
  if (isPyramid) intentionName = "Format Pyramidal (Montée & Descente)";
  else if (isDegressive) intentionName = "Format Dégressif (Épuisement)";
  else if (isIso) intentionName = "Format Isométrique (Maintien continu)";
  else if (isSubmax) intentionName = "Format Séries Réparties (Sous-maximal)";

  // Générer les répétitions adaptées dynamiquement au Max utilisateur
  const pPushMax = Math.max(12, userMaxPush);
  const peakPush = Math.max(8, Math.round(pPushMax * 0.40));
  const pyramidPushStr = `${Math.round(peakPush * 0.2)}-${Math.round(peakPush * 0.5)}-${Math.round(peakPush * 0.8)}-${peakPush}-${Math.round(peakPush * 0.8)}-${Math.round(peakPush * 0.5)}-${Math.round(peakPush * 0.2)}`;
  const submaxPushReps = Math.max(6, Math.round(pPushMax * 0.60));
  const degressivePushStr = `${Math.round(pPushMax * 0.6)}-${Math.round(pPushMax * 0.5)}-${Math.round(pPushMax * 0.4)}-${Math.round(pPushMax * 0.3)}-${Math.round(pPushMax * 0.2)}`;

  // Formats d'isométrie (Chaise / Gainage)
  const chairMax = Math.max(45, userMaxChair);
  const submaxChairSecs = Math.max(30, Math.round(chairMax * 0.70));
  const pyramidChairStr = `${Math.round(chairMax * 0.4)}s - ${Math.round(chairMax * 0.7)}s - ${Math.round(chairMax * 0.9)}s - ${Math.round(chairMax * 0.7)}s - ${Math.round(chairMax * 0.4)}s`;
  const degressiveChairStr = `${Math.round(chairMax * 0.8)}s - ${Math.round(chairMax * 0.65)}s - ${Math.round(chairMax * 0.5)}s - ${Math.round(chairMax * 0.35)}s`;

  // Construire la liste des alternatives selon le type et l'intention (AUCUN DIPS)
  const alternatives: Array<{
    id: string;
    title: string;
    icon: any;
    badge: string;
    structure: string;
    tempo: string;
    rest: string;
    formConsignes?: string;
    detail: string;
  }> = [];

  if (taskType === "pull" || taskType === "custom" || taskLabel.toLowerCase().includes("traction") || taskLabel.toLowerCase().includes("pompe") || taskLabel.toLowerCase().includes("poussée") || taskLabel.toLowerCase().includes("renforcement") || taskLabel.toLowerCase().includes("bras")) {
    const isPush = taskLabel.toLowerCase().includes("pompe") || taskLabel.toLowerCase().includes("poussée") || taskLabel.toLowerCase().includes("triceps");

    if (isPush) {
      // Alternatives Poussée & Triceps (Bloc Principal & Module Finisher Inter-Modules)
      const structPush = isPyramid
        ? `Pyramide : ${pyramidPushStr} reps`
        : isDegressive
        ? `Dégressif : ${degressivePushStr} reps`
        : `5 séries × ${submaxPushReps} reps`;

      alternatives.push({
        id: "pompes_militaires",
        title: "Pompes Militaires",
        icon: Shield,
        badge: "Polyarticulaire / Pectoraux & Triceps",
        structure: structPush,
        tempo: "Tempo 2010 (2s descente, 0s pause, 1s montée, 0s pause)",
        rest: "Repos strict : 90s",
        formConsignes: "Coudes orientés à 45° par rapport au tronc, corps parfaitement gainé, poitrine effleurant le sol à chaque répétition.",
        detail: `Exercice polyarticulaire de poussée. Basé sur Max Pompes = ${pPushMax}.`,
      });

      alternatives.push({
        id: "pompes_diamant",
        title: "Pompes Diamant",
        icon: Gem,
        badge: "Polyarticulaire Heavy / Triceps & Sternum",
        structure: structPush,
        tempo: "Tempo 2010 (2s descente, 0s pause, 1s montée, 0s pause)",
        rest: "Repos strict : 90s",
        formConsignes: "Mains jointes en forme de diamant sous le sternum, coudes collés au corps lors de la descente.",
        detail: `Travail ciblé sur les triceps et le sternum. Basé sur Max Pompes = ${pPushMax}.`,
      });

      alternatives.push({
        id: "pompes_declinees",
        title: "Pompes Déclinées sur chaise",
        icon: Armchair,
        badge: "Polyarticulaire / Haut de poitrine & Épaules",
        structure: structPush,
        tempo: "Tempo 2010 (2s descente, 0s pause, 1s montée, 0s pause)",
        rest: "Repos strict : 90s",
        formConsignes: "Pieds surélevés sur une chaise/banc, mains au sol largeur d'épaules, corps droit sans creuser le bas du dos.",
        detail: `Accentuation de la charge sur le haut des pectoraux. Basé sur Max Pompes = ${pPushMax}.`,
      });

      alternatives.push({
        id: "bras_triceps_sol",
        title: "Extensions Triceps au Sol (Smart Swap Inter-Module)",
        icon: Dumbbell,
        badge: "Isolation Triceps / Inter-Module Finisher ↔ Main",
        structure: `5 séries × ${Math.max(4, Math.round(pPushMax * 0.70))} reps (Compensation Isolation)`,
        tempo: "Tempo 3010 (Contrôle strict de la poussée des triceps)",
        rest: "Repos strict : 60s",
        formConsignes: "Planche sur avant-bras, coudes posés au sol, poussée explosive sur les paumes pour tendre complètement les bras.",
        detail: "Mouvement d'isolation remplaçant les pompes polyarticulaires avec compensation de volume (+15%).",
      });
    } else {
      // Alternatives Tirage & Biceps (Bloc Principal & Module Finisher Inter-Modules)
      alternatives.push({
        id: "tractions_lsit",
        title: "Tractions L-Sit (Tirage Horizontal / Core)",
        icon: Dumbbell,
        badge: "Polyarticulaire / Dos, Biceps & Abdos",
        structure: isPyramid
          ? `Pyramide : 1-2-3-4-3-2-1 reps`
          : `5 séries × ${Math.max(3, Math.round(userMaxPull * 0.50))} reps`,
        tempo: "Tempo 2010 (2s descente, 0s pause, 1s montée, 0s pause)",
        rest: "Repos strict : 90s",
        formConsignes: "Suspendu à la barre, lever les jambes tendues à 90° (parallèles au sol), puis effectuer la traction. Option genoux pliés à 90° (Tuck L-Sit) au besoin.",
        detail: `Combinaison de tirage vertical et de gainage abdominal intense. Basé sur Max Tractions = ${userMaxPull}.`,
      });

      alternatives.push({
        id: "bras_biceps_iso",
        title: "Tractions Supination Iso 90° (Smart Swap Inter-Module)",
        icon: Timer,
        badge: "Isolation Biceps / Inter-Module Finisher ↔ Main",
        structure: `5 séries × 20s (Maintien Isométrique)`,
        tempo: "Isométrie 1000 (Blocage strict de l'angle à 90°)",
        rest: "Repos strict : 60s",
        formConsignes: "Prise supination serrée (paumes vers vous), tirer jusqu'à 90° et maintenir le blocage.",
        detail: "Mouvement isométrique d'isolation biceps héritant du format du bloc principal.",
      });

      alternatives.push({
        id: "bras_biceps_neg",
        title: "Tractions Supination Négatives 5s (Excentrique)",
        icon: RotateCcw,
        badge: "Excentrique Biceps / Inter-Module Finisher ↔ Main",
        structure: `5 séries × 5 reps (Descente freinée 5s)`,
        tempo: "Tempo 5010 (5s descente très lente)",
        rest: "Repos strict : 90s",
        formConsignes: "Départ menton au-dessus de la barre, freiner la descente sur 5 secondes complètes.",
        detail: "Travail excentrique lourd ciblant le recrutement des fibres musculaires des biceps.",
      });
    }
  }

  if (taskType === "chair" || isIso) {
    const structIso = isPyramid
      ? `Pyramide : ${pyramidChairStr}`
      : isDegressive
      ? `Dégressif : ${degressiveChairStr}`
      : `4 séries × ${submaxChairSecs}s`;

    alternatives.push({
      id: "gainage_commando",
      title: "Gainage Commando (Coudes ↔ Mains)",
      icon: Shield,
      badge: "Core Dynamique / Abdos & Stabilité",
      structure: `3 séries × ${Math.max(25, Math.round(chairMax * 0.70))}s`,
      tempo: "Dynamique contrôlé",
      rest: "Repos strict : 60s",
      formConsignes: "Départ en planche sur coudes, montée alternative sur bras tendus sans balancement du bassin.",
      detail: "Gainage dynamique du tronc en remplacement de la chaise statique.",
    });

    alternatives.push({
      id: "squat_iso",
      title: "Squat Isométrique (Mur)",
      icon: Timer,
      badge: "Isométrie / Quadriceps & Fessiers",
      structure: structIso,
      tempo: "Isométrie 1000 (Maintien statique continu à 90°)",
      rest: "Repos strict : 60s",
      formConsignes: "Dos plaqué au mur, cuisses parallèles au sol à 90° exacts, mains libres sans appui sur les cuisses.",
      detail: `Renforcement isométrique pur des membres inférieurs. Basé sur Record = ${chairMax}s.`,
    });
  }

  // Toujours ajouter les options cardio si pertinent
  if (taskType === "swim" || taskType === "run") {
    alternatives.push({
      id: "natation",
      title: "Natation — 1000m continu & éducatifs",
      icon: Activity,
      badge: "Aquatique / Cardiorespiratoire",
      structure: "Bloc continu 1000m",
      tempo: "Allure régulée 70-75% VMA",
      rest: "30s entre éducatifs",
      detail: "Endurance respiratoire & aisance aquatique.",
    });
    alternatives.push({
      id: "course",
      title: "Course à pied — Endurance Fondamentale",
      icon: Activity,
      badge: "Cardio / Endurance",
      structure: "45 min continu",
      tempo: "Aisance respiratoire (75% VMA)",
      rest: "Marche 2 min au besoin",
      detail: "Base d'endurance fondamentale sans traumatisme.",
    });
    alternatives.push({
      id: "fractionne",
      title: "Course — Fractionné court 30/30",
      icon: Activity,
      badge: "Cardio / VMA Spécifique",
      structure: "12 × (30s rapide / 30s trotté)",
      tempo: "100% VMA sur l'effort",
      rest: "30s trotté actif",
      detail: "Développement du VMA et soutien de la vitesse.",
    });
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-primary/30 bg-card/95 backdrop-blur-xl p-6">
        <DialogHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="border-primary/40 text-primary px-3 py-1">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Système Intelligent de Remplacement
            </Badge>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Modifier l'exercice ({momentLabel})
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            L'alternative choisie conserve <span className="text-primary font-semibold">STRICTEMENT l'intention de la séance</span> et s'adapte à ton niveau d'après ton Test Max.
          </DialogDescription>
        </DialogHeader>

        {/* Bannière Intention de la Séance */}
        <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 space-y-2.5 my-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Info className="h-4 w-4" />
            <span>Intention Détectée : {intentionName}</span>
          </div>
          <div className="text-xs text-foreground/90 font-medium">
            Exercice actuel : <span className="font-bold">{taskLabel || "Activité programmée"}</span>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
            <span>• Max Tractions: <strong className="text-foreground">{userMaxPull} reps</strong></span>
            <span>• Max Chaise: <strong className="text-foreground">{userMaxChair}s</strong></span>
            <span>• Max Pompes (calculé): <strong className="text-foreground">{pPushMax} reps</strong></span>
          </div>
        </div>

        {/* Liste des alternatives intelligentes */}
        <div className="space-y-3 my-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Alternatives Adaptées (Intention préservée)
          </h4>

          {alternatives.map((alt) => {
            const Icon = alt.icon;

            return (
              <Card
                key={alt.id}
                onClick={() => {
                  onSelectAlternative(alt.id);
                  onClose();
                }}
                className="p-4 border-border/80 bg-background/50 hover:bg-primary/10 hover:border-primary/50 transition-all cursor-pointer group space-y-2.5 relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/15 text-primary grid place-items-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                        {alt.title}
                      </div>
                      <span className="text-[10px] font-semibold text-muted-foreground block">
                        {alt.badge}
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[10px] font-bold shrink-0">
                    Sélectionner
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-2 border-t border-border/40 font-medium">
                  <div className="bg-card/60 p-2 rounded border border-border/40">
                    <span className="text-[10px] text-muted-foreground block font-bold uppercase">Structure</span>
                    <span className="text-primary font-semibold">{alt.structure}</span>
                  </div>
                  <div className="bg-card/60 p-2 rounded border border-border/40">
                    <span className="text-[10px] text-muted-foreground block font-bold uppercase">Tempo Exact</span>
                    <span className="text-foreground">{alt.tempo}</span>
                  </div>
                  <div className="bg-card/60 p-2 rounded border border-border/40">
                    <span className="text-[10px] text-muted-foreground block font-bold uppercase">Repos Strict</span>
                    <span className="text-foreground">{alt.rest}</span>
                  </div>
                </div>

                {alt.formConsignes && (
                  <div className="text-[11px] bg-muted/30 p-2 rounded border border-border/30 text-muted-foreground italic">
                    💡 <strong className="text-foreground">Consignes de forme :</strong> {alt.formConsignes}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border/60">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onReset();
              onClose();
            }}
            className="text-xs text-muted-foreground hover:text-foreground gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Réinitialiser l'exercice d'origine
          </Button>
          <Button variant="outline" size="sm" onClick={onClose} className="text-xs">
            Annuler
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
