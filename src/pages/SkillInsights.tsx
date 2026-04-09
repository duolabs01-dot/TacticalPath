import { Link } from "react-router-dom";
import { ArrowLeft, BarChart2, BookOpen, ChevronRight, ShieldCheck, TrendingUp } from "lucide-react";

const masteryRows = [
  { theme: "1-Move Checkmates", level: "Level 4", note: "Fastest confidence builder right now", progress: 84 },
  { theme: "Basic Pins", level: "Level 3", note: "Stable and improving", progress: 68 },
  { theme: "Basic Forks", level: "Level 2", note: "Best next class focus", progress: 46 },
  { theme: "Missed Captures", level: "Level 2", note: "Still rushed under pressure", progress: 42 },
];

export function SkillInsights() {
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
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Mastery snapshot</p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-950">Progress that makes sense</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="tp-card rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Student-facing signal</p>
                <h2 className="font-display mt-2 text-4xl font-bold tracking-tight text-slate-950">Mastery over ranking</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                  This route now works as a child-readable mastery snapshot. It avoids pretending there is a full analytics engine while still giving the plan flow a sensible progress screen.
                </p>
              </div>
              <div className="rounded-[1.4rem] bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                Growth language only
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {masteryRows.map((row) => (
                <div key={row.theme} className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{row.level}</p>
                      <h3 className="mt-2 text-lg font-bold text-slate-900">{row.theme}</h3>
                      <p className="mt-1 text-sm leading-7 text-slate-600">{row.note}</p>
                    </div>
                    <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{row.progress}%</div>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" style={{ width: `${row.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tp-card rounded-[2rem] p-6 sm:p-7">
            <div className="flex items-center gap-3 text-slate-900">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <h2 className="font-display text-3xl font-bold tracking-tight">Coach takeaway</h2>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
              <div className="rounded-[1.4rem] bg-blue-50 p-4">Students are strongest when the lesson is visual and the theme is repeated consistently.</div>
              <div className="rounded-[1.4rem] bg-emerald-50 p-4">Basic Forks and Missed Captures are still the best next teaching targets in this prototype storyline.</div>
              <div className="rounded-[1.4rem] bg-amber-50 p-4">This screen is a design placeholder for eventual coach heatmap and reporting work, not the finished analytics layer.</div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/study-plan" className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700">
                <BookOpen className="h-4 w-4" />
                Back to plan
              </Link>
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">
                Return home
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[1.8rem] border border-dashed border-blue-200 bg-white/80 p-5 text-sm leading-7 text-slate-600">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 h-4 w-4 text-blue-600" />
            <p>
              Smart rule for this route: show visible mastery and useful teaching cues, but do not pretend the repo already has a deep analytics pipeline behind it.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
