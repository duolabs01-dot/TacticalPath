import { Link } from "react-router-dom";
import { Play as PlayIcon, Wifi } from "lucide-react";
import { gameLibrary } from "../data/games";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Play() {
  const chess = gameLibrary.find((g) => g.id === "chess")!;
  const morabaraba = gameLibrary.find((g) => g.id === "morris")!;
  const quickGames = gameLibrary.filter((g) => g.tier === "quick");

  return (
    <div className="p-3 pb-24">
      <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Choose Game</h1>

      {/* Chess Hero */}
      <Link to={chess.path} className="block mb-3 rounded-2xl bg-gradient-to-br from-slate-800 to-blue-900 p-4 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Featured</span>
            <p className="text-2xl font-bold mt-1">{chess.name}</p>
            <p className="text-xs text-slate-300 mt-1 line-clamp-1">{chess.summary}</p>
          </div>
          <div className="text-4xl">{chess.icon}</div>
        </div>
      </Link>

      {/* Morabaraba */}
      <Link to={morabaraba.path} className="block mb-4 rounded-2xl bg-emerald-600 p-4 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold">{morabaraba.name}</p>
            <p className="text-xs text-emerald-100 mt-1">African strategy game</p>
          </div>
          <div className="text-3xl">{morabaraba.icon}</div>
        </div>
      </Link>

      {/* Quick Games */}
      <h2 className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 px-1">Quick Games</h2>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {quickGames.map((game) => (
          <Link 
            key={game.id} 
            to={game.path}
            className="rounded-xl bg-white p-3 shadow-sm border border-slate-100 flex items-center gap-3"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg text-white ${game.accentClass}`}>
              {game.icon}
            </div>
            <span className="font-medium text-sm text-slate-900">{game.name}</span>
          </Link>
        ))}
      </div>

      {/* Multiplayer */}
      <Link 
        to="/multiplayer"
        className="block rounded-xl border-2 border-dashed border-slate-300 p-4 text-center"
      >
        <p className="font-bold text-slate-700">Play with Friends</p>
        <p className="text-xs text-slate-500 mt-1">Create a room & share the code</p>
      </Link>
    </div>
  );
}