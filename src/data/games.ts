export type TacticalGameId = 'chess' | 'checkers' | 'morris' | 'tictactoe' | 'fourinarow';

export interface TacticalGame {
  id: TacticalGameId;
  name: string;
  icon: string;
  path: string;
  onlinePath?: string;
  accentClass: string;
  summary: string;
  coachFocus: string;
  modes: string[];
  multiplayerStatus: string;
  status: 'live' | 'coming-soon';
  tier: 'primary' | 'featured' | 'quick';
}

export const gameLibrary: TacticalGame[] = [
  {
    id: 'chess',
    name: 'Chess',
    icon: '♞',
    path: '/play/chess',
    onlinePath: '/multiplayer/chess',
    accentClass: 'bg-blue-600',
    summary: 'Play full matches against the Stockfish engine, sharpen your plans, and review the turning point that decided the board.',
    coachFocus: 'Planning, tactics, defense, and timing.',
    modes: ['vs computer', 'online rooms', 'coaching', 'daily puzzle'],
    multiplayerStatus: 'Live online rooms with invite codes.',
    status: 'live',
    tier: 'primary',
  },
  {
    id: 'morris',
    name: 'Morabaraba',
    icon: '◎',
    path: '/morris',
    onlinePath: '/multiplayer/morris',
    accentClass: 'bg-emerald-600',
    summary: 'The mill-building strategy game passed down across generations. Place your pieces, form three-in-a-row, and outsmart the board.',
    coachFocus: 'Setup, blocking, pattern recognition.',
    modes: ['vs computer', 'online rooms', 'coaching tips'],
    multiplayerStatus: 'Live online rooms with invite codes.',
    status: 'live',
    tier: 'featured',
  },
  {
    id: 'tictactoe',
    name: 'Tic Tac Toe',
    icon: '✕',
    path: '/tictactoe',
    onlinePath: '/multiplayer/tictactoe',
    accentClass: 'bg-amber-500',
    summary: 'Quick game, sharp thinking. Perfect for a fast warm-up between chess sessions.',
    coachFocus: 'Threat detection, forks, and discipline.',
    modes: ['vs computer', 'online rooms'],
    multiplayerStatus: 'Live online rooms with invite codes.',
    status: 'live',
    tier: 'quick',
  },
  {
    id: 'checkers',
    name: 'Checkers',
    icon: '●',
    path: '/checkers',
    onlinePath: '/multiplayer/checkers',
    accentClass: 'bg-rose-600',
    summary: 'Classic captures and king chases. Leap, trap, and promote.',
    coachFocus: 'Trading, tempo, promotion pressure.',
    modes: ['vs computer', 'online rooms'],
    multiplayerStatus: 'Live online rooms with invite codes.',
    status: 'live',
    tier: 'quick',
  },
  {
    id: 'fourinarow',
    name: 'Four in a Row',
    icon: '🔴',
    path: '/fourinarow',
    onlinePath: '/multiplayer/fourinarow',
    accentClass: 'bg-indigo-500',
    summary: 'Connect 4 pieces vertically, horizontally, or diagonally. Simple rules, deep strategy.',
    coachFocus: 'Pattern recognition, forks, central control.',
    modes: ['vs computer', 'online rooms'],
    multiplayerStatus: 'Live online rooms with invite codes.',
    status: 'live',
    tier: 'quick',
  },
];
