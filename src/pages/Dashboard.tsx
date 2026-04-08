import { Link } from "react-router-dom";
import { useState, FormEvent } from "react";
import {
  Brain,
  Bell,
  Info,
  Zap,
  BarChart2,
  CheckCircle2,
  Terminal,
  Puzzle,
  LayoutGrid,
  Send,
  Target,
  MessageSquare
} from "lucide-react";

export function Dashboard() {
  const [goal, setGoal] = useState("");

  const handleSetGoal = (e: FormEvent) => {
    e.preventDefault();
    if (goal.trim()) {
      alert(`Goal set: ${goal}\nWe'll track your progress towards this objective!`);
      setGoal("");
    } else {
      alert("Please enter a valid goal.");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24 pt-6 w-full">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0b111a]/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-14 items-center justify-between px-4 mx-auto">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 text-white rounded-md p-1.5 flex items-center justify-center">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight">Tactical Path</h1>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                  Neural Sync Active
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 h-9 w-9">
              <Bell className="h-5 w-5" />
            </button>
            <Link
              to="/profile"
              className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full border border-slate-200 dark:border-slate-800"
            >
              <img
                alt="Profile"
                className="aspect-square h-full w-full"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
              />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        <section className="px-4 mb-6 mt-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161e2b] shadow overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-50"></div>
            <div className="p-6 relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    Neural Rank
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-5xl font-bold tracking-tighter">1450</h2>
                    <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500 transition-colors">
                      +12 PTS
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Percentile
                  </p>
                  <p className="text-sm font-bold">Top 8%</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Progress to Expert
                  </span>
                  <span className="font-bold">
                    1450 <span className="text-slate-500 dark:text-slate-400">/ 1500</span>
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Info className="h-3 w-3 text-blue-500" />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    ~4 wins until <span className="text-slate-900 dark:text-white font-semibold">Expert Tier</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 mb-8">
          <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-none">Unlock Grandmaster AI</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Personalized training engine
                </p>
              </div>
            </div>
            <Link
              to="/subscription"
              className="inline-flex items-center justify-center rounded-md text-[11px] font-bold h-8 px-3 bg-blue-500 text-white hover:bg-blue-500/90 transition-colors uppercase tracking-tight flex-shrink-0"
            >
              Go Pro
            </Link>
          </div>
        </section>

        <section className="px-4 mb-8">
          <form onSubmit={handleSetGoal} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161e2b] p-5 shadow-sm">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-500" />
              Set a Daily Goal
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Solve 20 puzzles"
                className="flex-1 bg-slate-50 dark:bg-[#0b111a] border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center justify-center transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 mb-8">
          <section>
            <Link
              to="/assessment"
              className="group relative block rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161e2b] p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all active:scale-[0.98] h-full"
            >
              <div className="flex items-center justify-between h-full">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0b111a] group-hover:border-blue-500/50 transition-colors">
                    <Zap className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold leading-none">System Assessment</h3>
                      <span className="inline-flex items-center rounded-full bg-blue-500 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Identify and repair tactical vulnerabilities
                    </p>
                  </div>
                </div>
                <span className="text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  &gt;
                </span>
              </div>
            </Link>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                Intelligence
              </h3>
              <Link
                to="/skill-insights"
                className="text-[10px] font-bold text-blue-500 hover:underline uppercase tracking-widest"
              >
                History
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 h-[calc(100%-2rem)]">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161e2b] p-4 flex flex-col justify-center">
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Efficiency
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold italic">85%</span>
                  <span className="text-[9px] font-bold text-emerald-500 uppercase">Accuracy</span>
                </div>
                <div className="mt-3 h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-full bg-emerald-500 w-[85%]"></div>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161e2b] p-4 flex flex-col justify-center">
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Daily Core
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold uppercase tracking-tighter">Verified</span>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">12 day streak</p>
              </div>
            </div>
          </section>
        </div>

        <section className="px-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Recent Feedback
            </h3>
          </div>
          <Link to="/coach-review" className="block bg-white dark:bg-[#161e2b] border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-blue-500/30 transition-colors duration-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500 font-bold text-xs border border-blue-200 dark:border-blue-500/20">
                  GM
                </div>
                <h4 className="text-slate-900 dark:text-white font-bold text-sm">New Coach Feedback</h4>
              </div>
              <span className="text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded-md border border-blue-200 dark:border-blue-500/20">
                Unread
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">
              "Your recent tournament games show great improvement in the opening phase, but we need to address your time management..."
            </p>
          </Link>
        </section>

        <section className="px-4 pb-12">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
            <LayoutGrid className="h-4 w-4" />
            Operations
          </h3>
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            <Link
              to="/study-plan"
              className="flex flex-col items-center justify-center aspect-square rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161e2b] gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-blue-500/30 transition-all group"
            >
              <div className="text-slate-500 dark:text-slate-400 group-hover:text-blue-500 transition-colors">
                <Terminal className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-tight text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">
                Study Plan
              </span>
            </Link>
            <Link
              to="/coach-connect"
              className="flex flex-col items-center justify-center aspect-square rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161e2b] gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-purple-400/30 transition-all group"
            >
              <div className="text-slate-500 dark:text-slate-400 group-hover:text-purple-400 transition-colors">
                <Brain className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-tight text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">
                Coach
              </span>
            </Link>
            <Link
              to="/puzzle-bank"
              className="flex flex-col items-center justify-center aspect-square rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161e2b] gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-orange-400/30 transition-all group"
            >
              <div className="text-slate-500 dark:text-slate-400 group-hover:text-orange-400 transition-colors">
                <Puzzle className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-tight text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">
                Puzzles
              </span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
