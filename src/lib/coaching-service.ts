import { GameType, GameState } from "../context/GameContext";

export interface CoachingInsight {
  message: string;
  type: 'hint' | 'feedback' | 'analysis';
  category?: 'missed win' | 'failed defense' | 'rushed move' | 'bad trade' | 'missed block' | 'poor setup' | 'threat blindness';
  turningPointIndex?: number;
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
    if (!board[4]) return { message: "The center is the heart of the board. Try to take it!", type: 'hint' };

    const canWin = this.findWinningMove(board, 'X');
    if (canWin !== null) return { message: "You have a winning move! Look closely.", type: 'hint', category: 'missed win' };

    const mustBlock = this.findWinningMove(board, 'O');
    if (mustBlock !== null) return { message: "The Robot is threatening to win. You must block it!", type: 'hint', category: 'threat blindness' };

    return { message: "Look for opportunities to create a 'fork' - two ways to win at once!", type: 'hint' };
  }

  private static getTicTacToePostGame(state: GameState): CoachingInsight {
      if (state.winner === 'X') return { message: "Strategic victory! You identified the winning path and executed perfectly.", type: 'analysis' };
      if (state.winner === 'draw') return { message: "Perfect play from both sides. When neither side blunders, Tic Tac Toe always ends in a draw.", type: 'analysis' };

      // Analyze for a blunder if user lost
      const moves = state.moves; // Array of {player, index}
      const board = Array(9).fill(null);

      for (let i = 0; i < moves.length; i++) {
          const move = moves[i];
          if (move.player === 'X') {
              const mustBlock = this.findWinningMove(board, 'O');
              if (mustBlock !== null && move.index !== mustBlock) {
                  return {
                      message: `A critical moment at move ${i}! You missed a chance to block the Robot's winning line. Try rewatching this moment.`,
                      type: 'analysis',
                      category: 'threat blindness',
                      turningPointIndex: i
                  };
              }
              const canWin = this.findWinningMove(board, 'X');
              if (canWin !== null && move.index !== canWin) {
                return {
                    message: `You had a victory in sight at move ${i} but took a different path. Identifying winning lines is key to mastery.`,
                    type: 'analysis',
                    category: 'missed win',
                    turningPointIndex: i
                };
              }
          }
          board[move.index] = move.player;
      }

      return { message: "The Robot outmaneuvered you this time. Let's try again and watch for double-threats!", type: 'analysis' };
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
