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

// Canonical winner values used across all games
// Chess:    "w" | "b" | "draw"
// Others:   "Player" | "Robot" | "draw"
const isPlayerWin = (w?: string) => w === "Player" || w === "w" || w === "X" || w === "1";
const isRobotWin  = (w?: string) => w === "Robot"  || w === "b" || w === "O" || w === "2";

export class CoachingService {
  static getInsight(gameType: GameType, state: GameState): CoachingInsight {
    const finished =
      state.status === "finished" ||
      state.status === "checkmate" ||
      state.status === "draw" ||
      state.status === "stalemate";

    if (finished) {
      if (gameType === "tictactoe") return this.getTicTacToePostGame(state);
      if (gameType === "chess" && state.data.analysis) return this.getChessPostGame(state);
      if (gameType === "checkers") return this.getCheckersPostGame(state);
      if (gameType === "morris")   return this.getMorrisPostGame(state);
      if (gameType === "fourinarow") return this.getFourInARowPostGame(state);

      return {
        message:
          state.status === "draw" || state.status === "stalemate"
            ? "Game over. You held the bot to a draw."
            : isPlayerWin(state.winner)
              ? "Game over. Great finish."
              : "Game over. Let's review the key moment.",
        type: "analysis",
      };
    }

    switch (gameType) {
      case "chess":    return this.getChessInsight(state);
      case "tictactoe":return this.getTicTacToeInsight(state);
      case "checkers": return this.getCheckersInsight(state);
      case "morris":   return this.getMorrisInsight(state);
      case "fourinarow": return this.getFourInARowInsight(state);
      default:
        return { message: "Think carefully about your next move.", type: "hint" };
    }
  }

  // ─── CHESS ──────────────────────────────────────────────────────────────────

  private static getChessInsight(state: GameState): CoachingInsight {
    const fen = state.data?.fen || state.fen;
    const game = fen ? new Chess(fen) : new Chess();
    const moveCount = state.moves.length;
    const board = game.board().flat().filter(Boolean);
    const minorPieces = board.filter((p) => p && ["n", "b"].includes(p.type)).length;
    const castled = !fen?.includes("KQkq") && !fen?.includes("KQ") && !fen?.includes("kq");

    if (moveCount === 0) return { message: "Fast start: claim the centre, develop a knight or bishop, and castle early.", type: "hint" };
    if (game.isCheck()) {
      return state.turn === "w"
        ? { message: "Your king is in check. Deal with the threat first, then rebuild your position.", type: "feedback" }
        : { message: "Nice pressure. The bot must answer your check — find the strong follow-up.", type: "hint" };
    }
    if (moveCount < 8) return { message: castled ? "You're out of the opening. Finish development before attacking." : "Opening rule: don't move the same piece twice unless you win something.", type: "hint" };
    if (minorPieces >= 6) return { message: "The board is crowded. Improve your worst-placed piece before forcing tactics.", type: "hint" };
    if (board.length <= 10) return { message: "Endgame mindset: activate your king, push passed pawns, trade only if it helps.", type: "hint" };
    return { message: "Middlegame plan: scan for loose pieces, open lines for your rooks, watch both kings.", type: "hint" };
  }

