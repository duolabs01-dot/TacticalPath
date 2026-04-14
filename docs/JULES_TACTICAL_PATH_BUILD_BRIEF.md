# Tactical Path: Jules Build Brief

Status: Active build brief
Date: 2026-04-14
Audience: [Jules](https://jules.google.com/)

## 1. What This App Should Be

Tactical Path should be a mobile-friendly game platform for everyday players, families, and communities.

It should **not** behave like a coach-only classroom dashboard.

The product direction is:

- public-first landing experience
- simple player access
- multiple classic strategy games
- fast game selection
- clean solo and local multiplayer play
- room to add progression, AI, and competitive layers later

## 2. Current Problem To Fix First

Right now the app is effectively unusable for most people because the root route sends everyone into a coach-only flow.

Current blocking behavior:

- [`src/App.tsx`](C:\Users\THEMBA\Downloads\TacticalPath\src\App.tsx) redirects `/` to `/coach/login`
- wildcard routes also redirect to `/coach/login`
- the current product spec in [`docs/tacticalpath-product-spec.md`](C:\Users\THEMBA\Downloads\TacticalPath\docs\tacticalpath-product-spec.md) is still chess-classroom-first
- much of the current app language is coach/chess specific

This is the wrong direction for the product we want now.

## 3. New Product Direction

Tactical Path should become a strategy games hub with this launch lineup:

1. Morris family games, with South African relevance clearly supported
   - Three Men's Morris
   - Six Men's Morris
   - Nine Men's Morris
   - local framing for **Mlabalaba**
2. Draft / Checkers
3. Tic Tac Toe
4. Solitaire

Chess can remain in the codebase if useful, but it is no longer the product identity.

## 4. Product Principles

Jules should rebuild toward these principles:

- game-first, not coach-first
- public landing page, not forced dashboard redirect
- fun and accessible before advanced analytics
- mobile-first layouts
- fast time-to-play
- clear local identity, especially for Mlabalaba / Morris family games
- easy to extend with more games later

## 5. Primary Users

### Player

Someone who wants to open the app and play a familiar strategy game quickly.

Needs:

- clear game choices
- solo mode
- local pass-and-play or same-device options where sensible
- easy onboarding

### Returning player

Someone who wants to continue where they left off, see recent games, and improve over time.

Needs:

- recent activity
- saved progress where relevant
- easy replay / restart

### Admin / operator

Not a public-facing role.

This can exist later, but it must not dominate the product experience.

## 6. Hard Product Rules

Jules should follow these rules:

1. Do **not** route `/` to `/coach/login`.
2. Do **not** make coach/classroom flows the public default.
3. Do **not** present Tactical Path as a chess coaching platform.
4. Do **not** ship a home screen that assumes the user is a coach.
5. Do **not** make chess the only or dominant game in the IA.
6. Do **not** delete reusable patterns if they can be repurposed cleanly.

## 7. MVP Information Architecture

Jules should move the app to this route structure:

### Public routes

- `/`
  - public landing page
  - explains Tactical Path as a strategy games platform
  - shows game lineup
  - offers obvious CTA: Play Now
- `/games`
  - game library / chooser
- `/games/morris`
  - Morris family overview
- `/games/checkers`
- `/games/tic-tac-toe`
- `/games/solitaire`

### Play routes

- `/play/morris`
- `/play/checkers`
- `/play/tic-tac-toe`
- `/play/solitaire`

If a game has multiple variants, use nested selection inside the game route or routes such as:

- `/play/morris/three-mens`
- `/play/morris/six-mens`
- `/play/morris/nine-mens`

### Optional account routes

- `/login`
- `/signup`
- `/profile`

These should support the player experience, not coach administration.

### Legacy routes

Coach and classroom routes may remain temporarily, but they must be treated as legacy/internal and must not hijack the public experience.

## 8. MVP Screens Jules Should Build or Refactor

### A. New public landing page

Purpose:

- explain what Tactical Path is now
- stop the coach-only confusion
- showcase the game lineup
- let users start playing immediately

Required sections:

- hero with clear headline
- featured games
- “why Tactical Path” section
- Mlabalaba / Morris callout
- play now CTA

### B. Game library screen

Purpose:

- display all supported games
- make it obvious which games are available now
- route cleanly into play screens

Each game card should show:

- name
- short description
- mode availability
- status badge if needed

### C. Morris family hub

Purpose:

- establish Morris as a first-class pillar of the product
- explain variants
- connect the product to Mlabalaba clearly and respectfully

Required content:

- what Morris / Mlabalaba is
- variant chooser
- play CTA

### D. Game play surfaces

Each game should have a focused play surface with:

- board or layout
- whose turn it is
- restart control
- rules/help entry point
- clear win/draw state

### E. Minimal profile or recent activity surface

Only if this can be done cleanly without slowing the pivot.

## 9. Game Requirements

## Morris family / Mlabalaba

Required:

- support at least one Morris variant in MVP, preferably Nine Men's Morris first
- structure the code so more Morris variants can be added cleanly
- explicitly name the South African relevance in copy

Nice if feasible:

- variant switcher
- rules panel per variant

## Checkers / Draft

Required:

- playable board
- turn handling
- capture rules
- end-state messaging

## Tic Tac Toe

Required:

- simple, polished, fast
- clean same-device play
- strong empty, playing, won, and draw states

## Solitaire

Required:

- clear MVP choice of solitaire variant
- recommended: Klondike

If solitaire is too large for the first build, Jules should scaffold the route and UI entry point cleanly while prioritizing the three competitive board games first.

## 10. Suggested Build Order

Jules should build in this order:

### Phase 1: Fix product identity

1. Replace root redirect behavior
2. Add public landing page
3. Add game library page
4. Remove coach-first public framing

### Phase 2: Establish game architecture

1. Create reusable game shell / play layout
2. Introduce per-game route structure
3. Add game metadata model for game cards and routing

### Phase 3: Ship playable games

1. Tic Tac Toe
2. Checkers
3. Morris / Mlabalaba
4. Solitaire

### Phase 4: Cleanup

1. demote legacy coach routes
2. remove broken or misleading nav links
3. align copy, titles, and metadata

## 11. Reuse Guidance

Jules should reuse existing infrastructure where it helps, but not preserve the wrong product story.

Safe reuse candidates:

- routing structure
- shared layout patterns
- existing auth scaffolding if useful
- styling primitives
- any generic page shell patterns

Likely rewrite / heavy refactor candidates:

- [`src/App.tsx`](C:\Users\THEMBA\Downloads\TacticalPath\src\App.tsx)
- chess-only landing copy
- coach login as default entry
- coach dashboard-first navigation
- any nav labels or cards assuming “coach” is the primary user

## 12. Specific Changes Jules Should Make

### Routing

- change `/` from redirect to real landing page
- change `*` fallback away from coach login
- add `/games`
- add playable routes for each launch game

### Product copy

Replace copy that says or implies:

- coach dashboard
- coaching marketplace
- chess-only learning platform
- scholastic classroom-first positioning

Replace it with:

- strategy games platform
- play classic games
- mobile-friendly play
- Morris / Mlabalaba as a featured title

### Navigation

Primary nav should become:

- Home
- Games
- Play
- Profile (optional)

Not:

- coach dashboard
- coach connect
- coach review

## 13. Design Direction

Jules should target a product feel that is:

- bright
- clean
- modern
- mobile-friendly
- playful but not childish
- culturally grounded where relevant

Avoid:

- enterprise dashboard feel
- classroom admin dominance
- dark esports mood
- overly chess-specific visuals

## 14. Acceptance Criteria

This pivot is successful when all of the following are true:

1. Visiting `/` no longer redirects to a coach dashboard or coach login
2. A new user can understand the product without seeing “coach” first
3. The landing page clearly presents Tactical Path as a multi-game strategy platform
4. The app exposes Morris / Mlabalaba, Checkers, Tic Tac Toe, and Solitaire in the product IA
5. At least Tic Tac Toe and one other non-chess game are playable in the first usable build
6. Legacy coach flows no longer define the product

## 15. What Jules Should Deprioritize

Do not spend early time on:

- coach marketplace features
- classroom orchestration polish
- deep analytics
- billing
- advanced multiplayer infrastructure
- engine-like chess analysis

The main job is the product pivot:

**from coach dashboard to public game platform**

## 16. Build Request to Jules

Jules should treat this as a directed product refactor, not a greenfield app.

Requested outcome:

1. pivot Tactical Path away from coach-first routing and copy
2. create a public landing page and game library
3. introduce a scalable multi-game architecture
4. ship the first playable versions of:
   - Tic Tac Toe
   - Checkers
   - Morris / Mlabalaba
   - Solitaire or a clean scaffold if Solitaire must land in a second pass
5. leave the codebase in a state where more classic games can be added without another rewrite

## 17. One-Line Product Positioning

Tactical Path is a mobile-friendly strategy games platform where players can quickly jump into classic games like Mlabalaba, Checkers, Tic Tac Toe, and Solitaire without being forced through a coach-only experience.
