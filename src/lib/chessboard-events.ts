export type ChessboardSquareInput =
  | string
  | {
      square?: string | null;
    }
  | null
  | undefined;

export function getChessboardSquare(input: ChessboardSquareInput): string | null {
  if (!input) return null;
  if (typeof input === "string") return input;
  return typeof input.square === "string" ? input.square : null;
}
