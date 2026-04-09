import { Link } from "react-router-dom";
import { ChevronRight, Puzzle, Target, Users } from "lucide-react";

const themes = [
  { name: "Hanging Pieces", level: 3, progress: 72 },
  { name: "Missed Captures", level: 2, progress: 48 },
  { name: "1-Move Checkmates", level: 4, progress: 86 },
  { name: "Basic Forks", level: 2, progress: 41 },
  { name: "Basic Pins", level: 3, progress: 67 },
];

export function Dashboard() {
  return (
    <div className="px-4 py-6 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Welcome back</p>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Chloe M.</h1>
          </div>
          <div className="flex items-center gap-2 bg-emerald-100 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-semibold text-emerald-700">In Session</span>
          </div>
        </div>
      </header>

      {/* Quick Action Card */}
      <Link 
        to="/puzzle-play" 
        className="block card p-5 mb-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-blue-100">Quick Practice</p>
            <h2 className="text-xl font-bold mt-1">Play a Puzzle</h2>
            <p className="text-sm text-blue-100 mt-1">Keep sharp while you wait</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Puzzle className="w-6 h-6" />
          </div>
        </div>
      </Link>

      {/* Mastery Progress */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">Your Progress</h2>
          <Link to="/skill-insights" className="text-sm font-medium text-blue-600">See all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {themes.slice(0, 4).map((theme) => (
            <Link 
              key={theme.name} 
              to="/puzzle-play"
              className="card p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500">Level {theme.level}</span>
                <span className="text-xs font-bold text-emerald-600">{theme.progress}%</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-900">{theme.name}</h3>
              <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                  style={{ width: `${theme.progress}%` }}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* What to Do */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">What to do next</h2>
        <div className="space-y-3">
          <Link to="/skill-insights" className="card p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">Check your progress</h3>
              <p className="text-sm text-slate-500">See which themes you're mastering</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </Link>
          
          <Link to="/puzzle-bank" className="card p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <Puzzle className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">Practice drills</h3>
              <p className="text-sm text-slate-500">Work on themes you need</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </Link>
        </div>
      </section>

      {/* Today's Session Flow */}
      <section className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-slate-900">Class Session</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</div>
            <p className="text-sm text-slate-600">Play a game</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">2</div>
            <p className="text-sm text-slate-600">Review one turning point</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center">3</div>
            <p className="text-sm text-slate-600">Complete 3 drills</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center">4</div>
            <p className="text-sm text-slate-600">Track your growth</p>
          </div>
        </div>
      </section>
    </div>
  );
}