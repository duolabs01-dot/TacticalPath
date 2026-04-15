/**
 * Stockfish WASM integration for TacticalPath
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
        this.worker = new Worker(new URL('stockfish.js', import.meta.url), {
          type: 'classic',
        });

        this.worker.onmessage = (e: MessageEvent) => {
          const msg = typeof e.data === 'string' ? e.data : String(e.data);

          for (let i = 0; i < this.messageQueue.length; i++) {
            if (this.messageQueue[i].pattern.test(msg)) {
              this.messageQueue[i].resolve(msg);
              this.messageQueue.splice(i, 1);
              break;
            }
          }

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
   * Enhanced bot move generation with Personality Parameters
   */
  async getBotMove(
      fen: string,
      options: { skillLevel?: number; contempt?: number; depth?: number } = {}
  ): Promise<string> {
    if (!this.ready) await this.init();

    const skillLevel = options.skillLevel ?? 5;
    const contempt = options.contempt ?? 0;
    const depth = options.depth ?? Math.min(1 + Math.floor(skillLevel / 2), 10);

    this.send('ucinewgame');

    // Apply UCI options for personality
    this.send(`setoption name Skill Level value ${skillLevel}`);
    this.send(`setoption name Contempt value ${contempt}`);

    this.send(`position fen ${fen}`);
    this.send(`go depth ${depth} movetime ${400 + skillLevel * 150}`);

    const bestMoveMsg = await this.waitFor(/^bestmove/);
    return bestMoveMsg.split(' ')[1];
  }

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

    for (let i = 0; i < moves.length; i++) {
      const fenBefore = game.fen();
      const turn = game.turn();

      const analysis = await this.evaluate(fenBefore, depth);
      game.move(moves[i]);
      const fenAfterMove = game.fen();
      const afterAnalysis = await this.evaluate(fenAfterMove, depth);

      const multiplier = turn === 'w' ? 1 : -1;
      const swing = (analysis.evaluation * multiplier) - (afterAnalysis.evaluation * multiplier);

      if (swing > biggestSwing) {
        biggestSwing = swing;
        criticalIndex = i;
        criticalFen = fenBefore;
        criticalPlayedMove = moves[i];
        criticalBestMove = analysis.bestMove;
        evalBefore = analysis.evaluation;
        evalAfter = afterAnalysis.evaluation;
      }
    }

    const theme = classifyMistakeTheme(criticalFen, criticalPlayedMove, criticalBestMove);

    return {
      criticalMoveNumber: criticalIndex + 1,
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

function classifyMistakeTheme(
  fen: string,
  playedMove: string,
  bestMove: string
): string {
  const themes = ['hanging', 'captures', 'forks', 'pins', 'checkmates'];
  const weights = [0.35, 0.25, 0.2, 0.12, 0.08];
  const rand = Math.random();
  let cumulative = 0;
  for (let i = 0; i < themes.length; i++) {
    cumulative += weights[i];
    if (rand <= cumulative) return themes[i];
  }
  return 'hanging';
}

let engineInstance: StockfishEngine | null = null;

export function getStockfish(): StockfishEngine {
  if (!engineInstance) {
    engineInstance = new StockfishEngine();
  }
  return engineInstance;
}

export { StockfishEngine };
