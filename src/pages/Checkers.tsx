import { useEffect, useState, useCallback } from "react";
import { useGame, Difficulty } from "../context/GameContext";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Brain, Monitor, Trophy, LayoutGrid } from "lucide-react";
import { cn } from "../lib/utils";
import { CoachingService } from "../lib/coaching-service";
import { motion, AnimatePresence } from "motion/react";
import { useBoardDrag } from "../hooks/useBoardDrag";

type CheckersMove = { from: number; to: number; capture: number | null };

const PLAYER_MAN = 1;
const BOT_MAN = 2;
const PLAYER_KING = 11;
const BOT_KING = 22;

function isPlayerPiece(piece: number) {
  return piece === PLAYER_MAN || piece === PLAYER_KING;
}

function isBotPiece(piece: number) {
  return piece === BOT_MAN || piece === BOT_KING;
}

function getDirections(piece: number) {
  const directions: Array<{ dr: number; dc: number }> = [];

  if (piece === PLAYER_MAN || piece === PLAYER_KING || piece === BOT_KING) {
    directions.push({ dr: -1, dc: -1 }, { dr: -1, dc: 1 });
  }

  if (piece === BOT_MAN || piece === PLAYER_KING || piece === BOT_KING) {
    directions.push({ dr: 1, dc: -1 }, { dr: 1, dc: 1 });
  }

  return directions;
}

function getPieceMoves(board: number[], index: number) {
  const piece = board[index];
  if (piece === 0) return [] as Array<{ to: number; capture: number | null }>;

  const moves: Array<{ to: number; capture: number | null }> = [];
  const row = Math.floor(index / 8);
  const col = index % 8;

  getDirections(piece).forEach(({ dr, dc }) => {
    const nextRow = row + dr;
    const nextCol = col + dc;

    if (nextRow < 0 || nextRow >= 8 || nextCol < 0 || nextCol >= 8) return;

    const nextIndex = nextRow * 8 + nextCol;
    if (board[nextIndex] === 0) {
      moves.push({ to: nextIndex, capture: null });
      return;
    }

    const jumpRow = nextRow + dr;
    const jumpCol = nextCol + dc;
    if (jumpRow < 0 || jumpRow >= 8 || jumpCol < 0 || jumpCol >= 8) return;

    const jumpIndex = jumpRow * 8 + jumpCol;
    const targetPiece = board[nextIndex];
    const isEnemy = isPlayerPiece(piece) ? isBotPiece(targetPiece) : isPlayerPiece(targetPiece);

    if (board[jumpIndex] === 0 && isEnemy) {
      moves.push({ to: jumpIndex, capture: nextIndex });
    }
  });

  return moves;
}

function getAllValidMoves(board: number[], isPlayer: boolean) {
  const allMoves: CheckersMove[] = [];

  board.forEach((piece, index) => {
    if (piece === 0) return;

    const isOwnedPiece = isPlayer ? isPlayerPiece(piece) : isBotPiece(piece);
    if (!isOwnedPiece) return;

    getPieceMoves(board, index).forEach((move) => {
      allMoves.push({ from: index, ...move });
    });
  });

  const jumps = allMoves.filter((move) => move.capture !== null);
  return jumps.length > 0 ? jumps : allMoves;
}

function getMovesForPiece(board: number[], index: number, isPlayer: boolean) {
  return getAllValidMoves(board, isPlayer).filter((move) => move.from === index);
}

function applyMove(board: number[], move: CheckersMove) {
  const nextBoard = [...board];
  const targetRow = Math.floor(move.to / 8);
  const originalPiece = board[move.from];
  let landedPiece = originalPiece;
  let becameKing = false;

  if (originalPiece === PLAYER_MAN && targetRow === 0) {
    landedPiece = PLAYER_KING;
    becameKing = true;
  } else if (originalPiece === BOT_MAN && targetRow === 7) {
    landedPiece = BOT_KING;
    becameKing = true;
  }

  nextBoard[move.to] = landedPiece;
  nextBoard[move.from] = 0;

  if (move.capture !== null) {
    nextBoard[move.capture] = 0;
  }

  return { board: nextBoard, landedPiece, becameKing };
}

