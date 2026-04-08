import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Camera, FileText, Search, BrainCircuit, History, ChevronRight, Play, X } from "lucide-react";

export function Analyze() {
  const [showPgnInput, setShowPgnInput] = useState(false);
  const [pgnText, setPgnText] = useState("");
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (pgnText.trim()) {
      // In a real app, we would pass this PGN to the GameAnalysis component
      // For now, we'll just navigate to the analysis page
      navigate("/game-analysis");
    } else {
      alert("Please enter a valid PGN.");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-32 bg-slate-50 dark:bg-[#0b111a] text-slate-900 dark:text-slate-100 min-h-screen relative transition-colors duration-200">
      <header className="sticky top-0 z-50 flex items-center p-4 border-b border-slate-200 dark:border-slate-800/50 backdrop-blur-md bg-white/75 dark:bg-[#0b111a]/75 transition-colors duration-200">
        <Link
          to="/dashboard"
          className="text-slate-900 dark:text-slate-100 p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 ml-2">
          Game Analysis
        </h1>
        <button className="text-slate-900 dark:text-slate-100 p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
          <History className="h-6 w-6" />
        </button>
      </header>

      <div className="p-4">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 shadow-xl shadow-blue-900/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <BrainCircuit className="h-6 w-6 text-blue-200" />
              <h2 className="text-white text-xl font-bold tracking-tight">
                Neural Engine
              </h2>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed mb-6 max-w-[280px]">
              Upload your games to receive Grandmaster-level insights, blunder detection, and personalized improvement plans.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setShowPgnInput(true)}
                className="flex flex-col items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 transition-colors backdrop-blur-sm"
              >
                <Upload className="h-6 w-6 text-white" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">PGN File</span>
              </button>
              <button 
                onClick={() => alert("Camera scanning feature coming soon!")}
                className="flex flex-col items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 transition-colors backdrop-blur-sm"
              >
                <Camera className="h-6 w-6 text-white" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Scan Board</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPgnInput && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative transition-colors duration-200">
            <button 
              onClick={() => setShowPgnInput(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-200">Paste PGN</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 transition-colors duration-200">Paste your game's PGN below to analyze it.</p>
            <textarea
              value={pgnText}
              onChange={(e) => setPgnText(e.target.value)}
              className="w-full h-48 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-none transition-colors duration-200"
              placeholder="[Event &quot;Live Chess&quot;]..."
            />
            <button 
              onClick={handleAnalyze}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-blue-500/20"
            >
              Analyze Game
            </button>
          </div>
        </div>
      )}

      <div className="px-4 py-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 dark:text-slate-500 transition-colors duration-200" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-800 rounded-xl leading-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
            placeholder="Search past analyses..."
          />
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight transition-colors duration-200">
            Recent Analyses
          </h3>
        </div>
        
        <div className="space-y-3">
          <Link to="/game-analysis" className="block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 transition-colors duration-200">
                  <span className="text-slate-900 dark:text-white font-bold text-xs transition-colors duration-200">W</span>
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm transition-colors duration-200">vs. GrandmasterBot</h4>
                  <p className="text-slate-500 text-[11px] font-medium">Italian Game • 32 moves</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold transition-colors duration-200">+12 ELO</span>
                <span className="text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-wider mt-1 transition-colors duration-200">2 hrs ago</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 transition-colors duration-200">
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">Accuracy</span>
                  <span className="text-slate-900 dark:text-white text-sm font-bold transition-colors duration-200">88.4%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">Blunders</span>
                  <span className="text-rose-600 dark:text-rose-400 text-sm font-bold transition-colors duration-200">1</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">Brilliant</span>
                  <span className="text-blue-600 dark:text-blue-400 text-sm font-bold transition-colors duration-200">2</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <Play className="h-4 w-4 text-blue-600 dark:text-blue-500 group-hover:text-white ml-0.5 transition-colors duration-200" />
              </div>
            </div>
          </Link>

          <Link to="#" className="block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 transition-colors duration-200">
                  <span className="text-slate-900 dark:text-white font-bold text-xs transition-colors duration-200">B</span>
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm transition-colors duration-200">vs. Player4592</h4>
                  <p className="text-slate-500 text-[11px] font-medium">Sicilian Defense • 45 moves</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-rose-600 dark:text-rose-400 text-xs font-bold transition-colors duration-200">-8 ELO</span>
                <span className="text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-wider mt-1 transition-colors duration-200">Yesterday</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 transition-colors duration-200">
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">Accuracy</span>
                  <span className="text-slate-900 dark:text-white text-sm font-bold transition-colors duration-200">72.1%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">Blunders</span>
                  <span className="text-rose-600 dark:text-rose-400 text-sm font-bold transition-colors duration-200">3</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">Brilliant</span>
                  <span className="text-slate-400 dark:text-slate-400 text-sm font-bold transition-colors duration-200">0</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <Play className="h-4 w-4 text-slate-500 dark:text-slate-400 group-hover:text-white ml-0.5 transition-colors duration-200" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
