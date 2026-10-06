import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Dumbbell, Sparkles, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { getExerciseImageUrl } from "@/types/exercise";
import { ExerciseDetailModal } from "./ExerciseDetailModal";
import { loadUnifiedExerciseCatalog, type UnifiedExercise } from "@/lib/exercise-catalog-loader";

const ITEMS_PER_PAGE = 24;

export function ExerciseCatalog() {
  const [exercises, setExercises] = useState<UnifiedExercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMuscle, setSelectedMuscle] = useState<string>("all");
  const [selectedEquipment, setSelectedEquipment] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Modal State
  const [selectedExercise, setSelectedExercise] = useState<UnifiedExercise | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await loadUnifiedExerciseCatalog();
        setExercises(data);
      } catch (err: any) {
        setError(err.message || "Erreur de chargement du catalogue");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Extract unique categories (French), muscles (French) & equipment (French) for faceting
  const allCategoriesFr = useMemo(() => {
    const set = new Set<string>();
    exercises.forEach((ex) => {
      if (ex.categoryFr) set.add(ex.categoryFr);
    });
    return Array.from(set).sort();
  }, [exercises]);

  const allMusclesFr = useMemo(() => {
    const set = new Set<string>();
    exercises.forEach((ex) => {
      ex.primaryMusclesFr?.forEach((m) => set.add(m));
    });
    return Array.from(set).sort();
  }, [exercises]);

  const allEquipmentsFr = useMemo(() => {
    const set = new Set<string>();
    exercises.forEach((ex) => {
      if (ex.equipmentFr) set.add(ex.equipmentFr);
    });
    return Array.from(set).sort();
  }, [exercises]);

  // Filter exercises
  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return exercises.filter((ex) => {
      // Search in French name, English name, muscles, equipment, etc.
      if (query && !ex.searchKey.includes(query)) {
        return false;
      }

      // Category Filter (French)
      if (selectedCategory !== "all" && ex.categoryFr !== selectedCategory) {
        return false;
      }

      // Muscle Filter (French)
      if (selectedMuscle !== "all" && !ex.primaryMusclesFr.includes(selectedMuscle)) {
        return false;
      }

      // Equipment Filter (French)
      if (selectedEquipment !== "all" && ex.equipmentFr !== selectedEquipment) {
        return false;
      }

      // Level Filter
      if (selectedLevel !== "all" && ex.level !== selectedLevel) {
        return false;
      }

      return true;
    });
  }, [exercises, searchQuery, selectedCategory, selectedMuscle, selectedEquipment, selectedLevel]);

  // Pagination logic to prevent mobile DOM slowdown
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginatedExercises = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedMuscle, selectedEquipment, selectedLevel]);

  const handleOpenDetail = (ex: UnifiedExercise) => {
    setSelectedExercise(ex);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 md:p-6 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <Badge variant="outline" className="border-primary/40 text-primary px-3 py-1 text-xs w-fit">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Base Multi-Sources Complète & Traduite en Français
          </Badge>
          <span className="text-xs font-semibold text-primary">
            {filtered.length} exercice{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
          Catalogue d'Exercices (Français & Multi-Sources)
        </h2>
        <p className="text-xs text-muted-foreground max-w-2xl">
          Retrouve les tractions australiennes, calisthenics, musculation, cardio & VMA et préparation militaire. Dédupliqué et traduit en Français.
        </p>
      </div>

      {/* Search Bar & Faceted Filters */}
      <Card className="p-4 md:p-5 border-border/80 bg-card/60 backdrop-blur space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher en Français ou Anglais (ex: Tractions australiennes, Course à pied, VMA, Tapis, Squat...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 text-xs bg-background"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {/* Category Facet Filter (French) */}
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase mb-1 block">
              Catégorie
            </label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-9 text-xs bg-background">
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {allCategoriesFr.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Muscle Facet Filter (French) */}
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase mb-1 block">
              Groupe Musculaire
            </label>
            <Select value={selectedMuscle} onValueChange={setSelectedMuscle}>
              <SelectTrigger className="h-9 text-xs bg-background">
                <SelectValue placeholder="Tous les muscles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les muscles ({exercises.length})</SelectItem>
                {allMusclesFr.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Equipment Facet Filter (French) */}
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase mb-1 block">
              Matériel
            </label>
            <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
              <SelectTrigger className="h-9 text-xs bg-background">
                <SelectValue placeholder="Tout matériel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tout matériel</SelectItem>
                {allEquipmentsFr.map((eq) => (
                  <SelectItem key={eq} value={eq}>
                    {eq}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Level Filter (French) */}
          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase mb-1 block">
              Niveau
            </label>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="h-9 text-xs bg-background">
                <SelectValue placeholder="Tous niveaux" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous niveaux</SelectItem>
                <SelectItem value="beginner">Débutant</SelectItem>
                <SelectItem value="intermediate">Intermédiaire</SelectItem>
                <SelectItem value="expert">Avancé / Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Main Grid View */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="text-sm font-medium">Chargement et fusion des sources d'exercices...</span>
        </div>
      ) : error ? (
        <div className="p-8 text-center rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-sm font-medium">
          ⚠️ {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center rounded-xl border border-border bg-card/40 text-muted-foreground space-y-2">
          <Dumbbell className="h-8 w-8 mx-auto opacity-50" />
          <p className="text-sm font-semibold">Aucun exercice ne correspond à ta recherche.</p>
          <p className="text-xs">Essaie de réinitialiser tes filtres ou la barre de recherche.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedMuscle("all");
              setSelectedEquipment("all");
              setSelectedLevel("all");
            }}
            className="text-xs mt-2"
          >
            Réinitialiser les filtres
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedExercises.map((ex) => (
              <Card
                key={ex.id}
                onClick={() => handleOpenDetail(ex)}
                className="group border-border/70 bg-card/50 hover:bg-card hover:border-primary/50 transition-all cursor-pointer overflow-hidden flex flex-col justify-between space-y-3 p-3"
              >
                {/* Thumbnail Image */}
                <div className="relative aspect-4/3 rounded-lg bg-background/80 overflow-hidden border border-border/40">
                  {ex.images && ex.images.length > 0 ? (
                    <img
                      src={getExerciseImageUrl(ex.images[0])}
                      alt={ex.nameFr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-muted-foreground text-xs p-3 text-center">
                      <Dumbbell className="h-6 w-6 mb-1 text-primary opacity-80" />
                      <span className="text-[10px] text-muted-foreground">Calisthenics / Exercice</span>
                    </div>
                  )}
                  {ex.levelFr && (
                    <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur text-[9px] text-foreground font-bold border-none uppercase">
                      {ex.levelFr}
                    </Badge>
                  )}
                </div>

                {/* Content in French */}
                <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {ex.nameFr}
                    </h3>
                    {ex.nameFr !== ex.name && (
                      <span className="text-[10px] text-muted-foreground/70 block truncate">
                        ({ex.name})
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    {ex.primaryMusclesFr && ex.primaryMusclesFr.length > 0 && (
                      <Badge variant="secondary" className="text-[10px] font-semibold px-2 py-0.5">
                        🎯 {ex.primaryMusclesFr[0]}
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-[10px] border-border text-muted-foreground px-2 py-0.5">
                      {ex.equipmentFr}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-border/60">
              <span className="text-xs text-muted-foreground">
                Page <strong className="text-foreground">{currentPage}</strong> sur {totalPages} ({filtered.length} exercices)
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="h-8 text-xs gap-1"
                >
                  <ChevronLeft className="h-3.5 w-3.5" /> Précédent
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="h-8 text-xs gap-1"
                >
                  Suivant <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal Detail & Workout Builder */}
      <ExerciseDetailModal
        exercise={selectedExercise}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
