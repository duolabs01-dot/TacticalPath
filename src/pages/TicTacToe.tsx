import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BrainCircuit, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { cn } from "../lib/utils";
import { appendGameResult } from "../lib/game-results";

type Player = "X" | "O";
type Board = (Player | null)[];

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner(board: Board): Player | "draw" | null {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return board.every(Boolean) ? "draw" : null;
}

function minimax(board: Board, current: Player): { score: number; move: number | null } {
  const winner = checkWinner(board);
  if (winner === "O") return { score: 10, move: null };
  if (winner === "X") return { score: -10, move: null };
  if (winner === "draw") return { score: 0, move: null };

  const available = board.flatMap((cell, index) => (cell === null ? [index] : []));
  const moves = available.map((index) => {
    const nextBoard = [...board];
    nextBoard[index] = current;
    const result = minimax(nextBoard, current === "O" ? "X" : "O");
    return { move: index, score: result.score };
  });

  if (current === "O") {
    return moves.reduce((best, move) => (move.score > best.score ? move : best), { move: null, score: -Infinity });
  }

  return moves.reduce((best, move) => (move.score < best.score ? move : best), { move: null, score: Infinity });
}

function findImmediateMove(board: Board, player: Player) {
  for (const [a, b, c] of WINNING_LINES) {
    const line = [board[a], board[b], board[c]];
    const playerCount = line.filter((value) => value === player).length;
    const emptyIndex = [a, b, c][line.indexOf(null)];

    if (playerCount === 2 && emptyIndex !== undefined) {
      return emptyIndex;
    }
  }

  return null;
}

export function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [current, setCurrent] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "draw" | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [hasRecordedResult, setHasRecordedResult] = useState(false);

  const winnerLine = useMemo(() => {
    for (const line of WINNING_LINES) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return line;
      }
    }
    return null;
  }, [board]);

  const coachMessage = useMemo(() => {
    if (winner === "X") return "You controlled the board perfectly. Spotting forks early wins this game.";
    if (winner === "O") return "The bot found a forcing line. Next time, check the center and the opposite corners.";
    if (winner === "draw") return "Strong discipline. Tic Tac Toe rewards players who deny the fork before it appears.";
    if (isAiThinking) return "The bot is checking for forks, blocks, and immediate wins.";
    if (!board[4]) return "Take the center first whenever it is available. It opens the most threats.";

    const winningMove = findImmediateMove(board, "X");
    if (winningMove !== null) return "You have a winning move on the board right now. Finish the line.";

    const mustBlock = findImmediateMove(board, "O");
    if (mustBlock !== null) return "The bot is threatening a line. Block before you build.";

    return "Create two threats at once. The fork is the whole point of this game.";
  }, [board, isAiThinking, winner]);

  useEffect(() => {
    if (!winner || hasRecordedResult) return;
    appendGameResult("tictactoe", winner === "X");
    setHasRecordedResult(true);
  }, [hasRecordedResult, winner]);

  useEffect(() => {
    if (current !== "O" || winner) return;

    setIsAiThinking(true);
    const timer = window.setTimeout(() => {
      const immediateWin = findImmediateMove(board, "O");
      const block = findImmediateMove(board, "X");
      const bestMove =
        immediateWin ??
        block ??
        minimax(board, "O").move ??
        board.findIndex((cell) => cell === null);

      if (bestMove !== null && bestMove >= 0) {
        const nextBoard = [...board];
        nextBoard[bestMove] = "O";
        const nextWinner = checkWinner(nextBoard);

        setBoard(nextBoard);
        setWinner(nextWinner);
        setCurrent(nextWinner ? "O" : "X");
      }

      setIsAiThinking(false);
    }, 520);

    return () => window.clearTimeout(timer);
  }, [board, current, winner]);

  const handleMove = (index: number) => {
    if (board[index] || winner || current !== "X" || isAiThinking) return;

    const nextBoard = [...board];
    nextBoard[index] = "X";

    const nextWinner = checkWinner(nextBoard);
    setBoard(nextBoard);
    setWinner(nextWinner);
    setCurrent(nextWinner ? "X" : "O");
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setCurrent("X");
    setWinner(null);
    setIsAiThinking(false);
    setHasRecordedResult(false);
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 md:px-8 md:py-8">
      <header className="mb-6 flex items-center justify-between">
        <Link
          to="/play"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-600">Quick tactics</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Tic Tac Toe</h1>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
        <section className="rounded-[2.5rem] border border-white/70 bg-white/85 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Board state</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">
                {winner
                  ? winner === "draw"
                    ? "Perfectly balanced"
                    : winner === "X"
                      ? "You found the line"
                      : "The bot converted"
                  : isAiThinking
                    ? "Bot is thinking"
                    : "Your move"}
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              {winner ? "Finished" : current === "X" ? "You to move" : "Bot to move"}
            </div>
          </div>

          <div className="grid aspect-square w-full max-w-[34rem] grid-cols-3 gap-3">
            {board.map((cell, index) => {
              const isWinningCell = winnerLine?.includes(index);
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleMove(index)}
                  disabled={Boolean(cell) || Boolean(winner) || isAiThinking}
                  className={cn(
                    "group relative flex aspect-square items-center justify-center rounded-[2rem] border text-5xl font-black transition duration-200 sm:text-6xl",
                    cell === "X" && "border-blue-200 bg-blue-50 text-blue-600",
                    cell === "O" && "border-rose-200 bg-rose-50 text-rose-500",
                    !cell && "border-slate-200 bg-slate-50 text-slate-300 hover:border-blue-200 hover:bg-white",
                    isWinningCell && "ring-4 ring-emerald-300"
                  )}
                >
                  {cell ?? <span className="opacity-0 transition group-hover:opacity-100">+</span>}
                </button>
              );
            })}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/40">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <BrainCircuit className="h-6 w-6 text-blue-200" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-200">Coach</p>
                <p className="text-xl font-black">One clean idea</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-200">{coachMessage}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[1.75rem] bg-white p-4 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">You</p>
              <p className="mt-2 text-2xl font-black text-blue-600">X</p>
            </div>
            <div className="rounded-[1.75rem] bg-white p-4 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Bot</p>
              <p className="mt-2 text-2xl font-black text-rose-500">O</p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-slate-900">
              <Trophy className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-black">Victory pattern</h3>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Strong Tic Tac Toe is about controlling the center and creating two threats that the bot cannot answer at once.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={reset}
                className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-slate-800"
              >
                Reset board
              </button>
              <Link
                to="/play"
                className="rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
              >
                Back to games
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
