import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronRight, CirclePlay, Clock3, ListChecks, Puzzle, ShieldCheck, Sparkles, Target } from "lucide-react";

const weekPlan = [
  {
    title: "Warm-up puzzle set",
    detail: "5 short tactical reps before classmate play",
    to: "/puzzle-bank",
    icon: Puzzle,
    tone: "bg-blue-50 text-blue-700",
  },
  {
    title: "Replay yesterday's lesson",
    detail: "Look at the sample turning-point review again",
    to: "/analyze",
    icon: CirclePlay,
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Mastery check",
    detail: "See which launch theme needs the next push",
    to: "/skill-insights",
    icon: Target,
    tone: "bg-amber-50 text-amber-700",
  },
];

const coachNotes = [
  "Keep the lesson sentence short enough for a student to repeat back.",
  "Use the same five launch themes until the loop is trusted.",
  "Prefer calm consistency over fake AI flash or advanced ranking systems.",
];

export function StudyPlan() {
  return (
    <div className="tp-page flex-1 overflow-y-auto pb-24 pt-6">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center px-4 sm:px-6">
          <Link
            to="/dashboard"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:text-blue-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="ml-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Weekly plan</p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-950">This week's classroom rhythm</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="tp-card rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">Student plan</p>
                <h2 className="font-display mt-2 text-4xl font-bold tracking-tight text-slate-950">
                  Small actions that support the class session
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                  This route now acts as the smart hub for the week. It connects practice, lesson replay, and progress checks instead of pretending to be a fully automated AI curriculum.
                </p>
              </div>
              <div className="rounded-[1.4rem] bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                3 simple focus lanes
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {weekPlan.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    to={item.to}
                    className="tp-card-hover flex items-start gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 transition"
                  >
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${item.tone}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                          <p className="mt-1 text-sm leading-7 text-slate-600">{item.detail}</p>
                        </div>
                        <ChevronRight className="mt-1 h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="tp-card rounded-[2rem] p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">Session shape</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-[1.4rem] bg-blue-50 p-4">
                <div className="flex items-center gap-3 text-slate-900">
                  <Clock3 className="h-5 w-5 text-blue-600" />
                  <p className="font-semibold">Before round start</p>
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-600">One short puzzle or quick review helps students settle into class mode.</p>
              </div>
              <div className="rounded-[1.4rem] bg-emerald-50 p-4">
                <div className="flex items-center gap-3 text-slate-900">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <p className="font-semibold">After each game</p>
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-600">Students should see one turning point, one sentence, and three drills. Nothing more complex than that.</p>
              </div>
              <div className="rounded-[1.4rem] bg-amber-50 p-4">
                <div className="flex items-center gap-3 text-slate-900">
                  <ListChecks className="h-5 w-5 text-amber-600" />
                  <p className="font-semibold">At week's end</p>
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-600">The coach should have a useful teaching signal. The student should feel progress, not pressure.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="tp-card rounded-[2rem] p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">Prototype boundaries</p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-950">What this plan is really doing</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              The repo does not have a real adaptive engine yet. This page therefore acts as a clear planner and routing surface, not a fake promise of dynamic automation.
            </p>
            <div className="mt-6 rounded-[1.4rem] border border-dashed border-blue-200 bg-white p-4 text-sm leading-7 text-slate-600">
              Today the smart behavior is in the navigation logic and product flow, not in stored student history or live class data.
            </div>
          </div>

          <div className="tp-card rounded-[2rem] p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">Coach notes</p>
            <div className="mt-5 space-y-3">
              {coachNotes.map((note) => (
                <div key={note} className="rounded-[1.4rem] bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                  <div className="flex items-start gap-3">
                    <Sparkles className="mt-1 h-4 w-4 text-blue-600" />
                    <p>{note}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/analyze" className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700">
                Open lesson library
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">
                Return to waiting room
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
