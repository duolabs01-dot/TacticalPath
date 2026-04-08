import { Link } from "react-router-dom";
import { ArrowLeft, Settings, Award, TrendingUp, Zap, Clock, Shield, Target, ChevronRight, Activity } from "lucide-react";

export function Profile() {
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
          Profile
        </h1>
        <Link to="/settings" className="text-slate-900 dark:text-slate-100 p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
          <Settings className="h-6 w-6" />
        </Link>
      </header>

      <div className="p-4">
        <div className="flex flex-col items-center justify-center py-6">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full border-4 border-white dark:border-[#0b111a] shadow-[0_0_0_2px_rgba(60,131,246,0.5)] overflow-hidden transition-colors duration-200">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
                alt="Profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full border-2 border-white dark:border-[#0b111a] flex items-center justify-center transition-colors duration-200">
              <Shield className="h-3 w-3 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-200">Alex Grandmaster</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1 transition-colors duration-200">@alex_gm_2024</p>
          
          <div className="flex items-center gap-2 mt-4">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500 border border-blue-200 dark:border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200">
              Pro Member
            </span>
            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-500/20 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200">
              Level 42
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center gap-1 transition-colors duration-200">
            <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Rating</span>
            <span className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-200">1450</span>
            <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold transition-colors duration-200">+12 this week</span>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center gap-1 transition-colors duration-200">
            <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Puzzles</span>
            <span className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-200">2,841</span>
            <span className="text-blue-600 dark:text-blue-400 text-[10px] font-bold transition-colors duration-200">Top 15%</span>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center gap-1 transition-colors duration-200">
            <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Streak</span>
            <span className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-200">12</span>
            <span className="text-amber-600 dark:text-amber-400 text-[10px] font-bold transition-colors duration-200">Days Active</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight px-1 transition-colors duration-200">
            Performance Metrics
          </h3>
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 transition-colors duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-bold text-slate-900 dark:text-white transition-colors duration-200">Tactical Accuracy</span>
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-200">85%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-2 transition-colors duration-200">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: "85%" }}></div>
            </div>
            <p className="text-slate-500 text-xs text-right">Target: 90% for Expert Tier</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 transition-colors duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-bold text-slate-900 dark:text-white transition-colors duration-200">Time Management</span>
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-200">Good</span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 transition-colors duration-200">
              <div className="flex flex-col gap-1">
                <span className="uppercase tracking-wider font-bold">Opening</span>
                <span className="text-slate-900 dark:text-white font-medium transition-colors duration-200">12s / move</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="uppercase tracking-wider font-bold">Middlegame</span>
                <span className="text-slate-900 dark:text-white font-medium transition-colors duration-200">45s / move</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="uppercase tracking-wider font-bold">Endgame</span>
                <span className="text-slate-900 dark:text-white font-medium transition-colors duration-200">20s / move</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight px-1 transition-colors duration-200">
            Recent Achievements
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-colors duration-200">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center border border-amber-200 dark:border-amber-500/20 transition-colors duration-200">
                <Award className="h-6 w-6 text-amber-500" />
              </div>
              <div className="flex-1">
                <h4 className="text-slate-900 dark:text-white font-bold text-sm transition-colors duration-200">Tactics Master I</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 transition-colors duration-200">Solve 100 hard puzzles</p>
              </div>
              <span className="text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-wider font-bold transition-colors duration-200">2d ago</span>
            </div>

            <div className="flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-colors duration-200">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center border border-blue-200 dark:border-blue-500/20 transition-colors duration-200">
                <Zap className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <h4 className="text-slate-900 dark:text-white font-bold text-sm transition-colors duration-200">Speed Demon</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 transition-colors duration-200">Win 5 Blitz games in a row</p>
              </div>
              <span className="text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-wider font-bold transition-colors duration-200">1w ago</span>
            </div>
          </div>
          
          <button 
            onClick={() => alert("Achievements page coming soon!")}
            className="w-full py-4 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            View All Achievements <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
