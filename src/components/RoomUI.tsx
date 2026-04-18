/**
 * RoomLobby — shared UI for joining / creating a room.
 * Used by all online game pages.
 */

import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, Crown, Share2, Users, Wifi, WifiOff, Swords, LoaderCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { ConnectionStatus, RoomPresence } from '../lib/online-room';
import { sanitizeRoomCode, generateRoomCode } from '../lib/online-room';
import { isSupabaseConfigured } from '../lib/supabase';

export { sanitizeRoomCode, generateRoomCode };

// ── Connection badge ────────────────────────────────────────────────────────

export function ConnectionBadge({ status }: { status: ConnectionStatus }) {
  const live = status === 'SUBSCRIBED';
  const connecting = status === 'connecting';
  return (
    <div className={cn(
      'inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.18em]',
      live ? 'bg-emerald-50 text-emerald-700' : connecting ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-500'
    )}>
      {live ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
      {live ? 'Connected' : connecting ? 'Joining' : 'Offline'}
    </div>
  );
}

// ── Lobby (pre-room) ────────────────────────────────────────────────────────

interface LobbyProps {
  gameName: string;
  backPath: string;
  draftCode: string;
  guestName: string;
  onDraftCodeChange: (v: string) => void;
  onGuestNameChange: (v: string) => void;
  onCreateRoom: () => void;
  onJoinRoom: () => void;
}

export function Lobby({
  gameName, backPath, draftCode, guestName,
  onDraftCodeChange, onGuestNameChange,
  onCreateRoom, onJoinRoom,
}: LobbyProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-6 md:px-8 md:py-8">
      <header className="mb-8 flex items-start gap-4">
        <Link to={backPath} className="rounded-2xl bg-white p-3 shadow-sm transition hover:bg-slate-50">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </Link>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-600">Live room</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">Online {gameName}</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
            Create a room, share the code with a friend, and play live — no account needed.
          </p>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-[2rem] bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 p-6 text-white shadow-2xl shadow-blue-200">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">
            <Swords className="h-4 w-4" /> Fastest online start
          </div>
          <h2 className="text-3xl font-black leading-tight">Create a room, send the code, start playing.</h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-blue-50">
            No lobby list. No fake matchmaking. Just a live room that works on any device.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onCreateRoom}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-blue-900 transition hover:bg-blue-50"
            >
              <Swords className="h-4 w-4" /> Create & join
            </button>
            <button
              onClick={async () => {
                const code = generateRoomCode();
                onDraftCodeChange(code);
                try {
                  await navigator.clipboard.writeText(code);
                } catch { /* ignore */ }
              }}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white/20"
            >
              <Copy className="h-4 w-4" /> Generate & copy code
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Join a room</p>

          <label className="mt-5 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">Your name</label>
          <input
            value={guestName}
            onChange={(e) => onGuestNameChange(e.target.value)}
            placeholder="Themba"
            maxLength={24}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white"
          />

          <label className="mt-5 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">Room code</label>
          <input
            value={draftCode}
            onChange={(e) => onDraftCodeChange(sanitizeRoomCode(e.target.value))}
            placeholder="AB12CD"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-black uppercase tracking-[0.24em] text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white"
          />

          <button
            onClick={onJoinRoom}
            disabled={draftCode.length < 6}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Users className="h-4 w-4" /> Join room
          </button>

          {!isSupabaseConfigured && (
            <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
              <p className="font-black uppercase tracking-[0.18em] text-amber-900">One-minute setup needed</p>
              <p className="mt-2">Copy <code>.env.example</code> → <code>.env.local</code>, add your Supabase project URL and anon key, then restart Vite.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ── Active room sidebar ─────────────────────────────────────────────────────

interface RoomSidebarProps {
  roomCode: string;
  players: RoomPresence[];
  playerId: string;
  roleLabel: string;
  roleHint: string;
  connectionStatus: ConnectionStatus;
  connectionError: string | null;
  onLeave: () => void;
  copyFeedback: string | null;
  onCopyCode: () => void;
  onShare: () => void;
  children?: React.ReactNode; // slot for extra game-specific controls
}

export function RoomSidebar({
  roomCode, players, playerId, roleLabel, roleHint,
  connectionStatus, connectionError, onLeave,
  copyFeedback, onCopyCode, onShare, children,
}: RoomSidebarProps) {
  const activePlayers = players.slice(0, 2);
  return (
    <div className="space-y-5">
      {/* Room code card */}
      <div className="rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Room code</p>
            <h2 className="mt-2 text-4xl font-black uppercase tracking-[0.28em] text-slate-900">{roomCode}</h2>
          </div>
          <button onClick={onCopyCode} className="rounded-2xl bg-slate-100 p-3 text-slate-600 transition hover:bg-slate-200">
            <Copy className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button onClick={onShare} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white transition hover:bg-blue-700">
            <Share2 className="h-4 w-4" /> Share invite
          </button>
          <button onClick={onLeave} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-200">
            <ArrowLeft className="h-4 w-4" /> Leave
          </button>
        </div>
        {copyFeedback && <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">{copyFeedback}</p>}
        {connectionError && <p className="mt-3 text-sm text-rose-600">{connectionError}</p>}
      </div>

      {/* Players */}
      <div className="rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Players</p>
            <h3 className="mt-1 text-2xl font-black text-slate-900">Room seats</h3>
          </div>
          <div className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
            {players.length} connected
          </div>
        </div>
        <div className="space-y-3">
          {[0, 1].map((i) => {
            const player = activePlayers[i];
            const isYou = player?.playerId === playerId;
            const seatLabel = i === 0 ? 'Player 1' : 'Player 2';
            return (
              <div key={i} className={cn('rounded-[1.5rem] border p-4', player ? 'border-slate-200 bg-slate-50' : 'border-dashed border-slate-200 bg-white')}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{seatLabel}</p>
                    <p className="mt-1 text-lg font-black text-slate-900">{player?.name ?? 'Waiting for player…'}</p>
                  </div>
                  {player && (
                    <div className={cn('inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]', isYou ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-500')}>
                      {isYou && <Crown className="h-3.5 w-3.5" />}
                      {isYou ? 'You' : 'Opponent'}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Role / status */}
      <div className="rounded-[2rem] bg-white p-6 shadow-sm">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Your role</p>
        <p className="mt-2 text-2xl font-black text-slate-900">{roleLabel}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{roleHint}</p>
      </div>

      {children}
    </div>
  );
}

// ── Board overlay helpers ───────────────────────────────────────────────────

export function WaitingOverlay({ message = 'Waiting for room sync' }: { message?: string }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[2rem] bg-white/70 backdrop-blur-sm">
      <div className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm">
        <LoaderCircle className="h-4 w-4 animate-spin" /> {message}
      </div>
    </div>
  );
}
