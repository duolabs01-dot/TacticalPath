import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClassroom, MOCK_THEMES } from '../../context/ClassroomContext';
import { Users, Play, Square, ChevronRight, BarChart3, LogOut, Wifi, WifiOff, Bot } from 'lucide-react';

// Heatmap data (mock)
const HEATMAP_DATA = [
  { theme: 'hanging', name: 'Hanging Pieces', missRate: 72, emoji: '⚠️' },
  { theme: 'captures', name: 'Missed Captures', missRate: 45, emoji: '♟️' },
  { theme: 'checkmates', name: '1-Move Checkmates', missRate: 38, emoji: '♛' },
  { theme: 'forks', name: 'Basic Forks', missRate: 55, emoji: '♞' },
  { theme: 'pins', name: 'Basic Pins', missRate: 61, emoji: '♝' },
];

export function CoachClassroomDashboard() {
  const navigate = useNavigate();
  const { classroom } = useClassroom();
  const [sessionActive, setSessionActive] = useState(false);
  const [autoPairing, setAutoPairing] = useState(false);

  const onlineStudents = classroom.students; // mock: all online

  const handleStartSession = () => {
    setSessionActive(true);
    setAutoPairing(true);
  };

  const handleEndSession = () => {
    setSessionActive(false);
    setAutoPairing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">♞</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-800">{classroom.name}</h1>
              <p className="text-xs text-slate-500">{classroom.schoolName} · {classroom.coachName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/coach/login')}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Session controls */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {sessionActive ? (
                <span className="flex items-center gap-1.5 text-emerald-600 font-semibold text-sm">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                  Session Active
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-slate-500 text-sm">
                  <Square className="w-3.5 h-3.5" />
                  No active session
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Users className="w-4 h-4" />
              {onlineStudents.length} students
            </div>
          </div>

          <div className="flex gap-3">
            {!sessionActive ? (
              <button
                onClick={handleStartSession}
                className="flex-1 h-12 bg-sky-500 text-white rounded-xl font-semibold hover:bg-sky-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25"
              >
                <Play className="w-5 h-5" />
                Start Auto-Pair
              </button>
            ) : (
              <>
                <button
                  onClick={() => setAutoPairing(!autoPairing)}
                  className={`flex-1 h-12 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    autoPairing
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Bot className="w-5 h-5" />
                  {autoPairing ? 'Auto-Pairing On' : 'Auto-Pairing Off'}
                </button>
                <button
                  onClick={handleEndSession}
                  className="flex-1 h-12 bg-white border-2 border-rose-200 text-rose-600 rounded-xl font-semibold hover:bg-rose-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Square className="w-5 h-5" />
                  End Session
                </button>
              </>
            )}
          </div>
        </div>

        {/* Roster */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-800">Roster</h2>
            <span className="text-xs text-slate-500">{onlineStudents.length} online</span>
          </div>
          <div className="space-y-2">
            {onlineStudents.map((student) => {
              const topTheme = Object.entries(student.mastery).sort((a, b) => b[1].xp - a[1].xp)[0];
              const weakestTheme = Object.entries(student.mastery).sort((a, b) => a[1].xp - b[1].xp)[0];
              return (
                <div key={student.id} className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{student.avatarEmoji}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{student.displayName}</p>
                      <p className="text-xs text-slate-500">
                        Best: {MOCK_THEMES.find(t => t.id === topTheme[0])?.name} · Needs work: {MOCK_THEMES.find(t => t.id === weakestTheme[0])?.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                      <Wifi className="w-3 h-3" />
                      Online
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Blindspot Heatmap */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-rose-500" />
              <h2 className="text-base font-bold text-slate-800">Classroom Blindspots</h2>
            </div>
            <span className="text-xs text-slate-500">Last 7 days</span>
          </div>
          <div className="space-y-3">
            {HEATMAP_DATA.sort((a, b) => b.missRate - a.missRate).map((item) => (
              <div key={item.theme}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">
                    {item.emoji} {item.name}
                  </span>
                  <span className={`text-sm font-bold ${
                    item.missRate >= 60 ? 'text-rose-600' :
                    item.missRate >= 40 ? 'text-amber-600' :
                    'text-emerald-600'
                  }`}>
                    {item.missRate}% missed
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      item.missRate >= 60 ? 'bg-gradient-to-r from-rose-400 to-rose-500' :
                      item.missRate >= 40 ? 'bg-gradient-to-r from-amber-400 to-amber-500' :
                      'bg-gradient-to-r from-emerald-400 to-emerald-500'
                    }`}
                    style={{ width: `${item.missRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center">
              🔥 <strong className="text-rose-600">72% of your students missed Hanging Pieces</strong> this week. 
              Consider starting next session with a 5-minute whiteboard lesson on protecting your pieces.
            </p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-white border border-slate-200 rounded-xl p-4 text-left hover:bg-slate-50 transition-all">
            <p className="text-sm font-semibold text-slate-800">Print Login Cards</p>
            <p className="text-xs text-slate-500 mt-1">Generate 3-picture passwords for new students</p>
          </button>
          <button className="bg-white border border-slate-200 rounded-xl p-4 text-left hover:bg-slate-50 transition-all">
            <p className="text-sm font-semibold text-slate-800">Export Reports</p>
            <p className="text-xs text-slate-500 mt-1">Download weekly progress PDFs for parents</p>
          </button>
        </div>
      </div>
    </div>
  );
}