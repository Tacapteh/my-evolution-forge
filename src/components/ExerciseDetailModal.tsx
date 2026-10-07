import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Plus, Calendar, Clock, Flame, Check, Shield, Star, Zap } from "lucide-react";
import type { Exercise } from "@/types/exercise";
import { getExerciseImageUrl } from "@/types/exercise";
import type { UnifiedExercise } from "@/lib/exercise-catalog-loader";
import { useForge, todayISO, toISO } from "@/lib/forge-store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface ExerciseDetailModalProps {
  exercise: (Exercise & Partial<UnifiedExercise>) | null;
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

export function isCardioExercise(exercise: (Exercise & Partial<UnifiedExercise>) | null): boolean {
  if (!exercise) return false;
  const cat = (exercise.category || "").toLowerCase();
  const catFr = (exercise.categoryFr || "").toLowerCase();
  const name = (exercise.name || "").toLowerCase();
  const nameFr = (exercise.nameFr || "").toLowerCase();

  if (
    cat.includes("cardio") ||
    catFr.includes("cardio") ||
    catFr.includes("vma") ||
    cat.includes("swim") ||
    cat.includes("running")
  ) {
    return true;
  }

  const cardioKeywords = [
    "running",
    "jogging",
    "trail",
    "marche",
    "course",
    "cyclisme",
    "bicycling",
    "velo",
    "swimming",
    "natation",
    "luc leger",
    "vma",
    "sprint",
    "ergometre",
    "stairmaster",
    "elliptical",
    "rope jumping",
    "corde à sauter",
    "rowing machine",
    "rameur",
  ];
  return cardioKeywords.some((kw) => name.includes(kw) || nameFr.includes(kw));
}

