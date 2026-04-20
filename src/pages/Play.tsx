import { ArrowRight, Play as PlayIcon, Target, Users, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import { gameLibrary } from "../data/games";

const FEATURED_IDS = ["chess", "morris"] as const;

export function Play() {
  const featuredBoards = FEATURED_IDS.map((id) => gameLibrary.find((game) => game.id === id)).filter(
    (game): game is NonNullable<(typeof gameLibrary)[number]> => Boolean(game)
  );
  const quickBoards = gameLibrary.filter((game) => game.tier === "quick");

  return (
    <div className="min-h-screen bg-transparent pb-20">
      <section className="relative overflow-hidden px-4 pb-10 pt-4 md:px-8 md:pt-8">
        <div className="absolute inset-x-4 top-4 h-[18rem] rounded-[2.5rem] border border-[#d7c4a8] bg-[radial-gradient(circle_at_top_left,rgba(200,146,59,0.18),transparent_28%),linear-gradient(145deg,#f4e8d3_0%,#ead8ba_54%,#f7efe2_100%)] md:inset-x-8 md:h-[20rem]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="rounded-[2.5rem] border border-[#d7c4a8] bg-[#201510] px-6 py-8 text-[#f8ecda] shadow-[0_24px_70px_rgba(18,12,8,0.18)]">
            <div className="max-w-2xl">
              <p className="tp-kicker text-[#d7b17b]">Solo boards</p>
              <h1 className="tp-display mt-3 text-4xl leading-tight sm:text-5xl">
                Choose a board worth replaying.
              </h1>
              <p className="mt-4 text-base leading-8 text-[#e6d7bd]">
                Start with a full chess match, drop into Morabaraba, or warm up with a fast pattern game. Every board here should earn another round.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/daily"
                className="inline-flex items-center gap-2 rounded-full bg-[#d58e3f] px-5 py-3 text-sm font-black text-[#1c120c] transition hover:bg-[#e5a052]"
              >
                <Target className="h-4 w-4" />
                Today's board
              </Link>
              <Link
                to="/multiplayer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-[#f8ecda] transition hover:bg-white/8"
              >
                <Wifi className="h-4 w-4" />
                Live rooms
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid gap-4 lg:grid-cols-2">
          {featuredBoards.map((board) => (
            <Link
              key={board.id}
              to={board.path}
              className={`group overflow-hidden rounded-[2.25rem] border p-6 transition hover:translate-y-[-2px] ${
                board.id === "chess"
                  ? "border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(216,146,59,0.24),transparent_28%),linear-gradient(145deg,#120c08_0%,#241711_100%)] text-[#f8ecda]"
                  : "border-[#d7c4a8] bg-[radial-gradient(circle_at_top_left,rgba(85,103,76,0.18),transparent_30%),linear-gradient(145deg,#f1e4cf_0%,#e5d2b4_100%)] text-[#241711]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="tp-kicker opacity-70">{board.id === "chess" ? "Core board" : "Featured board"}</p>
                  <h2 className="tp-display mt-3 text-4xl">{board.name}</h2>
                </div>
                <span className="text-5xl leading-none">{board.icon}</span>
              </div>

              <p className="mt-4 max-w-md text-sm leading-7 opacity-85">{board.summary}</p>

              <div className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em]">
                Enter board
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),18rem]">
          <div className="rounded-[2.25rem] border border-[#d7c4a8] bg-[#f7f0e4] p-5 md:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#dcc8ab] pb-4">
              <div>
                <p className="tp-kicker text-[#8e4a2f]">Quick boards</p>
                <h2 className="mt-2 text-2xl font-black text-[#201510]">Fast reps. Clean patterns.</h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-[#5d4a3f]">
                Warm up, reset between longer games, or sharpen one tactical idea before heading back into chess.
              </p>
            </div>

            <div className="mt-4 grid gap-3">
              {quickBoards.map((board) => (
                <Link
                  key={board.id}
                  to={board.path}
                  className="group rounded-[1.75rem] border border-[#d7c4a8] bg-white/80 px-4 py-4 transition hover:border-[#c8923b] hover:bg-white"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${board.accentClass} text-2xl text-white`}
                    >
                      {board.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-black text-[#201510]">{board.name}</h3>
                      <p className="text-sm leading-7 text-[#5d4a3f]">{board.summary}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-[#8e4a2f] transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              to="/multiplayer"
              className="group rounded-[2.25rem] border border-[#d7c4a8] bg-[linear-gradient(145deg,#e3d1b3_0%,#f2e5d2_100%)] p-5 text-[#201510] transition hover:translate-y-[-2px]"
            >
              <Users className="h-8 w-8 text-[#8e4a2f]" />
              <h2 className="mt-4 text-2xl font-black">Play a friend</h2>
              <p className="mt-2 text-sm leading-7 text-[#5d4a3f]">
                Open a room, share the code, and bring another player into the board.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em]">
                Live rooms
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              to="/dashboard"
              className="group rounded-[2.25rem] border border-[#d7c4a8] bg-white/80 p-5 text-[#201510] transition hover:translate-y-[-2px]"
            >
              <PlayIcon className="h-8 w-8 text-[#55674c]" />
              <h2 className="mt-4 text-2xl font-black">Back to your hub</h2>
              <p className="mt-2 text-sm leading-7 text-[#5d4a3f]">
                Track streaks, jump into the daily board, and keep your rhythm going.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em]">
                Open dashboard
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
