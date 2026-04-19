import { Link } from "react-router-dom";
import { Play as PlayIcon, Wifi, Users, ChevronRight, Crown, Zap } from "lucide-react";
import { gameLibrary } from "../data/games";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Play() {
  const chess = gameLibrary.find((g) => g.id === "chess")!;
  const morabaraba = gameLibrary.find((g) => g.id === "morris")!;
  const quickGames = gameLibrary.filter((g) => g.tier === "quick");

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="px-4 pt-4">
        <h1 className="text-xl font-bold text-slate-900 mb-1">Choose Game</h1>
        <p className="text-sm text-slate-500 mb-4">Pick a game to play against the bot</p>

        {/* Chess Hero Card */}
        <Link to={chess.path} className="block mb-3">
          <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 rounded-2xl p-5 text-white shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-blue-300 bg-blue-500/20 px-2 py-1 rounded-full">
                  <Crown className="w-3 h-3" /> Featured
                </span>
                <p className="text-3xl font-bold mt-2">{chess.name}</p>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">{chess.summary}</p>
              </div>
              <div className="text-5xl">{chess.icon}</div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-200">
              <PlayIcon className="w-4 h-4" /> Tap to play
            </div>
          </div>
        </Link>

        {/* Morabaraba */}
        <Link to={morabaraba.path} className="block mb-4">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-4 text-white shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">{morabaraba.name}</p>
                <p className="text-xs text-emerald-100">Classic African strategy game</p>
              </div>
              <div className="text-4xl">{morabaraba.icon}</div>
            </div>
          </div>
        </Link>

        {/* Quick Games */}
        <h2 className="font-semibold text-slate-700 mb-2 px-1">Quick Games</h2>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {quickGames.map((game) => (
            <Link key={game.id} to={game.path}>
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${game.accentClass} flex items-center justify-center text-xl text-white`}>
                    {game.icon}
                  </div>
                  <span className="font-semibold text-slate-900">{game.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Multiplayer Card */}
        <Link to="/multiplayer">
          <Card className="border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-colors">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Play Online</p>
                  <p className="text-xs text-slate-500">With friends via room code</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}