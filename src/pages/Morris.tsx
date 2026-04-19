import { useEffect, useState, useCallback } from "react";
import { useGame, Difficulty } from "../context/GameContext";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Brain, Trophy, LayoutGrid, Target } from "lucide-react";
import { cn } from "../lib/utils";
import { CoachingInsight, CoachingService } from "../lib/coaching-service";
import { motion, AnimatePresence } from "motion/react";
import { playMoveSound, playCaptureSound, playWinSound } from "../lib/audio";
import { GameSetup } from "../components/GameSetup";

type MorrisPlayer = "1" | "2";

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
  21: [9, 22], 22: [19, 21, 23], 23: [14, 22],
};

const mills = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [21, 22, 23], [18, 19, 20], [15, 16, 17],
  [0, 9, 21], [3, 10, 18], [6, 11, 15],
  [2, 14, 23], [5, 13, 20], [8, 12, 17],
  [1, 4, 7], [16, 19, 22], [9, 10, 11], [12, 13, 14],
];

function checkMill(board: (string | null)[], index: number) {
  const player = board[index];
  if (!player) return false;
  return mills.some((mill) => mill.includes(index) && mill.every((p) => board[p] === player));
}

function getCapturablePieces(board: (string | null)[], player: MorrisPlayer) {
  const pieces = board.map((v, i) => (v === player ? i : null)).filter((v): v is number => v !== null);
  const outside = pieces.filter((i) => !checkMill(board, i));
  return outside.length > 0 ? outside : pieces;
}

function getMovesForPiece(
  board: (string | null)[],
  piecesOnBoard: Record<MorrisPlayer, number>,
  index: number,
  player: MorrisPlayer
) {
  if (board[index] !== player) return [] as number[];
  if (piecesOnBoard[player] === 3) {
    return board.map((v, i) => (v === null ? i : null)).filter((v): v is number => v !== null);
  }
  return neighbors[index].filter((p) => board[p] === null);
}

function getAllMoves(
  board: (string | null)[],
  piecesOnBoard: Record<MorrisPlayer, number>,
  player: MorrisPlayer
) {
  return board.flatMap((v, i) => {
    if (v !== player) return [];
    return getMovesForPiece(board, piecesOnBoard, i, player).map((to) => ({ from: i, to }));
  });
}

// ── Smart bot ─────────────────────────────────────────────────────────────────

/** Count how many mills the player could complete from `index` (potential mills). */
function countPotentialMills(board: (string | null)[], index: number, player: MorrisPlayer): number {
  return mills.filter((mill) => {
    if (!mill.includes(index)) return false;
    const others = mill.filter((p) => p !== index);
    return others.every((p) => board[p] === player || board[p] === null) &&
           others.filter((p) => board[p] === player).length >= 1;
  }).length;
}

function scorePlacement(board: (string | null)[], index: number, player: MorrisPlayer): number {
  const opponent = player === "1" ? "2" : "1";
  let score = 0;

  // Immediately simulate the placement
  board[index] = player;
  if (checkMill(board, index)) score += 100;          // complete mill → capture immediately
  board[index] = null;

  // Count potential mills after placing
  board[index] = player;
  score += countPotentialMills(board, index, player) * 20;
  board[index] = null;

  // Block opponent's almost-complete mill
  board[index] = opponent;
  if (checkMill(board, index)) score += 60;           // blocking opponent mill
  board[index] = null;

  // Junction points are inherently valuable
  score += neighbors[index].length * 3;

  return score;
}

function scoreMovePhase(
  board: (string | null)[],
  piecesOnBoard: Record<MorrisPlayer, number>,
  from: number,
  to: number,
  player: MorrisPlayer
): number {
  let score = 0;
  const next = [...board];
  next[from] = null;
  next[to]   = player;
  if (checkMill(next, to))            score += 100;   // creates mill
  score += countPotentialMills(next, to, player) * 15;
  score += neighbors[to].length * 2;                  // prefer junctions
  if (piecesOnBoard[player] === 3) score += 5;        // flying — any move ok
  return score;
}

const DIFFICULTY_LABELS: Record<Difficulty, string> = { easy: "Easy", medium: "Medium", hard: "Hard", expert: "Expert" };

