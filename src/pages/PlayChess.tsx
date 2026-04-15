import { useEffect, useState, useCallback, useMemo } from "react";
import { useGame, Difficulty } from "../context/GameContext";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Brain, Monitor, User, Undo2, History, Target, Zap, LayoutGrid, Search } from "lucide-react";
import { Chessboard } from "react-chessboard";
import { CoachingService, CoachingInsight } from "../lib/coaching-service";
import { getStockfish } from "../lib/stockfish";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

type BotPersona = 'gambiter' | 'positional' | 'tactical';

interface BotProfile {
    name: string;
    avatar: string;
    color: string;
    description: string;
    skillLevel: number;
    depth: number;
}

const CHESS_BOTS: Record<BotPersona, BotProfile> = {
    gambiter: {
        name: "Garry Gambiter",
        avatar: "🔥",
        color: "bg-red-500",
        description: "Aggressive and risky. I love sacrifices and open lines!",
        skillLevel: 12,
        depth: 5
    },
    positional: {
        name: "Positional Pete",
        avatar: "🛡️",
        color: "bg-blue-500",
        description: "Slow and steady. I focus on structure and coordination.",
        skillLevel: 8,
        depth: 12
    },
    tactical: {
        name: "Tactical Ted",
        avatar: "⚡",
        color: "bg-amber-500",
        description: "Sharp as a razor. One mistake and I'll find the winning tactic.",
        skillLevel: 18,
        depth: 8
    }
};

