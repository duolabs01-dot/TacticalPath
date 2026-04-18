import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Copy,
  Crown,
  LoaderCircle,
  RefreshCcw,
  Share2,
  Swords,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { cn } from "../lib/utils";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import {
  OnlineTicTacToeState,
  TicTacToeMark,
  TicTacToeRoomPresence,
  TicTacToeWinner,
  applyOnlineMove,
  createEmptyOnlineTicTacToeState,
  generateRoomCode,
  sanitizeRoomCode,
  sortRoomPlayers,
} from "../lib/tictactoe-online";

const GUEST_NAME_KEY = "tp:guest-name";

type PlayerRole = TicTacToeMark | "spectator" | null;

function XMark() {
  return (
    <svg viewBox="0 0 100 100" className="h-4/5 w-4/5 text-blue-600">
      <path d="M 25 25 L 75 75" fill="transparent" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
      <path d="M 75 25 L 25 75" fill="transparent" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
    </svg>
  );
}

function OMark() {
  return (
    <svg viewBox="0 0 100 100" className="h-4/5 w-4/5 text-rose-500">
      <circle cx="50" cy="50" r="32" fill="transparent" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
    </svg>
  );
}

function readSavedGuestName() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(GUEST_NAME_KEY) ?? "";
}

function getRoleForPlayer(players: TicTacToeRoomPresence[], playerId: string): PlayerRole {
  const index = players.findIndex((player) => player.playerId === playerId);
  if (index === 0) return "X";
  if (index === 1) return "O";
  if (index >= 2) return "spectator";
  return null;
}

function winnerLabel(winner: TicTacToeWinner) {
  if (winner === "draw") return "Draw";
  if (winner === "X") return "X wins";
  if (winner === "O") return "O wins";
  return "Live match";
}

