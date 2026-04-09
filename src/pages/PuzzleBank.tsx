import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, Search } from "lucide-react";

const themeCards = [
  { title: "1-Move Checkmates", mastery: "Strong", progress: 86, color: "bg-emerald-100 text-emerald-700" },
  { title: "Basic Forks", mastery: "Growing", progress: 41, color: "bg-amber-100 text-amber-700" },
  { title: "Basic Pins", mastery: "Solid", progress: 67, color: "bg-blue-100 text-blue-700" },
  { title: "Missed Captures", mastery: "Focus", progress: 48, color: "bg-rose-100 text-rose-700" },
];

export function PuzzleBank() {
  return (
    <div className="px-4 py-6">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Practice</p>
            <h1 className="text-xl font-bold text-slate-900">Puzzle Drills</h1>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search themes..." 
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm"
        />
      </div>

      {/* Theme Cards */}
      <div className="space-y-3 mb-6">
        {themeCards.map((theme) => (
          <Link 
            key={theme.title}
            to="/puzzle-play"
            className="card p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">♞</div>
              <div>
                <h3 className="font-semibold text-slate-900">{theme.title}</h3>
                <p className={`text-xs font-medium mt-1 ${theme.color}`}>{theme.mastery}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{theme.progress}%</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Practice */}
      <Link to="/puzzle-play" className="block card p-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-blue-100">Quick Start</p>
            <h2 className="text-lg font-bold mt-1">Start a Random Puzzle</h2>
            <p className="text-sm text-blue-100 mt-1">Practice any theme</p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </Link>
    </div>
  );
}