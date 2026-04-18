import { Link } from "react-router-dom";
import { Brain, Play, Sparkles, Target, Trophy, Zap } from "lucide-react";

export function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header / Hero */}
      <header className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.32),_transparent_40%),linear-gradient(180deg,_#020617_0%,_#0f172a_55%,_#111827_100%)] px-6 py-8 sm:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-black text-white shadow-lg shadow-blue-500/30">
                T
              </div>
              <div>
                <p className="text-lg font-black tracking-tight text-white">
                  TacticalPath
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-200">
                  Chess coaching
                </p>
              </div>
            </div>
            <Link
              to="/dashboard"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-blue-50"
            >
              Start playing
            </Link>
          </div>

          {/* Hero content */}
          <div className="mt-14 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-blue-100">
              <Sparkles className="h-4 w-4" /> Chess coaching that makes sense
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl">
              Every game has a turning point. TacticalPath shows you yours.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Play chess against smart bots, see the one move that changed the
              result, and carry that lesson into the rematch. Plus Morabaraba and
              classic strategy games to sharpen how you think.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/play/chess"
                className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 font-black text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-500"
              >
                <Play className="h-4 w-4" /> Play chess now
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-7 py-4 font-bold text-white transition hover:bg-white/10"
              >
                <Zap className="h-4 w-4" /> Choose a game
              </Link>
            </div>
          </div>

          {/* Value props */}
          <div className="mt-14 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-200">
                Coaching
              </p>
              <p className="mt-2 text-lg font-black text-white">
                One insight, not forty annotations
              </p>
              <p className="mt-1 text-sm text-slate-300">
                After every game, TacticalPath finds the single turning point
                and explains it in plain language.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-200">
                Morabaraba
              </p>
              <p className="mt-2 text-lg font-black text-white">
                The game you grew up with, on your phone
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Build mills, block threats, and learn positional patience in a
                classic strategy game — with coaching tips.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-200">
                Daily Board
              </p>
              <p className="mt-2 text-lg font-black text-white">
                One chess puzzle every day
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Solve it in 90 seconds, build your streak, and carry the lesson
                into your next game.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Games section */}
      <main className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        {/* How it works */}
        <section className="mb-16">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-200">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-black text-white">
            Play, learn, play sharper
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-200">
                <Play className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-black text-white">Play a game</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Pick chess, Morabaraba, checkers, or Tic Tac Toe. Play against a
                smart bot at your level.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-200">
                <Brain className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-black text-white">
                See your turning point
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                TacticalPath finds the one moment that changed the result and
                explains it in a sentence you&#39;ll remember.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-200">
                <Trophy className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-black text-white">Play sharper</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Carry the lesson into your next game. Track your progress. Build
                your streak. Get better over time.
              </p>
            </div>
          </div>
        </section>

        {/* Game lineup */}
        <section className="mb-16">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-200">
            Games
          </p>
          <h2 className="mt-2 text-3xl font-black text-white">
            Chess leads. Morabaraba differentiates.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
            Chess is the core training board with the deepest coaching. Morabaraba
            is the distinctive strategy game nobody else has on mobile. Checkers
            and Tic Tac Toe round out the library.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {/* Chess — hero card */}
            <Link
              to="/play/chess"
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl transition hover:-translate-y-1 hover:bg-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-3xl text-white">
                  ♞
                </div>
                <span className="rounded-full bg-blue-500/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-blue-200">
                  Core game
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-black text-white">Chess</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Play full matches against smart bots, sharpen your plans, and
                review the turning point that decided the board.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                  vs computer
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                  coaching
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                  daily puzzle
                </span>
              </div>
              <div className="mt-5 inline-flex items-center gap-2 font-black text-white">
                <Play className="h-4 w-4" /> Play chess
              </div>
            </Link>

            {/* Morabaraba — featured card */}
            <Link
              to="/morris"
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl transition hover:-translate-y-1 hover:bg-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-3xl text-white">
                  ◎
                </div>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-200">
                  Featured game
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-black text-white">
                Morabaraba
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                The mill-building strategy game passed down across generations.
                Place your pieces, form three-in-a-row, and outsmart the board.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                  vs computer
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                  coaching tips
                </span>
              </div>
              <div className="mt-5 inline-flex items-center gap-2 font-black text-white">
                <Play className="h-4 w-4" /> Play Morabaraba
              </div>
            </Link>
          </div>

          {/* Quick games row */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Link
              to="/tictactoe"
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-xl text-white">
                  ✕
                </div>
                <div>
                  <h3 className="font-black text-white">Tic Tac Toe</h3>
                  <p className="text-sm text-slate-400">
                    Quick game, sharp thinking
                  </p>
                </div>
              </div>
            </Link>
            <Link
              to="/checkers"
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 text-xl text-white">
                  ●
                </div>
                <div>
                  <h3 className="font-black text-white">Checkers</h3>
                  <p className="text-sm text-slate-400">
                    Classic captures and king chases
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-[2rem] bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-center">
          <Target className="mx-auto h-10 w-10 text-blue-200" />
          <h2 className="mt-4 text-3xl font-black text-white">
            Start with today&#39;s puzzle
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-blue-100">
            One chess position. One best move. Build your streak, sharpen your
            instincts, and carry the lesson into your next game.
          </p>
          <Link
            to="/dashboard"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-black text-blue-700 transition hover:bg-blue-50"
          >
            <Play className="h-4 w-4" /> Go to your training board
          </Link>
        </section>
      </main>
    </div>
  );
}
