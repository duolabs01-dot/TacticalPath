import type { GameCoach } from './types';
import type { TacticalGameId } from '../data/games';

export function getCoach(_gameId: TacticalGameId): GameCoach | null {
  // Week 2: return real coaches
  // Week 1: return null (no coaching active yet)
  return null;
}
