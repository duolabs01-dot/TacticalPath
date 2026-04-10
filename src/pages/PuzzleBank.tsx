import { Link } from "react-router-dom";
import { ArrowLeft, Search, Puzzle } from "lucide-react";
import { puzzleThemes, PuzzleTheme } from "../data/puzzles";
import { useProgress } from "../hooks/useProgress";

export function PuzzleBank() {
  const { progress, getThemeLevel } = useProgress();

  const getMasteryColor = (level: number) => {
    if (level >= 4) return "bg-emerald-100 text-emerald-700";
    if (level >= 3) return "bg-blue-100 text-blue-700";
    if (level >= 2) return "bg-amber-100 text-amber-700";
    return "bg-slate-100 text-slate-700";
  };

  const getMasteryText = (level: number) => {
    if (level >= 4) return "Mastered";
    if (level >= 3) return "Strong";
    if (level >= 2) return "Growing";
    return "Beginner";
  };

  return (
    <div className="px-4 py-6 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center md:hidden">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Practice</p>
            <h1 className="text-xl font-bold text-slate-900 md:text-2xl">Puzzle Drills</h1>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{progress.totalPuzzlesSolved}</p>
          <p className="text-xs text-slate-500">Solved</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{progress.streak}</p>
          <p className="text-xs text-slate-500">Streak</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{progress.difficulty}</p>
          <p className="text-xs text-slate-500">Level</p>
        </div>
      </div>

      {/* Theme Cards */}
      <div className="space-y-3">
        {puzzleThemes.map((theme) => {
          const themeData = progress.themes[theme.id];
          const level = getThemeLevel(theme.id);
          
          return (
            <Link 
              key={theme.id}
              to={`/puzzle-play?theme=${theme.id}`}
              className="card p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">
                  {theme.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{theme.name}</h3>
                  <p className="text-sm text-slate-500">
                    {themeData.solved} solved • {themeData.attempts} attempts
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getMasteryColor(level)}`}>
                  {getMasteryText(level)}
                </span>
                <Puzzle className="w-5 h-5 text-slate-400" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Practice */}
      <Link to="/puzzle-play" className="block card p-5 mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-blue-100">Random Practice</p>
            <h2 className="text-lg font-bold mt-1">Start a Puzzle</h2>
            <p className="text-sm text-blue-100 mt-1">Any theme, any difficulty</p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Puzzle className="w-5 h-5" />
          </div>
        </div>
      </Link>
    </div>
  );
}
