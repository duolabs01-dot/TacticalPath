import { Link } from "react-router-dom";
import { Sword, Brain, Layout, Play, Info } from "lucide-react";

const games = [
  {
    id: "chess",
    name: "Chess",
    description: "The classic game of kings. Master strategy and tactics.",
    icon: "♞",
    path: "/puzzle-play",
    color: "bg-blue-600",
  },
  {
    id: "morris",
    name: "Morris / Mlabalaba",
    description: "Ancient strategy game of alignment and capture.",
    icon: "◎",
    path: "/morris",
    color: "bg-emerald-600",
  },
  {
    id: "checkers",
    name: "Checkers",
    description: "Simple rules, deep strategy. Leap to victory.",
    icon: "●",
    path: "/checkers",
    color: "bg-red-600",
  },
  {
    id: "tictactoe",
    name: "Tic Tac Toe",
    description: "The ultimate game of perfect play and logic.",
    icon: "✕",
    path: "/tictactoe",
    color: "bg-amber-600",
  },
  {
    id: "solitaire",
    name: "Solitaire",
    description: "Classic single-player card game of patience.",
    icon: "🂠",
    path: "/solitaire",
    color: "bg-purple-600",
  },
];

export function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl text-white text-3xl mb-6 shadow-xl shadow-blue-200">
            ♞
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
            Tactical Path
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A multi-game strategy platform designed to help you become a better thinker and player through AI-powered coaching.
          </p>
        </div>
      </header>

      {/* Games Library */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Games Library</h2>
          <div className="flex gap-2">
             <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
               AI Coaching Enabled
             </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div key={game.id} className="group relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className={`w-14 h-14 ${game.color} rounded-2xl flex items-center justify-center text-white text-3xl mb-6 shadow-lg shadow-${game.id}-100`}>
                {game.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{game.name}</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {game.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <Link
                  to={game.path}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Play Now
                </Link>
                <div className="flex gap-2">
                  <span title="Multiplayer" className="p-2 bg-slate-100 rounded-lg text-slate-600">
                    <Sword className="w-4 h-4" />
                  </span>
                  <span title="AI Coach" className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Brain className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-slate-200 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center text-slate-500">♞</div>
          <span className="font-bold text-slate-900">TacticalPath</span>
        </div>
        <p className="text-slate-500 text-sm">
          Become a better strategist with AI-powered insights.
        </p>
        <div className="flex justify-center gap-6 mt-6">
          <Link to="/about" className="text-slate-400 hover:text-slate-600 text-sm">About</Link>
          <Link to="/coach/login" className="text-slate-400 hover:text-slate-600 text-sm">Coach Portal</Link>
          <Link to="/settings" className="text-slate-400 hover:text-slate-600 text-sm">Settings</Link>
        </div>
      </footer>
    </div>
  );
}
