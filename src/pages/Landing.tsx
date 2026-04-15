import { Link } from "react-router-dom";
import { Brain, Clock3, Play, Sparkles, Swords, Trophy, Users, Zap } from "lucide-react";
import { gameLibrary } from "../data/games";

const featuredGames = gameLibrary.filter((game) => game.status === "live");
const quickStartGames = gameLibrary.slice(0, 3);

export function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.32),_transparent_40%),linear-gradient(180deg,_#020617_0%,_#0f172a_55%,_#111827_100%)] px-6 py-8 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-black text-white shadow-lg shadow-blue-500/30">T</div>
              <div>
                <p className="text-lg font-black tracking-tight text-white">TacticalPath</p>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-200">Public arcade</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/multiplayer" className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                Friend play
              </Link>
              <Link to="/dashboard" className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-blue-50">
                Enter arcade
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-blue-100">
                <Sparkles className="h-4 w-4" /> Play-first strategy training
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl">
                Start a game in seconds. Learn from the turning point. Hit rematch while it still matters.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Tactical Path should feel like a living arcade, not a gated classroom. Browse the boards in public, jump straight into a playable loop, and keep your momentum between matches.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/play/chess" className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 font-black text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-500">
                  <Play className="h-4 w-4" /> Play chess now
                </Link>
                <Link to="/play" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-7 py-4 font-bold text-white transition hover:bg-white/10">
                  <Zap className="h-4 w-4" /> Quick-start arcade
                </Link>
              </div>
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-200">Fast path</p>
                  <p className="mt-2 text-lg font-black text-white">Public home stays playable</p>
                  <p className="mt-1 text-sm text-slate-300">No sign-in wall just to see the games and start the loop.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-200">Honest social play</p>
                  <p className="mt-2 text-lg font-black text-white">Local first</p>
                  <p className="mt-1 text-sm text-slate-300">Same-device matches work now. Invite links come next.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-200">Progress energy</p>
                  <p className="mt-2 text-lg font-black text-white">Play, spot, rematch</p>
                  <p className="mt-1 text-sm text-slate-300">Every screen should point to the next good move.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-blue-950/40 backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-200">Tonight's quick start</p>
                  <h2 className="mt-2 text-2xl font-black text-white">Pick your energy</h2>
                </div>
                <div className="rounded-2xl bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-100">Live boards</div>
              </div>
              <div className="mt-6 space-y-3">
                {quickStartGames.map((game) => (
                  <Link key={game.id} to={game.path} className="flex items-start justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
                    <div className="flex gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl text-white ${game.accentClass}`}>
                        {game.icon}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-black text-white">{game.name}</h3>
                          <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-200">{game.sessionLabel}</span>
                        </div>
                        <p className="mt-1 text-sm text-slate-300">{game.energy}</p>
                      </div>
                    </div>
                    <Play className="mt-1 h-4 w-4 text-slate-300" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <section className="mb-16 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-200">
              <Clock3 className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-black text-white">Faster path to play</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">The best session starts with a board, not an explanation. Landing pushes straight into live games and the arcade hub.</p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-200">
              <Users className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-black text-white">Social without pretending</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">Multiplayer is framed around what exists today: local, pass-and-play, and game-aware invites coming next.</p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-200">
              <Brain className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-black text-white">Coaching after contact</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">The lesson should arrive after real play and point to the one decision worth carrying into the rematch.</p>
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-200">Game lineup</p>
              <h2 className="mt-2 text-3xl font-black text-white">Pick the board that matches your mood</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">Every game gets a clearer promise: what it feels like, what it teaches, and how social it really is.</p>
            </div>
            <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
              <Trophy className="h-4 w-4" /> Open arcade hub
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredGames.map((game) => (
              <div key={game.id} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/10 transition hover:-translate-y-1 hover:bg-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl text-white ${game.accentClass}`}>
                    {game.icon}
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-200">{game.status === "live" ? "Live now" : "Building"}</span>
                </div>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-black text-white">{game.name}</h3>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-200">{game.sessionLabel}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">{game.summary}</p>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Why it feels alive</p>
                <p className="mt-1 text-sm text-slate-200">{game.energy}</p>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Multiplayer truth</p>
                <p className="mt-1 text-sm text-slate-200">{game.multiplayerStatus}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {game.modes.map((mode) => (
                    <span key={mode} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                      {mode}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <Link to={game.path} className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-blue-50">
                    <Play className="h-4 w-4" /> Play now
                  </Link>
                  <Link to="/multiplayer" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                    <Swords className="h-4 w-4" /> Social modes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
