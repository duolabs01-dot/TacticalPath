import { Link } from "react-router-dom";
import { Target, Sparkles, ArrowRight } from "lucide-react";

export function DailyBoard() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:px-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-amber-700 dark:bg-amber-950 dark:text-amber-300">
          <Target className="h-4 w-4" /> Daily Board
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Your daily chess puzzle
        </h1>
        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
          A new chess position every day. Find the strongest move. Build your
          streak.
        </p>
      </div>

      {/* Puzzle placeholder */}
      <div className="rounded-[2rem] border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-slate-50 p-8 text-center dark:border-blue-800 dark:from-blue-950/30 dark:to-slate-900/50">
        {/* Chess board placeholder */}
        <div className="mx-auto mb-6 flex h-48 w-48 items-center justify-center rounded-2xl bg-white shadow-lg dark:bg-slate-800">
          <div className="grid grid-cols-4 gap-0.5">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className={`h-10 w-10 rounded-sm ${
                  (Math.floor(i / 4) + (i % 4)) % 2 === 0
                    ? "bg-blue-100 dark:bg-blue-900/40"
                    : "bg-blue-300 dark:bg-blue-700/40"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-2xl bg-blue-100 px-5 py-3 text-sm font-bold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
          <Sparkles className="h-4 w-4" /> Launching next week
        </div>

        <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
          Your daily chess puzzle is almost ready. One position, one best move,
          90 seconds on the clock. Build your streak and carry the lesson into
          your next game.
        </p>
      </div>

      {/* In the meantime CTA */}
      <div className="mt-8 rounded-[1.75rem] bg-white p-6 shadow-lg shadow-slate-200 dark:bg-slate-800 dark:shadow-none">
        <h2 className="text-lg font-black text-slate-900 dark:text-white">
          While you wait
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Sharpen your thinking with a full game. Play chess against a smart bot
          at your level.
        </p>
        <Link
          to="/play/chess"
          className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-500"
        >
          Play chess now <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
