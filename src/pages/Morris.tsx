import { useEffect, useState } from "react";
import { useGame } from "../context/GameContext";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Brain } from "lucide-react";
import { cn } from "../lib/utils";

// Positions for a Nine Men's Morris board
const positions = [
  { x: 10, y: 10 }, { x: 50, y: 10 }, { x: 90, y: 10 },
  { x: 23, y: 23 }, { x: 50, y: 23 }, { x: 77, y: 23 },
  { x: 37, y: 37 }, { x: 50, y: 37 }, { x: 63, y: 37 },
  { x: 10, y: 50 }, { x: 23, y: 50 }, { x: 37, y: 50 },
  { x: 63, y: 50 }, { x: 77, y: 50 }, { x: 90, y: 50 },
  { x: 37, y: 63 }, { x: 50, y: 63 }, { x: 63, y: 63 },
  { x: 23, y: 77 }, { x: 50, y: 77 }, { x: 77, y: 77 },
  { x: 10, y: 90 }, { x: 50, y: 90 }, { x: 90, y: 90 },
];

const lines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Top rows
  [21, 22, 23], [18, 19, 20], [15, 16, 17], // Bottom rows
  [0, 9, 21], [3, 10, 18], [6, 11, 15], // Left cols
  [2, 14, 23], [5, 13, 20], [8, 12, 17], // Right cols
  [1, 4, 7], [16, 19, 22], [9, 10, 11], [12, 13, 14] // Middle lines
];

export function Morris() {
  const { gameState, startNewGame, updateGameState } = useGame();
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    startNewGame("morris", "play");
  }, [startNewGame]);

  if (!gameState || gameState.type !== "morris") return null;

  const board = gameState.data.board;

  const handlePointClick = (i: number) => {
    if (gameState.data.stage === "placement") {
      if (board[i] === null && gameState.data.piecesPlaced[gameState.turn] < 9) {
        const newBoard = [...board];
        newBoard[i] = gameState.turn;
        const newPlaced = { ...gameState.data.piecesPlaced };
        newPlaced[gameState.turn]++;

        const nextStage = newPlaced["1"] === 9 && newPlaced["2"] === 9 ? "moving" : "placement";

        updateGameState({
          data: { ...gameState.data, board: newBoard, piecesPlaced: newPlaced, stage: nextStage },
          turn: gameState.turn === "1" ? "2" : "1",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="max-w-md mx-auto flex items-center justify-between mb-8">
        <Link to="/" className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Morris / Mlabalaba</h1>
        <button
          onClick={() => startNewGame("morris", "play")}
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </header>

      <main className="max-w-md mx-auto">
        <div className="bg-blue-600 rounded-2xl p-6 text-white mb-8 shadow-lg shadow-blue-200 flex items-start gap-4">
          <Brain className="w-6 h-6" />
          <div>
            <p className="text-blue-100 text-xs font-bold uppercase tracking-wider">AI Coach</p>
            <p className="font-medium">Focus on forming 'mills' (three in a row) to capture pieces!</p>
          </div>
        </div>

        <div className="relative aspect-square bg-amber-50 rounded-3xl border-4 border-amber-200 shadow-xl p-4 overflow-hidden">
          {/* Board Lines */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full stroke-amber-800 stroke-[0.5] fill-none opacity-30">
            <rect x="10" y="10" width="80" height="80" />
            <rect x="23" y="23" width="54" height="54" />
            <rect x="37" y="37" width="26" height="26" />
            <line x1="50" y1="10" x2="50" y2="37" />
            <line x1="50" y1="63" x2="50" y2="90" />
            <line x1="10" y1="50" x2="37" y2="50" />
            <line x1="63" y1="50" x2="90" y2="50" />
          </svg>

          {/* Points */}
          {positions.map((pos, i) => (
            <button
              key={i}
              onClick={() => handlePointClick(i)}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className={cn(
                "absolute w-6 h-6 -ml-3 -mt-3 rounded-full z-10 transition-transform active:scale-90",
                board[i] === null ? "bg-amber-200 hover:bg-amber-300 shadow-inner" : (
                  board[i] === "1" ? "bg-slate-900 border-2 border-slate-700 shadow-lg" : "bg-white border-2 border-slate-300 shadow-lg"
                )
              )}
            />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
           <div className="card p-4 text-center">
             <p className="text-xs text-slate-500 uppercase font-bold">Player 1</p>
             <p className="text-2xl font-bold">{9 - gameState.data.piecesPlaced["1"]} left</p>
           </div>
           <div className="card p-4 text-center">
             <p className="text-xs text-slate-500 uppercase font-bold">Player 2</p>
             <p className="text-2xl font-bold">{9 - gameState.data.piecesPlaced["2"]} left</p>
           </div>
        </div>
      </main>
    </div>
  );
}
