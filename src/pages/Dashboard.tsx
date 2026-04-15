import { Link } from "react-router-dom";
import { ArrowRight, Brain, Flame, Play, Sparkles, Swords, Trophy, Zap } from "lucide-react";
import { useProgress } from "../hooks/useProgress";
import { gameLibrary } from "../data/games";

const featuredLoop = [
  {
    title: "Play a full board",
    description: "Open your strongest active game and make one honest decision under pressure.",
  },
  {
    title: "Catch the turning point",
    description: "Coaching should point to the moment that changed the result instead of filling the screen with noise.",
  },
  {
    title: "Rematch while warm",
    description: "Keep the lesson alive with a fast replay or a shorter game that still tests the same habit.",
  },
];

export function Dashboard() {
  const { progress, getOverallLevel } = useProgress();
  const liveGames = gameLibrary.filter((game) => game.status === "live");
  const fallbackGame = gameLibrary[0];
  const level = getOverallLevel();
  const nextGame = liveGames[0] ?? fallbackGame;
  const warmUpGame = liveGames.find((game) => game.id === "tictactoe") ?? liveGames[1] ?? nextGame;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
      <header className="mb-8 rounded-[2.25rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 px-6 py-8 text-white shadow-2xl shadow-slate-300 md:px-8 md:py-10">
        <div className="grid gap-8 xl:grid-cols-[1.25fr,0.75fr] xl:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-blue-100">
              <Sparkles className="h-4 w-4" /> Arcade loop hub
            </div>
            <h1 className="mt-5 text-3xl font-black tracking-tight md:text-5xl">Ready for your next good decision, {progress.username}?</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
              This dashboard should feel like a launchpad, not a report. Start with the fastest useful game, chase one sharper idea,
              then roll straight into the rematch while your timing is still alive.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to={nextGame.path} className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-blue-50">
                <Play className="h-4 w-4" /> Continue with {nextGame.name}
              </Link>
              <Link to="/multiplayer" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10">
                <Swords className="h-4 w-4" /> Set up local play
              </Link>
            </div>
          </div>

          <div className="grid gap-3 rounded-[2rem] bg-white/10 p-4 backdrop-blur sm:grid-cols-2 xl:grid-cols-2">
            <div className="rounded-[1.5rem] bg-white/10 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-100">Training reps</p>
              <p className="mt-2 text-3xl font-black">{progress.totalPuzzlesSolved}</p>
              <p className="mt-1 text-xs text-slate-200">Every solved rep sharpens the loop.</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-100">Current streak</p>
              <p className="mt-2 text-3xl font-black">{progress.streak}</p>
              <p className="mt-1 text-xs text-slate-200">Momentum matters more than perfect volume.</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-100">Overall level</p>
              <p className="mt-2 text-3xl font-black">{level}</p>
              <p className="mt-1 text-xs text-slate-200">Built from your theme mastery.</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-100">Mode</p>
              <p className="mt-2 text-3xl font-black capitalize">{progress.difficulty}</p>
              <p className="mt-1 text-xs text-slate-200">Set the pressure that fits today.</p>
            </div>
          </div>
        </div>
      </header>

      <section className="mb-8 grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">Next action</p>
              <h2 className="mt-2 text-2xl font-black text-slate-900">Your strongest loop right now</h2>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">Start here</span>
          </div>
          <div className="mt-5 rounded-[1.75rem] bg-slate-950 p-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl text-white ${nextGame.accentClass}`}>{nextGame.icon}</div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-200">{nextGame.sessionLabel}</p>
                  <h3 className="mt-1 text-2xl font-black">{nextGame.name}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-slate-200">{nextGame.energy}</p>
                </div>
              </div>
              <Flame className="h-5 w-5 text-amber-300" />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {nextGame.modes.map((mode) => (
                <span key={mode} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100">{mode}</span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={nextGame.path} className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-blue-50">
                <Play className="h-4 w-4" /> Launch {nextGame.name}
              </Link>
              <Link to="/game-analysis" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                <Brain className="h-4 w-4" /> Review turning point
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-600">Loop recipe</p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">Three moves for a better session</h2>
          <div className="mt-6 space-y-4">
            {featuredLoop.map((step, index) => (
              <div key={step.title} className="flex gap-4 rounded-[1.5rem] bg-slate-50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-sm font-black text-slate-900 shadow-sm">0{index + 1}</div>
                <div>
                  <h3 className="font-black text-slate-900">{step.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8 grid gap-4 md:grid-cols-3">
        <Link to={warmUpGame.path} className="rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-200 transition-transform hover:-translate-y-1">
          <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl text-white ${warmUpGame.accentClass}`}>{warmUpGame.icon}</div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-600">Fastest loop</p>
          <h2 className="mt-2 text-xl font-black text-slate-900">Warm up with {warmUpGame.name}</h2>
          <p className="mt-2 text-sm text-slate-600">{warmUpGame.energy}</p>
        </Link>

        <Link to="/multiplayer" className="rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-200 transition-transform hover:-translate-y-1">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-2xl text-white">⚔</div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">Social lane</p>
          <h2 className="mt-2 text-xl font-black text-slate-900">Set up local or pass-and-play</h2>
          <p className="mt-2 text-sm text-slate-600">Honest multiplayer copy points players toward what works today instead of dead-end lobby theatre.</p>
        </Link>

        <Link to="/puzzle-bank" className="rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-200 transition-transform hover:-translate-y-1">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-2xl text-white">◎</div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-600">Sharpen the habit</p>
          <h2 className="mt-2 text-xl font-black text-slate-900">Drill the pattern you keep missing</h2>
          <p className="mt-2 text-sm text-slate-600">Training still matters, but the hub now treats it as fuel for better games instead of the main event.</p>
        </Link>
      </section>

      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Live lineup</h2>
            <p className="text-sm text-slate-500">Every card should make the next action obvious.</p>
          </div>
          <Link to="/" className="text-sm font-bold text-blue-600">Back to public home</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {liveGames.map((game) => (
            <Link key={game.id} to={game.path} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl text-white ${game.accentClass}`}>{game.icon}</div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">{game.sessionLabel}</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">{game.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{game.summary}</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">Loop energy</p>
              <p className="mt-1 text-sm font-medium text-slate-700">{game.energy}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                Launch board <ArrowRight className="h-4 w-4" />
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
          <p className="mt-2 text-sm text-slate-600">Landing and dashboard now act like launchpads, not sign-in funnels or classroom reports.</p>
        </div>
        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Brain className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-black text-slate-900">One sharp lesson</h3>
          <p className="mt-2 text-sm text-slate-600">Coaching copy is framed as the turning point you can carry into the next match.</p>
        </div>
        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <Trophy className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-black text-slate-900">Progress with urgency</h3>
          <p className="mt-2 text-sm text-slate-600">Profile and settings now reinforce session momentum instead of old classroom residue.</p>
        </div>
      </section>
    </div>
  );
}
