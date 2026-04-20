import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Crown, RotateCcw, Sparkles, Swords, Trophy } from "lucide-react";
import { cn } from "../lib/utils";
import { appendGameResult } from "../lib/game-results";

const BOARD_SIZE = 8;
const EMPTY = 0;
const PLAYER_MAN = 1;
const BOT_MAN = 2;
const PLAYER_KING = 11;
const BOT_KING = 22;

type Piece = typeof EMPTY | typeof PLAYER_MAN | typeof BOT_MAN | typeof PLAYER_KING | typeof BOT_KING;
type BoardState = Piece[];
type Side = "player" | "bot";

interface CheckersMove {
  from: number;
  to: number;
  capture: number | null;
}

function createBoard(): BoardState {
  const board = Array<Piece>(BOARD_SIZE * BOARD_SIZE).fill(EMPTY);

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if ((row + col) % 2 === 0) continue;
      const index = row * BOARD_SIZE + col;

      if (row < 3) board[index] = BOT_MAN;
      if (row > 4) board[index] = PLAYER_MAN;
    }
  }

  return board;
}

function isPlayerPiece(piece: Piece) {
  return piece === PLAYER_MAN || piece === PLAYER_KING;
}

function isBotPiece(piece: Piece) {
  return piece === BOT_MAN || piece === BOT_KING;
}

function isKing(piece: Piece) {
  return piece === PLAYER_KING || piece === BOT_KING;
}

function belongsToSide(piece: Piece, side: Side) {
  return side === "player" ? isPlayerPiece(piece) : isBotPiece(piece);
}

function rowOf(index: number) {
  return Math.floor(index / BOARD_SIZE);
}

function colOf(index: number) {
  return index % BOARD_SIZE;
}

function directionsForPiece(piece: Piece) {
  if (piece === PLAYER_MAN) return [[-1, -1], [-1, 1]];
  if (piece === BOT_MAN) return [[1, -1], [1, 1]];
  return [[-1, -1], [-1, 1], [1, -1], [1, 1]];
}

function getPieceMoves(board: BoardState, index: number): CheckersMove[] {
  const piece = board[index];
  if (piece === EMPTY) return [];

  const row = rowOf(index);
  const col = colOf(index);
  const moves: CheckersMove[] = [];

  for (const [rowDelta, colDelta] of directionsForPiece(piece)) {
    const nextRow = row + rowDelta;
    const nextCol = col + colDelta;
    if (nextRow < 0 || nextRow >= BOARD_SIZE || nextCol < 0 || nextCol >= BOARD_SIZE) continue;

    const nextIndex = nextRow * BOARD_SIZE + nextCol;
    const nextPiece = board[nextIndex];

    if (nextPiece === EMPTY) {
      moves.push({ from: index, to: nextIndex, capture: null });
      continue;
    }

    if (belongsToSide(nextPiece, isPlayerPiece(piece) ? "player" : "bot")) continue;

    const landingRow = nextRow + rowDelta;
    const landingCol = nextCol + colDelta;
    if (landingRow < 0 || landingRow >= BOARD_SIZE || landingCol < 0 || landingCol >= BOARD_SIZE) continue;

    const landingIndex = landingRow * BOARD_SIZE + landingCol;
    if (board[landingIndex] === EMPTY) {
      moves.push({ from: index, to: landingIndex, capture: nextIndex });
    }
  }

  return moves;
}

function getAvailableMoves(board: BoardState, side: Side): CheckersMove[] {
  const moves = board.flatMap((piece, index) => (belongsToSide(piece, side) ? getPieceMoves(board, index) : []));
  const captures = moves.filter((move) => move.capture !== null);
  return captures.length > 0 ? captures : moves;
}

function applyMove(board: BoardState, move: CheckersMove): BoardState {
  const next = [...board];
  const piece = next[move.from];
  next[move.from] = EMPTY;
  next[move.to] = piece;

  if (move.capture !== null) {
    next[move.capture] = EMPTY;
  }

  const destinationRow = rowOf(move.to);
  if (piece === PLAYER_MAN && destinationRow === 0) next[move.to] = PLAYER_KING;
  if (piece === BOT_MAN && destinationRow === BOARD_SIZE - 1) next[move.to] = BOT_KING;

  return next;
}

