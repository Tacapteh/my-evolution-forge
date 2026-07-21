import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  TrendingUp,
  Trophy,
  Brain,
  BookOpen,
  Settings,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useForge, computeStreak } from "@/lib/forge-store";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, primary: true },
  { to: "/programme", label: "Programme", icon: CalendarDays, primary: true },
  { to: "/progression", label: "Progression", icon: TrendingUp, primary: true },
  { to: "/performances", label: "Performances", icon: Trophy, primary: false },
  { to: "/psychotechniques", label: "Psychotechniques", icon: Brain, primary: false },
  { to: "/journal", label: "Journal", icon: BookOpen, primary: true },
  { to: "/parametres", label: "Parametres", icon: Settings, primary: true },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { state, hydrated } = useForge();
  const streak = hydrated ? computeStreak(state) : 0;

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden shrink-0 flex-col border-r border-border bg-card/50 backdrop-blur md:flex md:w-60 lg:w-64">
        <div className="flex items-center gap-2 px-6 py-6">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15">
            <Flame className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide">FORGE</div>
            <div className="text-[11px] text-muted-foreground">Construis-toi.</div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4">
          <div className="rounded-lg border border-border bg-background/40 px-4 py-3">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Streak</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-semibold text-primary">{streak}</span>
              <span className="text-xs text-muted-foreground">jours</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1 pb-20 md:pb-0">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur md:hidden">
        <div className="grid grid-cols-5">
          {NAV.filter((item) => item.primary).map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="max-w-[64px] truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 px-4 pb-4 pt-6 md:px-8 md:pb-6 md:pt-10">
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  );
}
