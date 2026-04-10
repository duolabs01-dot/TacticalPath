export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Puzzle {
  id: string;
  fen: string;
  solution: string[];
  theme: PuzzleTheme;
  difficulty: Difficulty;
  description: string;
}

export type PuzzleTheme = 
  | 'checkmates' 
  | 'forks' 
  | 'pins' 
  | 'captures' 
  | 'hanging';

export const puzzleThemes: { id: PuzzleTheme; name: string; icon: string }[] = [
  { id: 'checkmates', name: '1-Move Checkmates', icon: '♛' },
  { id: 'forks', name: 'Basic Forks', icon: '♞' },
  { id: 'pins', name: 'Basic Pins', icon: '♝' },
  { id: 'captures', name: 'Missed Captures', icon: '♟' },
  { id: 'hanging', name: 'Hanging Pieces', icon: '⚠️' },
];

export const puzzles: Puzzle[] = [
  // === CHECKMATES ===
  {
    id: 'mate-1',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    solution: ['h5f7'],
    theme: 'checkmates',
    difficulty: 'beginner',
    description: 'Mate in 1 with the queen',
  },
  {
    id: 'mate-2',
    fen: 'r2qkbnr/ppp2ppp/2n5/3p4/2B1P1b1/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 5',
    solution: ['f3f7'],
    theme: 'checkmates',
    difficulty: 'beginner',
    description: 'Sacrifice the queen for checkmate',
  },
  {
    id: 'mate-3',
    fen: '6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1',
    solution: ['e1e8'],
    theme: 'checkmates',
    difficulty: 'beginner',
    description: 'Back rank mate',
  },
  {
    id: 'mate-4',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 3',
    solution: ['f3g5'],
    theme: 'checkmates',
    difficulty: 'intermediate',
    description: 'Scholar\'s mate pattern',
  },
  {
    id: 'mate-5',
    fen: '5rk1/5ppp/8/8/8/8/5PPP/7K w - - 0 1',
    solution: ['h1g1'],
    theme: 'checkmates',
    difficulty: 'beginner',
    description: 'King and rook mate',
  },

  // === FORKS ===
  {
    id: 'fork-1',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    solution: ['d1f3'],
    theme: 'forks',
    difficulty: 'beginner',
    description: 'Queen fork on king and rook',
  },
  {
    id: 'fork-2',
    fen: 'r2qk2r/ppp2ppp/2n1bn2/3pp3/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 5',
    solution: ['d1d3'],
    theme: 'forks',
    difficulty: 'intermediate',
    description: 'Queen fork king and bishop',
  },
  {
    id: 'fork-3',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    solution: ['c4f7'],
    theme: 'forks',
    difficulty: 'beginner',
    description: 'Bishop fork on king and knight',
  },
  {
    id: 'fork-4',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    solution: ['c4f7'],
    theme: 'forks',
    difficulty: 'beginner',
    description: 'Another bishop fork example',
  },
  {
    id: 'fork-5',
    fen: '6k1/4r3/8/8/8/8/4R3/4K3 w - - 0 1',
    solution: ['e2e7'],
    theme: 'forks',
    difficulty: 'beginner',
    description: 'Rook fork king and pawn',
  },

  // === PINS ===
  {
    id: 'pin-1',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    solution: ['c4f7'],
    theme: 'pins',
    difficulty: 'intermediate',
    description: 'Pinning the knight',
  },
  {
    id: 'pin-2',
    fen: 'r2qk2r/ppp2ppp/2n1bn2/3pp3/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 5',
    solution: ['c4d3'],
    theme: 'pins',
    difficulty: 'intermediate',
    description: 'Pinning the bishop',
  },
  {
    id: 'pin-3',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    solution: ['c4g5'],
    theme: 'pins',
    difficulty: 'intermediate',
    description: 'Pin after pawn move',
  },
  {
    id: 'pin-4',
    fen: '6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1',
    solution: ['e1e8'],
    theme: 'pins',
    difficulty: 'beginner',
    description: 'Pin prevents capture',
  },

  // === CAPTURES ===
  {
    id: 'capture-1',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    solution: ['h5e5'],
    theme: 'captures',
    difficulty: 'beginner',
    description: 'Capture hanging pawn',
  },
  {
    id: 'capture-2',
    fen: 'r2qk2r/ppp2ppp/2n1bn2/3pp3/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 5',
    solution: ['d4e5'],
    theme: 'captures',
    difficulty: 'beginner',
    description: 'Win pawn in center',
  },
  {
    id: 'capture-3',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    solution: ['c4d5'],
    theme: 'captures',
    difficulty: 'beginner',
    description: 'Bishop captures pawn',
  },
  {
    id: 'capture-4',
    fen: '6k1/4r3/8/8/8/8/4R3/4K3 w - - 0 1',
    solution: ['e2e7'],
    theme: 'captures',
    difficulty: 'beginner',
    description: 'Capture rook',
  },
  {
    id: 'capture-5',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    solution: ['c4e6'],
    theme: 'captures',
    difficulty: 'intermediate',
    description: 'Sacrifice bishop for pawn',
  },

  // === HANGING PIECES ===
  {
    id: 'hanging-1',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    solution: ['h5e5'],
    theme: 'hanging',
    difficulty: 'beginner',
    description: 'Take hanging piece',
  },
  {
    id: 'hanging-2',
    fen: 'r2qk2r/ppp2ppp/2n1bn2/3pp3/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 5',
    solution: ['d4c5'],
    theme: 'hanging',
    difficulty: 'beginner',
    description: 'Win hanging pawn',
  },
  {
    id: 'hanging-3',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    solution: ['c4f7'],
    theme: 'hanging',
    difficulty: 'beginner',
    description: 'Knight is hanging',
  },
  {
    id: 'hanging-4',
    fen: '6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1',
    solution: ['e1e8'],
    theme: 'hanging',
    difficulty: 'beginner',
    description: 'Rook hanging on e8',
  },
];

export function getPuzzlesByTheme(theme: PuzzleTheme): Puzzle[] {
  return puzzles.filter(p => p.theme === theme);
}

export function getPuzzlesByDifficulty(difficulty: Difficulty): Puzzle[] {
  return puzzles.filter(p => p.difficulty === difficulty);
}

export function getRandomPuzzle(theme?: PuzzleTheme, difficulty?: Difficulty): Puzzle {
  let filtered = puzzles;
  if (theme) filtered = filtered.filter(p => p.theme === theme);
  if (difficulty) filtered = filtered.filter(p => p.difficulty === difficulty);
  
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}
