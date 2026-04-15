import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, RotateCcw, Brain, Monitor, User, Undo2, History, Target, Search, Zap, Swords } from "lucide-react";
import { useGame } from "../context/GameContext";
import { CoachingService, CoachingInsight } from "../lib/coaching-service";
import { getStockfish } from "../lib/stockfish";
import { cn } from "../lib/utils";

type BotPersona = "gambiter" | "positional" | "tactical";

interface BotProfile {
  name: string;
  avatar: string;
  color: string;
  accent: string;
  description: string;
  openingTip: string;
  skillLevel: number;
  depth: number;
  contempt: number;
}

const CHESS_BOTS: Record<BotPersona, BotProfile> = {
  gambiter: {
    name: "Garry Gambiter",
    avatar: "🔥",
    color: "bg-rose-500",
    accent: "from-rose-500 to-orange-400",
    description: "Explosive, risky, and always happy to toss material into the fire for initiative.",
    openingTip: "Expect early pressure on f7 and open lines near your king.",
    skillLevel: 8,
    depth: 5,
    contempt: 110,
  },
  positional: {
    name: "Positional Pete",
    avatar: "🛡️",
    color: "bg-sky-500",
    accent: "from-sky-500 to-cyan-400",
    description: "Patient and practical. Pete squeezes space, improves pieces, and waits for mistakes.",
    openingTip: "You’ll need patience. Pete rarely hands over loose material.",
    skillLevel: 11,
    depth: 9,
    contempt: 10,
  },
  tactical: {
    name: "Tactical Ted",
    avatar: "⚡",
    color: "bg-amber-500",
    accent: "from-amber-500 to-yellow-300",
    description: "Sharp and unforgiving. Ted spots tactics fast and punishes loose pieces immediately.",
    openingTip: "Before every move, scan checks, captures, and threats. Ted will.",
    skillLevel: 16,
    depth: 7,
    contempt: 40,
  },
};

