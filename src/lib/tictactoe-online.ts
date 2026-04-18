export type TicTacToeMark = "X" | "O";
export type TicTacToeWinner = TicTacToeMark | "draw" | null;
export type TicTacToeBoard = Array<TicTacToeMark | null>;

export interface OnlineTicTacToeState {
  board: TicTacToeBoard;
  turn: TicTacToeMark;
  winner: TicTacToeWinner;
  lastMoveIndex: number | null;
  updatedAt: number;
}

export function createEmptyOnlineTicTacToeState(): OnlineTicTacToeState {
  return {
    board: Array(9).fill(null),
    turn: "X",
    winner: null,
    lastMoveIndex: null,
    updatedAt: Date.now(),
  };
}

export function checkTicTacToeWinner(board: TicTacToeBoard): TicTacToeWinner {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return board.every(Boolean) ? "draw" : null;
}

export function applyOnlineMove(
  state: OnlineTicTacToeState,
  index: number,
  player: TicTacToeMark
) {
  if (state.winner || state.turn !== player || state.board[index] !== null) {
    return null;
  }

  const nextBoard = [...state.board];
  nextBoard[index] = player;
  const winner = checkTicTacToeWinner(nextBoard);

  return {
    board: nextBoard,
    turn: winner ? state.turn : player === "X" ? "O" : "X",
    winner,
    lastMoveIndex: index,
    updatedAt: Date.now(),
  } satisfies OnlineTicTacToeState;
}
