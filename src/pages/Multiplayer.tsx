import { Link } from "react-router-dom";
import { ArrowLeft, Clock3, ShieldCheck, Smartphone, Sparkles, Swords, Users, Wifi, Zap } from "lucide-react";
import { gameLibrary } from "../data/games";
import { isSupabaseConfigured } from "../lib/supabase";

const localReadyGames = gameLibrary;
const multiplayerLanes = [
  {
    title: "All 4 games online",
    description: "Chess, Checkers, Morabaraba, and Tic Tac Toe all support live invite-code rooms. Create a room, share the code, start playing.",
    accent: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "No account wall",
    description: "Pick a name, paste a room code, and play. Guest join keeps mobile friction low for you and your opponent.",
    accent: "bg-blue-50 text-blue-700",
  },
  {
    title: "One code, two players",
    description: "Each room is isolated by a 6-character code. No lobby list, no fake matchmaking — just a live board that syncs in real time.",
    accent: "bg-violet-50 text-violet-700",
  },
];

export function Multiplayer() {
  const liveOnlineGame = gameLibrary.find((game) => Boolean(game.onlinePath));
  const liveRoomCta = isSupabaseConfigured ? "Open live room" : "Set up online rooms";
  const liveRoomStatus = isSupabaseConfigured ? "Room codes ready" : "Supabase setup needed";

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
      <header className="mb-8 flex items-start gap-4">
        <Link to="/dashboard" className="rounded-2xl bg-white p-3 shadow-sm transition-colors hover:bg-slate-50">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </Link>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">Friends</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">All four games, online now</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            Chess, Checkers, Morabaraba, and Tic Tac Toe all have live room-code multiplayer. Create a room, share a 6-character code, and play with anyone — no account needed.
          </p>
          {!isSupabaseConfigured && (
            <p className="mt-3 max-w-2xl rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
              Online rooms are implemented, but this device still needs `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
              in `.env.local` before live sync can connect.
            </p>
          )}
        </div>
      </header>

      <section className="mb-8 rounded-[2rem] bg-gradient-to-br from-emerald-600 via-emerald-700 to-slate-900 p-6 text-white shadow-2xl shadow-emerald-200">
        <div className="grid gap-6 md:grid-cols-[1.4fr,1fr] md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-50">
              <Wifi className="h-4 w-4" /> Live multiplayer lane
            </div>
            <h2 className="text-2xl font-black md:text-3xl">Send a code. Join fast. Start playing.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-emerald-50 md:text-base">
                Every game has a live room ready: Chess, Checkers, Morabaraba, and Tic Tac Toe. Pick your game, create a room, share the 6-character code.
              </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to={liveOnlineGame?.onlinePath ?? "/multiplayer/tictactoe"} className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-emerald-900 transition hover:bg-emerald-50">
                <Zap className="h-4 w-4" /> {liveRoomCta}
              </Link>
              <Link to="/tictactoe" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                Practice vs bot
              </Link>
            </div>
          </div>
            <div className="grid gap-3 rounded-3xl bg-white/10 p-4 backdrop-blur">
              <div className="rounded-[1.5rem] bg-white/10 p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100">Online now</p>
                <p className="mt-1 text-2xl font-black">All 4 boards</p>
                <p className="mt-1 text-xs text-emerald-50">Chess · Checkers · Morabaraba · Tic Tac Toe.</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/10 p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100">How it works</p>
                <p className="mt-1 text-2xl font-black">Room codes</p>
                <p className="mt-1 text-xs text-emerald-50">6-char code. No account. Instant sync.</p>
              </div>
            </div>
        </div>
      </section>

      <section className="mb-8 grid gap-4 md:grid-cols-3">
        {multiplayerLanes.map((lane) => (
          <div key={lane.title} className="rounded-[1.75rem] bg-white p-5 shadow-sm">
            <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${lane.accent}`}>{lane.title}</span>
            <p className="mt-4 text-sm leading-7 text-slate-600">{lane.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Pick a game for social play</h2>
            <p className="text-sm text-slate-500">Each card says what kind of multiplayer it can honestly support.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {localReadyGames.map((game) => (
            <Link key={game.id} to={game.path} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl text-white ${game.accentClass}`}>{game.icon}</div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                  {game.onlinePath ? "Online live" : game.id === "chess" ? "Pass-and-play" : "Local ready"}
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900">{game.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{game.summary}</p>
              <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-slate-400">Multiplayer status</p>
              <p className="mt-1 text-sm font-medium text-slate-700">{game.multiplayerStatus}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
                  Open game <Zap className="h-4 w-4" />
                </span>
                {game.onlinePath ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
                    {liveRoomStatus}
                  </span>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Users className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-black text-slate-900">Invite flow shipped</h3>
          <p className="mt-2 text-sm text-slate-600">Tic Tac Toe now opens the smallest possible live room: room code, guest name, shared board, instant turns.</p>
        </div>
        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Smartphone className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-black text-slate-900">Trust over theatre</h3>
          <p className="mt-2 text-sm text-slate-600">It is still better to keep the more complex boards local-first than to ship broken live sync just to tick a feature box.</p>
        </div>
        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-black text-slate-900">Guest-friendly join</h3>
          <p className="mt-2 text-sm text-slate-600">No account wall. Pick a name, paste a room code, and play. That keeps mobile join friction low.</p>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-100/70 p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
              <Sparkles className="h-3.5 w-3.5" /> Coming next
            </div>
            <h2 className="text-xl font-black text-slate-900">More boards after this lane proves itself</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              If the room-code flow feels good in real use, the next pass can extend the same pattern to the other turn-based games instead of rebuilding from scratch.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm">
              <Clock3 className="h-4 w-4 text-slate-400" /> One live board first
            </div>
            <Link to={liveOnlineGame?.onlinePath ?? "/multiplayer/tictactoe"} className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800">
              {liveRoomCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
