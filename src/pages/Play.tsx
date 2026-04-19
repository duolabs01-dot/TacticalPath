import { Link } from "react-router-dom";
import { Play as PlayIcon, ArrowRight, Wifi } from "lucide-react";
import { gameLibrary } from "../data/games";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Play() {
  const chess = gameLibrary.find((g) => g.id === "chess")!;
  const morabaraba = gameLibrary.find((g) => g.id === "morris")!;
  const quickGames = gameLibrary.filter((g) => g.tier === "quick");

  return (
    <div className="mx-auto max-w-3xl px-3 py-4 md:px-6 md:py-6">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white md:text-3xl">
          Choose your board
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Chess is the core training board. Morabaraba is the game you didn't know you needed.
        </p>
      </div>

      {/* Chess — hero card */}
      <div
        className="group mb-4 block rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 p-5 text-white shadow-xl shadow-blue-900/20 transition-transform hover:scale-[1.01] active:scale-[0.99] md:rounded-[2rem] md:p-6 md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-blue-200">
              Your main game
            </span>
            <h2 className="mt-2 text-xl font-black md:text-2xl md:text-3xl">
              {chess.name}
            </h2>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-2xl shadow-lg shadow-blue-500/30 md:h-14 md:w-14">
            {chess.icon}
          </div>
        </div>
        <p className="mt-3 max-w-lg text-sm leading-6 text-slate-300">
          {chess.summary}
        </p>
        <div className="mt-3.5 flex flex-wrap gap-2">
          {chess.modes.map((mode) => (
            <span
              key={mode}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-semibold text-slate-200"
            >
              {mode}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2.5 md:mt-5">
          <Button asChild className="rounded-xl font-bold text-sm h-10 px-4" size="sm">
            <Link to={chess.path}>
              <PlayIcon className="mr-2 h-4 w-4" /> Play vs bot
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl font-bold text-sm h-10 px-4 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white" size="sm">
            <Link to="/multiplayer/chess">
              <Wifi className="mr-2 h-4 w-4" /> Play online
            </Link>
          </Button>
        </div>
      </div>

      <Link
        to="/multiplayer"
        className="group mb-4 block rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-5 shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99] hover:shadow-md md:rounded-[2rem] md:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-emerald-700">
              Friend mode
            </span>
            <h2 className="mt-2 text-xl font-black text-slate-900 md:text-2xl md:text-3xl">
              Online multiplayer
            </h2>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 md:h-14 md:w-14">
            <Wifi className="h-6 w-6 md:h-7 md:w-7" />
          </div>
        </div>
        <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600">
          Chess, Checkers, Morabaraba, and Tic Tac Toe all have live rooms. Create a room, share the code, play with anyone.
        </p>
        <div className="mt-4 inline-flex items-center gap-1.5 font-bold text-emerald-700 transition group-hover:gap-2.5 md:mt-5">
          Open multiplayer <ArrowRight className="h-4 w-4" />
        </div>
      </Link>

      {/* Morabaraba — featured card */}
      <Card className="mb-4 overflow-hidden border-slate-200 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:shadow-none">
        <CardContent className="p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                Featured game
              </span>
              <h2 className="mt-2 text-xl font-black text-slate-900 dark:text-white md:text-2xl">
                {morabaraba.name}
              </h2>
            </div>
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${morabaraba.accentClass} text-2xl text-white md:h-14 md:w-14`}
            >
              {morabaraba.icon}
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {morabaraba.summary}
          </p>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {morabaraba.modes.map((mode) => (
              <span
                key={mode}
                className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-700 dark:text-slate-300"
              >
                {mode}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2.5 md:mt-5">
            <Button asChild className="rounded-xl font-bold text-sm h-10 px-4 bg-emerald-600 hover:bg-emerald-500" size="sm">
              <Link to={morabaraba.path}>
                <PlayIcon className="mr-2 h-4 w-4" /> Play vs bot
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl font-bold text-sm h-10 px-4 border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" size="sm">
              <Link to="/multiplayer/morris">
                <Wifi className="mr-2 h-4 w-4" /> Play online
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Games row */}
      <div className="mb-4">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
          Quick games
        </p>
        <div className="grid gap-3">
          {quickGames.map((game) => (
            <Card key={game.id} className="border-slate-200 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${game.accentClass} text-lg text-white md:h-11 md:w-11`}
                  >
                    {game.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 dark:text-white truncate">
                      {game.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {game.summary.split(".")[0]}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Link to={game.path} className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600">
                      <PlayIcon className="h-4 w-4" />
                    </Link>
                    <Link to={`/multiplayer/${game.id}`} className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600">
                      <Wifi className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
