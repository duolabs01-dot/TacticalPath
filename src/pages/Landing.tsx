import { Link } from "react-router-dom";
import { Grid, Search, User, Zap, Brain, Edit3, BarChart } from "lucide-react";

export function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0b111a] text-slate-900 dark:text-slate-100">
      <header className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-[#0b111a]/80 backdrop-blur-md px-4 py-3 border-b border-slate-200 dark:border-slate-800 justify-between">
        <div className="flex items-center gap-2">
          <Grid className="text-blue-500 h-8 w-8" />
          <h1 className="text-slate-900 dark:text-slate-100 text-xl font-extrabold tracking-tight">
            Tactical Path
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            <Search className="h-5 w-5" />
          </button>
          <Link
            to="/login"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="relative px-4 pt-6 pb-12">
          <div className="group relative overflow-hidden rounded-xl bg-slate-900 aspect-[4/5] flex flex-col justify-end p-6 border border-slate-800">
            <div className="absolute inset-0 z-0">
              <img
                alt="Luxury chess pieces"
                className="h-full w-full object-cover opacity-60 mix-blend-luminosity"
                src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=800"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b111a] via-[#0b111a]/40 to-transparent"></div>
            </div>
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 border border-blue-500/30">
                <Zap className="text-blue-500 h-4 w-4" />
                <span className="text-blue-500 text-[10px] font-bold uppercase tracking-widest">
                  Next-Gen AI Analysis
                </span>
              </div>
              <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white">
                Master the Game with <span className="text-blue-500">AI-Powered</span> Strategy
              </h2>
              <p className="text-slate-300 text-base leading-relaxed max-w-xs">
                Elevate your Elo with grandmaster-level insights powered by deep learning.
              </p>
              <div className="pt-4">
                <Link
                  to="/signup"
                  className="w-full flex items-center justify-center rounded-lg bg-blue-500 h-14 text-white text-lg font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="grid grid-cols-2 gap-4 px-4 pb-12">
          <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-5 rounded-xl text-center">
            <p className="text-blue-500 text-2xl font-black">50,000+</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mt-1">
              Global Players
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-5 rounded-xl text-center">
            <p className="text-blue-500 text-2xl font-black">+200 Elo</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mt-1">
              Average Gain
            </p>
          </div>
        </section>

        <section className="px-4 pb-20 space-y-6">
          <h3 className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em] text-center mb-8">
            Why Tactical Path?
          </h3>
          <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-slate-100 font-bold text-lg">
                AI Tactical Analysis
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Instantly identify blunders and discover the strongest engine-approved lines.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
              <Edit3 className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-slate-100 font-bold text-lg">
                Personalized Study Plans
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                AI analyzes your weaknesses to create a custom curriculum tailored to your style.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
              <BarChart className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-slate-100 font-bold text-lg">
                Coach-Level Insights
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Natural language explanations of complex strategic concepts, not just raw engine scores.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
