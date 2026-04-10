import { Link } from "react-router-dom";
import { ChevronRight, Puzzle, Target, Users, Trophy, Flame } from "lucide-react";
import { useProgress } from "../hooks/useProgress";
import { puzzleThemes } from "../data/puzzles";

export function Dashboard() {
  const { progress, getThemeLevel, getOverallLevel } = useProgress();

  const recentThemes = [...puzzleThemes]
    .sort((a, b) => getThemeLevel(b.id) - getThemeLevel(a.id))
    .slice(0, 4);

  return (
    <div className="px-4 py-6 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Welcome back</p>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">{progress.username}</h1>
          </div>
          <div className="flex items-center gap-2 bg-emerald-100 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-semibold text-emerald-700">Ready to Practice</span>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="card p-3 text-center">
          <Trophy className="w-5 h-5 text-amber-500 mx-auto mb-1" />
          <p className="text-lg font-bold text-slate-900">{progress.totalPuzzlesSolved}</p>
          <p className="text-xs text-slate-500">Solved</p>
        </div>
        <div className="card p-3 text-center">
          <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
          <p className="text-lg font-bold text-slate-900">{progress.streak}</p>
          <p className="text-xs text-slate-500">Streak</p>
        </div>
        <div className="card p-3 text-center">
          <Target className="w-5 h-5 text-blue-500 mx-auto mb-1" />
          <p className="text-lg font-bold text-slate-900">Level {getOverallLevel()}</p>
          <p className="text-xs text-slate-500">Mastery</p>
        </div>
        <div className="card p-3 text-center">
          <span className="text-lg font-bold text-emerald-600">{progress.difficulty}</span>
          <p className="text-xs text-slate-500">Difficulty</p>
        </div>
      </div>

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

      {/* Theme Progress */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">Your Themes</h2>
          <Link to="/skill-insights" className="text-sm font-medium text-blue-600">See all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {recentThemes.map((theme) => {
            const level = getThemeLevel(theme.id);
            const themeData = progress.themes[theme.id];
            
            return (
              <Link 
                key={theme.id} 
                to="/puzzle-play"
                className="card p-4"
              >
                <div className="text-2xl mb-2">{theme.icon}</div>
                <h3 className="text-sm font-semibold text-slate-900">{theme.name}</h3>
                <p className="text-xs text-slate-500 mt-1">Level {level}</p>
                <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                    style={{ width: `${level * 20}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Links */}
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

      {/* Session Flow */}
      <section className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-slate-900">Class Session</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <p className="text-xl font-bold text-blue-600">1</p>
            <p className="text-xs text-slate-500">Play a game</p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <p className="text-xl font-bold text-blue-600">2</p>
            <p className="text-xs text-slate-500">Review move</p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <p className="text-xl font-bold text-emerald-600">3</p>
            <p className="text-xs text-slate-500">3 drills</p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <p className="text-xl font-bold text-emerald-600">4</p>
            <p className="text-xs text-slate-500">Track growth</p>
          </div>
        </div>
      </section>
    </div>
  );
}
