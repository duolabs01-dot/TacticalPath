/**
 * Daily Board — real chess puzzle from the Lichess public API.
 * No auth, no API key, free forever. Refreshes once per day.
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Chessboard } from "react-chessboard";
import { Target, Loader2, RefreshCcw, CheckCircle2, ArrowRight, XCircle } from "lucide-react";
import { Chess } from "chess.js";
import { cn } from "../lib/utils";

interface LichessPuzzle {
  game: {
    id: string;
    pgn: string;
    clock: string;
    players: { color: "white" | "black"; user: { name: string }; rating: number }[];
  };
  puzzle: {
    id: string;
    rating: number;
    solution: string[];
    themes: string[];
  };
}

const CACHE_KEY = "tp:daily_puzzle";
const CACHE_DATE_KEY = "tp:daily_puzzle_date";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function loadCachedPuzzle(): LichessPuzzle | null {
  try {
    if (localStorage.getItem(CACHE_DATE_KEY) !== todayISO()) return null;
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function cachePuzzle(puzzle: LichessPuzzle) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(puzzle));
  localStorage.setItem(CACHE_DATE_KEY, todayISO());
}

/** Replay PGN moves up to the puzzle start position */
function fenFromPgn(pgn: string, movesToPlay?: number): string {
  try {
    const game = new Chess();
    // Strip metadata headers
    const cleaned = pgn.replace(/\[.*?\]/g, "").trim();
    const tokens = cleaned.split(/\s+/).filter(t => t && !t.includes(".") && !["1-0","0-1","1/2-1/2","*"].includes(t));
    const limit = movesToPlay ?? tokens.length;
    for (let i = 0; i < Math.min(limit, tokens.length); i++) {
      try { game.move(tokens[i]); } catch { break; }
    }
    return game.fen();
  } catch { return "start"; }
}

type Status = "idle" | "loading" | "ready" | "error";
type Result = "none" | "correct" | "wrong";

