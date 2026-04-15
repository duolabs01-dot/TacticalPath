import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClassroom, MOCK_THEMES } from '../../context/ClassroomContext';
import { Users, Play, Square, ChevronRight, BarChart3, LogOut } from 'lucide-react';

export function CoachLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Prototype: accept any login
    navigate('/coach/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-100 mb-4">
            <span className="text-3xl">♞</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 font-display">TacticalPath</h1>
          <p className="text-slate-500 mt-1">Coach Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="coach@school.edu"
              className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full h-12 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-900 active:scale-[0.98] transition-all"
          >
            Sign in
          </button>
          <p className="text-xs text-center text-slate-400">
            Demo: any credentials work
          </p>
        </form>
      </div>
    </div>
  );
}