function chooseBotMove(board: BoardState, moves: CheckersMove[]) {
  return [...moves].sort((left, right) => {
    const leftPiece = board[left.from];
    const rightPiece = board[right.from];
    const leftScore =
      (left.capture !== null ? 10 : 0) +
      (rowOf(left.to) === BOARD_SIZE - 1 && leftPiece === BOT_MAN ? 6 : 0) +
      (3 - Math.abs(3.5 - colOf(left.to)));
    const rightScore =
      (right.capture !== null ? 10 : 0) +
      (rowOf(right.to) === BOARD_SIZE - 1 && rightPiece === BOT_MAN ? 6 : 0) +
      (3 - Math.abs(3.5 - colOf(right.to)));
    return rightScore - leftScore;
  })[0];
}

function countPieces(board: BoardState, side: Side) {
  return board.filter((piece) => belongsToSide(piece, side)).length;
}

function getStatusCopy(turn: Side, winner: Side | "draw" | null, isBotThinking: boolean) {
  if (winner === "player") return "You outplayed the bot.";
  if (winner === "bot") return "The bot converted the position.";
  if (winner === "draw") return "The board locked up into a draw.";
  if (isBotThinking) return "The bot is calculating captures and promotions.";
  return turn === "player" ? "Your move. Captures are forced." : "Bot to move.";
}

