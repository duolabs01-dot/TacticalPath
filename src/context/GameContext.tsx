import { useState, createContext, useContext, useCallback, ReactNode } from 'react';
import { Chess } from 'chess.js';
import { v4 as uuidv4 } from 'uuid';

export type GameType = 'chess' | 'tictactoe' | 'checkers' | 'morris' | 'solitaire';
export type GameMode = 'puzzle' | 'play' | 'online';
export type GameStatus = 'waiting' | 'playing' | 'checkmate' | 'draw' | 'stalemate' | 'finished';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
  id: string;
  type: GameType;
  mode: GameMode;
  status: GameStatus;
  startedAt: number;
  data: any; // Type-specific state
  moves: any[];
  turn: string; // 'w'|'b' for chess, '1'|'2' for others
  winner?: string;
  difficulty: Difficulty;
  // Compatibility properties
  fen?: string;
}

interface GameContextType {
  gameState: GameState | null;
  game: Chess | null;
  chessGame: Chess | null;
  startNewGame: (type: GameType, mode: GameMode, options?: { difficulty?: Difficulty; [key: string]: any }) => void;
  updateGameState: (update: Partial<GameState>) => void;
  resetGame: () => void;
  // Compatibility with old API
  startGame: (mode: GameMode, options?: any) => void;
  makeMove: (move: any) => boolean;
  undo: () => void;
  isMyTurn: boolean;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [chessGame, setChessGame] = useState<Chess | null>(null);

  const startNewGame = useCallback((type: GameType, mode: GameMode, options?: { difficulty?: Difficulty; [key: string]: any }) => {
    let initialData: any = {};
    let initialTurn: string = '1';
    let initialFen: string | undefined = undefined;
    const difficulty = options?.difficulty || 'medium';

    if (type === 'chess') {
      const chess = new Chess();
      setChessGame(chess);
      initialData = { fen: chess.fen() };
      initialTurn = 'w';
      initialFen = chess.fen();
    } else if (type === 'tictactoe') {
      initialData = { board: Array(9).fill(null) };
    } else if (type === 'checkers') {
      initialData = { board: setupCheckersBoard() };
    } else if (type === 'morris') {
      initialData = {
          board: Array(24).fill(null),
          stage: 'placement',
          piecesPlaced: { "1": 0, "2": 0 },
          piecesOnBoard: { "1": 0, "2": 0 }
      };
    }

    const newState: GameState = {
      id: uuidv4(),
      type,
      mode,
      status: 'playing',
      startedAt: Date.now(),
      data: initialData,
      moves: [],
      turn: initialTurn,
      difficulty,
      fen: initialFen,
    };

    setGameState(newState);
  }, []);

  const updateGameState = useCallback((update: Partial<GameState>) => {
    setGameState(prev => {
        if (!prev) return null;
        const next = { ...prev, ...update };
        // Sync fen compatibility
        if (next.type === 'chess' && next.data?.fen) {
            next.fen = next.data.fen;
        }
        return next;
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(null);
    setChessGame(null);
  }, []);

  // Compatibility methods for existing components
  const startGame = useCallback((mode: GameMode, options?: any) => {
    startNewGame('chess', mode, options);
  }, [startNewGame]);

  const makeMove = useCallback((move: any): boolean => {
    if (gameState?.type === 'chess' && chessGame) {
      const chessCopy = new Chess(chessGame.fen());
      try {
        const result = chessCopy.move(move);
        if (result) {
          setChessGame(chessCopy);
          let status: GameStatus = 'playing';
          let winner: string | undefined = undefined;

          if (chessCopy.isCheckmate()) {
              status = 'checkmate';
              winner = chessCopy.turn() === 'w' ? 'b' : 'w';
          }
          else if (chessCopy.isDraw()) status = 'draw';
          else if (chessCopy.isStalemate()) status = 'stalemate';

          updateGameState({
            data: { fen: chessCopy.fen() },
            status,
            moves: [...gameState.moves, result.san],
            turn: chessCopy.turn(),
            winner
          });
          return true;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  }, [gameState, chessGame, updateGameState]);

  const undo = useCallback(() => {
    if (gameState?.type === 'chess' && chessGame) {
        const movesCopy = [...gameState.moves];
        movesCopy.pop();

        chessGame.undo();
        const newChess = new Chess(chessGame.fen());
        setChessGame(newChess);
        updateGameState({
            data: { fen: newChess.fen() },
            turn: newChess.turn(),
            moves: movesCopy,
            status: 'playing'
        });
    }
  }, [gameState, chessGame, updateGameState]);

  const isMyTurn = gameState?.type === 'chess' && chessGame ? chessGame.turn() === 'w' : true;

  return (
    <GameContext.Provider value={{
        gameState,
        chessGame,
        game: chessGame, // Restored for compatibility
        startNewGame,
        updateGameState,
        resetGame,
        startGame,
        makeMove,
        undo,
        isMyTurn
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

function setupCheckersBoard() {
    const board = Array(64).fill(0);
    // 1: red (bottom), 2: black (top)
    for (let i = 0; i < 24; i++) {
        const row = Math.floor(i / 8);
        const col = i % 8;
        if ((row + col) % 2 === 1) board[i] = 2;
    }
    for (let i = 40; i < 64; i++) {
        const row = Math.floor(i / 8);
        const col = i % 8;
        if ((row + col) % 2 === 1) board[i] = 1;
    }
    return board;
}