// ─────────────────────────────────────────────────────────────────────────────

export function Morris() {
  const { gameState, startNewGame, updateGameState, recordResult } = useGame();
  const [selected, setSelected]       = useState<number | null>(null);
  const [validMoves, setValidMoves]   = useState<number[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [coachingMsg, setCoachingMsg] = useState("Placement phase: Place your 9 pieces to form mills.");
  const [showResult, setShowResult]   = useState(false);
  const [difficulty, setDifficulty]   = useState<Difficulty>("medium");
  const [isBotThinking, setIsBotThinking] = useState(false);

  const start = useCallback((diff: Difficulty = difficulty) => {
    setDifficulty(diff);
    startNewGame("morris", "play", { difficulty: diff });
    setSelected(null);
    setValidMoves([]);
    setIsCapturing(false);
    setShowResult(false);
    setIsBotThinking(false);
  }, [difficulty, startNewGame]);

  const [showSetup, setShowSetup] = useState(true);

  useEffect(() => {
    start("medium");
  }, []);

  const handleStart = (diff: Difficulty) => {
    start(diff);
    setShowSetup(false);
  };

  const checkGameOver = useCallback((
    board: (string | null)[],
    piecesPlaced: Record<MorrisPlayer, number>,
    piecesOnBoard: Record<MorrisPlayer, number>,
    stage: "placement" | "moving"
  ) => {
    if (piecesPlaced["1"] === 9 && piecesOnBoard["1"] < 3) {
      updateGameState({ status: "finished", winner: "Robot" });
      recordResult?.("morris", false);
      setTimeout(() => setShowResult(true), 500);
      return;
    }
    if (piecesPlaced["2"] === 9 && piecesOnBoard["2"] < 3) {
      updateGameState({ status: "finished", winner: "Player" });
      recordResult?.("morris", true);
      playWinSound();
      setTimeout(() => setShowResult(true), 500);
      return;
    }
    if (stage === "moving") {
      if (getAllMoves(board, piecesOnBoard, "1").length === 0) {
        updateGameState({ status: "finished", winner: "Robot" });
        recordResult?.("morris", false);
        setTimeout(() => setShowResult(true), 500);
        return;
      }
      if (getAllMoves(board, piecesOnBoard, "2").length === 0) {
        updateGameState({ status: "finished", winner: "Player" });
        recordResult?.("morris", true);
        playWinSound();
        setTimeout(() => setShowResult(true), 500);
      }
    }
  }, [updateGameState, recordResult]);

  const attemptMovingPhaseMove = useCallback((source: number, destination: number) => {
    if (!gameState || gameState.status !== "playing" || gameState.turn !== "1") return;
    const board = gameState.data.board as (string | null)[];
    const piecesPlaced  = gameState.data.piecesPlaced  as Record<MorrisPlayer, number>;
    const piecesOnBoard = gameState.data.piecesOnBoard as Record<MorrisPlayer, number>;

    if (!getMovesForPiece(board, piecesOnBoard, source, "1").includes(destination)) return;

    const nextBoard = [...board];
    nextBoard[destination] = "1";
    nextBoard[source]      = null;
    const millCreated = checkMill(nextBoard, destination);
    playMoveSound();

    setSelected(null);
    setValidMoves([]);
    if (millCreated) {
      setIsCapturing(true);
      setCoachingMsg("Mill formed! Capture one of the highlighted robot pieces.");
    }

    updateGameState({ data: { ...gameState.data, board: nextBoard }, turn: millCreated ? "1" : "2" });
    if (!millCreated) setTimeout(() => checkGameOver(nextBoard, piecesPlaced, piecesOnBoard, "moving"), 100);
  }, [checkGameOver, gameState, updateGameState]);

  if (!gameState || gameState.status === "waiting" || gameState.type !== "morris") {
    return <GameSetup gameId="morris" gameName="Morabaraba" icon={<Target className="h-6 w-6"/>} onPlayBot={start as any} />;
  }

  const board        = gameState.data.board        as (string | null)[];
  const stage        = gameState.data.stage        as "placement" | "moving";
  const piecesPlaced = gameState.data.piecesPlaced  as Record<MorrisPlayer, number>;
  const piecesOnBoard= gameState.data.piecesOnBoard as Record<MorrisPlayer, number>;

  const handlePointClick = (i: number) => {
    if (!gameState || gameState.status !== "playing" || gameState.turn !== "1") return;

    // ── Capture mode ─────────────────────────────────────────────────────────
    if (isCapturing) {
      const capturable = getCapturablePieces(board, "2");
      if (!capturable.includes(i)) return;
      const nextBoard = [...board];
      nextBoard[i] = null;
      const nextOnBoard = { ...piecesOnBoard, "2": piecesOnBoard["2"] - 1 };
      setIsCapturing(false);
      playCaptureSound();
      setSelected(null);
      setValidMoves([]);
      updateGameState({ data: { ...gameState.data, board: nextBoard, piecesOnBoard: nextOnBoard }, turn: "2" });
      setTimeout(() => checkGameOver(nextBoard, piecesPlaced, nextOnBoard, stage), 100);
      return;
    }

    // ── Placement ─────────────────────────────────────────────────────────────
    if (stage === "placement") {
      if (board[i] !== null || piecesPlaced["1"] >= 9) return;
      const nextBoard    = [...board];
      nextBoard[i]       = "1";
      const nextPlaced   = { ...piecesPlaced,  "1": piecesPlaced["1"] + 1 };
      const nextOnBoard  = { ...piecesOnBoard, "1": piecesOnBoard["1"] + 1 };
      const nextStage    = nextPlaced["1"] === 9 && nextPlaced["2"] === 9 ? "moving" : "placement";
      const millCreated  = checkMill(nextBoard, i);
      playMoveSound();
      if (millCreated) {
        setIsCapturing(true);
        setCoachingMsg("Mill formed! Capture one of the highlighted robot pieces.");
      }
      updateGameState({ data: { ...gameState.data, board: nextBoard, piecesPlaced: nextPlaced, piecesOnBoard: nextOnBoard, stage: nextStage }, turn: millCreated ? "1" : "2" });
      if (!millCreated) setTimeout(() => checkGameOver(nextBoard, nextPlaced, nextOnBoard, nextStage), 100);
      return;
    }

    // ── Moving ────────────────────────────────────────────────────────────────
    if (selected === null) {
      const moves = getMovesForPiece(board, piecesOnBoard, i, "1");
      if (moves.length > 0) { setSelected(i); setValidMoves(moves); }
      return;
    }
    if (i === selected) { setSelected(null); setValidMoves([]); return; }
    if (board[i] === "1") {
      const moves = getMovesForPiece(board, piecesOnBoard, i, "1");
      if (moves.length > 0) { setSelected(i); setValidMoves(moves); }
      return;
    }
    if (!validMoves.includes(i)) { setSelected(null); setValidMoves([]); return; }
    attemptMovingPhaseMove(selected, i);
  };

  const makeComputerMove = useCallback(() => {
    if (!gameState || gameState.status !== "playing" || gameState.turn !== "2" || isCapturing) return;
    const delay = difficulty === "easy" ? 1200 : difficulty === "medium" ? 900 : 600;

    setIsBotThinking(true);
    setTimeout(() => {
      const board        = gameState.data.board        as (string | null)[];
      const stage        = gameState.data.stage        as "placement" | "moving";
      const piecesPlaced = gameState.data.piecesPlaced  as Record<MorrisPlayer, number>;
      const piecesOnBoard= gameState.data.piecesOnBoard as Record<MorrisPlayer, number>;

      if (stage === "placement") {
        const available = board.map((v, i) => (v === null ? i : null)).filter((v): v is number => v !== null);
        if (!available.length) { setIsBotThinking(false); return; }

        // Score each available point; add randomness for easy
        const scored = available.map((idx) => ({
          idx,
          score: scorePlacement([...board], idx, "2") + (difficulty === "easy" ? Math.random() * 30 : 0),
        }));
        scored.sort((a, b) => b.score - a.score);
        const move = scored[0].idx;

        const nextBoard   = [...board];
        nextBoard[move]   = "2";
        const nextPlaced  = { ...piecesPlaced,  "2": piecesPlaced["2"] + 1 };
        const nextOnBoard = { ...piecesOnBoard, "2": piecesOnBoard["2"] + 1 };
        const nextStage   = nextPlaced["1"] === 9 && nextPlaced["2"] === 9 ? "moving" : "placement";
        const millCreated = checkMill(nextBoard, move);

        if (millCreated) {
          const capturable = getCapturablePieces(nextBoard, "1");
          if (capturable.length > 0) {
            // Pick weakest / least strategic capture (most potential mills)
            const cap = capturable.sort((a, b) =>
              countPotentialMills(nextBoard, a, "1") - countPotentialMills(nextBoard, b, "1")
            )[0];
            nextBoard[cap] = null;
            nextOnBoard["1"] -= 1;
            playCaptureSound();
          } else {
            playMoveSound();
          }
        } else {
          playMoveSound();
        }

        updateGameState({ data: { ...gameState.data, board: nextBoard, piecesPlaced: nextPlaced, piecesOnBoard: nextOnBoard, stage: nextStage }, turn: "1" });
        setSelected(null); setValidMoves([]);
        setIsBotThinking(false);
        setTimeout(() => checkGameOver(nextBoard, nextPlaced, nextOnBoard, nextStage), 100);
        return;
      }

      // Moving phase
      const allMoves = getAllMoves(board, piecesOnBoard, "2");
      if (!allMoves.length) {
        updateGameState({ status: "finished", winner: "Player" });
        recordResult?.("morris", true);
        setIsBotThinking(false);
        setTimeout(() => setShowResult(true), 500);
        return;
      }

      // Score moves; add randomness for easy
      const scored = allMoves.map((m) => ({
        m,
        score: scoreMovePhase([...board], piecesOnBoard, m.from, m.to, "2") + (difficulty === "easy" ? Math.random() * 25 : 0),
      }));
      scored.sort((a, b) => b.score - a.score);
      const move = scored[0].m;

      const nextBoard = [...board];
      nextBoard[move.to]   = "2";
      nextBoard[move.from] = null;
      const nextOnBoard    = { ...piecesOnBoard };

      if (checkMill(nextBoard, move.to)) {
        const capturable = getCapturablePieces(nextBoard, "1");
        if (capturable.length > 0) {
          const cap = capturable.sort((a, b) =>
            countPotentialMills(nextBoard, a, "1") - countPotentialMills(nextBoard, b, "1")
          )[0];
          nextBoard[cap] = null;
          nextOnBoard["1"] -= 1;
          playCaptureSound();
        } else {
          playMoveSound();
        }
      } else {
        playMoveSound();
      }

      updateGameState({ data: { ...gameState.data, board: nextBoard, piecesOnBoard: nextOnBoard }, turn: "1" });
      setSelected(null); setValidMoves([]);
      setIsBotThinking(false);
      setTimeout(() => checkGameOver(nextBoard, piecesPlaced, nextOnBoard, "moving"), 100);
    }, delay);
  }, [gameState, difficulty, updateGameState, isCapturing, checkGameOver, recordResult]);

  useEffect(() => {
    if (gameState?.turn === "2" && !isBotThinking) makeComputerMove();
    if (!gameState) return;
    if (isCapturing) { setCoachingMsg("Mill formed! Capture one of the highlighted robot pieces."); return; }
    setCoachingMsg(CoachingService.getInsight("morris", gameState).message);
  }, [gameState, makeComputerMove, isCapturing, selected]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!gameState || gameState.type !== "morris") return null;

  const isGameOver    = gameState.status === "finished";
  const playerWon     = gameState.winner === "Player";
  const resultTone    = playerWon ? "bg-emerald-500" : gameState.status === "draw" ? "bg-sky-500" : "bg-rose-500";
  const resultEmoji   = playerWon ? "🏆" : gameState.status === "draw" ? "🤝" : "💀";
  const resultTitle   = playerWon ? "You Win" : gameState.status === "draw" ? "Draw" : "Bot Wins";

  const capturablePieces = new Set(isCapturing ? getCapturablePieces(gameState.data.board as (string | null)[], "2") : []);
  const selectablePieces = new Set(
    gameState.data.stage === "moving" && gameState.turn === "1"
      ? getAllMoves(gameState.data.board as (string | null)[], gameState.data.piecesOnBoard as Record<MorrisPlayer, number>, "1").map((m) => m.from)
      : []
  );
  const highlightedMoves    = validMoves;
  const highlightedSelected = selected;

  const pp = (gameState.data.piecesOnBoard as Record<string, number>)["1"] ?? 0;
  const bp = (gameState.data.piecesOnBoard as Record<string, number>)["2"] ?? 0;

  return (
    <>
    <div className={cn("min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center select-none overflow-x-hidden transition-all", showSetup && "blur-sm opacity-90")}>
      <header className="w-full max-w-md flex items-center justify-between mb-6">
        <Link to="/dashboard" className="p-2 hover:bg-slate-200 rounded-2xl transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="text-center">
          <h1 className="text-xl font-black italic uppercase tracking-tight">Morabaraba</h1>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
            {gameState.data.stage === "placement" ? "Placement phase" : "Moving phase"}
          </p>
        </div>
        <button onClick={() => start()} className="p-2 hover:bg-slate-200 rounded-2xl transition-colors">
          <RotateCcw className="w-6 h-6" />
        </button>
      </header>

      {/* Difficulty selector */}
      <div className="w-full max-w-md flex gap-2 mb-5">
        {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
          <button
            key={d}
            onClick={() => start(d)}
            className={cn(
              "flex-1 py-2 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all",
              difficulty === d
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-white text-slate-500 border border-slate-200 hover:border-emerald-300"
            )}
          >
            {DIFFICULTY_LABELS[d]}
          </button>
        ))}
      </div>

      <main className="w-full max-w-md">
        {/* Coach card */}
        <div className={cn(
          "rounded-[2rem] p-5 text-white mb-6 shadow-lg flex items-start gap-4 transition-colors duration-500",
          isCapturing ? "bg-red-600 shadow-red-200" : isGameOver ? "bg-slate-800" : "bg-emerald-600 shadow-emerald-200"
        )}>
          <Brain className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
              {isGameOver ? "Post-game coaching" : "Game coach"}
            </p>
            <p className="font-bold text-sm leading-relaxed">{coachingMsg}</p>
          </div>
        </div>

        {/* Placement progress bar */}
        {gameState.data.stage === "placement" && (
          <div className="mb-4 px-1">
            <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              <span>Your placement</span>
              <span>{(gameState.data.piecesPlaced as Record<string, number>)["1"] ?? 0}/9</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${(((gameState.data.piecesPlaced as Record<string, number>)["1"] ?? 0) / 9) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Board */}
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

          {positions.map((pos, i) => {
            const cell        = (gameState.data.board as (string | null)[])[i];
            const isSelectable = selectablePieces.has(i);
            const isValid      = highlightedMoves.includes(i);
            const isCapturable = capturablePieces.has(i);
            return (
              <button
                key={i}
                onClick={() => handlePointClick(i)}
                data-drag-target={i}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className={cn(
                  "absolute w-8 h-8 -ml-4 -mt-4 rounded-full z-10 transition-all duration-300 transform active:scale-90 flex items-center justify-center",
                  cell === null
                    ? "bg-amber-100/80 hover:bg-amber-200 shadow-inner border border-amber-200"
                    : cell === "1"
                      ? "bg-slate-900 border-2 border-slate-700 shadow-lg"
                      : "bg-white border-2 border-slate-300 shadow-lg",
                  isSelectable && selected === null && "ring-2 ring-blue-200 ring-offset-2",
                  (isValid || highlightedMoves.includes(i)) && "ring-4 ring-blue-400 ring-offset-2 scale-110",
                  isCapturable && "ring-4 ring-red-500 ring-offset-2 animate-pulse",
                  highlightedSelected === i && "ring-4 ring-blue-500 ring-offset-2"
                )}
              >
                {cell === "1" && (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="w-2 h-2 bg-slate-500 rounded-full opacity-30" />
                  </div>
                )}
              </button>
            );
          })}

          {/* Bot thinking overlay */}
          {isBotThinking && gameState.status === "playing" && (
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center rounded-3xl">
              <div className="bg-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0ms]" />
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:150ms]" />
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:300ms]" />
                <span className="text-xs font-bold text-slate-700 ml-1">Robot thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Drag ghost removed */}

        {/* Player strips with piece count */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className={cn("rounded-[1.5rem] bg-white p-4 text-center transition-all shadow-sm", gameState.turn === "1" && !isGameOver ? "ring-2 ring-blue-500 bg-blue-50/30 shadow-lg scale-105" : "opacity-60")}>
            <p className="text-[10px] text-slate-500 uppercase font-black">YOU</p>
            <p className="text-xl font-bold">
              {gameState.data.stage === "placement"
                ? `${9 - (gameState.data.piecesPlaced as Record<string,number>)["1"]} to place`
                : `${pp} on board`}
            </p>
          </div>
          <div className={cn("rounded-[1.5rem] bg-white p-4 text-center transition-all shadow-sm", gameState.turn === "2" && !isGameOver ? "ring-2 ring-red-500 bg-red-50/30 shadow-lg scale-105" : "opacity-60")}>
            <p className="text-[10px] text-slate-500 uppercase font-black">ROBOT</p>
            <p className="text-xl font-bold">
              {gameState.data.stage === "placement"
                ? `${9 - (gameState.data.piecesPlaced as Record<string,number>)["2"]} to place`
                : `${bp} on board`}
            </p>
          </div>
        </div>

        {isGameOver && !showResult && (
          <div className="mt-6 grid gap-3">
            <button onClick={() => start()} className="py-5 bg-emerald-600 text-white font-black uppercase tracking-[0.15em] rounded-[1.5rem] shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-3">
              <RotateCcw className="w-5 h-5" /> Rematch
            </button>
            <Link to="/play" className="py-4 bg-white border-2 border-slate-200 text-slate-600 font-black uppercase tracking-widest text-xs rounded-[1.5rem] hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-center">
              <LayoutGrid className="w-4 h-4" /> More games
            </Link>
          </div>
        )}
      </main>

      <AnimatePresence>
        {showResult && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.85, y: 80 }} animate={{ scale: 1, y: 0 }} className="max-w-md w-full bg-white rounded-[3rem] p-10 text-center shadow-[0_0_100px_rgba(0,0,0,0.45)] border-b-[12px] border-slate-100 relative overflow-hidden">
              <motion.div initial={{ rotate: -15, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", delay: 0.2, stiffness: 110 }} className={cn("w-28 h-28 mx-auto rounded-[2rem] flex items-center justify-center text-5xl shadow-2xl mb-6 border-4 border-white", resultTone, "text-white")}>
                {resultEmoji}
              </motion.div>
              <h2 className="text-5xl font-black italic tracking-tighter text-slate-900 leading-none mb-2">{resultTitle}</h2>
              <p className="text-slate-500 font-bold text-sm mb-4">{coachingMsg}</p>
              <div className="rounded-[1.5rem] bg-slate-50 p-4 mb-6 text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                  <Trophy className="w-3 h-3 inline mr-1" /> Coaching tip
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {playerWon
                    ? "You controlled the board well. In Morabaraba, you win by building mills and leaving the opponent with no good move."
                    : "Watch the connected lines. Once placement ends, every move must follow a line unless you're flying (3 pieces left)."}
                </p>
              </div>
              <div className="grid gap-3">
                <button onClick={() => start()} className="py-5 bg-emerald-600 text-white font-black uppercase tracking-[0.2em] rounded-[1.5rem] shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-3">
                  <RotateCcw className="w-5 h-5" /> Rematch
                </button>
                <button onClick={() => setShowResult(false)} className="py-4 bg-slate-100 text-slate-600 font-black rounded-[1.5rem] hover:bg-slate-200 transition-all uppercase tracking-widest text-xs">
                  Review board
                </button>
                <Link to="/play" className="py-4 bg-white border-2 border-slate-100 text-slate-400 font-black rounded-[1.5rem] hover:bg-slate-50 transition-all uppercase tracking-widest text-xs text-center">
                  More games
                </Link>
              </div>
              <div className="absolute -left-6 -top-6 text-8xl text-slate-50 font-black rotate-12 opacity-50 select-none">◎</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    <AnimatePresence>
      {showSetup && <GameSetup gameId="morris" gameName="Morabaraba" icon={<LayoutGrid className="h-6 w-6"/>} onPlayBot={handleStart} />}
    </AnimatePresence>
    </>
  );
}
