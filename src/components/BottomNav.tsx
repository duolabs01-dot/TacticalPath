import { Link, useLocation } from "react-router-dom";
import { BarChart3, Gamepad2, Home, Target, Wifi } from "lucide-react";
import { cn } from "../lib/utils";

const items = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/daily", label: "Daily", icon: Target },
  { to: "/play", label: "Play", icon: Gamepad2 },
  { to: "/multiplayer", label: "Online", icon: Wifi },
  { to: "/progress", label: "Stats", icon: BarChart3 },
];

export function BottomNav() {
  const location = useLocation();
  const isActive = (path: string) =>
    location.pathname === path ||
    (path === "/play" &&
      ["/play/chess", "/tictactoe", "/checkers", "/morris", "/fourinarow"].includes(location.pathname)) ||
    (path === "/multiplayer" && location.pathname.startsWith("/multiplayer/"));

  return (
    <nav className="safe-bottom fixed bottom-3 left-3 right-3 z-50 md:hidden">
      <div className="grid grid-cols-5 rounded-[2rem] border border-white/70 bg-white/90 p-2 shadow-2xl shadow-slate-300/60 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-none">
        {items.map(({ to, label, icon: Icon }) => {
          const active = isActive(to);
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex h-full flex-col items-center justify-center gap-1 rounded-[1.2rem] px-2 py-2 text-[10px] font-semibold transition",
                active
                  ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                  : "text-slate-400 hover:bg-slate-100 dark:text-slate-500 dark:hover:bg-slate-800"
              )}
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
