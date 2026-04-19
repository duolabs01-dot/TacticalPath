import { Link } from "react-router-dom";
import { Wifi, Zap } from "lucide-react";
import { gameLibrary } from "../data/games";
import { Button } from "@/components/ui/button";

export function Multiplayer() {
  return (
    <div className="p-3 pb-24">
      <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Play Online</h1>

      {/* Header Card */}
      <div className="mb-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Wifi className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Real-time</span>
        </div>
        <p className="font-bold text-lg">Play with anyone</p>
        <p className="text-xs text-emerald-100 mt-1">Create a room, share the 6-character code</p>
      </div>

      {/* Game List */}
      <div className="space-y-2 mb-4">
        {gameLibrary.map((game) => (
          <Link 
            key={game.id} 
            to={game.onlinePath || game.path}
            className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border border-slate-100"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl text-white ${game.accentClass}`}>
              {game.icon}
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-900">{game.name}</p>
              <p className="text-xs text-slate-500">{game.multiplayerStatus}</p>
            </div>
            <Zap className="h-5 w-5 text-emerald-600" />
          </Link>
        ))}
      </div>

      {/* How it works */}
      <div className="rounded-xl bg-slate-100 p-4">
        <p className="text-sm font-bold text-slate-700 mb-2">How to play:</p>
        <ol className="text-xs text-slate-600 space-y-1">
          <li>1. Pick a game above</li>
          <li>2. Create a room (gets a code)</li>
          <li>3. Share code with your friend</li>
          <li>4. Friend enters code to join</li>
        </ol>
      </div>
    </div>
  );
}