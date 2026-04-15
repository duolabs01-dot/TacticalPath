import { useState, useCallback, type ComponentProps } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { useClassroom } from '../../context/ClassroomContext';

export function StudentLiveGame() {
  const { slug, gameId } = useParams<{ slug: string; gameId: string }>();
  const navigate = useNavigate();
  const { currentStudent, classroom } = useClassroom();
  const [game, setGame] = useState(new Chess());
  const [whiteTime, setWhiteTime] = useState(600); // 10 min in seconds
  const [blackTime, setBlackTime] = useState(600);
  const [gameOver, setGameOver] = useState<string | null>(null);

  // Opponent info (mock: always playing student-2)
  const opponent = classroom.students[1];

  const onDrop = useCallback((sourceSquare: string, targetSquare: string) => {
    if (gameOver) return false;

    const gameCopy = new Chess(game.fen());
    const moveResult = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (moveResult === null) return false;

    setGame(gameCopy);

    // Check for game end
    if (gameCopy.isCheckmate()) {
      setGameOver('checkmate');
    } else if (gameCopy.isDraw()) {
      setGameOver('draw');
    } else if (gameCopy.isStalemate()) {
      setGameOver('stalemate');
    }

    return true;
  }, [game, gameOver]);

  const handleResign = () => {
    setGameOver('resign');
  };

  const handleGoToLesson = () => {
    navigate(`/c/${slug}/lesson/${gameId}`);
  };

  const boardOptions: ComponentProps<typeof Chessboard>['options'] = {
    position: game.fen(),
    onPieceDrop: ({ sourceSquare, targetSquare }) => onDrop(sourceSquare, targetSquare ?? ''),
    boardOrientation: 'white',
    boardStyle: {
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    },
    darkSquareStyle: { backgroundColor: '#b7d7e8' },
    lightSquareStyle: { backgroundColor: '#eaf4f9' },
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!currentStudent) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Opponent info bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{opponent.avatarEmoji}</span>
            <span className="font-semibold text-slate-700">{opponent.displayName}</span>
          </div>
          <div className={`font-mono text-lg font-bold ${blackTime < 120 ? 'text-amber-500' : 'text-slate-600'}`}>
            {formatTime(blackTime)}
          </div>
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 flex items-center justify-center px-4 py-2">
        <div className="w-full max-w-[400px]">
          <Chessboard options={boardOptions} />
        </div>
      </div>

      {/* Player info bar */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{currentStudent.avatarEmoji}</span>
            <span className="font-semibold text-slate-700">{currentStudent.displayName}</span>
            <span className="text-xs bg-sky-100 text-sky-600 px-2 py-0.5 rounded-full font-semibold">You</span>
          </div>
          <div className={`font-mono text-lg font-bold ${whiteTime < 120 ? 'text-amber-500' : 'text-slate-600'}`}>
            {formatTime(whiteTime)}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white border-t border-slate-200 p-4">
        <div className="max-w-lg mx-auto flex gap-3">
          {!gameOver && (
            <button
              onClick={handleResign}
              className="flex-1 h-12 bg-white border-2 border-slate-200 rounded-2xl text-slate-500 font-semibold hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600 active:scale-[0.98] transition-all"
            >
              Resign
            </button>
          )}
          {gameOver && (
            <>
              <div className="flex-1 text-center py-3">
                <p className="text-lg font-bold text-slate-800">
                  {gameOver === 'checkmate' ? 'Checkmate!' : gameOver === 'stalemate' ? 'Stalemate!' : gameOver === 'draw' ? 'Draw!' : 'You resigned'}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {gameOver === 'checkmate' ? 'Great game!' : 'Good effort!'}
                </p>
              </div>
              <button
                onClick={handleGoToLesson}
                className="flex-1 h-12 bg-sky-500 text-white rounded-2xl font-semibold hover:bg-sky-600 active:scale-[0.98] transition-all shadow-lg shadow-sky-500/25"
              >
                See what happened
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}