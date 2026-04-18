# Shelved: Vision A — Scholastic Chess Classroom Platform

This directory contains archived code from TacticalPath's original product direction:
a classroom-based scholastic chess training platform for coaches and students.

**Status:** Shelved for potential use in a separate future app.
**Date archived:** 2026-04-17

## What's here

- `src/pages/coach/` — Coach login and classroom dashboard
- `src/pages/student/` — Student classroom login, waiting room, live game, post-game lesson, drill flow, mastery summary
- `src/context/ClassroomContext.tsx` — Mock classroom state and student data
- `src/context/AuthContext.tsx` — Dual coach (Supabase Auth) + student (picture password) auth
- `src/hooks/useClassroomManagement.ts` — Coach CRUD operations
- `src/hooks/useRealtime.ts` — Supabase Realtime for live classroom game sync
- `src/lib/analysis-pipeline.ts` — Stockfish → Gemini → Drills post-game pipeline
- `src/lib/coaching-service.ts` — Coaching service module
- `src/lib/auth-utils.ts` — Picture password hashing utilities
- `src/lib/database.types.ts` — TypeScript types matching Supabase classroom schema
- `src/components/ClassroomLayout.tsx` — Student-facing layout wrapper
- `src/components/CoachLayout.tsx` — Coach-facing layout wrapper
- `supabase/migrations/001_initial_schema.sql` — Full classroom database schema with RLS policies
- `docs/tacticalpath-product-spec.md` — Complete product specification (692 lines)
- `docs/JULES_TACTICAL_PATH_BUILD_BRIEF.md` — Multi-game pivot brief
- `docs/openclaw-prompts.md` — Prompt scaffolding

## Why it was shelved

TacticalPath's active direction is a chess-led coaching app, not a classroom platform.
The classroom product has a strong foundation and may become a separate app.
