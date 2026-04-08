import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Share2, MoreVertical, Play, Pause, SkipBack, SkipForward, AlertTriangle, CheckCircle2, Zap, BrainCircuit, Info } from "lucide-react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

const DEFAULT_PGN = `[Event "Live Chess"]
[Site "Chess.com"]
[Date "2023.10.24"]
[Round "-"]
[White "GrandmasterBot"]
[Black "Player"]
[Result "1-0"]
[ECO "C50"]

1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. d3 Nf6 5. Nc3 d6 6. Bg5 h6 7. Bh4 g5 8. Bg3 Bg4 9. h3 Bh5 10. Nd5 Nxd5 11. Bxd5 Nd4 12. c3 Nxf3+ 13. gxf3 c6 14. Bb3 Qf6 15. Qd2 Bxf3 16. Rg1 O-O-O 17. Bd1 d5 18. d4 exd4 19. e5 Rhe8 20. cxd4 Bb6 21. Kf1 Qf5 22. Bxf3 Qxf3 23. Re1 f6 24. Re3 Qf5 25. Kg2 fxe5 26. Bxe5 Bc7 27. Rge1 Bxe5 28. Rxe5 Rxe5 29. Rxe5 Qf6 30. Qe3 Rf8 31. Re6 Qf4 32. Re8+ Rxe8 33. Qxe8+ Kc7 34. Qe7+ Kb6 35. Qc5+ Kc7 36. Qe7+ 1-0`;

export function GameAnalysis() {
  const [game, setGame] = useState(new Chess());
  const [moveIndex, setMoveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const fullGame = useMemo(() => {
    const g = new Chess();
    g.loadPgn(DEFAULT_PGN);
    return g;
  }, []);

  const history = useMemo(() => fullGame.history({ verbose: true }), [fullGame]);

  useEffect(() => {
    const g = new Chess();
    for (let i = 0; i < moveIndex; i++) {
      g.move(history[i]);
    }
    setGame(g);
  }, [moveIndex, history]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setMoveIndex((prev) => {
          if (prev < history.length) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, history.length]);

  const handleNext = () => {
    if (moveIndex < history.length) setMoveIndex(moveIndex + 1);
  };

  const handlePrev = () => {
    if (moveIndex > 0) setMoveIndex(moveIndex - 1);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const currentMove = moveIndex > 0 ? history[moveIndex - 1] : null;
  const moveText = currentMove 
    ? `${Math.ceil(moveIndex / 2)}.${moveIndex % 2 === 0 ? '...' : ''} ${currentMove.san}` 
    : 'Start position';

  const isBlunder = moveIndex === 35; // Mock blunder at 18. d4 (move 35 in history)

  return (
    <div className="flex-1 flex flex-col h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 pb-16 transition-colors duration-200">
      <header className="flex items-center p-4 border-b border-slate-200 dark:border-slate-800/50 backdrop-blur-md bg-white/75 dark:bg-[#020617]/75 shrink-0 transition-colors duration-200">
        <Link
          to="/analyze"
          className="text-slate-900 dark:text-slate-100 p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div className="flex-1 ml-2">
          <h1 className="text-sm font-bold leading-tight tracking-tight">
            vs. GrandmasterBot
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Italian Game • {Math.ceil(history.length / 2)} moves</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-slate-900 dark:text-slate-100 p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="text-slate-900 dark:text-slate-100 p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden flex flex-col transition-colors duration-200">
            <div className="w-full aspect-square">
              <Chessboard 
                options={{
                  position: game.fen(),
                  boardOrientation: "white",
                  darkSquareStyle: { backgroundColor: '#739552' },
                  lightSquareStyle: { backgroundColor: '#ebecd0' },
                  animationDurationInMs: 200,
                  allowDragging: false
                }}
              />
            </div>
            
            <div className="h-14 bg-slate-50 dark:bg-slate-900 flex items-center justify-between px-4 shrink-0 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <button onClick={handlePrev} disabled={moveIndex === 0} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-50">
                  <SkipBack className="h-5 w-5" />
                </button>
                <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-colors">
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                </button>
                <button onClick={handleNext} disabled={moveIndex === history.length} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-50">
                  <SkipForward className="h-5 w-5" />
                </button>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-300 font-mono transition-colors duration-200">
                {moveText}
              </div>
            </div>
          </div>
        </div>

        {isBlunder && (
          <div className="px-4 py-2">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center gap-4 shadow-lg transition-colors duration-200">
              <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-500/10 flex items-center justify-center border border-rose-200 dark:border-rose-500/20 flex-shrink-0 transition-colors duration-200">
                <AlertTriangle className="h-6 w-6 text-rose-600 dark:text-rose-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-slate-900 dark:text-white font-bold text-sm transition-colors duration-200">Blunder detected</h3>
                  <span className="text-rose-600 dark:text-rose-400 text-xs font-bold font-mono transition-colors duration-200">-2.4</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed transition-colors duration-200">
                  18. d4 allows Black to fork your knight and rook with 18... e4.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="px-4 py-4 space-y-4">
          <h3 className="text-slate-900 dark:text-white text-sm font-bold tracking-tight px-1 flex items-center gap-2 transition-colors duration-200">
            <BrainCircuit className="h-4 w-4 text-blue-500" />
            Engine Evaluation
          </h3>
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-colors duration-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider transition-colors duration-200">Best Move</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold font-mono transition-colors duration-200">+1.2</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50 transition-colors duration-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-500 transition-colors duration-200">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-slate-900 dark:text-white font-bold text-sm font-mono transition-colors duration-200">18. Ne4</p>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5 transition-colors duration-200">Centralizes the knight and defends d2.</p>
              </div>
              <button className="text-blue-600 dark:text-blue-500 text-xs font-bold uppercase tracking-wider hover:underline transition-colors duration-200">
                Show
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-colors duration-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider transition-colors duration-200">Alternative</span>
              <span className="text-blue-600 dark:text-blue-400 text-sm font-bold font-mono transition-colors duration-200">+0.8</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50 transition-colors duration-200">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-500 transition-colors duration-200">
                <Zap className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-slate-900 dark:text-white font-bold text-sm font-mono transition-colors duration-200">18. Rad1</p>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5 transition-colors duration-200">Develops the rook and prepares d5.</p>
              </div>
              <button className="text-blue-600 dark:text-blue-500 text-xs font-bold uppercase tracking-wider hover:underline transition-colors duration-200">
                Show
              </button>
            </div>
          </div>
        </div>
        
        {isBlunder && (
          <div className="px-4 py-2 pb-8">
            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl p-4 flex items-start gap-3 transition-colors duration-200">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-500 mt-0.5 flex-shrink-0 transition-colors duration-200" />
              <p className="text-blue-800 dark:text-blue-100 text-xs leading-relaxed transition-colors duration-200">
                This blunder is a recurring pattern in your games. Consider adding "Fork Defense" to your daily study plan.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
