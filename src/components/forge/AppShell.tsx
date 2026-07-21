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
  { to: "/performances", label: "Perfs", icon: Trophy, primary: false },
  { to: "/psychotechniques", label: "Psycho", icon: Brain, primary: false },
  { to: "/journal", label: "Journal", icon: BookOpen, primary: true },
  { to: "/parametres", label: "Réglages", icon: Settings, primary: true },
] as const;


export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { state, hydrated } = useForge();
  const streak = hydrated ? computeStreak(state) : 0;

  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex md:w-60 lg:w-64 shrink-0 flex-col border-r border-border bg-card/50 backdrop-blur">
        <div className="px-6 py-6 flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/15 grid place-items-center">
            <Flame className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide">FORGE</div>
            <div className="text-[11px] text-muted-foreground">Construis-toi.</div>
          </div>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {NAV.map((n) => {
            const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <n.icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{n.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4">
          <div className="rounded-xl border border-border bg-background/40 px-4 py-3">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Streak</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-semibold text-primary">{streak}</span>
              <span className="text-xs text-muted-foreground">jours</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 pb-20 md:pb-0">{children}</main>

      {/* Bottom nav mobile */}
      <nav className="fixed md:hidden bottom-0 inset-x-0 z-40 border-t border-border bg-card/95 backdrop-blur">
        <div className="grid grid-cols-5">
          {NAV.filter((n) => n.primary).map((n) => {
            const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <n.icon className="h-4 w-4" />
                <span className="truncate max-w-[64px]">{n.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

    </div>
  );
}

export function PageHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <div className="px-4 md:px-8 pt-6 md:pt-10 pb-4 md:pb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight truncate">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  );
}
