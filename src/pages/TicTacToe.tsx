import { useEffect, useState } from "react";
import { useGame } from "../context/GameContext";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Brain } from "lucide-react";
import { CoachingService } from "../lib/coaching-service";

export function TicTacToe() {
  const { gameState, startNewGame, updateGameState } = useGame();
  const [coachingMsg, setCoachingMsg] = useState("Your turn! Look for three in a row.");

  useEffect(() => {
    startNewGame("tictactoe", "play");
  }, [startNewGame]);

  useEffect(() => {
    if (gameState && gameState.type === "tictactoe") {
      const insight = CoachingService.getInsight("tictactoe", gameState);
      setCoachingMsg(insight.message);
    }
  }, [gameState]);

  if (!gameState || gameState.type !== "tictactoe") return null;

  const board = gameState.data.board;

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diags
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.every(sq => sq) ? "draw" : null;
  };

  const handleClick = (i: number) => {
    if (board[i] || gameState.status === "finished") return;

    const newBoard = [...board];
    newBoard[i] = gameState.turn === "1" ? "X" : "O";

    const winner = checkWinner(newBoard);
    const nextTurn = gameState.turn === "1" ? "2" : "1";

    updateGameState({
      data: { board: newBoard },
      status: winner ? "finished" : "playing",
      turn: nextTurn,
      winner: winner || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="max-w-md mx-auto flex items-center justify-between mb-8">
        <Link to="/" className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Tic Tac Toe</h1>
        <button
          onClick={() => startNewGame("tictactoe", "play")}
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </header>

      <main className="max-w-md mx-auto">
        {/* Coaching Box */}
        <div className="bg-blue-600 rounded-2xl p-6 text-white mb-8 shadow-lg shadow-blue-200 flex items-start gap-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">AI Coach</p>
            <p className="font-medium">{coachingMsg}</p>
          </div>
        </div>

        {/* Board */}
        <div className="grid grid-cols-3 gap-3 bg-slate-200 p-3 rounded-3xl aspect-square shadow-inner">
          {board.map((cell: string | null, i: number) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              disabled={gameState.status === "finished"}
              className={cn(
                "bg-white rounded-2xl text-4xl font-bold flex items-center justify-center transition-all duration-200",
                !cell && gameState.status === "playing" && "hover:bg-blue-50 active:scale-95 shadow-sm",
                cell === "X" && "text-blue-600",
                cell === "O" && "text-red-600",
                gameState.status === "finished" && "opacity-80"
              )}
            >
              {cell}
            </button>
          ))}
        </div>

        {/* Status */}
        <div className="mt-8 text-center">
           {gameState.status === "finished" ? (
             <div className="animate-bounce">
               <p className="text-2xl font-bold text-slate-900">
                 {gameState.winner === "draw" ? "It's a Draw!" : `${gameState.winner} Wins!`}
               </p>
               <button
                 onClick={() => startNewGame("tictactoe", "play")}
                 className="mt-4 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200"
               >
                 Play Again
               </button>
             </div>
           ) : (
             <p className="text-slate-500 font-medium">
               Current Turn: <span className={gameState.turn === "1" ? "text-blue-600" : "text-red-600"}>
                 {gameState.turn === "1" ? "X" : "O"}
               </span>
             </p>
           )}
        </div>
      </main>
    </div>
  );
}
