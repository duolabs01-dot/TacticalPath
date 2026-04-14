import { useEffect, useState, useCallback } from "react";
import { useGame, Difficulty } from "../context/GameContext";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Brain, User, Monitor } from "lucide-react";
import { CoachingService } from "../lib/coaching-service";

export function TicTacToe() {
  const { gameState, startNewGame, updateGameState } = useGame();
  const [coachingMsg, setCoachingMsg] = useState("Your turn! Look for three in a row.");

  const start = useCallback((diff: Difficulty = 'medium') => {
    startNewGame("tictactoe", "play", { difficulty: diff });
  }, [startNewGame]);

  useEffect(() => {
    start();
  }, []); // Run once on mount

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.every(sq => sq) ? "draw" : null;
  };

  const minimax = (squares: (string | null)[], depth: number, isMaximizing: boolean): number => {
    const result = checkWinner(squares);
    if (result === 'O') return 10 - depth;
    if (result === 'X') return depth - 10;
    if (result === 'draw') return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
          squares[i] = 'O';
          let score = minimax(squares, depth + 1, false);
          squares[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
          squares[i] = 'X';
          let score = minimax(squares, depth + 1, true);
          squares[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const getBestMove = (squares: (string | null)[], difficulty: Difficulty): number => {
    let availableMoves = squares.map((s, i) => s === null ? i : null).filter(s => s !== null) as number[];

    // Difficulty shaping
    const rand = Math.random();
    if (difficulty === 'easy' && rand < 0.6) {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
    if (difficulty === 'medium' && rand < 0.2) {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < 9; i++) {
      if (!squares[i]) {
        squares[i] = 'O';
        let score = minimax(squares, 0, false);
        squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const makeComputerMove = useCallback(() => {
    if (!gameState || gameState.status !== "playing" || gameState.turn !== "2") return;

    setTimeout(() => {
      const board = gameState.data.board;
      const bestMove = getBestMove([...board], gameState.difficulty);

      const newBoard = [...board];
      newBoard[bestMove] = "O";
      const winner = checkWinner(newBoard);

      updateGameState({
        data: { board: newBoard },
        status: winner ? "finished" : "playing",
        turn: "1",
        winner: winner || undefined,
      });
    }, 600);
  }, [gameState, updateGameState]);

  useEffect(() => {
    if (gameState?.turn === "2") {
      makeComputerMove();
    }
    if (gameState) {
        const insight = CoachingService.getInsight("tictactoe", gameState);
        setCoachingMsg(insight.message);
    }
  }, [gameState?.turn, gameState?.status]);

  if (!gameState || gameState.type !== "tictactoe") return null;

  const board = gameState.data.board;

  const handleClick = (i: number) => {
    if (board[i] || gameState.status === "finished" || gameState.turn !== "1") return;

    const newBoard = [...board];
    newBoard[i] = "X";
    const winner = checkWinner(newBoard);

    updateGameState({
      data: { board: newBoard },
      status: winner ? "finished" : "playing",
      turn: winner ? "1" : "2",
      winner: winner || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="max-w-md mx-auto flex items-center justify-between mb-8">
        <Link to="/" className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="text-center">
            <h1 className="text-xl font-bold">Tic Tac Toe</h1>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">{gameState.difficulty} Mode</p>
        </div>
        <button
          onClick={() => start(gameState.difficulty)}
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </header>

      <main className="max-w-md mx-auto">
        {/* Coaching Box */}
        <div className="bg-blue-600 rounded-2xl p-6 text-white mb-8 shadow-lg shadow-blue-200 flex items-start gap-4 transition-all">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">AI Coach</p>
            <p className="font-medium text-sm md:text-base">{coachingMsg}</p>
          </div>
        </div>

        {/* Board */}
        <div className="grid grid-cols-3 gap-3 bg-slate-200 p-3 rounded-3xl aspect-square shadow-inner relative overflow-hidden">
          {board.map((cell: string | null, i: number) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              disabled={gameState.status === "finished" || gameState.turn === "2"}
              className={cn(
                "bg-white rounded-2xl text-5xl font-bold flex items-center justify-center transition-all duration-200",
                !cell && gameState.status === "playing" && gameState.turn === "1" && "hover:bg-blue-50 active:scale-95 shadow-sm",
                cell === "X" && "text-blue-600",
                cell === "O" && "text-red-600",
                gameState.status === "finished" && "opacity-60"
              )}
            >
              {cell}
            </button>
          ))}
          {gameState.turn === "2" && gameState.status === "playing" && (
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] flex items-center justify-center">
               <div className="bg-white/80 px-4 py-2 rounded-full shadow-xl flex items-center gap-2">
                 <Monitor className="w-4 h-4 animate-pulse text-blue-600" />
                 <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Robot is thinking...</span>
               </div>
            </div>
          )}
        </div>

        {/* Difficulty Selectors */}
        {gameState.status === "finished" && (
           <div className="mt-8 flex flex-col gap-4">
              <div className="text-center animate-bounce">
                <p className="text-3xl font-black text-slate-900 italic">
                  {gameState.winner === "draw" ? "DRAW!" : (gameState.winner === 'X' ? "YOU WIN!" : "ROBOT WINS!")}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                 {(['easy', 'medium', 'hard'] as Difficulty[]).map(d => (
                   <button
                     key={d}
                     onClick={() => start(d)}
                     className={cn(
                       "py-3 rounded-xl font-bold text-sm uppercase transition-all",
                       gameState.difficulty === d ? "bg-blue-600 text-white shadow-lg" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                     )}
                   >
                     {d}
                   </button>
                 ))}
              </div>
           </div>
        )}

        {!gameState.status || gameState.status === "playing" && (
           <div className="mt-8 flex items-center justify-center gap-8">
              <div className={cn("flex flex-col items-center gap-2 transition-opacity", gameState.turn !== "1" && "opacity-30")}>
                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <User className="w-6 h-6" />
                 </div>
                 <span className="text-xs font-bold text-slate-500 uppercase">You (X)</span>
              </div>
              <div className="w-8 h-[2px] bg-slate-200" />
              <div className={cn("flex flex-col items-center gap-2 transition-opacity", gameState.turn !== "2" && "opacity-30")}>
                 <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <Monitor className="w-6 h-6" />
                 </div>
                 <span className="text-xs font-bold text-slate-500 uppercase">Robot (O)</span>
              </div>
           </div>
        )}
      </main>
    </div>
  );
}
