import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles, Target, Trophy, Clock3, Brain } from "lucide-react";
import { useProgress, useGameResults } from "../hooks/useProgress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Dashboard() {
  const { progress, getOverallLevel } = useProgress();
  const { records } = useGameResults();
  const level = getOverallLevel();
  const lastGame = records.length > 0 ? records[records.length - 1] : null;

  return (
    <div className="p-3 pb-24">
      {/* Welcome header - compact for mobile */}
      <div className="mb-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 px-4 py-5 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-blue-200" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Your training</span>
        </div>
        
        <h1 className="text-xl font-bold">
          Welcome back, {progress.username || 'Player'}!
        </h1>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild size="sm" className="h-9 text-sm bg-white text-slate-900 hover:bg-blue-50">
            <Link to="/play/chess">
              <Play className="mr-1.5 h-3.5 w-3.5" /> Play Chess
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="h-9 text-sm bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Link to="/morris">
              <Play className="mr-1.5 h-3.5 w-3.5" /> Morabaraba
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats - horizontal scroll on mobile */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-2 -mx-3 px-3">
        <div className="shrink-0 rounded-xl bg-white p-3 shadow-sm border border-slate-100 min-w-[100px]">
          <p className="text-[9px] font-bold uppercase text-slate-400">Level</p>
          <p className="text-lg font-bold text-slate-900">{level}</p>
        </div>
        <div className="shrink-0 rounded-xl bg-white p-3 shadow-sm border border-slate-100 min-w-[100px]">
          <p className="text-[9px] font-bold uppercase text-slate-400">Streak</p>
          <p className="text-lg font-bold text-slate-900">{progress.streak}</p>
        </div>
        <div className="shrink-0 rounded-xl bg-white p-3 shadow-sm border border-slate-100 min-w-[100px]">
          <p className="text-[9px] font-bold uppercase text-slate-400">Puzzles</p>
          <p className="text-lg font-bold text-slate-900">{progress.totalPuzzlesSolved}</p>
        </div>
      </div>

      {/* Daily Puzzle */}
      <Link
        to="/daily"
        className="block mb-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white shadow-md"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-100">Daily Puzzle</p>
            <p className="mt-1 font-bold text-lg">Solve today's challenge</p>
          </div>
          <Target className="h-8 w-8 text-amber-200" />
        </div>
      </Link>

      {/* Recent Game */}
      {lastGame && (
        <Link
          to={`/play/${lastGame.game}`}
          className="block mb-4 rounded-xl bg-white p-3 shadow-sm border border-slate-100 flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-lg text-white">
            {lastGame.game === "chess" ? "♟" : lastGame.game === "checkers" ? "⬤" : lastGame.game === "morris" ? "◎" : "✕"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-500 capitalize">{lastGame.game}</p>
            <p className="font-medium text-slate-900 truncate">
              You {lastGame.won ? "won" : "lost"} vs Bot
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-400" />
        </Link>
      )}

      {/* Quick Play Grid */}
      <div className="mb-4">
        <h2 className="text-sm font-bold text-slate-900 mb-3 px-1">Quick Play</h2>
        <div className="grid grid-cols-2 gap-2">
          <Link to="/play/chess" className="rounded-xl bg-blue-600 p-4 text-white shadow-md">
            <p className="text-2xl">♞</p>
            <p className="mt-1 font-bold text-sm">Chess</p>
          </Link>
          <Link to="/morris" className="rounded-xl bg-emerald-600 p-4 text-white shadow-md">
            <p className="text-2xl">◎</p>
            <p className="mt-1 font-bold text-sm">Morabaraba</p>
          </Link>
          <Link to="/tictactoe" className="rounded-xl bg-amber-500 p-4 text-white shadow-md">
            <p className="text-2xl">✕</p>
            <p className="mt-1 font-bold text-sm">Tic Tac Toe</p>
          </Link>
          <Link to="/checkers" className="rounded-xl bg-rose-600 p-4 text-white shadow-md">
            <p className="text-2xl">●</p>
            <p className="mt-1 font-bold text-sm">Checkers</p>
          </Link>
        </div>
      </div>

      {/* Multiplayer CTA */}
      <Link
        to="/multiplayer"
        className="block rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 p-4 text-white"
      >
        <p className="font-bold">Play with Friends</p>
        <p className="text-xs text-emerald-100 mt-1">Create a room, share the code</p>
      </Link>
    </div>
  );
}