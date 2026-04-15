import { useEffect, useState, useCallback, useMemo } from "react";
import { useGame, Difficulty } from "../context/GameContext";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Brain, Monitor, User, Undo2, History, Target, Zap, LayoutGrid, Search, Swords, Play } from "lucide-react";
import { Chessboard } from "react-chessboard";
import { CoachingService, CoachingInsight } from "../lib/coaching-service";
import { getStockfish } from "../lib/stockfish";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Chess } from 'chess.js';

type BotPersona = 'gambiter' | 'positional' | 'tactical';

interface BotProfile {
    name: string;
    avatar: string;
    color: string;
    description: string;
    skillLevel: number;
    depth: number;
    contempt: number;
}

const CHESS_BOTS: Record<BotPersona, BotProfile> = {
    gambiter: {
        name: "Garry Gambiter",
        avatar: "🔥",
        color: "bg-red-500",
        description: "Aggressive and risky. I love sacrifices and open lines!",
        skillLevel: 8,
        depth: 4,
        contempt: 100
    },
    positional: {
        name: "Positional Pete",
        avatar: "🛡️",
        color: "bg-blue-500",
        description: "Slow and steady. I focus on structure and coordination.",
        skillLevel: 10,
        depth: 10,
        contempt: 0
    },
    tactical: {
        name: "Tactical Ted",
        avatar: "⚡",
        color: "bg-amber-500",
        description: "Sharp as a razor. One mistake and I'll find the winning tactic.",
        skillLevel: 20,
        depth: 6,
        contempt: 20
    }
};

function MaterialDisplay({ fen, color }: { fen: string, color: 'w' | 'b' }) {
    const pieces = fen.split(' ')[0];
    const whitePieces = pieces.replace(/[^PRNBQK]/g, '');
    const blackPieces = pieces.replace(/[^prnbqk]/g, '');
    const count = (str: string) => {
        const counts: Record<string, number> = { p: 0, n: 0, b: 0, r: 0, q: 0 };
        str.toLowerCase().split('').forEach(char => { if (counts[char] !== undefined) counts[char]++; });
        return counts;
    };
    const wCounts = count(whitePieces);
    const bCounts = count(blackPieces);
    const initial = { p: 8, n: 2, b: 2, r: 2, q: 1 };
    const capturedByWhite = Object.entries(initial).map(([type, total]) => ({ type, count: total - bCounts[type] })).filter(p => p.count > 0);
    const capturedByBlack = Object.entries(initial).map(([type, total]) => ({ type, count: total - wCounts[type] })).filter(p => p.count > 0);
    const targetList = color === 'w' ? capturedByWhite : capturedByBlack;
    const pieceIcons: Record<string, string> = { p: '♟', n: '♞', b: '♝', r: '♜', q: '♛' };
    return (
        <div className="flex items-center gap-1 opacity-60">
            {targetList.map(p => (
                <div key={p.type} className="flex items-center">
                    {Array.from({ length: p.count }).map((_, i) => <span key={i} className="text-sm -mr-1">{pieceIcons[p.type]}</span>)}
                </div>
            ))}
        </div>
    );
}

function AdvantageBar({ score }: { score: number }) {
    const cappedScore = Math.max(-5, Math.min(5, score));
    const percentage = ((cappedScore + 5) / 10) * 100;
    return (
        <div className="w-2 h-full bg-slate-800 rounded-full overflow-hidden relative border border-white/10 shadow-inner">
            <motion.div className="absolute bottom-0 w-full bg-white" initial={{ height: "50%" }} animate={{ height: `${percentage}%` }} transition={{ type: 'spring', stiffness: 50 }} />
            <div className="absolute top-1/2 left-0 w-full h-px bg-red-500/50 z-10" />
        </div>
    );
}

