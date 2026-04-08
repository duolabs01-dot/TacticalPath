import { Link } from "react-router-dom";
import { ArrowLeft, Search, Filter, Play, Star, Clock, Zap, Target, Brain, ChevronRight } from "lucide-react";

export function PuzzleBank() {
  return (
    <div className="flex-1 overflow-y-auto pb-32 bg-slate-50 dark:bg-[#0b111a] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200">
      <header className="sticky top-0 z-50 flex items-center p-4 border-b border-slate-200 dark:border-slate-800/50 backdrop-blur-md bg-white/75 dark:bg-[#0b111a]/75 transition-colors duration-200">
        <Link
          to="/dashboard"
          className="text-slate-900 dark:text-slate-100 p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 ml-2">
          Puzzle Bank
        </h1>
        <button 
          onClick={() => alert("Filter options coming soon!")}
          className="text-slate-900 dark:text-slate-100 p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <Filter className="h-6 w-6" />
        </button>
      </header>

      <div className="p-4">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 dark:text-slate-500 transition-colors duration-200" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-800 rounded-xl leading-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200 shadow-sm"
            placeholder="Search themes (e.g., 'Pin', 'Fork')"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link to="/puzzle-play" className="bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-xl p-5 flex flex-col items-center justify-center gap-3 shadow-lg shadow-blue-500/20 dark:shadow-blue-900/20 hover:scale-[1.02] transition-transform active:scale-95">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-white font-bold text-sm">Puzzle Rush</span>
            <span className="text-blue-100 dark:text-blue-200 text-[10px] uppercase tracking-wider font-bold">5 Min Timer</span>
          </Link>

          <Link to="/puzzle-play" className="bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 rounded-xl p-5 flex flex-col items-center justify-center gap-3 shadow-lg shadow-emerald-500/20 dark:shadow-emerald-900/20 hover:scale-[1.02] transition-transform active:scale-95">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Target className="h-6 w-6 text-white" />
            </div>
            <span className="text-white font-bold text-sm">Survival Mode</span>
            <span className="text-emerald-100 dark:text-emerald-200 text-[10px] uppercase tracking-wider font-bold">3 Strikes</span>
          </Link>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight transition-colors duration-200">
              Recommended Themes
            </h3>
            <Link to="/puzzle-play" className="text-blue-600 dark:text-blue-500 text-sm font-semibold hover:underline transition-colors duration-200">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Link to="/puzzle-play" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-500 transition-colors duration-200">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm transition-colors duration-200">Deflection</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-slate-500 text-[11px] font-medium">142 Puzzles</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 transition-colors duration-200"></span>
                    <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-bold transition-colors duration-200">85% Mastery</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </Link>

            <Link to="/puzzle-play" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center border border-purple-200 dark:border-purple-500/20 text-purple-600 dark:text-purple-500 transition-colors duration-200">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm transition-colors duration-200">Discovered Attack</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-slate-500 text-[11px] font-medium">89 Puzzles</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 transition-colors duration-200"></span>
                    <span className="text-amber-600 dark:text-amber-400 text-[11px] font-bold transition-colors duration-200">42% Mastery</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </Link>

            <Link to="/puzzle-play" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-rose-100 dark:bg-rose-500/10 flex items-center justify-center border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-500 transition-colors duration-200">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm transition-colors duration-200">Endgame Tactics</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-slate-500 text-[11px] font-medium">215 Puzzles</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 transition-colors duration-200"></span>
                    <span className="text-rose-600 dark:text-rose-400 text-[11px] font-bold transition-colors duration-200">Needs Work</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-center shadow-sm transition-colors duration-200">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight mb-2 transition-colors duration-200">Daily Challenge</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 transition-colors duration-200">Solve 5 puzzles correctly in a row to earn a streak bonus.</p>
            <Link to="/puzzle-play" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
              <Play className="h-5 w-5 fill-current" />
              Start Daily Challenge
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
