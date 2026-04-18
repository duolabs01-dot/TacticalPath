import { Link, useLocation } from "react-router-dom";
import { Home, Target, Play, BarChart3 } from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: Home, label: "Home" },
  { to: "/daily", icon: Target, label: "Daily" },
  { to: "/play", icon: Play, label: "Play" },
  { to: "/progress", icon: BarChart3, label: "Stats" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95 md:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive =
            location.pathname === to ||
            (to === "/play" && location.pathname.startsWith("/multiplayer")) ||
            (to === "/play" && location.pathname.startsWith("/play")) ||
            (to === "/play" &&
              ["/tictactoe", "/checkers", "/morris"].includes(
                location.pathname
              ));

          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-1 px-3 py-1 text-[11px] font-bold transition ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
