import { Link } from "react-router-dom";
import { Brain, BookOpen, Target, User, Puzzle } from "lucide-react";
import { cn } from "../lib/utils";
import { useLocation } from "react-router-dom";

const navItems = [
  {
    path: "/dashboard",
    icon: Brain,
    label: "Dashboard",
  },
  {
    path: "/puzzle-bank",
    icon: Puzzle,
    label: "Practice",
  },
  {
    path: "/skill-insights",
    icon: Target,
    label: "Progress",
  },
  {
    path: "/profile",
    icon: User,
    label: "Profile",
  },
];

export function SideNav() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-slate-200 fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white text-xl">♞</div>
          <div>
            <p className="font-bold text-slate-900">TacticalPath</p>
            <p className="text-xs text-slate-500">Chess Learning</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                isActive
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100">
        <div className="card p-4 bg-slate-50">
          <p className="text-sm text-slate-600">
            Practice puzzles to improve your chess skills!
          </p>
        </div>
      </div>
    </aside>
  );
}