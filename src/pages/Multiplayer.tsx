import { Link } from "react-router-dom";
import { ArrowLeft, Clock3, ShieldCheck, Smartphone, Sparkles, Users, Wifi, Zap } from "lucide-react";
import { gameLibrary } from "../data/games";
import { isSupabaseConfigured } from "../lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const localReadyGames = gameLibrary;
const multiplayerLanes = [
  {
    title: "All 4 games online",
    description: "Chess, Checkers, Morabaraba, and Tic Tac Toe all support live invite-code rooms. Create a room, share the code, start playing.",
    accent: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "No account wall",
    description: "Pick a name, paste a room code, and play. Guest join keeps mobile friction low.",
    accent: "bg-blue-50 text-blue-700",
  },
  {
    title: "One code, two players",
    description: "Each room is isolated by a 6-character code. No lobby, no matchmaking — just a live board that syncs in real time.",
    accent: "bg-violet-50 text-violet-700",
  },
];

export function Multiplayer() {
  const liveOnlineGame = gameLibrary.find((game) => Boolean(game.onlinePath));
  const liveRoomCta = isSupabaseConfigured ? "Open live room" : "Set up online rooms";
  const liveRoomStatus = isSupabaseConfigured ? "Room codes ready" : "Supabase needed";

  return (
    <div className="mx-auto max-w-6xl px-3 py-4 md:px-6 md:py-6">
      <header className="mb-5 flex items-start gap-3 md:mb-6">
        <Link to="/dashboard" className="rounded-xl bg-white p-2.5 shadow-sm transition-colors hover:bg-slate-50 dark:bg-slate-800">
          <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Friends</p>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 dark:text-white md:text-3xl md:text-4xl">
            All four games, online now
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:mt-2 md:text-base">
            Play with anyone — no account needed.
          </p>
          {!isSupabaseConfigured && (
            <div className="mt-3 rounded-xl bg-amber-50 p-3.5 border border-amber-200 md:rounded-2xl md:p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-900">Setup required</p>
              <p className="mt-1.5 text-sm text-amber-800">
                Copy <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs">.env.example</code> to <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs">.env.local</code> to enable live sync.
              </p>
            </div>
          )}
        </div>
      </header>

      <section className="mb-5 rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-slate-900 p-5 text-white shadow-xl shadow-emerald-200 md:mb-6 md:rounded-[2rem] md:p-6">
        <div className="grid gap-5 md:grid-cols-[1.4fr,1fr] md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-50 md:mb-4 md:px-4 md:py-2 md:text-xs">
              <Wifi className="h-3.5 w-3.5" /> Live multiplayer lane
            </div>
            <h2 className="text-xl font-black md:text-2xl md:text-3xl">Send a code. Join fast. Start playing.</h2>
            <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-emerald-50 md:mt-3 md:text-base">
              Every game has a live room ready. Pick your game, create a room, share the 6-character code.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5 md:mt-5">
              <Button asChild className="rounded-xl font-bold text-sm h-10 px-4" size="sm">
                <Link to={liveOnlineGame?.onlinePath ?? "/multiplayer/tictactoe"}>
                  <Zap className="mr-2 h-4 w-4" /> {liveRoomCta}
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl font-bold text-sm h-10 px-4 bg-white/10 border-white/15 text-white hover:bg-white/20 hover:text-white" size="sm">
                <Link to="/tictactoe">
                  Practice vs bot
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-2.5 rounded-2xl bg-white/10 p-3.5 backdrop-blur md:rounded-3xl md:p-4">
            <div className="rounded-xl bg-white/10 p-3 md:rounded-[1.5rem] md:p-4">
              <p className="text-[9px] font-black uppercase tracking-widest text-emerald-100">Online now</p>
              <p className="mt-1 text-xl font-black md:text-2xl">All 4 boards</p>
            </div>
            <div className="rounded-xl bg-white/10 p-3 md:rounded-[1.5rem] md:p-4">
              <p className="text-[9px] font-black uppercase tracking-widest text-emerald-100">How it works</p>
              <p className="mt-1 text-xl font-black md:text-2xl">Room codes</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5 grid gap-3 md:mb-6 md:grid-cols-3 md:gap-4">
        {multiplayerLanes.map((lane) => (
          <Card key={lane.title} className="border-slate-200 shadow-sm dark:border-slate-700">
            <CardContent className="p-4 md:p-5">
              <span className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] ${lane.accent}`}>{lane.title}</span>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{lane.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mb-5 md:mb-6">
        <div className="mb-3 flex flex-col gap-1 md:mb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white md:text-2xl">Pick a game for social play</h2>
            <p className="text-sm text-slate-500">Each card shows multiplayer support.</p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {localReadyGames.map((game) => (
            <Link 
              key={game.id} 
              to={game.path} 
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="mb-3 flex items-center justify-between gap-3 md:mb-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg text-white md:h-12 md:w-12 md:rounded-2xl md:text-2xl ${game.accentClass}`}>
                  {game.icon}
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-700 dark:text-slate-300">
                  {game.onlinePath ? "Online live" : game.id === "chess" ? "Pass-and-play" : "Local ready"}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{game.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">{game.summary}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 md:mt-4">
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400">
                  Open game <Zap className="h-3.5 w-3.5" />
                </span>
                {game.onlinePath ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.18em] text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    {liveRoomStatus}
                  </span>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3 md:gap-4">
        <Card className="border-slate-200 shadow-sm dark:border-slate-700">
          <CardContent className="p-4 md:p-5">
            <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Users className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Seamless invite flow</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Smallest possible live room: room code, guest name, shared board.</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm dark:border-slate-700">
          <CardContent className="p-4 md:p-5">
            <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <Smartphone className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Mobile-ready UI</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Works flawlessly on phones. Copy a code, text a friend, play.</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm dark:border-slate-700">
          <CardContent className="p-4 md:p-5">
            <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Guest-friendly join</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">No account wall. Pick a name, paste a code, play.</p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-100/70 p-4 md:mt-6 md:rounded-[1.75rem] md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800">
              <Sparkles className="h-3.5 w-3.5" /> Next steps
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white md:text-xl">Global matchmaking</h2>
            <p className="mt-1.5 max-w-2xl text-sm text-slate-600 dark:text-slate-300 md:mt-2">
              When the playerbase grows, we'll add auto-matchmaking against random players based on ELO.
            </p>
          </div>
          <div className="flex shrink-0">
            <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 text-sm font-bold text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-300">
              <Clock3 className="h-4 w-4 text-slate-400" /> Coming later
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
