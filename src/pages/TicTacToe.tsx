import { useEffect, useState, useCallback, useMemo } from "react";
import { useGame, Difficulty } from "../context/GameContext";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Brain, User, Monitor, History, PlayCircle, Trophy, Target, Sparkles, LayoutGrid, PauseCircle } from "lucide-react";
import { CoachingService, CoachingInsight } from "../lib/coaching-service";
import { motion, AnimatePresence } from "motion/react";

type BoardState = (string | null)[];

const BOT_PROFILES: Record<Difficulty, { name: string; moods: { happy: string, worried: string, thinking: string }; color: string; description: string }> = {
  easy: {
    name: "Pixel the Pup",
    moods: { happy: "🐶", worried: "🦮", thinking: "🦴" },
    color: "bg-emerald-500",
    description: "I love making patterns! I'm still learning the tricky parts of the game."
  },
  medium: {
    name: "Clever Cat",
    moods: { happy: "🐱", worried: "🙀", thinking: "🧶" },
    color: "bg-amber-500",
    description: "I'm a defensive player. I'll block your lines before I build my own."
  },
  hard: {
    name: "Strategic Sage",
    moods: { happy: "🦉", worried: "🧐", thinking: "📖" },
    color: "bg-red-500",
    description: "I calculate every outcome. I'm looking to trap you with a double-threat!"
  }
};

const XMark = () => (
    <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 text-blue-600">
        <motion.path
            d="M 25 25 L 75 75"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
        />
        <motion.path
            d="M 75 25 L 25 75"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
        />
    </svg>
);

