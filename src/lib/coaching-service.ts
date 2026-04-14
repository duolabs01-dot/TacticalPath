import { GameType, GameState } from "../context/GameContext";

export interface CoachingInsight {
  message: string;
  type: 'hint' | 'feedback' | 'analysis';
  category?: 'missed win' | 'failed defense' | 'rushed move' | 'bad trade' | 'missed block' | 'poor setup' | 'threat blindness';
}

export class CoachingService {
  static getInsight(gameType: GameType, state: GameState): CoachingInsight {
    if (state.status === 'finished') {
       return {
           message: `Game over! ${state.winner === 'draw' ? "It was a hard-fought draw." : (state.winner === 'X' || state.winner === '1' || state.winner === 'w' ? "Great win! You played strategically." : "The Robot won this time. Let's analyze why.")}`,
           type: 'analysis'
       };
    }

    switch (gameType) {
      case 'chess':
        return this.getChessInsight(state);
      case 'tictactoe':
        return this.getTicTacToeInsight(state);
      case 'checkers':
        return { message: "Try to control the center of the board to limit the robot's mobility.", type: 'hint' };
      case 'morris':
        return { message: "Think ahead: blocking the robot's mill is as important as building your own.", type: 'hint' };
      case 'solitaire':
        return { message: "Always prioritize revealing hidden cards in the columns.", type: 'hint' };
      default:
        return { message: "Focus on your next move and look for patterns.", type: 'hint' };
    }
  }

  private static getChessInsight(state: GameState): CoachingInsight {
      const movesCount = state.moves.length;
      if (movesCount < 10) return { message: "Opening phase: Focus on developing your pieces and king safety.", type: 'hint' };
      return { message: "Middle game: Look for tactical opportunities like forks and pins.", type: 'hint' };
  }

  private static getTicTacToeInsight(state: GameState): CoachingInsight {
    const { board } = state.data;
    const center = board[4];
    if (!center) return { message: "The center is the most valuable square. Grab it!", type: 'hint', category: 'poor setup' };

    // Check if player can win in next move
    const canWin = this.canWinNext(board, 'X');
    if (canWin !== null) return { message: "You have a winning move! Can you see it?", type: 'hint', category: 'missed win' };

    // Check if player must block robot
    const mustBlock = this.canWinNext(board, 'O');
    if (mustBlock !== null) return { message: "The Robot is about to win. You must block it!", type: 'hint', category: 'threat blindness' };

    return { message: "Think carefully. Every move counts in Tic Tac Toe!", type: 'hint' };
  }

  private static canWinNext(board: (string|null)[], player: string): number | null {
      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
      for (let line of lines) {
          const [a, b, c] = line;
          const vals = [board[a], board[b], board[c]];
          const playerCount = vals.filter(v => v === player).length;
          const emptyCount = vals.filter(v => v === null).length;
          if (playerCount === 2 && emptyCount === 1) {
              return line[vals.indexOf(null)];
          }
      }
      return null;
  }
}