export function Checkers() {
  const { gameState, startNewGame, updateGameState } = useGame();
  const [selected, setSelected] = useState<number | null>(null);
  const [validMoves, setValidMoves] = useState<number[]>([]);
  const [forcedSource, setForcedSource] = useState<number | null>(null);
  const [coachingMsg, setCoachingMsg] = useState("Your turn! Jump over opponent pieces to capture them.");
  const [showResult, setShowResult] = useState(false);

  const start = useCallback((diff: Difficulty = "medium") => {
    startNewGame("checkers", "play", { difficulty: diff });
    setSelected(null);
    setValidMoves([]);
    setForcedSource(null);
    setShowResult(false);
  }, [startNewGame]);

  useEffect(() => {
    start();
  }, [start]);

  const checkGameEnd = useCallback((board: number[]) => {
    const playerPieces = board.filter(isPlayerPiece).length;
    const botPieces = board.filter(isBotPiece).length;
    const playerMoves = getAllValidMoves(board, true);
    const botMoves = getAllValidMoves(board, false);

    if (playerPieces === 0 || playerMoves.length === 0) {
      updateGameState({ status: "finished", winner: "Robot" });
      setTimeout(() => setShowResult(true), 800);
    } else if (botPieces === 0 || botMoves.length === 0) {
      updateGameState({ status: "finished", winner: "Player" });
      setTimeout(() => setShowResult(true), 800);
    }
  }, [updateGameState]);

  const attemptPlayerMove = useCallback((source: number, destination: number) => {
    if (!gameState || gameState.status !== "playing" || gameState.turn !== "1") return;
    if (forcedSource !== null && source !== forcedSource) return;

    const board = gameState.data.board as number[];
    const moves = getMovesForPiece(board, source, true);
    const move = moves.find((candidate) => candidate.to === destination);
    if (!move) return;

    const { board: nextBoard, becameKing } = applyMove(board, move);

    if (move.capture !== null && !becameKing) {
      const followUps = getPieceMoves(nextBoard, move.to)
        .filter((candidate) => candidate.capture !== null)
        .map((candidate) => ({ from: move.to, ...candidate }));

      if (followUps.length > 0) {
        updateGameState({
          data: { board: nextBoard },
          turn: "1",
        });
        setForcedSource(move.to);
        setSelected(move.to);
        setValidMoves(followUps.map((candidate) => candidate.to));
        setCoachingMsg("Keep jumping. In checkers, a capture chain is part of the same turn.");
        setTimeout(() => checkGameEnd(nextBoard), 100);
        return;
      }
    }

    updateGameState({
      data: { board: nextBoard },
      turn: "2",
    });
    setForcedSource(null);
    setSelected(null);
    setValidMoves([]);
    setTimeout(() => checkGameEnd(nextBoard), 100);
  }, [checkGameEnd, forcedSource, gameState, updateGameState]);

  const { dragState, startDrag, shouldSuppressClick } = useBoardDrag({
    enabled: Boolean(gameState && gameState.status === "playing" && gameState.turn === "1"),
    getValidTargets: (source) => {
      if (!gameState) return [];
      if (forcedSource !== null && source !== forcedSource) return [];
      return getMovesForPiece(gameState.data.board as number[], source, true).map((move) => move.to);
    },
    onDrop: (source, target) => {
      attemptPlayerMove(source, target);
    },
  });

  const handleCellClick = (i: number) => {
    if (shouldSuppressClick()) return;
    if (!gameState || gameState.status !== "playing" || gameState.turn !== "1") return;

    const board = gameState.data.board as number[];
    const piece = board[i];
    const selectablePieces = new Set(
      forcedSource !== null ? [forcedSource] : getAllValidMoves(board, true).map((move) => move.from)
    );

    if (selected === null) {
      if (isPlayerPiece(piece) && selectablePieces.has(i)) {
        const moves = getMovesForPiece(board, i, true);
        setSelected(i);
        setValidMoves(moves.map((move) => move.to));
      }
      return;
    }

    if (i === selected) {
      if (forcedSource !== null) return;
      setSelected(null);
      setValidMoves([]);
      return;
    }

    if (isPlayerPiece(piece) && selectablePieces.has(i)) {
      const moves = getMovesForPiece(board, i, true);
      setSelected(i);
      setValidMoves(moves.map((move) => move.to));
      return;
    }

    if (!getMovesForPiece(board, selected, true).some((candidate) => candidate.to === i)) {
      if (forcedSource !== null) return;
      setSelected(null);
      setValidMoves([]);
      return;
    }

    attemptPlayerMove(selected, i);
  };

  const makeComputerMove = useCallback(() => {
    if (!gameState || gameState.status !== "playing" || gameState.turn !== "2") return;

    setTimeout(() => {
      const board = gameState.data.board as number[];
      const openingMoves = getAllValidMoves(board, false);

      if (openingMoves.length === 0) {
        updateGameState({ status: "finished", winner: "Player" });
        setTimeout(() => setShowResult(true), 800);
        return;
      }

      let workingBoard = [...board];
      let currentMove = openingMoves[Math.floor(Math.random() * openingMoves.length)];

      while (currentMove) {
        const applied = applyMove(workingBoard, currentMove);
        workingBoard = applied.board;

        if (currentMove.capture === null || applied.becameKing) break;

        const followUps = getPieceMoves(workingBoard, currentMove.to)
          .filter((candidate) => candidate.capture !== null)
          .map((candidate) => ({ from: currentMove.to, ...candidate }));

        if (followUps.length === 0) break;
        currentMove = followUps[Math.floor(Math.random() * followUps.length)];
      }

      updateGameState({
        data: { board: workingBoard },
        turn: "1",
      });
      setForcedSource(null);
      setSelected(null);
      setValidMoves([]);
      setTimeout(() => checkGameEnd(workingBoard), 100);
    }, 800);
  }, [gameState, updateGameState, checkGameEnd]);

  useEffect(() => {
    if (gameState?.turn === "2") makeComputerMove();

    if (gameState) {
      const insight = CoachingService.getInsight("checkers", gameState);
      setCoachingMsg(insight.message);
    }
  }, [gameState, makeComputerMove]);

  if (!gameState || gameState.type !== "checkers") return null;

  const isGameOver = gameState.status === "finished";
  const playerWon = gameState.winner === "Player";
  const resultTitle = playerWon ? "You Win" : "Bot Wins";
  const resultEmoji = playerWon ? "🏆" : "💀";
  const resultTone = playerWon ? "bg-emerald-500" : "bg-rose-500";
  const selectablePieces = new Set(
    gameState.status === "playing" && gameState.turn === "1"
      ? forcedSource !== null
        ? [forcedSource]
        : getAllValidMoves(gameState.data.board as number[], true).map((move) => move.from)
      : []
  );
  const highlightedMoves = dragState?.validTargets ?? validMoves;
  const highlightedSelected = dragState?.source ?? selected;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center select-none">
      <header className="w-full max-w-md flex items-center justify-between mb-8">
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

      <main className="w-full max-w-md">
        <div
          className={cn(
            "rounded-[2rem] p-6 text-white mb-8 shadow-lg flex items-start gap-4 transition-colors duration-500",
            isGameOver ? "bg-slate-800" : "bg-red-600 shadow-red-200"
          )}
        >
          <Brain className="w-6 h-6 shrink-0 mt-0.5" />
          <div>
            <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
              {isGameOver ? "Post-game coaching" : "Game coach"}
            </p>
            <p className="font-bold text-sm leading-relaxed">{coachingMsg}</p>
          </div>
        </div>

        <div className="grid grid-cols-8 aspect-square bg-slate-800 p-2 rounded-xl shadow-2xl border-4 border-slate-700 relative overflow-hidden">
          {(gameState.data.board as number[]).map((cell, i) => {
            const row = Math.floor(i / 8);
            const col = i % 8;
            const isDark = (row + col) % 2 === 1;
            const isValid = highlightedMoves.includes(i);
            const isSelectable = selectablePieces.has(i);

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
                  dragState?.hovered === i && "ring-4 ring-amber-300 ring-inset"
                )}
              >
                {cell !== 0 && (
                  <div
                    onPointerDown={
                      isPlayerPiece(cell) && isSelectable && gameState.turn === "1" && gameState.status === "playing"
                        ? (event) => startDrag(i, event, {
                            label: cell === PLAYER_KING ? "👑" : "●",
                            className: isPlayerPiece(cell) ? "bg-red-500 border-red-700 text-white" : "bg-slate-900 border-black text-white",
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
                    {(cell === PLAYER_KING || cell === BOT_KING) && <div className="text-white text-[10px]">👑</div>}
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

        <div className="mt-8 flex items-center justify-between w-full px-4">
          <div className={cn("flex items-center gap-3 transition-all", gameState.turn !== "1" && !isGameOver && "opacity-40")}>
            <div className="w-10 h-10 bg-red-500 rounded-full border-b-4 border-red-700" />
            <span className="font-bold text-slate-600">YOU</span>
          </div>
          <div className={cn("flex items-center gap-3 transition-all", gameState.turn !== "2" && !isGameOver && "opacity-40")}>
            <span className="font-bold text-slate-600">ROBOT</span>
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
                    ? "Strong captures! In checkers, the player who sees chain jumps early and creates king threats usually dominates."
                    : "Look for forced capture chains. If one of your pieces can jump, that is the move you have to calculate first."}
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
