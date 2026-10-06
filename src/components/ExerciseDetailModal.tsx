import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Plus, Calendar, Clock, RotateCcw, Flame, Check, X, Shield } from "lucide-react";
import type { Exercise } from "@/types/exercise";
import { getExerciseImageUrl } from "@/types/exercise";
import { useForge, todayISO, toISO } from "@/lib/forge-store";
import { toast } from "sonner";

export interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  open: boolean;
  onClose: () => void;
}

const DAYS_OF_WEEK = [
  { id: 0, label: "Lundi" },
  { id: 1, label: "Mardi" },
  { id: 2, label: "Mercredi" },
  { id: 3, label: "Jeudi" },
  { id: 4, label: "Vendredi" },
  { id: 5, label: "Samedi" },
  { id: 6, label: "Dimanche" },
];

const MOMENTS = [
  { id: "morning", label: "Matin", icon: "🌅" },
  { id: "afternoon", label: "Après-midi", icon: "☀️" },
  { id: "evening", label: "Soir", icon: "🌙" },
];

export function ExerciseDetailModal({ exercise, open, onClose }: ExerciseDetailModalProps) {
  const { addCustomTask } = useForge();
  const [activeTab, setActiveTab] = useState<"detail" | "add">("detail");

  // Form State for Workout Builder
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0); // 0 = Lundi
  const [moment, setMoment] = useState<"morning" | "afternoon" | "evening">("afternoon");
  const [mode, setMode] = useState<"reps" | "duration">("reps");
  const [sets, setSets] = useState<number>(3);
  const [reps, setReps] = useState<number>(12);
  const [durationSeconds, setDurationSeconds] = useState<number>(45);
  const [restSeconds, setRestSeconds] = useState<number>(60);

  if (!exercise) return null;

  // Compute the target ISO date for the selected day of the current week
  const getTargetISODate = (dayIdx: number) => {
    const now = new Date();
    const currentDay = (now.getDay() + 6) % 7; // Monday = 0
    const diffDays = dayIdx - currentDay;
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + diffDays);
    return toISO(targetDate);
  };

  const handleAddToWorkout = () => {
    const targetISO = getTargetISODate(selectedDayIndex);
    const detailString =
      mode === "reps"
        ? `${sets} séries × ${reps} reps • Repos : ${restSeconds}s`
        : `${sets} séries × ${durationSeconds}s d'isométrie • Repos : ${restSeconds}s`;

    const mappedCategoryType = (() => {
      const cat = (exercise.category || "").toLowerCase();
      if (cat.includes("cardio")) return "run";
      if (cat.includes("stretch")) return "stretch";
      if (cat.includes("swim")) return "swim";
      return "pull";
    })();

    addCustomTask(targetISO, {
      label: exercise.name,
      type: mappedCategoryType,
      detail: detailString,
      moment,
      estimatedMinutes: 15,
      rest: `${restSeconds}s`,
      steps: exercise.instructions.length > 0 ? exercise.instructions : [exercise.name],
      xp: 25,
      exerciseId: exercise.id,
    });

    const dayName = DAYS_OF_WEEK.find((d) => d.id === selectedDayIndex)?.label ?? "Jour";
    const momentName = MOMENTS.find((m) => m.id === moment)?.label ?? "Créneau";

    toast.success("Exercice ajouté à ton programme !", {
      description: `"${exercise.name}" ajouté pour ${dayName} (${momentName}).`,
    });

    onClose();
    setActiveTab("detail");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-border/60 bg-card/95 backdrop-blur-xl p-5 md:p-6 space-y-4">
        <DialogHeader className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-primary/40 text-primary px-2.5 py-0.5 text-xs font-semibold capitalize">
              {exercise.category || "Exercice"}
            </Badge>
            {exercise.equipment && (
              <Badge variant="secondary" className="text-xs font-medium capitalize">
                {exercise.equipment}
              </Badge>
            )}
            {exercise.level && (
              <Badge className="bg-primary/20 text-primary border-none text-[10px] uppercase font-bold">
                {exercise.level}
              </Badge>
            )}
          </div>
          <DialogTitle className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            {exercise.name}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Fiche technique et ajout au planning hebdomadaire.
          </DialogDescription>
        </DialogHeader>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="detail" className="text-xs font-semibold">
              <Dumbbell className="mr-1.5 h-3.5 w-3.5" /> Fiche Exercice
            </TabsTrigger>
            <TabsTrigger value="add" className="text-xs font-semibold">
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Ajouter à ma Semaine (Workout Builder)
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: Detail & Visuals */}
          <TabsContent value="detail" className="space-y-4 pt-3">
            {/* Visual Images (Start & End Position) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {exercise.images.slice(0, 2).map((imgRelative, idx) => (
                <div key={idx} className="relative aspect-4/3 rounded-xl border border-border/80 bg-background/80 overflow-hidden group">
                  <img
                    src={getExerciseImageUrl(imgRelative)}
                    alt={`${exercise.name} - Position ${idx === 0 ? "départ" : "arrivée"}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-background/80 backdrop-blur text-foreground border border-border/40">
                    {idx === 0 ? "1. Position Départ" : "2. Position Arrivée"}
                  </span>
                </div>
              ))}
            </div>

            {/* Targeted Muscles */}
            <div className="space-y-2 rounded-xl border border-border/60 bg-background/40 p-3.5">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5 text-primary" /> Muscles Sollicités
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {exercise.primaryMuscles.map((muscle) => (
                  <Badge key={muscle} className="bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1">
                    🎯 {muscle} (Principal)
                  </Badge>
                ))}
                {exercise.secondaryMuscles.map((muscle) => (
                  <Badge key={muscle} variant="outline" className="text-xs border-border text-muted-foreground px-2.5 py-1">
                    {muscle} (Secondaire)
                  </Badge>
                ))}
              </div>
            </div>

            {/* Numbered Execution Instructions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-primary" /> Consignes d'Exécution Numérotées
              </h4>
              {exercise.instructions.length > 0 ? (
                <ol className="space-y-2 text-xs text-foreground/90">
                  {exercise.instructions.map((stepText, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-background/60 p-2.5 rounded-lg border border-border/40">
                      <span className="h-5 w-5 rounded-full bg-primary/20 text-primary text-[11px] font-bold grid place-items-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed pt-0.5">{stepText}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-xs text-muted-foreground italic">Aucune consigne spécifique enregistrée.</p>
              )}
            </div>

            <Button
              className="w-full h-11 text-sm font-bold gap-2 mt-2"
              onClick={() => setActiveTab("add")}
            >
              <Plus className="h-4 w-4" /> Ajouter à ma Semaine
            </Button>
          </TabsContent>

          {/* TAB 2: Workout Builder Form */}
          <TabsContent value="add" className="space-y-4 pt-3">
            <div className="rounded-xl border border-primary/30 bg-primary/10 p-3.5 text-xs space-y-1">
              <span className="font-bold text-primary block">Configuration de la Séance</span>
              <span className="text-muted-foreground">
                Personnalise les séries, répétitions et le créneau avant de l'injecter dans ton planning FORGE.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Day selection */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground">Jour de la Semaine</Label>
                <Select
                  value={String(selectedDayIndex)}
                  onValueChange={(v) => setSelectedDayIndex(parseInt(v, 10))}
                >
                  <SelectTrigger className="h-10 text-xs bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS_OF_WEEK.map((d) => (
                      <SelectItem key={d.id} value={String(d.id)}>
                        {d.label} ({getTargetISODate(d.id)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Slot / Moment selection */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground">Créneau de la Journée</Label>
                <Select value={moment} onValueChange={(v) => setMoment(v as any)}>
                  <SelectTrigger className="h-10 text-xs bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MOMENTS.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.icon} {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Mode Toggle (Reps vs Duration) */}
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs font-bold text-foreground">Type d'Objectif</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={mode === "reps" ? "default" : "outline"}
                    size="sm"
                    className="text-xs font-semibold h-9"
                    onClick={() => setMode("reps")}
                  >
                    Répétitions (reps)
                  </Button>
                  <Button
                    type="button"
                    variant={mode === "duration" ? "default" : "outline"}
                    size="sm"
                    className="text-xs font-semibold h-9"
                    onClick={() => setMode("duration")}
                  >
                    Isométrie (secondes)
                  </Button>
                </div>
              </div>

              {/* Sets */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground">Nombre de Séries</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={sets}
                  onChange={(e) => setSets(parseInt(e.target.value, 10) || 1)}
                  className="h-10 text-xs bg-background"
                />
              </div>

              {/* Reps or Duration */}
              {mode === "reps" ? (
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-foreground">Répétitions par Série</Label>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={reps}
                    onChange={(e) => setReps(parseInt(e.target.value, 10) || 1)}
                    className="h-10 text-xs bg-background"
                  />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-foreground">Temps de Maintien (secondes)</Label>
                  <Input
                    type="number"
                    min="5"
                    max="600"
                    value={durationSeconds}
                    onChange={(e) => setDurationSeconds(parseInt(e.target.value, 10) || 5)}
                    className="h-10 text-xs bg-background"
                  />
                </div>
              )}

              {/* Rest Seconds */}
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs font-bold text-foreground">Temps de Repos entre Séries (secondes)</Label>
                <Input
                  type="number"
                  min="0"
                  max="300"
                  step="15"
                  value={restSeconds}
                  onChange={(e) => setRestSeconds(parseInt(e.target.value, 10) || 0)}
                  className="h-10 text-xs bg-background"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setActiveTab("detail")} className="text-xs">
                Retour
              </Button>
              <Button size="sm" onClick={handleAddToWorkout} className="text-xs font-bold gap-1.5 px-5">
                <Check className="h-4 w-4" /> Valider & Injecter au Planning
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
