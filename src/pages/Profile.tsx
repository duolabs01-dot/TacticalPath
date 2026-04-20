import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Edit2, Flame, Play, Settings, Star, Trophy, X, Zap } from "lucide-react";
import { useProgress } from "../hooks/useProgress";
import { puzzleThemes } from "../data/puzzles";
import { gameLibrary } from "../data/games";

export function Profile() {
  const { progress, setUsername, setDifficulty, getThemeLevel, getOverallLevel, resetProgress } = useProgress();
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(progress.username);

  const level = getOverallLevel();
  const liveGames = gameLibrary.filter((game) => game.status === "live");
  const featuredGame = useMemo(() => liveGames.find((game) => game.id === "chess") ?? liveGames[0] ?? gameLibrary[0], [liveGames]);

  const handleSaveName = () => {
    if (newName.trim()) {
      setUsername(newName.trim());
    }
    setIsEditingName(false);
  };

  const getMasteryColor = (levelNumber: number) => {
    if (levelNumber >= 4) return "bg-emerald-500";
    if (levelNumber >= 3) return "bg-blue-500";
    if (levelNumber >= 2) return "bg-amber-500";
    return "bg-slate-400";
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
      <header className="mb-6 flex items-center gap-3">
        <Link to="/dashboard" className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm md:hidden">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </Link>
        <div className="flex-1">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">Profile</p>
          <h1 className="text-2xl font-black text-slate-900 md:text-3xl">Player identity and momentum</h1>
        </div>
        <Link to="/settings" className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
          <Settings className="h-5 w-5 text-slate-600" />
        </Link>
      </header>

      <section className="mb-6 grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 p-6 text-white shadow-2xl shadow-slate-200">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 text-3xl font-black text-white shadow-lg shadow-blue-500/25">
              {progress.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              {isEditingName ? (
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="rounded-xl bg-white/10 px-3 py-2 text-xl font-bold text-white outline-none ring-1 ring-white/20"
                    autoFocus
                  />
                  <button onClick={handleSaveName} className="rounded-xl bg-emerald-500/20 p-2 text-emerald-200 transition hover:bg-emerald-500/30">
                    <Check className="h-5 w-5" />
                  </button>
                  <button onClick={() => setIsEditingName(false)} className="rounded-xl bg-rose-500/20 p-2 text-rose-200 transition hover:bg-rose-500/30">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black text-white">{progress.username}</h2>
                  <button onClick={() => setIsEditingName(true)} className="text-slate-300 transition hover:text-white">
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>
              )}
              <p className="mt-2 text-sm text-slate-200">Your Tactical Path profile is a lightweight player card: choose a name, track your sharpness, and jump back into a board.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
                  <Star className="h-3.5 w-3.5 text-amber-300" /> Level {level}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
                  <Flame className="h-3.5 w-3.5 text-orange-300" /> {progress.streak} day streak
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
                  <Trophy className="h-3.5 w-3.5 text-blue-200" /> {progress.totalPuzzlesSolved} reps solved
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-600">Next action</p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">Keep your session alive</h2>
          <div className="mt-5 rounded-[1.75rem] bg-slate-50 p-5">
            <div className="flex items-start gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl text-white ${featuredGame.accentClass}`}>{featuredGame.icon}</div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Recommended board</p>
                <h3 className="mt-1 text-xl font-black text-slate-900">{featuredGame.name}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{featuredGame.coachFocus}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to={featuredGame.path} className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800">
                <Play className="h-4 w-4" /> Play now
              </Link>
              <Link to="/multiplayer" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">
                <Zap className="h-4 w-4" /> Friend play options
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-[1.5rem] bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-black text-blue-600">{progress.totalPuzzlesSolved}</p>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Puzzles solved</p>
        </div>
        <div className="rounded-[1.5rem] bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-black text-emerald-600">{progress.streak}</p>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Day streak</p>
        </div>
        <div className="rounded-[1.5rem] bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-black capitalize text-amber-600">{progress.difficulty}</p>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Difficulty</p>
        </div>
        <div className="rounded-[1.5rem] bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-black text-violet-600">{level}</p>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Overall level</p>
        </div>
      </section>

      <section className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900">Theme mastery</h3>
          <Link to="/puzzle-bank" className="text-sm font-bold text-blue-600">Open training</Link>
        </div>
        <div className="space-y-3">
          {puzzleThemes.map((theme) => {
            const themeData = progress.themes[theme.id];
            const themeLevel = getThemeLevel(theme.id);

            return (
              <Link
                key={theme.id}
                to="/puzzle-bank"
                className="flex items-center gap-4 rounded-[1.5rem] bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="text-2xl">{theme.icon}</div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="font-semibold text-slate-900">{theme.name}</span>
                    <span className="text-sm font-bold text-slate-600">Level {themeLevel}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${getMasteryColor(themeLevel)}`}
                        style={{ width: `${themeLevel * 20}%` }}
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

      <section className="mb-6 grid gap-4 lg:grid-cols-[1fr,auto]">
        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <h3 className="text-xl font-black text-slate-900">Session controls</h3>
          <p className="mt-2 text-sm leading-7 text-slate-600">Tune the challenge level for your next loop. The right pressure should help you rematch, not bounce you out.</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            {(["beginner", "intermediate", "advanced"] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficulty(diff)}
                className={`flex-1 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                  progress.difficulty === diff
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={resetProgress}
          className="rounded-[2rem] border border-rose-200 bg-rose-50 px-6 py-6 text-left text-rose-700 transition hover:bg-rose-100"
        >
          <p className="text-xs font-black uppercase tracking-[0.18em]">Reset</p>
          <p className="mt-2 text-lg font-black">Clear local progress</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-rose-600">Useful for demo resets or a fresh practice loop on this device.</p>
        </button>
      </section>
    </div>
  );
}
