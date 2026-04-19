import { Link } from "react-router-dom";
import { 
  Brain, Play, Sparkles, Target, Trophy, Clock3, 
  ChevronRight, Flame, Zap, Crown, Swords, BarChart3,
  Settings, User
} from "lucide-react";
import { useProgress, useGameResults } from "../hooks/useProgress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Dashboard() {
  const { progress, getOverallLevel } = useProgress();
  const { records } = useGameResults();
  const level = getOverallLevel();
  const lastGame = records.length > 0 ? records[records.length - 1] : null;

  const games = [
    { id: "chess", name: "Chess", icon: "♞", color: "bg-blue-600", path: "/play/chess" },
    { id: "morris", name: "Morabaraba", icon: "◎", color: "bg-emerald-600", path: "/morris" },
    { id: "tictactoe", name: "Tic Tac Toe", icon: "✕", color: "bg-amber-500", path: "/tictactoe" },
    { id: "checkers", name: "Checkers", icon: "●", color: "bg-rose-600", path: "/checkers" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 px-4 pt-6 pb-24 -mx-4 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
              <span className="text-lg font-bold text-white">T</span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Welcome back</p>
              <h1 className="text-lg font-bold text-white">{progress.username || 'Player'}</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/settings" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </Link>
            <Link to="/profile" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-3">
          <div className="flex-1 bg-white/10 backdrop-blur rounded-2xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-3 h-3 text-amber-400" />
              <span className="text-[10px] uppercase tracking-wider text-slate-300">Level</span>
            </div>
            <p className="text-xl font-bold text-white">{level}</p>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur rounded-2xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-3 h-3 text-orange-400" />
              <span className="text-[10px] uppercase tracking-wider text-slate-300">Streak</span>
            </div>
            <p className="text-xl font-bold text-white">{progress.streak}</p>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur rounded-2xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] uppercase tracking-wider text-slate-300">Puzzles</span>
            </div>
            <p className="text-xl font-bold text-white">{progress.totalPuzzlesSolved}</p>
          </div>
        </div>
      </div>

      {/* Daily Puzzle Card - floating */}
      <Link 
        to="/daily" 
        className="block mx-4 -mt-20 relative z-10 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-4 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-amber-100">Daily Challenge</p>
              <p className="font-bold text-white">Solve today's puzzle</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/70" />
        </div>
      </Link>

      {/* Quick Play Section */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-900">Quick Play</h2>
          <Link to="/play" className="text-sm text-blue-600 font-medium">See all</Link>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {games.map((game) => (
            <Link 
              key={game.id}
              to={game.path}
              className={`${game.color} rounded-2xl p-4 text-white shadow-md active:scale-95 transition-transform`}
            >
              <p className="text-3xl mb-2">{game.icon}</p>
              <p className="font-bold">{game.name}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Match */}
      {lastGame && (
        <div className="px-4 mt-6">
          <h2 className="font-bold text-slate-900 mb-3">Recent</h2>
          <Link 
            to={`/play/${lastGame.game}`}
            className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm border border-slate-100"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-xl text-white">
              {lastGame.game === "chess" ? "♟" : lastGame.game === "checkers" ? "⬤" : lastGame.game === "morris" ? "◎" : "✕"}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-900 capitalize">{lastGame.game}</p>
              <p className="text-xs text-slate-500">
                {lastGame.won ? "Won" : "Lost"} • {new Date(lastGame.ts).toLocaleDateString()}
              </p>
            </div>
            <Button size="sm" variant="ghost">Replay</Button>
          </Link>
        </div>
      )}

      {/* Multiplayer */}
      <div className="px-4 mt-6 mb-6">
        <Link 
          to="/multiplayer"
          className="flex items-center justify-between bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 text-white"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold">Play with Friends</p>
              <p className="text-xs text-emerald-100">Create room & share code</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/70" />
        </Link>
      </div>
    </div>
  );
}