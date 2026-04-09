import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, Filter, Search, Sparkles, Target, Trophy } from "lucide-react";

const themeCards = [
  { title: "1-Move Checkmates", subtitle: "Fast confidence wins", mastery: "Strong this week", to: "/puzzle-play", tone: "bg-blue-50 text-blue-700" },
  { title: "Basic Forks", subtitle: "Double attacks and clean gains", mastery: "Needs one more push", to: "/puzzle-play", tone: "bg-emerald-50 text-emerald-700" },
  { title: "Basic Pins", subtitle: "Freeze the defender first", mastery: "Solid progress", to: "/puzzle-play", tone: "bg-amber-50 text-amber-700" },
  { title: "Missed Captures", subtitle: "Count what is hanging", mastery: "Coach focus area", to: "/puzzle-play", tone: "bg-rose-50 text-rose-700" },
];

export function PuzzleBank() {
  return (
    <div className="tp-page flex-1 overflow-y-auto pb-24 pt-6">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center px-4 sm:px-6">
          <Link
            to="/study-plan"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:text-blue-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="ml-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Practice bank</p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-950">Launch theme drills</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="tp-card rounded-[2rem] p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
              <Sparkles className="h-3.5 w-3.5" />
              Practice without the noise
            </div>
            <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-slate-950">
              Short drills tied to the classroom plan
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              The practice tab should feel simple and purposeful. Instead of fake arcade modes or giant puzzle counts, it now centers the launch themes that matter to the classroom loop.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">Hanging Pieces</span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">Missed Captures</span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">1-Move Mates</span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">Basic Forks</span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">Basic Pins</span>
            </div>
          </div>

          <div className="tp-card rounded-[2rem] p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Current filters</p>
                <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950">Begin with what matters</h3>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <Filter className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="rounded-[1.4rem] bg-slate-50 p-4">Today the smart default is launch themes only.</div>
              <div className="rounded-[1.4rem] bg-slate-50 p-4">Every drill link still routes into the working puzzle prototype.</div>
              <div className="rounded-[1.4rem] bg-slate-50 p-4">Real puzzle assignment logic will come later with student data and verified imports.</div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search practice themes"
              className="w-full rounded-[1.6rem] border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-300"
            />
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          {themeCards.map((card) => (
            <Link key={card.title} to={card.to} className="tp-card-hover rounded-[1.7rem] border border-slate-200 bg-white p-5 transition">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${card.tone}`}>{card.mastery}</div>
                  <h3 className="mt-3 text-xl font-bold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.subtitle}</p>
                </div>
                <ChevronRight className="mt-1 h-4 w-4 text-slate-400" />
              </div>
            </Link>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="tp-card rounded-[2rem] p-6 sm:p-7">
            <div className="flex items-center gap-3 text-slate-900">
              <Target className="h-5 w-5 text-blue-600" />
              <h2 className="font-display text-3xl font-bold tracking-tight">Daily focus</h2>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              If a student only has a minute before the next round, the smartest move is still one clean puzzle instead of a sprawling menu.
            </p>
            <Link to="/puzzle-play" className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700">
              Start one short drill
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="tp-card rounded-[2rem] p-6 sm:p-7">
            <div className="flex items-center gap-3 text-slate-900">
              <Trophy className="h-5 w-5 text-emerald-600" />
              <h2 className="font-display text-3xl font-bold tracking-tight">Prototype honesty</h2>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              This page is now a clean practice selector. It does not pretend there are live mastery-driven recommendations yet; it simply routes students into the working puzzle surface with better product logic.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
