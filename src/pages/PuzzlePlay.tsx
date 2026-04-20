import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, RefreshCw, ChevronRight } from "lucide-react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Puzzle, PuzzleTheme, puzzles, getRandomPuzzle } from "../data/puzzles";
import { useProgress } from "../hooks/useProgress";
import { getChessboardSquare } from "../lib/chessboard-events";

export function PuzzlePlay() {
  const [game, setGame] = useState<Chess | null>(null);
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [status, setStatus] = useState<"loading" | "playing" | "correct" | "incorrect">("loading");
  const [moveIndex, setMoveIndex] = useState(0);
  const [moveFrom, setMoveFrom] = useState<string | null>(null);
  const { recordAttempt, progress } = useProgress();

  const loadPuzzle = (theme?: PuzzleTheme) => {
    const newPuzzle = getRandomPuzzle(theme);
    setPuzzle(newPuzzle);
    setGame(new Chess(newPuzzle.fen));
    setStatus("playing");
    setMoveIndex(0);
  };

  useEffect(() => {
    loadPuzzle();
  }, []);

  function makeAMove(move: { from: string; to: string; promotion?: string }) {
    if (status !== "playing" || !game || !puzzle) return false;

    const gameCopy = new Chess(game.fen());
    try {
      const result = gameCopy.move(move);
      if (result) {
        setGame(gameCopy);
        
        const moveString = move.from + move.to;
        const isCorrect = puzzle.solution.some(s => 
          s === moveString || s === moveString.replace('x', '')
        );

        setMoveIndex(prev => prev + 1);

        if (isCorrect) {
          setStatus("correct");
          recordAttempt(puzzle.theme, true);
        } else if (moveIndex >= puzzle.solution.length - 1) {
          setStatus("incorrect");
          recordAttempt(puzzle.theme, false);
        } else {
          setMoveIndex(prev => prev + 1);
        }
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }

  // Click-to-select handler (mobile-friendly alternative to drag & drop)
  const handleSquareClick = (input: { square: string } | string) => {
    const square = getChessboardSquare(input);
    if (!square) return;
    if (status !== "playing" || !game) return;

    if (!moveFrom) {
      const piece = game.get(square as any);
      if (piece && piece.color === game.turn()) {
        setMoveFrom(square);
      }
      return;
    }

    if (moveFrom === square) {
      setMoveFrom(null);
      return;
    }

    const result = makeAMove({ from: moveFrom, to: square, promotion: "q" });
    setMoveFrom(null);
  };

  const nextPuzzle = () => loadPuzzle();
  const tryAgain = () => {
    if (puzzle) {
      setGame(new Chess(puzzle.fen));
      setStatus("playing");
      setMoveIndex(0);
    }
  };

  if (status === "loading" || !game || !puzzle) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading puzzle...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="px-4 py-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link to="/puzzle-bank" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div className="flex-1">
            <h1 className="font-bold text-slate-900">{puzzle.theme.charAt(0).toUpperCase() + puzzle.theme.slice(1)}</h1>
            <p className="text-xs text-slate-500">{puzzle.difficulty} • {progress.totalPuzzlesSolved} solved</p>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="px-4 py-2 bg-white border-b border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span>Move {moveIndex + 1} of {puzzle.solution.length}</span>
          <span>{puzzle.solution.length === 1 ? 'Find the winning move!' : `${puzzle.solution.length - moveIndex} moves to go`}</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${((moveIndex + 1) / puzzle.solution.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Board */}
      <div className="p-4 flex justify-center">
        <div className="w-full max-w-sm aspect-square">
          <Chessboard 
            options={{
              position: game.fen(),
              allowDragging: false,
              onSquareClick: handleSquareClick,
              boardOrientation: "white",
              darkSquareStyle: { backgroundColor: '#739552' },
              lightSquareStyle: { backgroundColor: '#ebecd0' },
              animationDurationInMs: 200,
              squareStyles: moveFrom ? { [moveFrom]: { backgroundColor: "rgba(255, 255, 0, 0.4)" } } : {},
            }}
          />
        </div>
      </div>

      {/* Puzzle hint */}
      <div className="px-4 pb-24">
        {status === "playing" && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <p className="font-medium text-blue-700">{puzzle.description}</p>
            <p className="text-sm text-blue-600 mt-1">Theme: {puzzle.theme}</p>
          </div>
        )}

        {status === "correct" && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-emerald-700">Excellent!</h2>
            <p className="text-emerald-600 text-sm mt-1">You solved the puzzle!</p>
            
            <div className="mt-4 flex gap-2">
              <button 
                onClick={tryAgain}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>
              <Link 
                to="/puzzle-bank" 
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white font-semibold rounded-xl"
              >
                Next Puzzle
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}

        {status === "incorrect" && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 text-center">
            <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <XCircle className="w-7 h-7 text-rose-600" />
            </div>
            <h2 className="text-xl font-bold text-rose-700">Not quite</h2>
            <p className="text-rose-600 text-sm mt-1">Keep trying!</p>
            
            <button 
              onClick={tryAgain}
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