export function PlayChess() {
  const { gameState, chessGame, startNewGame, makeMove, undo, updateGameState } = useGame();
  const [persona, setPersona] = useState<BotPersona>('tactical');
  const [insight, setInsight] = useState<CoachingInsight | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const bot = useMemo(() => CHESS_BOTS[persona], [persona]);

  const start = useCallback((p: BotPersona = 'tactical') => {
    setPersona(p);
    startNewGame("chess", "play", { difficulty: 'medium' });
    setInsight(null);
    setShowResult(false);
    setIsThinking(false);
    setIsAnalyzing(false);
  }, [startNewGame]);

  useEffect(() => {
    start();
  }, []);

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    if (gameState?.turn !== 'w' || gameState.status !== 'playing' || isThinking) return false;

    const moveResult = makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    return moveResult;
  };

  const getEngineMove = useCallback(async () => {
      if (!chessGame || gameState?.turn !== 'b' || gameState.status !== 'playing') return;

      setIsThinking(true);
      try {
          const sf = getStockfish();
          const move = await sf.getBotMove(chessGame.fen(), bot.skillLevel);

          setTimeout(() => {
              makeMove(move);
              setIsThinking(false);
          }, 800);
      } catch (e) {
          console.error("Stockfish error:", e);
          setIsThinking(false);
      }
  }, [chessGame, gameState, bot, makeMove]);

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
      if (gameState?.turn === "b") {
          getEngineMove();
      }
      if (gameState) {
          setInsight(CoachingService.getInsight("chess", gameState));
          if (gameState.status !== 'playing' && gameState.status !== 'waiting') {
              if (!showResult && !gameState.data.analysis) {
                  setTimeout(() => setShowResult(true), 1200);
                  runAnalysis();
              }
          }
      }
  }, [gameState?.turn, gameState?.status, getEngineMove, runAnalysis, showResult, gameState]);

  if (!gameState || gameState.type !== "chess" || !chessGame) return null;

  const isCheck = chessGame.fen().includes('+') || gameState.status === 'checkmate';

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center select-none overflow-x-hidden">
      <header className="w-full max-w-5xl flex items-center justify-between mb-8">
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

      <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Side: Players & Board */}
        <div className="lg:col-span-7 flex flex-col gap-6">
            <div className={cn("flex items-center justify-between px-8 py-5 bg-white rounded-[2rem] shadow-sm border border-slate-200 transition-all duration-500 relative overflow-hidden", gameState.turn === 'b' ? "ring-4 ring-red-400 border-transparent shadow-red-100" : "opacity-60")}>
                <div className="flex items-center gap-4 z-10">
                    <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center text-4xl shadow-lg border-2 border-white", bot.color)}>
                        {bot.avatar}
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Opponent</p>
                        <p className="text-xl font-black text-slate-900">{bot.name}</p>
                    </div>
                </div>
                {isThinking && (
                    <div className="bg-red-50 px-4 py-2 rounded-xl flex items-center gap-3 border border-red-100 z-10 animate-pulse">
                        <Monitor className="w-4 h-4 text-red-500" />
                        <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Bot Thinking</span>
                    </div>
                )}
                <div className="absolute -right-4 -bottom-4 text-8xl font-black italic text-slate-50 select-none opacity-50">BOT</div>
            </div>

            <div className="bg-white p-4 rounded-[3rem] shadow-2xl border-4 border-slate-200 relative group overflow-hidden">
                <Chessboard
                    position={chessGame.fen()}
                    onPieceDrop={onDrop}
                    boardOrientation="white"
                    customBoardStyle={{
                        borderRadius: '2rem',
                    }}
                    animationDuration={400}
                />

                <AnimatePresence>
                    {isCheck && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
                        >
                            <div className="bg-red-600 text-white px-10 py-4 rounded-full font-black italic text-3xl shadow-[0_0_50px_rgba(220,38,38,0.5)] uppercase tracking-tighter ring-8 ring-white/20">CHECK!</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className={cn("flex items-center justify-between px-8 py-5 bg-white rounded-[2rem] shadow-sm border border-slate-200 transition-all duration-500 relative overflow-hidden", gameState.turn === 'w' ? "ring-4 ring-blue-400 border-transparent shadow-blue-100" : "opacity-60")}>
                <div className="flex items-center gap-4 z-10">
                    <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 shadow-xl border-2 border-white">
                        <User className="w-9 h-9" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Strategist</p>
                        <p className="text-xl font-black text-slate-900 uppercase">YOU (WHITE)</p>
                    </div>
                </div>
                <div className="absolute -right-4 -bottom-4 text-8xl font-black italic text-slate-50 select-none opacity-50 uppercase">YOU</div>
            </div>
        </div>

        {/* Right Side: Analysis & Controls */}
        <div className="lg:col-span-5 flex flex-col gap-8 sticky top-8">
            <div className={cn(
                "rounded-[2.5rem] p-10 text-white shadow-2xl transition-all duration-700 border-b-[12px] relative overflow-hidden",
                gameState.status === 'playing' ? "bg-blue-600 border-blue-800 shadow-blue-200" : "bg-slate-800 border-slate-950 shadow-slate-300"
            )}>
               <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-14 h-14 bg-white/20 rounded-[1.25rem] flex items-center justify-center border border-white/10 shadow-inner">
                    <Brain className="w-8 h-8 text-blue-100" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/50 block">AI Strategist</span>
                    <span className="text-xs font-bold text-white/90 italic underline underline-offset-4 decoration-white/20">Analyzing Flow...</span>
                  </div>
               </div>

               <AnimatePresence mode="wait">
                   <motion.p
                    key={insight?.message}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="text-2xl font-black leading-tight mb-4 relative z-10 italic"
                   >
                    {insight?.message}
                   </motion.p>
               </AnimatePresence>

               {isAnalyzing && (
                   <div className="flex items-center gap-2 text-xs font-bold text-white/70 italic mb-4">
                       <Search className="w-3 h-3 animate-spin" /> Deep Search in progress...
                   </div>
               )}

               <p className="text-white/60 text-sm leading-relaxed relative z-10 font-medium italic">
                  "{bot.description}"
               </p>

               <div className="absolute -bottom-6 -right-6 text-white/5 text-[10rem] font-black italic select-none pointer-events-none">
                   ♔
               </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <button
                    onClick={undo}
                    disabled={gameState.status !== 'playing' || gameState.moves.length === 0 || isThinking}
                    className="group py-6 bg-white border-b-8 border-slate-200 rounded-[2rem] font-black text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-lg active:translate-y-2 active:border-b-0 disabled:opacity-30 disabled:translate-y-0 disabled:border-b-8"
                >
                    <Undo2 className="w-8 h-8 transition-transform group-hover:-rotate-45" />
                    REWIND MOVE
                </button>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-200">
                 <div className="flex items-center justify-between mb-8">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Battle Log</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Live Sync</span>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-4 custom-scrollbar">
                    {gameState.moves.map((m, i) => {
                        if (i % 2 === 0) {
                            const whiteMove = m;
                            const blackMove = gameState.moves[i+1];
                            return (
                                <div key={i} className="col-span-2 grid grid-cols-12 gap-3 items-center py-2 group">
                                    <span className="col-span-2 text-[10px] font-black text-slate-300 group-hover:text-blue-400 transition-colors">{Math.floor(i/2) + 1}.</span>
                                    <div className="col-span-5 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 text-sm font-black text-slate-700 shadow-sm transition-all hover:scale-105">
                                        {typeof whiteMove === 'string' ? whiteMove : whiteMove.san}
                                    </div>
                                    {blackMove && (
                                        <div className="col-span-5 bg-slate-900 px-4 py-3 rounded-2xl text-sm font-black text-white shadow-xl transition-all hover:scale-105 border border-slate-800">
                                            {typeof blackMove === 'string' ? blackMove : blackMove.san}
                                        </div>
                                    )}
                                </div>
                            );
                        }
                        return null;
                    })}
                    {gameState.moves.length === 0 && (
                        <div className="col-span-2 py-12 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                            <History className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                            <p className="text-xs font-black text-slate-300 uppercase tracking-[0.2em]">Game hasn't started</p>
                        </div>
                    )}
                 </div>
            </div>

            {gameState.moves.length === 0 && (
                <div className="space-y-4">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] text-center">CHOOSE YOUR ADVERSARY</p>
                    <div className="grid grid-cols-3 gap-3">
                        {(Object.keys(CHESS_BOTS) as BotPersona[]).map(p => (
                            <button
                                key={p}
                                onClick={() => start(p)}
                                className={cn(
                                    "p-4 rounded-[1.5rem] border-4 transition-all flex flex-col items-center gap-2 group relative overflow-hidden",
                                    persona === p ? "bg-white border-blue-500 shadow-2xl scale-110 -translate-y-1" : "bg-white/60 border-transparent hover:bg-white opacity-40 hover:opacity-100"
                                )}
                            >
                                <span className="text-3xl transition-transform group-hover:scale-110">{CHESS_BOTS[p].avatar}</span>
                                <span className="text-[10px] font-black uppercase tracking-tighter">{CHESS_BOTS[p].name.split(' ')[1]}</span>
                                {persona === p && <div className="absolute top-0 right-0 p-1 bg-blue-500 text-white rounded-bl-xl"><Target className="w-2.5 h-2.5" /></div>}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </main>

      <AnimatePresence>
            {showResult && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl"
                >
                    <motion.div
                        initial={{ scale: 0.8, y: 100 }}
                        animate={{ scale: 1, y: 0 }}
                        className="max-w-md w-full bg-white rounded-[4rem] p-12 text-center shadow-[0_0_100px_rgba(0,0,0,0.5)] border-b-[16px] border-slate-100 relative overflow-hidden"
                    >
                        <motion.div
                            initial={{ rotate: -15, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ type: 'spring', delay: 0.4, stiffness: 100 }}
                            className={cn(
                                "w-36 h-36 mx-auto rounded-[2.5rem] flex items-center justify-center text-7xl shadow-2xl mb-10 border-4 border-white relative z-10",
                                gameState.winner === 'w' ? "bg-emerald-500 text-white" : (gameState.winner === 'draw' || gameState.status === 'draw' || gameState.status === 'stalemate' ? "bg-blue-500 text-white" : "bg-red-500 text-white")
                            )}
                        >
                            {gameState.winner === 'w' ? "🏆" : (gameState.winner === 'draw' || gameState.status === 'draw' || gameState.status === 'stalemate' ? "🤝" : "💀")}
                        </motion.div>

                        <div className="relative z-10">
                            <h2 className="text-7xl font-black italic tracking-tighter text-slate-900 leading-none mb-4">
                                {gameState.winner === "draw" || gameState.status === 'draw' || gameState.status === 'stalemate' ? "DRAW!" : (gameState.winner === 'w' ? "WINNER!" : "DEFEAT!")}
                            </h2>
                            <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] mb-12">Match Analysis Synthesized</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 relative z-10">
                            <button
                                onClick={() => start(persona)}
                                className="py-7 bg-blue-600 text-white font-black uppercase tracking-[0.3em] rounded-[2rem] shadow-2xl shadow-blue-500/40 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95 group"
                            >
                                <RotateCcw className="w-7 h-7 group-hover:rotate-180 transition-transform duration-700" /> Rematch Bot
                            </button>
                            <button
                                onClick={() => setShowResult(false)}
                                className="py-5 bg-slate-100 text-slate-600 font-black rounded-3xl hover:bg-slate-200 transition-all uppercase tracking-[0.2em] text-xs"
                            >
                                {isAnalyzing ? "Analyzing Mistakes..." : "Detailed Review"}
                            </button>
                            <Link
                                to="/"
                                className="py-5 bg-white border-4 border-slate-100 text-slate-400 font-black rounded-3xl hover:bg-slate-50 transition-all uppercase tracking-[0.2em] text-xs text-center"
                            >
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
