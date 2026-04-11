import { useState, useEffect, createContext, useContext, useCallback, ReactNode } from 'react';
import { Chess, Move } from 'chess.js';
import { v4 as uuidv4 } from 'uuid';

export type GameMode = 'puzzle' | 'play' | 'online';
export type GameStatus = 'waiting' | 'playing' | 'checkmate' | 'draw' | 'stalemate';

export interface GameState {
  id: string;
  fen: string;
  turn: 'w' | 'b';
  mode: GameMode;
  status: GameStatus;
  playerColor: 'w' | 'b';
  moves: string[];
  startedAt: number;
  theme?: string;
  timeControl?: number;
}

interface GameContextType {
  game: Chess | null;
  gameState: GameState | null;
  isMyTurn: boolean;
  startGame: (mode: GameMode, options?: { theme?: string; timeControl?: number }) => void;
  makeMove: (move: { from: string; to: string; promotion?: string }) => boolean;
  resetGame: () => void;
  undo: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [game, setGame] = useState<Chess | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [playerColor] = useState<'w' | 'b'>('w');

  const isMyTurn = game?.turn() === playerColor;

  const startGame = useCallback((mode: GameMode, options?: { theme?: string; timeControl?: number }) => {
    const newGame = new Chess();
    const newState: GameState = {
      id: uuidv4(),
      fen: newGame.fen(),
      turn: 'w',
      mode,
      status: 'playing',
      playerColor,
      moves: [],
      startedAt: Date.now(),
      theme: options?.theme,
      timeControl: options?.timeControl,
    };
    setGame(newGame);
    setGameState(newState);
  }, [playerColor]);

  const makeMove = useCallback((move: { from: string; to: string; promotion?: string }): boolean => {
    if (!game || !gameState) return false;

    const gameCopy = new Chess(game.fen());
    try {
        const result = gameCopy.move(move);
        if (result) {
          setGame(gameCopy);
          
          let status: GameStatus = 'playing';
          if (gameCopy.isCheckmate()) {
            status = 'checkmate';
          } else if (gameCopy.isDraw()) {
            status = 'draw';
          } else if (gameCopy.isStalemate()) {
            status = 'stalemate';
          }

          setGameState(prev => prev ? {
            ...prev,
            fen: gameCopy.fen(),
            turn: gameCopy.turn(),
            status,
            moves: [...prev.moves, result.san],
          } : null);

          return true;
        }
    } catch (e) {
      return false;
    }
    return false;
  }, [game, gameState]);

  const resetGame = useCallback(() => {
    setGame(null);
    setGameState(null);
  }, []);

  const undo = useCallback(() => {
    if (!game) return;
    game.undo();
    setGame(new Chess(game.fen()));
  }, [game]);

  return (
    <GameContext.Provider value={{ game, gameState, isMyTurn, startGame, makeMove, resetGame, undo }}>
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
