import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";

const masteryRows = [
  { theme: "1-Move Checkmates", level: "Level 4", progress: 84, note: "Fast & confident" },
  { theme: "Basic Pins", level: "Level 3", progress: 68, note: "Improving steadily" },
  { theme: "Basic Forks", level: "Level 2", progress: 46, note: "Keep practicing" },
  { theme: "Missed Captures", level: "Level 2", progress: 42, note: "Focus area" },
];

export function SkillInsights() {
  return (
    <div className="px-4 py-6">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Progress</p>
            <h1 className="text-xl font-bold text-slate-900">Your Growth</h1>
          </div>
        </div>
      </header>

      {/* Overall Progress */}
      <div className="card p-5 mb-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <p className="text-sm text-blue-100">Overall Mastery</p>
        <div className="flex items-end gap-2 mt-2">
          <span className="text-4xl font-bold">Level 3</span>
          <span className="text-blue-100 text-sm mb-1">average</span>
        </div>
        <p className="text-sm text-blue-100 mt-2">Keep going! You're making progress.</p>
      </div>

      {/* Theme Progress */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Theme Mastery</h2>
        <div className="space-y-3">
          {masteryRows.map((row) => (
            <Link 
              key={row.theme} 
              to="/puzzle-play"
              className="card p-4 flex items-center gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500">{row.level}</span>
                  <span className="text-sm font-bold text-blue-600">{row.progress}%</span>
                </div>
                <h3 className="font-semibold text-slate-900">{row.theme}</h3>
                <p className="text-sm text-slate-500">{row.note}</p>
                <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                    style={{ width: `${row.progress}%` }}
                  />
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </Link>
          ))}
        </div>
      </section>

      {/* Practice CTA */}
      <Link to="/puzzle-bank" className="block card p-5 bg-slate-900 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold">Keep Improving</h3>
            <p className="text-sm text-slate-400 mt-1">Practice more puzzles to grow</p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </Link>
    </div>
  );
}