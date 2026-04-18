import { Chess } from "chess.js";
import { GameType, GameState } from "../context/GameContext";

export interface CoachingInsight {
  message: string;
  type: "hint" | "feedback" | "analysis";
  category?: "missed win" | "failed defense" | "rushed move" | "bad trade" | "missed block" | "poor setup" | "threat blindness";
  turningPointIndex?: number;
  highlightSquares?: number[];
  evalScore?: number;
  explanation?: string;
}

export class CoachingService {
  static getInsight(gameType: GameType, state: GameState): CoachingInsight {
    if (state.status === "finished" || state.status === "checkmate" || state.status === "draw" || state.status === "stalemate") {
      if (gameType === "tictactoe") return this.getTicTacToePostGame(state);
      if (gameType === "chess" && state.data.analysis) return this.getChessPostGame(state);

      return {
        message:
          state.winner === "draw" || state.status === "draw" || state.status === "stalemate"
            ? "Game over. You held the bot to a draw."
            : state.winner === "w" || state.winner === "X" || state.winner === "1"
              ? "Game over. Great finish."
              : "Game over. Let’s review the key moment.",
        type: "analysis",
      };
    }

    switch (gameType) {
      case "chess":
        return this.getChessInsight(state);
      case "tictactoe":
        return this.getTicTacToeInsight(state);
      case "checkers":
        return { message: "Try to control the center squares and look for double-jumps.", type: "hint" };
      case "morris":
        return { message: "Build mills (three in a row) to capture pieces and block your opponent.", type: "hint" };
      default:
        return { message: "Think carefully about your next move.", type: "hint" };
    }
  }

  private static getChessInsight(state: GameState): CoachingInsight {
    const fen = state.data?.fen || state.fen;
    const game = fen ? new Chess(fen) : new Chess();
    const moveCount = state.moves.length;
    const board = game.board().flat().filter(Boolean);
    const minorPieces = board.filter((piece) => piece && ["n", "b"].includes(piece.type)).length;
    const castled = !fen?.includes("KQkq") && !fen?.includes("KQ") && !fen?.includes("kq");

    if (moveCount === 0) {
      return {
        message: "Fast start: claim the center, develop a knight or bishop, and castle early.",
        type: "hint",
      };
    }

    if (game.isCheck()) {
      return state.turn === "w"
        ? {
            message: "Your king is in check. Deal with the threat first, then rebuild your position.",
            type: "feedback",
          }
        : {
            message: "Nice pressure. The bot has to answer your check, so look for a strong follow-up.",
            type: "hint",
          };
    }

    if (moveCount < 8) {
      return {
        message: castled
          ? "You’re out of the opening. Finish development before launching an attack."
          : "Opening rule: don’t move the same piece twice unless you win something concrete.",
        type: "hint",
      };
    }

    if (minorPieces >= 6) {
      return {
        message: "The board is still crowded. Improve your worst-placed piece before forcing tactics.",
        type: "hint",
      };
    }

    if (board.length <= 10) {
      return {
        message: "Endgame mindset: activate your king, push passed pawns, and trade only if it helps you.",
        type: "hint",
      };
    }

    return {
      message: "Middlegame plan: scan for loose pieces, open lines for your rooks, and watch both kings.",
      type: "hint",
    };
  }

  private static getChessPostGame(state: GameState): CoachingInsight {
    const analysis = state.data.analysis;
    if (!analysis) {
      return { message: "Game review complete.", type: "analysis" };
    }

    const isHumanMistake = analysis.criticalMoveNumber % 2 === 1;
    const moveNumber = Math.ceil(analysis.criticalMoveNumber / 2);
    const evalSwing = Math.abs((analysis.evalAfter ?? 0) - (analysis.evalBefore ?? 0)).toFixed(1);

    const reasons: Record<string, string> = {
      hanging: "This move left material loose. Before you move, ask which piece becomes undefended.",
      captures: "There was a direct way to win material. Always scan checks, captures, and threats before committing.",
      forks: "A tactical jump was available. Knight and queen forks are common when pieces sit on the same color complex.",
      pins: "A line move would have frozen a defender. Pins are strongest when they target the king or a heavy piece behind it.",
      checkmates: "The position demanded forcing play. In winning attacks, candidate moves should start with checks first.",
    };

    if (!isHumanMistake) {
      return {
        message: `The bot’s best phase came around move ${moveNumber}. Review how it improved piece activity and kept the initiative.`,
        explanation: `The evaluation swung by about ${evalSwing} points around that moment.`,
        type: "analysis",
        turningPointIndex: analysis.criticalMoveNumber,
      };
    }

    return {
      message: `Critical moment: move ${moveNumber}. You played ${analysis.playedMove}, but ${analysis.bestMove} was the stronger continuation.`,
      explanation: `${reasons[analysis.theme] || "That move weakened your position."} The engine swing was about ${evalSwing} points.`,
      type: "analysis",
      turningPointIndex: analysis.criticalMoveNumber,
      category: analysis.theme as CoachingInsight["category"],
    };
  }

  private static getTicTacToeInsight(state: GameState): CoachingInsight {
    const { board } = state.data;
    if (!board[4]) return { message: "The center is the heart of the board. Strategic players aim for it early!", type: "hint", highlightSquares: [4] };
    const canWin = this.findWinningMove(board, "X");
    if (canWin !== null) return { message: "Victory is just one move away. Can you spot the winning line?", type: "hint", category: "missed win", highlightSquares: [canWin] };
    const mustBlock = this.findWinningMove(board, "O");
    if (mustBlock !== null) return { message: "Watch out! The Robot is about to complete a line. Defense is your priority.", type: "hint", category: "threat blindness", highlightSquares: [mustBlock] };
    return { message: "Look for 'fork' opportunities - moves that create two winning threats at the same time!", type: "hint" };
  }

  private static getTicTacToePostGame(state: GameState): CoachingInsight {
    if (state.winner === "X") return { message: "Strategic victory! You navigated the board with precision and seized the win.", type: "analysis" };
    if (state.winner === "draw") return { message: "Perfect play. When both sides maintain awareness, Tic Tac Toe finds its natural balance in a draw.", type: "analysis" };
    const moves = state.moves;
    const board = Array(9).fill(null);
    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      if (move.player === "X") {
        const mustBlock = this.findWinningMove(board, "O");
        if (mustBlock !== null && move.index !== mustBlock) return { message: `Move ${i} was the turning point. You had to block the Robot at square ${mustBlock + 1}.`, type: "analysis", category: "threat blindness", turningPointIndex: i, highlightSquares: [mustBlock] };
        const canWin = this.findWinningMove(board, "X");
        if (canWin !== null && move.index !== canWin) return { message: `You missed a winning opportunity at move ${i}. Square ${canWin + 1} would have finished the game.`, type: "analysis", category: "missed win", turningPointIndex: i, highlightSquares: [canWin] };
      }
      board[move.index] = move.player;
    }
    return { message: "The Robot outplayed you by creating simultaneous threats. Study the patterns of 'forks' to improve!", type: "analysis" };
  }

  private static findWinningMove(board: (string | null)[], player: string): number | null {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (const line of lines) {
      const vals = line.map((i) => board[i]);
      if (vals.filter((v) => v === player).length === 2 && vals.filter((v) => v === null).length === 1) {
        return line[vals.indexOf(null)];
      }
    }
    return null;
  }
}
