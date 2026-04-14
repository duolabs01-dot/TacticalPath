import { GameType, GameState } from "../context/GameContext";

export interface CoachingInsight {
  message: string;
  type: 'hint' | 'feedback' | 'analysis';
}

export class CoachingService {
  static getInsight(gameType: GameType, state: GameState): CoachingInsight {
    switch (gameType) {
      case 'chess':
        return { message: "Look for forks and pins in this position.", type: 'hint' };
      case 'tictactoe':
        return this.getTicTacToeInsight(state);
      case 'checkers':
        return { message: "Try to keep your back row intact for as long as possible.", type: 'hint' };
      case 'morris':
        return { message: "Getting a mill early is key to controlling the game.", type: 'hint' };
      case 'solitaire':
        return { message: "Prioritize exposing face-down cards.", type: 'hint' };
      default:
        return { message: "Think carefully about your next move.", type: 'hint' };
    }
  }

  private static getTicTacToeInsight(state: GameState): CoachingInsight {
    const { board } = state.data;
    if (state.status === 'finished') {
       return { message: "Game over. Review the winning line!", type: 'analysis' };
    }
    return { message: "Control the center if it's available!", type: 'hint' };
  }
}
