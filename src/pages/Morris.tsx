import { useEffect, useState, useCallback } from "react";
import { useGame, Difficulty } from "../context/GameContext";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Brain, User, Monitor } from "lucide-react";
import { cn } from "../lib/utils";
import { CoachingService } from "../lib/coaching-service";

const positions = [
  { x: 10, y: 10 }, { x: 50, y: 10 }, { x: 90, y: 10 },
  { x: 23, y: 23 }, { x: 50, y: 23 }, { x: 77, y: 23 },
  { x: 37, y: 37 }, { x: 50, y: 37 }, { x: 63, y: 37 },
  { x: 10, y: 50 }, { x: 23, y: 50 }, { x: 37, y: 50 },
  { x: 63, y: 50 }, { x: 77, y: 50 }, { x: 90, y: 50 },
  { x: 37, y: 63 }, { x: 50, y: 63 }, { x: 63, y: 63 },
  { x: 23, y: 77 }, { x: 50, y: 77 }, { x: 77, y: 77 },
  { x: 10, y: 90 }, { x: 50, y: 90 }, { x: 90, y: 90 },
];

const neighbors: Record<number, number[]> = {
  0: [1, 9], 1: [0, 2, 4], 2: [1, 14],
  3: [4, 10], 4: [1, 3, 5, 7], 5: [4, 13],
  6: [7, 11], 7: [4, 6, 8], 8: [7, 12],
  9: [0, 10, 21], 10: [3, 9, 11, 18], 11: [6, 10, 15],
  12: [8, 13, 17], 13: [5, 12, 14, 20], 14: [2, 13, 23],
  15: [11, 16], 16: [15, 17, 19], 17: [12, 16],
  18: [10, 19], 19: [16, 18, 20, 22], 20: [13, 19],
  21: [9, 22], 22: [19, 21, 23], 23: [14, 22]
};

const mills = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [21, 22, 23], [18, 19, 20], [15, 16, 17],
  [0, 9, 21], [3, 10, 18], [6, 11, 15],
  [2, 14, 23], [5, 13, 20], [8, 12, 17],
  [1, 4, 7], [16, 19, 22], [9, 10, 11], [12, 13, 14]
];

