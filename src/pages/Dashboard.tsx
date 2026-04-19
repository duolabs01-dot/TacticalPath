import { Link } from "react-router-dom";
import { ArrowRight, Brain, Play, Sparkles, Target, Trophy, Clock3 } from "lucide-react";
import { useProgress, useGameResults } from "../hooks/useProgress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Dashboard() {
  const { progress, getOverallLevel } = useProgress();
  const { records } = useGameResults();
  const level = getOverallLevel();
  const lastGame = records.length > 0 ? records[records.length - 1] : null;

  return (
    <div className="mx-auto max-w-7xl px-3 py-4 md:px-6 md:py-6">
      {/* Welcome header */}
      <header className="mb-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 px-5 py-6 text-white shadow-2xl shadow-slate-300 md:rounded-[2.25rem] md:px-8 md:py-8">
        <div className="grid gap-6 lg:grid-cols-[1.25fr,0.75fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-blue-100">
              <Sparkles className="h-3.5 w-3.5" /> Your training board
            </div>
            <h1 className="mt-4 text-2xl font-black tracking-tight md:mt-5 md:text-4xl lg:text-5xl">
              Welcome back, {progress.username || 'Player'}.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Pick up where you left off.
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-200 md:mt-4 md:text-base">
              Solve today&#39;s puzzle, play a game, and see the moment that
              mattered most.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5 md:mt-7">
              <Button asChild className="rounded-xl font-bold text-sm h-11 px-5" size="sm">
                <Link to="/play/chess">
                  <Play className="mr-2 h-4 w-4" /> Play chess
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl font-bold text-sm h-11 px-5 bg-white/10 border-white/15 text-white hover:bg-white/20 hover:text-white" size="sm">
                <Link to="/morris">
                  <Play className="mr-2 h-4 w-4" /> Play Morabaraba
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-2.5 rounded-2xl bg-white/10 p-3 backdrop-blur md:rounded-[2rem] md:p-4">
            {[
              { label: 'Puzzles solved', value: progress.totalPuzzlesSolved },
              { label: 'Current streak', value: progress.streak },
              { label: 'Overall level', value: level },
              { label: 'Difficulty', value: progress.difficulty }
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/10 p-3 md:rounded-[1.5rem] md:p-4">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-blue-100 line-clamp-1">
                  {stat.label}
                </p>
                <p className="mt-1.5 text-2xl font-black md:mt-2 md:text-3xl">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Last Played */}
      {lastGame && (
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Clock3 className="w-4 h-4 text-slate-400" />
            <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">Recent match</h2>
          </div>
          <Card className="overflow-hidden border-slate-200 shadow-sm dark:border-slate-700">
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-2xl text-white md:h-16 md:w-16 md:rounded-[1.25rem]">
                {lastGame.game === "chess" ? "♟" : lastGame.game === "checkers" ? "⬤" : lastGame.game === "morris" ? "◎" : "✕"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {lastGame.game}
                </div>
                <h3 className="mt-1.5 text-lg font-black text-slate-900 dark:text-white truncate">
                  You {lastGame.won ? "won" : "lost"} against the Bot
                </h3>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  Played {new Date(lastGame.ts).toLocaleDateString()}. Keep your streak alive!
                </p>
              </div>
              <Button asChild className="rounded-xl font-bold text-sm h-10 shrink-0 w-full sm:w-auto" size="sm">
                <Link to={`/play/${lastGame.game}`}>
                  Play again <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Daily Board + Chess hero */}
      <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.1fr,0.9fr]">
        {/* Daily Board */}
        <Link
          to="/daily"
          className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-5 text-white shadow-lg shadow-amber-200/50 transition-transform hover:scale-[1.02] active:scale-[0.98] md:rounded-[2rem] md:p-6"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-100">
                Daily Board
              </p>
              <h2 className="mt-1.5 text-xl font-black md:text-2xl">
                Today's puzzle
              </h2>
            </div>
            <Target className="h-6 w-6 text-amber-200 md:h-8 md:w-8" />
          </div>
          <p className="mt-2.5 text-sm leading-6 text-amber-50">
            One chess position every day. Find the best move, build your streak.
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-black text-white/90">
            Solve it <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </Link>

        {/* Chess — primary game card */}
        <Link
          to="/play/chess"
          className="rounded-2xl bg-white p-5 shadow-lg shadow-slate-200/50 transition-transform hover:scale-[1.02] active:scale-[0.98] dark:bg-slate-800 md:rounded-[2rem] md:p-6"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                Your main game
              </p>
              <h2 className="mt-1.5 text-xl font-black text-slate-900 dark:text-white md:text-2xl">
                Chess
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-2xl text-white md:h-14 md:w-14">
              ♞
            </div>
          </div>
          <p className="mt-2.5 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Play against a smart bot at your level. See the move that would have changed the result.
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400">
            Play now <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </Link>
      </section>

      {/* Morabaraba + quick games */}
      <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Morabaraba — featured */}
        <Link
          to="/morris"
          className="rounded-2xl bg-white p-4 shadow-lg shadow-slate-200/50 transition-transform hover:scale-[1.02] active:scale-[0.98] dark:bg-slate-800"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-xl text-white md:h-12 md:w-12">
            ◎
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
            Featured game
          </p>
          <h2 className="mt-1.5 text-lg font-black text-slate-900 dark:text-white">
            Morabaraba
          </h2>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
            The mill-building strategy game passed down across generations.
          </p>
        </Link>

        {/* Tic Tac Toe — quick game */}
        <Link
          to="/tictactoe"
          className="rounded-2xl bg-white p-4 shadow-lg shadow-slate-200/50 transition-transform hover:scale-[1.02] active:scale-[0.98] dark:bg-slate-800"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-xl text-white md:h-12 md:w-12">
            ✕
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            Quick game
          </p>
          <h2 className="mt-1.5 text-lg font-black text-slate-900 dark:text-white">
            Tic Tac Toe
          </h2>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
            Quick game, sharp thinking.
          </p>
        </Link>

        {/* Checkers — quick game */}
        <Link
          to="/checkers"
          className="rounded-2xl bg-white p-4 shadow-lg shadow-slate-200/50 transition-transform hover:scale-[1.02] active:scale-[0.98] dark:bg-slate-800"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 text-xl text-white md:h-12 md:w-12">
            ●
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600 dark:text-rose-400">
            Quick game
          </p>
          <h2 className="mt-1.5 text-lg font-black text-slate-900 dark:text-white">
            Checkers
          </h2>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
            Classic captures and king chases.
          </p>
        </Link>
      </section>

      {/* How it works */}
      <section className="grid gap-4 sm:grid-cols-3">
        <Card className="border-slate-200 shadow-sm dark:border-slate-700">
          <CardContent className="p-4">
            <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Play className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Play a game
            </h3>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
              Pick your board and difficulty. Play against a smart bot.
            </p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm dark:border-slate-700">
          <CardContent className="p-4">
            <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <Brain className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              See your turning point
            </h3>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
              One coaching insight per game — explained simply.
            </p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm dark:border-slate-700">
          <CardContent className="p-4">
            <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <Trophy className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Play sharper
            </h3>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
              Track progress and carry the lesson into the rematch.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
