import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, Swords, Sparkles, User, Settings } from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  {
    path: "/",
    icon: LayoutGrid,
    label: "Library",
  },
  {
    path: "/dashboard",
    icon: Sparkles,
    label: "Arcade",
  },
  {
    path: "/multiplayer",
    icon: Swords,
    label: "Friends",
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
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-slate-200 bg-white md:flex">
      <div className="p-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white shadow-lg shadow-blue-100">T</div>
          <div>
            <p className="leading-none font-black text-slate-900">TacticalPath</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Play. Learn. Rematch.</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path === "/"
            ? location.pathname === "/"
            : location.pathname === item.path || location.pathname.startsWith(`${item.path}/`) || (item.path === "/dashboard" && ["/play/chess", "/tictactoe", "/checkers", "/morris", "/solitaire"].includes(location.pathname));

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-4 py-4 transition-all duration-200",
                isActive
                  ? "scale-[1.02] bg-blue-600 font-bold text-white shadow-lg shadow-blue-100"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-slate-400 group-hover:text-blue-600")} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 p-6">
        <Link
          to="/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition-all hover:bg-slate-50"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
