import { useState, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bot, Users, Play, ArrowLeft, ArrowRight, Trophy, Zap, Brain, Flame } from "lucide-react";
import { Difficulty } from "../context/GameContext";

interface GameSetupProps {
  gameId: string;
  gameName: string;
  onPlayBot: (difficulty: Difficulty) => void;
  icon?: ReactNode;
}

export function GameSetup({ gameId, gameName, onPlayBot, icon }: GameSetupProps) {
  const [mode, setMode] = useState<"bot" | "friend" | null>(null);
  const onlineSupported = ["chess", "morris", "tictactoe", "checkers"].includes(gameId);

  const diffOptions: { value: Difficulty; label: string; icon: ReactNode; desc: string }[] = [
    { value: "easy", label: "Beginner", icon: <Play className="h-4 w-4" />, desc: "Makes frequent blunders." },
    { value: "medium", label: "Intermediate", icon: <Zap className="h-4 w-4" />, desc: "Plays reasonably well." },
    { value: "hard", label: "Advanced", icon: <Brain className="h-4 w-4" />, desc: "Looks ahead to trap you." },
    { value: "expert", label: "Master", icon: <Flame className="h-4 w-4" />, desc: "Plays perfectly." }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md">
      <div className="w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">
        <div className="bg-slate-50 p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-4">
             <Link to="/play" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm transition hover:bg-slate-100">
               <ArrowLeft className="h-5 w-5" />
             </Link>
             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-2xl text-white">
               {icon || <Trophy className="h-5 w-5" />}
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">TacticalPath</p>
                <h2 className="text-2xl font-black text-slate-900">{gameName}</h2>
             </div>
          </div>

          <h3 className="mb-4 text-center text-lg font-black text-slate-800">Who do you want to play against?</h3>
          
          <div className="grid gap-3 sm:grid-cols-2">
            <button
               onClick={() => setMode("bot")}
               className={`flex flex-col items-center gap-3 rounded-3xl border-2 p-5 transition ${mode === "bot" ? "border-emerald-600 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}
            >
               <Bot className={`h-8 w-8 ${mode === "bot" ? "text-emerald-600" : "text-slate-400"}`} />
               <span className="font-bold">Play against Bot</span>
            </button>
            {onlineSupported ? (
              <Link
                 to={`/multiplayer/${gameId}`}
                 className="flex flex-col items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-5 text-slate-600 transition hover:border-slate-300"
              >
                 <Users className="h-8 w-8 text-blue-500" />
                 <span className="font-bold">Play a Friend</span>
              </Link>
            ) : (
              <div className="flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-5 text-slate-400">
                 <Users className="h-8 w-8 text-slate-300" />
                 <span className="font-bold">Online Soon</span>
              </div>
            )}
          </div>
        </div>

        {mode === "bot" && (
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-200 border-t border-slate-100 p-6 sm:p-8">
            <h3 className="mb-4 text-center text-sm font-black uppercase tracking-[0.18em] text-slate-400">Select AI Difficulty</h3>
            <div className="grid gap-2">
               {diffOptions.map(d => (
                 <button
                   key={d.value}
                   onClick={() => onPlayBot(d.value)}
                   className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 transition hover:bg-slate-50 hover:shadow-sm"
                 >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                      {d.icon}
                    </div>
                    <div className="text-left">
                       <p className="font-bold text-slate-900">{d.label}</p>
                       <p className="text-xs text-slate-500">{d.desc}</p>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4 text-slate-300" />
                 </button>
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
