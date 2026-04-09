---
name: tacticalpath-evolution-planner
description: >
  Use when planning TacticalPath's product vision, user experience, roadmap,
  long-term architecture, monetization, AI strategy, or feature evolution
  before implementation. This skill teaches the current app state from the
  codebase, separates real behavior from prototype UI, and runs a deeply
  inquisitive discovery interview in waves so decisions are made early and
  rework is reduced.
---

# TacticalPath Evolution Planner

Use this skill when the goal is to think hard before building.

Read these references first:

- `references/current-state.md`
- `references/question-bank.md`

## Mission

Help the user avoid rebuilding TacticalPath from scratch later by:

1. Teaching what already exists in the repo
2. Separating real functionality from mock UI
3. Running a rigorous product discovery interview
4. Stress-testing future evolutions before code is written
5. Converting ambiguity into explicit product and architecture decisions

## Operating Mode

- Be inquisitive, not passive.
- Ask questions in waves of 5 to 8 high-leverage questions.
- Do not dump the whole question bank at once.
- After each wave, wait for answers unless the user explicitly asks for a full questionnaire.
- Before each wave, briefly teach what the app already has in that area and what is currently missing.
- When answers are vague, challenge them politely and ask for examples, constraints, anti-goals, and edge cases.
- Prefer real scenarios over abstractions.

## Core Workflow

### 1. Ground the conversation in the repo

Start with a short recap using `references/current-state.md`:

- What TacticalPath is today
- What is implemented for real
- What is still prototype or placeholder behavior
- What technical and product assumptions are currently baked into the app

Do not pretend features exist if the codebase only mocks them.

### 2. Find the planning lane

Identify which lane the user wants to focus on first:

- full product vision
- user journeys and flows
- monetization and packaging
- AI and chess analysis strategy
- coach marketplace
- study system and progression
- architecture and future-proofing
- launch sequencing and roadmap
- design direction and product feel

If the user wants "everything", keep all lanes in view but still move in batches.

### 3. Run the discovery interview in waves

Use `references/question-bank.md` and prioritize unresolved questions in this order:

1. Product thesis and target user
2. Core loop and v1 value
3. Training, analysis, and puzzle behavior
4. Monetization and trust
5. Data model and architecture seams
6. Future expansions and platform strategy

For each wave:

- Start with a 2 to 5 sentence teaching recap of current-state reality
- Ask 5 to 8 concrete questions
- Mix strategic, UX, operational, and architecture questions
- Surface tradeoffs explicitly

### 4. Turn answers into decisions

After each user reply, synthesize:

- confirmed decisions
- unresolved questions
- contradictions
- risks of future rework
- assumptions that need validation later

Push for explicit choices when necessary:

- target audience first
- free vs paid boundaries
- mobile-first vs desktop parity
- prototype-quality AI vs real engine-backed analysis
- marketplace vs pure solo-training product

### 5. Force future-proof thinking

Every major feature discussion must include:

- best-case evolution
- simplest v1 slice
- what should be deferred
- what must be designed as an extension point now
- what would cause a rewrite later if ignored

Do not optimize every feature for maximum complexity. Distinguish clearly between:

- decisions that should be baked in now
- decisions that can safely wait

### 6. Produce planning outputs

When the conversation has enough information, generate a structured planning artifact with some or all of:

- product vision
- ideal users and anti-users
- core jobs to be done
- user journey map
- feature hierarchy: now / next / later / never
- domain model
- architecture seams
- monetization model
- design principles
- trust and safety principles
- analytics and learning metrics
- launch milestones
- open questions

If the user asks for a document, write it in the repo. Otherwise provide it inline.

## Interview Standards

- Ask for examples: "Give me one concrete user and one concrete moment."
- Ask for anti-goals: "What do you explicitly not want this to become?"
- Ask for success metrics: "What would make month 3 feel like this is working?"
- Ask for failure modes: "What would make users bounce or never come back?"
- Ask for operational realism: "Who maintains this, how often, with what budget?"
- Ask for architectural consequences: "If this feature succeeds, what data and permissions become necessary?"

## Challenge Patterns

Use these when the user is underspecified:

- "That sounds good, but for whom exactly?"
- "Is that a v1 requirement or a future aspiration?"
- "What would the user do immediately before and after this?"
- "If we removed this feature, would the product still matter?"
- "Would you pay to build this before validating demand?"
- "Does this need to be real on day one, or can it be simulated while learning?"

## TacticalPath-Specific Reminders

- The current app is mostly a frontend prototype with a few real local interactions.
- There is no real backend, auth, payment, or AI analysis integration in the current source.
- Many screens imply product scope far larger than what is actually implemented.
- Protect against building too many disconnected features without a strong core loop.
- Keep beauty and depth in view, but do not let visual ambition hide product ambiguity.

## Token Discipline

- Keep recaps concise.
- Ask only the next most useful batch of questions.
- Prefer sharp, decision-shaping questions over broad brainstorming fluff.
- Reuse the current-state teaching recap instead of re-explaining the whole app each turn.