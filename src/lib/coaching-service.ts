import { GameType, GameState } from "../context/GameContext";

export interface CoachingInsight {
  message: string;
  type: 'hint' | 'feedback' | 'analysis';
  category?: 'missed win' | 'failed defense' | 'rushed move' | 'bad trade' | 'missed block' | 'poor setup' | 'threat blindness';
  turningPointIndex?: number;
  highlightSquares?: number[];
  evalScore?: number;
  explanation?: string;
}

export class CoachingService {
  static getInsight(gameType: GameType, state: GameState): CoachingInsight {
    if (state.status === 'finished' || state.status === 'checkmate' || state.status === 'draw' || state.status === 'stalemate') {
       if (gameType === 'tictactoe') return this.getTicTacToePostGame(state);
       if (gameType === 'chess' && state.data.analysis) return this.getChessPostGame(state);

       return {
           message: `Game over! ${state.winner === 'draw' || state.status === 'draw' || state.status === 'stalemate' ? "It was a hard-fought draw." : (state.winner === 'w' || state.winner === 'X' || state.winner === '1' ? "Great win! You played strategically." : "The Robot won this time. Let's analyze why.")}`,
           type: 'analysis'
       };
    }

    switch (gameType) {
      case 'chess': return this.getChessInsight(state);
      case 'tictactoe': return this.getTicTacToeInsight(state);
      case 'checkers': return { message: "Try to control the center squares and look for double-jumps.", type: 'hint' };
      case 'morris': return { message: "Build mills (three in a row) to capture pieces and block your opponent.", type: 'hint' };
      default: return { message: "Think carefully about your next move.", type: 'hint' };
    }
  }

  private static getChessInsight(state: GameState): CoachingInsight {
      const movesCount = state.moves.length;
      if (movesCount === 0) return { message: "Good luck! Control the center and develop your pieces.", type: 'hint' };

      const lastMove = state.moves[movesCount - 1];
      const isCheck = typeof lastMove === 'string' ? lastMove.includes('+') : lastMove?.san?.includes('+');
      if (isCheck) return { message: "Check! You've got the opponent on the run. Look for follow-up attacks.", type: 'hint' };

      if (movesCount < 10) return { message: "Opening phase: Focus on king safety and developing your pieces.", type: 'hint' };
      return { message: "Middle game: Look for tactical opportunities and coordinate your attack.", type: 'hint' };
  }

  private static getChessPostGame(state: GameState): CoachingInsight {
      const analysis = state.data.analysis;
      if (!analysis) return { message: "Game review complete.", type: 'analysis' };

      const isHumanMistake = analysis.criticalMoveNumber % 2 === 1; // Assuming human is White
      const moveNum = Math.floor(analysis.criticalMoveNumber / 2) + 1;

      const reasons: Record<string, string> = {
          hanging: "You left a valuable piece unprotected, allowing the Robot to capture it for free.",
          captures: "There was a chance to win material by capturing an undefended piece, but it was missed.",
          forks: "The Robot used one piece to attack two of yours at once. These 'double attacks' are very powerful.",
          pins: "One of your pieces was 'pinned' to your King, meaning it couldn't move without putting you in check.",
          checkmates: "A direct path to checkmate was available! Spotting these finishing blows is key to victory."
      };

      return {
          message: isHumanMistake
            ? `Critical Moment at move ${moveNum}. You played ${analysis.playedMove}, but the engine preferred ${analysis.bestMove}.`
            : "The Robot played a nearly perfect game. Let's look at how it controlled the center.",
          explanation: isHumanMistake ? reasons[analysis.theme] || "This move weakened your position significantly." : undefined,
          type: 'analysis',
          turningPointIndex: analysis.criticalMoveNumber,
          category: analysis.theme as any
      };
  }

  private static getTicTacToeInsight(state: GameState): CoachingInsight {
    const { board } = state.data;
    if (!board[4]) return { message: "The center is the heart of the board. Strategic players aim for it early!", type: 'hint', highlightSquares: [4] };
    const canWin = this.findWinningMove(board, 'X');
    if (canWin !== null) return { message: "Victory is just one move away. Can you spot the winning line?", type: 'hint', category: 'missed win', highlightSquares: [canWin] };
    const mustBlock = this.findWinningMove(board, 'O');
    if (mustBlock !== null) return { message: "Watch out! The Robot is about to complete a line. Defense is your priority.", type: 'hint', category: 'threat blindness', highlightSquares: [mustBlock] };
    return { message: "Look for 'fork' opportunities - moves that create two winning threats at the same time!", type: 'hint' };
  }

  private static getTicTacToePostGame(state: GameState): CoachingInsight {
      if (state.winner === 'X') return { message: "Strategic victory! You navigated the board with precision and seized the win.", type: 'analysis' };
      if (state.winner === 'draw') return { message: "Perfect play. When both sides maintain awareness, Tic Tac Toe finds its natural balance in a draw.", type: 'analysis' };
      const moves = state.moves;
      const board = Array(9).fill(null);
      for (let i = 0; i < moves.length; i++) {
          const move = moves[i];
          if (move.player === 'X') {
              const mustBlock = this.findWinningMove(board, 'O');
              if (mustBlock !== null && move.index !== mustBlock) return { message: `Move ${i} was the turning point. You had to block the Robot at square ${mustBlock + 1}.`, type: 'analysis', category: 'threat blindness', turningPointIndex: i, highlightSquares: [mustBlock] };
              const canWin = this.findWinningMove(board, 'X');
              if (canWin !== null && move.index !== canWin) return { message: `You missed a winning opportunity at move ${i}. Square ${canWin + 1} would have finished the game.`, type: 'analysis', category: 'missed win', turningPointIndex: i, highlightSquares: [canWin] };
          }
          board[move.index] = move.player;
      }
      return { message: "The Robot outplayed you by creating simultaneous threats. Study the patterns of 'forks' to improve!", type: 'analysis' };
  }

  private static findWinningMove(board: (string|null)[], player: string): number | null {
      const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
      for (let line of lines) {
          const vals = line.map(i => board[i]);
          if (vals.filter(v => v === player).length === 2 && vals.filter(v => v === null).length === 1) return line[vals.indexOf(null)];
      }
      return null;
  }
}
