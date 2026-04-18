export type TacticalGameId = 'chess' | 'checkers' | 'morris' | 'tictactoe';

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
    accentClass: 'bg-blue-600',
    summary: 'Play full matches against smart bots, sharpen your plans, and review the turning point that decided the board.',
    coachFocus: 'Planning, tactics, defense, and timing.',
    modes: ['vs computer', 'coaching', 'daily puzzle'],
    multiplayerStatus: 'Same-device or pass-and-play for now. Online later.',
    status: 'live',
    tier: 'primary',
  },
  {
    id: 'morris',
    name: 'Morabaraba',
    icon: '◎',
    path: '/morris',
    accentClass: 'bg-emerald-600',
    summary: 'The mill-building strategy game passed down across generations. Place your pieces, form three-in-a-row, and outsmart the board.',
    coachFocus: 'Setup, blocking, pattern recognition.',
    modes: ['vs computer', 'coaching tips'],
    multiplayerStatus: 'Best on one shared device right now.',
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
    multiplayerStatus: 'Live online rooms with invite codes are ready.',
    status: 'live',
    tier: 'quick',
  },
  {
    id: 'checkers',
    name: 'Checkers',
    icon: '●',
    path: '/checkers',
    accentClass: 'bg-rose-600',
    summary: 'Classic captures and king chases. Leap, trap, and promote.',
    coachFocus: 'Trading, tempo, promotion pressure.',
    modes: ['vs computer'],
    multiplayerStatus: 'Local same-device play works now. Online later.',
    status: 'live',
    tier: 'quick',
  },
];
