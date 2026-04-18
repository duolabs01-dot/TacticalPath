import { Link } from "react-router-dom";
import { BarChart3, Target, Trophy, Flame, Play } from "lucide-react";
import { type ThemeProgress, useProgress } from "../hooks/useProgress";

export function Progress() {
  const { progress, getOverallLevel } = useProgress();
  const level = getOverallLevel();

  const themeEntries = Object.entries(progress.themes) as Array<[string, ThemeProgress]>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:px-8 md:py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          <BarChart3 className="h-4 w-4" /> Your progress
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          {progress.username}'s stats
        </h1>
      </div>

      {/* Summary stats */}
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm dark:bg-slate-800">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            <Target className="h-5 w-5" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
            Puzzles solved
          </p>
          <p className="mt-1 text-3xl font-black text-slate-900 dark:text-white">
            {progress.totalPuzzlesSolved}
          </p>
        </div>

        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm dark:bg-slate-800">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
            <Flame className="h-5 w-5" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
            Current streak
          </p>
          <p className="mt-1 text-3xl font-black text-slate-900 dark:text-white">
            {progress.streak}
          </p>
        </div>

        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm dark:bg-slate-800">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            <Trophy className="h-5 w-5" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
            Overall level
          </p>
          <p className="mt-1 text-3xl font-black text-slate-900 dark:text-white">
            {level}
          </p>
        </div>
      </div>

      {/* Theme breakdown */}
      <div className="mb-6 rounded-[1.75rem] bg-white p-5 shadow-sm dark:bg-slate-800">
        <h2 className="mb-4 text-lg font-black text-slate-900 dark:text-white">
          Puzzle themes
        </h2>
        <div className="space-y-3">
          {themeEntries.map(([theme, data]) => {
            const percent =
              data.attempts > 0
                ? Math.round((data.solved / data.attempts) * 100)
                : 0;
            return (
              <div key={theme}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-bold capitalize text-slate-700 dark:text-slate-300">
                    {theme}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Level {data.level} · {data.solved}/{data.attempts}{" "}
                    {data.attempts > 0 && `(${percent}%)`}
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

      {/* CTA */}
      <div className="rounded-[1.75rem] bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-center text-white">
        <h2 className="text-xl font-black">Keep playing, keep improving</h2>
        <p className="mt-2 text-sm text-blue-100">
          Every game teaches you something. Play another and watch your stats
          grow.
        </p>
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
