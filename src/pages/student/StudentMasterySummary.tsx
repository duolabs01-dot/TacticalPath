import { useNavigate, useParams } from 'react-router-dom';
import { useClassroom, MOCK_THEMES } from '../../context/ClassroomContext';
import { Trophy, ArrowRight, Home } from 'lucide-react';

export function StudentMasterySummary() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { currentStudent } = useClassroom();

  if (!currentStudent) return null;

  // Simulate XP gained from the drill
  const xpGained = 15; // from 1 puzzle correct
  const updatedMastery = { ...currentStudent.mastery };
  updatedMastery.hanging = {
    ...updatedMastery.hanging,
    xp: updatedMastery.hanging.xp + xpGained,
    level: Math.floor((updatedMastery.hanging.xp + xpGained) / 50) + 1,
  };

  const totalXP = Object.values(updatedMastery).reduce((sum, m) => sum + m.xp, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      {/* Celebration header */}
      <div className="px-4 pt-8 pb-6 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-4">
          <Trophy className="w-10 h-10 text-amber-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 font-display">Great work!</h1>
        <p className="text-slate-500 mt-1">You earned {xpGained} XP in Hanging Pieces</p>
      </div>

      {/* Updated mastery */}
      <div className="flex-1 px-4 pb-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800">Your Skills</h2>
            <span className="text-sm font-semibold text-sky-600">{totalXP} XP total</span>
          </div>

          <div className="space-y-3">
            {MOCK_THEMES.map((theme) => {
              const mastery = updatedMastery[theme.id];
              const xpForNextLevel = mastery.level * 50;
              const progress = Math.min((mastery.xp / xpForNextLevel) * 100, 100);
              const isUpdated = theme.id === 'hanging';
              return (
                <div key={theme.id} className={`bg-white rounded-2xl border p-4 transition-all ${isUpdated ? 'border-amber-300 shadow-md' : 'border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{theme.emoji}</span>
                      <span className="font-semibold text-slate-800 text-sm">{theme.name}</span>
                      {isUpdated && (
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                          +{xpGained} XP
                        </span>
                      )}
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isUpdated ? 'text-amber-600 bg-amber-50' : 'text-sky-600 bg-sky-50'}`}>
                      Level {mastery.level}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${isUpdated ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-gradient-to-r from-sky-400 to-sky-500'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{mastery.xp} / {xpForNextLevel} XP to Level {mastery.level + 1}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4">
        <div className="max-w-lg mx-auto space-y-3">
          <button
            onClick={() => navigate(`/c/${slug}/game/demo-game-2`)}
            className="w-full h-14 bg-sky-500 text-white rounded-2xl text-lg font-bold hover:bg-sky-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25"
          >
            Play another game
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate(`/c/${slug}/waiting`)}
            className="w-full h-12 bg-white border-2 border-slate-200 rounded-2xl text-slate-600 font-semibold hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to waiting room
          </button>
        </div>
      </div>
    </div>
  );
}