export function Morris() {
  const { gameState, startNewGame, updateGameState } = useGame();
  const [selected, setSelected] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [coachingMsg, setCoachingMsg] = useState("Placement phase: Place your 9 pieces to form mills.");

  const start = useCallback((diff: Difficulty = 'medium') => {
    startNewGame("morris", "play", { difficulty: diff });
    setSelected(null);
    setIsCapturing(false);
  }, [startNewGame]);

  useEffect(() => {
    start();
  }, []);

  const checkMill = (board: (string | null)[], index: number) => {
    const player = board[index];
    if (!player) return false;
    return mills.some(mill => mill.includes(index) && mill.every(i => board[i] === player));
  };

  const handlePointClick = (i: number) => {
    if (!gameState || gameState.status !== "playing" || gameState.turn !== "1") return;
    const board = gameState.data.board;

    if (isCapturing) {
      if (board[i] === "2" && !checkMill(board, i)) {
        const newBoard = [...board];
        newBoard[i] = null;
        setIsCapturing(false);
        updateGameState({ data: { ...gameState.data, board: newBoard }, turn: "2" });
      }
      return;
    }

    if (gameState.data.stage === "placement") {
      if (board[i] === null && gameState.data.piecesPlaced["1"] < 9) {
        const newBoard = [...board];
        newBoard[i] = "1";
        const newPlaced = { ...gameState.data.piecesPlaced };
        newPlaced["1"]++;

        const millCreated = checkMill(newBoard, i);
        const nextStage = newPlaced["1"] === 9 && newPlaced["2"] === 9 ? "moving" : "placement";

        if (millCreated) {
           setIsCapturing(true);
           setCoachingMsg("Mill formed! Capture an opponent's piece.");
        }

        updateGameState({
          data: { ...gameState.data, board: newBoard, piecesPlaced: newPlaced, stage: nextStage },
          turn: millCreated ? "1" : "2",
        });
      }
    } else if (gameState.data.stage === "moving") {
        if (selected === null) {
            if (board[i] === "1") setSelected(i);
        } else {
            if (board[i] === null && (neighbors[selected].includes(i) || gameState.data.piecesOnBoard["1"] === 3)) {
                const newBoard = [...board];
                newBoard[i] = "1";
                newBoard[selected] = 0;
                // ... logic ...
            }
            setSelected(null);
        }
    }
  };

  const makeComputerMove = useCallback(() => {
      if (!gameState || gameState.status !== "playing" || gameState.turn !== "2" || isCapturing) return;

      setTimeout(() => {
          const board = gameState.data.board;
          if (gameState.data.stage === "placement") {
              const available = board.map((v, i) => v === null ? i : null).filter(v => v !== null) as number[];
              const move = available[Math.floor(Math.random() * available.length)];
              const newBoard = [...board];
              newBoard[move] = "2";
              const newPlaced = { ...gameState.data.piecesPlaced };
              newPlaced["2"]++;
              const millCreated = checkMill(newBoard, move);

              if (millCreated) {
                  // AI Capture
                  const enemyPieces = newBoard.map((v, i) => v === "1" && !checkMill(newBoard, i) ? i : null).filter(v => v !== null) as number[];
                  if (enemyPieces.length > 0) {
                      newBoard[enemyPieces[0]] = null;
                  }
              }

              updateGameState({
                  data: { ...gameState.data, board: newBoard, piecesPlaced: newPlaced },
                  turn: "1"
              });
          }
      }, 1000);
  }, [gameState, updateGameState, isCapturing]);

  useEffect(() => {
      if (gameState?.turn === "2") makeComputerMove();
      if (gameState) {
          const insight = CoachingService.getInsight("morris", gameState);
          if (!isCapturing) setCoachingMsg(insight.message);
      }
  }, [gameState?.turn, isCapturing]);

  if (!gameState || gameState.type !== "morris") return null;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-md flex items-center justify-between mb-8">
        <Link to="/" className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold italic">Mlabalaba</h1>
        <button onClick={() => start()} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <RotateCcw className="w-6 h-6" />
        </button>
      </header>

      <main className="w-full max-w-md">
        <div className={cn(
            "rounded-2xl p-6 text-white mb-8 shadow-lg flex items-start gap-4 transition-colors duration-500",
            isCapturing ? "bg-red-600 shadow-red-200" : "bg-blue-600 shadow-blue-200"
        )}>
          <Brain className="w-6 h-6 shrink-0" />
          <div>
            <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">AI Coach</p>
            <p className="font-medium text-sm">{coachingMsg}</p>
          </div>
        </div>

        <div className="relative aspect-square bg-amber-50 rounded-3xl border-4 border-amber-200 shadow-xl p-4 overflow-hidden">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full stroke-amber-800 stroke-[0.8] fill-none opacity-40">
            <rect x="10" y="10" width="80" height="80" />
            <rect x="23" y="23" width="54" height="54" />
            <rect x="37" y="37" width="26" height="26" />
            <line x1="50" y1="10" x2="50" y2="37" />
            <line x1="50" y1="63" x2="50" y2="90" />
            <line x1="10" y1="50" x2="37" y2="50" />
            <line x1="63" y1="50" x2="90" y2="50" />
          </svg>

          {positions.map((pos, i) => (
            <button
              key={i}
              onClick={() => handlePointClick(i)}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className={cn(
                "absolute w-8 h-8 -ml-4 -mt-4 rounded-full z-10 transition-all duration-300 transform active:scale-90 flex items-center justify-center",
                gameState.data.board[i] === null ? "bg-amber-100/80 hover:bg-amber-200 shadow-inner border border-amber-200" : (
                  gameState.data.board[i] === "1" ? "bg-slate-900 border-2 border-slate-700 shadow-lg" : "bg-white border-2 border-slate-300 shadow-lg"
                ),
                isCapturing && gameState.data.board[i] === "2" && "ring-4 ring-red-500 ring-offset-2 animate-pulse"
              )}
            >
               {gameState.data.board[i] === "1" && <div className="w-2 h-2 bg-slate-500 rounded-full opacity-30" />}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
           <div className={cn("card p-4 text-center transition-all", gameState.turn === "1" ? "border-blue-500 bg-blue-50/30" : "opacity-50")}>
             <p className="text-[10px] text-slate-500 uppercase font-black">YOU</p>
             <p className="text-xl font-bold">{9 - gameState.data.piecesPlaced["1"]} to place</p>
           </div>
           <div className={cn("card p-4 text-center transition-all", gameState.turn === "2" ? "border-red-500 bg-red-50/30" : "opacity-50")}>
             <p className="text-[10px] text-slate-500 uppercase font-black">ROBOT</p>
             <p className="text-xl font-bold">{9 - gameState.data.piecesPlaced["2"]} to place</p>
           </div>
        </div>
      </main>
    </div>
  );
}
