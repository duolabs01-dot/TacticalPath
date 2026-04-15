/**
 * Stockfish WASM integration for TacticalPath
 */

type StockfishCallback = (message: string) => void;

interface BotMoveOptions {
  skillLevel?: number;
  contempt?: number;
  depth?: number;
}

interface AnalysisSummary {
  criticalMoveNumber: number;
  criticalFen: string;
  playedMove: string;
  bestMove: string;
  evalBefore: number;
  evalAfter: number;
  theme: string;
}

class StockfishEngine {
  private worker: Worker | null = null;
  private ready = false;
  private messageQueue: Array<{ resolve: (value: string) => void; pattern: RegExp }> = [];
  private onMessage: StockfishCallback | null = null;
  private taskQueue: Promise<void> = Promise.resolve();

  private enqueue<T>(task: () => Promise<T>): Promise<T> {
    const run = this.taskQueue.then(task, task);
    this.taskQueue = run.then(() => undefined, () => undefined);
    return run;
  }

  async init(): Promise<void> {
    if (this.ready) return;

    return new Promise((resolve, reject) => {
      try {
        this.worker = new Worker(new URL("stockfish.js", import.meta.url), {
          type: "classic",
        });

        this.worker.onmessage = (e: MessageEvent) => {
          const msg = typeof e.data === "string" ? e.data : String(e.data);

          for (let i = 0; i < this.messageQueue.length; i++) {
            if (this.messageQueue[i].pattern.test(msg)) {
              this.messageQueue[i].resolve(msg);
              this.messageQueue.splice(i, 1);
              break;
            }
          }

          this.onMessage?.(msg);

          if (msg === "uciok") {
            this.ready = true;
            resolve();
          }
        };

        this.worker.onerror = (e) => {
          reject(new Error(`Stockfish worker error: ${e.message}`));
        };

        this.send("uci");
      } catch (err) {
        reject(err);
      }
    });
  }

  private async ensureReady(): Promise<void> {
    if (!this.ready) {
      await this.init();
    }
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

  private async performEvaluation(
    fen: string,
    depth: number = 15
  ): Promise<{ bestMove: string; evaluation: number; mate: number | null }> {
    await this.ensureReady();

    this.send("ucinewgame");
    this.send(`position fen ${fen}`);
    this.send(`go depth ${depth}`);

    let evaluation = 0;
    let mate: number | null = null;

    const infoListener = (msg: string) => {
      if (msg.startsWith("info") && msg.includes("score")) {
        const cpMatch = msg.match(/score cp (-?\d+)/);
        const mateMatch = msg.match(/score mate (-?\d+)/);
        if (cpMatch) evaluation = parseInt(cpMatch[1], 10) / 100;
        if (mateMatch) mate = parseInt(mateMatch[1], 10);
      }
    };

    const prevListener = this.onMessage;
    this.onMessage = infoListener;

    const bestMoveMsg = await this.waitFor(/^bestmove/);
    this.onMessage = prevListener;

    const bestMove = bestMoveMsg.split(" ")[1] || "";
    return { bestMove, evaluation, mate };
  }

  async evaluate(
    fen: string,
    depth: number = 15
  ): Promise<{ bestMove: string; evaluation: number; mate: number | null }> {
    return this.enqueue(() => this.performEvaluation(fen, depth));
  }

  async getBotMove(fen: string, options: BotMoveOptions = {}): Promise<string> {
    return this.enqueue(async () => {
      await this.ensureReady();

      const skillLevel = options.skillLevel ?? 5;
      const contempt = options.contempt ?? 0;
      const depth = options.depth ?? Math.min(1 + Math.floor(skillLevel / 2), 10);

      this.send("ucinewgame");
      this.send(`setoption name Skill Level value ${skillLevel}`);
      this.send(`setoption name Contempt value ${contempt}`);
      this.send(`position fen ${fen}`);
      this.send(`go depth ${depth} movetime ${400 + skillLevel * 150}`);

      const bestMoveMsg = await this.waitFor(/^bestmove/);
      return bestMoveMsg.split(" ")[1] || "";
    });
  }

  async analyzeGame(moves: string[], depth: number = 12): Promise<AnalysisSummary> {
    return this.enqueue(async () => {
      await this.ensureReady();

      const { Chess } = await import("chess.js");
      const game = new Chess();

      let biggestSwing = Number.NEGATIVE_INFINITY;
      let criticalIndex = 0;
      let criticalFen = game.fen();
      let criticalPlayedMove = "";
      let criticalBestMove = "";
      let evalBefore = 0;
      let evalAfter = 0;

      for (let i = 0; i < moves.length; i++) {
        const fenBefore = game.fen();
        const turn = game.turn();
        const analysis = await this.performEvaluation(fenBefore, depth);

        game.move(moves[i]);
        const fenAfterMove = game.fen();
        const afterAnalysis = await this.performEvaluation(fenAfterMove, depth);

        const perspectiveMultiplier = turn === "w" ? 1 : -1;
        const swing = (analysis.evaluation - afterAnalysis.evaluation) * perspectiveMultiplier;

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
    });
  }

  destroy(): void {
    this.worker?.terminate();
    this.worker = null;
    this.ready = false;
    this.messageQueue = [];
    this.taskQueue = Promise.resolve();
  }
}

function classifyMistakeTheme(fen: string, playedMove: string, bestMove: string): string {
  const normalizedPlayed = playedMove.trim();
  const normalizedBest = bestMove.trim();

  if (!normalizedBest) return "hanging";
  if (normalizedBest.includes("#")) return "checkmates";
  if (normalizedBest.includes("x") && !normalizedPlayed.includes("x")) return "captures";
  if (/^[NQ]/.test(normalizedBest) && normalizedBest !== normalizedPlayed) return "forks";
  if (/^[BRQ]/.test(normalizedBest) && (normalizedBest.includes("+") || normalizedBest.includes("="))) return "pins";

  const board = fen.split(" ")[0] ?? "";
  const heavyPieces = (board.match(/[qQrR]/g) || []).length;
  if (heavyPieces <= 2) return "checkmates";

  return "hanging";
}

let engineInstance: StockfishEngine | null = null;

export function getStockfish(): StockfishEngine {
  if (!engineInstance) {
    engineInstance = new StockfishEngine();
  }
  return engineInstance;
}

export { StockfishEngine };
