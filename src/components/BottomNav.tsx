import { Link, useLocation } from "react-router-dom";
import { Home, Play, BarChart3, Wifi } from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: Home, label: "Home" },
  { to: "/play", icon: Play, label: "Play" },
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-slate-200 safe-bottom dark:bg-slate-900 dark:border-slate-700 md:hidden">
      <div className="flex items-center justify-around h-full">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = isActiveRoute(to);

          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-400 dark:text-slate-500"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}