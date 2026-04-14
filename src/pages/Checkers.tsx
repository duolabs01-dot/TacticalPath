import { useEffect, useState } from "react";
import { useGame } from "../context/GameContext";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Brain } from "lucide-react";
import { cn } from "../lib/utils";

export function Checkers() {
  const { gameState, startNewGame, updateGameState } = useGame();
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    startNewGame("checkers", "play");
  }, [startNewGame]);

  if (!gameState || gameState.type !== "checkers") return null;

  const board = gameState.data.board;

  const handleCellClick = (i: number) => {
    // Very basic checkers logic (to be expanded)
    if (selected === null) {
      if (board[i] !== 0) setSelected(i);
    } else {
      if (board[i] === 0) {
        const newBoard = [...board];
        newBoard[i] = board[selected];
        newBoard[selected] = 0;
        updateGameState({
          data: { board: newBoard },
          turn: gameState.turn === "1" ? "2" : "1",
        });
      }
      setSelected(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="max-w-md mx-auto flex items-center justify-between mb-8">
        <Link to="/" className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Checkers</h1>
        <button
          onClick={() => startNewGame("checkers", "play")}
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
            <p className="font-medium">Think about controlling the center squares!</p>
          </div>
        </div>

        <div className="grid grid-cols-8 aspect-square bg-slate-200 p-2 rounded-xl shadow-inner border-4 border-slate-300">
          {board.map((cell: number, i: number) => {
            const row = Math.floor(i / 8);
            const col = i % 8;
            const isDark = (row + col) % 2 === 1;

            return (
              <button
                key={i}
                onClick={() => handleCellClick(i)}
                className={cn(
                  "flex items-center justify-center relative",
                  isDark ? "bg-slate-700" : "bg-slate-100",
                  selected === i && "ring-4 ring-blue-400 ring-inset"
                )}
              >
                {cell !== 0 && (
                  <div className={cn(
                    "w-3/4 h-3/4 rounded-full shadow-lg border-2",
                    cell === 1 ? "bg-red-500 border-red-400" : "bg-slate-900 border-slate-700"
                  )} />
                )}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
