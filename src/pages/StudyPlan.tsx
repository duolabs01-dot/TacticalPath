import { Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Rocket,
  Play,
  ChevronRight,
  BarChart2,
  Calendar,
  Brain,
  Puzzle,
  MoreVertical,
  GitMerge,
  CheckCircle2,
  TrendingUp,
  Lock
} from "lucide-react";

export function StudyPlan() {
  return (
    <div className="flex-1 overflow-y-auto pb-28">
      <header className="flex items-center bg-white/75 dark:bg-[#0b111a]/75 backdrop-blur-md p-4 sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800">
        <Link
          to="/dashboard"
          className="text-blue-500 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          Study Plan
        </h2>
        <div className="flex w-10 items-center justify-end">
          <button className="flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 p-1.5 border border-slate-200 dark:border-slate-800">
            <User className="h-5 w-5 text-blue-500" />
          </button>
        </div>
      </header>

      <section className="p-4 mt-2">
        <div className="bg-white dark:bg-[#161e2b] border border-slate-200 dark:border-slate-800 p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                Weekly Mastery
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">65%</span>
                <span className="text-sm font-medium text-slate-500">Completed</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-blue-500">13/20 Drills</p>
              <p className="text-[11px] text-slate-500 font-medium">7 remaining</p>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full shadow-[0_0_12px_rgba(60,131,246,0.4)]"
              style={{ width: "65%" }}
            ></div>
          </div>
          <div className="mt-4 flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800/50">
            <Rocket className="h-5 w-5 text-blue-500" />
            <span className="font-medium">On track to hit Grandmaster pace!</span>
          </div>
        </div>
      </section>

      <section className="px-4 py-2">
        <Link to="/puzzle-play" className="w-full bg-blue-500 hover:bg-blue-500/90 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-between shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <Play className="h-6 w-6 fill-current" />
            </div>
            <div className="text-left">
              <p className="text-[10px] opacity-90 font-bold tracking-wider">RESUME LATEST</p>
              <p className="text-base font-bold">Advanced Calculation II</p>
            </div>
          </div>
          <ChevronRight className="h-6 w-6" />
        </Link>
      </section>

      <div className="px-4 py-4 space-y-6">
        <section className="bg-white dark:bg-[#161e2b] border border-slate-200 dark:border-slate-800 p-5 rounded-xl">
          <h3 className="text-slate-900 dark:text-white font-bold mb-6 flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-blue-500" />
            Skill Proficiency
          </h3>
          <div className="relative h-44 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <div className="w-40 h-40 border border-blue-500 rounded-full"></div>
              <div className="absolute w-28 h-28 border border-blue-500 rounded-full"></div>
              <div className="absolute w-16 h-16 border border-blue-500 rounded-full"></div>
            </div>
            <div
              className="relative w-32 h-32 bg-blue-500/10 flex items-center justify-center border border-blue-500/40"
              style={{ clipPath: "polygon(50% 0%, 100% 38%, 81% 91%, 19% 91%, 0% 38%)" }}
            >
              <div className="bg-blue-500/20 p-2 rounded shadow-inner">
                <span className="text-[10px] font-bold text-blue-500 tracking-tighter uppercase">
                  Elite
                </span>
              </div>
            </div>
            <span className="absolute top-0 text-[10px] font-bold text-slate-400 tracking-wider">
              OPENINGS
            </span>
            <span className="absolute bottom-0 text-[10px] font-bold text-slate-400 tracking-wider">
              ENDGAME
            </span>
            <span className="absolute right-0 translate-x-4 text-[10px] font-bold text-slate-400 tracking-wider">
              STRATEGY
            </span>
            <span className="absolute left-0 -translate-x-4 text-[10px] font-bold text-slate-400 tracking-wider">
              TACTICS
            </span>
          </div>
        </section>

        <section>
          <h3 className="text-slate-900 dark:text-white font-bold mb-4 px-1 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            AI-Curated Tasks
          </h3>
          <div className="space-y-3">
            <Link to="/italian-game" className="bg-white dark:bg-[#161e2b] border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-4 hover:border-blue-500/30 transition-colors">
              <div className="bg-slate-100 dark:bg-slate-800 text-blue-500 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                <Brain className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Italian Game Mastery
                </p>
                <div className="flex items-center gap-2.5 mt-1">
                  <span className="text-[9px] bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-tight">
                    Medium
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                    15m
                  </span>
                </div>
              </div>
              <div className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <MoreVertical className="h-5 w-5" />
              </div>
            </Link>

            <div className="bg-white dark:bg-[#161e2b] border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-4 hover:border-blue-500/30 transition-colors">
              <div className="bg-slate-100 dark:bg-slate-800 text-blue-500 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                <Puzzle className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Endgame Rook Drills
                </p>
                <div className="flex items-center gap-2.5 mt-1">
                  <span className="text-[9px] bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-tight">
                    Hard
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                    25m
                  </span>
                </div>
              </div>
              <div className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <MoreVertical className="h-5 w-5" />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-slate-900 dark:text-white font-bold mb-6 flex items-center gap-2">
            <GitMerge className="h-5 w-5 text-blue-500" />
            Tactical Learning Path
          </h3>
          <div className="relative space-y-8 pl-8">
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800"></div>

            <div className="relative group">
              <div className="absolute -left-[27px] top-1.5 h-3.5 w-3.5 rounded-full bg-green-500 border-4 border-white dark:border-[#0b111a] shadow-[0_0_10px_rgba(34,197,94,0.4)] z-10"></div>
              <div className="bg-white dark:bg-[#161e2b] border border-slate-200 dark:border-slate-800 p-4 rounded-xl opacity-60">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Tactical Fundamentals
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      Pins, Skewers, and Forks
                    </p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-green-500 fill-current" />
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[29px] top-1 h-4.5 w-4.5 rounded-full bg-blue-500 border-4 border-white dark:border-[#0b111a] shadow-[0_0_12px_rgba(60,131,246,0.6)] z-10 animate-pulse"></div>
              <div className="bg-blue-500/5 dark:bg-blue-500/5 border-2 border-blue-500/50 dark:border-blue-500/40 p-5 rounded-xl ring-1 ring-blue-500/10">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[9px] font-bold text-blue-500 uppercase tracking-[0.2em]">
                      CURRENT MODULE
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      Advanced Calculation
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                      Multi-step sequences & sacrifices
                    </p>
                  </div>
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                </div>
                <div className="w-full bg-blue-500/10 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full w-1/3"></div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -left-[27px] top-1.5 h-3.5 w-3.5 rounded-full bg-slate-300 dark:bg-slate-700 border-4 border-white dark:border-[#0b111a] z-10"></div>
              <div className="bg-slate-50 dark:bg-slate-900/30 border border-dashed border-slate-300 dark:border-slate-800 p-4 rounded-xl">
                <div className="flex justify-between items-start grayscale">
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 dark:text-slate-500">
                      Positional Mastery
                    </h4>
                    <p className="text-xs text-slate-400 dark:text-slate-600 mt-1 font-medium">
                      Pawn structures & Outposts
                    </p>
                  </div>
                  <Lock className="h-5 w-5 text-slate-400 dark:text-slate-600" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
