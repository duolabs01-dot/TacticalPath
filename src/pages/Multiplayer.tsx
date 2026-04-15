import { Link } from "react-router-dom";
import { ArrowLeft, Swords, Smartphone, Users, Zap, ShieldCheck, Sparkles } from "lucide-react";
import { gameLibrary } from "../data/games";

const socialGames = gameLibrary.filter((game) => game.id !== "solitaire");

export function Multiplayer() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
      <header className="mb-8 flex items-start gap-4">
        <Link to="/dashboard" className="rounded-2xl bg-white p-3 shadow-sm transition-colors hover:bg-slate-50">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </Link>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">Friends</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">Play together without the fake lobby</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            This screen is now honest about where Tactical Path really is: same-device play works today, smart invite flow is next,
            and the product should feel trustworthy instead of pretending we already have live rooms everywhere.
          </p>
        </div>
      </header>

      <section className="mb-8 rounded-[2rem] bg-gradient-to-br from-emerald-600 via-emerald-700 to-slate-900 p-6 text-white shadow-2xl shadow-emerald-200">
        <div className="grid gap-6 md:grid-cols-[1.5fr,1fr] md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-50">
              <Swords className="h-4 w-4" /> Social play lane
            </div>
            <h2 className="text-2xl font-black md:text-3xl">Start local now. Add friend invites next.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-emerald-50 md:text-base">
              The clean sequence is: make each game fun on one device first, then layer in invite links, guest join, reconnect, and real online turns.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 rounded-3xl bg-white/10 p-4 backdrop-blur">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100">Playable today</p>
              <p className="mt-1 text-2xl font-black">Local matches</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100">Next build</p>
              <p className="mt-1 text-2xl font-black">Friend invites</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Pick a game for local play</h2>
            <p className="text-sm text-slate-500">Use the strongest working loop now instead of a pretend online room.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {socialGames.map((game) => (
            <Link key={game.id} to={game.path} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl text-white ${game.accentClass}`}>{game.icon}</div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Hotseat</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">{game.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{game.summary}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
                Open game <Zap className="h-4 w-4" />
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
          <h3 className="text-lg font-black text-slate-900">Invite flow next</h3>
          <p className="mt-2 text-sm text-slate-600">Send a link, let a friend join with a profile or guest pass, then drop both players into the correct board instantly.</p>
        </div>
        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Smartphone className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-black text-slate-900">Trust over theatre</h3>
          <p className="mt-2 text-sm text-slate-600">It is better to show the real state of multiplayer than fake live rooms that break confidence the moment someone clicks in.</p>
        </div>
        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-black text-slate-900">Guest-friendly join</h3>
          <p className="mt-2 text-sm text-slate-600">The online version should be light: choose name, join room, play, then convert to profile only when the experience earns it.</p>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-100/70 p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
              <Sparkles className="h-3.5 w-3.5" /> Coming next
            </div>
            <h2 className="text-xl font-black text-slate-900">Friend invite architecture</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Invite code, guest join, reconnect support, and game-aware rooms should be the next real multiplayer pass. Not a fake lobby. A reliable one.
            </p>
          </div>
          <Link to="/dashboard" className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800">
            Back to arcade
          </Link>
        </div>
      </section>
    </div>
  );
}
