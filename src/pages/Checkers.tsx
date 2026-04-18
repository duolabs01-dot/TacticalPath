import { useEffect, useState, useCallback } from "react";
import { useGame, Difficulty } from "../context/GameContext";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Brain, Monitor, Trophy, LayoutGrid } from "lucide-react";
import { cn } from "../lib/utils";
import { CoachingService } from "../lib/coaching-service";
import { motion, AnimatePresence } from "motion/react";
import { useBoardDrag } from "../hooks/useBoardDrag";

type CheckersMove = { from: number; to: number; capture: number | null };

const PLAYER_MAN  = 1;
const BOT_MAN     = 2;
const PLAYER_KING = 11;
const BOT_KING    = 22;

function isPlayerPiece(piece: number) { return piece === PLAYER_MAN  || piece === PLAYER_KING; }
function isBotPiece  (piece: number) { return piece === BOT_MAN    || piece === BOT_KING;   }

function getDirections(piece: number) {
  const dirs: Array<{ dr: number; dc: number }> = [];
  if (piece === PLAYER_MAN || piece === PLAYER_KING || piece === BOT_KING)  dirs.push({ dr: -1, dc: -1 }, { dr: -1, dc: 1 });
  if (piece === BOT_MAN    || piece === PLAYER_KING || piece === BOT_KING)  dirs.push({ dr:  1, dc: -1 }, { dr:  1, dc: 1 });
  return dirs;
}

function getPieceMoves(board: number[], index: number) {
  const piece = board[index];
  if (piece === 0) return [] as Array<{ to: number; capture: number | null }>;
  const moves: Array<{ to: number; capture: number | null }> = [];
  const row = Math.floor(index / 8);
  const col = index % 8;

  getDirections(piece).forEach(({ dr, dc }) => {
    const nr = row + dr; const nc = col + dc;
    if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) return;
    const ni = nr * 8 + nc;
    if (board[ni] === 0) { moves.push({ to: ni, capture: null }); return; }

    const jr = nr + dr; const jc = nc + dc;
    if (jr < 0 || jr >= 8 || jc < 0 || jc >= 8) return;
    const ji = jr * 8 + jc;
    const isEnemy = isPlayerPiece(piece) ? isBotPiece(board[ni]) : isPlayerPiece(board[ni]);
    if (board[ji] === 0 && isEnemy) moves.push({ to: ji, capture: ni });
  });
  return moves;
}

function getAllValidMoves(board: number[], isPlayer: boolean) {
  const all: CheckersMove[] = [];
  board.forEach((piece, index) => {
    if (!piece) return;
    if (isPlayer ? !isPlayerPiece(piece) : !isBotPiece(piece)) return;
    getPieceMoves(board, index).forEach((m) => all.push({ from: index, ...m }));
  });
  const jumps = all.filter((m) => m.capture !== null);
  return jumps.length > 0 ? jumps : all;
}

function getMovesForPiece(board: number[], index: number, isPlayer: boolean) {
  return getAllValidMoves(board, isPlayer).filter((m) => m.from === index);
}

function applyMove(board: number[], move: CheckersMove) {
  const next = [...board];
  const orig = board[move.from];
  let landed = orig;
  let becameKing = false;
  const targetRow = Math.floor(move.to / 8);
  if (orig === PLAYER_MAN && targetRow === 0) { landed = PLAYER_KING; becameKing = true; }
  if (orig === BOT_MAN    && targetRow === 7) { landed = BOT_KING;    becameKing = true; }
  next[move.to]   = landed;
  next[move.from] = 0;
  if (move.capture !== null) next[move.capture] = 0;
  return { board: next, landedPiece: landed, becameKing };
}

// ── Smart bot helpers ──────────────────────────────────────────────────────────

function scoreBotMove(board: number[], move: CheckersMove): number {
  let score = 0;
  if (move.capture !== null) score += 10;                       // prefer captures
  const { board: nextBoard, becameKing } = applyMove(board, move);
  if (becameKing) score += 8;                                   // prefer promotions
  // Count follow-up jumps (chain captures worth more)
  const chains = getPieceMoves(nextBoard, move.to).filter((m) => m.capture !== null);
  score += chains.length * 6;
  // Prefer advancing toward promotion row (row 0)
  const toRow = Math.floor(move.to / 8);
  score += (7 - toRow);                                         // lower row = closer to promotion
  return score;
}

function getBotMove(board: number[]): CheckersMove | null {
  const moves = getAllValidMoves(board, false);
  if (!moves.length) return null;
  // Score each move; pick best, break ties randomly
  const scored = moves.map((m) => ({ m, s: scoreBotMove(board, m) }));
  scored.sort((a, b) => b.s - a.s);
  const best = scored[0].s;
  const topMoves = scored.filter((x) => x.s >= best - 1);
  return topMoves[Math.floor(Math.random() * topMoves.length)].m;
}

