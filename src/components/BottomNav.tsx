import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, Swords, Sparkles, User } from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  {
    path: "/",
    icon: LayoutGrid,
    label: "Library",
    matches: ["/"],
  },
  {
    path: "/dashboard",
    icon: Sparkles,
    label: "Arcade",
    matches: ["/dashboard", "/play/chess", "/tictactoe", "/checkers", "/morris", "/solitaire"],
  },
  {
    path: "/multiplayer",
    icon: Swords,
    label: "Friends",
    matches: ["/multiplayer"],
  },
  {
    path: "/profile",
    icon: User,
    label: "Me",
    matches: ["/profile", "/settings"],
  },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="mobile-nav fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-slate-100 bg-white px-2 pt-2 pb-3 md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.path === "/" ? location.pathname === "/" : item.matches.some((path) => location.pathname.startsWith(path));

        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "tap-effect flex flex-col items-center gap-1 px-4 py-1 transition-all duration-300",
              isActive ? "scale-110 text-blue-600" : "text-slate-400"
            )}
          >
            <div className={cn("rounded-xl p-1 transition-all", isActive ? "bg-blue-50" : "") }>
              <Icon className={cn("h-5 w-5", isActive && "text-blue-600")} />
            </div>
            <span className={cn("text-[9px] font-black uppercase tracking-widest", isActive ? "text-blue-600" : "text-slate-400")}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
