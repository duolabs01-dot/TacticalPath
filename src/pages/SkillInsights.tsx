import { Link } from "react-router-dom";
import { ArrowLeft, BarChart2, TrendingUp, TrendingDown, Target, Brain, Shield, Zap, ChevronRight, Info } from "lucide-react";

export function SkillInsights() {
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
          Skill Insights
        </h1>
        <button className="text-slate-900 dark:text-slate-100 p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
          <BarChart2 className="h-6 w-6" />
        </button>
      </header>

      <div className="p-4 space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden transition-colors duration-200">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <h2 className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight transition-colors duration-200">Overall Mastery</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium transition-colors duration-200">Based on last 100 games</p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/20 transition-colors duration-200">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-bold">+4.2%</span>
            </div>
          </div>

          <div className="flex items-end gap-4 mb-8">
            <span className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors duration-200">78</span>
            <span className="text-xl font-bold text-slate-500 mb-2">/ 100</span>
          </div>

          <div className="space-y-4 relative z-10">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300 transition-colors duration-200">Tactics</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white transition-colors duration-200">85%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden transition-colors duration-200">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300 transition-colors duration-200">Strategy</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white transition-colors duration-200">72%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden transition-colors duration-200">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: "72%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300 transition-colors duration-200">Endgame</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white transition-colors duration-200">64%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden transition-colors duration-200">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: "64%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col gap-3 transition-colors duration-200">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-200 dark:border-emerald-500/20 transition-colors duration-200">
              <Target className="h-5 w-5 text-emerald-600 dark:text-emerald-500 transition-colors duration-200" />
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-sm transition-colors duration-200">Strongest Area</h3>
              <p className="text-emerald-600 dark:text-emerald-400 text-lg font-bold mt-1 transition-colors duration-200">King Safety</p>
              <p className="text-slate-500 text-[10px] uppercase tracking-wider font-bold mt-2">Top 12% of players</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col gap-3 transition-colors duration-200">
            <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-500/10 flex items-center justify-center border border-rose-200 dark:border-rose-500/20 transition-colors duration-200">
              <Shield className="h-5 w-5 text-rose-600 dark:text-rose-500 transition-colors duration-200" />
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-sm transition-colors duration-200">Weakest Area</h3>
              <p className="text-rose-600 dark:text-rose-400 text-lg font-bold mt-1 transition-colors duration-200">Pawn Endgames</p>
              <p className="text-slate-500 text-[10px] uppercase tracking-wider font-bold mt-2">Bottom 30% of players</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 rounded-xl p-5 transition-colors duration-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-200">
              <Brain className="h-5 w-5 text-blue-600 dark:text-blue-500 transition-colors duration-200" />
            </div>
            <div>
              <h3 className="text-blue-600 dark:text-blue-400 text-sm font-bold mb-2 flex items-center gap-2 transition-colors duration-200">
                AI Recommendation
                <Info className="h-4 w-4 text-blue-400 dark:text-blue-500/50 transition-colors duration-200" />
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed transition-colors duration-200">
                Your tactical vision is excellent, but you often lose advantage in equal endgames. Focus your next 3 study sessions entirely on basic pawn and rook endgames.
              </p>
              <button 
                onClick={() => alert("Generating endgame drills...")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors shadow-lg shadow-blue-500/20"
              >
                Generate Endgame Drills
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight mb-4 px-1 transition-colors duration-200">
            Recent Trends
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center transition-colors duration-200">
                  <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-500 transition-colors duration-200" />
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white font-bold text-sm transition-colors duration-200">Opening Accuracy</p>
                  <p className="text-slate-500 text-[11px] font-medium">Last 7 days</p>
                </div>
              </div>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm transition-colors duration-200">+8.5%</span>
            </div>

            <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-500/10 flex items-center justify-center transition-colors duration-200">
                  <TrendingDown className="h-4 w-4 text-rose-600 dark:text-rose-500 transition-colors duration-200" />
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white font-bold text-sm transition-colors duration-200">Blunder Rate</p>
                  <p className="text-slate-500 text-[11px] font-medium">Last 7 days</p>
                </div>
              </div>
              <span className="text-rose-600 dark:text-rose-400 font-bold text-sm transition-colors duration-200">+2.1%</span>
            </div>
            
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center transition-colors duration-200">
                  <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-500 transition-colors duration-200" />
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white font-bold text-sm transition-colors duration-200">Time Advantage</p>
                  <p className="text-slate-500 text-[11px] font-medium">Last 7 days</p>
                </div>
              </div>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm transition-colors duration-200">+15s avg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
