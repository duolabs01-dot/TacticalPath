import { Link, useLocation } from "react-router-dom";
import { Home, Target, Play, BarChart3, Settings, User } from "lucide-react";

const mainNav = [
  { to: "/dashboard", icon: Home, label: "Home" },
  { to: "/daily", icon: Target, label: "Daily Board" },
  { to: "/play", icon: Play, label: "Play" },
  { to: "/progress", icon: BarChart3, label: "Stats" },
];

const secondaryNav = [
  { to: "/profile", icon: User, label: "Profile" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function SideNav() {
  const location = useLocation();

  const isActive = (to: string) =>
    location.pathname === to ||
    (to === "/play" && location.pathname.startsWith("/multiplayer")) ||
    (to === "/play" && location.pathname.startsWith("/play")) ||
    (to === "/play" &&
      ["/tictactoe", "/checkers", "/morris"].includes(location.pathname));

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 md:flex md:flex-col">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5 dark:border-slate-700">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white">
          T
        </div>
        <div>
          <p className="text-sm font-black tracking-tight text-slate-900 dark:text-white">
            TacticalPath
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Chess coaching
          </p>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {mainNav.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              isActive(to)
                ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Secondary nav */}
      <div className="border-t border-slate-200 px-3 py-4 dark:border-slate-700">
        {secondaryNav.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
