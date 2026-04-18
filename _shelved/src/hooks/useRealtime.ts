import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Game = Database['public']['Tables']['games']['Row'];

interface LiveGameState {
  fen: string;
  lastMove: string | null;
  whiteTimeMs: number;
  blackTimeMs: number;
}

/**
 * Hook for real-time game state synchronization via Supabase Realtime
 * 
 * Uses Supabase Broadcast channels for low-latency move sync:
 * - Each game gets its own channel: `game:{gameId}`
 * - Players send moves as broadcast messages
 * - Game metadata (result, PGN) is persisted to the games table
 */
export function useRealtimeGame(gameId: string | null) {
  const [gameState, setGameState] = useState<LiveGameState | null>(null);
  const [connected, setConnected] = useState(false);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  useEffect(() => {
    if (!gameId) return;

    const channel = supabase.channel(`game:${gameId}`, {
      config: { broadcast: { self: true } },
    });

    channel
      .on('broadcast', { event: 'move' }, ({ payload }) => {
        setGameState(payload as LiveGameState);
      })
      .on('broadcast', { event: 'game_over' }, ({ payload }) => {
        setGameState(prev => prev ? { ...prev, ...payload } : null);
      })
      .subscribe((status) => {
        setConnected(status === 'SUBSCRIBED');
      });

    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
      channelRef.current = null;
    };
  }, [gameId]);

  const sendMove = useCallback(
    (state: LiveGameState) => {
      channelRef.current?.send({
        type: 'broadcast',
        event: 'move',
        payload: state,
      });
    },
    []
  );

  const sendGameOver = useCallback(
    (result: { result: string; reason: string }) => {
      channelRef.current?.send({
        type: 'broadcast',
        event: 'game_over',
        payload: result,
      });
    },
    []
  );

  return { gameState, connected, sendMove, sendGameOver };
}

/**
 * Hook for the classroom waiting room
 * Listens for game pairings and session status
 */
export function useWaitingRoom(classroomId: string | null, studentId: string | null) {
  const [pairedGameId, setPairedGameId] = useState<string | null>(null);
  const [sessionActive, setSessionActive] = useState(false);
  const [waitingStudents, setWaitingStudents] = useState<string[]>([]);

  useEffect(() => {
    if (!classroomId || !studentId) return;

    const channel = supabase.channel(`classroom:${classroomId}`);

    channel
      .on('broadcast', { event: 'pair' }, ({ payload }) => {
        // Check if this student is in the pairing
        const { whiteId, blackId, gameId } = payload;
        if (whiteId === studentId || blackId === studentId) {
          setPairedGameId(gameId);
        }
      })
      .on('broadcast', { event: 'session_status' }, ({ payload }) => {
        setSessionActive(payload.active);
      })
      .on('broadcast', { event: 'waiting_update' }, ({ payload }) => {
        setWaitingStudents(payload.students);
      })
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const students = Object.values(state)
          .flat()
          .map((p: any) => p.student_id)
          .filter(Boolean);
        setWaitingStudents(students);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ student_id: studentId });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [classroomId, studentId]);

  return { pairedGameId, sessionActive, waitingStudents };
}

/**
 * Hook for coach to manage live session pairing
 */
export function useCoachSession(classroomId: string | null) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  useEffect(() => {
    if (!classroomId) return;

    const channel = supabase.channel(`classroom:${classroomId}`);
    channel.subscribe();
    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
      channelRef.current = null;
    };
  }, [classroomId]);

  const startSession = useCallback(async (coachId: string) => {
    if (!classroomId) return;

    const { data, error } = await supabase
      .from('sessions')
      .insert({ classroom_id: classroomId, started_by: coachId })
      .select()
      .single();

    if (data) {
      setSessionId(data.id);
      channelRef.current?.send({
        type: 'broadcast',
        event: 'session_status',
        payload: { active: true, sessionId: data.id },
      });
    }

    return { data, error };
  }, [classroomId]);

  const endSession = useCallback(async () => {
    if (!sessionId) return;

    await supabase
      .from('sessions')
      .update({ status: 'ended', ended_at: new Date().toISOString() })
      .eq('id', sessionId);

    channelRef.current?.send({
      type: 'broadcast',
      event: 'session_status',
      payload: { active: false },
    });

    setSessionId(null);
  }, [sessionId]);

  const pairStudents = useCallback(async (
    pairs: Array<{ whiteId: string; blackId: string }>,
    timeControl: number = 600
  ) => {
    if (!classroomId || !sessionId) return;

    const games = pairs.map(({ whiteId, blackId }) => ({
      session_id: sessionId,
      classroom_id: classroomId,
      white_player_id: whiteId,
      black_player_id: blackId,
      time_control: timeControl,
    }));

    const { data } = await supabase
      .from('games')
      .insert(games)
      .select();

    // Broadcast pairings to all students
    data?.forEach((game, i) => {
      channelRef.current?.send({
        type: 'broadcast',
        event: 'pair',
        payload: {
          gameId: game.id,
          whiteId: pairs[i].whiteId,
          blackId: pairs[i].blackId,
        },
      });
    });

    return data;
  }, [classroomId, sessionId]);

  return { sessionId, startSession, endSession, pairStudents };
}
