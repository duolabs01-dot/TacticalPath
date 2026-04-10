import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings, Star, Trophy, Edit2, Check, X } from "lucide-react";
import { useProgress } from "../hooks/useProgress";
import { puzzleThemes } from "../data/puzzles";

export function Profile() {
  const { progress, setUsername, setDifficulty, getThemeLevel, getOverallLevel, resetProgress } = useProgress();
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(progress.username);

  const handleSaveName = () => {
    if (newName.trim()) {
      setUsername(newName.trim());
    }
    setIsEditingName(false);
  };

  const getMasteryColor = (level: number) => {
    if (level >= 4) return "bg-emerald-500";
    if (level >= 3) return "bg-blue-500";
    if (level >= 2) return "bg-amber-500";
    return "bg-slate-400";
  };

  return (
    <div className="px-4 py-6 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center md:hidden">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Profile</p>
            <h1 className="text-xl font-bold text-slate-900 md:text-2xl">My Account</h1>
          </div>
          <Link to="/settings" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
            <Settings className="w-5 h-5 text-slate-600" />
          </Link>
        </div>
      </header>

      {/* Profile Card */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-3xl font-bold text-white">
            {progress.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="text-xl font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg"
                  autoFocus
                />
                <button onClick={handleSaveName} className="text-emerald-600">
                  <Check className="w-5 h-5" />
                </button>
                <button onClick={() => setIsEditingName(false)} className="text-rose-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{progress.username}</h2>
                <button onClick={() => setIsEditingName(true)} className="text-slate-400">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}
            <p className="text-sm text-slate-500 mt-1">Room 3A • Tuesday Club</p>
            <div className="inline-flex items-center gap-2 mt-2 bg-emerald-100 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span className="text-xs font-semibold text-emerald-700">Level {getOverallLevel()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{progress.totalPuzzlesSolved}</p>
          <p className="text-xs text-slate-500">Puzzles Solved</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{progress.streak}</p>
          <p className="text-xs text-slate-500">Day Streak</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{progress.difficulty}</p>
          <p className="text-xs text-slate-500">Difficulty</p>
        </div>
      </div>

      {/* Theme Progress */}
      <section className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Theme Progress</h3>
        <div className="space-y-3">
          {puzzleThemes.map((theme) => {
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
                    <span className="font-semibold text-slate-900">{theme.name}</span>
                    <span className="text-sm font-bold text-slate-600">Level {level}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${getMasteryColor(level)}`}
                        style={{ width: `${level * 20}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500">{themeData.solved}/{themeData.attempts}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Settings */}
      <section className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Settings</h3>
        <div className="space-y-3">
          <div className="card p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Difficulty</label>
            <div className="flex gap-2">
              {(['beginner', 'intermediate', 'advanced'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
                    progress.difficulty === diff
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            onClick={resetProgress}
            className="card w-full p-4 text-left text-rose-600 hover:bg-rose-50"
          >
            Reset All Progress
          </button>
        </div>
      </section>
    </div>
  );
}
