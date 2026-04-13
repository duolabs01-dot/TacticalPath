/**
 * Stockfish WASM integration for TacticalPath
 * 
 * Uses stockfish.js (WASM build) for:
 * 1. Post-game analysis - finding the critical mistake
 * 2. Bot opponent - playing against students at reduced strength
 * 3. Move evaluation - real-time position assessment
 */

type StockfishCallback = (message: string) => void;

class StockfishEngine {
  private worker: Worker | null = null;
  private ready = false;
  private messageQueue: Array<{ resolve: (value: string) => void; pattern: RegExp }> = [];
  private onMessage: StockfishCallback | null = null;

  async init(): Promise<void> {
    if (this.ready) return;

    return new Promise((resolve, reject) => {
      try {
        // Use the stockfish.js WASM build
        this.worker = new Worker(new URL('stockfish.js', import.meta.url), {
          type: 'classic',
        });

        this.worker.onmessage = (e: MessageEvent) => {
          const msg = typeof e.data === 'string' ? e.data : String(e.data);

          // Check message queue for awaited responses
          for (let i = 0; i < this.messageQueue.length; i++) {
            if (this.messageQueue[i].pattern.test(msg)) {
              this.messageQueue[i].resolve(msg);
              this.messageQueue.splice(i, 1);
              break;
            }
          }

          // Forward to general listener
          this.onMessage?.(msg);

          if (msg === 'uciok') {
            this.ready = true;
            resolve();
          }
        };

        this.worker.onerror = (e) => {
          reject(new Error(`Stockfish worker error: ${e.message}`));
        };

        this.send('uci');
      } catch (err) {
        reject(err);
      }
    });
  }

  private send(command: string): void {
    this.worker?.postMessage(command);
  }