export function ExerciseDetailModal({ exercise, open, onClose }: ExerciseDetailModalProps) {
  const { state, addCustomTask, toggleFavoriteExercise } = useForge();
  const [activeTab, setActiveTab] = useState<"detail" | "add">("detail");

  // Form State for Workout Builder
  const [selectedDays, setSelectedDays] = useState<number[]>([0]); // 0 = Lundi
  const [moment, setMoment] = useState<"morning" | "afternoon" | "evening">("afternoon");
  const [mode, setMode] = useState<"reps" | "duration">("reps");
  const [sets, setSets] = useState<number>(3);
  const [reps, setReps] = useState<number>(12);
  const [isMaxReps, setIsMaxReps] = useState<boolean>(false);
  const [durationSeconds, setDurationSeconds] = useState<number>(45);

  // Rest Time State (Minutes & Seconds)
  const [restMinutes, setRestMinutes] = useState<number>(1);
  const [restSecondsValue, setRestSecondsValue] = useState<number>(0);

  // Cardio Specific Form State
  const [cardioDistance, setCardioDistance] = useState<number>(5);
  const [cardioUnit, setCardioUnit] = useState<"km" | "m">("km");
  const [cardioDurationMinutes, setCardioDurationMinutes] = useState<number>(45);

  if (!exercise) return null;

  const isCardio = isCardioExercise(exercise);
  const isFavorite = (state.favoriteExercises ?? []).includes(exercise.id);

  const displayName = exercise.nameFr || exercise.name;
  const primaryMusclesList = exercise.primaryMusclesFr || exercise.primaryMuscles || [];
  const secondaryMusclesList = exercise.secondaryMusclesFr || exercise.secondaryMuscles || [];
  const equipmentLabel = exercise.equipmentFr || exercise.equipment || "Poids du corps";
  const categoryLabel = exercise.categoryFr || exercise.category || "Exercice";
  const instructionsList = exercise.instructionsFr || exercise.instructions || [];

  // Day Selection Helpers
  const toggleDay = (dayId: number) => {
    setSelectedDays((prev) =>
      prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId].sort((a, b) => a - b)
    );
  };
  const selectAllDays = () => setSelectedDays([0, 1, 2, 3, 4, 5, 6]);
  const selectWeekdays = () => setSelectedDays([0, 1, 2, 3, 4]);

  // Compute total rest in seconds and human-readable string
  const totalRestSeconds = Math.max(0, restMinutes * 60 + restSecondsValue);
  const formatRestString = () => {
    if (restMinutes > 0 && restSecondsValue > 0) return `${restMinutes} min ${restSecondsValue}s`;
    if (restMinutes > 0) return `${restMinutes} min`;
    return `${restSecondsValue}s`;
  };

  // Compute the target ISO date for a given day index of the current week
  const getTargetISODate = (dayIdx: number) => {
    const now = new Date();
    const currentDay = (now.getDay() + 6) % 7; // Monday = 0
    const diffDays = dayIdx - currentDay;
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + diffDays);
    return toISO(targetDate);
  };

  const handleAddToWorkout = () => {
    if (selectedDays.length === 0) {
      toast.error("Veuillez sélectionner au moins un jour d'entraînement.");
      return;
    }

    let detailString = "";
    let estimatedMinutes = 15;
    let restStr = "";

    if (isCardio) {
      detailString = `${cardioDistance} ${cardioUnit} • Durée estimée : ${cardioDurationMinutes} min`;
      estimatedMinutes = cardioDurationMinutes;
      restStr = "Aisance respiratoire";
    } else {
      restStr = formatRestString();
      if (mode === "reps") {
        detailString = isMaxReps
          ? `${sets} séries × MAX reps (à l'échec) • Repos : ${restStr}`
          : `${sets} séries × ${reps} reps • Repos : ${restStr}`;
      } else {
        detailString = `${sets} séries × ${durationSeconds}s d'isométrie • Repos : ${restStr}`;
      }
    }

    const mappedCategoryType = (() => {
      if (isCardio) {
        const nameLower = (displayName || "").toLowerCase();
        if (nameLower.includes("nage") || nameLower.includes("natat") || nameLower.includes("swim")) return "swim";
        return "run";
      }
      const cat = (exercise.category || "").toLowerCase();
      if (cat.includes("stretch")) return "stretch";
      return "pull";
    })();

    // Loop and add exercise to all selected days
    selectedDays.forEach((dayIdx) => {
      const targetISO = getTargetISODate(dayIdx);
      addCustomTask(targetISO, {
        label: displayName,
        type: mappedCategoryType,
        detail: detailString,
        moment,
        estimatedMinutes,
        rest: restStr,
        steps: instructionsList.length > 0 ? instructionsList : [displayName],
        xp: isCardio ? 35 : 25,
        exerciseId: exercise.id,
      });
    });

    const dayLabels = selectedDays
      .map((dIdx) => DAYS_OF_WEEK.find((d) => d.id === dIdx)?.label)
      .filter(Boolean)
      .join(", ");
    const momentName = MOMENTS.find((m) => m.id === moment)?.label ?? "Créneau";

    toast.success("Exercice ajouté à ton programme !", {
      description: `"${displayName}" ajouté pour ${dayLabels} (${momentName}).`,
    });

    onClose();
    setActiveTab("detail");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-border/60 bg-card/95 backdrop-blur-xl p-5 md:p-6 space-y-4">
        <DialogHeader className="space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="border-primary/40 text-primary px-2.5 py-0.5 text-xs font-semibold capitalize">
                {categoryLabel}
              </Badge>
              <Badge variant="secondary" className="text-xs font-medium capitalize">
                {equipmentLabel}
              </Badge>
              {exercise.levelFr && (
                <Badge className="bg-primary/20 text-primary border-none text-[10px] uppercase font-bold">
                  {exercise.levelFr}
                </Badge>
              )}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                toggleFavoriteExercise(exercise.id);
                toast.success(isFavorite ? "Retiré des favoris" : "Ajouté aux favoris ⭐", { duration: 1500 });
              }}
              className={cn(
                "h-7 text-xs font-bold gap-1.5 px-2.5 transition-all border-amber-500/40",
                isFavorite
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/60"
                  : "text-muted-foreground hover:text-amber-400 hover:border-amber-500/40"
              )}
            >
              <Star className={cn("h-3.5 w-3.5", isFavorite ? "fill-amber-400 text-amber-400" : "")} />
              <span>{isFavorite ? "Favori" : "Favori"}</span>
            </Button>
          </div>

          <DialogTitle className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            {displayName}
          </DialogTitle>
          {exercise.nameFr && exercise.nameFr !== exercise.name && (
            <DialogDescription className="text-xs text-muted-foreground">
              Titre original : {exercise.name}
            </DialogDescription>
          )}
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
            {exercise.images && exercise.images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {exercise.images.slice(0, 2).map((imgRelative, idx) => (
                  <div key={idx} className="relative aspect-4/3 rounded-xl border border-border/80 bg-background/80 overflow-hidden group">
                    <img
                      src={getExerciseImageUrl(imgRelative)}
                      alt={`${displayName} - Position ${idx === 0 ? "départ" : "arrivée"}`}
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
            ) : (
              <div className="p-6 rounded-xl border border-border/60 bg-background/40 text-center text-xs text-muted-foreground space-y-1">
                <Dumbbell className="h-6 w-6 mx-auto text-primary opacity-70" />
                <p className="font-semibold text-foreground">Exercice au poids du corps / Calisthenics</p>
                <p>Consultez les consignes ci-dessous pour exécuter le mouvement.</p>
              </div>
            )}

            {/* Targeted Muscles */}
            <div className="space-y-2 rounded-xl border border-border/60 bg-background/40 p-3.5">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5 text-primary" /> Muscles Sollicités
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {primaryMusclesList.map((muscle) => (
                  <Badge key={muscle} className="bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1">
                    🎯 {muscle} (Principal)
                  </Badge>
                ))}
                {secondaryMusclesList.map((muscle) => (
                  <Badge key={muscle} variant="outline" className="text-xs border-border text-muted-foreground px-2.5 py-1">
                    {muscle} (Secondaire)
                  </Badge>
                ))}
              </div>
            </div>

            {/* Numbered Execution Instructions (100% French) */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-primary" /> Consignes d'Exécution Numérotées (Français)
              </h4>
              {instructionsList && instructionsList.length > 0 ? (
                <ol className="space-y-2 text-xs text-foreground/90">
                  {instructionsList.map((stepText, idx) => (
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
              <span className="font-bold text-primary block">Configuration Multi-Jours & Séances</span>
              <span className="text-muted-foreground">
                {isCardio
                  ? "Sélectionne tes jours d'entraînement et définis la distance et la durée cible de ta séance cardio."
                  : "Sélectionne un ou plusieurs jours d'un coup et personnalise tes séries et temps de repos en minutes/secondes."}
              </span>
            </div>

            <div className="space-y-4 text-xs">
              {/* Multi-Day Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold text-foreground">Jours d'Entraînement (Sélection multiple)</Label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={selectWeekdays}
                      className="text-[10px] text-primary hover:underline font-semibold"
                    >
                      Lun - Ven
                    </button>
                    <span className="text-muted-foreground/40">•</span>
                    <button
                      type="button"
                      onClick={selectAllDays}
                      className="text-[10px] text-primary hover:underline font-semibold"
                    >
                      Tous les jours
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1.5">
                  {DAYS_OF_WEEK.map((d) => {
                    const isSelected = selectedDays.includes(d.id);
                    return (
                      <Button
                        key={d.id}
                        type="button"
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleDay(d.id)}
                        className={`h-9 px-1 text-xs font-bold ${
                          isSelected ? "bg-primary text-primary-foreground shadow-sm" : "border-border/80"
                        }`}
                      >
                        {d.label.slice(0, 3)}
                      </Button>
                    );
                  })}
                </div>
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

              {/* CARDIO MODE vs STRENGTH MODE */}
              {isCardio ? (
                <div className="space-y-4">
                  {/* Target Distance */}
                  <div className="space-y-2 rounded-xl border border-border/60 bg-background/40 p-3.5">
                    <Label className="text-xs font-bold text-foreground block">
                      Distance Cible
                    </Label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="200"
                        value={cardioDistance}
                        onChange={(e) => setCardioDistance(Math.max(0.1, parseFloat(e.target.value) || 1))}
                        className="h-10 text-xs bg-background flex-1"
                      />
                      <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border/60">
                        <Button
                          type="button"
                          variant={cardioUnit === "km" ? "default" : "ghost"}
                          size="sm"
                          className="h-8 text-xs font-bold px-3"
                          onClick={() => setCardioUnit("km")}
                        >
                          km
                        </Button>
                        <Button
                          type="button"
                          variant={cardioUnit === "m" ? "default" : "ghost"}
                          size="sm"
                          className="h-8 text-xs font-bold px-3"
                          onClick={() => setCardioUnit("m")}
                        >
                          mètres (m)
                        </Button>
                      </div>
                    </div>

                    {/* Preset Distance Shortcuts */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-muted-foreground font-medium mr-1">Raccourcis distance :</span>
                      {[
                        { val: 800, unit: "m" as const, label: "800 m" },
                        { val: 1000, unit: "m" as const, label: "1000 m" },
                        { val: 3, unit: "km" as const, label: "3 km" },
                        { val: 5, unit: "km" as const, label: "5 km" },
                        { val: 8, unit: "km" as const, label: "8 km" },
                        { val: 10, unit: "km" as const, label: "10 km" },
                      ].map((p) => (
                        <Button
                          key={p.label}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCardioDistance(p.val);
                            setCardioUnit(p.unit);
                          }}
                          className="h-6 text-[10px] px-2"
                        >
                          {p.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Target Session Duration */}
                  <div className="space-y-2 rounded-xl border border-border/60 bg-background/40 p-3.5">
                    <Label className="text-xs font-bold text-foreground block">
                      Durée Cible de la Séance (Minutes)
                    </Label>
                    <Input
                      type="number"
                      min="5"
                      max="300"
                      value={cardioDurationMinutes}
                      onChange={(e) => setCardioDurationMinutes(Math.max(5, parseInt(e.target.value, 10) || 15))}
                      className="h-10 text-xs bg-background"
                    />

                    {/* Preset Duration Shortcuts */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-muted-foreground font-medium mr-1">Raccourcis durée :</span>
                      {[15, 20, 30, 45, 60, 90].map((m) => (
                        <Button
                          key={m}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setCardioDurationMinutes(m)}
                          className="h-6 text-[10px] px-2"
                        >
                          {m} min
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <div className="flex items-center justify-between">
                          <Label className="text-xs font-bold text-foreground">Répétitions par Série</Label>
                          <Button
                            type="button"
                            variant={isMaxReps ? "default" : "outline"}
                            size="sm"
                            className={cn(
                              "h-6 text-[10px] px-2 font-bold gap-1 transition-all",
                              isMaxReps
                                ? "bg-amber-500 text-black hover:bg-amber-400 shadow-sm"
                                : "border-amber-500/40 text-amber-400 hover:bg-amber-500/10"
                            )}
                            onClick={() => setIsMaxReps((prev) => !prev)}
                          >
                            <Zap className="h-3 w-3" />
                            {isMaxReps ? "Mode MAX (Échec)" : "Passer en MAX"}
                          </Button>
                        </div>

                        {isMaxReps ? (
                          <div className="h-10 px-3 rounded-md border border-amber-500/50 bg-amber-500/15 text-amber-300 font-bold text-xs flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                              <span>MAX reps (Jusqu'à l'échec strict)</span>
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setIsMaxReps(false)}
                              className="h-6 text-[10px] px-1.5 text-amber-300 hover:text-white hover:bg-amber-500/20"
                            >
                              Saisir un nombre
                            </Button>
                          </div>
                        ) : (
                          <Input
                            type="number"
                            min="1"
                            max="100"
                            value={reps}
                            onChange={(e) => setReps(parseInt(e.target.value, 10) || 1)}
                            className="h-10 text-xs bg-background"
                          />
                        )}
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
                  </div>

                  {/* Rest Time (Minutes & Secondes) */}
                  <div className="space-y-2 rounded-xl border border-border/60 bg-background/40 p-3.5">
                    <Label className="text-xs font-bold text-foreground block">
                      Temps de Repos entre Séries (Minutes & Secondes)
                    </Label>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-semibold text-muted-foreground block">Minutes</span>
                        <Input
                          type="number"
                          min="0"
                          max="15"
                          value={restMinutes}
                          onChange={(e) => setRestMinutes(Math.max(0, parseInt(e.target.value, 10) || 0))}
                          className="h-9 text-xs bg-background"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-semibold text-muted-foreground block">Secondes</span>
                        <Input
                          type="number"
                          min="0"
                          max="59"
                          step="5"
                          value={restSecondsValue}
                          onChange={(e) => setRestSecondsValue(Math.max(0, Math.min(59, parseInt(e.target.value, 10) || 0)))}
                          className="h-9 text-xs bg-background"
                        />
                      </div>
                    </div>

                    {/* Preset Rest Buttons */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-muted-foreground font-medium mr-1">Raccourcis :</span>
                      {[
                        { label: "30s", min: 0, sec: 30 },
                        { label: "45s", min: 0, sec: 45 },
                        { label: "1 min", min: 1, sec: 0 },
                        { label: "1m30", min: 1, sec: 30 },
                        { label: "2 min", min: 2, sec: 0 },
                        { label: "3 min", min: 3, sec: 0 },
                      ].map((p) => (
                        <Button
                          key={p.label}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setRestMinutes(p.min);
                            setRestSecondsValue(p.sec);
                          }}
                          className="h-6 text-[10px] px-2"
                        >
                          {p.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setActiveTab("detail")} className="text-xs">
                Retour
              </Button>
              <Button size="sm" onClick={handleAddToWorkout} className="text-xs font-bold gap-1.5 px-5">
                <Check className="h-4 w-4" /> Valider ({selectedDays.length} jour{selectedDays.length > 1 ? "s" : ""})
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
