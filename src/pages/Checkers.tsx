import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { cn } from "../lib/utils";

const BOARD_SIZE = 8;
const PLAYER = 1;
const BOT = 2;
const EMPTY = 0;

type BoardState = number[];

function createBoard(): BoardState {
  const board = Array(BOARD_SIZE * BOARD_SIZE).fill(EMPTY);
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if ((row + col) % 2 === 1) {
        if (row < 3) board[row * BOARD_SIZE + col] = BOT;
        else if (row > 4) board[row * BOARD_SIZE + col] = PLAYER;
      }
    }
  }
  return board;
}

function getValidMoves(board: BoardState, player: number): number[] {
  const moves: number[] = [];
  const directions = player === PLAYER ? [-1, -1, 1, 1] : [-1, 1]; // simplified
  
  for (let i = 0; i < board.length; i++) {
    if (board[i] === player || board[i] === player + 10) {
      const row = Math.floor(i / BOARD_SIZE);
      const col = i % BOARD_SIZE;
      const dir = player === PLAYER ? -1 : 1;
      
      // Simple left/right moves
      if (col > 0 && board[(row + dir) * BOARD_SIZE + (col - 1)] === EMPTY) {
        moves.push(i, (row + dir) * BOARD_SIZE + (col - 1));
      }
      if (col < BOARD_SIZE - 1 && board[(row + dir) * BOARD_SIZE + (col + 1)] === EMPTY) {
        moves.push(i, (row + dir) * BOARD_SIZE + (col + 1));
      }
    }
  }
  return moves;
}

export function Checkers() {
  const [board, setBoard] = useState<BoardState>(createBoard());
  const [turn, setTurn] = useState<number>(PLAYER);
  const [winner, setWinner] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const playerPieces = board.filter(p => p === PLAYER).length;
  const botPieces = board.filter(p => p === BOT).length;

  useEffect(() => {
    if (turn === BOT && !winner) {
      const timer = setTimeout(() => {
        const moves = getValidMoves(board, BOT);
        if (moves.length > 0) {
          const from = moves[Math.floor(Math.random() * (moves.length / 2)) * 2];
          const to = moves[moves.indexOf(from) + 1];
          if (to !== undefined) {
            const newBoard = [...board];
            newBoard[to] = newBoard[from];
            newBoard[from] = EMPTY;
            setBoard(newBoard);
            
            if (botPieces <= 1) setWinner(PLAYER);
            else setTurn(PLAYER);
          }
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [turn, board, winner]);

  const handleClick = (index: number) => {
    if (turn !== PLAYER || winner) return;
    
    // Select piece
    if (board[index] === PLAYER || board[index] === PLAYER + 10) {
      setSelected(index);
      return;
    }
    
    // Move to empty square
    if (selected !== null) {
      const newBoard = [...board];
      newBoard[index] = newBoard[selected];
      newBoard[selected] = EMPTY;
      setBoard(newBoard);
      setSelected(null);
      
      if (playerPieces >= 7) setWinner(PLAYER);
      else setTurn(BOT);
    }
  };

  const reset = () => {
    setBoard(createBoard());
    setTurn(PLAYER);
    setWinner(null);
    setSelected(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <header className="flex items-center justify-between p-4 border-b border-slate-800">
        <Link to="/play" className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-white" />
        </Link>
        <h1 className="text-lg font-bold text-white">Checkers</h1>
        <button onClick={reset} className="p-2">
          <RotateCcw className="w-6 h-6 text-white" />
        </button>
      </header>

      <div className="flex justify-around py-4 text-white">
        <div className="text-center">
          <p className="text-xs text-slate-400">YOU</p>
          <p className="text-xl font-bold">{playerPieces}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-400">TURN</p>
          <p className="text-xl font-bold">{turn === PLAYER ? "Your" : "Bot"}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-400">BOT</p>
          <p className="text-xl font-bold">{botPieces}</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="grid grid-cols-8 gap-0.5 w-full max-w-sm aspect-square bg-slate-700 rounded-lg overflow-hidden">
          {board.map((cell, i) => {
            const row = Math.floor(i / BOARD_SIZE);
            const col = i % BOARD_SIZE;
            const isDark = (row + col) % 2 === 1;
            
            return (
              <button
                key={i}
                onClick={() => isDark && handleClick(i)}
                disabled={turn !== PLAYER || !!winner}
                className={cn(
                  "aspect-square flex items-center justify-center",
                  isDark ? "bg-amber-700" : "bg-amber-200",
                  cell === PLAYER && "bg-red-500 rounded-full",
                  cell === BOT && "bg-slate-900 rounded-full",
                  selected === i && "ring-4 ring-yellow-400"
                )}
              >
                {cell !== EMPTY && (
                  <span className="text-xs text-white font-bold">
                    {cell === PLAYER + 10 && "♔"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {winner && (
        <div className="p-4">
          <p className="text-center text-xl font-bold text-white mb-4">
            {winner === PLAYER ? "You win!" : "Bot wins!"}
          </p>
          <button onClick={reset} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}