# TacticalPath

A chess coaching app that finds the turning point in every game and explains it in language you'll actually remember — plus Morabaraba and classic strategy games to sharpen how you think.

**Live:** [tacticalpath.vercel.app](https://tacticalpath.vercel.app)

## What It Does

TacticalPath helps chess players improve through a simple loop:

1. **Play** — Play chess against smart bots at your level
2. **See your turning point** — One coaching insight per game: the moment that changed the result, explained in plain language
3. **Play sharper** — Carry the lesson into the rematch. Track your progress. Build your streak

Plus **Morabaraba** (the mill-building strategy game passed down across generations), Checkers, and Tic Tac Toe for when you want a different board.

## Stack

- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS v4
- **Chess Engine:** Stockfish WASM (runs in browser)
- **Chess UI:** chess.js + react-chessboard
- **Deployment:** Vercel
- **Mobile:** Capacitor (planned)

## Getting Started

### Prerequisites

- Node.js 18+

### Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/duolabs01-dot/TacticalPath.git
   cd TacticalPath
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run locally:
   ```bash
   npm run dev
   ```

## Architecture

```
src/
├── coaches/            # GameCoach interface + factory (coaching system scaffold)
│   ├── types.ts        # CoachingInsight and GameCoach interfaces
│   └── index.ts        # Coach factory (returns null in v1, real coaches from v1.5)
├── components/         # Layout, SideNav, BottomNav, ThemeProvider
├── context/
│   └── GameContext.tsx  # Chess game state management
├── data/
│   ├── games.ts        # Game library (chess, morabaraba, ttt, checkers)
│   └── puzzles.ts      # Puzzle library (5 themes × multiple difficulties)
├── hooks/
│   └── useProgress.ts  # localStorage progress tracking
├── lib/
│   ├── stockfish.ts    # Stockfish WASM integration
│   └── utils.ts        # Utility functions
├── pages/
│   ├── Landing.tsx      # Public landing page
│   ├── Dashboard.tsx    # Home — chess hero, daily board, game cards
│   ├── DailyBoard.tsx   # Daily chess puzzle (stub, launching soon)
│   ├── Play.tsx         # Game library with chess-led hierarchy
│   ├── Progress.tsx     # Stats and streak tracking
│   ├── PlayChess.tsx    # Chess game vs bot
│   ├── Morris.tsx       # Morabaraba game
│   ├── Checkers.tsx     # Checkers game
│   ├── TicTacToe.tsx    # Tic Tac Toe game
│   ├── Profile.tsx      # User profile
│   └── Settings.tsx     # App settings
├── types/
│   └── progress.ts     # v2 progress data shape (defined, not migrated yet)
└── App.tsx             # Root with routing
```

## Games

| Game | Role | Coaching |
|------|------|----------|
| **Chess** | Core training board | Stockfish-backed post-game analysis (coming soon) |
| **Morabaraba** | Featured game | Rule-based coaching tips (coming soon) |
| **Tic Tac Toe** | Quick game | Play now, coaching planned |
| **Checkers** | Quick game | Play now, coaching planned |

## Roadmap

- [x] Chess vs bot (3 difficulty levels)
- [x] Morabaraba vs bot
- [x] Tic Tac Toe vs bot
- [x] Checkers vs bot
- [x] Mobile-friendly layout with bottom nav
- [x] localStorage progress tracking
- [ ] Daily Board chess puzzle system
- [ ] Post-game coaching screen (one insight per game)
- [ ] Stockfish-powered chess coaching
- [ ] Morabaraba coaching tips
- [ ] Progress system v2 (per-game stats, coaching history)
- [ ] Capacitor mobile build

## Archived: Vision A

The original product direction (scholastic chess classroom platform) has been archived in `_shelved/`. It has a strong foundation and may become a separate app in the future. See `_shelved/README.md` for details.

## License

MIT
