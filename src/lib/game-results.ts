export type ResultGameType = "chess" | "tictactoe" | "checkers" | "morris" | "fourinarow";

export interface GameResultRecord {
  game: ResultGameType;
  won: boolean;
  ts: number;
}

export const GAME_RESULTS_KEY = "tacticalpath_game_results";
export const GAME_RESULTS_EVENT = "tacticalpath:game-results-updated";

export function readGameResults(): GameResultRecord[] {
  try {
    const raw = localStorage.getItem(GAME_RESULTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function appendGameResult(game: ResultGameType, won: boolean) {
  const records = readGameResults();
  records.push({ game, won, ts: Date.now() });

  if (records.length > 200) {
    records.splice(0, records.length - 200);
  }

  localStorage.setItem(GAME_RESULTS_KEY, JSON.stringify(records));
  window.dispatchEvent(new CustomEvent(GAME_RESULTS_EVENT));
}