export function OnlineTicTacToe() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [draftRoomCode, setDraftRoomCode] = useState(() => sanitizeRoomCode(searchParams.get("room") ?? ""));
  const [guestName, setGuestName] = useState(() => readSavedGuestName());
  const [roomState, setRoomState] = useState<OnlineTicTacToeState | null>(null);
  const [players, setPlayers] = useState<TicTacToeRoomPresence[]>([]);
  const [connectionStatus, setConnectionStatus] = useState("idle");
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const playerId = useMemo(() => crypto.randomUUID(), []);
  const joinedAt = useMemo(() => Date.now(), []);
  const roomCode = sanitizeRoomCode(searchParams.get("room") ?? "");
  const roomStateRef = useRef<OnlineTicTacToeState | null>(null);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const resolvedGuestName = useMemo(() => {
    const trimmed = guestName.trim();
    if (trimmed.length >= 2) return trimmed.slice(0, 24);
    return `Guest ${playerId.slice(0, 4).toUpperCase()}`;
  }, [guestName, playerId]);

  const role = useMemo(() => getRoleForPlayer(players, playerId), [players, playerId]);
  const activePlayers = players.slice(0, 2);
  const isMyTurn = roomState?.turn === role && (role === "X" || role === "O");
  const inviteUrl = useMemo(() => {
    if (!roomCode || typeof window === "undefined") return "";
    return `${window.location.origin}/multiplayer/tictactoe?room=${roomCode}`;
  }, [roomCode]);

  useEffect(() => {
    setDraftRoomCode(roomCode);
  }, [roomCode]);

  useEffect(() => {
    roomStateRef.current = roomState;
  }, [roomState]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(GUEST_NAME_KEY, guestName.trim());
  }, [guestName]);

  const pushStateToRoom = useCallback(async (nextState: OnlineTicTacToeState) => {
    roomStateRef.current = nextState;
    setRoomState(nextState);

    const channel = channelRef.current;
    if (!channel) return;

    await channel.send({
      type: "broadcast",
      event: "state-sync",
      payload: {
        senderId: playerId,
        snapshot: nextState,
      },
    });
  }, [playerId]);

  useEffect(() => {
    if (!roomCode) {
      setPlayers([]);
      setRoomState(null);
      setConnectionStatus("idle");
      setConnectionError(null);
      return;
    }

    if (!isSupabaseConfigured) {
      setConnectionStatus("offline");
      setConnectionError("Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }

    let isActive = true;
    let bootstrapTimer: number | null = null;

    setConnectionError(null);
    setConnectionStatus("connecting");
    setPlayers([]);
    setRoomState(null);
    roomStateRef.current = null;

    const channel = supabase.channel(`tic-tac-toe:${roomCode}`, {
      config: {
        broadcast: { ack: true, self: true },
        presence: { key: playerId },
      },
    });

    channelRef.current = channel;

    const applySnapshot = (snapshot: OnlineTicTacToeState | null | undefined) => {
      if (!snapshot) return;
      const current = roomStateRef.current;
      if (!current || snapshot.updatedAt >= current.updatedAt) {
        roomStateRef.current = snapshot;
        setRoomState(snapshot);
      }
    };

    const sendCurrentSnapshot = async () => {
      if (!roomStateRef.current) return;
      await channel.send({
        type: "broadcast",
        event: "state-sync",
        payload: {
          senderId: playerId,
          snapshot: roomStateRef.current,
        },
      });
    };

    channel
      .on("broadcast", { event: "state-sync" }, ({ payload }) => {
        if (!isActive || payload?.senderId === playerId) return;
        applySnapshot(payload.snapshot as OnlineTicTacToeState | undefined);
      })
      .on("broadcast", { event: "request-sync" }, ({ payload }) => {
        if (!isActive || payload?.senderId === playerId) return;
        void sendCurrentSnapshot();
      })
      .on("presence", { event: "sync" }, () => {
        if (!isActive) return;

        const presenceState = channel.presenceState<TicTacToeRoomPresence>();
        const nextPlayers = sortRoomPlayers(
          Object.values(presenceState)
            .flat()
            .map(({ presence_ref: _presenceRef, ...player }) => player)
        );

        setPlayers(nextPlayers);

        if (bootstrapTimer) window.clearTimeout(bootstrapTimer);

        if (nextPlayers[0]?.playerId === playerId && !roomStateRef.current) {
          bootstrapTimer = window.setTimeout(() => {
            if (!isActive || roomStateRef.current) return;
            void pushStateToRoom(createEmptyOnlineTicTacToeState());
          }, 700);
        }
      });

    channel.subscribe(async (status, error) => {
      if (!isActive) return;

      setConnectionStatus(status);

      if (status === "CHANNEL_ERROR" && error) {
        setConnectionError(error.message);
        return;
      }

      if (status !== "SUBSCRIBED") return;

      const trackStatus = await channel.track({
        playerId,
        name: resolvedGuestName,
        joinedAt,
        onlineAt: new Date().toISOString(),
      });

      if (trackStatus !== "ok") {
        setConnectionError("Could not join the room presence channel.");
      }

      window.setTimeout(() => {
        if (!isActive) return;
        void channel.send({
          type: "broadcast",
          event: "request-sync",
          payload: { senderId: playerId },
        });
      }, 120);
    });

    return () => {
      isActive = false;
      if (bootstrapTimer) window.clearTimeout(bootstrapTimer);
      channelRef.current = null;
      void supabase.removeChannel(channel);
    };
  }, [joinedAt, playerId, pushStateToRoom, resolvedGuestName, roomCode]);

  const createRoom = () => {
    const nextCode = generateRoomCode();
    setSearchParams({ room: nextCode });
  };

  const joinRoom = () => {
    const nextCode = sanitizeRoomCode(draftRoomCode);
    if (!nextCode) return;
    setSearchParams({ room: nextCode });
  };

  const leaveRoom = () => {
    setSearchParams({});
    setCopyFeedback(null);
  };

  const handleCellClick = (index: number) => {
    if (!roomState || role !== "X" && role !== "O") return;

    const nextState = applyOnlineMove(roomState, index, role);
    if (!nextState) return;

    void pushStateToRoom(nextState);
  };

  const handleRematch = () => {
    void pushStateToRoom(createEmptyOnlineTicTacToeState());
  };

  const shareInvite = async () => {
    if (!inviteUrl) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Join my TacticalPath Tic Tac Toe room",
          text: `Join room ${roomCode} and play live.`,
          url: inviteUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(inviteUrl);
      setCopyFeedback("Invite copied");
      window.setTimeout(() => setCopyFeedback(null), 1500);
    } catch {
      setCopyFeedback("Share failed");
      window.setTimeout(() => setCopyFeedback(null), 1500);
    }
  };

  const copyRoomCode = async () => {
    if (!roomCode) return;
    await navigator.clipboard.writeText(roomCode);
    setCopyFeedback("Room code copied");
    window.setTimeout(() => setCopyFeedback(null), 1500);
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-6 md:px-8 md:py-8">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Link to="/multiplayer" className="rounded-2xl bg-white p-3 shadow-sm transition hover:bg-slate-50">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Link>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-600">Live room</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">Online Tic Tac Toe</h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
              One room code, two players, no account wall. This is the smallest real multiplayer lane in the app.
            </p>
          </div>
        </div>

        <div className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.18em]",
          connectionStatus === "SUBSCRIBED"
            ? "bg-emerald-50 text-emerald-700"
            : connectionStatus === "connecting"
              ? "bg-amber-50 text-amber-700"
              : "bg-slate-100 text-slate-500"
        )}>
          {connectionStatus === "SUBSCRIBED" ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
          {connectionStatus === "SUBSCRIBED" ? "Connected" : connectionStatus === "connecting" ? "Joining" : "Offline"}
        </div>
      </header>

      {!roomCode ? (
        <section className="grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-[2rem] bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 p-6 text-white shadow-2xl shadow-blue-200">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">
              <Swords className="h-4 w-4" /> Fastest online start
            </div>
            <h2 className="text-3xl font-black leading-tight">Create a room, send the code, start playing.</h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-blue-50">
              No lobby list. No fake matchmaking. Just a live room that works well on mobile and desktop.
            </p>
            <button
              onClick={createRoom}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-blue-900 transition hover:bg-blue-50"
            >
              <Swords className="h-4 w-4" /> Create new room
            </button>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Join a room</p>
            <label className="mt-5 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Your name
            </label>
            <input
              value={guestName}
              onChange={(event) => setGuestName(event.target.value)}
              placeholder="Nomsa"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white"
            />

            <label className="mt-5 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Room code
            </label>
            <input
              value={draftRoomCode}
              onChange={(event) => setDraftRoomCode(sanitizeRoomCode(event.target.value))}
              placeholder="AB12CD"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-black uppercase tracking-[0.24em] text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white"
            />

            <button
              onClick={joinRoom}
              disabled={draftRoomCode.length < 6}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Users className="h-4 w-4" /> Join room
            </button>

            {!isSupabaseConfigured && (
              <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
                <p className="font-black uppercase tracking-[0.18em] text-amber-900">One-minute setup</p>
                <p className="mt-2">Online rooms need `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`.</p>
                <p className="mt-2">Copy `.env.example`, paste your Supabase project URL and anon key, then restart Vite.</p>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="grid gap-6 lg:grid-cols-[0.96fr,1.04fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Room code</p>
                  <h2 className="mt-2 text-4xl font-black uppercase tracking-[0.28em] text-slate-900">{roomCode}</h2>
                </div>
                <button onClick={copyRoomCode} className="rounded-2xl bg-slate-100 p-3 text-slate-600 transition hover:bg-slate-200">
                  <Copy className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <button onClick={shareInvite} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white transition hover:bg-blue-700">
                  <Share2 className="h-4 w-4" /> Share invite
                </button>
                <button onClick={leaveRoom} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-200">
                  <ArrowLeft className="h-4 w-4" /> Leave room
                </button>
              </div>

              {copyFeedback && <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">{copyFeedback}</p>}
              {connectionError && <p className="mt-3 text-sm text-rose-600">{connectionError}</p>}
            </div>

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
                {[0, 1].map((seatIndex) => {
                  const player = activePlayers[seatIndex];
                  const seatRole = seatIndex === 0 ? "X" : "O";
                  const isYou = player?.playerId === playerId;

                  return (
                    <div key={seatRole} className={cn("rounded-[1.5rem] border p-4", player ? "border-slate-200 bg-slate-50" : "border-dashed border-slate-200 bg-white")}>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Seat {seatRole}</p>
                          <p className="mt-1 text-lg font-black text-slate-900">{player?.name ?? "Waiting for player..."}</p>
                        </div>
                        <div className={cn(
                          "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]",
                          seatRole === "X" ? "bg-blue-50 text-blue-700" : "bg-rose-50 text-rose-700"
                        )}>
                          {isYou ? <Crown className="h-3.5 w-3.5" /> : null}
                          {isYou ? "You" : seatRole}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {role === "spectator" && (
                <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
                  This room already has two players. You can watch, but you cannot make moves.
                </div>
              )}
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Your role</p>
              <p className="mt-2 text-2xl font-black text-slate-900">
                {role === "X" ? "You are X" : role === "O" ? "You are O" : role === "spectator" ? "Watching room" : "Waiting for seat"}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {role === "X" || role === "O"
                  ? isMyTurn
                    ? "It is your turn. Tap a square to play."
                    : "Hold for the other player. The board will update live."
                  : "Share the room code with a friend to fill both seats."}
              </p>
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-white p-5 shadow-xl">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Match state</p>
                <h2 className="mt-1 text-3xl font-black text-slate-900">{winnerLabel(roomState?.winner ?? null)}</h2>
              </div>
              <div className={cn(
                "rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.18em]",
                roomState?.winner
                  ? "bg-slate-100 text-slate-600"
                  : roomState?.turn === "X"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-rose-50 text-rose-700"
              )}>
                {roomState ? `Turn: ${roomState.turn}` : "Syncing room"}
              </div>
            </div>

            <div className="relative">
              <div className="grid aspect-square grid-cols-3 gap-4 rounded-[2rem] bg-slate-100 p-4">
                {(roomState?.board ?? Array(9).fill(null)).map((cell, index) => {
                  const isPlayable =
                    Boolean(roomState) &&
                    !roomState?.winner &&
                    cell === null &&
                    isMyTurn &&
                    connectionStatus === "SUBSCRIBED";

                  return (
                    <button
                      key={index}
                      onClick={() => handleCellClick(index)}
                      disabled={!isPlayable}
                      className={cn(
                        "flex items-center justify-center rounded-[1.75rem] bg-white shadow-sm transition",
                        isPlayable && "hover:-translate-y-0.5 hover:bg-blue-50",
                        roomState?.lastMoveIndex === index && "ring-4 ring-amber-300",
                        !isPlayable && "cursor-default"
                      )}
                    >
                      {cell === "X" ? <XMark /> : cell === "O" ? <OMark /> : null}
                    </button>
                  );
                })}
              </div>

              {!roomState && (
                <div className="absolute inset-0 flex items-center justify-center rounded-[2rem] bg-white/70 backdrop-blur-sm">
                  <div className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm">
                    <LoaderCircle className="h-4 w-4 animate-spin" /> Waiting for room sync
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={handleRematch}
                disabled={!roomState}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <RefreshCcw className="h-4 w-4" /> Reset board
              </button>
              <Link to="/tictactoe" className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-200">
                <Swords className="h-4 w-4" /> Play vs bot
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
