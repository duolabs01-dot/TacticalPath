import { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, HelpCircle, AlertCircle, LayoutGrid } from "lucide-react";
import { useGameContext } from "../context/GameContext";
import { GameSetup } from "../components/GameSetup";
import { CoachingInsight, CoachingService } from "../lib/coaching-service";
import { motion, AnimatePresence } from "motion/react";
import { playMoveSound, playCaptureSound, playWinSound } from "../lib/audio";
import { createEmptyBoard, checkWin, getValidMoves, applyMove, getBotMoveFour, FourBoard, COLS, ROWS, getIndex } from "../utils/fourinarow";
import { useProgress } from "../hooks/useProgress";

export function FourInARow() {
  const { gameState, startNewGame, updateGameState } = useGameContext();
  const { recordResult } = useProgress();
  const [showResult, setShowResult] = useState(false);
  const [coachingMsg, setCoachingMsg] = useState("");
  const [isBotThinking, setIsBotThinking] = useState(false);

  const start = useCallback((diff: "easy" | "medium" | "hard" | "expert") => {
    startNewGame("fourinarow", "play", { difficulty: diff, data: { board: createEmptyBoard() } });
    setShowResult(false);
    setCoachingMsg("Drop your first piece in the center column. It gives the most connections!");
  }, [startNewGame]);

  const checkGameEnd = useCallback((board: FourBoard) => {
    if (checkWin(board, "1")) {
      updateGameState({ status: "finished", winner: "Player" });
      recordResult?.("fourinarow", true);
      playWinSound();
      setTimeout(() => setShowResult(true), 500);
      return true;
    }
    if (checkWin(board, "2")) {
      updateGameState({ status: "finished", winner: "Robot" });
      recordResult?.("fourinarow", false);
      setTimeout(() => setShowResult(true), 500);
      return true;
    }
    if (getValidMoves(board).length === 0) {
      updateGameState({ status: "finished", winner: "draw" });
      setTimeout(() => setShowResult(true), 500);
      return true;
    }
    return false;
  }, [updateGameState, recordResult]);

  const handleColClick = (col: number) => {
    if (!gameState || gameState.status !== "playing" || gameState.turn !== "1" || isBotThinking) return;
    const board = gameState.data.board as FourBoard;
    if (!getValidMoves(board).includes(col)) return;

    const nextBoard = applyMove(board, col, "1");
    playMoveSound();

    if (checkGameEnd(nextBoard)) {
       updateGameState({ data: { board: nextBoard } });
       return;
    }

    updateGameState({ data: { board: nextBoard }, turn: "2" });
    setCoachingMsg("Watch out for potential setups!");
  };

  const makeComputerMove = useCallback(() => {
    if (!gameState || gameState.status !== "playing" || gameState.turn !== "2") return;
    setIsBotThinking(true);
    
    // Scale delay by difficulty
    const diff = gameState.difficulty;
    const delay = diff === "easy" ? 600 : diff === "medium" ? 800 : 1000;

    setTimeout(() => {
      const board = gameState.data.board as FourBoard;
      const col = getBotMoveFour(board, diff as any);
      
      if (col === -1) return; // Draw

      const nextBoard = applyMove(board, col, "2");
      playMoveSound();

      if (checkGameEnd(nextBoard)) {
        updateGameState({ data: { board: nextBoard } });
        setIsBotThinking(false);
        return;
      }
      
      updateGameState({ data: { board: nextBoard }, turn: "1" });
      setIsBotThinking(false);
    }, delay);
  }, [gameState, checkGameEnd, updateGameState]);

  useEffect(() => {
    makeComputerMove();
  }, [gameState?.turn, makeComputerMove]); // trigger when turn changes

  if (!gameState || gameState.status === "waiting" || gameState.type !== "fourinarow") {
    return <GameSetup gameId="fourinarow" gameName="Four in Row" icon={<LayoutGrid className="w-6 h-6" />} onPlayBot={start} />;
  }

  const resultWin = gameState.status === "finished" && gameState.winner === "Player";
  const resultLoss = gameState.status === "finished" && gameState.winner === "Robot";
  const board = gameState.data.board as FourBoard;

  return (
    <div className="mx-auto max-w-lg px-4 py-6 md:py-8">
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/play" className="rounded-2xl bg-white p-3 shadow-sm transition hover:bg-slate-50">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Four in a Row</h1>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              VS Robot ({gameState.difficulty})
            </p>
          </div>
        </div>
      </header>

      <div className="relative mb-8 aspect-[7/6] w-full max-w-[500px] mx-auto overflow-hidden rounded-[2rem] bg-blue-600 p-3 shadow-xl">
        <div className="grid h-full w-full grid-cols-7 grid-rows-6 gap-2">
          {/* Render visually top to bottom -> row 5 to 0 */}
          {[...Array(ROWS)].map((_, rowIndexVisual) => {
             const r = ROWS - 1 - rowIndexVisual; // 5 down to 0
             return [...Array(COLS)].map((_, c) => {
               const cell = board[getIndex(c, r)];
               return (
                 <button
                   key={`cell-${c}-${r}`}
                   onClick={() => handleColClick(c)}
                   disabled={gameState.status !== "playing" || gameState.turn !== "1"}
                   className="relative flex items-center justify-center rounded-full bg-blue-800 shadow-inner group"
                 >
                   <AnimatePresence>
                     {cell && (
                        <motion.div
                          initial={{ y: -300, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                          className={`absolute inset-[10%] rounded-full shadow-md ${cell === "1" ? "bg-rose-500" : "bg-amber-400"}`}
                        />
                     )}
                   </AnimatePresence>
                   {/* Hover indicator for human turn */}
                   {!cell && gameState.turn === "1" && gameState.status === "playing" && (
                      <div className="absolute inset-[20%] rounded-full bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
                   )}
                 </button>
               )
             });
          })}
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/80 p-8 backdrop-blur"
            >
              <div className="text-center text-white">
                <p className="mb-4 text-7xl">{resultWin ? "🏆" : resultLoss ? "💀" : "🤝"}</p>
                <h2 className="mb-6 text-4xl font-black italic">{resultWin ? "Victory!" : resultLoss ? "Defeat" : "Draw"}</h2>
                <button
                  onClick={() => start(gameState.difficulty as any)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-base font-black text-slate-900 hover:bg-slate-100"
                >
                  <RotateCcw className="h-5 w-5" /> Play Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!showResult && (
        <div className="flex gap-4">
          <div className="flex flex-1 items-start gap-4 rounded-[2rem] bg-indigo-50 p-6 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-200 text-indigo-700">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-indigo-900">Coach Insight</h3>
              <p className="mt-2 text-sm leading-relaxed text-indigo-800">{coachingMsg}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
