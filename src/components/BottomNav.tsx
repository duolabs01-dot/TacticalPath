import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, BarChart2, User, Brain } from "lucide-react";
import { cn } from "../lib/utils";

export function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Home" },
    { path: "/study-plan", icon: BookOpen, label: "Learn" },
    { path: "/analyze", icon: BarChart2, label: "Analyze" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0b111a]/95 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60 md:static md:w-64 md:h-screen md:border-t-0 md:border-r md:flex md:flex-col md:bg-white md:dark:bg-[#0b111a] flex-shrink-0">
      <div className="hidden md:flex items-center gap-2 p-6 mb-4">
        <div className="bg-blue-500 text-white rounded-md p-1.5 flex items-center justify-center">
          <Brain className="h-6 w-6" />
        </div>
        <span className="text-lg font-bold tracking-tight">Tactical Path</span>
      </div>
      <div className="container flex h-16 items-center justify-around px-4 mx-auto md:flex-col md:h-auto md:items-stretch md:justify-start md:gap-2 md:px-4">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors md:flex-row md:gap-3 md:px-4 md:py-3 md:rounded-xl",
                isActive
                  ? "text-blue-500 dark:text-blue-400 md:bg-blue-50 dark:md:bg-blue-500/10"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 md:hover:bg-slate-100 dark:md:hover:bg-slate-800/50"
              )}
            >
              <Icon className={cn("h-6 w-6 md:h-5 md:w-5", isActive && "fill-current")} />
              <span className="text-[10px] md:text-sm font-bold uppercase md:capitalize tracking-tighter md:tracking-normal">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