export function PlayChess() {
  const { gameState, chessGame, startNewGame, makeMove, undo, updateGameState } = useGame();
  const [persona, setPersona] = useState<BotPersona>('tactical');
  const [insight, setInsight] = useState<CoachingInsight | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [evaluation, setEvaluation] = useState<number>(0);
  const [reviewGame, setReviewGame] = useState<Chess | null>(null);

  const bot = useMemo(() => CHESS_BOTS[persona], [persona]);

  const start = useCallback((p: BotPersona = 'tactical') => {
    setPersona(p);
    startNewGame("chess", "play", { difficulty: 'medium' });
    setInsight(null);
    setShowResult(false);
    setIsThinking(false);
    setIsAnalyzing(false);
    setEvaluation(0);
    setReviewGame(null);
  }, [startNewGame]);

  useEffect(() => { start(); }, []);

  const updateEvaluation = useCallback(async (fen: string) => {
      const sf = getStockfish();
      const result = await sf.evaluate(fen, 10);
      setEvaluation(result.evaluation);
  }, []);

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    if (reviewGame) {
        if (reviewGame.turn() !== 'w' || isThinking) return false;
        try {
            const move = reviewGame.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
            if (move) {
                setReviewGame(new Chess(reviewGame.fen()));
                return true;
            }
        } catch (e) { return false; }
        return false;
    }

    if (gameState?.turn !== 'w' || gameState.status !== 'playing' || isThinking) return false;
    const moveResult = makeMove({ from: sourceSquare, to: targetSquare, promotion: "q" });
    return moveResult;
  };

  const getEngineMove = useCallback(async () => {
      const activeGame = reviewGame || chessGame;
      if (!activeGame || activeGame.turn() !== 'b') return;
      if (!reviewGame && gameState?.status !== 'playing') return;

      setIsThinking(true);
      try {
          const sf = getStockfish();
          const move = await sf.getBotMove(activeGame.fen(), {
              skillLevel: bot.skillLevel,
              contempt: bot.contempt,
              depth: bot.depth
          });
          setTimeout(() => {
              if (reviewGame) {
                  reviewGame.move(move);
                  setReviewGame(new Chess(reviewGame.fen()));
              } else {
                  makeMove(move);
              }
              setIsThinking(false);
          }, 800);
      } catch (e) {
          console.error("Stockfish error:", e);
          setIsThinking(false);
      }
  }, [chessGame, gameState, bot, makeMove, reviewGame]);

  const runAnalysis = useCallback(async () => {
      if (!gameState || gameState.status === 'playing' || isAnalyzing || gameState.data.analysis) return;
      setIsAnalyzing(true);
      try {
          const sf = getStockfish();
          const pgnMoves = gameState.moves.map(m => typeof m === 'string' ? m : m.san);
          const analysis = await sf.analyzeGame(pgnMoves);
          updateGameState({ data: { ...gameState.data, analysis } });
      } catch (e) {
          console.error("Analysis error:", e);
      } finally {
          setIsAnalyzing(false);
      }
  }, [gameState, isAnalyzing, updateGameState]);

  useEffect(() => {
      const activeGame = reviewGame || chessGame;
      if (activeGame?.turn() === "b") getEngineMove();

      if (gameState) {
          setInsight(CoachingService.getInsight("chess", gameState));
          if (gameState.status !== 'playing' && gameState.status !== 'waiting') {
              if (!showResult && !gameState.data.analysis) {
                  setTimeout(() => setShowResult(true), 1200);
                  runAnalysis();
              }
          }
          if (gameState.type === 'chess' && chessGame) updateEvaluation(chessGame.fen());
      }
  }, [gameState?.turn, gameState?.status, getEngineMove, runAnalysis, showResult, gameState, chessGame, updateEvaluation, reviewGame]);

  const handleRetryMoment = () => {
      if (!gameState?.data.analysis) return;
      const criticalFen = gameState.data.analysis.criticalFen;
      const review = new Chess(criticalFen);
      setReviewGame(review);
      setShowResult(false);
  };

  if (!gameState || gameState.type !== "chess" || !chessGame) return null;

  const isCheck = chessGame.fen().includes('+') || gameState.status === 'checkmate';
  const displayChess = reviewGame || chessGame;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center select-none overflow-x-hidden">
      <header className="w-full max-w-5xl flex items-center justify-between mb-8">
        <Link to="/" className="p-2 hover:bg-slate-200 rounded-2xl transition-all active:scale-90"><ArrowLeft className="w-6 h-6 text-slate-600" /></Link>
        <div className="text-center group">
            <h1 className="text-2xl font-black italic tracking-tighter text-slate-900 group-hover:scale-105 transition-transform uppercase">{reviewGame ? "Challenge Mode" : "Chess Arena"}</h1>
            <div className="flex items-center gap-1 justify-center mt-0.5">
                <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", bot.color)} />
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">{reviewGame ? "REPLAY CRITICAL TURN" : `VS ${bot.name}`}</span>
            </div>
        </div>
        <button onClick={() => start(persona)} className="p-2 hover:bg-slate-200 rounded-2xl transition-all active:rotate-180 duration-500"><RotateCcw className="w-6 h-6 text-slate-600" /></button>
      </header>

      <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8 flex items-start gap-4">
            {!reviewGame && <AdvantageBar score={evaluation} />}
            <div className="flex-1 flex flex-col gap-6">
                <div className={cn("flex items-center justify-between px-8 py-5 bg-white rounded-[2rem] shadow-sm border border-slate-200 transition-all duration-500 relative overflow-hidden", gameState.turn === 'b' ? "ring-4 ring-red-400 border-transparent shadow-red-100" : "opacity-60")}>
                    <div className="flex items-center gap-4 z-10">
                        <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center text-4xl shadow-xl border-2 border-white", bot.color)}>{bot.avatar}</div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Opponent</p>
                            <p className="text-xl font-black text-slate-900">{bot.name}</p>
                            <MaterialDisplay fen={displayChess.fen()} color="b" />
                        </div>
                    </div>
                    {isThinking && <div className="bg-red-50 px-4 py-2 rounded-xl flex items-center gap-3 border border-red-100 z-10 animate-pulse"><Monitor className="w-4 h-4 text-red-500" /><span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Bot Thinking</span></div>}
                </div>

                <div className="bg-white p-4 rounded-[3rem] shadow-2xl border-4 border-slate-200 relative group overflow-hidden">
                    <Chessboard position={displayChess.fen()} onPieceDrop={onDrop} boardOrientation="white" customBoardStyle={{ borderRadius: '2rem' }} animationDuration={400} />
                    <AnimatePresence>
                        {isCheck && <motion.div initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"><div className="bg-red-600 text-white px-10 py-4 rounded-full font-black italic text-3xl shadow-[0_0_50px_rgba(220,38,38,0.5)] uppercase tracking-tighter ring-8 ring-white/20">CHECK!</div></motion.div>}
                    </AnimatePresence>
                    {reviewGame && (
                        <div className="absolute inset-0 bg-blue-600/10 pointer-events-none border-[12px] border-blue-400/30 rounded-[3rem]" />
                    )}
                </div>

                <div className={cn("flex items-center justify-between px-8 py-5 bg-white rounded-[2rem] shadow-sm border border-slate-200 transition-all duration-500 relative overflow-hidden", gameState.turn === 'w' ? "ring-4 ring-blue-400 border-transparent shadow-blue-100" : "opacity-60")}>
                    <div className="flex items-center gap-4 z-10">
                        <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 shadow-xl border-2 border-white"><User className="w-9 h-9" /></div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Strategist</p>
                            <p className="text-xl font-black text-slate-900 uppercase">YOU (WHITE)</p>
                            <MaterialDisplay fen={displayChess.fen()} color="w" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8 sticky top-8">
            <div className={cn("rounded-[2.5rem] p-8 text-white shadow-2xl transition-all duration-700 border-b-[12px] relative overflow-hidden", (gameState.status === 'playing' || reviewGame) ? "bg-blue-600 border-blue-800 shadow-blue-200" : "bg-slate-800 border-slate-950 shadow-slate-300")}>
               <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-[1rem] flex items-center justify-center border border-white/10 shadow-inner"><Brain className="w-7 h-7 text-blue-100" /></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 block">AI Strategist</span>
               </div>
               <AnimatePresence mode="wait">
                   <motion.div key={insight?.message} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="relative z-10">
                        <p className="text-xl font-black leading-tight mb-2 italic">{insight?.message}</p>
                        {insight?.explanation && <p className="text-blue-100 text-sm font-medium leading-relaxed opacity-80">{insight.explanation}</p>}
                   </motion.div>
               </AnimatePresence>
               {isAnalyzing && <div className="flex items-center gap-2 text-xs font-bold text-white/70 italic mt-4"><Search className="w-3 h-3 animate-spin" /> Deep Search in progress...</div>}
            </div>

            {reviewGame ? (
                <button onClick={() => setReviewGame(null)} className="py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3">
                    <Play className="w-6 h-6" /> Back to Analysis
                </button>
            ) : (
                <button onClick={undo} disabled={gameState.status !== 'playing' || gameState.moves.length === 0 || isThinking} className="group py-6 bg-white border-b-8 border-slate-200 rounded-[2rem] font-black text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-lg active:translate-y-2 active:border-b-0 disabled:opacity-30 disabled:translate-y-0 disabled:border-b-8"><Undo2 className="w-8 h-8 transition-transform group-hover:-rotate-45" /> REWIND MOVE</button>
            )}

            <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-200">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Battle Log</p>
                 <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {gameState.moves.map((m, i) => {
                        if (i % 2 === 0) {
                            const whiteMove = m;
                            const blackMove = gameState.moves[i+1];
                            return (
                                <div key={i} className="col-span-2 grid grid-cols-12 gap-2 items-center py-1">
                                    <span className="col-span-2 text-[10px] font-black text-slate-300">{Math.floor(i/2) + 1}.</span>
                                    <div className="col-span-5 bg-slate-50 px-3 py-2 rounded-xl text-xs font-black text-slate-700">{typeof whiteMove === 'string' ? whiteMove : whiteMove.san}</div>
                                    {blackMove && <div className="col-span-5 bg-slate-900 px-3 py-2 rounded-xl text-xs font-black text-white">{typeof blackMove === 'string' ? blackMove : blackMove.san}</div>}
                                </div>
                            );
                        }
                        return null;
                    })}
                 </div>
            </div>
        </div>
      </main>

      <AnimatePresence>
            {showResult && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl">
                    <motion.div initial={{ scale: 0.8, y: 100 }} animate={{ scale: 1, y: 0 }} className="max-w-md w-full bg-white rounded-[4rem] p-12 text-center shadow-2xl border-b-[16px] border-slate-100">
                        <motion.div initial={{ rotate: -15, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', delay: 0.4 }} className={cn("w-36 h-36 mx-auto rounded-[2.5rem] flex items-center justify-center text-7xl shadow-2xl mb-10 border-4 border-white", gameState.winner === 'w' ? "bg-emerald-500 text-white" : (gameState.winner === 'draw' || gameState.status === 'draw' || gameState.status === 'stalemate' ? "bg-blue-500 text-white" : "bg-red-500 text-white"))}>{gameState.winner === 'w' ? "🏆" : (gameState.winner === 'draw' || gameState.status === 'draw' || gameState.status === 'stalemate' ? "🤝" : "💀")}</motion.div>
                        <h2 className="text-7xl font-black italic tracking-tighter text-slate-900 leading-none mb-4">{gameState.winner === "draw" || gameState.status === 'draw' || gameState.status === 'stalemate' ? "DRAW!" : (gameState.winner === 'w' ? "WINNER!" : "DEFEAT!")}</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <button onClick={handleRetryMoment} className="py-7 bg-blue-600 text-white font-black uppercase tracking-[0.3em] rounded-[2rem] shadow-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95 group"><Target className="w-7 h-7 group-hover:scale-125 transition-transform" /> Retry Blunder</button>
                            <button onClick={() => setShowResult(false)} className="py-5 bg-slate-100 text-slate-600 font-black rounded-3xl hover:bg-slate-200 transition-all uppercase tracking-[0.2em] text-xs">{isAnalyzing ? "Analyzing Mistakes..." : "Review Game"}</button>
                            <button onClick={() => start(persona)} className="py-5 bg-white border-4 border-slate-100 text-slate-400 font-black rounded-3xl hover:bg-slate-50 transition-all uppercase tracking-[0.2em] text-xs">New Match</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}
