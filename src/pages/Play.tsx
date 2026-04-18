import { Link } from "react-router-dom";
import { Play as PlayIcon, ArrowRight, Wifi } from "lucide-react";
import { gameLibrary } from "../data/games";

export function Play() {
  const chess = gameLibrary.find((g) => g.id === "chess")!;
  const morabaraba = gameLibrary.find((g) => g.id === "morris")!;
  const quickGames = gameLibrary.filter((g) => g.tier === "quick");

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:px-8 md:py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Choose your board
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Chess is the core training board. Morabaraba is the game you didn't
          know you needed.
        </p>
      </div>

      {/* Chess — hero card */}
      <Link
        to={chess.path}
        className="group mb-4 block rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 p-6 text-white shadow-xl shadow-blue-900/20 transition hover:-translate-y-0.5 md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-blue-200">
              Your main game
            </span>
            <h2 className="mt-3 text-2xl font-black md:text-3xl">
              {chess.name}
            </h2>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-lg shadow-blue-500/30">
            {chess.icon}
          </div>
        </div>
        <p className="mt-3 max-w-lg text-sm leading-7 text-slate-300">
          {chess.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {chess.modes.map((mode) => (
            <span
              key={mode}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
            >
              {mode}
            </span>
          ))}
        </div>
        <div className="mt-5 inline-flex items-center gap-2 font-black text-white transition group-hover:gap-3">
          <PlayIcon className="h-4 w-4" /> Play chess{" "}
          <ArrowRight className="h-4 w-4" />
        </div>
      </Link>

      <Link
        to="/multiplayer"
        className="group mb-4 block rounded-[2rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
              Friend mode
            </span>
            <h2 className="mt-3 text-2xl font-black text-slate-900 md:text-3xl">
              Online multiplayer
            </h2>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-500/20">
            <Wifi className="h-7 w-7" />
          </div>
        </div>
        <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600">
          Start with live Tic Tac Toe rooms now. The heavier boards stay local-first until their rules and sync are ready.
        </p>
        <div className="mt-5 inline-flex items-center gap-2 font-black text-emerald-700 transition group-hover:gap-3">
          Open multiplayer <ArrowRight className="h-4 w-4" />
        </div>
      </Link>

      {/* Morabaraba — featured card */}
      <Link
        to={morabaraba.path}
        className="group mb-4 block rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 dark:bg-slate-800 dark:shadow-none"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              Featured game
            </span>
            <h2 className="mt-3 text-2xl font-black text-slate-900 dark:text-white">
              {morabaraba.name}
            </h2>
          </div>
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${morabaraba.accentClass} text-3xl text-white`}
          >
            {morabaraba.icon}
          </div>
        </div>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {morabaraba.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {morabaraba.modes.map((mode) => (
            <span
              key={mode}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-700 dark:text-slate-300"
            >
              {mode}
            </span>
          ))}
        </div>
        <div className="mt-5 inline-flex items-center gap-2 font-black text-emerald-600 transition group-hover:gap-3 dark:text-emerald-400">
          <PlayIcon className="h-4 w-4" /> Play Morabaraba{" "}
          <ArrowRight className="h-4 w-4" />
        </div>
      </Link>

      {/* Quick Games row */}
      <div className="mb-4">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
          Quick games
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {quickGames.map((game) => (
            <Link
              key={game.id}
              to={game.path}
              className="flex items-center gap-4 rounded-[1.5rem] bg-white p-4 shadow-sm transition hover:shadow-md dark:bg-slate-800"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${game.accentClass} text-xl text-white`}
              >
                {game.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-black text-slate-900 dark:text-white">
                  {game.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {game.summary.split(".")[0]}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 dark:text-slate-600" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
