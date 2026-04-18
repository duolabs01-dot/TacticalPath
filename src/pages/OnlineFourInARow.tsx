import { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock3, RotateCcw, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { isSupabaseConfigured } from "../lib/supabase";
import { useOnlineRoom } from "../lib/online-room";
import { RoomSidebar } from "../components/RoomSidebar";
import { RoomUI } from "../components/RoomUI";
import { playMoveSound, playCaptureSound, playWinSound } from "../lib/audio";
import { createEmptyBoard, checkWin, getValidMoves, applyMove, FourBoard, COLS, ROWS, getIndex } from "../utils/fourinarow";

interface OnlineFourState {
  board: FourBoard;
  turn: "1" | "2";
  status: "playing" | "finished" | "draw" | "resign";
  winner: "1" | "2" | "draw" | null;
  updatedAt: number;
}

function createInitialState(): OnlineFourState {
  return { board: createEmptyBoard(), turn: "1", status: "playing", winner: null, updatedAt: Date.now() };
}

export function OnlineFourInARow() {
  const { roomCode, myRole, roomState, setRoomState, channelRef, opponentPresence } = useOnlineRoom<OnlineFourState>({
    gamePath: "fourinarow",
    createInitialState,
  });

  const stateRef = useRef<OnlineFourState>();
  stateRef.current = roomState;
  
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (roomState?.status === 'finished' || roomState?.status === 'draw' || roomState?.status === 'resign') {
       if (roomState.status === 'finished') playWinSound(); // simple play end track
       setTimeout(() => setShowResult(true), 1000);
    } else {
       setShowResult(false);
    }
  }, [roomState?.status, roomState?.updatedAt]);

  const isMyTurn = roomState?.status === 'playing' && roomState.turn === myRole;

  const handleColClick = (col: number) => {
    if (!roomState || !isMyTurn) return;
    const board = roomState.board;
    if (!getValidMoves(board).includes(col)) return;

    const nextBoard = applyMove(board, col, myRole as "1" | "2");
    playMoveSound();

    let nextTurn = myRole === "1" ? "2" : "1";
    let nextStatus = roomState.status;
    let nextWinner = null;

    if (checkWin(nextBoard, myRole as "1" | "2")) {
      nextStatus = "finished";
      nextWinner = myRole;
    } else if (getValidMoves(nextBoard).length === 0) {
      nextStatus = "draw";
      nextWinner = "draw";
    }

    const next: OnlineFourState = {
      ...roomState,
      board: nextBoard,
      turn: nextTurn as "1" | "2",
      status: nextStatus as any,
      winner: nextWinner as any,
      updatedAt: Date.now()
    };
    
    stateRef.current = next;
    setRoomState(next);
    channelRef.current?.push(next);
  };

  const inviteUrl = useMemo(() => roomCode ? `${window.location.origin}/multiplayer/fourinarow?room=${roomCode}` : '', [roomCode]);

  const handleRematch = () => {
    const next = createInitialState();
    stateRef.current = next;
    setRoomState(next);
    channelRef.current?.push(next);
  };

  const handleResign = () => {
    if (!roomState || (myRole !== '1' && myRole !== '2')) return;
    const next: OnlineFourState = { ...roomState, status: 'resign', winner: myRole === '1' ? '2' : '1', updatedAt: Date.now() };
    stateRef.current = next;
    setRoomState(next);
    channelRef.current?.push(next);
  };

  if (!roomCode || !myRole) {
    return <RoomUI gameName="Four in a Row" icon="🔴" />;
  }

  const resultWin = roomState?.winner === myRole;
  const board = roomState?.board || createEmptyBoard();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
      <header className="mb-6 flex items-center justify-between">
        <Link to="/multiplayer" className="rounded-2xl bg-white p-3 shadow-sm transition hover:bg-slate-50">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </Link>
      </header>
      
      {!isSupabaseConfigured && (
        <div className="mb-6 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
          Supabase is not configured. Live sync is offline.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
        {/* Game Area */}
        <div className="relative aspect-[7/6] w-full max-w-[600px] mx-auto overflow-hidden rounded-[2rem] bg-blue-600 p-3 shadow-xl">
           <div className="grid h-full w-full grid-cols-7 grid-rows-6 gap-2">
             {[...Array(ROWS)].map((_, rowIndexVisual) => {
               const r = ROWS - 1 - rowIndexVisual; // 5 down to 0
               return [...Array(COLS)].map((_, c) => {
                 const cell = board[getIndex(c, r)];
                 return (
                   <button
                     key={`cell-${c}-${r}`}
                     onClick={() => handleColClick(c)}
                     disabled={!isMyTurn}
                     className="relative flex items-center justify-center rounded-full bg-blue-800 shadow-inner group"
                   >
                     <AnimatePresence>
                       {cell && (
                          <motion.div
                            initial={{ y: -300, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
                            className={`absolute inset-[10%] rounded-full shadow-md ${cell === "1" ? "bg-rose-500" : "bg-amber-400"}`}
                          />
                       )}
                     </AnimatePresence>
                     {/* Hover indicator */}
                     {!cell && isMyTurn && (
                        <div className="absolute inset-[20%] rounded-full bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
                     )}
                   </button>
                 )
               });
             })}
           </div>

           {showResult && roomState && (
             <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/80 p-8 backdrop-blur">
                <div className="text-center text-white">
                   <p className="mb-4 text-6xl">{resultWin ? "🏆" : roomState.status === 'draw' ? "🤝" : "💀"}</p>
                   <h2 className="mb-6 text-4xl font-black italic">{roomState.status === 'resign' ? (resultWin ? "Opponent Resigned" : "You Resigned") : roomState.status === 'draw' ? "Draw" : resultWin ? "You Win!" : "Opponent Wins"}</h2>
                   <button onClick={handleRematch} className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-base font-black text-slate-900 hover:bg-slate-100">
                     <RotateCcw className="h-5 w-5" /> Rematch
                   </button>
                </div>
             </div>
           )}
        </div>

        {/* Sidebar */}
        <RoomSidebar
           roomCode={roomCode}
           inviteUrl={inviteUrl}
           myRole={myRole}
           opponentPresence={opponentPresence}
           turn={roomState?.turn}
           status={roomState?.status}
           player1Label="Red Player"
           player2Label="Yellow Player"
           icon1={<div className="h-4 w-4 rounded-full bg-rose-500" />}
           icon2={<div className="h-4 w-4 rounded-full bg-amber-400" />}
        >
           {roomState?.status === 'playing' && (
              <div className="mt-5 grid grid-cols-2 gap-2 border-t pt-4">
                 <button onClick={handleResign} className="col-span-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-black text-rose-600 hover:bg-rose-100">
                   Resign
                 </button>
              </div>
           )}
        </RoomSidebar>
      </div>
    </div>
  );
}
