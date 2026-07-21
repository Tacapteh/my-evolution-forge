import { useEffect, useMemo, useState } from "react";
import type { TaskTemplate } from "@/lib/forge-data";
import { Button } from "@/components/ui/button";
import { X, Check, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { ProgressRing } from "./primitives";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  tasks: TaskTemplate[];
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
}

export function FocusMode({ open, onClose, tasks, checked, onToggle }: Props) {
  // Start on first undone task
  const firstUndone = useMemo(() => {
    const i = tasks.findIndex((t) => !checked[t.id]);
    return i === -1 ? 0 : i;
  }, [tasks, checked, open]);
  const [idx, setIdx] = useState(firstUndone);

  useEffect(() => {
    if (open) setIdx(firstUndone);
  }, [open, firstUndone]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => Math.min(tasks.length - 1, i + 1));
      if (e.key === "ArrowLeft") setIdx((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, tasks.length, onClose]);

  if (!open || tasks.length === 0) return null;

  const task = tasks[idx];
  const done = tasks.filter((t) => checked[t.id]).length;
  const pct = (done / tasks.length) * 100;
  const isDone = !!checked[task.id];
  const isLast = idx === tasks.length - 1;

  return (
    <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl animate-fade-in">
      <div className="h-full flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 md:px-8 py-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Mode focus</div>
          </div>
          <div className="text-xs text-muted-foreground tabular-nums">
            {idx + 1} / {tasks.length}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Quitter le focus">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Center */}
        <div className="flex-1 grid place-items-center px-6">
          <div className="w-full max-w-lg text-center animate-scale-in">
            <div className="mx-auto mb-8">
              <ProgressRing value={pct} size={148} stroke={10}>
                <div className="text-center leading-none">
                  <div className="text-3xl font-semibold tabular-nums">{done}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">sur {tasks.length}</div>
                </div>
              </ProgressRing>
            </div>

            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Étape {idx + 1}
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance">
              {task.label}
            </h2>
            {task.detail && (
              <p className="mt-4 text-sm md:text-base text-muted-foreground">{task.detail}</p>
            )}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              +{task.xp} XP à la validation
            </div>

            <div className="mt-10 flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIdx((i) => Math.max(0, i - 1))}
                disabled={idx === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Précédent
              </Button>

              <Button
                size="lg"
                onClick={() => {
                  onToggle(task.id);
                  if (!isLast) setTimeout(() => setIdx((i) => i + 1), 250);
                }}
                className={cn("min-w-[180px]", isDone && "bg-primary/70 hover:bg-primary/60")}
              >
                <Check className="h-4 w-4 mr-2" />
                {isDone ? "Décocher" : "Valider l'étape"}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setIdx((i) => Math.min(tasks.length - 1, i + 1))}
                disabled={isLast}
              >
                Suivant <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom progress */}
        <div className="px-5 md:px-8 py-5 border-t border-border/50">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-1">
              {tasks.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setIdx(i)}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-all",
                    checked[t.id]
                      ? "bg-primary"
                      : i === idx
                        ? "bg-primary/50"
                        : "bg-muted hover:bg-muted-foreground/30",
                  )}
                  aria-label={`Aller à ${t.label}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
