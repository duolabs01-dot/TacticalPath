import { Link } from "react-router-dom";
import { BarChart3, Target, Trophy, Flame, Play } from "lucide-react";
import { useProgress, useGameResults } from "../hooks/useProgress";
import { GameType } from "../context/GameContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GAME_LABELS: Record<GameType, { label: string; emoji: string }> = {
  chess:     { label: "Chess",      emoji: "♟" },
  tictactoe: { label: "Tic Tac Toe", emoji: "✕" },
  checkers:  { label: "Checkers",   emoji: "⬤" },
  morris:    { label: "Morabaraba", emoji: "◎" },
};

export function Progress() {
  const { progress, getOverallLevel } = useProgress();
  const { byGame, total }  = useGameResults();
  const level = getOverallLevel();
  const winRate = total.played > 0 ? Math.round((total.wins / total.played) * 100) : 0;

  return (
    <div className="p-3 pb-24">
      <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Your Stats</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="h-4 w-4 text-emerald-600" />
              <p className="text-[10px] font-bold uppercase text-slate-400">Win Rate</p>
            </div>
            <p className="text-2xl font-bold text-slate-900">{winRate}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="h-4 w-4 text-amber-600" />
              <p className="text-[10px] font-bold uppercase text-slate-400">Streak</p>
            </div>
            <p className="text-2xl font-bold text-slate-900">{progress.streak}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              <p className="text-[10px] font-bold uppercase text-slate-400">Games</p>
            </div>
            <p className="text-2xl font-bold text-slate-900">{total.played}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-4 w-4 text-purple-600" />
              <p className="text-[10px] font-bold uppercase text-slate-400">Level</p>
            </div>
            <p className="text-2xl font-bold text-slate-900">{level}</p>
          </CardContent>
        </Card>
      </div>

      {/* Game Results */}
      <Card className="mb-4">
        <CardContent className="p-3">
          <p className="text-sm font-bold text-slate-900 mb-3">Game Results</p>
          <div className="space-y-2">
            {(["chess", "checkers", "morris", "tictactoe"] as GameType[]).map((g) => {
              const { played, wins } = byGame(g);
              const pct = played > 0 ? Math.round((wins / played) * 100) : 0;
              const { label, emoji } = GAME_LABELS[g];
              return (
                <div key={g} className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">{emoji} {label}</span>
                  <span className="text-xs text-slate-500">{wins}W / {played - wins}L ({pct}%)</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Button asChild className="w-full">
        <Link to="/play">
          <Play className="mr-2 h-4 w-4" /> Play More
        </Link>
      </Button>
    </div>
  );
}