import { Link } from "react-router-dom";
import { Brain, Play, Users } from "lucide-react";
import { gameLibrary } from "../data/games";

const games = gameLibrary;

export function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl text-white shadow-xl shadow-blue-200">
            ♞
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">Tactical Path</h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-600">
            Become a better thinker through playable strategy games, smart bot opponents, and coaching that tells you what actually mattered.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/dashboard" className="rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700">
              Enter the arcade
            </Link>
            <Link to="/multiplayer" className="rounded-2xl border border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 transition-all hover:bg-slate-50">
              Play with friends
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Games library</h2>
            <p className="mt-1 text-slate-500">Start with the board that matches your mood, then let the coach sharpen the lesson.</p>
          </div>
          <div className="hidden gap-3 sm:flex">
            <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              <Brain className="h-4 w-4" /> AI coaching
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <Users className="h-4 w-4" /> Friend play
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <div key={game.id} className="group relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl text-white shadow-lg ${game.accentClass}`}>
                {game.icon}
              </div>
              <div className="mb-3 flex items-center justify-between gap-4">
                <h3 className="text-2xl font-bold text-slate-900">{game.name}</h3>
                <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${game.status === 'live' ? 'bg-emerald-50 text-emerald-700' : 'bg-violet-50 text-violet-700'}`}>
                  {game.status === 'live' ? 'Live' : 'Improving'}
                </span>
              </div>
              <p className="leading-relaxed text-slate-600">{game.summary}</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">Why it matters</p>
              <p className="mt-1 text-sm text-slate-700">{game.coachFocus}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {game.modes.map((mode) => (
                  <span key={mode} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {mode}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between">
                <Link to={game.path} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-slate-800">
                  <Play className="h-4 w-4" /> Play
                </Link>
                <Link to="/multiplayer" className="rounded-xl bg-slate-100 p-3 text-slate-600 transition-colors hover:bg-slate-200" title="Friend play">
                  <Users className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="mx-auto max-w-5xl border-t border-slate-200 px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">T</div>
              <span className="text-xl font-bold text-slate-900">TacticalPath</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              A strategy playground built around real play, fast rematches, and coaching that helps you think more clearly.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-slate-900">Play</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/dashboard" className="hover:text-blue-600">Arcade</Link></li>
              <li><Link to="/play/chess" className="hover:text-blue-600">Chess</Link></li>
              <li><Link to="/tictactoe" className="hover:text-blue-600">Tic Tac Toe</Link></li>
              <li><Link to="/checkers" className="hover:text-blue-600">Checkers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-slate-900">Learn</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/multiplayer" className="hover:text-blue-600">Friend play</Link></li>
              <li><Link to="/skill-insights" className="hover:text-blue-600">Progress tracking</Link></li>
              <li><Link to="/puzzle-bank" className="hover:text-blue-600">Training library</Link></li>
              <li><Link to="/settings" className="hover:text-blue-600">Settings</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 text-center text-xs text-slate-400">© 2026 TacticalPath. Play sharper. Think deeper.</div>
      </footer>
    </div>
  );
}