export function DailyBoard() {
  const [puzzle, setPuzzle] = useState<LichessPuzzle | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  // Puzzle solving state
  const [game, setGame] = useState<Chess | null>(null);
  const [solutionStep, setSolutionStep] = useState(0);
  const [result, setResult] = useState<Result>("none");
  const [lastMoveHighlight, setLastMoveHighlight] = useState<Record<string, { background: string }>>({});
  const [playerColor, setPlayerColor] = useState<"white" | "black">("white");
  const [moveFrom, setMoveFrom] = useState<string | null>(null);

  const fetchPuzzle = async (force = false) => {
    if (!force) {
      const cached = loadCachedPuzzle();
      if (cached) { initPuzzle(cached); return; }
    }
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("https://lichess.org/api/puzzle/daily");
      if (!res.ok) throw new Error(`Lichess returned ${res.status}`);
      const data: LichessPuzzle = await res.json();
      cachePuzzle(data);
      initPuzzle(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load puzzle");
      setStatus("error");
    }
  };

  const initPuzzle = (data: LichessPuzzle) => {
    setPuzzle(data);
    // The puzzle starts from a position just before the solution's first move
    // PGN has all game moves; solution moves start from the final position
    const pgnTokens = data.game.pgn.replace(/\[.*?\]/g, "").trim()
      .split(/\s+/).filter(t => t && !t.includes(".") && !["1-0","0-1","1/2-1/2","*"].includes(t));
    const setupFen = fenFromPgn(data.game.pgn, pgnTokens.length);
    const g = new Chess(setupFen);

    // The puzzle's first move is played by the opponent — apply it automatically
    const firstSolutionMove = data.puzzle.solution[0];
    try {
      g.move({ from: firstSolutionMove.slice(0, 2), to: firstSolutionMove.slice(2, 4), promotion: firstSolutionMove[4] });
    } catch { /* ignore if it fails */ }

    setGame(new Chess(g.fen()));
    setSolutionStep(1); // player must play solution[1]
    setResult("none");
    setLastMoveHighlight({});

    // Player is whoever must move now
    setPlayerColor(g.turn() === "w" ? "white" : "black");
    setStatus("ready");
  };

  useEffect(() => { fetchPuzzle(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Click-to-select handler (mobile-friendly alternative to drag & drop)
  const handleSquareClick = ({ square }: { square: string }) => {
    if (!game || !puzzle || result !== "none") return;

    // If no piece selected yet, select this square if it has a piece
    if (!moveFrom) {
      const piece = game.get(square as any);
      if (piece && piece.color === game.turn()) {
        setMoveFrom(square);
      }
      return;
    }

    // If same square clicked, deselect
    if (moveFrom === square) {
      setMoveFrom(null);
      return;
    }

    // Try to make the move
    const gameCopy = new Chess(game.fen());
    let move;
    try {
      move = gameCopy.move({ from: moveFrom, to: square, promotion: "q" });
    } catch {
      // Invalid move - if clicking own piece, select that instead
      const piece = game.get(square as any);
      if (piece && piece.color === game.turn()) {
        setMoveFrom(square);
      } else {
        setMoveFrom(null);
      }
      return;
    }

    if (!move) {
      setMoveFrom(null);
      return;
    }

    // Check if it matches the solution
    const expected = puzzle.puzzle.solution[solutionStep];
    const expectedFrom = expected?.slice(0, 2);
    const expectedTo = expected?.slice(2, 4);

    if (moveFrom !== expectedFrom || square !== expectedTo) {
      setLastMoveHighlight({
        [moveFrom]: { background: "rgba(239, 68, 68, 0.55)" },
        [square]: { background: "rgba(239, 68, 68, 0.35)" },
      });
      setResult("wrong");
      setGame(gameCopy);
      setMoveFrom(null);
      return;
    }

    // Correct move!
    setLastMoveHighlight({
      [moveFrom]: { background: "rgba(34, 197, 94, 0.4)" },
      [square]: { background: "rgba(34, 197, 94, 0.55)" },
    });
    setGame(gameCopy);
    setMoveFrom(null);

    const nextStep = solutionStep + 1;
    if (nextStep >= puzzle.puzzle.solution.length) {
      setResult("correct");
      setSolutionStep(nextStep);
      const PROGRESS_KEY = "tacticalpath_progress";
      const prog = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
      const today = todayISO();
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const lastPlayed = prog.lastPlayed ? prog.lastPlayed.slice(0, 10) : null;
      prog.streak = lastPlayed === yesterday ? (prog.streak || 0) + 1 : lastPlayed === today ? (prog.streak || 0) : 1;
      prog.lastPlayed = new Date().toISOString();
      prog.totalPuzzlesSolved = (prog.totalPuzzlesSolved || 0) + 1;
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(prog));
      return;
    }

    // Apply opponent response
    setTimeout(() => {
      const opponentMove = puzzle.puzzle.solution[nextStep];
      if (!opponentMove) return;
      const g2 = new Chess(gameCopy.fen());
      try {
        const om = g2.move({ from: opponentMove.slice(0, 2), to: opponentMove.slice(2, 4), promotion: opponentMove[4] });
        setLastMoveHighlight({
          [om.from]: { background: "rgba(251, 191, 36, 0.4)" },
          [om.to]:   { background: "rgba(251, 191, 36, 0.55)" },
        });
        setGame(g2);
        setSolutionStep(nextStep + 1);
      } catch { /* ignore */ }
    }, 500);
  };

  const resetPuzzle = () => { if (puzzle) initPuzzle(puzzle); };

  const themes = puzzle?.puzzle.themes.slice(0, 3) ?? [];
  const rating  = puzzle?.puzzle.rating ?? 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:px-8 md:py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-amber-700">
          <Target className="h-4 w-4" /> Daily Board
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">Today's chess puzzle</h1>
        <p className="mt-1 text-sm text-slate-600 leading-relaxed">
          Find the best sequence of moves.{rating > 0 && ` Puzzle rating: ${rating}.`}
        </p>
      </div>

      {/* Loading */}
      {status === "loading" && (
        <div className="flex h-64 items-center justify-center rounded-[2rem] bg-white shadow-sm">
          <div className="flex flex-col items-center gap-3 text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-sm font-bold">Loading puzzle…</p>
          </div>
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div className="rounded-[2rem] bg-white p-8 text-center shadow-sm">
          <XCircle className="mx-auto h-10 w-10 text-rose-400 mb-3" />
          <p className="font-black text-slate-900 mb-1">Couldn't load today's puzzle</p>
          <p className="text-sm text-slate-500 mb-5">{error}</p>
          <button onClick={() => fetchPuzzle(true)} className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-500">
            <RefreshCcw className="h-4 w-4" /> Try again
          </button>
          <p className="mt-4 text-xs text-slate-400">Check your internet connection. The puzzle is fetched from Lichess.</p>
        </div>
      )}

      {/* Ready */}
      {status === "ready" && game && (
        <div className="grid gap-6 md:grid-cols-[1fr,240px]">
          {/* Board */}
          <div>
            {/* Result banner */}
            {result !== "none" && (
              <div className={cn(
                "mb-4 flex items-center gap-3 rounded-2xl px-5 py-4 font-bold text-sm",
                result === "correct" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
              )}>
                {result === "correct"
                  ? <><CheckCircle2 className="h-5 w-5 shrink-0" /> Correct! Puzzle solved. Streak updated.</>
                  : <><XCircle className="h-5 w-5 shrink-0" /> Not quite — try again or reset.</>}
              </div>
            )}

            <div className="overflow-hidden rounded-[2rem] shadow-xl border-4 border-slate-200">
              <Chessboard
                options={{
                  position: game.fen(),
                  allowDragging: false,
                  onSquareClick: handleSquareClick,
                  boardOrientation: playerColor,
                  animationDurationInMs: 280,
                  squareStyles: {
                    ...lastMoveHighlight,
                    ...(moveFrom ? { [moveFrom]: { backgroundColor: "rgba(255, 255, 0, 0.4)" } } : {}),
                  },
                  darkSquareStyle: { backgroundColor: "#739552" },
                  lightSquareStyle: { backgroundColor: "#ebecd0" },
                }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {/* Turn indicator */}
            <div className={cn(
              "rounded-[1.75rem] p-5 text-white",
              result === "correct" ? "bg-emerald-600" : result === "wrong" ? "bg-rose-600" : "bg-slate-900"
            )}>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-1">
                {result === "correct" ? "Solved" : "Your turn"}
              </p>
              <p className="text-white font-black text-lg leading-tight">
                {result === "correct"
                  ? "🏆 Puzzle complete!"
                  : result === "wrong"
                    ? "❌ Wrong move — reset and try again."
                    : `Find the best move for ${playerColor}.`}
              </p>
            </div>

            {/* Themes */}
            {themes.length > 0 && (
              <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Themes</p>
                <div className="flex flex-wrap gap-2">
                  {themes.map(t => (
                    <span key={t} className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-black capitalize text-amber-700">
                      {t.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={resetPuzzle}
                className="flex items-center justify-center gap-2 rounded-2xl bg-white py-3 text-sm font-black text-slate-600 shadow-sm border border-slate-200 hover:bg-slate-50 transition"
              >
                <RefreshCcw className="h-4 w-4" /> Reset puzzle
              </button>
              <button
                onClick={() => fetchPuzzle(true)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-slate-100 py-3 text-sm font-black text-slate-500 hover:bg-slate-200 transition"
              >
                Load new puzzle
              </button>
            </div>

            {/* CTA to full game */}
            <Link
              to="/play/chess"
              className="mt-auto flex items-center justify-between rounded-[1.75rem] bg-blue-600 p-5 text-white shadow-lg hover:bg-blue-500 transition group"
            >
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">Play a full game</p>
                <p className="font-black leading-tight">vs Stockfish</p>
              </div>
              <ArrowRight className="h-5 w-5 text-blue-300 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
