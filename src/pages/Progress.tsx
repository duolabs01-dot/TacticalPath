import { Link } from "react-router-dom";
import { BarChart3, Target, Trophy, Flame, Play, TrendingUp, Activity } from "lucide-react";
import { useProgress, useGameResults } from "../hooks/useProgress";
import { GameType } from "../context/GameContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GAME_LABELS: Record<GameType, { label: string; emoji: string; color: string }> = {
  chess:     { label: "Chess",      emoji: "♟", color: "bg-blue-600" },
  tictactoe: { label: "Tic Tac Toe", emoji: "✕", color: "bg-amber-500" },
  checkers:  { label: "Checkers",   emoji: "⬤", color: "bg-rose-600" },
  morris:    { label: "Morabaraba", emoji: "◎", color: "bg-emerald-600" },
};

export function Progress() {
  const { progress, getOverallLevel } = useProgress();
  const { byGame, total }  = useGameResults();
  const level = getOverallLevel();
  const winRate = total.played > 0 ? Math.round((total.wins / total.played) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="px-4 pt-4">
        <h1 className="text-xl font-bold text-slate-900 mb-4">Your Stats</h1>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white">
            <CardContent className="p-4">
              <Trophy className="w-6 h-6 mb-2 text-blue-100" />
              <p className="text-3xl font-bold">{winRate}%</p>
              <p className="text-xs text-blue-100">Win Rate</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-500 to-orange-500 border-0 text-white">
            <CardContent className="p-4">
              <Flame className="w-6 h-6 mb-2 text-amber-100" />
              <p className="text-3xl font-bold">{progress.streak}</p>
              <p className="text-xs text-amber-100">Day Streak</p>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <Card>
            <CardContent className="p-3 text-center">
              <Activity className="w-5 h-5 mx-auto mb-1 text-slate-400" />
              <p className="text-xl font-bold text-slate-900">{total.played}</p>
              <p className="text-[10px] text-slate-500 uppercase">Games</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <TrendingUp className="w-5 h-5 mx-auto mb-1 text-slate-400" />
              <p className="text-xl font-bold text-slate-900">{total.wins}</p>
              <p className="text-[10px] text-slate-500 uppercase">Wins</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <Target className="w-5 h-5 mx-auto mb-1 text-slate-400" />
              <p className="text-xl font-bold text-slate-900">{level}</p>
              <p className="text-[10px] text-slate-500 uppercase">Level</p>
            </CardContent>
          </Card>
        </div>

        {/* Game Breakdown */}
        <h2 className="font-semibold text-slate-700 mb-3">By Game</h2>
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="space-y-3">
              {(["chess", "checkers", "morris", "tictactoe"] as GameType[]).map((g) => {
                const { played, wins } = byGame(g);
                const pct = played > 0 ? Math.round((wins / played) * 100) : 0;
                const { label, emoji, color } = GAME_LABELS[g];
                return (
                  <div key={g}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded ${color} flex items-center justify-center text-xs text-white`}>
                          {emoji}
                        </div>
                        <span className="text-sm font-medium text-slate-700">{label}</span>
                      </div>
                      <span className="text-xs text-slate-500">
                        {wins}W - {played - wins}L
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${color} rounded-full`} 
                        style={{ width: `${pct}%` }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Button asChild className="w-full" size="lg">
          <Link to="/play">
            <Play className="mr-2 w-4 h-4" /> Play More Games
          </Link>
        </Button>
      </div>
    </div>
  );
}