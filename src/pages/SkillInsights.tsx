import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, Trophy, Target, Star } from "lucide-react";
import { puzzleThemes, PuzzleTheme } from "../data/puzzles";
import { useProgress } from "../hooks/useProgress";

export function SkillInsights() {
  const { progress, getThemeLevel, getOverallLevel } = useProgress();

  const getMasteryColor = (level: number) => {
    if (level >= 4) return "bg-emerald-500";
    if (level >= 3) return "bg-blue-500";
    if (level >= 2) return "bg-amber-500";
    return "bg-slate-400";
  };

  const getMasteryText = (level: number) => {
    if (level >= 4) return "Mastered";
    if (level >= 3) return "Strong";
    if (level >= 2) return "Growing";
    return "Just Started";
  };

  const sortedThemes = [...puzzleThemes].sort((a, b) => 
    getThemeLevel(b.id) - getThemeLevel(a.id)
  );

  return (
    <div className="px-4 py-6 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center md:hidden">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Progress</p>
            <h1 className="text-xl font-bold text-slate-900 md:text-2xl">Your Growth</h1>
          </div>
        </div>
      </header>

      {/* Overall Progress */}
      <div className="card p-6 mb-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <p className="text-sm text-blue-100">Overall Mastery Level</p>
        <div className="flex items-end gap-2 mt-2">
          <span className="text-5xl font-bold">Level {getOverallLevel()}</span>
          <span className="text-blue-100 text-lg mb-2">/ 5</span>
        </div>
        <div className="mt-4 h-3 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full"
            style={{ width: `${getOverallLevel() * 20}%` }}
          />
        </div>
        <p className="text-sm text-blue-100 mt-3">
          {progress.totalPuzzlesSolved} puzzles solved • {progress.streak} day streak
        </p>
      </div>

      {/* Theme Progress */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">Theme Mastery</h2>
          <Link to="/puzzle-bank" className="text-sm font-medium text-blue-600">Practice →</Link>
        </div>
        <div className="space-y-3">
          {sortedThemes.map((theme) => {
            const themeData = progress.themes[theme.id];
            const level = getThemeLevel(theme.id);
            
            return (
              <Link 
                key={theme.id} 
                to="/puzzle-bank"
                className="card p-4 flex items-center gap-4"
              >
                <div className="text-2xl">{theme.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-900">{theme.name}</h3>
                      <p className="text-xs text-slate-500">{getMasteryText(level)}</p>
                    </div>
                    <span className="text-2xl font-bold text-slate-900">Lv.{level}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${getMasteryColor(level)}`}
                        style={{ width: `${level * 20}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 w-16 text-right">
                      {themeData.solved} solved
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Achievements Preview */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Achievements</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className={`card p-4 text-center ${progress.totalPuzzlesSolved >= 1 ? 'bg-amber-50 border-2 border-amber-200' : ''}`}>
            <Trophy className={`w-6 h-6 mx-auto mb-2 ${progress.totalPuzzlesSolved >= 1 ? 'text-amber-500' : 'text-slate-300'}`} />
            <p className="text-xs font-medium text-slate-600">First Puzzle</p>
          </div>
          <div className={`card p-4 text-center ${progress.totalPuzzlesSolved >= 10 ? 'bg-amber-50 border-2 border-amber-200' : ''}`}>
            <Star className={`w-6 h-6 mx-auto mb-2 ${progress.totalPuzzlesSolved >= 10 ? 'text-amber-500' : 'text-slate-300'}`} />
            <p className="text-xs font-medium text-slate-600">10 Solved</p>
          </div>
          <div className={`card p-4 text-center ${progress.totalPuzzlesSolved >= 50 ? 'bg-amber-50 border-2 border-amber-200' : ''}`}>
            <Target className={`w-6 h-6 mx-auto mb-2 ${progress.totalPuzzlesSolved >= 50 ? 'text-amber-500' : 'text-slate-300'}`} />
            <p className="text-xs font-medium text-slate-600">50 Solved</p>
          </div>
        </div>
      </section>

      {/* Practice CTA */}
      <Link to="/puzzle-bank" className="block card p-5 bg-slate-900 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold">Keep Improving</h3>
            <p className="text-sm text-slate-400 mt-1">Practice puzzles to level up</p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </Link>
    </div>
  );
}
