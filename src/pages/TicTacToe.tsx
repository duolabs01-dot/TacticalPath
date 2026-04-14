import { useEffect, useState, useCallback } from "react";
import { useGame, Difficulty } from "../context/GameContext";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Brain, User, Monitor, ChevronRight, History, PlayCircle } from "lucide-react";
import { CoachingService, CoachingInsight } from "../lib/coaching-service";

type BoardState = (string | null)[];

export function TicTacToe() {
  const { gameState, startNewGame, updateGameState } = useGame();
  const [insight, setInsight] = useState<CoachingInsight | null>(null);
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);
  const [moveHistory, setMoveHistory] = useState<BoardState[]>([]);

  const start = useCallback((diff: Difficulty = 'medium') => {
    startNewGame("tictactoe", "play", { difficulty: diff });
    setReviewIndex(null);
    setMoveHistory([Array(9).fill(null)]);
    setInsight(null);
  }, [startNewGame]);

  useEffect(() => {
    start();
  }, []);

  const checkWinner = (squares: BoardState) => {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return squares.every(sq => sq) ? "draw" : null;
  };

  const minimax = (squares: BoardState, depth: number, isMaximizing: boolean): number => {
    const result = checkWinner(squares);
    if (result === 'O') return 10 - depth;
    if (result === 'X') return depth - 10;
    if (result === 'draw') return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
          squares[i] = 'O';
          bestScore = Math.max(minimax(squares, depth + 1, false), bestScore);
          squares[i] = null;
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
          squares[i] = 'X';
          bestScore = Math.min(minimax(squares, depth + 1, true), bestScore);
          squares[i] = null;
        }
      }
      return bestScore;
    }
  };

  const getAIMove = (squares: BoardState, difficulty: Difficulty): number => {
    const available = squares.map((s, i) => s === null ? i : null).filter(s => s !== null) as number[];
    const rand = Math.random();
    if (difficulty === 'easy' && rand < 0.7) return available[Math.floor(Math.random() * available.length)];
    if (difficulty === 'medium' && rand < 0.3) return available[Math.floor(Math.random() * available.length)];

    let bestScore = -Infinity;
    let move = available[0];
    for (let i of available) {
      squares[i] = 'O';
      let score = minimax(squares, 0, false);
      squares[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
    return move;
  };

  const makeMove = (i: number, player: 'X' | 'O') => {
    if (!gameState || gameState.status !== "playing") return;
    const board = gameState.data.board;
    if (board[i]) return;

    const newBoard = [...board];
    newBoard[i] = player;
    const winner = checkWinner(newBoard);
    const newHistory = [...moveHistory, newBoard];
    setMoveHistory(newHistory);

    updateGameState({
      data: { board: newBoard },
      status: winner ? "finished" : "playing",
      turn: winner ? (player === 'X' ? '1' : '2') : (player === 'X' ? '2' : '1'),
      winner: winner || undefined,
      moves: [...gameState.moves, { player, index: i }]
    });
  };

  useEffect(() => {
    if (gameState?.turn === "2" && gameState.status === "playing") {
      const timer = setTimeout(() => {
        makeMove(getAIMove([...gameState.data.board], gameState.difficulty), 'O');
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [gameState?.turn, gameState?.status]);

  useEffect(() => {
    if (gameState) {
      setInsight(CoachingService.getInsight("tictactoe", gameState));
    }
  }, [gameState?.turn, gameState?.status]);

  if (!gameState || gameState.type !== "tictactoe") return null;

  const currentBoard = reviewIndex !== null ? moveHistory[reviewIndex] : gameState.data.board;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-md flex items-center justify-between mb-8">
        <Link to="/" className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="text-center">
            <h1 className="text-xl font-bold italic tracking-tight text-slate-900">Tic Tac Toe</h1>
            <div className="flex items-center gap-1 justify-center">
                <div className={cn("w-1.5 h-1.5 rounded-full", gameState.difficulty === 'hard' ? "bg-red-500" : "bg-emerald-500")} />
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{gameState.difficulty}</span>
            </div>
        </div>
        <button onClick={() => start(gameState.difficulty)} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <RotateCcw className="w-6 h-6" />
        </button>
      </header>

      <main className="w-full max-w-md">
        {/* Coaching Box */}
        <div className={cn(
            "rounded-2xl p-6 text-white mb-8 shadow-lg flex items-start gap-4 transition-all duration-500 border-b-4",
            gameState.status === 'finished' ? "bg-slate-800 border-slate-950 shadow-slate-200" : "bg-blue-600 border-blue-800 shadow-blue-200"
        )}>
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            {gameState.status === 'finished' ? <History className="w-6 h-6 text-slate-200" /> : <Brain className="w-6 h-6 text-blue-100" />}
          </div>
          <div>
            <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">
                {gameState.status === 'finished' ? "Post-Game Analysis" : "AI Coach"}
            </p>
            <p className="font-bold leading-relaxed text-sm md:text-base">
                {insight?.message}
            </p>
            {gameState.status === 'finished' && insight?.turningPointIndex !== undefined && (
                <button
                    onClick={() => setReviewIndex(insight.turningPointIndex!)}
                    className="mt-3 flex items-center gap-2 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors font-bold"
                >
                    <PlayCircle className="w-4 h-4" /> Watch Turning Point
                </button>
            )}
          </div>
        </div>

        {/* Board */}
        <div className="grid grid-cols-3 gap-4 bg-slate-200 p-4 rounded-[2rem] aspect-square shadow-inner relative overflow-hidden border-8 border-slate-100">
          {currentBoard.map((cell: string | null, i: number) => (
            <button
              key={i}
              onClick={() => reviewIndex === null && makeMove(i, 'X')}
              disabled={gameState.status === "finished" || gameState.turn === "2" || reviewIndex !== null}
              className={cn(
                "bg-white rounded-2xl text-6xl font-black flex items-center justify-center transition-all duration-300 shadow-[0_4px_0_0_rgba(0,0,0,0.05)]",
                !cell && gameState.status === "playing" && "hover:bg-blue-50 active:scale-95 active:shadow-none",
                cell === "X" && "text-blue-600",
                cell === "O" && "text-red-500",
                reviewIndex !== null && "opacity-80"
              )}
            >
              {cell}
            </button>
          ))}
        </div>

        {gameState.status === "finished" ? (
           <div className="mt-10 space-y-6">
              <div className="flex flex-col items-center gap-4">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Match History</p>
                 <div className="flex items-center justify-center flex-wrap gap-2">
                    {moveHistory.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setReviewIndex(idx === moveHistory.length - 1 ? null : idx)}
                            className={cn(
                                "w-10 h-10 rounded-xl font-black text-xs transition-all flex items-center justify-center",
                                (reviewIndex === idx || (reviewIndex === null && idx === moveHistory.length - 1))
                                    ? "bg-blue-600 text-white shadow-lg scale-110"
                                    : "bg-white text-slate-400 border-2 border-slate-100 hover:border-blue-200"
                            )}
                        >
                            {idx === 0 ? "START" : idx}
                        </button>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-4">
                 <button onClick={() => start(gameState.difficulty)} className="py-5 bg-blue-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/40 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                    <RotateCcw className="w-6 h-6" /> Play Again
                 </button>
                 <div className="grid grid-cols-2 gap-3">
                    <Link to="/" className="py-4 bg-white border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all text-center">
                        Games Library
                    </Link>
                    <button onClick={() => setReviewIndex(null)} className="py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all">
                        Final Board
                    </button>
                 </div>
              </div>
           </div>
        ) : (
            <div className="mt-10 flex items-center justify-center gap-10">
                <div className={cn("flex flex-col items-center gap-3 transition-all duration-500", gameState.turn !== "1" ? "opacity-20 scale-90" : "scale-110")}>
                    <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 shadow-inner">
                        <User className="w-8 h-8" />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">You (X)</span>
                </div>
                <div className="w-12 h-1 bg-slate-200 rounded-full" />
                <div className={cn("flex flex-col items-center gap-3 transition-all duration-500", gameState.turn !== "2" ? "opacity-20 scale-90" : "scale-110")}>
                    <div className="w-16 h-16 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 shadow-inner">
                        <Monitor className="w-8 h-8" />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Robot (O)</span>
                </div>
            </div>
        )}
      </main>
    </div>
  );
}
