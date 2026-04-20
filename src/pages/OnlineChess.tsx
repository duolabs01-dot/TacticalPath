/**
 * Online Chess — live 2-player chess via Supabase Realtime room codes.
 * Player 1 (room creator) plays White; Player 2 plays Black.
 */

import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Chess, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCcw } from 'lucide-react';
import { cn } from '../lib/utils';
import { getChessboardSquare } from '../lib/chessboard-events';
import {
  createRoomChannel, generateRoomCode, sanitizeRoomCode,
  RoomPresence, ConnectionStatus, RoomChannel,
} from '../lib/online-room';
import {
  Lobby, ConnectionBadge, RoomSidebar, WaitingOverlay,
} from '../components/RoomUI';

const GUEST_NAME_KEY = 'tp:guest-name';
function readName() { return typeof window === 'undefined' ? '' : localStorage.getItem(GUEST_NAME_KEY) ?? ''; }

interface OnlineChessState {
  fen: string;
  turn: 'w' | 'b';
  status: 'playing' | 'checkmate' | 'draw' | 'stalemate' | 'resign';
  winner: 'w' | 'b' | 'draw' | null;
  lastMove: { from: string; to: string } | null;
  moves: string[];       // SAN notation history
  updatedAt: number;
}

function createInitialState(): OnlineChessState {
  return {
    fen: new Chess().fen(),
    turn: 'w',
    status: 'playing',
    winner: null,
    lastMove: null,
    moves: [],
    updatedAt: Date.now(),
  };
}

function applyMove(state: OnlineChessState, from: string, to: string): OnlineChessState | null {
  if (state.status !== 'playing') return null;
  try {
    const game = new Chess(state.fen);
    const result = game.move({ from, to, promotion: 'q' });
    if (!result) return null;
    let status: OnlineChessState['status'] = 'playing';
    let winner: OnlineChessState['winner'] = null;
    if (game.isCheckmate())  { status = 'checkmate'; winner = game.turn() === 'w' ? 'b' : 'w'; }
    else if (game.isDraw())  { status = 'draw'; winner = 'draw'; }
    else if (game.isStalemate()) { status = 'stalemate'; winner = 'draw'; }
    return { fen: game.fen(), turn: game.turn(), status, winner, lastMove: { from, to }, moves: [...state.moves, result.san], updatedAt: Date.now() };
  } catch { return null; }
}

