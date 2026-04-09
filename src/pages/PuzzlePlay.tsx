import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

const PUZZLE_FEN = "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4";
const SOLUTION_MOVE = "h5f7";

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

  function onDrop({ sourceSquare, targetSquare }: { sourceSquare: string; targetSquare: string | null }) {
    if (!targetSquare) return false;
    return makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
  }

  function resetPuzzle() {
    setGame(new Chess(PUZZLE_FEN));
    setStatus("playing");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="px-4 py-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link to="/puzzle-bank" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="font-bold text-slate-900">Puzzle Challenge</h1>
            <p className="text-xs text-slate-500">Find the winning move</p>
          </div>
        </div>
      </header>

      {/* Board */}
      <div className="p-4 flex justify-center">
        <div className="w-full max-w-sm aspect-square">
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
      </div>

      {/* Instructions */}
      <div className="px-4 pb-24">
        {status === "playing" && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <p className="font-medium text-blue-700">White to move and checkmate!</p>
          </div>
        )}

        {status === "correct" && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-emerald-700">Excellent!</h2>
            <p className="text-emerald-600 text-sm mt-1">You found the winning move!</p>
            <Link 
              to="/puzzle-bank" 
              className="block w-full mt-4 py-3 bg-emerald-600 text-white font-semibold rounded-xl"
            >
              Next Puzzle
            </Link>
          </div>
        )}

        {status === "incorrect" && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 text-center">
            <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <XCircle className="w-7 h-7 text-rose-600" />
            </div>
            <h2 className="text-xl font-bold text-rose-700">Not quite</h2>
            <p className="text-rose-600 text-sm mt-1">Try to find the winning move!</p>
            <button 
              onClick={resetPuzzle}
              className="flex items-center justify-center gap-2 w-full mt-4 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}