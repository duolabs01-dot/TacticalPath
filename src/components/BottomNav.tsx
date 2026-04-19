import { Link, useLocation } from "react-router-dom";
import { Home, Play, BarChart3, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", icon: Home, label: "Home" },
  { to: "/play", icon: Play, label: "Solo" },
  { to: "/multiplayer", icon: Wifi, label: "Online" },
  { to: "/progress", icon: BarChart3, label: "Stats" },
];

export function BottomNav() {
  const location = useLocation();

  const isActiveRoute = (to: string) => {
    if (location.pathname === to) return true;
    if (to === "/play") {
      return location.pathname.startsWith("/play") || 
             location.pathname.startsWith("/multiplayer") ||
             ["/tictactoe", "/checkers", "/morris", "/fourinarow"].includes(location.pathname);
    }
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95 md:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-1">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = isActiveRoute(to);

          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 min-w-[64px] py-2 px-3 rounded-xl transition-all duration-200",
                isActive
                  ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/50"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:text-slate-500 dark:hover:text-slate-300 dark:hover:bg-slate-800/50"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-semibold">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
