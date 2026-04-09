# OpenClaw Prompts

## 1. Product Planning Prompt

Use the TacticalPath repo at `C:\Users\THEMBA\Downloads\TacticalPath`.

Read these first:

- `docs/tacticalpath-product-spec.md`
- `.agents/skills/tacticalpath-evolution-planner/SKILL.md`
- `.agents/skills/tacticalpath-evolution-planner/references/current-state.md`
- `.agents/skills/tacticalpath-evolution-planner/references/question-bank.md`

Important constraints:

- TacticalPath is now a scholastic chess classroom platform
- Do not drift back into an adult consumer chess app
- Do not suggest public social features, public matchmaking, or raw engine-heavy child UI
- Do not assume parent portal, billing UI, or coach marketplace are v1 priorities
- Preserve the core loop: live classmate play -> one turning-point lesson -> 3 targeted drills -> mastery progress
- Keep the product coach-led and school-safe
- Treat classroom reliability and pedagogical trust as higher priority than AI flash
- Do not run heavy builds, audits, or long test suites unless explicitly asked

Your job:

1. Teach back the current product definition from the spec
2. Identify contradictions between the current repo UI and the scholastic product direction
3. Propose the next highest-leverage planning or implementation step
4. Keep recommendations grounded in the approved v1 / v1.5 / v2 roadmap
5. Challenge any idea that increases restart risk

Output format:

- Reality check
- Top contradictions with current app
- Recommended next step
- Risks if we ignore it

## 2. Architecture Planning Prompt

Use the TacticalPath repo at `C:\Users\THEMBA\Downloads\TacticalPath`.

Read `docs/tacticalpath-product-spec.md` first.

Task:

Design the minimum production-shaped architecture for TacticalPath v1 as a scholastic classroom product.

Focus on:

- server-authoritative live play over WebSockets
- classroom / coach / student domain model
- turning-point detection pipeline mapped to 5 themes
- verified puzzle assignment flow
- disconnect handling and graceful degradation
- telemetry for session reliability

Constraints:

- optimize for 30-student live classroom sessions
- optimize for safety, low PII, and coach-controlled accounts
- do not design for public internet multiplayer
- do not overbuild parent or district complexity into v1
- do not assume fully custom-generated puzzles in v1
- do not run heavy checks

Output format:

- system components
- domain entities
- key flows
- failure cases
- what must be stable now vs what can wait

## 3. Implementation Prompt

Use the TacticalPath repo at `C:\Users\THEMBA\Downloads\TacticalPath`.

Read `docs/tacticalpath-product-spec.md` first and treat it as the source of truth.

Task:

Implement only the next approved slice of TacticalPath without regressing into the old adult solo-training product.

Constraints:

- preserve scholastic classroom direction
- keep student UX light, warm, and child-readable
- keep coach UX operational and clear
- prefer smallest root-cause changes
- do not add features outside v1 scope
- do not run heavy builds or broad audits unless explicitly asked

Before coding:

- briefly state what part of the spec this slice serves
- list what you will not touch
- call out any mismatch between existing repo structure and target product

After coding:

- summarize what changed
- note what remains mocked
- list any follow-up needed to stay aligned with the spec