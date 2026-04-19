import { Link } from "react-router-dom";
import { BarChart3, Target, Trophy, Flame, Play, Swords } from "lucide-react";
import { type ThemeProgress, useProgress, useGameResults } from "../hooks/useProgress";
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
  const themeEntries = Object.entries(progress.themes) as Array<[string, ThemeProgress]>;
  const winRate = total.played > 0 ? Math.round((total.wins / total.played) * 100) : 0;

  return (
    <div className="mx-auto max-w-3xl px-3 py-4 md:px-6 md:py-6">
      {/* Header */}
      <div className="mb-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          <BarChart3 className="h-3.5 w-3.5" /> Your progress
        </div>
        <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-white md:text-3xl">
          {progress.username || 'Player'}'s stats
        </h1>
      </div>

      {/* Summary stats */}
      <div className="mb-5 grid grid-cols-2 gap-2.5">
        <Card className="border-slate-200 shadow-sm dark:border-slate-700">
          <CardContent className="p-4">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Swords className="h-4 w-4" />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">Games</p>
            <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{total.played}</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm dark:border-slate-700">
          <CardContent className="p-4">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <Trophy className="h-4 w-4" />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">Win rate</p>
            <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{winRate}%</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm dark:border-slate-700">
          <CardContent className="p-4">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <Flame className="h-4 w-4" />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">Streak</p>
            <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{progress.streak}</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm dark:border-slate-700">
          <CardContent className="p-4">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
              <Target className="h-4 w-4" />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">Level</p>
            <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{level}</p>
          </CardContent>
        </Card>
      </div>

      {/* Per-game breakdown */}
      <Card className="mb-5 border-slate-200 shadow-sm dark:border-slate-700">
        <CardContent className="p-4 md:p-5">
          <h2 className="mb-4 text-base font-bold text-slate-900 dark:text-white">Game results</h2>
          <div className="space-y-3.5">
            {(["chess", "checkers", "morris", "tictactoe"] as GameType[]).map((g) => {
              const { played, wins } = byGame(g);
              const pct = played > 0 ? Math.round((wins / played) * 100) : 0;
              const { label, emoji } = GAME_LABELS[g];
              return (
                <div key={g}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {emoji} {label}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      {wins}W / {played - wins}L
                      {played > 0 && ` · ${pct}%`}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Puzzle theme breakdown */}
      {themeEntries.some(([, d]) => d.attempts > 0) && (
        <Card className="mb-5 border-slate-200 shadow-sm dark:border-slate-700">
          <CardContent className="p-4 md:p-5">
            <h2 className="mb-4 text-base font-bold text-slate-900 dark:text-white">Puzzle themes</h2>
            <div className="space-y-3.5">
              {themeEntries.map(([theme, data]) => {
                const percent = data.attempts > 0 ? Math.round((data.solved / data.attempts) * 100) : 0;
                return (
                  <div key={theme}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-semibold capitalize text-slate-700 dark:text-slate-300">{theme}</span>
                      <span className="text-xs font-medium text-slate-400">
                        L{data.level} · {data.solved}/{data.attempts} {data.attempts > 0 && `(${percent}%)`}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                      <div
                        className="h-full rounded-full bg-blue-500 transition-all"
                        style={{ width: `${Math.min(100, (data.level / 5) * 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* CTA */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <CardContent className="p-5 text-center md:p-6">
          <h2 className="text-lg font-bold">Keep playing, keep improving</h2>
          <p className="mt-1.5 text-sm text-blue-100">Every game teaches you something.</p>
          <Button asChild className="mt-4 rounded-xl font-bold text-sm h-10 px-5 bg-white text-blue-700 hover:bg-blue-50" size="sm">
            <Link to="/play">
              <Play className="mr-2 h-4 w-4" /> Choose a game
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
