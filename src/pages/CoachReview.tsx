import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, Star, Clock, CheckCircle2, Video, FileText, ChevronRight } from "lucide-react";

export function CoachReview() {
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
          Coach Reviews
        </h1>
        <button className="text-slate-900 dark:text-slate-100 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <MessageSquare className="h-6 w-6" />
        </button>
      </header>

      <div className="p-4 space-y-6">
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 shadow-xl shadow-purple-900/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-white/20 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=100" alt="Coach" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-white text-lg font-bold tracking-tight">GM Magnus C.</h2>
                <div className="flex items-center gap-1 text-purple-200 text-xs font-bold uppercase tracking-wider">
                  <Star className="h-3 w-3 fill-current" />
                  <span>4.9 Rating</span>
                </div>
              </div>
            </div>
            
            <p className="text-purple-100 text-sm leading-relaxed mb-6">
              "Your recent tournament games show great improvement in the opening phase, but we need to address your time management in complex middlegames."
            </p>
            
            <div className="flex gap-3">
              <button className="flex-1 bg-white text-purple-700 hover:bg-purple-50 font-bold py-2.5 px-4 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
                <Video className="h-4 w-4" />
                Book Session
              </button>
              <button className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-2.5 px-4 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 backdrop-blur-sm">
                <FileText className="h-4 w-4" />
                View Notes
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight mb-4 px-1">
            Pending Reviews
          </h3>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-500">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold text-sm">Game Analysis Request</h4>
                <p className="text-slate-500 text-[11px] font-medium mt-0.5">Submitted 2 days ago</p>
              </div>
            </div>
            <span className="text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-md border border-amber-200 dark:border-amber-500/20">
              In Progress
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between px-1 mb-4">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">
              Past Feedback
            </h3>
            <Link to="#" className="text-blue-500 text-sm font-semibold hover:underline">
              Filter
            </Link>
          </div>

          <div className="space-y-3">
            <Link to="#" className="block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-500">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-sm">Endgame Technique</h4>
                    <p className="text-slate-500 text-[11px] font-medium">Oct 15, 2023</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">
                Excellent execution of the Lucena position. You've clearly been practicing the drills we discussed last week. Keep it up!
              </p>
            </Link>

            <Link to="#" className="block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-500">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-sm">Sicilian Najdorf Review</h4>
                    <p className="text-slate-500 text-[11px] font-medium">Sep 28, 2023</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">
                You missed a critical tactical sequence on move 18. Review the annotated PGN I attached, specifically focusing on the d5 square control.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
