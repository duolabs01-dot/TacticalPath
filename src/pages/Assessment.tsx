import { Link } from "react-router-dom";
import { ArrowLeft, History, BarChart2, AlertTriangle, Brain, CheckSquare, Clock, Puzzle, ChevronRight, TrendingUp } from "lucide-react";

export function Assessment() {
  return (
    <div className="flex-1 overflow-y-auto pb-32 bg-slate-50 dark:bg-[#0b111a] text-slate-900 dark:text-slate-100 min-h-screen">
      <header className="sticky top-0 z-50 flex items-center p-4 border-b border-slate-200 dark:border-slate-800/50 backdrop-blur-md bg-white/75 dark:bg-[#0b111a]/75">
        <Link
          to="/dashboard"
          className="text-slate-900 dark:text-slate-100 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 ml-2">
          Assessment Center
        </h1>
        <button className="text-slate-900 dark:text-slate-100 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <History className="h-6 w-6" />
        </button>
      </header>

      <div className="p-4">
        <div className="relative overflow-hidden flex flex-col items-stretch justify-start rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
          <div
            className="w-full aspect-video bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=800")',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent dark:from-slate-900 dark:via-slate-900/40"></div>
          </div>
          <div className="flex w-full flex-col gap-1 p-6 relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-500 border border-blue-200 dark:border-blue-500/20 rounded-full">
                AI-Powered
              </span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">
              Start New Assessment
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-1 mb-6">
              A 60-minute comprehensive tactical evaluation designed to map your current skill
              level and find hidden weaknesses.
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  Estimated Time
                </span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">60 Minutes</span>
              </div>
              <Link to="/puzzle-play" className="flex min-w-[120px] items-center justify-center rounded-lg h-11 px-6 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                Start Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-2">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight mb-4">
          Performance Stats
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 rounded-xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                Accuracy
              </p>
              <BarChart2 className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold">78%</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <p className="text-emerald-600 dark:text-emerald-400 text-xs font-bold">+2.4%</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                Weakness
              </p>
              <AlertTriangle className="h-5 w-5 text-rose-500" />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-slate-900 dark:text-white text-sm font-bold truncate">Endgame Pins</p>
              <p className="text-slate-900 dark:text-white text-sm font-bold truncate">Back Rank</p>
            </div>
            <p className="text-slate-500 text-[10px] italic mt-1">Last 5 sessions</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 rounded-xl p-4 flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-500">
              <Brain className="h-5 w-5" />
            </div>
          </div>
          <div>
            <h4 className="text-blue-600 dark:text-blue-500 text-[10px] font-bold uppercase tracking-widest mb-1">
              Coach's Insight
            </h4>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic">
              "Your calculation in the middle-game has improved, but you're missing simple
              defensive resources for your opponent."
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">
            Recent Assessments
          </h3>
          <Link to="#" className="text-blue-500 text-sm font-semibold hover:underline">
            See All
          </Link>
        </div>
        <div className="space-y-3">
          <Link
            to="#"
            className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-500">
                <CheckSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="text-slate-900 dark:text-white font-bold text-sm">Full Tactical Sweep</p>
                <p className="text-slate-500 text-[11px] font-medium">Oct 24 • 45 min</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-slate-900 dark:text-white font-bold text-sm">82%</p>
                <p className="text-emerald-600 dark:text-emerald-400 text-[9px] font-bold uppercase tracking-widest">
                  Excellent
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-600" />
            </div>
          </Link>

          <Link
            to="#"
            className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-500">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-slate-900 dark:text-white font-bold text-sm">Speed Drill</p>
                <p className="text-slate-500 text-[11px] font-medium">Oct 21 • 15 min</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-slate-900 dark:text-white font-bold text-sm">64%</p>
                <p className="text-amber-600 dark:text-amber-500 text-[9px] font-bold uppercase tracking-widest">
                  Average
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-600" />
            </div>
          </Link>

          <Link
            to="#"
            className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-500">
                <Puzzle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-slate-900 dark:text-white font-bold text-sm">Endgame Specialty</p>
                <p className="text-slate-500 text-[11px] font-medium">Oct 18 • 30 min</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-slate-900 dark:text-white font-bold text-sm">71%</p>
                <p className="text-blue-600 dark:text-blue-500 text-[9px] font-bold uppercase tracking-widest">
                  Good
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-600" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