  private static getChessPostGame(state: GameState): CoachingInsight {
    const analysis = state.data.analysis;
    if (!analysis) return { message: "Game review complete.", type: "analysis" };

    const isHumanMistake = analysis.criticalMoveNumber % 2 === 1;
    const moveNumber = Math.ceil(analysis.criticalMoveNumber / 2);
    const evalSwing = Math.abs((analysis.evalAfter ?? 0) - (analysis.evalBefore ?? 0)).toFixed(1);
    const reasons: Record<string, string> = {
      hanging:    "This move left material loose. Ask which piece becomes undefended before committing.",
      captures:   "There was a direct way to win material. Always scan checks, captures, and threats first.",
      forks:      "A fork was available. Knight and queen forks are common when pieces share colour squares.",
      pins:       "A line move would have frozen a defender. Pins are strongest targeting king or heavy piece.",
      checkmates: "The position demanded forcing play. Start candidate moves with checks first.",
    };

    if (!isHumanMistake) {
      return { message: `The bot's strongest phase came around move ${moveNumber}. Review how it improved piece activity and kept the initiative.`, explanation: `The evaluation swung about ${evalSwing} points around that moment.`, type: "analysis", turningPointIndex: analysis.criticalMoveNumber };
    }
    return { message: `Critical moment: move ${moveNumber}. You played ${analysis.playedMove}, but ${analysis.bestMove} was stronger.`, explanation: `${reasons[analysis.theme] || "That move weakened your position."} Engine swing: ~${evalSwing} pts.`, type: "analysis", turningPointIndex: analysis.criticalMoveNumber, category: analysis.theme as CoachingInsight["category"] };
  }

  // ─── CHECKERS ───────────────────────────────────────────────────────────────

  private static getCheckersInsight(state: GameState): CoachingInsight {
    const board = state.data.board as number[];
    const playerPieces = board.filter((c) => c === 1 || c === 11).length;
    const botPieces    = board.filter((c) => c === 2 || c === 22).length;
    const playerKings  = board.filter((c) => c === 11).length;

    if (playerPieces <= 3) return { message: "You're down to 3 pieces — use flying to escape traps and find winning angles.", type: "hint" };
    if (botPieces <= 3)    return { message: "The bot is almost out — push your advantage. Restrict its movement.", type: "hint" };
    if (playerPieces > botPieces + 2) return { message: "You're ahead on pieces. Look for chain captures to extend your lead.", type: "hint" };
    if (botPieces > playerPieces + 2) return { message: "You're behind. Focus on making kings — they can move backwards and dominate.", type: "hint" };
    if (playerKings > 0) return { message: `You have ${playerKings === 1 ? "a king" : `${playerKings} kings`}! Kings control both diagonals — use them to cut off the bot.`, type: "hint" };
    return { message: "Control the centre squares. Look for forced capture chains before making quiet moves.", type: "hint" };
  }

  private static getCheckersPostGame(state: GameState): CoachingInsight {
    if (isPlayerWin(state.winner)) return { message: "Strong captures! In checkers, chain jumps and king threats decide games.", type: "analysis" };
    if (state.status === "draw")   return { message: "A hard-fought draw. Control the long diagonal next time to break the balance.", type: "analysis" };
    return { message: "Look for forced capture chains. If a jump is available it is usually the move you must calculate first.", type: "analysis" };
  }

  // ─── MORABARABA / MORRIS ────────────────────────────────────────────────────

  private static getMorrisInsight(state: GameState): CoachingInsight {
    const board       = state.data.board as (string | null)[];
    const stage       = state.data.stage as "placement" | "moving";
    const piecesPlaced = state.data.piecesPlaced as Record<string, number>;
    const piecesOnBoard= state.data.piecesOnBoard as Record<string, number>;

    const playerOnBoard = piecesOnBoard["1"] ?? 0;
    const botOnBoard    = piecesOnBoard["2"] ?? 0;
    const playerPlaced  = piecesPlaced["1"]  ?? 0;

    if (stage === "placement") {
      const remaining = 9 - playerPlaced;
      if (remaining >= 7) return { message: "Placement: aim for the corners and cross-points — they belong to the most mills.", type: "hint" };
      if (remaining >= 4) return { message: "Build two potential mills that share a point. That forces the bot to defend two threats at once.", type: "hint" };
      return { message: `${remaining} ${remaining === 1 ? "piece" : "pieces"} left to place. Look for your third point in a nearly complete mill.`, type: "hint" };
    }

    if (playerOnBoard === 3) return { message: "You're in flying phase — you can jump to any empty point. Use it to threaten two mills at once.", type: "hint" };
    if (botOnBoard === 3)    return { message: "The bot is flying. Block open points adjacent to its two-piece lines.", type: "hint" };
    if (playerOnBoard > botOnBoard + 1) return { message: "You're ahead on pieces. Close down the bot's space and look for the final capture.", type: "hint" };
    if (botOnBoard > playerOnBoard + 1) return { message: "You're behind. Aim for a mill to capture back, or force a draw by blocking.", type: "hint" };
    return { message: "Moving phase: slide pieces along the lines to form mills. A mill lets you remove an enemy piece.", type: "hint" };
  }

