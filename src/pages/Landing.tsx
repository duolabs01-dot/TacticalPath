import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  GraduationCap,
  Puzzle,
  ShieldCheck,
  Users,
} from "lucide-react";

const featureCards = [
  {
    title: "Coach-led classroom loop",
    description:
      "Students play, pause at one teachable moment, then complete three short drills before the next round.",
    icon: Users,
  },
  {
    title: "Kid-readable lesson design",
    description:
      "The product direction favors visual guidance, one clear sentence, and growth-focused mastery instead of harsh engine dumps.",
    icon: ShieldCheck,
  },
  {
    title: "Curriculum over chaos",
    description:
      "The v1 launch focuses on five verified tactical themes so coaches can trust what gets assigned after a game.",
    icon: BookOpen,
  },
];

const loopSteps = [
  "Students log in with classroom-safe accounts and join the waiting room.",
  "Live classmate play creates the emotional center of the session.",
  "One turning point becomes a short visual lesson.",
  "Three targeted drills move the student back into mastery progress.",
];

export function Landing() {
  return (
    <div className="tp-page min-h-screen text-slate-900">
      <header className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-xl text-white shadow-lg shadow-blue-500/30">
              ♞
            </div>
            <div>
              <p className="font-display text-2xl font-bold tracking-tight">TacticalPath</p>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                Scholastic Chess Classroom Platform
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-1 rounded-full bg-white/80 p-1 text-sm font-medium text-slate-600 shadow-sm md:flex">
            <a className="rounded-full px-4 py-2 transition hover:bg-white hover:text-blue-700" href="#product">
              Product
            </a>
            <a className="rounded-full px-4 py-2 transition hover:bg-white hover:text-blue-700" href="#how-it-works">
              How It Works
            </a>
            <a className="rounded-full px-4 py-2 transition hover:bg-white hover:text-blue-700" href="#classroom">
              For Coaches
            </a>
            <a className="rounded-full px-4 py-2 transition hover:bg-white hover:text-blue-700" href="#prototype">
              Demo
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
            >
              Coach Login
            </Link>
            <Link
              to="/dashboard"
              className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700"
            >
              Open Student Demo
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pt-20">
          <div className="floating-drift absolute right-0 top-10 h-72 w-72 rounded-full bg-blue-200/60 blur-3xl" />
          <div className="floating-drift absolute bottom-0 left-0 h-80 w-80 rounded-full bg-emerald-200/60 blur-3xl" style={{ animationDelay: "1.5s" }} />

          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                <GraduationCap className="h-4 w-4" />
                Built for clubs, classrooms, and school chess programs
              </div>

              <div className="space-y-5">
                <h1 className="font-display max-w-3xl text-5xl font-bold leading-[0.95] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                  Where chess class becomes
                  <span className="block bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                    calm, teachable progress
                  </span>
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                  TacticalPath helps coaches turn real games into short, child-readable lessons.
                  Students play, learn from one important mistake, and return to class with targeted
                  drills instead of confusing analysis screens.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 text-base font-bold text-white shadow-xl shadow-blue-500/25 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  See Student Experience
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="#prototype"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-7 py-4 text-base font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
                >
                  What Is Real Today
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  4-week free pilot direction
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Flat classroom license model in the plan
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Up to 30 active students in the v1 package
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <div className="tp-card tp-soft-ring rounded-[2rem] p-5 sm:p-7">
                <div className="tp-hero-gradient relative overflow-hidden rounded-[1.7rem] p-6 text-white shadow-2xl shadow-blue-500/20">
                  <div className="absolute right-4 top-4 h-3 w-3 rounded-full bg-emerald-400 pulse-soft" />
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-100">
                        Classroom Snapshot
                      </p>
                      <h2 className="font-display mt-2 text-3xl font-bold">Club Session in Motion</h2>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-blue-100">
                        The product is designed around a safe classroom loop, not public matchmaking or raw engine screens.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-2xl bg-white/14 p-4">
                        <p className="text-2xl font-bold">12</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-blue-100">Students Ready</p>
                      </div>
                      <div className="rounded-2xl bg-white/14 p-4">
                        <p className="text-2xl font-bold">3</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-blue-100">Drills Each</p>
                      </div>
                      <div className="rounded-2xl bg-white/14 p-4">
                        <p className="text-2xl font-bold">5</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-blue-100">Launch Themes</p>
                      </div>
                    </div>

                    <div className="rounded-[1.4rem] bg-white/12 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold">Today&apos;s flow</p>
                          <p className="mt-1 text-sm text-blue-100">Play, pause, teach, drill, return.</p>
                        </div>
                        <Clock3 className="h-6 w-6 text-blue-100" />
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-white/12 p-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-blue-100">Coach view</p>
                          <p className="mt-2 text-sm font-medium">Session control and blindspot insight</p>
                        </div>
                        <div className="rounded-2xl bg-white/12 p-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-blue-100">Student view</p>
                          <p className="mt-2 text-sm font-medium">Warm waiting room and mastery map</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-4 -z-10 h-full w-full rounded-[2rem] bg-blue-200/60" />
            </div>
          </div>
        </section>

        <section id="product" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <div className="max-w-2xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600">Product direction</p>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Premium-academic, coach-trustworthy, child-readable
              </h2>
              <div className="section-divider max-w-sm" />
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {featureCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="tp-card tp-card-hover rounded-[1.75rem] p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-slate-900">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-slate-950 px-6 py-10 text-white sm:px-10 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-200">How it works</p>
                <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  One calm loop the whole class can understand
                </h2>
                <p className="max-w-md text-base leading-8 text-slate-300">
                  The approved v1 is not trying to be everything. It is trying to prove that a chess class can run smoothly and still create real learning moments.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {loopSteps.map((step, index) => (
                  <div key={step} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500 text-sm font-bold text-white">
                      0{index + 1}
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-200">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="classroom" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="tp-card rounded-[2rem] p-7 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600">For coaches</p>
              <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-slate-950">
                Built for club flow, not just individual screen time
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                TacticalPath is planned around class orchestration: reliable live games, practical post-game drills, and a coach heatmap that points to tomorrow&apos;s lesson.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-blue-50 p-5">
                  <Users className="h-6 w-6 text-blue-700" />
                  <h3 className="mt-3 text-lg font-bold text-slate-900">Pilot package</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Free pilot first, then a flat classroom license designed for clubs and school budgets.
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-emerald-50 p-5">
                  <ShieldCheck className="h-6 w-6 text-emerald-700" />
                  <h3 className="mt-3 text-lg font-bold text-slate-900">School-safe posture</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Minimal student identity, no public social features, and no child-facing engine overload in the plan.
                  </p>
                </div>
              </div>
            </div>

            <div className="tp-card rounded-[2rem] p-7 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600">v1 focus</p>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4 rounded-[1.4rem] bg-slate-50 p-4">
                  <Puzzle className="mt-1 h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-900">5 launch themes</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">Hanging pieces, missed captures, 1-move mates, forks, and pins.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-[1.4rem] bg-slate-50 p-4">
                  <Clock3 className="mt-1 h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-900">45-minute club rhythm</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">Quick setup, live play, short drills, then coach review and shoutouts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-[1.4rem] bg-slate-50 p-4">
                  <ChevronRight className="mt-1 h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Aha dashboard</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">The pilot must leave a coach knowing what to teach next, not just what the engine disliked.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="prototype" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-dashed border-blue-200 bg-white/85 p-7 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600">Prototype honesty</p>
            <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-slate-950">
              What is real today in this repo
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              The current codebase is still frontend-heavy. The useful live pieces are one local puzzle flow, one replayable sample game, and the shared UI shell. Live classroom pairing, coach heatmaps, and the real turning-point pipeline are still future implementation work.
            </p>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[1.5rem] bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Available demo surfaces</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  <li className="flex items-start gap-3"><CheckCircle2 className="mt-1 h-4 w-4 text-emerald-500" />One fixed puzzle with local move validation</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="mt-1 h-4 w-4 text-emerald-500" />One hardcoded game replay with step-through controls</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="mt-1 h-4 w-4 text-emerald-500" />Themed classroom UI direction and route shell</li>
                </ul>
              </div>
              <div className="rounded-[1.5rem] bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">Still mocked or missing</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  <li className="flex items-start gap-3"><ChevronRight className="mt-1 h-4 w-4 text-amber-500" />Server-authoritative live classroom play</li>
                  <li className="flex items-start gap-3"><ChevronRight className="mt-1 h-4 w-4 text-amber-500" />Coach heatmap and reporting workflows</li>
                  <li className="flex items-start gap-3"><ChevronRight className="mt-1 h-4 w-4 text-amber-500" />Real turning-point detection and drill assignment</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/puzzle-play"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Open Puzzle Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/game-analysis"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
              >
                Open Replay Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
