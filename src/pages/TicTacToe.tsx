import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { cn } from "../lib/utils";

type Player = "X" | "O";
type Board = (Player | null)[];

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6] // diagonals
];

function checkWinner(board: Board): Player | "draw" | null {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.every(Boolean) ? "draw" : null;
}

function getBestMove(board: Board, player: Player): number {
  const available = board.map((_, i) => i).filter(i => !board[i]);
  if (available.length === 0) return -1;
  return available[Math.floor(Math.random() * available.length)];
}

export function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [current, setCurrent] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "draw" | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const handleMove = (index: number) => {
    if (board[index] || winner || isAiThinking) return;
    
    const newBoard = [...board];
    newBoard[index] = current;
    setBoard(newBoard);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
      return;
    }

    // AI turn
    setCurrent("O");
    setIsAiThinking(true);
  };

  // AI move
  useEffect(() => {
    if (current === "O" && !winner) {
      const timer = setTimeout(() => {
        const move = getBestMove(board, "O");
        if (move >= 0) {
          const newBoard = [...board];
          newBoard[move] = "O";
          setBoard(newBoard);
          const win = checkWinner(newBoard);
          if (win) setWinner(win);
          else setCurrent("X");
        }
        setIsAiThinking(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [current, board, winner]);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setCurrent("X");
    setWinner(null);
    setIsAiThinking(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-slate-800">
        <Link to="/play" className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-white" />
        </Link>
        <h1 className="text-lg font-bold text-white">Tic Tac Toe</h1>
        <button onClick={reset} className="p-2">
          <RotateCcw className="w-6 h-6 text-white" />
        </button>
      </header>

      {/* Status */}
      <div className="text-center py-4">
        {winner ? (
          <p className="text-xl font-bold text-white">
            {winner === "draw" ? "It's a draw!" : `${winner} wins!`}
          </p>
        ) : isAiThinking ? (
          <p className="text-lg text-slate-400">Thinking...</p>
        ) : (
          <p className="text-lg text-white">
            Your turn ({current === "X" ? "X" : "O"})
          </p>
        )}
      </div>

      {/* Board */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="grid grid-cols-3 gap-2 w-full max-w-sm aspect-square">
          {board.map((cell, i) => (
            <button
              key={i}
              onClick={() => handleMove(i)}
              disabled={!!cell || !!winner || isAiThinking}
              className={cn(
                "rounded-xl text-4xl font-bold flex items-center justify-center transition-all",
                cell === "X" ? "text-blue-500" : cell === "O" ? "text-red-500" : "bg-slate-800 hover:bg-slate-700",
                !cell && !winner && !isAiThinking && "cursor-pointer"
              )}
            >
              {cell}
            </button>
          ))}
        </div>
      </div>

      {/* Play again */}
      {winner && (
        <div className="p-4">
          <button 
            onClick={reset}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl"
          >
            Play Again
          </button>
          <Link to="/play" className="block mt-2 text-center text-slate-400 py-2">
            Choose another game
          </Link>
        </div>
      )}
    </div>
  );
}