export function Checkers() {
  const [board, setBoard] = useState<BoardState>(createBoard());
  const [turn, setTurn] = useState<Side>("player");
  const [winner, setWinner] = useState<Side | "draw" | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [legalMoves, setLegalMoves] = useState<CheckersMove[]>([]);
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [hasRecordedResult, setHasRecordedResult] = useState(false);

  const playerPieces = useMemo(() => countPieces(board, "player"), [board]);
  const botPieces = useMemo(() => countPieces(board, "bot"), [board]);
  const availablePlayerMoves = useMemo(() => getAvailableMoves(board, "player"), [board]);
  const availableBotMoves = useMemo(() => getAvailableMoves(board, "bot"), [board]);

  useEffect(() => {
    if (!winner || hasRecordedResult) return;
    appendGameResult("checkers", winner === "player");
    setHasRecordedResult(true);
  }, [hasRecordedResult, winner]);

  useEffect(() => {
    if (winner) return;
    if (playerPieces === 0 || availablePlayerMoves.length === 0) {
      setWinner("bot");
      return;
    }

    if (botPieces === 0 || availableBotMoves.length === 0) {
      setWinner("player");
    }
  }, [availableBotMoves.length, availablePlayerMoves.length, botPieces, playerPieces, winner]);

  useEffect(() => {
    if (turn !== "bot" || winner) return;

    setIsBotThinking(true);
    const timer = window.setTimeout(() => {
      let nextBoard = board;
      let activeMovePool = availableBotMoves;
      if (activeMovePool.length === 0) {
        setWinner("player");
        setIsBotThinking(false);
        return;
      }

      let chosenMove = chooseBotMove(nextBoard, activeMovePool);
      nextBoard = applyMove(nextBoard, chosenMove);

      while (chosenMove.capture !== null) {
        const chainMoves = getPieceMoves(nextBoard, chosenMove.to).filter((move) => move.capture !== null);
        if (chainMoves.length === 0) break;
        chosenMove = chooseBotMove(nextBoard, chainMoves);
        nextBoard = applyMove(nextBoard, chosenMove);
      }

      setBoard(nextBoard);
      setSelected(null);
      setLegalMoves([]);
      setTurn("player");
      setIsBotThinking(false);
    }, 550);

    return () => window.clearTimeout(timer);
  }, [availableBotMoves, board, turn, winner]);

  const reset = () => {
    setBoard(createBoard());
    setTurn("player");
    setWinner(null);
    setSelected(null);
    setLegalMoves([]);
    setIsBotThinking(false);
    setHasRecordedResult(false);
  };

  const handleSquareClick = (index: number) => {
    if (turn !== "player" || winner || isBotThinking) return;
    const piece = board[index];

    if (selected !== null) {
      const chosenMove = legalMoves.find((move) => move.to === index);
      if (chosenMove) {
        let nextBoard = applyMove(board, chosenMove);
        const captureChain = chosenMove.capture !== null
          ? getPieceMoves(nextBoard, chosenMove.to).filter((move) => move.capture !== null)
          : [];

        setBoard(nextBoard);

        if (captureChain.length > 0) {
          setSelected(chosenMove.to);
          setLegalMoves(captureChain);
          return;
        }

        setSelected(null);
        setLegalMoves([]);
        setTurn("bot");
        return;
      }
    }

    if (!isPlayerPiece(piece)) {
      setSelected(null);
      setLegalMoves([]);
      return;
    }

    const forcedMoves = availablePlayerMoves.filter((move) => move.from === index);
    if (forcedMoves.length === 0) return;

    setSelected(index);
    setLegalMoves(forcedMoves);
  };

  const statusCopy = getStatusCopy(turn, winner, isBotThinking);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 md:px-8 md:py-8">
      <header className="mb-6 flex items-center justify-between">
        <Link
          to="/play"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-600">Board control</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Checkers</h1>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
        <section className="rounded-[2.5rem] border border-white/70 bg-white/85 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Position</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">
                {winner
                  ? winner === "player"
                    ? "You closed the board"
                    : "The bot squeezed the board"
                  : turn === "player"
                    ? "Your turn"
                    : "Bot is moving"}
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Forced captures enabled
            </div>
          </div>

          <div className="grid aspect-square w-full max-w-[42rem] grid-cols-8 gap-1 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-200 p-2">
            {board.map((piece, index) => {
              const row = rowOf(index);
              const col = colOf(index);
              const isDark = (row + col) % 2 === 1;
              const isLegalTarget = legalMoves.some((move) => move.to === index);
              const isSelected = selected === index;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => isDark && handleSquareClick(index)}
                  className={cn(
                    "relative flex aspect-square items-center justify-center rounded-[1rem] transition",
                    isDark ? "bg-amber-700" : "bg-amber-100",
                    isSelected && "ring-4 ring-blue-300",
                    isLegalTarget && "ring-4 ring-emerald-300"
                  )}
                >
                  {isLegalTarget && (
                    <div className="absolute h-3 w-3 rounded-full bg-emerald-300 shadow-lg shadow-emerald-900/40" />
                  )}
                  {piece !== EMPTY && (
                    <div
                      className={cn(
                        "relative z-10 flex h-[72%] w-[72%] items-center justify-center rounded-full border-4 shadow-lg",
                        isPlayerPiece(piece)
                          ? "border-rose-300 bg-gradient-to-br from-rose-400 to-rose-600 text-white"
                          : "border-slate-700 bg-gradient-to-br from-slate-700 to-slate-950 text-white"
                      )}
                    >
                      {isKing(piece) ? <Crown className="h-5 w-5" /> : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/40">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Swords className="h-6 w-6 text-blue-200" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-200">Coach</p>
                <p className="text-xl font-black">One board rule</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-200">{statusCopy}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[1.75rem] bg-white p-4 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Your pieces</p>
              <p className="mt-2 text-2xl font-black text-rose-500">{playerPieces}</p>
            </div>
            <div className="rounded-[1.75rem] bg-white p-4 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Bot pieces</p>
              <p className="mt-2 text-2xl font-black text-slate-900">{botPieces}</p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-slate-900">
              <Trophy className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-black">Winning plan</h3>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Preserve your back row, look for forced jumps, and chase promotion only when you can still defend the center.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={reset}
                className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-slate-800"
              >
                New board
              </button>
              <Link
                to="/play"
                className="rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
              >
                Back to games
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
