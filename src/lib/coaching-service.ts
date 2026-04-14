import { GameType, GameState } from "../context/GameContext";

export interface CoachingInsight {
  message: string;
  type: 'hint' | 'feedback' | 'analysis';
  category?: 'missed win' | 'failed defense' | 'rushed move' | 'bad trade' | 'missed block' | 'poor setup' | 'threat blindness';
  turningPointIndex?: number;
  highlightSquares?: number[];
}

export class CoachingService {
  static getInsight(gameType: GameType, state: GameState): CoachingInsight {
    if (state.status === 'finished') {
       if (gameType === 'tictactoe') return this.getTicTacToePostGame(state);
       return {
           message: `Game over! ${state.winner === 'draw' ? "It was a hard-fought draw." : "Great game!"}`,
           type: 'analysis'
       };
    }

    switch (gameType) {
      case 'chess': return { message: "Focus on development and king safety.", type: 'hint' };
      case 'tictactoe': return this.getTicTacToeInsight(state);
      case 'checkers': return { message: "Try to control the center.", type: 'hint' };
      case 'morris': return { message: "Build mills and block your opponent.", type: 'hint' };
      default: return { message: "Think carefully about your next move.", type: 'hint' };
    }
  }

  private static getTicTacToeInsight(state: GameState): CoachingInsight {
    const { board } = state.data;
    if (!board[4]) return {
        message: "The center is the most valuable real estate. Grab it to control the board!",
        type: 'hint',
        highlightSquares: [4]
    };

    const canWin = this.findWinningMove(board, 'X');
    if (canWin !== null) return {
        message: "You've built a winning line! Can you find the final square to seal the victory?",
        type: 'hint',
        category: 'missed win',
        highlightSquares: [canWin]
    };

    const mustBlock = this.findWinningMove(board, 'O');
    if (mustBlock !== null) return {
        message: "Danger! The Robot is about to win. You must block their path immediately.",
        type: 'hint',
        category: 'threat blindness',
        highlightSquares: [mustBlock]
    };

    return { message: "Try to create a 'double-threat' (fork) where the Robot can only block one of two winning lines!", type: 'hint' };
  }

  private static getTicTacToePostGame(state: GameState): CoachingInsight {
      if (state.winner === 'X') return { message: "Masterful victory! You outmaneuvered the Robot with superior board awareness.", type: 'analysis' };
      if (state.winner === 'draw') return { message: "A battle of wits! Neither side gave an inch. This is the theoretical limit of Tic Tac Toe.", type: 'analysis' };

      const moves = state.moves;
      const board = Array(9).fill(null);

      for (let i = 0; i < moves.length; i++) {
          const move = moves[i];
          if (move.player === 'X') {
              const mustBlock = this.findWinningMove(board, 'O');
              if (mustBlock !== null && move.index !== mustBlock) {
                  return {
                      message: `A tough loss, but look at Move ${i}. Blocking square ${mustBlock + 1} was required to stay in the game.`,
                      type: 'analysis',
                      category: 'threat blindness',
                      turningPointIndex: i,
                      highlightSquares: [mustBlock]
                  };
              }
              const canWin = this.findWinningMove(board, 'X');
              if (canWin !== null && move.index !== canWin) {
                return {
                    message: `Victory was within reach at Move ${i}! Choosing square ${canWin + 1} would have won the game instantly.`,
                    type: 'analysis',
                    category: 'missed win',
                    turningPointIndex: i,
                    highlightSquares: [canWin]
                };
              }
          }
          board[move.index] = move.player;
      }

      return { message: "The Robot found a winning pattern. Watch for 'L' shapes and diagonals next time!", type: 'analysis' };
  }

  private static findWinningMove(board: (string|null)[], player: string): number | null {
      const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
      for (let line of lines) {
          const vals = line.map(i => board[i]);
          if (vals.filter(v => v === player).length === 2 && vals.filter(v => v === null).length === 1) {
              return line[vals.indexOf(null)];
          }
      }
      return null;
  }
}
