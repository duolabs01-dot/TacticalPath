import { Link } from "react-router-dom";
import { BarChart3, Target, Trophy, Flame, Play, Swords } from "lucide-react";
import { type ThemeProgress, useProgress } from "../hooks/useProgress";
import { useEffect, useState } from "react";
import { GameType } from "../context/GameContext";

interface GameRecord { game: GameType; won: boolean; ts: number; }

function useGameResults() {
  const [records, setRecords] = useState<GameRecord[]>([]);
  useEffect(() => {
    const load = () => {
      const raw = localStorage.getItem("tacticalpath_game_results");
      if (raw) {
        try { setRecords(JSON.parse(raw)); } catch { /* ignore */ }
      }
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  const byGame = (type: GameType) => {
    const r = records.filter((x) => x.game === type);
    return { played: r.length, wins: r.filter((x) => x.won).length };
  };
  const total = { played: records.length, wins: records.filter((x) => x.won).length };
  return { byGame, total };
}

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
    <div className="mx-auto max-w-3xl px-4 py-6 md:px-8 md:py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          <BarChart3 className="h-4 w-4" /> Your progress
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          {progress.username}&apos;s stats
        </h1>
      </div>

      {/* Summary stats */}
      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm dark:bg-slate-800">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            <Swords className="h-5 w-5" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Games played</p>
          <p className="mt-1 text-3xl font-black text-slate-900 dark:text-white">{total.played}</p>
        </div>

        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm dark:bg-slate-800">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            <Trophy className="h-5 w-5" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Win rate</p>
          <p className="mt-1 text-3xl font-black text-slate-900 dark:text-white">{winRate}%</p>
        </div>

        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm dark:bg-slate-800">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
            <Flame className="h-5 w-5" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Current streak</p>
          <p className="mt-1 text-3xl font-black text-slate-900 dark:text-white">{progress.streak}</p>
        </div>

        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm dark:bg-slate-800">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
            <Target className="h-5 w-5" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Overall level</p>
          <p className="mt-1 text-3xl font-black text-slate-900 dark:text-white">{level}</p>
        </div>
      </div>

      {/* Per-game breakdown */}
      <div className="mb-6 rounded-[1.75rem] bg-white p-5 shadow-sm dark:bg-slate-800">
        <h2 className="mb-4 text-lg font-black text-slate-900 dark:text-white">Game results</h2>
        <div className="space-y-3">
          {(["chess", "checkers", "morris", "tictactoe"] as GameType[]).map((g) => {
            const { played, wins } = byGame(g);
            const pct = played > 0 ? Math.round((wins / played) * 100) : 0;
            const { label, emoji } = GAME_LABELS[g];
            return (
              <div key={g}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {emoji} {label}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
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
      </div>

      {/* Puzzle theme breakdown */}
      {themeEntries.some(([, d]) => d.attempts > 0) && (
        <div className="mb-6 rounded-[1.75rem] bg-white p-5 shadow-sm dark:bg-slate-800">
          <h2 className="mb-4 text-lg font-black text-slate-900 dark:text-white">Puzzle themes</h2>
          <div className="space-y-3">
            {themeEntries.map(([theme, data]) => {
              const percent = data.attempts > 0 ? Math.round((data.solved / data.attempts) * 100) : 0;
              return (
                <div key={theme}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-bold capitalize text-slate-700 dark:text-slate-300">{theme}</span>
                    <span className="text-xs font-semibold text-slate-400">
                      Level {data.level} · {data.solved}/{data.attempts} {data.attempts > 0 && `(${percent}%)`}
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
        </div>
      )}

      {/* CTA */}
      <div className="rounded-[1.75rem] bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-center text-white">
        <h2 className="text-xl font-black">Keep playing, keep improving</h2>
        <p className="mt-2 text-sm text-blue-100">Every game teaches you something. Play another and watch your stats grow.</p>
        <Link
          to="/play"
          className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-black text-blue-700 transition hover:bg-blue-50"
        >
          <Play className="h-4 w-4" /> Choose a game
        </Link>
      </div>
    </div>
  );
}
