import { useEffect, useState, useCallback } from "react";
import { useGame, Difficulty } from "../context/GameContext";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Brain, Monitor, User } from "lucide-react";
import { Chessboard } from "react-chessboard";
import { CoachingService } from "../lib/coaching-service";

export function ChessGame() {
  const { gameState, chessGame, startNewGame, makeMove, undo } = useGame();
  const [coachingMsg, setCoachingMsg] = useState("Your turn! Control the center and develop your pieces.");

  useEffect(() => {
    startNewGame("chess", "play");
  }, [startNewGame]);

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const move = makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
    return move;
  };

  const makeComputerMove = useCallback(() => {
      if (!gameState || gameState.status !== "playing" || gameState.turn !== "b" || !chessGame) return;

      setTimeout(() => {
          const possibleMoves = chessGame.moves();
          if (possibleMoves.length === 0) return;

          const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
          makeMove(randomMove);
      }, 1000);
  }, [gameState, chessGame, makeMove]);

  useEffect(() => {
      if (gameState?.turn === "b") makeComputerMove();
      if (gameState) {
          const insight = CoachingService.getInsight("chess", gameState);
          setCoachingMsg(insight.message);
      }
  }, [gameState?.turn]);

  if (!gameState || gameState.type !== "chess" || !chessGame) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-2xl flex items-center justify-between mb-8">
        <Link to="/" className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Chess vs Computer</h1>
        <button onClick={() => startNewGame("chess", "play")} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <RotateCcw className="w-6 h-6" />
        </button>
      </header>

      <main className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <div className="bg-white p-2 rounded-2xl shadow-2xl border-4 border-white overflow-hidden aspect-square">
                <Chessboard
                    position={chessGame.fen()}
                    onPieceDrop={onDrop}
                    boardOrientation="white"
                />
            </div>
        </div>

        <div className="flex flex-col gap-6">
            <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200 flex flex-col gap-4">
               <div className="flex items-center gap-3">
                  <Brain className="w-6 h-6" />
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-100">AI Coach</span>
               </div>
               <p className="font-medium text-sm leading-relaxed">{coachingMsg}</p>
            </div>

            <div className="card p-6 flex flex-col gap-4">
                <div className={cn("flex items-center justify-between p-3 rounded-xl border transition-all", gameState.turn === 'w' ? "bg-blue-50 border-blue-200" : "border-transparent opacity-50")}>
                    <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-blue-600" />
                        <span className="font-bold text-slate-700">You (White)</span>
                    </div>
                </div>
                <div className={cn("flex items-center justify-between p-3 rounded-xl border transition-all", gameState.turn === 'b' ? "bg-red-50 border-red-200" : "border-transparent opacity-50")}>
                    <div className="flex items-center gap-3">
                        <Monitor className="w-5 h-5 text-red-600" />
                        <span className="font-bold text-slate-700">Robot (Black)</span>
                    </div>
                </div>
            </div>

            <button
                onClick={undo}
                className="w-full py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
                <RotateCcw className="w-4 h-4" /> Undo Move
            </button>
        </div>
      </main>
    </div>
  );
}
