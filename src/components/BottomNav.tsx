import { Link, useLocation } from "react-router-dom";
import { Home, Play, BarChart3, Wifi, Gamepad2 } from "lucide-react";

export function BottomNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-slate-200 safe-bottom dark:bg-slate-900 dark:border-slate-700 md:hidden">
      <div className="flex items-center justify-around h-full">
        <Link 
          to="/dashboard" 
          className={`flex flex-col items-center justify-center flex-1 h-full ${isActive('/dashboard') ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        
        <Link 
          to="/play" 
          className={`flex flex-col items-center justify-center flex-1 h-full ${isActive('/play') ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <Gamepad2 className="w-6 h-6" />
          <span className="text-[10px] font-medium">Play</span>
        </Link>
        
        <Link 
          to="/multiplayer" 
          className={`flex flex-col items-center justify-center flex-1 h-full ${isActive('/multiplayer') ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <Wifi className="w-6 h-6" />
          <span className="text-[10px] font-medium">Online</span>
        </Link>
        
        <Link 
          to="/progress" 
          className={`flex flex-col items-center justify-center flex-1 h-full ${isActive('/progress') ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <BarChart3 className="w-6 h-6" />
          <span className="text-[10px] font-medium">Stats</span>
        </Link>
      </div>
    </nav>
  );
}