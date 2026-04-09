import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronRight, Settings, Shield, Star, Target, Users } from "lucide-react";

const profileActions = [
  {
    title: "Open weekly plan",
    detail: "Review this week's class rhythm and next practice actions.",
    to: "/study-plan",
    icon: BookOpen,
    tone: "bg-blue-50 text-blue-700",
  },
  {
    title: "Check mastery snapshot",
    detail: "Use the current insight screen as a stand-in for progress tracking.",
    to: "/skill-insights",
    icon: Target,
    tone: "bg-emerald-50 text-emerald-700",
  },
];

export function Profile() {
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
          <div className="ml-3 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Student profile</p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-950">Chloe M.</h1>
          </div>
          <Link
            to="/settings"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:text-blue-700"
          >
            <Settings className="h-5 w-5" />
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="tp-card rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 text-2xl font-bold text-white shadow-lg shadow-blue-500/25">
                  CM
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    <Shield className="h-3.5 w-3.5" />
                    Classroom-safe account
                  </div>
                  <h2 className="font-display mt-3 text-4xl font-bold tracking-tight text-slate-950">Room 3A Student</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">This profile now reflects the classroom product direction: light identity, trust, and progress over public status.</p>
                </div>
              </div>
              <div className="rounded-[1.4rem] bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
                Pilot demo profile
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.4rem] bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Class</p>
                <p className="mt-2 text-lg font-bold text-slate-900">Tuesday Club</p>
              </div>
              <div className="rounded-[1.4rem] bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Coach</p>
                <p className="mt-2 text-lg font-bold text-slate-900">Coach Rivera</p>
              </div>
              <div className="rounded-[1.4rem] bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Current focus</p>
                <p className="mt-2 text-lg font-bold text-slate-900">Basic Forks</p>
              </div>
            </div>
          </div>

          <div className="tp-card rounded-[2rem] p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Why this profile changed</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-[1.4rem] bg-blue-50 p-4 text-sm leading-7 text-slate-600">
                Student accounts should feel safe, simple, and owned by the classroom, not like public competitive profiles.
              </div>
              <div className="rounded-[1.4rem] bg-emerald-50 p-4 text-sm leading-7 text-slate-600">
                Visible progress should lean on mastery language instead of Elo, percentiles, or adult-style status signals.
              </div>
              <div className="rounded-[1.4rem] bg-amber-50 p-4 text-sm leading-7 text-slate-600">
                This page acts as a calm profile hub and route launcher, not a fake analytics dashboard.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          {profileActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} to={action.to} className="tp-card-hover flex items-start gap-4 rounded-[1.7rem] border border-slate-200 bg-white p-5 transition">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${action.tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{action.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-slate-600">{action.detail}</p>
                    </div>
                    <ChevronRight className="mt-1 h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </Link>
            );
          })}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="tp-card rounded-[2rem] p-6 sm:p-7">
            <div className="flex items-center gap-3 text-slate-900">
              <Star className="h-5 w-5 text-blue-600" />
              <h2 className="font-display text-3xl font-bold tracking-tight">Visible progress</h2>
            </div>
            <div className="mt-5 space-y-3">
              <div className="rounded-[1.4rem] bg-slate-50 p-4 text-sm leading-7 text-slate-600">Checkmates: Level 4 and feeling confident.</div>
              <div className="rounded-[1.4rem] bg-slate-50 p-4 text-sm leading-7 text-slate-600">Pins: Level 3 and steady.</div>
              <div className="rounded-[1.4rem] bg-slate-50 p-4 text-sm leading-7 text-slate-600">Forks: Level 2 and the next growth target.</div>
            </div>
          </div>

          <div className="tp-card rounded-[2rem] p-6 sm:p-7">
            <div className="flex items-center gap-3 text-slate-900">
              <Users className="h-5 w-5 text-emerald-600" />
              <h2 className="font-display text-3xl font-bold tracking-tight">Classroom posture</h2>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              This profile deliberately avoids marketplace, billing, and public ranking behavior. It is a controlled surface for a classroom pilot, not a generic chess identity layer.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
