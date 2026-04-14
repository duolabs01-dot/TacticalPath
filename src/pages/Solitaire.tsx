import { useEffect } from "react";
import { useGame } from "../context/GameContext";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Brain, Clock } from "lucide-react";

export function Solitaire() {
  const { gameState, startNewGame } = useGame();

  useEffect(() => {
    startNewGame("solitaire", "play");
  }, [startNewGame]);

  return (
    <div className="min-h-screen bg-emerald-800 p-4 md:p-8">
      <header className="max-w-4xl mx-auto flex items-center justify-between mb-8 text-white">
        <Link to="/" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Solitaire</h1>
        <button
          onClick={() => startNewGame("solitaire", "play")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white mb-8 border border-white/20 flex items-start gap-4">
          <Brain className="w-6 h-6 text-emerald-300" />
          <div>
            <p className="text-emerald-200 text-xs font-bold uppercase tracking-wider">AI Coach</p>
            <p className="font-medium">Look for opportunities to move cards to the foundation piles!</p>
          </div>
        </div>

        {/* Placeholder for Solitaire Board */}
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/20 rounded-3xl text-white/50 bg-white/5">
           <Clock className="w-16 h-16 mb-4 opacity-20" />
           <p className="text-xl font-bold">Solitaire is coming soon</p>
           <p className="max-w-xs text-center mt-2">We're shuffling the deck and preparing the AI coach for this classic card game.</p>
        </div>
      </main>
    </div>
  );
}
