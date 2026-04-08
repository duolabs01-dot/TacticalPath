import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

// Simple puzzle: Mate in 1
const PUZZLE_FEN = "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4";
const SOLUTION_MOVE = "h5f7"; // Qxf7#

export function PuzzlePlay() {
  const [game, setGame] = useState(new Chess(PUZZLE_FEN));
  const [status, setStatus] = useState<"playing" | "correct" | "incorrect">("playing");

  function makeAMove(move: { from: string; to: string; promotion?: string }) {
    if (status !== "playing") return false;

    const gameCopy = new Chess(game.fen());
    try {
      const result = gameCopy.move(move);
      
      if (result) {
        setGame(gameCopy);
        
        // Check if it's the correct move
        const moveString = move.from + move.to;
        if (moveString === SOLUTION_MOVE || moveString + (move.promotion || "") === SOLUTION_MOVE) {
          setStatus("correct");
        } else {
          setStatus("incorrect");
        }
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }

  function onDrop({ sourceSquare, targetSquare }: { sourceSquare: string, targetSquare: string | null }) {
    if (!targetSquare) return false;
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to queen for simplicity
    });
    return move;
  }

  function resetPuzzle() {
    setGame(new Chess(PUZZLE_FEN));
    setStatus("playing");
  }

  return (
    <div className="flex-1 flex flex-col h-screen bg-slate-50 dark:bg-[#0b111a] text-slate-900 dark:text-slate-100 pb-16 transition-colors duration-200">
      <header className="flex items-center p-4 border-b border-slate-200 dark:border-slate-800/50 backdrop-blur-md bg-white/75 dark:bg-[#0b111a]/75 shrink-0 transition-colors duration-200">
        <Link
          to="/puzzle-bank"
          className="text-slate-900 dark:text-slate-100 p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div className="flex-1 ml-2">
          <h1 className="text-sm font-bold leading-tight tracking-tight">
            Daily Challenge
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Find the best move for White</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-md aspect-square bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xl relative overflow-hidden mb-8 transition-colors duration-200">
          <Chessboard 
            options={{
              position: game.fen(),
              onPieceDrop: onDrop,
              boardOrientation: "white",
              darkSquareStyle: { backgroundColor: '#739552' },
              lightSquareStyle: { backgroundColor: '#ebecd0' },
              animationDurationInMs: 200
            }}
          />
        </div>

        <div className="w-full max-w-md">
          {status === "playing" && (
            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl p-4 text-center transition-colors duration-200">
              <p className="text-blue-700 dark:text-blue-100 font-medium transition-colors duration-200">White to move and win.</p>
            </div>
          )}

          {status === "correct" && (
            <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl p-6 text-center shadow-lg shadow-emerald-500/10 animate-in fade-in slide-in-from-bottom-4 transition-colors duration-200">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-500 transition-colors duration-200" />
              </div>
              <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2 transition-colors duration-200">Excellent!</h2>
              <p className="text-emerald-700 dark:text-emerald-100/80 mb-6 transition-colors duration-200">You found the winning move.</p>
              <Link to="/puzzle-bank" className="inline-flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                Next Puzzle
              </Link>
            </div>
          )}

          {status === "incorrect" && (
            <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-xl p-6 text-center shadow-lg shadow-rose-500/10 animate-in fade-in slide-in-from-bottom-4 transition-colors duration-200">
              <div className="w-16 h-16 bg-rose-100 dark:bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200">
                <XCircle className="h-8 w-8 text-rose-600 dark:text-rose-500 transition-colors duration-200" />
              </div>
              <h2 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mb-2 transition-colors duration-200">Not quite</h2>
              <p className="text-rose-700 dark:text-rose-100/80 mb-6 transition-colors duration-200">That move doesn't solve the puzzle.</p>
              <button onClick={resetPuzzle} className="inline-flex items-center justify-center w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold py-3 px-4 rounded-xl transition-colors gap-2 border border-slate-200 dark:border-slate-700">
                <RefreshCw className="h-5 w-5" />
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
