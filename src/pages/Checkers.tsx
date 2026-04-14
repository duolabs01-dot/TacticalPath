import { useEffect, useState, useCallback } from "react";
import { useGame, Difficulty } from "../context/GameContext";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Brain, User, Monitor } from "lucide-react";
import { cn } from "../lib/utils";
import { CoachingService } from "../lib/coaching-service";

export function Checkers() {
  const { gameState, startNewGame, updateGameState } = useGame();
  const [selected, setSelected] = useState<number | null>(null);
  const [validMoves, setValidMoves] = useState<number[]>([]);
  const [coachingMsg, setCoachingMsg] = useState("Your turn! Jump over opponent pieces to capture them.");

  const start = useCallback((diff: Difficulty = 'medium') => {
    startNewGame("checkers", "play", { difficulty: diff });
    setSelected(null);
    setValidMoves([]);
  }, [startNewGame]);

  useEffect(() => {
    start();
  }, []);

  const getPieceMoves = (board: number[], index: number, isPlayer: boolean) => {
    const moves: { to: number; capture: number | null }[] = [];
    const piece = board[index];
    const row = Math.floor(index / 8);
    const col = index % 8;
    const directions = [];

    if (piece === 1 || piece === 11 || piece === 22) directions.push({ dr: -1, dc: -1 }, { dr: -1, dc: 1 }); // Player (Red) moves up
    if (piece === 2 || piece === 22 || piece === 11) directions.push({ dr: 1, dc: -1 }, { dr: 1, dc: 1 });   // Robot (Black) moves down

    directions.forEach(({ dr, dc }) => {
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
        const target = nr * 8 + nc;
        if (board[target] === 0) {
          moves.push({ to: target, capture: null });
        } else {
          // Check for jump
          const tr = nr + dr;
          const tc = nc + dc;
          if (tr >= 0 && tr < 8 && tc >= 0 && tc < 8) {
            const jumpTarget = tr * 8 + tc;
            const targetPiece = board[target];
            const isEnemy = isPlayer ? (targetPiece === 2 || targetPiece === 22) : (targetPiece === 1 || targetPiece === 11);
            if (board[jumpTarget] === 0 && isEnemy) {
              moves.push({ to: jumpTarget, capture: target });
            }
          }
        }
      }
    });

    return moves;
  };

  const getAllValidMoves = (board: number[], isPlayer: boolean) => {
      const allMoves: { from: number; to: number; capture: number | null }[] = [];
      board.forEach((p, i) => {
          if (p === 0) return;
          const isPiecePlayer = (p === 1 || p === 11);
          if (isPiecePlayer === isPlayer) {
              const moves = getPieceMoves(board, i, isPlayer);
              moves.forEach(m => allMoves.push({ from: i, ...m }));
          }
      });
      // Force jumps if available
      const jumps = allMoves.filter(m => m.capture !== null);
      return jumps.length > 0 ? jumps : allMoves;
  };

  const handleCellClick = (i: number) => {
    if (!gameState || gameState.status !== "playing" || gameState.turn !== "1") return;
    const board = gameState.data.board;

    if (selected === null) {
      if (board[i] === 1 || board[i] === 11) {
        setSelected(i);
        const moves = getPieceMoves(board, i, true);
        setValidMoves(moves.map(m => m.to));
      }
    } else {
      const moves = getPieceMoves(board, selected, true);
      const move = moves.find(m => m.to === i);

      if (move) {
        const newBoard = [...board];
        let piece = board[selected];
        // Kinging
        if (Math.floor(i / 8) === 0) piece = 11;

        newBoard[i] = piece;
        newBoard[selected] = 0;
        if (move.capture !== null) newBoard[move.capture] = 0;

        updateGameState({
          data: { board: newBoard },
          turn: "2",
        });
      }
      setSelected(null);
      setValidMoves([]);
    }
  };

  const makeComputerMove = useCallback(() => {
      if (!gameState || gameState.status !== "playing" || gameState.turn !== "2") return;

      setTimeout(() => {
          const board = gameState.data.board;
          const moves = getAllValidMoves(board, false);

          if (moves.length === 0) {
              updateGameState({ status: 'finished', winner: 'Player' });
              return;
          }

          // Random move for now (Minimax to be added in next pass)
          const move = moves[Math.floor(Math.random() * moves.length)];
          const newBoard = [...board];
          let piece = board[move.from];
          // Kinging
          if (Math.floor(move.to / 8) === 7) piece = 22;

          newBoard[move.to] = piece;
          newBoard[move.from] = 0;
          if (move.capture !== null) newBoard[move.capture] = 0;

          updateGameState({
              data: { board: newBoard },
              turn: "1"
          });
      }, 800);
  }, [gameState, updateGameState]);

  useEffect(() => {
      if (gameState?.turn === "2") makeComputerMove();
      if (gameState) {
          const insight = CoachingService.getInsight("checkers", gameState);
          setCoachingMsg(insight.message);
      }
  }, [gameState?.turn]);

  if (!gameState || gameState.type !== "checkers") return null;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-md flex items-center justify-between mb-8">
        <Link to="/" className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Checkers</h1>
        <button onClick={() => start()} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <RotateCcw className="w-6 h-6" />
        </button>
      </header>

      <main className="w-full max-w-md">
        <div className="bg-blue-600 rounded-2xl p-6 text-white mb-8 shadow-lg shadow-blue-200 flex items-start gap-4">
          <Brain className="w-6 h-6 shrink-0" />
          <div>
            <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">AI Coach</p>
            <p className="font-medium text-sm">{coachingMsg}</p>
          </div>
        </div>

        <div className="grid grid-cols-8 aspect-square bg-slate-800 p-2 rounded-xl shadow-2xl border-4 border-slate-700 relative overflow-hidden">
          {gameState.data.board.map((cell: number, i: number) => {
            const row = Math.floor(i / 8);
            const col = i % 8;
            const isDark = (row + col) % 2 === 1;
            const isValid = validMoves.includes(i);

            return (
              <button
                key={i}
                onClick={() => handleCellClick(i)}
                className={cn(
                  "flex items-center justify-center relative transition-all",
                  isDark ? "bg-slate-700" : "bg-orange-50",
                  selected === i && "bg-blue-900/50",
                  isValid && "after:content-[''] after:w-4 after:h-4 after:bg-blue-400/50 after:rounded-full"
                )}
              >
                {cell !== 0 && (
                  <div className={cn(
                    "w-4/5 h-4/5 rounded-full shadow-lg border-b-4 transform active:scale-95 transition-transform flex items-center justify-center",
                    (cell === 1 || cell === 11) ? "bg-red-500 border-red-700" : "bg-slate-900 border-black"
                  )}>
                     {(cell === 11 || cell === 22) && <div className="text-white text-[10px]">👑</div>}
                  </div>
                )}
              </button>
            );
          })}
          {gameState.turn === "2" && gameState.status === "playing" && (
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center">
                <div className="bg-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2">
                    <Monitor className="w-4 h-4 animate-pulse text-blue-600" />
                    <span className="text-xs font-bold text-slate-700">Robot is thinking...</span>
                </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between w-full px-4">
           <div className={cn("flex items-center gap-3", gameState.turn !== "1" && "opacity-40")}>
              <div className="w-10 h-10 bg-red-500 rounded-full border-b-4 border-red-700" />
              <span className="font-bold text-slate-600">YOU</span>
           </div>
           <div className={cn("flex items-center gap-3", gameState.turn !== "2" && "opacity-40")}>
              <span className="font-bold text-slate-600">ROBOT</span>
              <div className="w-10 h-10 bg-slate-900 rounded-full border-b-4 border-black" />
           </div>
        </div>
      </main>
    </div>
  );
}
