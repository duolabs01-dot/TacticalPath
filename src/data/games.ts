export type TacticalGameId = 'chess' | 'checkers' | 'morris' | 'tictactoe' | 'solitaire';

export interface TacticalGame {
  id: TacticalGameId;
  name: string;
  icon: string;
  path: string;
  accentClass: string;
  summary: string;
  coachFocus: string;
  modes: string[];
  status: 'live' | 'in-progress';
  sessionLabel: string;
  energy: string;
  multiplayerStatus: string;
}

export const gameLibrary: TacticalGame[] = [
  {
    id: 'chess',
    name: 'Chess',
    icon: '♞',
    path: '/play/chess',
    accentClass: 'bg-blue-600',
    summary: 'Play full matches against the computer, sharpen your plans, and review the turning point that decided the board.',
    coachFocus: 'Planning, tactics, defense, and timing.',
    modes: ['vs computer', 'puzzles', 'friend play next'],
    status: 'live',
    sessionLabel: 'Deep session',
    energy: 'Best for full-focus matches and the biggest improvement spikes.',
    multiplayerStatus: 'Pass-and-play works now. Friend invites are next.',
  },
  {
    id: 'checkers',
    name: 'Checkers',
    icon: '●',
    path: '/checkers',
    accentClass: 'bg-rose-600',
    summary: 'Leap, trap, and promote with a cleaner board game loop built around momentum and control.',
    coachFocus: 'Trading, tempo, promotion pressure.',
    modes: ['vs computer', 'local multiplayer'],
    status: 'live',
    sessionLabel: 'Momentum match',
    energy: 'Quick swings, satisfying captures, and easy rematches.',
    multiplayerStatus: 'Strong local multiplayer lane today.',
  },
  {
    id: 'morris',
    name: 'Morris / Mlabalaba',
    icon: '◎',
    path: '/morris',
    accentClass: 'bg-emerald-600',
    summary: 'Build mills, block threats, and learn positional patience in a classic alignment-and-capture game.',
    coachFocus: 'Setup, blocking, pattern recognition.',
    modes: ['vs computer', 'local multiplayer'],
    status: 'live',
    sessionLabel: 'Pattern grind',
    energy: 'Ideal when you want slower pressure and smart setup battles.',
    multiplayerStatus: 'Best shared on one device while online rooms are still being built.',
  },
  {
    id: 'tictactoe',
    name: 'Tic Tac Toe',
    icon: '✕',
    path: '/tictactoe',
    accentClass: 'bg-amber-500',
    summary: 'A polished logic duel with bot personalities, quick rematches, and clear coaching after each game.',
    coachFocus: 'Threat detection, forks, and discipline.',
    modes: ['vs computer', 'local multiplayer'],
    status: 'live',
    sessionLabel: 'Quick warm-up',
    energy: 'Fastest route from tap to rematch in the current app.',
    multiplayerStatus: 'Perfect for same-device passes between friends.',
  },
  {
    id: 'solitaire',
    name: 'Solitaire',
    icon: '🂠',
    path: '/solitaire',
    accentClass: 'bg-violet-600',
    summary: 'A solo mode focused on sequencing, patience, and efficient reveals as the coaching layer evolves.',
    coachFocus: 'Sequencing, space management, patience.',
    modes: ['solo', 'coach review next'],
    status: 'in-progress',
    sessionLabel: 'Solo reset',
    energy: 'A lower-pressure lane for players who want rhythm over rivalry.',
    multiplayerStatus: 'Solo only for now.',
  },
];
