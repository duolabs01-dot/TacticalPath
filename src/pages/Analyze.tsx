import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Camera, ChevronRight, CirclePlay, Clock3, Search, Upload, X } from "lucide-react";

const lessonCards = [
  {
    title: "Turning-point replay demo",
    detail: "See how one critical moment can become a short post-game lesson.",
    to: "/game-analysis",
    tag: "Demo replay",
  },
  {
    title: "Italian Game practice lesson",
    detail: "Open the sample lesson flow already included in the prototype.",
    to: "/italian-game",
    tag: "Opening sample",
  },
  {
    title: "Theme progress snapshot",
    detail: "Use the current insights screen as a stand-in for mastery reporting.",
    to: "/skill-insights",
    tag: "Prototype insights",
  },
];

export function Analyze() {
  const [showPgnInput, setShowPgnInput] = useState(false);
  const [pgnText, setPgnText] = useState("");
  const navigate = useNavigate();

  const handleReplay = () => {
    if (pgnText.trim()) {
      navigate("/game-analysis");
      return;
    }

    setShowPgnInput(true);
  };

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
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Lesson library</p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-950">Replay and review</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="tp-card rounded-[2rem] p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
              <CirclePlay className="h-3.5 w-3.5" />
              Prototype lesson flow
            </div>
            <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-slate-950">
              Review one moment, not an overwhelming report
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              This route now serves as the lesson library for the demo. It is the smart place to collect replayable examples and gently explain what the real turning-point experience should become.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <button
                onClick={handleReplay}
                className="tp-card-hover rounded-[1.6rem] bg-blue-600 px-5 py-5 text-left text-white shadow-xl shadow-blue-500/25 transition"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">Quick action</p>
                    <h3 className="mt-2 text-2xl font-bold">Open replay demo</h3>
                  </div>
                  <CirclePlay className="h-7 w-7 text-blue-100" />
                </div>
                <p className="mt-4 text-sm leading-7 text-blue-100">Use the existing sample game to show how a turning point might be revisited after class play.</p>
              </button>

              <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Prototype note</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  There is still no live PGN analysis pipeline here. Entered PGN simply routes into the sample replay so the interaction remains coherent instead of pretending the analysis is real.
                </p>
              </div>
            </div>
          </div>

          <div className="tp-card rounded-[2rem] p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Bring your own PGN</p>
            <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950">Paste and continue</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              This keeps the route useful without making fake promises. If a PGN is pasted, the app simply opens the replay demo.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowPgnInput(true)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
              >
                <Upload className="h-4 w-4" />
                Paste PGN
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-500"
              >
                <Camera className="h-4 w-4" />
                Camera later
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950">Useful lesson routes</h2>
          </div>
          <div className="space-y-4">
            {lessonCards.map((card) => (
              <Link key={card.title} to={card.to} className="tp-card-hover flex items-start gap-4 rounded-[1.6rem] border border-slate-200 bg-white p-5 transition">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{card.tag}</div>
                      <h3 className="mt-3 text-lg font-bold text-slate-900">{card.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{card.detail}</p>
                    </div>
                    <ChevronRight className="mt-1 h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[1.8rem] border border-dashed border-blue-200 bg-white/80 p-5 text-sm leading-7 text-slate-600">
          <div className="flex items-start gap-3">
            <Clock3 className="mt-1 h-4 w-4 text-blue-600" />
            <p>
              Smart rule for now: the lesson surfaces should explain the intended classroom loop honestly, while reusing the replayable prototype pages that already function.
            </p>
          </div>
        </section>
      </div>

      {showPgnInput && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[1.8rem] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Prototype input</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-950">Paste PGN text</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">The demo will route you into the sample replay after submission.</p>
              </div>
              <button onClick={() => setShowPgnInput(false)} className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:text-slate-900">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative mt-5">
              <Search className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-400" />
              <textarea
                value={pgnText}
                onChange={(e) => setPgnText(e.target.value)}
                placeholder='[Event "Classroom Demo"] ...'
                className="h-52 w-full rounded-[1.4rem] border border-slate-200 bg-slate-50 pl-10 pr-4 pt-3 text-sm text-slate-700 outline-none transition focus:border-blue-300"
              />
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowPgnInput(false)} className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300">
                Cancel
              </button>
              <button onClick={handleReplay} className="flex-1 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700">
                Continue to replay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
