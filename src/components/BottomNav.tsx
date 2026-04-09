import { Link } from "react-router-dom";
import { BookOpen, Brain, Home, Puzzle, User } from "lucide-react";
import { cn } from "../lib/utils";
import { useLocation } from "react-router-dom";

const navItems = [
  {
    path: "/dashboard",
    icon: Home,
    label: "Home",
    matches: ["/dashboard"],
  },
  {
    path: "/puzzle-bank",
    icon: Puzzle,
    label: "Practice",
    matches: ["/puzzle-bank", "/puzzle-play"],
  },
  {
    path: "/study-plan",
    icon: BookOpen,
    label: "Plan",
    matches: ["/study-plan", "/analyze", "/game-analysis", "/italian-game", "/skill-insights", "/assessment"],
  },
  {
    path: "/profile",
    icon: User,
    label: "Profile",
    matches: ["/profile", "/settings"],
  },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/70 bg-white/90 backdrop-blur-xl md:static md:flex md:h-screen md:w-72 md:flex-col md:border-r md:border-t-0 md:bg-white/70">
      <div className="hidden px-6 pb-5 pt-7 md:block">
        <div className="tp-card rounded-[1.6rem] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/25">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-xl font-bold tracking-tight text-slate-950">TacticalPath</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Classroom demo shell
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-[1.2rem] bg-blue-50 px-3 py-3 text-sm leading-6 text-slate-600">
            The main navigation now follows a simple student flow: check in, practice, review the week, and keep your profile classroom-safe.
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-xl items-center justify-around gap-2 px-3 md:flex-1 md:flex-col md:items-stretch md:justify-start md:px-5 md:pb-6 md:pt-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.matches.some((path) => location.pathname.startsWith(path));

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex min-w-0 flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition md:flex-row md:gap-3 md:px-4 md:py-3 md:text-sm md:normal-case md:tracking-normal",
                isActive
                  ? "bg-blue-50 text-blue-700 shadow-sm md:border md:border-blue-100"
                  : "text-slate-500 hover:bg-white hover:text-slate-900"
              )}
            >
              <Icon className={cn("h-5 w-5 md:h-5 md:w-5", isActive && "text-blue-700")} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="hidden md:block md:px-1 md:pt-4">
          <div className="rounded-[1.3rem] border border-dashed border-slate-200 bg-white/80 p-4 text-sm leading-6 text-slate-600">
            <div className="mb-2 flex items-center gap-2 text-slate-900">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <span className="font-semibold">Pilot note</span>
            </div>
            The student shell stays focused on safe classroom flow. Coach operations and billing remain out of the main tab system.
          </div>
        </div>
      </div>
    </nav>
  );
}