  private static getMorrisPostGame(state: GameState): CoachingInsight {
    if (isPlayerWin(state.winner)) return { message: "You controlled the board well. Build mills and leave the opponent with no good move.", type: "analysis" };
    if (state.status === "draw")   return { message: "A balanced finish. In Morabaraba, draws happen when neither player can force a capture.", type: "analysis" };
    return { message: "Watch the connected lines. Once placement ends, every move follows a line unless you're down to three pieces and can fly.", type: "analysis" };
  }

  // ─── TIC TAC TOE ────────────────────────────────────────────────────────────

  private static getTicTacToeInsight(state: GameState): CoachingInsight {
    const { board } = state.data;
    if (!board[4]) return { message: "The centre is the heart of the board. Strategic players aim for it early!", type: "hint", highlightSquares: [4] };
    const canWin = this.findWinningMove(board, "X");
    if (canWin !== null) return { message: "Victory is just one move away. Can you spot the winning line?", type: "hint", category: "missed win", highlightSquares: [canWin] };
    const mustBlock = this.findWinningMove(board, "O");
    if (mustBlock !== null) return { message: "Watch out! The Robot is about to complete a line. Defence is your priority.", type: "hint", category: "threat blindness", highlightSquares: [mustBlock] };
    return { message: "Look for 'fork' opportunities — moves that create two winning threats at once!", type: "hint" };
  }

  private static getTicTacToePostGame(state: GameState): CoachingInsight {
    if (isPlayerWin(state.winner))  return { message: "Strategic victory! You navigated the board with precision and seized the win.", type: "analysis" };
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
    return { message: "The Robot outplayed you by creating simultaneous threats. Study 'fork' patterns to improve!", type: "analysis" };
  }

  // ─── FOUR IN A ROW ──────────────────────────────────────────────────────────

  private static getFourInARowInsight(state: GameState): CoachingInsight {
    const board = (state.data?.board as (string | null)[]) ?? [];
    const centerColumn = [3, 10, 17, 24, 31, 38];
    const centerControl = centerColumn.filter((index) => board[index] === "1").length;

    if (state.moves.length < 2) {
      return {
        message: "Start in the middle. The center column creates the most four-in-a-row chances.",
        type: "hint",
      };
    }

    if (centerControl === 0) {
      return {
        message: "You have no center control yet. Fight for the middle before chasing edge tactics.",
        type: "hint",
      };
    }

    return {
      message: "Look for double threats. The best move often wins two ways at once on your next turn.",
      type: "hint",
    };
  }

  private static getFourInARowPostGame(state: GameState): CoachingInsight {
    if (isPlayerWin(state.winner)) {
      return {
        message: "Strong conversion. Four in a Row rewards early center control and patient setup.",
        type: "analysis",
      };
    }

    if (state.winner === "draw") {
      return {
        message: "Balanced board. When every column matters, keep the center and force the last useful move.",
        type: "analysis",
      };
    }

    return {
      message: "The bot probably created a fork. Watch for columns that threaten two winning lines at once.",
      type: "analysis",
    };
  }

  private static findWinningMove(board: (string | null)[], player: string): number | null {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const line of lines) {
      const vals = line.map((i) => board[i]);
      if (vals.filter((v) => v === player).length === 2 && vals.filter((v) => v === null).length === 1) {
        return line[vals.indexOf(null)];
      }
    }
    return null;
  }
}
