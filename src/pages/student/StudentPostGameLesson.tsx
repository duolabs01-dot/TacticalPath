import { useState, type ComponentProps } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Chessboard } from 'react-chessboard';
import { ArrowRight, Lightbulb } from 'lucide-react';

// Hardcoded turning point for prototype
const TURNING_POINT = {
  // Position where white left a knight undefended on d4
  fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 2 3',
  mistakeMove: 'Nd4 was left undefended',
  theme: 'hanging',
  themeName: 'Hanging Pieces',
  themeEmoji: '⚠️',
  explanation: 'Your Knight on d4 was left undefended. Your opponent could capture it for free!',
  arrows: [
    { start: 'd4', end: 'd4', color: 'red' as const }, // highlight the hanging piece
  ],
};

export function StudentPostGameLesson() {
  const { slug, gameId } = useParams<{ slug: string; gameId: string }>();
  const navigate = useNavigate();
  const [showExplanation, setShowExplanation] = useState(false);
  const boardOptions: ComponentProps<typeof Chessboard>['options'] = {
    position: TURNING_POINT.fen,
    boardOrientation: 'white',
    allowDragging: false,
    boardStyle: {
      borderRadius: '0',
    },
    darkSquareStyle: { backgroundColor: '#b7d7e8' },
    lightSquareStyle: { backgroundColor: '#eaf4f9' },
    squareStyles: {
      d4: { backgroundColor: 'rgba(239, 68, 68, 0.4)', borderRadius: '4px' },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Let's look at a key moment</p>
            <p className="text-xs text-slate-500">From your game just now</p>
          </div>
        </div>
      </header>

      {/* Board showing the turning point position */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-[360px]">
          {/* Theme badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{TURNING_POINT.themeEmoji}</span>
            <span className="text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              {TURNING_POINT.themeName}
            </span>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Chessboard options={boardOptions} />
          </div>

          {/* Highlighted piece callout */}
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">🎯</span>
              <div>
                <p className="font-semibold text-slate-800">
                  {showExplanation ? TURNING_POINT.explanation : 'Something happened here...'}
                </p>
                {!showExplanation && (
                  <p className="text-sm text-slate-500 mt-1">
                    The red square shows where your piece was in danger.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Show explanation button */}
          {!showExplanation && (
            <button
              onClick={() => setShowExplanation(true)}
              className="w-full mt-4 h-12 bg-amber-500 text-white rounded-2xl font-semibold hover:bg-amber-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25"
            >
              <Lightbulb className="w-5 h-5" />
              Show me what happened
            </button>
          )}

          {/* Proceed to drills */}
          {showExplanation && (
            <button
              onClick={() => navigate(`/c/${slug}/drills/${gameId}`)}
              className="w-full mt-4 h-14 bg-sky-500 text-white rounded-2xl text-lg font-bold hover:bg-sky-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25"
            >
              Practice this skill
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}