import { Link } from "react-router-dom";
import { BookOpen, Home, Puzzle, Target, User } from "lucide-react";
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
    path: "/skill-insights",
    icon: Target,
    label: "Progress",
    matches: ["/skill-insights", "/study-plan", "/analyze", "/assessment"],
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
    <nav className="mobile-nav flex items-center justify-around px-2 pt-2 pb-1 md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.matches.some((path) => location.pathname.startsWith(path));

        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "tap-effect flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all",
              isActive
                ? "text-blue-600"
                : "text-slate-400"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-lg transition-all",
              isActive ? "bg-blue-50" : ""
            )}>
              <Icon className={cn("h-5 w-5", isActive && "text-blue-600")} />
            </div>
            <span className={cn(
              "text-[10px] font-medium",
              isActive ? "text-blue-600" : "text-slate-400"
            )}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}