import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Sparkles, Trophy } from "lucide-react";

// --- Level helpers
export function levelFromXP(xp: number) {
  const level = Math.floor(Math.sqrt(Math.max(0, xp) / 50)) + 1;
  const currentThreshold = 50 * Math.pow(level - 1, 2);
  const nextThreshold = 50 * Math.pow(level, 2);
  const into = xp - currentThreshold;
  const span = nextThreshold - currentThreshold;
  return { level, into, span, pct: Math.min(100, (into / span) * 100), nextThreshold };
}

// --- SectionTitle
export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-3 mb-3">
      <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{children}</div>
      {action}
    </div>
  );
}

// --- ProgressRing
export function ProgressRing({
  value,
  size = 96,
  stroke = 8,
  children,
  className,
}: {
  value: number;
  size?: number;
  stroke?: number;
  children?: ReactNode;
  className?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (Math.max(0, Math.min(100, value)) / 100) * c;
  return (
    <div className={cn("relative inline-grid place-items-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="stroke-muted" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          className="stroke-primary transition-[stroke-dasharray] duration-700 ease-out"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          fill="none"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

// --- ProgressBar (styled)
export function ProgressBar({ value, label, hint }: { value: number; label?: string; hint?: string }) {
  return (
    <div>
      {(label || hint) && (
        <div className="flex items-center justify-between text-xs mb-1.5">
          {label && <span className="text-foreground/90">{label}</span>}
          {hint && <span className="text-muted-foreground tabular-nums">{hint}</span>}
        </div>
      )}
      <Progress value={value} className="h-1.5" />
    </div>
  );
}

// --- StatCard
export function StatCard({
  icon,
  label,
  value,
  suffix,
  accent,
  progress,
  className,
}: {
  icon?: ReactNode;
  label: string;
  value: string | number;
  suffix?: string;
  accent?: boolean;
  progress?: number;
  className?: string;
}) {
  return (
    <Card className={cn("card-forge p-5", className)}>
      <div className="flex items-center gap-2 text-muted-foreground text-[11px] uppercase tracking-[0.14em]">
        {icon && (
          <span className={cn("h-6 w-6 grid place-items-center rounded-md", accent ? "bg-primary/15 text-primary" : "bg-muted")}>
            {icon}
          </span>
        )}
        <span className="truncate">{label}</span>
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <div className={cn("text-3xl font-semibold tracking-tight tabular-nums", accent && "text-primary")}>{value}</div>
        {suffix && <div className="text-xs text-muted-foreground">{suffix}</div>}
      </div>
      {typeof progress === "number" && <Progress value={progress} className="h-1.5 mt-3" />}
    </Card>
  );
}

// --- XPCard
export function XPCard({ totalXP, xpToday }: { totalXP: number; xpToday: number }) {
  const { level, into, span, pct } = levelFromXP(totalXP);
  return (
    <Card className="card-forge p-5">
      <div className="flex items-center gap-2 text-muted-foreground text-[11px] uppercase tracking-[0.14em]">
        <span className="h-6 w-6 grid place-items-center rounded-md bg-primary/15 text-primary">
          <Sparkles className="h-4 w-4" />
        </span>
        Niveau
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <div className="text-3xl font-semibold tracking-tight text-primary tabular-nums">Niv. {level}</div>
        <div className="text-xs text-primary tabular-nums">+{xpToday} XP</div>
      </div>
      <div className="mt-3">
        <Progress value={pct} className="h-1.5" />
        <div className="mt-1.5 text-[11px] text-muted-foreground tabular-nums">
          {into} / {span} XP · {totalXP} total
        </div>
      </div>
    </Card>
  );
}

// --- StreakCard
export function StreakCard({ streak, daysLeft }: { streak: number; daysLeft: number }) {
  return (
    <Card className="card-forge p-5">
      <div className="flex items-center gap-2 text-muted-foreground text-[11px] uppercase tracking-[0.14em]">
        <span className="h-6 w-6 grid place-items-center rounded-md bg-primary/15 text-primary">
          <Flame className="h-4 w-4" />
        </span>
        Régularité
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <div className="text-3xl font-semibold tracking-tight text-primary tabular-nums">{streak}</div>
        <div className="text-xs text-muted-foreground">jours consécutifs</div>
      </div>
      <div className="mt-3 text-[11px] text-muted-foreground">
        J–{daysLeft} avant les tests
      </div>
    </Card>
  );
}

// --- ObjectiveCard
export function ObjectiveCard({
  label,
  current,
  target,
  unit,
  icon,
}: {
  label: string;
  current: number;
  target: number;
  unit: string;
  icon?: ReactNode;
}) {
  const pct = Math.min(100, (current / target) * 100);
  const reached = current >= target;
  return (
    <div className="rounded-xl border border-border bg-background/40 p-3.5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 min-w-0">
          {icon && <span className="text-primary shrink-0">{icon}</span>}
          <span className="text-sm font-medium truncate">{label}</span>
        </div>
        {reached && <Trophy className="h-3.5 w-3.5 text-primary shrink-0" />}
      </div>
      <div className="flex items-baseline justify-between text-xs text-muted-foreground tabular-nums mb-1.5">
        <span>{current} <span className="opacity-60">/ {target} {unit}</span></span>
        <span>{Math.round(pct)}%</span>
      </div>
      <Progress value={pct} className="h-1.5" />
    </div>
  );
}
