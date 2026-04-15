import { useEffect, useState, useCallback } from "react";
import { useGame, Difficulty } from "../context/GameContext";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Brain, Monitor, User, Undo2 } from "lucide-react";
import { Chessboard } from "react-chessboard";
import { CoachingService, CoachingInsight } from "../lib/coaching-service";
import { cn } from "../lib/utils";

export function PlayChess() {
  const { gameState, chessGame, startNewGame, makeMove, undo } = useGame();
  const [insight, setInsight] = useState<CoachingInsight | null>(null);

  const start = useCallback((diff: Difficulty = 'medium') => {
    startNewGame("chess", "play", { difficulty: diff });
  }, [startNewGame]);

  useEffect(() => {
    start();
  }, []);

  const onDrop = ({ sourceSquare, targetSquare }: { sourceSquare: string; targetSquare: string | null }) => {
    if (!targetSquare || gameState?.turn !== 'w' || gameState.status !== 'playing') return false;

    return makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
  };

  const makeComputerMove = useCallback(() => {
      if (!gameState || gameState.status !== "playing" || gameState.turn !== "b" || !chessGame) return;

      setTimeout(() => {
          const possibleMoves = chessGame.moves();
          if (possibleMoves.length === 0) return;

          // Simple random move (to be replaced with Stockfish in next pass)
          const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
          makeMove(randomMove);
      }, 800);
  }, [gameState, chessGame, makeMove]);

  useEffect(() => {
      if (gameState?.turn === "b") makeComputerMove();
      if (gameState) {
          setInsight(CoachingService.getInsight("chess", gameState));
      }
  }, [gameState?.turn, gameState?.status]);

  if (!gameState || gameState.type !== "chess" || !chessGame) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl flex items-center justify-between mb-8">
        <Link to="/" className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </Link>
        <div className="text-center">
            <h1 className="text-2xl font-black italic tracking-tighter text-slate-900">Chess Master</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{gameState.difficulty} MODE</p>
        </div>
        <button onClick={() => start(gameState.difficulty)} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <RotateCcw className="w-6 h-6 text-slate-600" />
        </button>
      </header>

      <main className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Board */}
        <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-white p-3 rounded-[2.5rem] shadow-2xl border-8 border-slate-100 overflow-hidden aspect-square relative">
                <Chessboard
                    options={{
                        position: chessGame.fen(),
                        onPieceDrop: onDrop,
                        boardOrientation: "white",
                        animationDurationInMs: 200,
                        darkSquareStyle: { backgroundColor: '#739552' },
                        lightSquareStyle: { backgroundColor: '#ebecd0' },
                    }}
                    customBoardStyle={{
                        borderRadius: '1.5rem',
                    }}
                />
                {gameState.turn === 'b' && gameState.status === 'playing' && (
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] pointer-events-none flex items-center justify-center">
                         <div className="bg-white/90 px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 border border-slate-200 animate-pulse">
                            <Monitor className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Robot thinking</span>
                         </div>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between px-4">
                <div className={cn("flex items-center gap-3 transition-all", gameState.turn !== 'w' && "opacity-30 grayscale scale-95")}>
                    <div className="w-12 h-12 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center text-xl shadow-sm">♔</div>
                    <div>
                        <p className="text-xs font-black text-slate-400 uppercase">White</p>
                        <p className="font-bold text-slate-800">Player</p>
                    </div>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div className={cn("flex items-center gap-3 text-right transition-all", gameState.turn !== 'b' && "opacity-30 grayscale scale-95")}>
                    <div>
                        <p className="text-xs font-black text-slate-400 uppercase">Black</p>
                        <p className="font-bold text-slate-800">Robot</p>
                    </div>
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-xl shadow-lg text-white">♚</div>
                </div>
            </div>
        </div>

        {/* Right Side: Analysis & Controls */}
        <div className="lg:col-span-5 flex flex-col gap-6">
            <div className={cn(
                "rounded-3xl p-8 text-white shadow-xl transition-all duration-500 border-b-8",
                gameState.status === 'playing' ? "bg-blue-600 border-blue-800 shadow-blue-200" : "bg-slate-800 border-slate-950 shadow-slate-300"
            )}>
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Brain className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">AI Strategist</span>
               </div>
               <p className="text-lg font-bold leading-tight mb-2">{insight?.message}</p>
               <p className="text-white/70 text-sm leading-relaxed">
                  Every move is an opportunity to learn. The AI coach tracks your development and highlights key patterns.
               </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <button
                    onClick={undo}
                    disabled={gameState.status !== 'playing' || gameState.moves.length === 0}
                    className="group py-5 bg-white border-2 border-slate-200 rounded-[1.5rem] font-black text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-md active:translate-y-1 active:shadow-none disabled:opacity-30"
                >
                    <Undo2 className="w-6 h-6 transition-transform group-hover:-rotate-45" />
                    TAKE BACK
                </button>

                {gameState.status !== 'playing' && (
                    <button
                        onClick={() => start()}
                        className="py-6 bg-emerald-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all"
                    >
                        NEW GAME
                    </button>
                )}
            </div>

            <div className="card p-6 bg-slate-100/50 border-none shadow-inner rounded-[2rem]">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">MOVE LOG</p>
                 <div className="grid grid-cols-4 gap-2">
                    {gameState.moves.slice(-12).map((m, i) => (
                        <div key={i} className="bg-white px-2 py-1.5 rounded-lg border border-slate-200 text-center text-xs font-bold text-slate-600">
                            {typeof m === 'string' ? m : m.san}
                        </div>
                    ))}
                 </div>
            </div>
        </div>
      </main>
    </div>
  );
}
