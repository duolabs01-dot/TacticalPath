export type MultiPlayer = "1" | "2";
export type FourBoard = (MultiPlayer | null)[];

// 7 columns, 6 rows. Total 42 cells.
// Indexing: 0 is bottom-left, 6 is bottom-right.
// Row 0: 0-6 (bottom)
// Row 5: 35-41 (top)

export const COLS = 7;
export const ROWS = 6;

export function createEmptyBoard(): FourBoard {
  return Array(COLS * ROWS).fill(null);
}

// Convert (col, row) to index
export function getIndex(c: number, r: number) {
  return r * COLS + c;
}

export function checkWin(board: FourBoard, player: MultiPlayer): boolean {
  // Check horizontal
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      if (
        board[getIndex(c, r)] === player &&
        board[getIndex(c + 1, r)] === player &&
        board[getIndex(c + 2, r)] === player &&
        board[getIndex(c + 3, r)] === player
      ) return true;
    }
  }
  // Check vertical
  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r <= ROWS - 4; r++) {
      if (
        board[getIndex(c, r)] === player &&
        board[getIndex(c, r + 1)] === player &&
        board[getIndex(c, r + 2)] === player &&
        board[getIndex(c, r + 3)] === player
      ) return true;
    }
  }
  // Check diagonal (bottom-left to top-right)
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      if (
        board[getIndex(c, r)] === player &&
        board[getIndex(c + 1, r + 1)] === player &&
        board[getIndex(c + 2, r + 2)] === player &&
        board[getIndex(c + 3, r + 3)] === player
      ) return true;
    }
  }
  // Check diagonal (top-left to bottom-right)
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      if (
        board[getIndex(c, r)] === player &&
        board[getIndex(c + 1, r - 1)] === player &&
        board[getIndex(c + 2, r - 2)] === player &&
        board[getIndex(c + 3, r - 3)] === player
      ) return true;
    }
  }
  return false;
}

export function getValidMoves(board: FourBoard): number[] {
  const validCols: number[] = [];
  for (let c = 0; c < COLS; c++) {
    if (board[getIndex(c, ROWS - 1)] === null) validCols.push(c);
  }
  return validCols;
}

export function applyMove(board: FourBoard, col: number, player: MultiPlayer): FourBoard {
  const next = [...board];
  for (let r = 0; r < ROWS; r++) {
    const idx = getIndex(col, r);
    if (next[idx] === null) {
      next[idx] = player;
      break;
    }
  }
  return next;
}

const SCORES = { win: 1000000000 };
function evaluateWindow(window: (MultiPlayer | null)[], player: MultiPlayer): number {
  const opp = player === "1" ? "2" : "1";
  let score = 0;
  const pCount = window.filter(c => c === player).length;
  const eCount = window.filter(c => c === null).length;
  const oCount = window.filter(c => c === opp).length;

  if (pCount === 4) score += 1000;
  else if (pCount === 3 && eCount === 1) score += 5;
  else if (pCount === 2 && eCount === 2) score += 2;

  if (oCount === 3 && eCount === 1) score -= 80;

  return score;
}

export function heuristicScore(board: FourBoard, player: MultiPlayer): number {
  let score = 0;
  // Center column is deeply preferred
  let centerCount = 0;
  for (let r = 0; r < ROWS; r++) { if (board[getIndex(3, r)] === player) centerCount++; }
  score += centerCount * 3;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      score += evaluateWindow([board[getIndex(c,r)], board[getIndex(c+1,r)], board[getIndex(c+2,r)], board[getIndex(c+3,r)]], player);
    }
  }
  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r <= ROWS - 4; r++) {
      score += evaluateWindow([board[getIndex(c,r)], board[getIndex(c,r+1)], board[getIndex(c,r+2)], board[getIndex(c,r+3)]], player);
    }
  }
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      score += evaluateWindow([board[getIndex(c,r)], board[getIndex(c+1,r+1)], board[getIndex(c+2,r+2)], board[getIndex(c+3,r+3)]], player);
    }
  }
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      score += evaluateWindow([board[getIndex(c,r)], board[getIndex(c+1,r-1)], board[getIndex(c+2,r-2)], board[getIndex(c+3,r-3)]], player);
    }
  }
  return score;
}

export function minimax(board: FourBoard, depth: number, alpha: number, beta: number, maximizingPlayer: boolean): [number | null, number] {
  const validLocations = getValidMoves(board);
  const isTerminal = checkWin(board, "1") || checkWin(board, "2") || validLocations.length === 0;

  if (depth === 0 || isTerminal) {
    if (isTerminal) {
      if (checkWin(board, "2")) return [null, SCORES.win]; // Bot wins
      if (checkWin(board, "1")) return [null, -SCORES.win]; // Player loses
      return [null, 0]; // Draw
    } else {
      return [null, heuristicScore(board, "2")];
    }
  }

  // Explore center columns first
  const order = [3, 2, 4, 1, 5, 0, 6];
  const sortedLocations = validLocations.sort((a,b) => order.indexOf(a) - order.indexOf(b));

  if (maximizingPlayer) {
    let value = -Infinity;
    let bestCol = sortedLocations[Math.floor(Math.random() * sortedLocations.length)];
    for (let col of sortedLocations) {
      const bCopy = applyMove(board, col, "2");
      const newScore = minimax(bCopy, depth - 1, alpha, beta, false)[1];
      if (newScore > value) {
        value = newScore;
        bestCol = col;
      }
      alpha = Math.max(alpha, value);
      if (alpha >= beta) break;
    }
    return [bestCol, value];
  } else {
    let value = Infinity;
    let bestCol = sortedLocations[Math.floor(Math.random() * sortedLocations.length)];
    for (let col of sortedLocations) {
      const bCopy = applyMove(board, col, "1");
      const newScore = minimax(bCopy, depth - 1, alpha, beta, true)[1];
      if (newScore < value) {
        value = newScore;
        bestCol = col;
      }
      beta = Math.min(beta, value);
      if (alpha >= beta) break;
    }
    return [bestCol, value];
  }
}

export function getBotMoveFour(board: FourBoard, difficulty: 'easy' | 'medium' | 'hard' | 'expert'): number {
  const valid = getValidMoves(board);
  if (valid.length === 0) return -1;
  const depth = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 3 : difficulty === 'hard' ? 5 : 7; // expert is depth 7
  
  if (difficulty === 'easy' && Math.random() < 0.4) {
    return valid[Math.floor(Math.random() * valid.length)];
  }

  const [bestCol] = minimax(board, depth, -Infinity, Infinity, true);
  return bestCol !== null ? bestCol : valid[0];
}
