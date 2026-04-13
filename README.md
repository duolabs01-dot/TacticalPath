<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# TacticalPath

A scholastic chess classroom platform where playing games instantly generates kid-friendly, adaptive tactical drills.

**Live:** [tacticalpath.vercel.app](https://tacticalpath.vercel.app)

## What It Does

TacticalPath helps scholastic chess players build skills through a simple loop:

1. **Play** — Students play live games against classmates in a coach-managed classroom
2. **Analyze** — Stockfish finds the single most teachable mistake
3. **Explain** — Gemini AI generates a kid-friendly explanation with arrows and simple language
4. **Drill** — Student completes 3 targeted puzzles matching the mistake pattern
5. **Track** — Theme mastery map shows progress across 5 core tactics

## Stack

- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS v4
- **Backend:** Supabase (Postgres + Auth + Realtime)
- **Chess Engine:** Stockfish WASM (runs in browser)
- **AI Explanations:** Google Gemini API
- **Chess UI:** chess.js + react-chessboard
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (free tier works)
- (Optional) [Gemini API key](https://ai.google.dev) for AI-generated explanations

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

3. Set up Supabase:
   - Create a new Supabase project
   - Run the migration in `supabase/migrations/001_initial_schema.sql` in your SQL Editor
   - Copy your project URL and anon key

4. Configure environment:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local`:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_GEMINI_API_KEY=your-gemini-key  # optional
   ```

5. Run locally:
   ```bash
   npm run dev
   ```

## Architecture

```
src/
├── components/         # Layout components (ClassroomLayout, CoachLayout)
├── context/
│   ├── AuthContext.tsx  # Coach auth (Supabase) + Student auth (picture passwords)
│   ├── ClassroomContext.tsx  # Classroom state and student data
│   └── GameContext.tsx       # Chess game state management
├── data/
│   └── puzzles.ts      # Puzzle library (5 themes × multiple difficulties)
├── hooks/
│   ├── useClassroomManagement.ts  # Coach CRUD operations
│   ├── useProgress.ts             # Student mastery tracking
│   └── useRealtime.ts             # Supabase Realtime for live games
├── lib/
│   ├── analysis-pipeline.ts  # Stockfish → Gemini → Drills pipeline
│   ├── database.types.ts     # TypeScript types matching Supabase schema
│   ├── stockfish.ts          # Stockfish WASM integration
│   ├── supabase.ts           # Supabase client
│   └── utils.ts              # Utility functions
├── pages/
│   ├── coach/          # Coach dashboard and management
│   └── student/        # Student classroom experience
└── App.tsx             # Root with routing
```

### Key Design Decisions

- **Picture passwords** — Students log in by selecting 3 images (no typing needed for kids)
- **Classroom-scoped routing** — All student URLs are `/c/:slug/...` for isolation
- **Browser-side analysis** — Stockfish WASM runs client-side (no server cost)
- **Supabase Realtime** — Broadcast channels for low-latency move sync between players
- **Row Level Security** — Coaches can only see their own classrooms and students

## Database Schema

See `supabase/migrations/001_initial_schema.sql` for the complete schema. Key tables:

| Table | Purpose |
|-------|---------|
| `organizations` | Chess clubs / schools |
| `coaches` | Coach accounts (Supabase Auth) |
| `classrooms` | Classroom instances with settings |
| `students` | Students with picture-password auth |
| `sessions` | Coach-started classroom sessions |
| `games` | Game records with PGN |
| `game_analyses` | Critical mistake + explanation |
| `puzzles` | Drill library (5 themes) |
| `drill_sets` | Post-game drill assignments |
| `theme_mastery` | Student progress per theme |

## User Roles

### Coach
- Create classrooms, manage rosters
- Start/pause sessions, pair students
- View mastery heatmaps and reports
- Generate printable picture-password login cards

### Student
- Log in with 3-picture password
- Play live games vs classmates
- See post-game lessons with simple explanations
- Complete targeted drills
- View theme mastery progress

## Roadmap

- [ ] Supabase backend fully wired to UI
- [ ] Live multiplayer game sync
- [ ] Stockfish WASM post-game analysis
- [ ] Gemini kid-friendly explanations
- [ ] Lichess puzzle import (500+ puzzles)
- [ ] Coach session management UI
- [ ] Printable picture-password login cards
- [ ] Parent-ready PDF progress reports
- [ ] Bot fallback for odd student counts
- [ ] Capacitor mobile build

## License

MIT