export function OnlineChess() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [guestName, setGuestName] = useState(readName);
  const [draftCode, setDraftCode] = useState(() => sanitizeRoomCode(searchParams.get('room') ?? ''));
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('idle');
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [moveFrom, setMoveFrom] = useState<string | null>(null);
  const [roomState, setRoomState] = useState<OnlineChessState | null>(null);
  const [players, setPlayers] = useState<RoomPresence[]>([]);

  const roomCode = sanitizeRoomCode(searchParams.get('room') ?? '');
  const playerId = useMemo(() => crypto.randomUUID(), []);
  const joinedAt = useMemo(() => Date.now(), []);
  const stateRef = useRef<OnlineChessState | null>(null);
  const channelRef = useRef<RoomChannel<OnlineChessState> | null>(null);

  const resolvedName = useMemo(() => {
    const t = guestName.trim();
    return t.length >= 2 ? t.slice(0, 24) : `Guest ${playerId.slice(0, 4).toUpperCase()}`;
  }, [guestName, playerId]);

  // Player 1 (first to join) = White
  const myRole: 'w' | 'b' | 'spectator' | null = useMemo(() => {
    const idx = players.findIndex(p => p.playerId === playerId);
    if (idx === 0) return 'w';
    if (idx === 1) return 'b';
    if (idx >= 2) return 'spectator';
    return null;
  }, [players, playerId]);

  const isMyTurn = roomState?.turn === myRole && roomState?.status === 'playing' && (myRole === 'w' || myRole === 'b');
  const boardOrientation = myRole === 'b' ? 'black' : 'white';

  useEffect(() => { localStorage.setItem(GUEST_NAME_KEY, guestName.trim()); }, [guestName]);
  useEffect(() => { setDraftCode(roomCode); }, [roomCode]);
  useEffect(() => { stateRef.current = roomState; }, [roomState]);

  useEffect(() => {
    if (!roomCode) {
      setPlayers([]); setRoomState(null); stateRef.current = null;
      setConnectionStatus('idle'); setConnectionError(null);
      if (channelRef.current) { channelRef.current.teardown(); channelRef.current = null; }
      return;
    }
    setConnectionError(null);
    const ch = createRoomChannel<OnlineChessState>({
      channelName: `chess:${roomCode}`,
      playerId,
      presence: { playerId, name: resolvedName, joinedAt, onlineAt: new Date().toISOString() },
      onStateChange: (s) => { stateRef.current = s; setRoomState(s); },
      onPlayersChange: setPlayers,
      onStatusChange: (s, err) => { setConnectionStatus(s); if (err) setConnectionError(err); },
      onBootstrap: createInitialState,
      getLatestState: () => stateRef.current,
    });
    channelRef.current = ch;
    return () => { ch.teardown(); channelRef.current = null; };
  }, [roomCode, playerId, resolvedName, joinedAt]);

  const handleSquareClick = useCallback((input: { square: string } | string) => {
    const square = getChessboardSquare(input);
    if (!square) return;
    if (!roomState || !isMyTurn) return;

    if (!moveFrom) {
      // Tap on player's own piece to select
      const game = new Chess(roomState.fen);
      const piece = game.get(square as Square);
      if (piece && piece.color === myRole) setMoveFrom(square);
      return;
    }

    const next = applyMove(roomState, moveFrom, square);
    if (next) {
      stateRef.current = next;
      setRoomState(next);
      channelRef.current?.push(next);
      setMoveFrom(null);
    } else {
      // Invalid move; re-select if player clicked another of their own pieces
      const game = new Chess(roomState.fen);
      const piece = game.get(square as Square);
      if (piece && piece.color === myRole) {
        setMoveFrom(square);
      } else {
        setMoveFrom(null);
      }
    }
  }, [roomState, isMyTurn, myRole, moveFrom]);

  const handleRematch = () => {
    const next = createInitialState();
    stateRef.current = next;
    setRoomState(next);
    channelRef.current?.push(next);
  };

  const handleResign = () => {
    if (!roomState || (myRole !== 'w' && myRole !== 'b')) return;
    const next: OnlineChessState = {
      ...roomState,
      status: 'resign',
      winner: myRole === 'w' ? 'b' : 'w',
      updatedAt: Date.now()
    };
    stateRef.current = next;
    setRoomState(next);
    channelRef.current?.push(next);
  };

  const handleDraw = () => {
    if (!roomState || (myRole !== 'w' && myRole !== 'b')) return;
    // For simplicity, a draw immediately applies. 
    // Usually it's an offer, but we can do mutually agreed draw or quick draw here.
    const next: OnlineChessState = {
      ...roomState,
      status: 'draw',
      winner: 'draw',
      updatedAt: Date.now()
    };
    stateRef.current = next;
    setRoomState(next);
    channelRef.current?.push(next);
  };

  const inviteUrl = useMemo(() => roomCode ? `${window.location.origin}/multiplayer/chess?room=${roomCode}` : '', [roomCode]);

  const copyCode = async () => {
    await navigator.clipboard.writeText(roomCode);
    setCopyFeedback('Code copied'); setTimeout(() => setCopyFeedback(null), 1500);
  };
  const shareInvite = async () => {
    try {
      if (navigator.share) { await navigator.share({ title: 'Play chess with me on TacticalPath', text: `Join room ${roomCode}`, url: inviteUrl }); return; }
      await navigator.clipboard.writeText(inviteUrl);
      setCopyFeedback('Invite copied'); setTimeout(() => setCopyFeedback(null), 1500);
    } catch { setCopyFeedback('Share failed'); setTimeout(() => setCopyFeedback(null), 1500); }
  };

  const game = roomState ? new Chess(roomState.fen) : null;
  const isCheck = game?.isCheck() && roomState?.status === 'playing';
  const roleLabel = myRole === 'w' ? 'You are White' : myRole === 'b' ? 'You are Black' : myRole === 'spectator' ? 'Watching' : 'Waiting for seat';
  const roleHint = (myRole === 'w' || myRole === 'b') ? (isMyTurn ? 'Your turn. Tap a piece to move.' : 'Waiting for opponent…') : 'Share the room code to invite someone.';

  if (!roomCode) {
    return (
      <Lobby
        gameName="Chess"
        backPath="/multiplayer"
        draftCode={draftCode}
        guestName={guestName}
        onDraftCodeChange={setDraftCode}
        onGuestNameChange={setGuestName}
        onCreateRoom={() => setSearchParams({ room: generateRoomCode() })}
        onJoinRoom={() => { const c = sanitizeRoomCode(draftCode); if (c.length === 6) setSearchParams({ room: c }); }}
      />
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 md:px-8 md:py-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-600">Live room · {roomCode}</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">Online Chess</h1>
        </div>
        <ConnectionBadge status={connectionStatus} />
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr,360px]">
        {/* Board */}
        <div className="flex flex-col gap-4">
          {/* Opponent strip */}
          <div className={cn('flex items-center gap-3 rounded-[1.75rem] bg-white p-4 shadow-sm border-2 transition-all', roomState?.turn === (myRole === 'w' ? 'b' : 'w') && roomState?.status === 'playing' ? 'border-rose-400' : 'border-transparent opacity-60')}>
            <div className="h-10 w-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-lg">♟</div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Opponent</p>
              <p className="font-black text-slate-900">{players.find(p => p.playerId !== playerId)?.name ?? 'Waiting…'}</p>
            </div>
          </div>

          {/* Chess board */}
          <div className="relative rounded-[2.5rem] bg-white p-4 shadow-xl border-4 border-slate-200 overflow-hidden">
            <Chessboard
              options={{
                position: roomState?.fen ?? 'start',
                boardOrientation: boardOrientation,
                animationDurationInMs: 350,
                allowDragging: false,
                onSquareClick: handleSquareClick,
                squareStyles: moveFrom ? { [moveFrom]: { backgroundColor: "rgba(255, 255, 0, 0.4)" } } : {},
                boardStyle: { borderRadius: '1.5rem' },
                darkSquareStyle: { backgroundColor: '#739552' },
                lightSquareStyle: { backgroundColor: '#ebecd0' }
              }}
            />
            {!roomState && <WaitingOverlay />}
            <AnimatePresence>
              {isCheck && (
                <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <div className="bg-rose-600 text-white px-8 py-3 rounded-full font-black italic text-2xl shadow-2xl uppercase tracking-tighter ring-8 ring-white/20">Check!</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Game over overlay */}
            <AnimatePresence>
              {roomState?.status !== 'playing' && roomState?.status && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-30 rounded-[2rem]">
                  <div className="text-center text-white p-8">
                    <p className="text-6xl mb-4">{roomState.winner === 'w' ? (myRole === 'w' ? '🏆' : '💀') : roomState.winner === 'b' ? (myRole === 'b' ? '🏆' : '💀') : '🤝'}</p>
                    <h2 className="text-4xl font-black italic mb-2">
                       {roomState.status === 'draw' || roomState.status === 'stalemate' ? 'Draw' : roomState.status === 'resign' ? (roomState.winner === myRole ? 'Opponent Resigned' : 'You Resigned') : roomState.winner === myRole ? 'You Win!' : 'Opponent Wins'}
                    </h2>
                    <button onClick={handleRematch} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-base font-black text-slate-900 transition hover:bg-slate-100">
                      <RefreshCcw className="h-5 w-5" /> Rematch
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* My strip */}
          <div className={cn('flex items-center gap-3 rounded-[1.75rem] bg-white p-4 shadow-sm border-2 transition-all', isMyTurn ? 'border-sky-400' : 'border-transparent opacity-60')}>
            <div className="h-10 w-10 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 text-lg">♙</div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{myRole === 'w' ? 'White' : myRole === 'b' ? 'Black' : 'You'}</p>
              <p className="font-black text-slate-900">{resolvedName}</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <RoomSidebar
          roomCode={roomCode}
          players={players}
          playerId={playerId}
          roleLabel={roleLabel}
          roleHint={roleHint}
          connectionStatus={connectionStatus}
          connectionError={connectionError}
          onLeave={() => setSearchParams({})}
          copyFeedback={copyFeedback}
          onCopyCode={copyCode}
          onShare={shareInvite}
        >
          {/* Move history */}
          <div className="rounded-[2rem] bg-white p-5 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Move log</p>
            <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto text-xs font-mono">
              {(roomState?.moves ?? []).map((move, i) => (
                i % 2 === 0 ? (
                  <div key={i} className="col-span-2 grid grid-cols-12 gap-1">
                    <span className="col-span-2 text-slate-300 font-black">{Math.floor(i / 2) + 1}.</span>
                    <span className="col-span-5 bg-slate-50 px-2 py-1 rounded-lg font-black text-slate-700">{move}</span>
                    {roomState?.moves[i + 1] && (
                      <span className="col-span-5 bg-slate-900 px-2 py-1 rounded-lg font-black text-white">{roomState.moves[i + 1]}</span>
                    )}
                  </div>
                ) : null
              ))}
              {!roomState?.moves.length && (
                <p className="col-span-2 text-slate-300 text-center py-4">No moves yet</p>
              )}
            </div>
            
            {/* Player controls */}
            {roomState?.status === 'playing' && (myRole === 'w' || myRole === 'b') && (
              <div className="mt-5 grid grid-cols-2 gap-2 border-t pt-4">
                <button
                  onClick={handleResign}
                  className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-black text-rose-600 transition hover:bg-rose-100"
                >
                  Resign
                </button>
                <button
                  onClick={handleDraw}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black text-slate-600 transition hover:bg-slate-100"
                >
                  Draw
                </button>
              </div>
            )}
          </div>
        </RoomSidebar>
      </div>
    </div>
  );
}
