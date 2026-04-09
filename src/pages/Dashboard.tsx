import { Link } from "react-router-dom";
import {
  Bell,
  BookOpen,
  ChevronRight,
  CirclePlay,
  Clock3,
  Puzzle,
  ShieldCheck,
  Star,
  Target,
  Users,
} from "lucide-react";

const themes = [
  { name: "Hanging Pieces", level: 3, progress: 72, note: "Spot loose pieces before they disappear." },
  { name: "Missed Captures", level: 2, progress: 48, note: "Slow down and count what each move wins." },
  { name: "1-Move Checkmates", level: 4, progress: 86, note: "You notice mating nets quickly this week." },
  { name: "Basic Forks", level: 2, progress: 41, note: "Knight forks are the next growth area." },
  { name: "Basic Pins", level: 3, progress: 67, note: "Pinned pieces are becoming easier to trust." },
];

const sessionPlan = [
  { label: "Check-in", detail: "Coach starts pairings in about 5 minutes" },
  { label: "Play round", detail: "One classmate game or bot fallback" },
  { label: "Mini lesson", detail: "Review one turning point with arrows" },
  { label: "3 drills", detail: "Practice the theme that showed up in the game" },
];

const quickLinks = [
  {
    title: "Play a practice puzzle",
    description: "Use the local puzzle demo while you wait for the next round.",
    to: "/puzzle-play",
    icon: Puzzle,
    tone: "bg-blue-50 text-blue-700",
  },
  {
    title: "Replay a sample lesson",
    description: "See how a turning-point review can feel after a game.",
    to: "/game-analysis",
    icon: CirclePlay,
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Browse the drill bank",
    description: "Look through the practice surfaces already available in the demo.",
    to: "/puzzle-bank",
    icon: BookOpen,
    tone: "bg-amber-50 text-amber-700",
  },
];

export function Dashboard() {
  return (
    <div className="tp-page flex-1 overflow-y-auto pb-24 pt-6">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">Student waiting room</p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-950">Room 3A</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 sm:inline-flex">
              Coach pairing next round
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:text-blue-700">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="tp-card rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
                  <Users className="h-3.5 w-3.5" />
                  Classroom session live direction
                </div>
                <div>
                  <h2 className="font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                    Welcome back, Chloe M.
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
                    You&apos;re checked in, your coach is organizing the next round, and your mastery map is ready. While you wait, the best next step is one short practice action.
                  </p>
                </div>
              </div>
              <div className="rounded-[1.4rem] bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                Calm mode on
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Link
                to="/puzzle-play"
                className="tp-card-hover rounded-[1.6rem] bg-blue-600 px-5 py-5 text-white shadow-xl shadow-blue-500/25 transition"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">Best next action</p>
                    <h3 className="mt-2 text-2xl font-bold">Play a practice puzzle</h3>
                  </div>
                  <Puzzle className="h-7 w-7 text-blue-100" />
                </div>
                <p className="mt-4 text-sm leading-7 text-blue-100">
                  Keep your hands warm with the local puzzle demo while the classmate round is about to begin.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">
                  Open practice
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Link>

              <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">What happens after a game</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  <li className="flex items-start gap-3"><Target className="mt-1 h-4 w-4 text-blue-600" />One teachable turning point gets highlighted.</li>
                  <li className="flex items-start gap-3"><ShieldCheck className="mt-1 h-4 w-4 text-blue-600" />You get one short explanation, not a giant engine report.</li>
                  <li className="flex items-start gap-3"><Star className="mt-1 h-4 w-4 text-blue-600" />Three drills help the theme become mastery progress.</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-dashed border-blue-200 bg-white p-4 text-sm leading-7 text-slate-600">
              <span className="font-semibold text-slate-900">Prototype note:</span> this screen shows the intended student waiting-room experience. Real classroom pairing, coach heatmaps, and account data are not wired yet in this repo.
            </div>
          </div>

          <div className="tp-card rounded-[2rem] p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Today&apos;s club flow</p>
                <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950">One safe loop</h3>
              </div>
              <Clock3 className="h-7 w-7 text-blue-600" />
            </div>

            <div className="mt-6 space-y-3">
              {sessionPlan.map((step, index) => (
                <div key={step.label} className="flex items-start gap-4 rounded-[1.4rem] bg-slate-50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-xs font-bold text-white">
                    0{index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{step.label}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Mastery map</p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950">Your launch themes</h2>
            </div>
            <div className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-sm">
              Progress over ranking
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {themes.map((theme) => (
              <div key={theme.name} className="tp-card rounded-[1.7rem] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Level {theme.level}</p>
                    <h3 className="mt-2 text-xl font-bold text-slate-900">{theme.name}</h3>
                  </div>
                  <div className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    {theme.progress}%
                  </div>
                </div>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"
                    style={{ width: `${theme.progress}%` }}
                  />
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{theme.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="tp-card rounded-[2rem] p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Choose a short action</p>
                <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950">Keep class energy steady</h2>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {quickLinks.map((item) => {
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
                          <p className="mt-1 text-sm leading-7 text-slate-600">{item.description}</p>
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
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">What this home should feel like</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-[1.4rem] bg-blue-50 p-4">
                <p className="font-semibold text-slate-900">No public pressure</p>
                <p className="mt-1 text-sm leading-7 text-slate-600">The student home uses mastery growth, not public leaderboards or rank pressure.</p>
              </div>
              <div className="rounded-[1.4rem] bg-emerald-50 p-4">
                <p className="font-semibold text-slate-900">One next step</p>
                <p className="mt-1 text-sm leading-7 text-slate-600">A child should always know the next safe action without searching through a dense dashboard.</p>
              </div>
              <div className="rounded-[1.4rem] bg-amber-50 p-4">
                <p className="font-semibold text-slate-900">Coach trust later</p>
                <p className="mt-1 text-sm leading-7 text-slate-600">The real coach heatmap and class controls are future implementation work, not fake UI promises here.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
