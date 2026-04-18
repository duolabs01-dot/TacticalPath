/**
 * Online Morabaraba — live 2-player Nine Men's Morris via Supabase Realtime.
 * Player 1 (first to join) plays Dark; Player 2 plays White.
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

// ── Pure Morris logic (no bot) ────────────────────────────────────────────────

const positions = [
  { x: 10, y: 10 }, { x: 50, y: 10 }, { x: 90, y: 10 },
  { x: 23, y: 23 }, { x: 50, y: 23 }, { x: 77, y: 23 },
  { x: 37, y: 37 }, { x: 50, y: 37 }, { x: 63, y: 37 },
  { x: 10, y: 50 }, { x: 23, y: 50 }, { x: 37, y: 50 },
  { x: 63, y: 50 }, { x: 77, y: 50 }, { x: 90, y: 50 },
  { x: 37, y: 63 }, { x: 50, y: 63 }, { x: 63, y: 63 },
  { x: 23, y: 77 }, { x: 50, y: 77 }, { x: 77, y: 77 },
  { x: 10, y: 90 }, { x: 50, y: 90 }, { x: 90, y: 90 },
];

const neighbors: Record<number, number[]> = {
  0:[1,9],1:[0,2,4],2:[1,14],3:[4,10],4:[1,3,5,7],5:[4,13],6:[7,11],7:[4,6,8],8:[7,12],
  9:[0,10,21],10:[3,9,11,18],11:[6,10,15],12:[8,13,17],13:[5,12,14,20],14:[2,13,23],
  15:[11,16],16:[15,17,19],17:[12,16],18:[10,19],19:[16,18,20,22],20:[13,19],
  21:[9,22],22:[19,21,23],23:[14,22],
};

const mills = [
  [0,1,2],[3,4,5],[6,7,8],[21,22,23],[18,19,20],[15,16,17],
  [0,9,21],[3,10,18],[6,11,15],[2,14,23],[5,13,20],[8,12,17],
  [1,4,7],[16,19,22],[9,10,11],[12,13,14],
];

type MP = '1' | '2';
type Board = (MP | null)[];

function checkMill(board: Board, idx: number): boolean {
  const p = board[idx]; if (!p) return false;
  return mills.some(m => m.includes(idx) && m.every(i => board[i] === p));
}
function getCapturables(board: Board, p: MP): number[] {
  const pieces = board.map((v, i) => v === p ? i : null).filter((v): v is number => v !== null);
  const outside = pieces.filter(i => !checkMill(board, i));
  return outside.length > 0 ? outside : pieces;
}
function getMoves(board: Board, pob: Record<MP, number>, idx: number, p: MP): number[] {
  if (board[idx] !== p) return [];
  if (pob[p] === 3) return board.map((v, i) => v === null ? i : null).filter((v): v is number => v !== null);
  return neighbors[idx].filter(n => board[n] === null);
}
function allMoves(board: Board, pob: Record<MP, number>, p: MP): { from: number; to: number }[] {
  return board.flatMap((v, i) => v !== p ? [] : getMoves(board, pob, i, p).map(to => ({ from: i, to })));
}

// ── State ─────────────────────────────────────────────────────────────────────

interface OnlineMorrisState {
  board: Board;
  stage: 'placement' | 'moving';
  piecesPlaced: Record<MP, number>;
  piecesOnBoard: Record<MP, number>;
  turn: MP;           // '1' = dark (player 1), '2' = white (player 2)
  phase: 'normal' | 'capturing';  // capturing: current player just formed a mill
  status: 'playing' | 'finished';
  winner: MP | 'draw' | null;
  updatedAt: number;
}

function createInitialState(): OnlineMorrisState {
  return { board: Array(24).fill(null), stage: 'placement', piecesPlaced: { '1': 0, '2': 0 }, piecesOnBoard: { '1': 0, '2': 0 }, turn: '1', phase: 'normal', status: 'playing', winner: null, updatedAt: Date.now() };
}

const GUEST_NAME_KEY = 'tp:guest-name';
function readName() { return typeof window === 'undefined' ? '' : localStorage.getItem(GUEST_NAME_KEY) ?? ''; }

export function OnlineMorris() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [guestName, setGuestName] = useState(readName);
  const [draftCode, setDraftCode] = useState(() => sanitizeRoomCode(searchParams.get('room') ?? ''));
  const [roomState, setRoomState] = useState<OnlineMorrisState | null>(null);
  const [players, setPlayers] = useState<RoomPresence[]>([]);
  const [connStatus, setConnStatus] = useState<ConnectionStatus>('idle');
  const [connError, setConnError] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [validDests, setValidDests] = useState<number[]>([]);

  const roomCode = sanitizeRoomCode(searchParams.get('room') ?? '');
  const playerId = useMemo(() => crypto.randomUUID(), []);
  const joinedAt = useMemo(() => Date.now(), []);
  const stateRef = useRef<OnlineMorrisState | null>(null);
  const channelRef = useRef<RoomChannel<OnlineMorrisState> | null>(null);

  const resolvedName = useMemo(() => {
    const t = guestName.trim(); return t.length >= 2 ? t.slice(0, 24) : `Guest ${playerId.slice(0, 4).toUpperCase()}`;
  }, [guestName, playerId]);

  const myRole: MP | 'spectator' | null = useMemo(() => {
    const idx = players.findIndex(p => p.playerId === playerId);
    if (idx === 0) return '1'; if (idx === 1) return '2'; if (idx >= 2) return 'spectator'; return null;
  }, [players, playerId]);

  const isMyTurn = roomState?.turn === myRole && roomState?.status === 'playing' && (myRole === '1' || myRole === '2');

  useEffect(() => { localStorage.setItem(GUEST_NAME_KEY, guestName.trim()); }, [guestName]);
  useEffect(() => { setDraftCode(roomCode); }, [roomCode]);
  useEffect(() => { stateRef.current = roomState; }, [roomState]);

  useEffect(() => {
    if (!roomCode) {
      setPlayers([]); setRoomState(null); stateRef.current = null;
      setConnStatus('idle'); setConnError(null);
      channelRef.current?.teardown(); channelRef.current = null;
      return;
    }
    setConnError(null);
    const ch = createRoomChannel<OnlineMorrisState>({
      channelName: `morris:${roomCode}`,
      playerId,
      presence: { playerId, name: resolvedName, joinedAt, onlineAt: new Date().toISOString() },
      onStateChange: s => { stateRef.current = s; setRoomState(s); setSelected(null); setValidDests([]); },
      onPlayersChange: setPlayers,
      onStatusChange: (s, err) => { setConnStatus(s); if (err) setConnError(err); },
      onBootstrap: createInitialState,
      getLatestState: () => stateRef.current,
    });
    channelRef.current = ch;
    return () => { ch.teardown(); channelRef.current = null; };
  }, [roomCode, playerId, resolvedName, joinedAt]);

  const pushState = useCallback((next: OnlineMorrisState) => {
    stateRef.current = next; setRoomState(next);
    setSelected(null); setValidDests([]);
    channelRef.current?.push(next);
  }, []);

  const checkGameOver = useCallback((s: OnlineMorrisState): OnlineMorrisState => {
    if (s.stage === 'moving') {
      if (s.piecesOnBoard['1'] < 3 && s.piecesPlaced['1'] === 9) return { ...s, status: 'finished', winner: '2' };
      if (s.piecesOnBoard['2'] < 3 && s.piecesPlaced['2'] === 9) return { ...s, status: 'finished', winner: '1' };
      if (allMoves(s.board, s.piecesOnBoard, s.turn).length === 0) return { ...s, status: 'finished', winner: s.turn === '1' ? '2' : '1' };
    }
    return s;
  }, []);

  const handlePointClick = (i: number) => {
    if (!roomState || !isMyTurn) return;
    const s = roomState;
    const p = myRole as MP;

    // ── Capture mode ─────────────────────────────────────────────────────────
    if (s.phase === 'capturing') {
      const opp: MP = p === '1' ? '2' : '1';
      const caps = getCapturables(s.board, opp);
      if (!caps.includes(i)) return;
      const nextBoard = [...s.board] as Board;
      nextBoard[i] = null;
      const nextOB = { ...s.piecesOnBoard, [opp]: s.piecesOnBoard[opp] - 1 };
      let next: OnlineMorrisState = { ...s, board: nextBoard, piecesOnBoard: nextOB, turn: opp, phase: 'normal', updatedAt: Date.now() };
      next = checkGameOver(next);
      pushState(next);
      return;
    }

    // ── Placement ─────────────────────────────────────────────────────────────
    if (s.stage === 'placement') {
      if (s.board[i] !== null || s.piecesPlaced[p] >= 9) return;
      const nextBoard = [...s.board] as Board; nextBoard[i] = p;
      const nextPP = { ...s.piecesPlaced, [p]: s.piecesPlaced[p] + 1 };
      const nextOB = { ...s.piecesOnBoard, [p]: s.piecesOnBoard[p] + 1 };
      const opp: MP = p === '1' ? '2' : '1';
      const nextStage = nextPP['1'] === 9 && nextPP['2'] === 9 ? 'moving' : 'placement';
      const mill = checkMill(nextBoard, i);
      let next: OnlineMorrisState = { ...s, board: nextBoard, piecesPlaced: nextPP, piecesOnBoard: nextOB, stage: nextStage, turn: mill ? p : opp, phase: mill ? 'capturing' : 'normal', updatedAt: Date.now() };
      if (!mill) next = checkGameOver(next);
      pushState(next);
      return;
    }

    // ── Moving ────────────────────────────────────────────────────────────────
    if (selected === null) {
      const moves = getMoves(s.board, s.piecesOnBoard, i, p);
      if (s.board[i] === p && moves.length > 0) { setSelected(i); setValidDests(moves); }
      return;
    }
    if (i === selected) { setSelected(null); setValidDests([]); return; }
    if (s.board[i] === p) {
      const moves = getMoves(s.board, s.piecesOnBoard, i, p);
      if (moves.length > 0) { setSelected(i); setValidDests(moves); }
      return;
    }
    if (!validDests.includes(i)) { setSelected(null); setValidDests([]); return; }

    const nextBoard = [...s.board] as Board;
    nextBoard[i] = p; nextBoard[selected] = null;
    const opp: MP = p === '1' ? '2' : '1';
    const mill = checkMill(nextBoard, i);
    let next: OnlineMorrisState = { ...s, board: nextBoard, turn: mill ? p : opp, phase: mill ? 'capturing' : 'normal', updatedAt: Date.now() };
    if (!mill) next = checkGameOver(next);
    pushState(next);
  };

  const handleRematch = () => { pushState(createInitialState()); };

  const inviteUrl = useMemo(() => roomCode ? `${window.location.origin}/multiplayer/morris?room=${roomCode}` : '', [roomCode]);
  const copyCode = async () => { await navigator.clipboard.writeText(roomCode); setCopyFeedback('Code copied'); setTimeout(() => setCopyFeedback(null), 1500); };
  const shareInvite = async () => {
    try {
      if (navigator.share) { await navigator.share({ title: 'Play Morabaraba on TacticalPath', text: `Room ${roomCode}`, url: inviteUrl }); return; }
      await navigator.clipboard.writeText(inviteUrl);
      setCopyFeedback('Invite copied'); setTimeout(() => setCopyFeedback(null), 1500);
    } catch { setCopyFeedback('Share failed'); setTimeout(() => setCopyFeedback(null), 1500); }
  };

  const roleLabel = myRole === '1' ? 'You are Dark ⬤' : myRole === '2' ? 'You are White ○' : myRole === 'spectator' ? 'Watching' : 'Waiting for seat';
  const roleHint = (myRole === '1' || myRole === '2')
    ? (isMyTurn ? (roomState?.phase === 'capturing' ? 'Mill formed! Click an opponent piece to capture.' : roomState?.stage === 'placement' ? 'Place a piece on any empty point.' : 'Click one of your pieces to move it.') : 'Waiting for opponent…')
    : 'Share the room code to invite a friend.';

  if (!roomCode) {
    return (
      <Lobby
        gameName="Morabaraba"
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

  const board = roomState?.board ?? Array(24).fill(null) as Board;
  const capturables = new Set(
    roomState?.phase === 'capturing' && myRole && myRole !== 'spectator'
      ? getCapturables(board, myRole === '1' ? '2' : '1')
      : []
  );

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6 md:px-8 md:py-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-600">Live room · {roomCode}</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">Online Morabaraba</h1>
          {roomState && (
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">
              {roomState.stage === 'placement' ? `Placement · ${roomState.piecesPlaced['1']}/9 · ${roomState.piecesPlaced['2']}/9` : 'Moving phase'}
            </p>
          )}
        </div>
        <ConnectionBadge status={connStatus} />
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr,340px]">
        {/* Board */}
        <div className="relative">
          <div className="relative aspect-square bg-amber-50 rounded-3xl border-4 border-amber-200 shadow-xl p-4 overflow-hidden">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full stroke-amber-800 stroke-[0.8] fill-none opacity-40">
              <rect x="10" y="10" width="80" height="80" />
              <rect x="23" y="23" width="54" height="54" />
              <rect x="37" y="37" width="26" height="26" />
              <line x1="50" y1="10" x2="50" y2="37" />
              <line x1="50" y1="63" x2="50" y2="90" />
              <line x1="10" y1="50" x2="37" y2="50" />
              <line x1="63" y1="50" x2="90" y2="50" />
            </svg>

            {positions.map((pos, i) => {
              const cell = board[i];
              const isCap = capturables.has(i);
              const isVal = validDests.includes(i);
              const isSel = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => handlePointClick(i)}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  className={cn(
                    'absolute w-8 h-8 -ml-4 -mt-4 rounded-full z-10 transition-all duration-200 flex items-center justify-center',
                    cell === null ? 'bg-amber-100/80 hover:bg-amber-200 border border-amber-200 shadow-inner' :
                      cell === '1' ? 'bg-slate-900 border-2 border-slate-700 shadow-lg' : 'bg-white border-2 border-slate-300 shadow-lg',
                    isSel && 'ring-4 ring-blue-500 ring-offset-2 scale-110',
                    isVal && 'ring-4 ring-blue-400 ring-offset-2 scale-110',
                    isCap && 'ring-4 ring-red-500 ring-offset-2 animate-pulse',
                  )}
                >
                  {cell === '1' && <div className="w-2 h-2 bg-slate-500 rounded-full opacity-30" />}
                </button>
              );
            })}

            {!roomState && <WaitingOverlay />}

            <AnimatePresence>
              {roomState?.status === 'finished' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-20 rounded-3xl">
                  <div className="text-center text-white p-8">
                    <p className="text-6xl mb-4">{roomState.winner === myRole ? '🏆' : roomState.winner === 'draw' ? '🤝' : '💀'}</p>
                    <h2 className="text-4xl font-black italic mb-2">
                      {roomState.winner === 'draw' ? 'Draw!' : roomState.winner === myRole ? 'You Win!' : 'Opponent Wins'}
                    </h2>
                    <button onClick={handleRematch} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-black text-slate-900 transition hover:bg-slate-100">
                      <RefreshCcw className="h-5 w-5" /> Rematch
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Piece counts */}
          {roomState && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className={cn('rounded-2xl bg-white p-3 text-center shadow-sm transition-all', roomState.turn === '1' && roomState.status === 'playing' && myRole === '1' ? 'ring-2 ring-blue-500 scale-105' : 'opacity-60')}>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Dark (P1)</p>
                <p className="text-lg font-black">{roomState.stage === 'placement' ? `${9 - roomState.piecesPlaced['1']} left` : `${roomState.piecesOnBoard['1']} on board`}</p>
              </div>
              <div className={cn('rounded-2xl bg-white p-3 text-center shadow-sm transition-all', roomState.turn === '2' && roomState.status === 'playing' && myRole === '2' ? 'ring-2 ring-blue-500 scale-105' : 'opacity-60')}>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">White (P2)</p>
                <p className="text-lg font-black">{roomState.stage === 'placement' ? `${9 - roomState.piecesPlaced['2']} left` : `${roomState.piecesOnBoard['2']} on board`}</p>
              </div>
            </div>
          )}
        </div>

        <RoomSidebar
          roomCode={roomCode} players={players} playerId={playerId}
          roleLabel={roleLabel} roleHint={roleHint}
          connectionStatus={connStatus} connectionError={connError}
          onLeave={() => setSearchParams({})}
          copyFeedback={copyFeedback} onCopyCode={copyCode} onShare={shareInvite}
        />
      </div>
    </div>
  );
}
