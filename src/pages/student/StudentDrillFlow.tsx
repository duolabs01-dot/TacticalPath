import { useState, useCallback, type ComponentProps } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

// 3 hardcoded puzzles for the "Hanging Pieces" drill set
const DRILL_PUZZLES = [
  {
    id: 'drill-1',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 2 3',
    solution: 'h5e5', // not a real solution - for prototype flow
    theme: 'hanging',
    description: 'Find the hanging piece and capture it!',
    hint: 'Look for a piece that isn\'t protected.',
  },
  {
    id: 'drill-2',
    fen: 'r2qk2r/ppp2ppp/2n1bn2/3pp3/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 5',
    solution: 'd4c5',
    theme: 'hanging',
    description: 'Your opponent left a piece hanging. Take it!',
    hint: 'Which piece has no defenders?',
  },
  {
    id: 'drill-3',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    solution: 'c4f7',
    theme: 'hanging',
    description: 'One last chance — spot the undefended piece!',
    hint: 'Check the center of the board.',
  },
];

export function StudentDrillFlow() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [game, setGame] = useState(new Chess(DRILL_PUZZLES[0].fen));
  const [puzzleState, setPuzzleState] = useState<'solving' | 'correct' | 'wrong'>('solving');
  const [completedPuzzles, setCompletedPuzzles] = useState<number[]>([]);

  const currentPuzzle = DRILL_PUZZLES[currentPuzzleIndex];
  const totalPuzzles = DRILL_PUZZLES.length;
  const completedCount = completedPuzzles.length;
  const boardOptions: ComponentProps<typeof Chessboard>['options'] = {
    position: game.fen(),
    onPieceDrop: ({ sourceSquare, targetSquare }) => onDrop(sourceSquare, targetSquare ?? ''),
    boardOrientation: 'white',
    boardStyle: { borderRadius: '0' },
    darkSquareStyle: { backgroundColor: '#b7d7e8' },
    lightSquareStyle: { backgroundColor: '#eaf4f9' },
  };

  const onDrop = useCallback((sourceSquare: string, targetSquare: string) => {
    if (puzzleState !== 'solving') return false;

    const gameCopy = new Chess(game.fen());
    const moveResult = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (moveResult === null) return false;

    setGame(gameCopy);

    // For prototype: first move is always "correct"
    setPuzzleState('correct');
    setCompletedPuzzles(prev => [...prev, currentPuzzleIndex]);

    return true;
  }, [game, puzzleState, currentPuzzleIndex]);

  const handleNext = () => {
    if (currentPuzzleIndex < totalPuzzles - 1) {
      const nextIndex = currentPuzzleIndex + 1;
      setCurrentPuzzleIndex(nextIndex);
      setGame(new Chess(DRILL_PUZZLES[nextIndex].fen));
      setPuzzleState('solving');
    } else {
      navigate(`/c/${slug}/summary`);
    }
  };

  const handleRetry = () => {
    setGame(new Chess(currentPuzzle.fen));
    setPuzzleState('solving');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Progress header */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 py-3">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-800">
              ⚠️ Hanging Pieces
            </span>
            <span className="text-sm font-semibold text-sky-600">
              {completedCount} / {totalPuzzles}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-sky-400 to-sky-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / totalPuzzles) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Puzzle description */}
      <div className="px-4 py-3">
        <div className="max-w-lg mx-auto">
          <p className="text-sm font-medium text-slate-600">
            Puzzle {currentPuzzleIndex + 1}: {currentPuzzle.description}
          </p>
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-[360px]">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Chessboard options={boardOptions} />
          </div>
        </div>
      </div>

      {/* Feedback area */}
      <div className="px-4 py-4">
        <div className="max-w-lg mx-auto">
          {puzzleState === 'solving' && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <p className="text-sm text-slate-500">
                💡 <span className="font-medium">Hint:</span> {currentPuzzle.hint}
              </p>
            </div>
          )}

          {puzzleState === 'correct' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="font-bold text-emerald-700">Nice! You got it!</span>
              </div>
              <p className="text-sm text-emerald-600">
                +15 XP in Hanging Pieces
              </p>
            </div>
          )}

          {puzzleState === 'correct' && (
            <button
              onClick={handleNext}
              className="w-full mt-3 h-12 bg-sky-500 text-white rounded-2xl font-semibold hover:bg-sky-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25"
            >
              {currentPuzzleIndex < totalPuzzles - 1 ? (
                <>Next Puzzle <ArrowRight className="w-4 h-4" /></>
              ) : (
                <>See your progress <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}