function MaterialDisplay({ fen, color }: { fen: string; color: "w" | "b" }) {
  const pieces = fen.split(" ")[0];
  const whitePieces = pieces.replace(/[^PRNBQK]/g, "");
  const blackPieces = pieces.replace(/[^prnbqk]/g, "");
  const count = (str: string) => {
    const counts: Record<string, number> = { p: 0, n: 0, b: 0, r: 0, q: 0 };
    str.toLowerCase().split("").forEach((char) => {
      if (counts[char] !== undefined) counts[char] += 1;
    });
    return counts;
  };

  const whiteCounts = count(whitePieces);
  const blackCounts = count(blackPieces);
  const initial = { p: 8, n: 2, b: 2, r: 2, q: 1 };
  const capturedByWhite = Object.entries(initial)
    .map(([type, total]) => ({ type, count: total - blackCounts[type] }))
    .filter((piece) => piece.count > 0);
  const capturedByBlack = Object.entries(initial)
    .map(([type, total]) => ({ type, count: total - whiteCounts[type] }))
    .filter((piece) => piece.count > 0);

  const targetList = color === "w" ? capturedByWhite : capturedByBlack;
  const pieceIcons: Record<string, string> = { p: "♟", n: "♞", b: "♝", r: "♜", q: "♛" };

  return (
    <div className="flex items-center gap-1 opacity-60 min-h-5">
      {targetList.map((piece) => (
        <div key={piece.type} className="flex items-center">
          {Array.from({ length: piece.count }).map((_, index) => (
            <span key={index} className="text-sm -mr-1">
              {pieceIcons[piece.type]}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function AdvantageBar({ score }: { score: number }) {
  const capped = Math.max(-5, Math.min(5, score));
  const percentage = ((capped + 5) / 10) * 100;

  return (
    <div className="hidden lg:flex w-3 h-[calc(100%-2rem)] mt-4 bg-slate-900 rounded-full overflow-hidden relative border border-white/10 shadow-inner">
      <motion.div
        className="absolute bottom-0 w-full bg-white"
        initial={{ height: "50%" }}
        animate={{ height: `${percentage}%` }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
      />
      <div className="absolute top-1/2 left-0 w-full h-px bg-emerald-400/70 z-10" />
    </div>
  );
}

function getResultSummary(winner?: string, status?: string) {
  if (winner === "w") return { title: "You Win", emoji: "🏆", tone: "bg-emerald-500 text-white", subtitle: "Clean finish. Want another shot at the bot?" };
  if (winner === "draw" || status === "draw" || status === "stalemate") {
    return { title: "Draw", emoji: "🤝", tone: "bg-sky-500 text-white", subtitle: "A balanced fight. Review the critical moment or run it back." };
  }
  return { title: "Bot Wins", emoji: "💀", tone: "bg-rose-500 text-white", subtitle: "The review will show where the game swung away." };
}

export function PlayChess() {
  const { gameState, chessGame, startNewGame, makeMove, undo, updateGameState } = useGame();
  const [persona, setPersona] = useState<BotPersona>("tactical");
  const [insight, setInsight] = useState<CoachingInsight | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [evaluation, setEvaluation] = useState(0);
  const reviewRef = useRef<HTMLDivElement | null>(null);

  const bot = useMemo(() => CHESS_BOTS[persona], [persona]);

  const start = useCallback(
    (nextPersona: BotPersona = "tactical") => {
      setPersona(nextPersona);
      startNewGame("chess", "play", { difficulty: "medium", bot: nextPersona });
      setInsight(null);
      setShowResult(false);
      setIsThinking(false);
      setIsAnalyzing(false);
      setEvaluation(0);
    },
    [startNewGame]
  );

  useEffect(() => {
    start("tactical");
  }, [start]);

  const onDrop = useCallback(
    ({ sourceSquare, targetSquare }: { sourceSquare: string; targetSquare: string | null }) => {
      if (!targetSquare || !gameState || !chessGame) return false;
      if (gameState.turn !== "w" || gameState.status !== "playing" || isThinking) return false;

      return makeMove({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
    },
    [chessGame, gameState, isThinking, makeMove]
  );

  const requestEvaluation = useCallback(async (fen: string) => {
    try {
      const stockfish = getStockfish();
      const result = await stockfish.evaluate(fen, 10);
      setEvaluation(result.mate ? (result.mate > 0 ? 5 : -5) : result.evaluation);
    } catch (error) {
      console.error("Evaluation error:", error);
    }
  }, []);

  const requestEngineMove = useCallback(async () => {
    if (!chessGame || !gameState) return;
    if (gameState.turn !== "b" || gameState.status !== "playing" || isThinking) return;

    setIsThinking(true);
    try {
      const stockfish = getStockfish();
      const move = await stockfish.getBotMove(chessGame.fen(), {
        skillLevel: bot.skillLevel,
        depth: bot.depth,
        contempt: bot.contempt,
      });

      setTimeout(() => {
        if (move) {
          makeMove(move);
        }
        setIsThinking(false);
      }, 650);
    } catch (error) {
      console.error("Stockfish move error:", error);
      setIsThinking(false);
    }
  }, [bot, chessGame, gameState, isThinking, makeMove]);

  const runAnalysis = useCallback(async () => {
    if (!gameState || gameState.status === "playing" || gameState.data.analysis || isAnalyzing) return;

    setIsAnalyzing(true);
    try {
      const stockfish = getStockfish();
      const pgnMoves = gameState.moves.map((move) => (typeof move === "string" ? move : move.san));
      const analysis = await stockfish.analyzeGame(pgnMoves, 11);
      updateGameState({ data: { ...gameState.data, analysis } });
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [gameState, isAnalyzing, updateGameState]);

  useEffect(() => {
    if (!gameState || !chessGame) return;

    setInsight(CoachingService.getInsight("chess", gameState));

    if (gameState.status === "playing" && gameState.turn === "w") {
      requestEvaluation(chessGame.fen());
    }

    if (gameState.turn === "b" && gameState.status === "playing") {
      requestEngineMove();
    }

    if (gameState.status !== "playing" && gameState.status !== "waiting") {
      if (!showResult) {
        const timer = window.setTimeout(() => setShowResult(true), 900);
        return () => window.clearTimeout(timer);
      }
      if (!gameState.data.analysis) {
        runAnalysis();
      }
    }
  }, [chessGame, gameState, requestEngineMove, requestEvaluation, runAnalysis, showResult]);

  if (!gameState || gameState.type !== "chess" || !chessGame) return null;

  const isCheck = chessGame.isCheck() && gameState.status === "playing";
  const result = getResultSummary(gameState.winner, gameState.status);
  const analysis = gameState.data.analysis;
  const evalSwing = analysis ? Math.abs((analysis.evalAfter ?? 0) - (analysis.evalBefore ?? 0)).toFixed(1) : null;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center select-none overflow-x-hidden">
      <header className="w-full max-w-6xl flex items-center justify-between mb-8">
        <Link to="/" className="p-2 hover:bg-slate-200 rounded-2xl transition-all active:scale-90">
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </Link>

        <div className="text-center group">
          <h1 className="text-2xl font-black italic tracking-tighter text-slate-900 group-hover:scale-105 transition-transform uppercase">Chess Arena</h1>
          <div className="flex items-center gap-1 justify-center mt-0.5">
            <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", bot.color)} />
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">VS {bot.name}</span>
          </div>
        </div>

        <button onClick={() => start(persona)} className="p-2 hover:bg-slate-200 rounded-2xl transition-all active:rotate-180 duration-500">
          <RotateCcw className="w-6 h-6 text-slate-600" />
        </button>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 flex items-start gap-4">
          <AdvantageBar score={evaluation} />

          <div className="flex-1 flex flex-col gap-6">
            <div className={cn("flex items-center justify-between px-6 py-5 bg-white rounded-[2rem] shadow-sm border border-slate-200 transition-all duration-500 relative overflow-hidden", gameState.turn === "b" && gameState.status === "playing" ? "ring-4 ring-rose-400 border-transparent shadow-rose-100" : "opacity-70")}>
              <div className="flex items-center gap-4 z-10">
                <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center text-4xl shadow-lg border-2 border-white", bot.color)}>
                  {bot.avatar}
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Opponent</p>
                  <p className="text-xl font-black text-slate-900">{bot.name}</p>
                  <MaterialDisplay fen={chessGame.fen()} color="b" />
                </div>
              </div>

              {isThinking && (
                <div className="bg-rose-50 px-4 py-2 rounded-xl flex items-center gap-3 border border-rose-100 z-10 animate-pulse">
                  <Monitor className="w-4 h-4 text-rose-500" />
                  <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Bot Thinking</span>
                </div>
              )}

              <div className="absolute -right-4 -bottom-4 text-8xl font-black italic text-slate-50 select-none opacity-60">BOT</div>
            </div>

            <div className="bg-white p-4 rounded-[3rem] shadow-2xl border-4 border-slate-200 relative overflow-hidden">
            <Chessboard
              options={{
                position: chessGame.fen(),
                onPieceDrop: onDrop,
                boardOrientation: "white",
                animationDurationInMs: 400,
                boardStyle: { borderRadius: "2rem" },
                darkSquareStyle: { backgroundColor: "#739552" },
                lightSquareStyle: { backgroundColor: "#ebecd0" },
              }}
            />
              <AnimatePresence>
                {isCheck && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
                  >
                    <div className="bg-rose-600 text-white px-10 py-4 rounded-full font-black italic text-3xl shadow-[0_0_50px_rgba(225,29,72,0.45)] uppercase tracking-tighter ring-8 ring-white/20">
                      Check!
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className={cn("flex items-center justify-between px-6 py-5 bg-white rounded-[2rem] shadow-sm border border-slate-200 transition-all duration-500 relative overflow-hidden", gameState.turn === "w" && gameState.status === "playing" ? "ring-4 ring-sky-400 border-transparent shadow-sky-100" : "opacity-70")}>
              <div className="flex items-center gap-4 z-10">
                <div className="w-16 h-16 bg-sky-100 rounded-3xl flex items-center justify-center text-sky-600 shadow-lg border-2 border-white">
                  <User className="w-9 h-9" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Strategist</p>
                  <p className="text-xl font-black text-slate-900 uppercase">You • White</p>
                  <MaterialDisplay fen={chessGame.fen()} color="w" />
                </div>
              </div>

              <div className="absolute -right-4 -bottom-4 text-8xl font-black italic text-slate-50 select-none opacity-60 uppercase">YOU</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6 sticky top-8">
          <div className={cn("rounded-[2.5rem] p-8 text-white shadow-2xl transition-all duration-700 border-b-[12px] relative overflow-hidden", gameState.status === "playing" ? "bg-blue-600 border-blue-800 shadow-blue-200" : "bg-slate-800 border-slate-950 shadow-slate-300")}>
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-[1rem] flex items-center justify-center border border-white/10 shadow-inner">
                <Brain className="w-7 h-7 text-blue-100" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 block">Coach Feed</span>
                <span className="text-xs font-bold text-white/90 italic">{bot.openingTip}</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={insight?.message} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="relative z-10">
                <p className="text-2xl font-black leading-tight mb-3 italic">{insight?.message}</p>
                {insight?.explanation && <p className="text-blue-100/90 text-sm font-medium leading-relaxed">{insight.explanation}</p>}
              </motion.div>
            </AnimatePresence>

            {isAnalyzing && (
              <div className="flex items-center gap-2 text-xs font-bold text-white/70 italic mt-4 relative z-10">
                <Search className="w-3 h-3 animate-spin" /> Engine review in progress...
              </div>
            )}

            <div className="absolute -bottom-6 -right-6 text-white/5 text-[10rem] font-black italic select-none pointer-events-none">♔</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={undo}
              disabled={gameState.status !== "playing" || gameState.moves.length === 0 || isThinking}
              className="group py-5 bg-white border-b-8 border-slate-200 rounded-[1.75rem] font-black text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-lg active:translate-y-2 active:border-b-0 disabled:opacity-30 disabled:translate-y-0 disabled:border-b-8"
            >
              <Undo2 className="w-5 h-5 transition-transform group-hover:-rotate-45" />
              Undo
            </button>
            <button
              onClick={() => start(persona)}
              className="group py-5 bg-slate-900 text-white rounded-[1.75rem] font-black uppercase tracking-[0.12em] shadow-xl hover:bg-black transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
              Rematch
            </button>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Battle Log</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Live</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
              {gameState.moves.map((move, index) => {
                if (index % 2 !== 0) return null;
                const whiteMove = move;
                const blackMove = gameState.moves[index + 1];

                return (
                  <div key={index} className="col-span-2 grid grid-cols-12 gap-2 items-center py-1">
                    <span className="col-span-2 text-[10px] font-black text-slate-300">{Math.floor(index / 2) + 1}.</span>
                    <div className="col-span-5 bg-slate-50 px-3 py-2 rounded-xl text-xs font-black text-slate-700 border border-slate-100">
                      {typeof whiteMove === "string" ? whiteMove : whiteMove.san}
                    </div>
                    {blackMove && (
                      <div className="col-span-5 bg-slate-900 px-3 py-2 rounded-xl text-xs font-black text-white border border-slate-800">
                        {typeof blackMove === "string" ? blackMove : blackMove.san}
                      </div>
                    )}
                  </div>
                );
              })}

              {gameState.moves.length === 0 && (
                <div className="col-span-2 py-10 text-center bg-slate-50 rounded-[1.5rem] border-2 border-dashed border-slate-200">
                  <History className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                  <p className="text-xs font-black text-slate-300 uppercase tracking-[0.2em]">Your game will appear here</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 justify-between">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Choose Bot</p>
              <span className="text-[10px] font-bold text-slate-400">Fast start, instant rematch</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {(Object.keys(CHESS_BOTS) as BotPersona[]).map((option) => (
                <button
                  key={option}
                  onClick={() => start(option)}
                  className={cn(
                    "p-4 rounded-[1.5rem] border-4 transition-all flex flex-col items-center gap-2 group relative overflow-hidden bg-white",
                    persona === option ? "border-blue-500 shadow-xl scale-[1.03]" : "border-transparent hover:border-slate-200 hover:-translate-y-0.5"
                  )}
                >
                  <div className={cn("absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r", CHESS_BOTS[option].accent)} />
                  <span className="text-3xl transition-transform group-hover:scale-110">{CHESS_BOTS[option].avatar}</span>
                  <span className="text-[10px] font-black uppercase tracking-tight text-slate-700">{CHESS_BOTS[option].name.split(" ")[1]}</span>
                  {persona === option && (
                    <div className="absolute top-0 right-0 p-1 bg-blue-500 text-white rounded-bl-xl">
                      <Target className="w-2.5 h-2.5" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div ref={reviewRef} className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
                <Swords className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Review</p>
                <p className="text-sm font-black text-slate-900">Critical moment</p>
              </div>
            </div>

            {analysis ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Move</p>
                    <p className="text-lg font-black text-slate-900">{Math.ceil(analysis.criticalMoveNumber / 2)}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Swing</p>
                    <p className="text-lg font-black text-slate-900">{evalSwing} pts</p>
                  </div>
                </div>

                <div className="rounded-[1.5rem] bg-slate-900 text-white p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">Engine verdict</p>
                  <p className="text-sm font-bold leading-relaxed">You played {analysis.playedMove}, but the engine preferred {analysis.bestMove}.</p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Theme: <span className="font-black text-slate-900 capitalize">{analysis.theme}</span>
                </p>
              </div>
            ) : (
              <div className="rounded-[1.5rem] bg-slate-50 border border-dashed border-slate-200 p-5 text-sm text-slate-500 leading-relaxed">
                Finish a game to unlock the engine review. You’ll get one clear turning point instead of a wall of noisy advice.
              </div>
            )}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showResult && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.85, y: 80 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }} className="max-w-md w-full bg-white rounded-[3.5rem] p-10 text-center shadow-[0_0_100px_rgba(0,0,0,0.45)] border-b-[16px] border-slate-100 relative overflow-hidden">
              <motion.div initial={{ rotate: -15, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", delay: 0.2, stiffness: 110 }} className={cn("w-32 h-32 mx-auto rounded-[2rem] flex items-center justify-center text-6xl shadow-2xl mb-8 border-4 border-white relative z-10", result.tone)}>
                {result.emoji}
              </motion.div>

              <div className="relative z-10">
                <h2 className="text-6xl font-black italic tracking-tighter text-slate-900 leading-none mb-3">{result.title}</h2>
                <p className="text-slate-500 font-bold text-sm leading-relaxed mb-8">{result.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 gap-3 relative z-10">
                <button onClick={() => start(persona)} className="py-6 bg-blue-600 text-white font-black uppercase tracking-[0.25em] rounded-[1.75rem] shadow-2xl shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95 group">
                  <RotateCcw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-700" />
                  Rematch
                </button>

                <button
                  onClick={() => {
                    setShowResult(false);
                    window.setTimeout(() => reviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
                  }}
                  className="py-5 bg-slate-100 text-slate-700 font-black rounded-[1.5rem] hover:bg-slate-200 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.18em] text-xs"
                >
                  <Zap className="w-4 h-4" />
                  {isAnalyzing ? "Analysis loading" : "Review critical moment"}
                </button>

                <Link to="/" className="py-5 bg-white border-4 border-slate-100 text-slate-500 font-black rounded-[1.5rem] hover:bg-slate-50 transition-all uppercase tracking-[0.18em] text-xs text-center">
                  Games Library
                </Link>
              </div>

              <div className="absolute -left-10 -top-10 text-9xl text-slate-50 font-black rotate-12 opacity-50 select-none">♔</div>
              <div className="absolute -right-10 bottom-0 text-9xl text-slate-50 font-black -rotate-12 opacity-50 select-none">♚</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
