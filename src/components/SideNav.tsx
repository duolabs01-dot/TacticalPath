import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, Sword, Target, User, Settings, Info } from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  {
    path: "/",
    icon: LayoutGrid,
    label: "Library",
  },
  {
    path: "/dashboard",
    icon: Target,
    label: "My Progress",
  },
  {
    path: "/multiplayer",
    icon: Sword,
    label: "Multiplayer",
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
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-slate-200 fixed left-0 top-0 z-50">
      {/* Logo */}
      <div className="p-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-blue-100 font-bold">T</div>
          <div>
            <p className="font-black text-slate-900 leading-none">TacticalPath</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Play & Learn</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-200 group",
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100 font-bold scale-[1.02]"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400 group-hover:text-blue-600")} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-6 border-t border-slate-100">
        <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-all text-sm font-medium"
        >
            <Settings className="w-5 h-5" />
            Settings
        </Link>
      </div>
    </aside>
  );
}
