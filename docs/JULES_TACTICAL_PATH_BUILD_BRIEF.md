# Tactical Path: Final Jules Build Brief

Status: Final build brief
Date: 2026-04-14
Audience: [Jules](https://jules.google.com/)

## 1. Product Direction

Tactical Path should be a mobile-friendly strategy games platform.

It should not behave like a coach-only dashboard.
It should not force normal users into a coach login flow.
It should not present chess as the only game or the only reason the app exists.

But it also should **not remove chess**.

The correct direction is:

- keep chess
- add more strategy games around it
- make the product public-first
- make the product game-first
- keep the original Tactical Path idea of helping users become better thinkers and players
- use AI coaching as a core product layer across all supported games

## 2. Non-Negotiable Correction

The current public behavior is wrong.

Today, the app sends people to a coach flow by default:

- [`src/App.tsx`](C:\Users\THEMBA\Downloads\TacticalPath\src\App.tsx) redirects `/` to `/coach/login`
- wildcard routes also redirect to `/coach/login`

This makes the app feel unusable to everyone except a coach.

Jules must fix this first.

## 3. Core Product Thesis

Tactical Path should become a home for classic strategy games that are quick to access, easy to understand, pleasant to play on mobile, and designed to help people improve over time.

The product should feel like:

- accessible
- thoughtful
- game-led
- clean
- modern
- replayable
- intelligent

Not like:

- a coach admin dashboard
- a classroom tool as the main product
- a chess-only training system

## 4. The Big Differentiator

Tactical Path should not just be a collection of games.

Its differentiator should be:

- play classic strategy games
- play against friends or robots
- get coached by AI
- learn from your mistakes
- become a stronger thinker and player over time

This is the original Tactical Path magic worth preserving.

## 5. Core Game Lineup

These are the core games Tactical Path should support:

1. Chess
2. Morris family / Mlabalaba
3. Checkers / Draft
4. Tic Tac Toe
5. Solitaire

Important:

- Chess stays in the product
- Chess should not dominate the IA so much that the product still feels like a chess-only app
- Morris / Mlabalaba should be treated as a flagship differentiator
- the app should feel like a broader strategy platform, not a rebranded chess classroom

## 6. Core Play Modes

Tactical Path should support these modes where appropriate:

- local multiplayer / pass-and-play
- vs robot / AI opponent
- online multiplayer later where feasible

Recommended MVP mode coverage:

- Chess: vs robot + multiplayer
- Checkers: local multiplayer + vs robot
- Tic Tac Toe: local multiplayer + vs robot
- Morris / Mlabalaba: local multiplayer first, vs robot if feasible, online later
- Solitaire: solo only

Do not block the pivot on shipping every mode for every game on day one.

## 7. AI Coaching Layer

AI coaching should be a core product system across all games.

Do not build five disconnected coaching systems.
Build one shared coaching framework with game-specific adapters.

The coaching loop should be:

1. Play a game
2. Detect the most teachable turning point
3. Explain it in simple language
4. Offer a rematch, drill, or short improvement exercise
5. Track progress over time

The AI coach should help users improve in:

- planning
- pattern recognition
- defense
- timing
- setup
- threat detection
- tradeoffs
- patience

## 8. Shared Coaching Categories

Jules should design the coaching architecture so different games can map into shared thinking concepts.

Examples:

- missed win
- failed defense
- rushed move
- bad trade
- missed block
- poor setup
- pattern blindness
- wasted tempo
- trapped piece or position
- failure to anticipate threat

Game-specific examples:

### Chess

- hanging piece
- missed fork
- missed mate threat
- bad exchange

### Checkers

- missed capture chain
- exposed king path
- poor trade
- failure to defend a lane

### Morris / Mlabalaba

- missed mill setup
- failed block
- weak placement pattern
- premature move

### Tic Tac Toe

- missed fork
- failed block
- poor center/corner priority
- wasted turn

### Solitaire

- poor reveal priority
- blocked stack
- inefficient sequencing
- missed release move

## 9. Product Rules

Jules must follow these rules:

1. Do not remove chess.
2. Do not keep `/` redirecting to `/coach/login`.
3. Do not make coach/classroom flows the default public experience.
4. Do not describe Tactical Path as a coach platform first.
5. Do make Tactical Path feel like a broader strategy games product.
6. Do keep useful existing game infrastructure where it helps.
7. Do add new games in a way that supports future expansion.
8. Do preserve the learning-and-improvement DNA of Tactical Path.
9. Do make AI coaching a cross-game system, not a chess-only feature.

## 10. What The App Should Be For

### Primary user

A normal player who wants to open Tactical Path and play a strategy game.

They need:

- a clear public landing page
- a game library
- easy entry into each game
- mobile-friendly play
- no coach friction at the front door

### Secondary user

A returning player who wants to continue playing, challenge a robot, or explore different game types while improving over time.

They need:

- recent play access
- simple replay loops
- clear game categories
- visible progress and improvement hooks

### Legacy/internal user

Coach/classroom flows may still exist in the codebase, but they should no longer define the product identity.

## 11. Information Architecture

Jules should move Tactical Path toward this structure.

### Public routes

- `/`
  - real landing page
  - explains the product as a multi-game strategy platform
  - features the core games
  - presents AI coaching as a differentiator
  - offers obvious play CTA
- `/games`
  - game library
- `/games/chess`
- `/games/morris`
- `/games/checkers`
- `/games/tic-tac-toe`
- `/games/solitaire`

### Play routes

- `/play/chess`
- `/play/morris`
- `/play/checkers`
- `/play/tic-tac-toe`
- `/play/solitaire`

If Morris variants are split out, use routes such as:

- `/play/morris/three-mens`
- `/play/morris/six-mens`
- `/play/morris/nine-mens`

### Optional player routes

- `/login`
- `/signup`
- `/profile`
- `/history`

### Legacy routes

Coach and classroom routes may remain temporarily, but they must not own the public experience.

## 12. MVP Screens Jules Should Build Or Refactor

### A. Public landing page

The landing page should:

- stop the coach-dashboard confusion immediately
- present Tactical Path as a strategy games platform
- include Chess, Mlabalaba / Morris, Checkers, Tic Tac Toe, and Solitaire in the story
- make “Play” the main action
- make AI coaching a clear value proposition

Required sections:

- hero
- featured games
- how Tactical Path helps you improve
- Mlabalaba / Morris highlight
- play CTA

### B. Games library

The games library should:

- show all core games
- make the product feel broader than chess
- let users choose a game quickly
- indicate play modes where relevant

Each game card should include:

- title
- short description
- available modes
- play CTA
- status if needed

### C. Morris / Mlabalaba hub

This should be a first-class surface.

It should:

- explain Morris family games simply
- name Mlabalaba clearly and respectfully
- show available variants
- provide direct play entry
- frame it as part of the platform identity

### D. Play surfaces

Each game should have a dedicated play surface with:

- board or game layout
- turn state
- restart action
- rules/help access
- clear win/draw state
- mode context (vs robot, local multiplayer, etc.)

### E. Review / coaching surface

Where feasible, game sessions should lead into a simple coaching or review moment instead of ending abruptly.

## 13. Game Priorities

### Keep and reuse

#### Chess

Chess should remain playable.
If existing chess logic and UI can be reused, reuse it.
Do not rip chess out just because the product is expanding.

### Add next

#### Tic Tac Toe

Should be the quickest clean win.

Required:

- polished board
- fast same-device play
- vs robot mode if easy to ship
- strong empty, active, win, and draw states

#### Checkers / Draft

Required:

- playable board
- basic move and capture rules
- turn handling
- game-end state
- robot mode if feasible in MVP

#### Morris / Mlabalaba

Required:

- at least one Morris variant in MVP
- recommend Nine Men's Morris first if that fits existing architecture best
- code should allow more variants later
- copy should connect it clearly to Mlabalaba

#### Solitaire

Required:

- include route and product slot in IA
- preferred first variant: Klondike

If Solitaire is too large for the first pass, Jules should scaffold it cleanly instead of blocking the rest of the pivot.

## 14. Build Order

Jules should build in this order:

### Phase 1: Fix product identity

1. Remove coach-login default routing
2. Make `/` a real landing page
3. Add `/games`
4. Clean up public navigation and copy

### Phase 2: Establish multi-game structure

1. Create reusable game shell / play layout
2. Introduce scalable game route structure
3. Add game metadata or config model for cards and routing
4. Design a reusable coaching/review layer

### Phase 3: Ship and preserve gameplay

1. Preserve chess
2. Add Tic Tac Toe
3. Add Checkers
4. Add Morris / Mlabalaba
5. Add or scaffold Solitaire

### Phase 4: Add improvement loops

1. Add basic post-game coaching moments
2. Add simple rematch / replay flows
3. Add progress hooks where sensible

### Phase 5: Demote legacy product framing

1. demote coach-first surfaces
2. remove misleading public labels
3. stop the app from feeling like a classroom chess dashboard

## 15. Reuse Guidance

Jules should treat this as a product refactor, not a total restart.

Safe reuse candidates:

- existing routing shell patterns
- shared layouts
- existing auth structure if useful
- current chess game logic
- styling and component primitives

Likely refactor targets:

- [`src/App.tsx`](C:\Users\THEMBA\Downloads\TacticalPath\src\App.tsx)
- coach-first public redirects
- landing copy
- coach-specific public navigation
- pages whose existence makes the app feel like a coaching marketplace first

## 16. Copy Direction

Replace public-facing copy that implies:

- coach dashboard first
- coaching marketplace first
- classroom chess platform first
- chess-only product identity

Replace it with copy that communicates:

- multi-game strategy platform
- play classic games
- challenge a robot or another player
- learn from your mistakes
- get smarter over time
- chess plus Morris / Mlabalaba, Checkers, Tic Tac Toe, and Solitaire

## 17. Navigation Direction

Primary public navigation should become something like:

- Home
- Games
- Play
- Progress
- Profile

It should not lead with:

- Coach Dashboard
- Coach Connect
- Coach Review

## 18. Design Direction

The product should feel:

- bright
- modern
- mobile-first
- welcoming
- strategic
- polished without feeling corporate

Avoid:

- enterprise admin dashboard mood
- classroom admin dominance
- overly chess-specific branding
- dark esports style

## 19. Acceptance Criteria

This pivot is successful when all of these are true:

1. Visiting `/` no longer redirects to `/coach/login`
2. The landing page clearly presents Tactical Path as a multi-game strategy platform
3. Chess is still part of the product
4. The IA clearly includes Chess, Morris / Mlabalaba, Checkers, Tic Tac Toe, and Solitaire
5. The public experience is no longer coach-first
6. At least Tic Tac Toe and one other non-chess game are playable in the first useful build
7. The app clearly supports multiplayer and/or vs robot modes where appropriate
8. AI coaching is positioned as a cross-game system
9. Legacy coach flows no longer define the app's identity

## 20. What Jules Should Deprioritize

Do not spend early time on:

- coach marketplace features
- classroom orchestration polish
- billing
- deep analytics
- advanced online multiplayer infrastructure
- anything that delays the public game-platform pivot

## 21. Final Build Request To Jules

Please refactor Tactical Path into a public-facing strategy games platform that:

1. keeps chess
2. adds Morris / Mlabalaba, Checkers, Tic Tac Toe, and Solitaire
3. supports multiplayer and vs robot play where appropriate
4. removes coach-first default routing
5. adds a proper landing page and game library
6. preserves Tactical Path's original improvement DNA by using AI coaching across games
7. leaves the app ready for more games later without another product identity rewrite

## 22. One-Line Positioning

Tactical Path is a mobile-friendly strategy games platform where players can play chess, Mlabalaba, Checkers, Tic Tac Toe, and Solitaire, challenge robots or other players, and get AI coaching that helps them become better thinkers and players over time.