// ─────────────────────────────────────────────────────────────────────────────

const DIFFICULTY_LABELS: Record<Difficulty, string> = { easy: "Easy", medium: "Medium", hard: "Hard" };

export function Checkers() {
  const { gameState, startNewGame, updateGameState, recordResult } = useGame();
  const [selected, setSelected]       = useState<number | null>(null);
  const [validMoves, setValidMoves]   = useState<number[]>([]);
  const [forcedSource, setForcedSource] = useState<number | null>(null);
  const [coachingMsg, setCoachingMsg] = useState("Your turn! Jump over opponent pieces to capture them.");
  const [showResult, setShowResult]   = useState(false);
  const [difficulty, setDifficulty]   = useState<Difficulty>("medium");
  const [kingFlash, setKingFlash]     = useState<number | null>(null);

  const start = useCallback((diff: Difficulty = difficulty) => {
    setDifficulty(diff);
    startNewGame("checkers", "play", { difficulty: diff });
    setSelected(null);
    setValidMoves([]);
    setForcedSource(null);
    setShowResult(false);
    setKingFlash(null);
  }, [difficulty, startNewGame]);

  useEffect(() => { start(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkGameEnd = useCallback((board: number[]) => {
    const pp = board.filter(isPlayerPiece).length;
    const bp = board.filter(isBotPiece).length;
    const pm = getAllValidMoves(board, true);
    const bm = getAllValidMoves(board, false);

    if (pp === 0 || pm.length === 0) {
      updateGameState({ status: "finished", winner: "Robot" });
      recordResult?.("checkers", false);
      setTimeout(() => setShowResult(true), 500);
    } else if (bp === 0 || bm.length === 0) {
      updateGameState({ status: "finished", winner: "Player" });
      recordResult?.("checkers", true);
      setTimeout(() => setShowResult(true), 500);
    }
  }, [updateGameState, recordResult]);

  const attemptPlayerMove = useCallback((source: number, destination: number) => {
    if (!gameState || gameState.status !== "playing" || gameState.turn !== "1") return;
    if (forcedSource !== null && source !== forcedSource) return;

    const board = gameState.data.board as number[];
    const moves = getMovesForPiece(board, source, true);
    const move  = moves.find((c) => c.to === destination);
    if (!move) return;

    const { board: nextBoard, becameKing } = applyMove(board, move);

    if (becameKing) {
      setKingFlash(destination);
      setTimeout(() => setKingFlash(null), 700);
    }

    if (move.capture !== null && !becameKing) {
      const followUps = getPieceMoves(nextBoard, move.to)
        .filter((c) => c.capture !== null)
        .map((c) => ({ from: move.to, ...c }));

      if (followUps.length > 0) {
        updateGameState({ data: { board: nextBoard }, turn: "1" });
        setForcedSource(move.to);
        setSelected(move.to);
        setValidMoves(followUps.map((c) => c.to));
        setCoachingMsg("Keep jumping — a capture chain is part of the same turn.");
        setTimeout(() => checkGameEnd(nextBoard), 100);
        return;
      }
    }

    updateGameState({ data: { board: nextBoard }, turn: "2" });
    setForcedSource(null);
    setSelected(null);
    setValidMoves([]);
    setTimeout(() => checkGameEnd(nextBoard), 100);
  }, [checkGameEnd, forcedSource, gameState, updateGameState]);

  const { dragState, startDrag, shouldSuppressClick } = useBoardDrag({
    enabled: Boolean(gameState?.status === "playing" && gameState?.turn === "1"),
    getValidTargets: (source) => {
      if (!gameState) return [];
      if (forcedSource !== null && source !== forcedSource) return [];
      return getMovesForPiece(gameState.data.board as number[], source, true).map((m) => m.to);
    },
    onDrop: (source, target) => attemptPlayerMove(source, target),
  });

  const handleCellClick = (i: number) => {
    if (shouldSuppressClick()) return;
    if (!gameState || gameState.status !== "playing" || gameState.turn !== "1") return;
    const board = gameState.data.board as number[];
    const piece = board[i];
    const selectable = new Set(
      forcedSource !== null ? [forcedSource] : getAllValidMoves(board, true).map((m) => m.from)
    );

    if (selected === null) {
      if (isPlayerPiece(piece) && selectable.has(i)) {
        setSelected(i);
        setValidMoves(getMovesForPiece(board, i, true).map((m) => m.to));
      }
      return;
    }
    if (i === selected) { if (!forcedSource) { setSelected(null); setValidMoves([]); } return; }
    if (isPlayerPiece(piece) && selectable.has(i) && !forcedSource) {
      setSelected(i);
      setValidMoves(getMovesForPiece(board, i, true).map((m) => m.to));
      return;
    }
    if (!getMovesForPiece(board, selected, true).some((c) => c.to === i)) {
      if (!forcedSource) { setSelected(null); setValidMoves([]); }
      return;
    }
    attemptPlayerMove(selected, i);
  };

  const makeComputerMove = useCallback(() => {
    if (!gameState || gameState.status !== "playing" || gameState.turn !== "2") return;
    // Delay scales slightly with difficulty for feel
    const delay = difficulty === "easy" ? 1000 : difficulty === "medium" ? 750 : 500;

    setTimeout(() => {
      const board = gameState.data.board as number[];
      let workingBoard = [...board];
      let currentMove  = getBotMove(workingBoard);

      if (!currentMove) {
        updateGameState({ status: "finished", winner: "Player" });
        recordResult?.("checkers", true);
        setTimeout(() => setShowResult(true), 500);
        return;
      }

      while (currentMove) {
        const applied = applyMove(workingBoard, currentMove);
        workingBoard = applied.board;
        if (currentMove.capture === null || applied.becameKing) break;
        const followUps = getPieceMoves(workingBoard, currentMove.to)
          .filter((c) => c.capture !== null)
          .map((c) => ({ from: currentMove!.to, ...c }));
        if (!followUps.length) break;
        currentMove = followUps[Math.floor(Math.random() * followUps.length)];
      }

      updateGameState({ data: { board: workingBoard }, turn: "1" });
      setForcedSource(null);
      setSelected(null);
      setValidMoves([]);
      setTimeout(() => checkGameEnd(workingBoard), 100);
    }, delay);
  }, [gameState, difficulty, updateGameState, checkGameEnd, recordResult]);

  useEffect(() => {
    if (gameState?.turn === "2") makeComputerMove();
    if (gameState) setCoachingMsg(CoachingService.getInsight("checkers", gameState).message);
  }, [gameState, makeComputerMove]);

  if (!gameState || gameState.type !== "checkers") return null;

  const board = gameState.data.board as number[];
  const isGameOver = gameState.status === "finished";
  const playerWon  = gameState.winner === "Player";
  const resultTone = playerWon ? "bg-emerald-500" : "bg-rose-500";

  const playerCount = board.filter(isPlayerPiece).length;
  const botCount    = board.filter(isBotPiece).length;

  const selectable = new Set(
    gameState.status === "playing" && gameState.turn === "1"
      ? forcedSource !== null ? [forcedSource] : getAllValidMoves(board, true).map((m) => m.from)
      : []
  );
  const highlightedMoves    = dragState?.validTargets ?? validMoves;
  const highlightedSelected = dragState?.source ?? selected;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center select-none">
      <header className="w-full max-w-md flex items-center justify-between mb-6">
        <Link to="/dashboard" className="p-2 hover:bg-slate-200 rounded-2xl transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="text-center">
          <h1 className="text-xl font-black italic uppercase tracking-tight">Checkers</h1>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Classic captures</p>
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
                ? "bg-red-600 text-white shadow-md"
                : "bg-white text-slate-500 border border-slate-200 hover:border-red-300"
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
          isGameOver ? "bg-slate-800" : "bg-red-600 shadow-red-200"
        )}>
          <Brain className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
              {isGameOver ? "Post-game coaching" : "Game coach"}
            </p>
            <p className="font-bold text-sm leading-relaxed">{coachingMsg}</p>
          </div>
        </div>

        {/* Board */}
        <div className="grid grid-cols-8 aspect-square bg-slate-800 p-2 rounded-xl shadow-2xl border-4 border-slate-700 relative overflow-hidden">
          {board.map((cell, i) => {
            const row = Math.floor(i / 8);
            const col = i % 8;
            const isDark = (row + col) % 2 === 1;
            const isValid = highlightedMoves.includes(i);
            const isSelectable = selectable.has(i);
            const isKingFlash  = kingFlash === i;

            return (
              <button
                key={i}
                data-drag-target={i}
                onClick={() => handleCellClick(i)}
                disabled={!isDark || gameState.status !== "playing" || gameState.turn !== "1"}
                className={cn(
                  "flex items-center justify-center relative transition-all",
                  isDark ? "bg-slate-700 hover:bg-slate-600/90" : "bg-orange-50 cursor-default",
                  highlightedSelected === i && "ring-4 ring-blue-400 ring-inset",
                  isSelectable && selected === null && "ring-2 ring-white/30 ring-inset",
                  isValid && "after:content-[''] after:w-4 after:h-4 after:bg-blue-400/60 after:rounded-full",
                  dragState?.hovered === i && "ring-4 ring-amber-300 ring-inset",
                  isKingFlash && "ring-4 ring-yellow-400 ring-inset animate-pulse"
                )}
              >
                {cell !== 0 && (
                  <div
                    onPointerDown={
                      isPlayerPiece(cell) && isSelectable && gameState.turn === "1" && gameState.status === "playing"
                        ? (event) => startDrag(i, event, {
                            label: cell === PLAYER_KING ? "👑" : "●",
                            className: "bg-red-500 border-red-700 text-white",
                          })
                        : undefined
                    }
                    className={cn(
                      "w-4/5 h-4/5 rounded-full shadow-lg border-b-4 transform active:scale-95 transition-transform flex items-center justify-center",
                      isPlayerPiece(cell) ? "bg-red-500 border-red-700" : "bg-slate-900 border-black",
                      highlightedSelected === i && "scale-105",
                      isSelectable && selected === null && "ring-4 ring-white/30"
                    )}
                  >
                    {(cell === PLAYER_KING || cell === BOT_KING) && (
                      <div className="text-white text-[10px] relative">
                        👑
                        {isKingFlash && (
                          <motion.div
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0 flex items-center justify-center text-yellow-400 text-xs"
                          >★</motion.div>
                        )}
                      </div>
                    )}
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

        {/* Drag ghost */}
        {dragState && (
          <div
            className="pointer-events-none fixed z-[120] -translate-x-1/2 -translate-y-1/2"
            style={{ left: dragState.pointer.x, top: dragState.pointer.y }}
          >
            <div className={cn("flex h-14 w-14 items-center justify-center rounded-full border-b-4 shadow-2xl", dragState.preview.className)}>
              <span className={cn("text-2xl font-black", dragState.preview.labelClassName)}>{dragState.preview.label}</span>
            </div>
          </div>
        )}

        {/* Player strips with piece count */}
        <div className="mt-6 flex items-center justify-between w-full px-4">
          <div className={cn("flex items-center gap-3 transition-all", gameState.turn !== "1" && !isGameOver && "opacity-40")}>
            <div className="w-10 h-10 bg-red-500 rounded-full border-b-4 border-red-700" />
            <div>
              <span className="font-black text-slate-600 block leading-none">YOU</span>
              <span className="text-xs text-slate-400 font-bold">{playerCount} piece{playerCount !== 1 ? "s" : ""}</span>
            </div>
          </div>
          <div className={cn("flex items-center gap-3 text-right transition-all", gameState.turn !== "2" && !isGameOver && "opacity-40")}>
            <div>
              <span className="font-black text-slate-600 block leading-none">ROBOT</span>
              <span className="text-xs text-slate-400 font-bold">{botCount} piece{botCount !== 1 ? "s" : ""}</span>
            </div>
            <div className="w-10 h-10 bg-slate-900 rounded-full border-b-4 border-black" />
          </div>
        </div>

        {isGameOver && !showResult && (
          <div className="mt-6 grid gap-3">
            <button onClick={() => start()} className="py-5 bg-red-600 text-white font-black uppercase tracking-[0.15em] rounded-[1.5rem] shadow-xl hover:bg-red-700 transition-all flex items-center justify-center gap-3">
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
                {playerWon ? "🏆" : "💀"}
              </motion.div>
              <h2 className="text-5xl font-black italic tracking-tighter text-slate-900 leading-none mb-2">{playerWon ? "You Win" : "Bot Wins"}</h2>
              <p className="text-slate-500 font-bold text-sm mb-4">{coachingMsg}</p>
              <div className="rounded-[1.5rem] bg-slate-50 p-4 mb-6 text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                  <Trophy className="w-3 h-3 inline mr-1" /> Coaching tip
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {playerWon
                    ? "Strong captures! In checkers, the player who sees chain jumps early and creates king threats usually dominates."
                    : "Look for forced capture chains. If a jump is available, calculate it first before any quiet move."}
                </p>
              </div>
              <div className="grid gap-3">
                <button onClick={() => start()} className="py-5 bg-red-600 text-white font-black uppercase tracking-[0.2em] rounded-[1.5rem] shadow-xl hover:bg-red-700 transition-all flex items-center justify-center gap-3">
                  <RotateCcw className="w-5 h-5" /> Rematch
                </button>
                <button onClick={() => setShowResult(false)} className="py-4 bg-slate-100 text-slate-600 font-black rounded-[1.5rem] hover:bg-slate-200 transition-all uppercase tracking-widest text-xs">
                  Review board
                </button>
                <Link to="/play" className="py-4 bg-white border-2 border-slate-100 text-slate-400 font-black rounded-[1.5rem] hover:bg-slate-50 transition-all uppercase tracking-widest text-xs text-center">
                  More games
                </Link>
              </div>
              <div className="absolute -left-6 -top-6 text-8xl text-slate-50 font-black rotate-12 opacity-50 select-none">⬤</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
