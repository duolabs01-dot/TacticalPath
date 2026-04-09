# TacticalPath Current State

This reference is the grounding layer for planning TacticalPath. Use it to teach the user what the repo already contains before asking for future decisions.

## What the app is today

- Single-page React app built with Vite and TypeScript
- Mobile-first chess training product concept
- Route-driven UI with a shared layout and bottom nav
- Product themes already implied in the interface:
  - AI game analysis
  - personalized study plans
  - puzzle bank and puzzle play
  - coach marketplace
  - assessments
  - skill insights
  - paid subscription

## Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS v4
- `react-router-dom`
- `chess.js`
- `react-chessboard`

## Route surface

The app already has screens for:

- landing
- login
- signup
- dashboard
- study plan
- analyze
- profile
- skill insights
- puzzle bank
- puzzle play
- checkout
- coach review
- coach connect
- game analysis
- italian game
- settings
- assessment
- subscription

## What is real

These are actual interactive behaviors in the code, even though they are still local-only:

### Theme system

- Theme toggles between light and dark
- Theme preference is saved in `localStorage`

### Puzzle play

- One fixed puzzle is implemented using `chess.js`
- Move validation works
- The app determines correct vs incorrect answer locally

### Game analysis replay

- One hardcoded PGN is loaded
- Move stepping and autoplay work
- Board state updates correctly

## What is mocked or prototype-only

These product areas are mostly presentation, navigation, and hardcoded data:

### Auth

- Login and signup screens are UI only
- No auth provider, backend, or session logic
- Login/signup just route into the dashboard

### Game ingestion and analysis

- Analyze screen accepts pasted PGN in the UI
- It does not actually pass PGN into a real analysis pipeline
- The analysis screen shows fixed data from a hardcoded sample game

### AI coaching

- The UI heavily implies AI-generated coaching and recommendations
- The app source does not currently call Gemini or any other model
- There is no engine-backed or model-backed move evaluation in the frontend code

### Subscription and checkout

- Pricing and checkout pages are UI only
- No payment processor integration
- No subscription state, billing logic, or entitlements

### Coach marketplace

- Coach cards, reviews, and booking affordances are mocked
- Buttons trigger alerts or dead-end flows
- No availability, messaging, or marketplace logic exists

### Assessment and insights

- Stats and trend cards are hardcoded
- No real analytics pipeline or stored player history exists

### Search, filters, and support links

- Many search bars are visual only
- Multiple links use `to="#"`
- Several buttons show "coming soon" alerts

## Product implications already baked into the UI

Even without backend logic, the current design suggests a product direction:

- premium-feeling mobile chess companion
- solo training plus optional human coaching
- progression and performance tracking
- AI as an explanatory layer, not only raw engine output
- subscription monetization

These assumptions need to be validated during planning, not inherited blindly.

## Technical implications already baked into the repo

- The app is frontend-only right now
- Routing is client-side only
- There is no data model, API layer, or persistence layer in the app source
- There is no role system, permission system, or admin surface
- The architecture has not yet committed to:
  - local-first vs cloud-first
  - browser-only vs backend-assisted analysis
  - web app only vs mobile app later
  - single-user product vs multiplayer/community product

## Scaffolding leftovers

There are signs the project was exported from AI Studio:

- README references AI Studio
- `.env.example` references `GEMINI_API_KEY`
- Vite config injects `process.env.GEMINI_API_KEY`

But there is no actual Gemini usage in the current `src` code.

There are also likely-unused dependencies in `package.json`, including:

- `@google/genai`
- `dotenv`
- `express`
- `motion`
- `recharts`

Treat these as clues, not implemented capabilities.

## Planning caution

Do not let the current UI imply that the product strategy is already settled.

The repo currently proves:

- visual direction
- feature ambition
- some chessboard interaction

It does not yet prove:

- demand
- core user segment
- retained core loop
- payment conversion
- backend architecture
- AI quality bar
- operational feasibility