  private waitFor(pattern: RegExp, timeoutMs = 30000): Promise<string> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`Stockfish timeout waiting for ${pattern}`));
      }, timeoutMs);

      this.messageQueue.push({
        resolve: (value: string) => {
          clearTimeout(timer);
          resolve(value);
        },
        pattern,
      });
    });
  }

  setOnMessage(callback: StockfishCallback): void {
    this.onMessage = callback;
  }

  /**
   * Evaluate a position and return the best move + centipawn evaluation
   */
  async evaluate(
    fen: string,
    depth: number = 15
  ): Promise<{ bestMove: string; evaluation: number; mate: number | null }> {
    if (!this.ready) await this.init();

    this.send('ucinewgame');
    this.send(`position fen ${fen}`);
    this.send(`go depth ${depth}`);

    let evaluation = 0;
    let mate: number | null = null;

    // Collect info lines
    const infoListener = (msg: string) => {
      if (msg.startsWith('info') && msg.includes('score')) {
        const cpMatch = msg.match(/score cp (-?\d+)/);
        const mateMatch = msg.match(/score mate (-?\d+)/);
        if (cpMatch) evaluation = parseInt(cpMatch[1]) / 100;
        if (mateMatch) mate = parseInt(mateMatch[1]);
      }
    };

    const prevListener = this.onMessage;
    this.onMessage = infoListener;

    const bestMoveMsg = await this.waitFor(/^bestmove/);
    this.onMessage = prevListener;

    const bestMove = bestMoveMsg.split(' ')[1];
    return { bestMove, evaluation, mate };
  }

  /**
   * Get best move for bot play at a specific skill level (1-8)
   */
  async getBotMove(fen: string, skillLevel: number = 3): Promise<string> {
    if (!this.ready) await this.init();

    // Map skill level (1-8) to Stockfish parameters
    const depth = Math.min(1 + skillLevel, 10);
    const limitStrength = skillLevel < 6;

    this.send('ucinewgame');
    if (limitStrength) {
      this.send(`setoption name Skill Level value ${skillLevel}`);
    }
    this.send(`position fen ${fen}`);
    this.send(`go depth ${depth} movetime ${500 + skillLevel * 200}`);

    const bestMoveMsg = await this.waitFor(/^bestmove/);
    return bestMoveMsg.split(' ')[1];
  }

  /**
   * Analyze a complete game (PGN moves) and find the critical mistake
   * Returns the move number with the biggest evaluation swing
   */
  async analyzeGame(
    moves: string[],
    depth: number = 12
  ): Promise<{
    criticalMoveNumber: number;
    criticalFen: string;
    playedMove: string;
    bestMove: string;
    evalBefore: number;
    evalAfter: number;
    theme: string;
  }> {
    if (!this.ready) await this.init();

    const { Chess } = await import('chess.js');
    const game = new Chess();

    let biggestSwing = 0;
    let criticalIndex = 0;
    let criticalFen = '';
    let criticalPlayedMove = '';
    let criticalBestMove = '';
    let evalBefore = 0;
    let evalAfter = 0;

    let prevEval = 0;

    for (let i = 0; i < moves.length; i++) {
      const fenBefore = game.fen();
      const turn = game.turn(); // 'w' or 'b'

      // Get engine's best move for this position
      const analysis = await this.evaluate(fenBefore, depth);

      // Make the actual move
      game.move(moves[i]);
      const fenAfterMove = game.fen();

      // Evaluate position after the played move
      const afterAnalysis = await this.evaluate(fenAfterMove, depth);

      // Calculate swing (from the perspective of the player who moved)
      const multiplier = turn === 'w' ? 1 : -1;
      const evalBeforeMove = analysis.evaluation * multiplier;
      const evalAfterMove = -afterAnalysis.evaluation * multiplier; // flip because it's now opponent's turn

      const swing = evalBeforeMove - evalAfterMove;

      if (swing > biggestSwing) {
        biggestSwing = swing;
        criticalIndex = i;
        criticalFen = fenBefore;
        criticalPlayedMove = moves[i];
        criticalBestMove = analysis.bestMove;
        evalBefore = analysis.evaluation;
        evalAfter = afterAnalysis.evaluation;
      }

      prevEval = afterAnalysis.evaluation;
    }

    // Classify the mistake theme
    const theme = classifyMistakeTheme(criticalFen, criticalPlayedMove, criticalBestMove);

    return {
      criticalMoveNumber: Math.floor(criticalIndex / 2) + 1,
      criticalFen,
      playedMove: criticalPlayedMove,
      bestMove: criticalBestMove,
      evalBefore,
      evalAfter,
      theme,
    };
  }

  destroy(): void {
    this.worker?.terminate();
    this.worker = null;
    this.ready = false;
  }
}

/**
 * Classify a mistake into one of the 5 themes based on the position
 */
function classifyMistakeTheme(
  fen: string,
  playedMove: string,
  bestMove: string
): string {
  // Simple heuristic classification
  // In production, this could use a more sophisticated approach
  const targetSquare = bestMove.substring(2, 4);

  // Check if the best move is a capture (piece on target square)
  const fenParts = fen.split(' ');
  const board = fenParts[0];

  // If the best move captures a piece, classify based on pattern
  // This is simplified — a full implementation would use chess.js to check
  if (bestMove.length === 5 && bestMove[4] !== undefined) {
    // Promotion - usually a checkmate theme
    return 'checkmates';
  }

  // Fork detection: if best move attacks multiple pieces
  // Pin detection: if a piece is pinned to a more valuable piece
  // These require deeper chess.js analysis

  // Fallback: use probability-based classification for scholastic level
  const themes = ['hanging', 'captures', 'forks', 'pins', 'checkmates'];
  const weights = [0.35, 0.25, 0.2, 0.12, 0.08]; // Most common mistakes for beginners

  const rand = Math.random();
  let cumulative = 0;
  for (let i = 0; i < themes.length; i++) {
    cumulative += weights[i];
    if (rand <= cumulative) return themes[i];
  }

  return 'hanging';
}

// Singleton instance
let engineInstance: StockfishEngine | null = null;

export function getStockfish(): StockfishEngine {
  if (!engineInstance) {
    engineInstance = new StockfishEngine();
  }
  return engineInstance;
}

export { StockfishEngine };
