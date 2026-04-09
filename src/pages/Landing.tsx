import { Link } from "react-router-dom";

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-sky-100">
      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white text-xl">♞</div>
            <span className="font-bold text-xl text-slate-900">TacticalPath</span>
          </div>
          <Link 
            to="/login" 
            className="text-sm font-semibold text-blue-600"
          >
            Log In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            For Chess Clubs & Schools
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Learn Chess the Right Way
          </h1>
          <p className="text-slate-600 text-base">
            Practice puzzles, learn from your games, and grow your skills with your coach.
          </p>
        </div>

        {/* App Screenshot Mock */}
        <div className="max-w-sm mx-auto mb-8">
          <div className="bg-white rounded-3xl shadow-xl p-4 border-8 border-slate-100">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center">
              <p className="text-sm text-blue-100">Welcome back</p>
              <p className="text-2xl font-bold mt-1">Chloe M.</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="bg-white/20 rounded-lg p-2">
                  <p className="font-bold text-xl">Level 3</p>
                  <p className="text-xs text-blue-100">Average</p>
                </div>
                <div className="bg-white/20 rounded-lg p-2">
                  <p className="font-bold text-xl">86%</p>
                  <p className="text-xs text-blue-100">Best Theme</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="max-w-sm mx-auto space-y-3">
          <Link 
            to="/signup" 
            className="block w-full py-4 bg-blue-600 text-white font-semibold text-center rounded-xl shadow-lg shadow-blue-500/30"
          >
            Get Started Free
          </Link>
          <Link 
            to="/login" 
            className="block w-full py-4 bg-white text-slate-700 font-semibold text-center rounded-xl border border-slate-200"
          >
            I already have an account
          </Link>
        </div>

        {/* Features */}
        <div className="max-w-sm mx-auto mt-10 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🎯</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Tactical Puzzles</h3>
              <p className="text-sm text-slate-500">Practice the themes that matter for your game.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-xl">📊</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Track Your Growth</h3>
              <p className="text-sm text-slate-500">See your progress with level-based mastery.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🏫</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">For Classrooms</h3>
              <p className="text-sm text-slate-500">Built for school chess clubs and coaching programs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 text-center text-sm text-slate-500">
        <p>© 2026 TacticalPath</p>
        <p className="mt-2">Built for scholastic chess programs</p>
      </footer>
    </div>
  );
}