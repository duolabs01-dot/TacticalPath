import { Link } from "react-router-dom";
import { Sword, Brain, Play, Users, Layout } from "lucide-react";

const games = [
  {
    id: "chess",
    name: "Chess",
    description: "The classic game of kings. Master strategy and tactics with AI-powered analysis.",
    icon: "♞",
    path: "/chess",
    color: "bg-blue-600",
  },
  {
    id: "checkers",
    name: "Checkers",
    description: "Simple rules, deep strategy. Leap to victory and crown your pieces.",
    icon: "●",
    path: "/checkers",
    color: "bg-red-600",
  },
  {
    id: "morris",
    name: "Morris / Mlabalaba",
    description: "Ancient strategy game of alignment and capture. Build mills to win.",
    icon: "◎",
    path: "/morris",
    color: "bg-emerald-600",
  },
  {
    id: "tictactoe",
    name: "Tic Tac Toe",
    description: "The ultimate game of logic. Outsmart our AI in this perfect-information classic.",
    icon: "✕",
    path: "/tictactoe",
    color: "bg-amber-600",
  },
  {
    id: "solitaire",
    name: "Solitaire",
    description: "Classic single-player card game. Test your patience and organizational skills.",
    icon: "🂠",
    path: "/solitaire",
    color: "bg-purple-600",
  },
];

export function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl text-white text-3xl mb-6 shadow-xl shadow-blue-200">
            ♞
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-6xl mb-4">
            Tactical Path
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Become a better thinker. Play world-class strategy games against smart AI and improve with real-time coaching.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
             <Link to="/signup" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all">
                Get Started
             </Link>
             <Link to="/login" className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all">
                Sign In
             </Link>
          </div>
        </div>
      </header>

      {/* Games Library */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Games Library</h2>
            <p className="text-slate-500 mt-1">Select a game to start playing vs Computer</p>
          </div>
          <div className="hidden sm:flex gap-3">
             <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-semibold">
               <Brain className="w-4 h-4" /> AI Coaching
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold">
               <Users className="w-4 h-4" /> Multiplayer
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <div key={game.id} className="group relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className={`w-16 h-16 ${game.color} rounded-2xl flex items-center justify-center text-white text-3xl mb-6 shadow-lg shadow-${game.id}-100`}>
                {game.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{game.name}</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {game.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <Link
                  to={game.path}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Play
                </Link>
                <div className="flex gap-2">
                   <button className="p-3 bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-200 transition-colors" title="Invite Friend">
                     <Users className="w-4 h-4" />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-16 border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className="col-span-1">
             <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
               <span className="font-bold text-xl text-slate-900">TacticalPath</span>
             </div>
             <p className="text-slate-500 text-sm leading-relaxed">
               The ultimate strategy playground. Built for thinkers, players, and lifelong learners.
             </p>
           </div>
           <div>
             <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
             <ul className="space-y-2 text-sm text-slate-500">
               <li><Link to="/dashboard" className="hover:text-blue-600">Home Dashboard</Link></li>
               <li><Link to="/skill-insights" className="hover:text-blue-600">Progress Tracking</Link></li>
               <li><Link to="/puzzle-bank" className="hover:text-blue-600">Training Library</Link></li>
             </ul>
           </div>
           <div>
             <h4 className="font-bold text-slate-900 mb-4">Support</h4>
             <ul className="space-y-2 text-sm text-slate-500">
               <li><Link to="/settings" className="hover:text-blue-600">Account Settings</Link></li>
               <li><Link to="/coach/login" className="hover:text-blue-600">Coach Dashboard</Link></li>
               <li><Link to="/about" className="hover:text-blue-600">Our Mission</Link></li>
             </ul>
           </div>
        </div>
        <div className="mt-16 text-center text-slate-400 text-xs">
          © 2026 TacticalPath. Elevate your game with AI strategy.
        </div>
      </footer>
    </div>
  );
}
