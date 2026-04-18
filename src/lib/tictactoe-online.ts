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

export interface TicTacToeRoomPresence {
  playerId: string;
  name: string;
  joinedAt: number;
  onlineAt: string;
}

export const ROOM_CODE_LENGTH = 6;

export function createEmptyOnlineTicTacToeState(): OnlineTicTacToeState {
  return {
    board: Array(9).fill(null),
    turn: "X",
    winner: null,
    lastMoveIndex: null,
    updatedAt: Date.now(),
  };
}

export function sanitizeRoomCode(value: string) {
  return value.replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, ROOM_CODE_LENGTH);
}

export function generateRoomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: ROOM_CODE_LENGTH }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
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

export function sortRoomPlayers(players: TicTacToeRoomPresence[]) {
  return [...players].sort((left, right) => left.joinedAt - right.joinedAt || left.playerId.localeCompare(right.playerId));
}
