import { useNavigate, useParams } from 'react-router-dom';
import { useClassroom, MOCK_THEMES } from '../../context/ClassroomContext';
import { Clock, Zap, Bot } from 'lucide-react';

export function StudentWaitingRoom() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { classroom, currentStudent } = useClassroom();

  if (!currentStudent) return null;

  const totalXP = (Object.values(currentStudent.mastery) as Array<{ level: number; xp: number }>).reduce((sum, m) => sum + m.xp, 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-slate-200 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{currentStudent.avatarEmoji}</span>
            <div>
              <p className="text-sm font-semibold text-slate-800">{currentStudent.displayName}</p>
              <p className="text-xs text-slate-500">{classroom.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">Waiting for coach</span>
          </div>
        </div>
      </header>

      {/* Pulsing waiting banner */}
      <div className="bg-sky-50 border-b border-sky-100 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-sky-600 pulse-soft" />
          </div>
          <div>
            <p className="text-sm font-semibold text-sky-900">Waiting for your coach to start</p>
            <p className="text-xs text-sky-600">You'll be paired with a classmate soon!</p>
          </div>
        </div>
      </div>

      {/* Mastery Map */}
      <div className="flex-1 px-4 py-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800">Your Skills</h2>
            <span className="text-sm font-semibold text-sky-600">{totalXP} XP total</span>
          </div>

          <div className="space-y-3">
            {MOCK_THEMES.map((theme) => {
              const mastery = currentStudent.mastery[theme.id];
              const xpForNextLevel = mastery.level * 50;
              const progress = Math.min((mastery.xp / xpForNextLevel) * 100, 100);
              return (
                <div key={theme.id} className="bg-white rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{theme.emoji}</span>
                      <span className="font-semibold text-slate-800 text-sm">{theme.name}</span>
                    </div>
                    <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                      Level {mastery.level}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-sky-400 to-sky-500 h-2 rounded-full transition-all duration-500"
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

      {/* Bottom action */}
      <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4">
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate(`/c/${slug}/game/demo-game`)}
            className="w-full h-12 bg-white border-2 border-slate-200 rounded-2xl text-slate-600 font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-[0.98] transition-all"
          >
            <Bot className="w-4 h-4" />
            Play a bot while you wait
          </button>
        </div>
      </div>
    </div>
  );
}