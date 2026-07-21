import type { TaskTemplate } from "@/lib/forge-data";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Waves, Dumbbell, Timer, Footprints, Brain, StretchHorizontal, Droplet, Circle,
} from "lucide-react";

const ICONS = {
  swim: Waves, pull: Dumbbell, chair: Timer, run: Footprints,
  psycho: Brain, stretch: StretchHorizontal, hydration: Droplet, custom: Circle,
} as const;

export function DailyChecklist({
  tasks,
  checked,
  onToggle,
}: {
  tasks: TaskTemplate[];
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  return (
    <ul className="space-y-1.5">
      {tasks.map((t) => {
        const isDone = !!checked[t.id];
        const Icon = ICONS[t.type] ?? Circle;
        return (
          <li
            key={t.id}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 border transition-all",
              isDone
                ? "bg-primary/10 border-primary/25"
                : "border-transparent hover:bg-muted/60 hover:border-border",
            )}
          >
            <Checkbox checked={isDone} onCheckedChange={() => onToggle(t.id)} />
            <span
              className={cn(
                "h-7 w-7 grid place-items-center rounded-md shrink-0 transition-colors",
                isDone ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className={cn("text-sm truncate transition-colors", isDone && "line-through text-muted-foreground")}>
                {t.label}
              </div>
              {t.detail && <div className="text-[11px] text-muted-foreground truncate">{t.detail}</div>}
            </div>
            <span
              className={cn(
                "text-[11px] shrink-0 font-medium tabular-nums transition-colors",
                isDone ? "text-primary" : "text-muted-foreground",
              )}
            >
              +{t.xp} XP
            </span>
          </li>
        );
      })}
    </ul>
  );
}
