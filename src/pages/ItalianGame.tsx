import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Play, CheckCircle2, ChevronRight, Brain, Shield, Zap } from "lucide-react";

export function ItalianGame() {
  return (
    <div className="flex-1 overflow-y-auto pb-32 bg-slate-50 dark:bg-[#0b111a] text-slate-900 dark:text-slate-100 min-h-screen">
      <header className="sticky top-0 z-50 flex items-center p-4 border-b border-slate-200 dark:border-slate-800/50 backdrop-blur-md bg-white/75 dark:bg-[#0b111a]/75">
        <Link
          to="/study-plan"
          className="text-slate-900 dark:text-slate-100 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 ml-2">
          Italian Game
        </h1>
        <button className="text-slate-900 dark:text-slate-100 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <BookOpen className="h-6 w-6" />
        </button>
      </header>

      <div className="p-4 space-y-6">
        <div className="relative overflow-hidden flex flex-col items-stretch justify-start rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
          <div
            className="w-full aspect-video bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&q=80&w=800")',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent dark:from-slate-900 dark:via-slate-900/60"></div>
          </div>
          <div className="flex w-full flex-col gap-1 p-6 relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 rounded-full">
                Beginner Friendly
              </span>
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 rounded-full">
                1. e4 e5
              </span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">
              Master the Italian
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-1 mb-6">
              A classic, principled opening that focuses on rapid development, central control, and early king safety.
            </p>
            
            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  Progress
                </span>
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">45% Complete</span>
              </div>
              <button 
                onClick={() => alert("Resuming lesson...")}
                className="flex min-w-[120px] items-center justify-center rounded-lg h-11 px-6 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/20 gap-2"
              >
                <Play className="h-4 w-4 fill-current" />
                Resume
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight mb-4 px-1">
            Core Concepts
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-start gap-4 hover:border-blue-300 dark:hover:border-blue-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-500 flex-shrink-0">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold text-sm">Control the Center</h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs mt-1 leading-relaxed">
                  Establish a strong pawn presence on e4 and d4 to dominate the central squares.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-start gap-4 hover:border-emerald-300 dark:hover:border-emerald-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-500 flex-shrink-0">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold text-sm">Rapid Development</h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs mt-1 leading-relaxed">
                  Bring out your knights and bishops quickly to prepare for castling and active play.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-start gap-4 hover:border-amber-300 dark:hover:border-amber-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-500 flex-shrink-0">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold text-sm">Target f7</h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs mt-1 leading-relaxed">
                  The Italian bishop on c4 eyes the vulnerable f7 pawn, creating early tactical opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between px-1 mb-4">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">
              Syllabus
            </h3>
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              12 Lessons
            </span>
          </div>

          <div className="space-y-3">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between opacity-60">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-500">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm line-through">1. Introduction & Setup</h4>
                  <p className="text-slate-500 text-[11px] font-medium mt-0.5">5 mins • Video</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between opacity-60">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-500">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm line-through">2. The Giuoco Piano</h4>
                  <p className="text-slate-500 text-[11px] font-medium mt-0.5">12 mins • Interactive</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 flex items-center justify-between relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-[0_0_10px_rgba(60,131,246,0.5)]">
                  <Play className="h-4 w-4 ml-0.5" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm">3. The Evans Gambit</h4>
                  <p className="text-blue-600 dark:text-blue-400 text-[11px] font-bold mt-0.5 uppercase tracking-wider">Up Next • 15 mins</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-blue-500" />
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold">4</span>
                </div>
                <div>
                  <h4 className="text-slate-700 dark:text-slate-300 font-bold text-sm group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Two Knights Defense</h4>
                  <p className="text-slate-500 text-[11px] font-medium mt-0.5">20 mins • Practice</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
