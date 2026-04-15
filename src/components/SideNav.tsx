import { Link, useLocation } from "react-router-dom";
import { House, Play, Swords, Sparkles, User, Settings } from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  {
    path: "/",
    icon: House,
    label: "Home",
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

const quickPlayItems = [
  { path: "/play/chess", label: "Chess" },
  { path: "/tictactoe", label: "Tic Tac Toe" },
  { path: "/checkers", label: "Checkers" },
];

export function SideNav() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-72 flex-col border-r border-white/70 bg-white/85 backdrop-blur md:flex">
      <div className="p-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white shadow-lg shadow-blue-100">T</div>
          <div>
            <p className="font-black leading-none text-slate-900">TacticalPath</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Play. Learn. Rematch.</p>
          </div>
        </Link>

        <div className="mt-8 rounded-[1.75rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 p-5 text-white shadow-xl shadow-slate-200">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-200">Quick launch</p>
          <h2 className="mt-2 text-xl font-black">Jump back into a live loop</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">Pick the board that matches your energy and get to the next good decision faster.</p>
          <div className="mt-4 space-y-2">
            {quickPlayItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/15"
              >
                <span>{item.label}</span>
                <Play className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path === "/"
            ? location.pathname === "/"
            : location.pathname === item.path || location.pathname.startsWith(`${item.path}/`) || (item.path === "/dashboard" && ["/play/chess", "/tictactoe", "/checkers", "/morris", "/solitaire"].includes(location.pathname)) || (item.path === "/profile" && location.pathname === "/settings");

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
        <p className="mt-4 px-4 text-xs font-medium leading-5 text-slate-400">Public-first shell: no classroom clutter, just quick play, friend play, and your progression loop.</p>
      </div>
    </aside>
  );
}