const OMark = () => (
    <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 text-red-500">
        <motion.circle
            cx="50"
            cy="50"
            r="32"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
            initial={{ pathLength: 0, rotate: -90 }}
            animate={{ pathLength: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        />
    </svg>
);

export function TicTacToe() {
  const { gameState, startNewGame, updateGameState } = useGame();
  const [insight, setInsight] = useState<CoachingInsight | null>(null);
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);
  const [moveHistory, setMoveHistory] = useState<BoardState[]>([]);
  const [lastMoveIndex, setLastMoveIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isAutoplaying, setIsAutoplaying] = useState(false);

  const profile = useMemo(() => BOT_PROFILES[gameState?.difficulty || 'medium'], [gameState?.difficulty]);

  const botMood = useMemo(() => {
    if (!gameState) return profile.moods.happy;
    if (gameState.status === 'finished') return gameState.winner === 'O' ? profile.moods.happy : profile.moods.worried;
    if (gameState.turn === '2') return profile.moods.thinking;
    return profile.moods.happy;
  }, [gameState, profile]);

  const start = useCallback((diff: Difficulty = 'medium') => {
    startNewGame("tictactoe", "play", { difficulty: diff });
    setReviewIndex(null);
    setMoveHistory([Array(9).fill(null)]);
    setInsight(null);
    setLastMoveIndex(null);
    setShowResult(false);
    setIsAutoplaying(false);
  }, [startNewGame]);

  useEffect(() => {
    start();
  }, []); // Only run once on mount

  const checkWinner = (squares: BoardState) => {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return squares.every(sq => sq) ? "draw" : null;
  };

  const minimax = (squares: BoardState, depth: number, isMaximizing: boolean): number => {
    const result = checkWinner(squares);
    if (result === 'O') return 10 - depth;
    if (result === 'X') return depth - 10;
    if (result === 'draw') return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
          squares[i] = 'O';
          bestScore = Math.max(minimax(squares, depth + 1, false), bestScore);
          squares[i] = null;
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
          squares[i] = 'X';
          bestScore = Math.min(minimax(squares, depth + 1, true), bestScore);
          squares[i] = null;
        }
      }
      return bestScore;
    }
  };

  const findWinningMove = (squares: BoardState, player: string): number | null => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let [a,b,c] of lines) {
        if (squares[a] === player && squares[b] === player && squares[c] === null) return c;
        if (squares[a] === player && squares[c] === player && squares[b] === null) return b;
        if (squares[b] === player && squares[c] === player && squares[a] === null) return a;
    }
    return null;
  };

  const getAIMove = (squares: BoardState, difficulty: Difficulty): number => {
    const available = squares.map((s, i) => s === null ? i : null).filter(s => s !== null) as number[];

    // 1. Check for immediate win (Always take if Hard/Medium)
    const winMove = findWinningMove(squares, 'O');
    if (winMove !== null && difficulty !== 'easy') return winMove;

    // 2. Check for immediate block (Always block if Hard/Medium)
    const blockMove = findWinningMove(squares, 'X');
    if (blockMove !== null && difficulty !== 'easy') return blockMove;

    // Behavioral Strategy
    if (difficulty === 'easy') {
        // "Pixel the Pup" - Plays near existing pieces, ignores diagonals
        const lastMove = lastMoveIndex || 4;
        const local = available.filter(i => Math.abs(i - lastMove) <= 2);
        if (local.length > 0 && Math.random() < 0.7) return local[Math.floor(Math.random() * local.length)];
        return available[Math.floor(Math.random() * available.length)];
    }

    if (difficulty === 'medium') {
        // "Clever Cat" - Defensive: prioritizes corners and center
        const priority = [4, 0, 2, 6, 8].filter(i => squares[i] === null);
        if (priority.length > 0 && Math.random() < 0.6) return priority[Math.floor(Math.random() * priority.length)];
        return available[Math.floor(Math.random() * available.length)];
    }

    // "Strategic Sage" - Perfect Minimax
    let bestScore = -Infinity;
    let move = available[0];
    for (let i of available) {
      squares[i] = 'O';
      let score = minimax(squares, 0, false);
      squares[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
    return move;
  };

  const makeMove = useCallback((i: number, player: 'X' | 'O') => {
    if (!gameState || gameState.status !== "playing") return;
    const board = gameState.data.board;
    if (board[i]) return;

    const newBoard = [...board];
    newBoard[i] = player;
    const winner = checkWinner(newBoard);
    const newHistory = [...moveHistory, newBoard];

    setMoveHistory(newHistory);
    setLastMoveIndex(i);

    updateGameState({
      data: { board: newBoard },
      status: winner ? "finished" : "playing",
      turn: winner ? (player === 'X' ? '1' : '2') : (player === 'X' ? '2' : '1'),
      winner: winner || undefined,
      moves: [...gameState.moves, { player, index: i }]
    });

    if (winner) {
        setTimeout(() => setShowResult(true), 1200);
    }
  }, [gameState, moveHistory, updateGameState]);

  useEffect(() => {
    if (gameState?.turn === "2" && gameState.status === "playing") {
      const delay = Math.random() * 800 + 600;
      const timer = setTimeout(() => {
        makeMove(getAIMove([...gameState.data.board], gameState.difficulty), 'O');
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [gameState?.turn, gameState?.status, gameState?.data.board, gameState?.difficulty, makeMove]);

  useEffect(() => {
    if (gameState) {
      setInsight(CoachingService.getInsight("tictactoe", gameState));
    }
  }, [gameState?.turn, gameState?.status, gameState]);

  useEffect(() => {
    if (isAutoplaying && reviewIndex !== null && reviewIndex < moveHistory.length - 1) {
        const timer = setTimeout(() => {
            setReviewIndex(reviewIndex + 1);
            if (reviewIndex + 1 === moveHistory.length - 1) setIsAutoplaying(false);
        }, 800);
        return () => clearTimeout(timer);
    }
  }, [isAutoplaying, reviewIndex, moveHistory.length]);

  const handleRetryBlunder = () => {
    if (!insight || insight.turningPointIndex === undefined) return;
    const retryIdx = insight.turningPointIndex;
    const boardAtRetry = moveHistory[retryIdx];
    const movesAtRetry = gameState.moves.slice(0, retryIdx);

    updateGameState({
        data: { board: boardAtRetry },
        status: "playing",
        turn: "1",
        winner: undefined,
        moves: movesAtRetry
    });
    setMoveHistory(moveHistory.slice(0, retryIdx + 1));
    setShowResult(false);
    setReviewIndex(null);
  };

  if (!gameState || gameState.type !== "tictactoe") return null;

  const currentBoard = reviewIndex !== null ? moveHistory[reviewIndex] : gameState.data.board;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center select-none overflow-x-hidden">
      <header className="w-full max-w-md flex items-center justify-between mb-8">
        <Link to="/dashboard" className="p-2 hover:bg-slate-200 rounded-2xl transition-all active:scale-90">
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </Link>
        <div className="text-center group">
            <h1 className="text-2xl font-black italic tracking-tighter text-slate-900 group-hover:scale-105 transition-transform uppercase">{gameState.status === 'playing' ? "Tic Tac Toe" : "Match Review"}</h1>
            <div className="flex items-center gap-1 justify-center mt-0.5">
                <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", profile.color)} />
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">{gameState.difficulty} MODE</span>
            </div>
        </div>
        <button onClick={() => start(gameState.difficulty)} className="p-2 hover:bg-slate-200 rounded-2xl transition-all active:rotate-180 duration-500">
          <RotateCcw className="w-6 h-6 text-slate-600" />
        </button>
      </header>

      <main className="w-full max-w-md relative">
        <AnimatePresence mode="wait">
            <motion.div
                key={gameState.status === 'finished' ? 'finished' : 'playing'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={cn(
                    "rounded-3xl p-6 text-white mb-8 shadow-2xl flex items-start gap-5 transition-all duration-700 border-b-8 border-black/20 relative overflow-hidden",
                    gameState.status === 'finished' ? "bg-slate-800" : "bg-blue-600"
                )}
            >
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 z-10">
                    {gameState.status === 'finished' ? <History className="w-6 h-6 text-slate-200" /> : <Brain className="w-6 h-6 text-blue-100" />}
                </div>
                <div className="z-10 flex-1">
                    <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                        {gameState.status === 'finished' ? "Post-Game Analysis" : "AI Strategy Coach"}
                    </p>
                    <p className="font-bold leading-tight text-sm md:text-base">
                        {insight?.message}
                    </p>
                    {gameState.status === 'finished' && insight?.turningPointIndex !== undefined && (
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => { setReviewIndex(0); setIsAutoplaying(true); }}
                                className="flex items-center gap-2 text-[10px] bg-white/10 hover:bg-white/20 active:scale-95 px-3 py-2 rounded-xl transition-all font-black uppercase tracking-widest border border-white/5"
                            >
                                <PlayCircle className="w-3 h-3" /> Story
                            </button>
                            <button
                                onClick={handleRetryBlunder}
                                className="flex items-center gap-2 text-[10px] bg-blue-500 hover:bg-blue-600 active:scale-95 px-3 py-2 rounded-xl transition-all font-black uppercase tracking-widest border border-blue-400/30 shadow-lg"
                            >
                                <Target className="w-3 h-3" /> Retry Blunder
                            </button>
                        </div>
                    )}
                </div>
                {insight?.category && (
                    <div className="absolute top-2 right-4 text-white/10 text-4xl font-black italic select-none uppercase">
                        {insight.category}
                    </div>
                )}
            </motion.div>
        </AnimatePresence>

        <motion.div
            animate={gameState.status === 'finished' && gameState.winner !== 'draw' && gameState.winner !== 'X' ? { x: [-2, 2, -2, 2, 0] } : {}}
            className="bg-white p-5 rounded-[2.5rem] shadow-xl border-4 border-slate-200 relative mb-10 overflow-hidden"
        >
            <div className="grid grid-cols-3 gap-4 aspect-square">
                {currentBoard.map((cell: string | null, i: number) => {
                    const isHighlighted = reviewIndex !== null && insight?.highlightSquares?.includes(i);
                    const isSuggested = gameState.turn === '1' && gameState.status === 'playing' && insight?.highlightSquares?.includes(i);

                    return (
                        <motion.button
                            key={i}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => reviewIndex === null && makeMove(i, 'X')}
                            disabled={gameState.status === "finished" || gameState.turn === "2" || reviewIndex !== null}
                            className={cn(
                                "bg-slate-100 rounded-3xl text-6xl font-black flex items-center justify-center transition-all duration-300 relative group overflow-hidden",
                                !cell && gameState.status === "playing" && gameState.turn === "1" && "hover:bg-blue-50 hover:shadow-inner",
                                cell === "X" && "bg-white shadow-md",
                                cell === "O" && "bg-white shadow-md",
                                reviewIndex !== null && "opacity-80 scale-95",
                                lastMoveIndex === i && gameState.status === 'playing' && "ring-4 ring-blue-200",
                                isSuggested && "ring-4 ring-blue-400 animate-pulse bg-blue-50",
                                isHighlighted && "ring-8 ring-amber-400 z-20 scale-105"
                            )}
                        >
                            <AnimatePresence>
                                {cell === 'X' && <XMark />}
                                {cell === 'O' && <OMark />}
                            </AnimatePresence>
                        </motion.button>
                    );
                })}
            </div>

            {gameState.turn === "2" && gameState.status === "playing" && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center rounded-[2rem]"
                >
                    <div className="bg-white/90 px-6 py-3 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-3">
                         <div className="flex gap-1">
                            <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-red-400 rounded-full" />
                            <motion.div animate={{ height: [12, 4, 12] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1 bg-red-400 rounded-full" />
                            <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1 bg-red-400 rounded-full" />
                         </div>
                         <span className="text-xs font-black text-slate-800 uppercase tracking-widest">{profile.name} thinking...</span>
                    </div>
                </motion.div>
            )}
        </motion.div>

        <AnimatePresence>
            {showResult && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-50/90 backdrop-blur-md rounded-[3rem]"
                >
                    <div className="text-center space-y-8 w-full px-6">
                        <motion.div
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', damping: 10, delay: 0.2 }}
                            className={cn(
                                "w-28 h-28 mx-auto rounded-[2rem] flex items-center justify-center text-5xl shadow-2xl border-4 border-white",
                                gameState.winner === 'X' ? "bg-emerald-500 text-white" : (gameState.winner === 'draw' ? "bg-blue-500 text-white" : "bg-red-500 text-white")
                            )}
                        >
                            {gameState.winner === 'X' ? "🏆" : (gameState.winner === 'draw' ? "🤝" : "💀")}
                        </motion.div>
                        <div className="space-y-2">
                            <h2 className="text-6xl font-black italic tracking-tighter text-slate-900 leading-none">
                                {gameState.winner === "draw" ? "DRAW!" : (gameState.winner === 'X' ? "WINNER!" : "DEFEAT!")}
                            </h2>
                            <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Tactical Performance Reviewed</p>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {insight?.turningPointIndex !== undefined && (
                                <button
                                    onClick={handleRetryBlunder}
                                    className="py-6 bg-blue-600 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 group"
                                >
                                    <Target className="w-6 h-6 group-hover:scale-125 transition-transform" /> Retry Blunder
                                </button>
                            )}
                            <button
                                onClick={() => setShowResult(false)}
                                className="py-5 bg-white border-2 border-slate-200 text-slate-600 font-black rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px]"
                            >
                                Analyze Match
                            </button>
                            <button
                                onClick={() => start(gameState.difficulty)}
                                className="py-5 bg-slate-100 text-slate-400 font-black rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest text-[10px]"
                            >
                                New Match
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <div className="flex items-center justify-between px-4 mb-12">
            <div className={cn("flex items-center gap-4 transition-all duration-500", (gameState.turn !== "1" && gameState.status === 'playing') && "opacity-20 scale-90 grayscale")}>
                <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 shadow-xl shadow-blue-500/10 border-2 border-white">
                    <User className="w-8 h-8" />
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Strategist</p>
                    <p className="text-xl font-black text-slate-900 leading-none uppercase">YOU (X)</p>
                </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-xs font-bold">VS</div>

            <div className={cn("flex items-center gap-4 text-right transition-all duration-500", (gameState.turn !== "2" && gameState.status === 'playing') && "opacity-20 scale-90 grayscale")}>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{gameState.difficulty}</p>
                    <p className="text-xl font-black text-slate-900 leading-none uppercase">{profile.name} (O)</p>
                </div>
                <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-xl border-2 border-white transition-transform duration-500", profile.color, gameState.turn === '2' && gameState.status === 'playing' && "scale-110")}>
                    {botMood}
                </div>
            </div>
        </div>

        {gameState.status === "finished" && !showResult && (
           <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 pb-10"
           >
              <div className="flex flex-col items-center gap-4">
                 <div className="flex items-center justify-between w-full">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-blue-500" /> Interactive Review
                    </p>
                    {isAutoplaying ? (
                        <button onClick={() => setIsAutoplaying(false)} className="text-[10px] font-bold text-red-500 uppercase flex items-center gap-1">
                            <PauseCircle className="w-3 h-3" /> Stop
                        </button>
                    ) : (
                        <button onClick={() => { setReviewIndex(0); setIsAutoplaying(true); }} className="text-[10px] font-bold text-blue-500 uppercase flex items-center gap-1">
                            <PlayCircle className="w-3 h-3" /> Replay
                        </button>
                    )}
                 </div>
                 <div className="flex items-center justify-center flex-wrap gap-2">
                    {moveHistory.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => { setReviewIndex(idx === moveHistory.length - 1 ? null : idx); setIsAutoplaying(false); }}
                            className={cn(
                                "w-12 h-12 rounded-2xl font-black text-sm transition-all duration-300 flex items-center justify-center border-b-4",
                                (reviewIndex === idx || (reviewIndex === null && idx === moveHistory.length - 1))
                                    ? "bg-blue-600 text-white border-blue-800 shadow-lg scale-110 -translate-y-1"
                                    : "bg-white text-slate-400 border-slate-200 hover:border-blue-200"
                            )}
                        >
                            {idx === 0 ? "ST" : idx}
                        </button>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4">
                 <button onClick={() => start(gameState.difficulty)} className="py-6 bg-blue-600 text-white font-black uppercase tracking-[0.15em] text-lg rounded-[2rem] shadow-2xl shadow-blue-500/40 hover:bg-blue-700 transition-all active:scale-[0.98] border-b-8 border-blue-900 flex items-center justify-center gap-3">
                    <RotateCcw className="w-6 h-6" /> Play Again
                 </button>

                 <div className="grid grid-cols-2 gap-4">
                    <Link to="/play" className="py-5 bg-white border-4 border-slate-200 text-slate-700 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-center">
                        <LayoutGrid className="w-4 h-4" /> Library
                    </Link>
                    {(['easy', 'medium', 'hard'] as Difficulty[]).filter(d => d !== gameState.difficulty).slice(0, 1).map(d => (
                        <button
                            key={d}
                            onClick={() => start(d)}
                            className="py-5 bg-white border-4 border-slate-200 text-slate-700 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                        >
                            <Target className="w-4 h-4" /> Try {d}
                        </button>
                    ))}
                 </div>
              </div>
           </motion.div>
        )}
      </main>
    </div>
  );
}
