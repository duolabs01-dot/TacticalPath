import { Link } from "react-router-dom";
import { ArrowLeft, Settings, Star, Trophy } from "lucide-react";

export function Profile() {
  return (
    <div className="px-4 py-6">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Profile</p>
            <h1 className="text-xl font-bold text-slate-900">My Account</h1>
          </div>
          <Link to="/settings" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
            <Settings className="w-5 h-5 text-slate-600" />
          </Link>
        </div>
      </header>

      {/* Profile Card */}
      <div className="card p-6 mb-6 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4">
          CM
        </div>
        <h2 className="text-xl font-bold text-slate-900">Chloe M.</h2>
        <p className="text-sm text-slate-500 mt-1">Room 3A • Tuesday Club</p>
        <div className="inline-flex items-center gap-2 mt-3 bg-emerald-100 px-3 py-1 rounded-full">
          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
          <span className="text-xs font-semibold text-emerald-700">Active Student</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">Level 3</p>
          <p className="text-xs text-slate-500 mt-1">Avg Level</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">5</p>
          <p className="text-xs text-slate-500 mt-1">Themes</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">12</p>
          <p className="text-xs text-slate-500 mt-1">Sessions</p>
        </div>
      </div>

      {/* Achievements */}
      <section className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Achievements</h3>
        <div className="space-y-3">
          <div className="card p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">First Puzzle</h4>
              <p className="text-sm text-slate-500">Complete your first puzzle</p>
            </div>
          </div>
          <div className="card p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Quick Learner</h4>
              <p className="text-sm text-slate-500">Complete 10 puzzles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Links */}
      <div className="space-y-3">
        <Link to="/study-plan" className="card p-4 flex items-center justify-between">
          <span className="font-semibold text-slate-900">My Plan</span>
          <ArrowLeft className="w-5 h-5 text-slate-400 rotate-180" />
        </Link>
        <Link to="/settings" className="card p-4 flex items-center justify-between">
          <span className="font-semibold text-slate-900">Settings</span>
          <ArrowLeft className="w-5 h-5 text-slate-400 rotate-180" />
        </Link>
      </div>
    </div>
  );
}