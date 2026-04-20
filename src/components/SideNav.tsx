import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Home,
  Play,
  Settings,
  Sparkles,
  Target,
  Trophy,
  User,
  Wifi,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

const mainNav = [
  { to: "/dashboard", icon: Home, label: "Home" },
  { to: "/daily", icon: Target, label: "Daily Board" },
  { to: "/play", icon: Play, label: "Play Solo" },
  { to: "/multiplayer", icon: Wifi, label: "Multiplayer" },
  { to: "/progress", icon: BarChart3, label: "Stats" },
];

const secondaryNav = [
  { to: "/profile", icon: User, label: "Profile" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function SideNav() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (to: string) =>
    location.pathname === to ||
    (to === "/play" && location.pathname.startsWith("/play")) ||
    (to === "/play" && ["/tictactoe", "/checkers", "/morris", "/fourinarow"].includes(location.pathname)) ||
    (to === "/multiplayer" && location.pathname.startsWith("/multiplayer/"));

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-white/60 bg-white/80 px-4 py-4 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/80 md:flex md:flex-col">
      <div className="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-none">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white dark:bg-white dark:text-slate-950">
            TP
          </div>
          <div>
            <p className="text-sm font-black tracking-tight text-slate-900 dark:text-white">TacticalPath</p>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">
              Smart board training
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] bg-slate-950 px-4 py-4 text-white dark:bg-slate-900">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-blue-200">
            <Sparkles className="h-3.5 w-3.5" /> Session mode
          </div>
          <p className="mt-3 text-xl font-black leading-tight">
            Beautiful boards, quick rematches, fewer dead ends.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/80">
            <Trophy className="h-3.5 w-3.5 text-amber-300" /> Refreshed experience
          </div>
        </div>
      </div>

      <nav className="mt-5 flex-1 space-y-1 rounded-[2rem] border border-white/60 bg-white/70 p-3 shadow-lg shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-none">
        {mainNav.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              isActive(to)
                ? "bg-slate-950 text-white shadow-lg shadow-slate-200 dark:bg-white dark:text-slate-950 dark:shadow-none"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-4 rounded-[2rem] border border-white/60 bg-white/70 p-3 shadow-lg shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-none">
        {secondaryNav.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
        <button
          type="button"
          onClick={toggleTheme}
          className="mt-2 flex w-full items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <span>{theme === "dark" ? "Dark mode on" : "Light mode on"}</span>
          <span className="rounded-full bg-white px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
            Toggle
          </span>
        </button>
      </div>
    </aside>
  );
}
