import { Link } from "react-router-dom";
import { Wifi, Zap, Users, Copy, ChevronRight, MessageCircle } from "lucide-react";
import { gameLibrary } from "../data/games";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Multiplayer() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="px-4 pt-4">
        <h1 className="text-xl font-bold text-slate-900 mb-1">Play Online</h1>
        <p className="text-sm text-slate-500 mb-4">Challenge your friends</p>

        {/* How it Works */}
        <Card className="bg-gradient-to-r from-violet-600 to-indigo-600 border-0 text-white mb-4">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold">How it works</p>
                <p className="text-xs text-violet-200">No account needed</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-white/20 px-2 py-1 rounded">1. Create room</span>
              <span className="text-violet-200">→</span>
              <span className="bg-white/20 px-2 py-1 rounded">2. Share code</span>
              <span className="text-violet-200">→</span>
              <span className="bg-white/20 px-2 py-1 rounded">3. Play!</span>
            </div>
          </CardContent>
        </Card>

        {/* Game List */}
        <h2 className="font-semibold text-slate-700 mb-3">Choose a Game</h2>
        <div className="space-y-2 mb-4">
          {gameLibrary.map((game) => (
            <Link key={game.id} to={game.onlinePath || game.path}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${game.accentClass} flex items-center justify-center text-2xl text-white shadow-lg`}>
                    {game.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900">{game.name}</p>
                    <p className="text-xs text-slate-500">{game.multiplayerStatus}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Tips */}
        <Card>
          <CardContent className="p-4">
            <p className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> Tips
            </p>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Share the code with your friend via text</li>
              <li>• Both players can use the same room code</li>
              <li>• No login required - just pick a name</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}