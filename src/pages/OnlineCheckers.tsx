/**
 * Online Checkers — live 2-player checkers via Supabase Realtime room codes.
 * Player 1 (first to join) plays Red; Player 2 plays Black.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import {
  createRoomChannel, generateRoomCode, sanitizeRoomCode,
  RoomPresence, ConnectionStatus, RoomChannel,
} from '../lib/online-room';
import { Lobby, ConnectionBadge, RoomSidebar, WaitingOverlay } from '../components/RoomUI';

// Re-use pure game logic from the local Checkers page
type CheckersMove = { from: number; to: number; capture: number | null };
const PLAYER_MAN = 1, BOT_MAN = 2, PLAYER_KING = 11, BOT_KING = 22;
const isRedPiece   = (p: number) => p === PLAYER_MAN || p === PLAYER_KING;
const isBlackPiece = (p: number) => p === BOT_MAN    || p === BOT_KING;

function getDirections(piece: number) {
  const d: Array<{ dr: number; dc: number }> = [];
  if (piece === PLAYER_MAN || piece === PLAYER_KING || piece === BOT_KING)  d.push({ dr: -1, dc: -1 }, { dr: -1, dc: 1 });
  if (piece === BOT_MAN    || piece === PLAYER_KING || piece === BOT_KING)  d.push({ dr:  1, dc: -1 }, { dr:  1, dc: 1 });
  return d;
}
function getPieceMoves(board: number[], idx: number) {
  const piece = board[idx]; if (!piece) return [] as Array<{ to: number; capture: number | null }>;
  const moves: Array<{ to: number; capture: number | null }> = [];
  const row = Math.floor(idx / 8), col = idx % 8;
  getDirections(piece).forEach(({ dr, dc }) => {
    const nr = row + dr, nc = col + dc;
    if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) return;
    const ni = nr * 8 + nc;
    if (!board[ni]) { moves.push({ to: ni, capture: null }); return; }
    const jr = nr + dr, jc = nc + dc;
    if (jr < 0 || jr >= 8 || jc < 0 || jc >= 8) return;
    const ji = jr * 8 + jc;
    const isEnemy = isRedPiece(piece) ? isBlackPiece(board[ni]) : isRedPiece(board[ni]);
    if (!board[ji] && isEnemy) moves.push({ to: ji, capture: ni });
  });
  return moves;
}
function getAllMoves(board: number[], forRed: boolean): CheckersMove[] {
  const all: CheckersMove[] = [];
  board.forEach((p, i) => {
    if (!p) return;
    if (forRed ? !isRedPiece(p) : !isBlackPiece(p)) return;
    getPieceMoves(board, i).forEach(m => all.push({ from: i, ...m }));
  });
  const jumps = all.filter(m => m.capture !== null);
  return jumps.length ? jumps : all;
}
function applyMove(board: number[], move: CheckersMove) {
  const next = [...board];
  const orig = board[move.from];
  let landed = orig;
  const targetRow = Math.floor(move.to / 8);
  if (orig === PLAYER_MAN && targetRow === 0) landed = PLAYER_KING;
  if (orig === BOT_MAN    && targetRow === 7) landed = BOT_KING;
  next[move.to] = landed; next[move.from] = 0;
  if (move.capture !== null) next[move.capture] = 0;
  return next;
}
function setupBoard() {
  const b = Array(64).fill(0);
  for (let i = 0; i < 24; i++) { if ((Math.floor(i / 8) + i % 8) % 2 === 1) b[i] = 2; }
  for (let i = 40; i < 64; i++) { if ((Math.floor(i / 8) + i % 8) % 2 === 1) b[i] = 1; }
  return b;
}

const GUEST_NAME_KEY = 'tp:guest-name';
function readName() { return typeof window === 'undefined' ? '' : localStorage.getItem(GUEST_NAME_KEY) ?? ''; }

interface OnlineCheckersState {
  board: number[];
  turn: 'red' | 'black';   // red = player1, black = player2
  status: 'playing' | 'finished';
  winner: 'red' | 'black' | 'draw' | null;
  forcedSource: number | null;
  updatedAt: number;
}

function createInitialState(): OnlineCheckersState {
  return { board: setupBoard(), turn: 'red', status: 'playing', winner: null, forcedSource: null, updatedAt: Date.now() };
}

export function OnlineCheckers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [guestName, setGuestName] = useState(readName);
  const [draftCode, setDraftCode] = useState(() => sanitizeRoomCode(searchParams.get('room') ?? ''));
  const [roomState, setRoomState] = useState<OnlineCheckersState | null>(null);
  const [players, setPlayers] = useState<RoomPresence[]>([]);
  const [status, setStatus] = useState<ConnectionStatus>('idle');
  const [connError, setConnError] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [validMoves, setValidMoves] = useState<number[]>([]);

  const roomCode = sanitizeRoomCode(searchParams.get('room') ?? '');
  const playerId = useMemo(() => crypto.randomUUID(), []);
  const joinedAt = useMemo(() => Date.now(), []);
  const stateRef = useRef<OnlineCheckersState | null>(null);
  const channelRef = useRef<RoomChannel<OnlineCheckersState> | null>(null);

  const resolvedName = useMemo(() => {
    const t = guestName.trim(); return t.length >= 2 ? t.slice(0, 24) : `Guest ${playerId.slice(0, 4).toUpperCase()}`;
  }, [guestName, playerId]);

  const myRole: 'red' | 'black' | 'spectator' | null = useMemo(() => {
    const idx = players.findIndex(p => p.playerId === playerId);
    if (idx === 0) return 'red'; if (idx === 1) return 'black'; if (idx >= 2) return 'spectator'; return null;
  }, [players, playerId]);

  const isMyTurn = roomState?.turn === myRole && roomState?.status === 'playing' && (myRole === 'red' || myRole === 'black');
  const amRed = myRole === 'red';

  useEffect(() => { localStorage.setItem(GUEST_NAME_KEY, guestName.trim()); }, [guestName]);
  useEffect(() => { setDraftCode(roomCode); }, [roomCode]);
  useEffect(() => { stateRef.current = roomState; }, [roomState]);

  useEffect(() => {
    if (!roomCode) {
      setPlayers([]); setRoomState(null); stateRef.current = null;
      setStatus('idle'); setConnError(null);
      channelRef.current?.teardown(); channelRef.current = null;
      return;
    }
    setConnError(null);
    const ch = createRoomChannel<OnlineCheckersState>({
      channelName: `checkers:${roomCode}`,
      playerId,
      presence: { playerId, name: resolvedName, joinedAt, onlineAt: new Date().toISOString() },
      onStateChange: s => { stateRef.current = s; setRoomState(s); setSelected(null); setValidMoves([]); },
      onPlayersChange: setPlayers,
      onStatusChange: (s, err) => { setStatus(s); if (err) setConnError(err); },
      onBootstrap: createInitialState,
      getLatestState: () => stateRef.current,
    });
    channelRef.current = ch;
    return () => { ch.teardown(); channelRef.current = null; };
  }, [roomCode, playerId, resolvedName, joinedAt]);

  const pushMove = useCallback((move: CheckersMove, currentState: OnlineCheckersState) => {
    const forRed = currentState.turn === 'red';
    const nextBoard = applyMove(currentState.board, move);
    const becameKing = (currentState.board[move.from] === PLAYER_MAN && Math.floor(move.to / 8) === 0) ||
                       (currentState.board[move.from] === BOT_MAN    && Math.floor(move.to / 8) === 7);

    // Check for game end
    const redLeft   = nextBoard.filter(isRedPiece).length;
    const blackLeft = nextBoard.filter(isBlackPiece).length;
    const redMoves   = getAllMoves(nextBoard, true);
    const blackMoves = getAllMoves(nextBoard, false);
    let status: OnlineCheckersState['status'] = 'playing';
    let winner: OnlineCheckersState['winner'] = null;
    if (redLeft === 0 || redMoves.length === 0)   { status = 'finished'; winner = 'black'; }
    if (blackLeft === 0 || blackMoves.length === 0){ status = 'finished'; winner = 'red'; }

    // Check for multi-capture continuation
    if (move.capture !== null && !becameKing && status === 'playing') {
      const followUps = getPieceMoves(nextBoard, move.to).filter(m => m.capture !== null);
      if (followUps.length > 0) {
        const next: OnlineCheckersState = { ...currentState, board: nextBoard, forcedSource: move.to, updatedAt: Date.now() };
        stateRef.current = next; setRoomState(next);
        setSelected(move.to); setValidMoves(followUps.map(m => m.to));
        channelRef.current?.push(next);
        return;
      }
    }

    const next: OnlineCheckersState = { board: nextBoard, turn: forRed ? 'black' : 'red', status, winner, forcedSource: null, updatedAt: Date.now() };
    stateRef.current = next; setRoomState(next);
    setSelected(null); setValidMoves([]);
    channelRef.current?.push(next);
  }, []);

  const handleCellClick = (i: number) => {
    if (!roomState || !isMyTurn) return;
    const board = roomState.board;
    const piece = board[i];
    const forRed = myRole === 'red';
    const allMoves = getAllMoves(board, forRed);
    const selectable = new Set(
      roomState.forcedSource !== null ? [roomState.forcedSource] : allMoves.map(m => m.from)
    );

    if (selected === null) {
      if ((forRed ? isRedPiece(piece) : isBlackPiece(piece)) && selectable.has(i)) {
        setSelected(i);
        const moves = getAllMoves(board, forRed).filter(m => m.from === i);
        setValidMoves(moves.map(m => m.to));
      }
      return;
    }
    if (i === selected) { setSelected(null); setValidMoves([]); return; }
    if ((forRed ? isRedPiece(piece) : isBlackPiece(piece)) && selectable.has(i) && !roomState.forcedSource) {
      setSelected(i);
      setValidMoves(getAllMoves(board, forRed).filter(m => m.from === i).map(m => m.to));
      return;
    }
    const movesForPiece = getAllMoves(board, forRed).filter(m => m.from === selected);
    const move = movesForPiece.find(m => m.to === i);
    if (!move) { setSelected(null); setValidMoves([]); return; }
    pushMove(move, roomState);
  };

  const handleRematch = () => {
    const next = createInitialState();
    stateRef.current = next; setRoomState(next);
    channelRef.current?.push(next);
    setSelected(null); setValidMoves([]);
  };

  const inviteUrl = useMemo(() => roomCode ? `${window.location.origin}/multiplayer/checkers?room=${roomCode}` : '', [roomCode]);
  const copyCode = async () => { await navigator.clipboard.writeText(roomCode); setCopyFeedback('Code copied'); setTimeout(() => setCopyFeedback(null), 1500); };
  const shareInvite = async () => {
    try {
      if (navigator.share) { await navigator.share({ title: 'Play Checkers on TacticalPath', text: `Room ${roomCode}`, url: inviteUrl }); return; }
      await navigator.clipboard.writeText(inviteUrl);
      setCopyFeedback('Invite copied'); setTimeout(() => setCopyFeedback(null), 1500);
    } catch { setCopyFeedback('Share failed'); setTimeout(() => setCopyFeedback(null), 1500); }
  };

  const roleLabel = myRole === 'red' ? 'You are Red ⬤' : myRole === 'black' ? 'You are Black ⬤' : myRole === 'spectator' ? 'Watching' : 'Waiting for seat';
  const roleHint = (myRole === 'red' || myRole === 'black') ? (isMyTurn ? 'Your turn. Tap a piece, then tap a destination.' : 'Waiting for opponent…') : 'Share the room code to fill both seats.';

  if (!roomCode) {
    return (
      <Lobby
        gameName="Checkers"
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

  const board = roomState?.board ?? setup64();
  const forRed = myRole === 'red';

  // Flip board for black player so their pieces are at the bottom
  const displayIndices = myRole === 'black'
    ? Array.from({ length: 64 }, (_, i) => 63 - i)
    : Array.from({ length: 64 }, (_, i) => i);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6 md:px-8 md:py-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-600">Live room · {roomCode}</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">Online Checkers</h1>
        </div>
        <ConnectionBadge status={status} />
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr,340px]">
        <div className="flex flex-col gap-4">
          {/* Opponent info */}
          <div className={cn('flex items-center gap-3 rounded-[1.75rem] bg-white p-4 shadow-sm border-2 transition-all', roomState?.turn !== myRole && roomState?.status === 'playing' ? 'border-rose-400' : 'border-transparent opacity-60')}>
            <div className={cn('h-10 w-10 rounded-full border-b-4', myRole === 'red' ? 'bg-slate-900 border-black' : 'bg-red-500 border-red-700')} />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Opponent</p>
              <p className="font-black text-slate-900">{players.find(p => p.playerId !== playerId)?.name ?? 'Waiting…'}</p>
            </div>
          </div>

          {/* Board */}
          <div className="relative">
            <div className="grid grid-cols-8 aspect-square bg-slate-800 p-2 rounded-xl shadow-2xl border-4 border-slate-700">
              {displayIndices.map((realIdx) => {
                const row = Math.floor(realIdx / 8), col = realIdx % 8;
                const isDark = (row + col) % 2 === 1;
                const cell = board[realIdx];
                const isSelected = selected === realIdx;
                const isValid = validMoves.includes(realIdx);
                return (
                  <button
                    key={realIdx}
                    onClick={() => handleCellClick(realIdx)}
                    disabled={!isDark || !isMyTurn}
                    className={cn(
                      'flex items-center justify-center relative transition-all',
                      isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-orange-50 cursor-default',
                      isSelected && 'ring-4 ring-blue-400 ring-inset',
                      isValid && 'after:content-[""] after:w-4 after:h-4 after:bg-blue-400/60 after:rounded-full',
                    )}
                  >
                    {cell !== 0 && (
                      <div className={cn(
                        'w-4/5 h-4/5 rounded-full border-b-4 shadow-lg flex items-center justify-center transition-transform',
                        isRedPiece(cell) ? 'bg-red-500 border-red-700' : 'bg-slate-900 border-black',
                        isSelected && 'scale-110'
                      )}>
                        {(cell === PLAYER_KING || cell === BOT_KING) && <span className="text-white text-[10px]">👑</span>}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            {!roomState && <WaitingOverlay />}
            <AnimatePresence>
              {roomState?.status === 'finished' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-20 rounded-xl">
                  <div className="text-center text-white p-8">
                    <p className="text-6xl mb-4">{roomState.winner === myRole ? '🏆' : '💀'}</p>
                    <h2 className="text-4xl font-black italic mb-2">{roomState.winner === myRole ? 'You Win!' : 'Opponent Wins'}</h2>
                    <button onClick={handleRematch} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-black text-slate-900 transition hover:bg-slate-100">
                      <RefreshCcw className="h-5 w-5" /> Rematch
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* My info */}
          <div className={cn('flex items-center gap-3 rounded-[1.75rem] bg-white p-4 shadow-sm border-2 transition-all', isMyTurn ? 'border-sky-400' : 'border-transparent opacity-60')}>
            <div className={cn('h-10 w-10 rounded-full border-b-4', amRed ? 'bg-red-500 border-red-700' : 'bg-slate-900 border-black')} />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{amRed ? 'Red' : 'Black'}</p>
              <p className="font-black text-slate-900">{resolvedName}</p>
            </div>
          </div>
        </div>

        <RoomSidebar
          roomCode={roomCode} players={players} playerId={playerId}
          roleLabel={roleLabel} roleHint={roleHint}
          connectionStatus={status} connectionError={connError}
          onLeave={() => setSearchParams({})}
          copyFeedback={copyFeedback} onCopyCode={copyCode} onShare={shareInvite}
        />
      </div>
    </div>
  );
}

function setup64() { return Array(64).fill(0); }
