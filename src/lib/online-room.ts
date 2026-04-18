/**
 * Generic online room infrastructure for TacticalPath.
 * Built on Supabase Realtime Broadcast + Presence.
 *
 * Pattern: the room state is an opaque JSON blob broadcast
 * via the "state-sync" event. The first player to join bootstraps it;
 * later arrivals request a sync and apply the most recent snapshot.
 */

import { supabase, isSupabaseConfigured } from './supabase';

export { isSupabaseConfigured };

// ── Room codes ─────────────────────────────────────────────────────────────

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export const ROOM_CODE_LENGTH = 6;

export function generateRoomCode(): string {
  return Array.from(
    { length: ROOM_CODE_LENGTH },
    () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  ).join('');
}

export function sanitizeRoomCode(value: string): string {
  return value.replace(/[^a-z0-9]/gi, '').toUpperCase().slice(0, ROOM_CODE_LENGTH);
}

// ── Presence ───────────────────────────────────────────────────────────────

export interface RoomPresence {
  playerId: string;
  name: string;
  joinedAt: number;
  onlineAt: string;
}

export function sortRoomPlayers(players: RoomPresence[]): RoomPresence[] {
  return [...players].sort(
    (a, b) => a.joinedAt - b.joinedAt || a.playerId.localeCompare(b.playerId)
  );
}

// ── Channel factory ────────────────────────────────────────────────────────

export type ConnectionStatus = 'idle' | 'connecting' | 'SUBSCRIBED' | 'CHANNEL_ERROR' | 'offline';

export interface RoomChannelOptions<TState> {
  channelName: string;            // e.g. "chess:AB12CD"
  playerId: string;
  presence: RoomPresence;
  onStateChange: (next: TState) => void;
  onPlayersChange: (players: RoomPresence[]) => void;
  onStatusChange: (status: ConnectionStatus, error?: string) => void;
  onBootstrap: () => TState;      // called once by room host to create initial state
  getLatestState: () => TState | null;
}

export interface RoomChannel<TState> {
  push: (state: TState) => Promise<void>;
  teardown: () => void;
}

export function createRoomChannel<TState>(opts: RoomChannelOptions<TState>): RoomChannel<TState> {
  if (!isSupabaseConfigured) {
    opts.onStatusChange('offline', 'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local');
    return { push: async () => undefined, teardown: () => undefined };
  }

  let isActive = true;
  let bootstrapTimer: number | null = null;
  let latestUpdatedAt = -Infinity;

  opts.onStatusChange('connecting');

  const channel = supabase.channel(opts.channelName, {
    config: {
      broadcast: { ack: true, self: true },
      presence: { key: opts.playerId },
    },
  });

  const applySnapshot = (snapshot: TState & { updatedAt?: number }) => {
    const ts = snapshot.updatedAt ?? 0;
    if (ts >= latestUpdatedAt) {
      latestUpdatedAt = ts;
      opts.onStateChange(snapshot);
    }
  };

  const sendSnapshot = async (state: TState) => {
    await channel.send({ type: 'broadcast', event: 'state-sync', payload: { senderId: opts.playerId, snapshot: state } });
  };

  channel
    .on('broadcast', { event: 'state-sync' }, ({ payload }) => {
      if (!isActive || payload?.senderId === opts.playerId) return;
      applySnapshot(payload.snapshot as TState & { updatedAt?: number });
    })
    .on('broadcast', { event: 'request-sync' }, ({ payload }) => {
      if (!isActive || payload?.senderId === opts.playerId) return;
      const latest = opts.getLatestState();
      if (latest) void sendSnapshot(latest);
    })
    .on('presence', { event: 'sync' }, () => {
      if (!isActive) return;
      const pState = channel.presenceState<RoomPresence>();
      const players = sortRoomPlayers(
        Object.values(pState).flat().map(({ presence_ref: _ref, ...p }) => p)
      );
      opts.onPlayersChange(players);

      if (bootstrapTimer) window.clearTimeout(bootstrapTimer);
      // First player to join creates the initial state
      if (players[0]?.playerId === opts.playerId && opts.getLatestState() === null) {
        bootstrapTimer = window.setTimeout(() => {
          if (!isActive || opts.getLatestState() !== null) return;
          const initialState = opts.onBootstrap();
          void sendSnapshot(initialState);
          opts.onStateChange(initialState);
          latestUpdatedAt = (initialState as { updatedAt?: number }).updatedAt ?? 0;
        }, 600);
      }
    });

  channel.subscribe(async (status, error) => {
    if (!isActive) return;
    opts.onStatusChange(status as ConnectionStatus, error?.message);
    if (status !== 'SUBSCRIBED') return;

    await channel.track({ ...opts.presence, onlineAt: new Date().toISOString() });

    // Request current state from anyone already in the room
    window.setTimeout(() => {
      if (!isActive) return;
      void channel.send({ type: 'broadcast', event: 'request-sync', payload: { senderId: opts.playerId } });
    }, 100);
  });

  return {
    push: sendSnapshot,
    teardown: () => {
      isActive = false;
      if (bootstrapTimer) window.clearTimeout(bootstrapTimer);
      void supabase.removeChannel(channel);
    },
  };
}
