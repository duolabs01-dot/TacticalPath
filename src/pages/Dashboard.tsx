import { Link } from "react-router-dom";
import { Brain, Sparkles, Zap } from "lucide-react";
import { useProgress } from "../hooks/useProgress";
import { gameLibrary } from "../data/games";

export function Dashboard() {
  const { progress } = useProgress();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
      <header className="mb-8 rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 px-6 py-8 text-white shadow-2xl shadow-slate-300">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-200">Arcade</p>
        <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">Ready for your next good decision, {progress.username}?</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              Tactical Path works best when every session has a clear loop: play a smart match, spot one turning point,
              and go straight into the rematch while the lesson is still fresh.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 rounded-3xl bg-white/10 p-4 backdrop-blur md:min-w-[280px]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-100">Training reps</p>
              <p className="mt-1 text-2xl font-black">{progress.totalPuzzlesSolved}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-100">Streak</p>
              <p className="mt-1 text-2xl font-black">{progress.streak}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-100">Mode</p>
              <p className="mt-1 text-2xl font-black capitalize">{progress.difficulty}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="mb-8 grid gap-4 md:grid-cols-3">
        <Link to="/play/chess" className="rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-200 transition-transform hover:-translate-y-1">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white">♞</div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Start here</p>
          <h2 className="mt-2 text-xl font-black text-slate-900">Play chess vs computer</h2>
          <p className="mt-2 text-sm text-slate-600">Open a full game, not just a puzzle. Use this when you want the deepest match loop right now.</p>
        </Link>

        <Link to="/tictactoe" className="rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-200 transition-transform hover:-translate-y-1">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-2xl text-white">✕</div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-600">Fastest loop</p>
          <h2 className="mt-2 text-xl font-black text-slate-900">Warm up with Tic Tac Toe</h2>
          <p className="mt-2 text-sm text-slate-600">Quick rematches, bot personalities, and the clearest coaching loop in the app so far.</p>
        </Link>

        <Link to="/multiplayer" className="rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-200 transition-transform hover:-translate-y-1">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-2xl text-white">⚔</div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">Play together</p>
          <h2 className="mt-2 text-xl font-black text-slate-900">Set up local or friend play</h2>
          <p className="mt-2 text-sm text-slate-600">Choose the social mode honestly instead of wandering through old coach-era screens.</p>
        </Link>
      </section>

      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Game lineup</h2>
            <p className="text-sm text-slate-500">Every game should help you think better, not just fill the screen.</p>
          </div>
          <Link to="/" className="text-sm font-bold text-blue-600">Back to library</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {gameLibrary.map((game) => (
            <Link key={game.id} to={game.path} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl text-white ${game.accentClass}`}>
                  {game.icon}
                </div>
                <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${game.status === 'live' ? 'bg-emerald-50 text-emerald-700' : 'bg-violet-50 text-violet-700'}`}>
                  {game.status === 'live' ? 'Live now' : 'Building up'}
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900">{game.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{game.summary}</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">Coach focus</p>
              <p className="mt-1 text-sm font-medium text-slate-700">{game.coachFocus}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {game.modes.map((mode) => (
                  <span key={mode} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {mode}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-black text-slate-900">Play first</h3>
          <p className="mt-2 text-sm text-slate-600">The app should drop you into a strong match loop quickly, not bury you in old dashboard leftovers.</p>
        </div>
        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Brain className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-black text-slate-900">One sharp lesson</h3>
          <p className="mt-2 text-sm text-slate-600">Coaching should tell you the one thing that changed the game, then get out of the way.</p>
        </div>
        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <Zap className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-black text-slate-900">Rematch fast</h3>
          <p className="mt-2 text-sm text-slate-600">Replay should be immediate. Momentum matters more than extra menus when someone is trying to improve.</p>
        </div>
      </section>
    </div>
  );
}
