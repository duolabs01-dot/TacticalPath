import { Link } from "react-router-dom";
import { ArrowRight, Brain, Play, Sparkles, Target, Trophy } from "lucide-react";
import { useProgress } from "../hooks/useProgress";

export function Dashboard() {
  const { progress, getOverallLevel } = useProgress();
  const level = getOverallLevel();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
      {/* Welcome header */}
      <header className="mb-8 rounded-[2.25rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 px-6 py-8 text-white shadow-2xl shadow-slate-300 md:px-8 md:py-10">
        <div className="grid gap-8 xl:grid-cols-[1.25fr,0.75fr] xl:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-blue-100">
              <Sparkles className="h-4 w-4" /> Your training board
            </div>
            <h1 className="mt-5 text-3xl font-black tracking-tight md:text-5xl">
              Welcome back, {progress.username}.
              <br />
              Pick up where you left off.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
              Solve today&#39;s puzzle, play a game, and see the moment that
              mattered most.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/play/chess"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-blue-50"
              >
                <Play className="h-4 w-4" /> Play chess
              </Link>
              <Link
                to="/morris"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <Play className="h-4 w-4" /> Play Morabaraba
              </Link>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid gap-3 rounded-[2rem] bg-white/10 p-4 backdrop-blur sm:grid-cols-2">
            <div className="rounded-[1.5rem] bg-white/10 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-100">
                Puzzles solved
              </p>
              <p className="mt-2 text-3xl font-black">
                {progress.totalPuzzlesSolved}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-100">
                Current streak
              </p>
              <p className="mt-2 text-3xl font-black">{progress.streak}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-100">
                Overall level
              </p>
              <p className="mt-2 text-3xl font-black">{level}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-100">
                Difficulty
              </p>
              <p className="mt-2 text-3xl font-black capitalize">
                {progress.difficulty}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Daily Board stub + Chess hero */}
      <section className="mb-8 grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
        {/* Daily Board placeholder */}
        <Link
          to="/daily"
          className="rounded-[2rem] bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white shadow-xl shadow-amber-200 transition hover:-translate-y-0.5 dark:shadow-none"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-100">
                Daily Board
              </p>
              <h2 className="mt-2 text-2xl font-black">
                Today's puzzle
              </h2>
            </div>
            <Target className="h-8 w-8 text-amber-200" />
          </div>
          <p className="mt-3 text-sm leading-7 text-amber-50">
            One chess position pulled from Lichess every day. Find the best move, build your streak.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm font-black text-white/90">
            Solve it <ArrowRight className="h-4 w-4" />
          </div>
        </Link>

        {/* Chess — primary game card */}
        <Link
          to="/play/chess"
          className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200 transition hover:-translate-y-0.5 dark:bg-slate-800 dark:shadow-none"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">
                Your main game
              </p>
              <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                Chess
              </h2>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-3xl text-white">
              ♞
            </div>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Play against a smart bot at your level. After the game, see the one
            move that would have changed the result.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
            Play now <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
      </section>

      {/* Morabaraba + quick games */}
      <section className="mb-8 grid gap-4 md:grid-cols-3">
        {/* Morabaraba — featured */}
        <Link
          to="/morris"
          className="rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-200 transition-transform hover:-translate-y-1 dark:bg-slate-800 dark:shadow-none"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-2xl text-white">
            ◎
          </div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
            Featured game
          </p>
          <h2 className="mt-2 text-xl font-black text-slate-900 dark:text-white">
            Morabaraba
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            The mill-building strategy game passed down across generations.
            Place your pieces, form three-in-a-row, and outsmart the board.
          </p>
        </Link>

        {/* Tic Tac Toe — quick game */}
        <Link
          to="/tictactoe"
          className="rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-200 transition-transform hover:-translate-y-1 dark:bg-slate-800 dark:shadow-none"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-2xl text-white">
            ✕
          </div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-600">
            Quick game
          </p>
          <h2 className="mt-2 text-xl font-black text-slate-900 dark:text-white">
            Tic Tac Toe
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Quick game, sharp thinking. Perfect for a fast warm-up.
          </p>
        </Link>

        {/* Checkers — quick game */}
        <Link
          to="/checkers"
          className="rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-200 transition-transform hover:-translate-y-1 dark:bg-slate-800 dark:shadow-none"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-600 text-2xl text-white">
            ●
          </div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-rose-600">
            Quick game
          </p>
          <h2 className="mt-2 text-xl font-black text-slate-900 dark:text-white">
            Checkers
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Classic captures and king chases. Leap, trap, and promote.
          </p>
        </Link>
      </section>

      {/* How it works  */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm dark:bg-slate-800">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            <Play className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            Play a game
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Pick your board and difficulty. Play against a smart bot that
            matches your level.
          </p>
        </div>
        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm dark:bg-slate-800">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            <Brain className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            See your turning point
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            One coaching insight per game — the moment that changed the result,
            explained in language you&#39;ll remember.
          </p>
        </div>
        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm dark:bg-slate-800">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
            <Trophy className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            Play sharper
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Track your progress, build your streak, and carry the lesson into
            the rematch.
          </p>
        </div>
      </section>
    </div>
  );
}
