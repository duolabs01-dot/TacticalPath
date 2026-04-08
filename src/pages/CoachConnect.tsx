import { Link } from "react-router-dom";
import { ArrowLeft, Search, Filter, Star, Video, MessageSquare, Calendar, ChevronRight, CheckCircle2 } from "lucide-react";

export function CoachConnect() {
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
          Find a Coach
        </h1>
        <button className="text-slate-900 dark:text-slate-100 p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
          <Filter className="h-6 w-6" />
        </button>
      </header>

      <div className="p-4 space-y-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 dark:text-slate-500 transition-colors duration-200" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-800 rounded-xl leading-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200 shadow-sm"
            placeholder="Search by name, title, or expertise..."
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button className="whitespace-nowrap bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-blue-500/20 transition-colors duration-200">
            All Coaches
          </button>
          <button className="whitespace-nowrap bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 px-4 py-2 rounded-full text-xs font-bold transition-colors duration-200">
            Grandmasters
          </button>
          <button className="whitespace-nowrap bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 px-4 py-2 rounded-full text-xs font-bold transition-colors duration-200">
            Endgame Specialists
          </button>
          <button className="whitespace-nowrap bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 px-4 py-2 rounded-full text-xs font-bold transition-colors duration-200">
            Opening Experts
          </button>
        </div>

        <div>
          <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight mb-4 px-1 transition-colors duration-200">
            Top Rated Coaches
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-blue-500/30 transition-colors duration-200 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-2 border-slate-200 dark:border-slate-700 overflow-hidden transition-colors duration-200">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" alt="Coach" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 border-2 border-white dark:border-slate-900 transition-colors duration-200">
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-bold text-base flex items-center gap-2 transition-colors duration-200">
                        GM Hikaru N.
                        <span className="bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-amber-200 dark:border-amber-500/20 transition-colors duration-200">GM</span>
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-0.5 transition-colors duration-200">Speed Chess & Tactics</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 transition-colors duration-200">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-bold">5.0</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 font-medium transition-colors duration-200">
                    <span className="flex items-center gap-1"><Video className="h-3 w-3" /> $150/hr</span>
                    <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> $50/game</span>
                  </div>
                </div>
              </div>
              
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed line-clamp-2 mb-4 italic transition-colors duration-200">
                "I specialize in aggressive openings and rapid calculation. Let's sharpen your tactical vision and dominate the board."
              </p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => alert("Booking system coming soon!")}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl transition-colors text-sm shadow-lg shadow-blue-500/20"
                >
                  Book Session
                </button>
                <button 
                  onClick={() => alert("Calendar view coming soon!")}
                  className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-white font-bold py-2.5 px-4 rounded-xl transition-colors text-sm flex items-center justify-center"
                >
                  <Calendar className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-purple-500/30 transition-colors duration-200 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-2 border-slate-200 dark:border-slate-700 overflow-hidden transition-colors duration-200">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Coach" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 border-2 border-white dark:border-slate-900 transition-colors duration-200">
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-bold text-base flex items-center gap-2 transition-colors duration-200">
                        IM Anna R.
                        <span className="bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-purple-200 dark:border-purple-500/20 transition-colors duration-200">IM</span>
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-0.5 transition-colors duration-200">Positional Play & Endgames</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 transition-colors duration-200">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-bold">4.9</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 font-medium transition-colors duration-200">
                    <span className="flex items-center gap-1"><Video className="h-3 w-3" /> $80/hr</span>
                    <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> $30/game</span>
                  </div>
                </div>
              </div>
              
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed line-clamp-2 mb-4 italic transition-colors duration-200">
                "My approach focuses on solid positional understanding and flawless endgame technique. Perfect for intermediate players looking to break through."
              </p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => alert("Booking system coming soon!")}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl transition-colors text-sm shadow-lg shadow-blue-500/20"
                >
                  Book Session
                </button>
                <button 
                  onClick={() => alert("Calendar view coming soon!")}
                  className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-white font-bold py-2.5 px-4 rounded-xl transition-colors text-sm flex items-center justify-center"
                >
                  <Calendar className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
