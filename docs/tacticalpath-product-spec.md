# TacticalPath Product Spec

Version: v1 planning baseline
Status: Approved planning direction
Date: 2026-04-08

## 1. Product Thesis

TacticalPath helps scholastic chess players build fundamental skills and stop blundering through a safe, all-in-one platform where playing games instantly generates kid-friendly, adaptive tactical drills.

## 2. Product Type

TacticalPath is a scholastic chess classroom platform.

It is not a generic consumer chess app.
It is not a public social network.
It is not a raw engine analysis UI.
It is not a broad coach marketplace.

The product serves two connected audiences:

- Students: safe play plus immediate skill-building
- Coaches: classroom orchestration plus tactical insight

The first economic buyer is the coach, chess club organizer, or school program.
The parent is a trust stakeholder in v1, not a product user.

## 3. Primary User

### First user to win with

Chess Club Chloe

- Age: 11
- Context: 6th grade scholastic chess student
- Rating: around 700 scholastic Elo
- Devices: school Chromebook and family iPad
- Pattern: understands tactical concepts in theory but misses them in real games
- Pain: existing analysis tools are too abstract, too harsh, and too adult

### User promise

After a real game, TacticalPath explains one important mistake in simple language and gives Chloe a short set of practice drills so she knows exactly how to improve next time.

## 4. Customer and Buyer Model

### v1 sales motion

Direct outreach to local scholastic coaches and club organizers.

- Founder recruits 3 to 5 pilot coaches manually
- Founder runs white-glove onboarding
- Free pilot first

### v1 monetization

Free pilot for 4 weeks.

Post-pilot paid package:

- Classroom License
- Flat rate: about $99 per month or $400 per semester
- Includes up to 30 active students
- Includes live classroom play, core 5-theme drill library, and weekly parent-ready PDF reports

### Why not per-seat pricing first

Schools and clubs prefer predictable flat pricing.
A simple classroom package is easier for coaches, PTAs, and club budgets to approve.

## 5. Anti-Goals

TacticalPath is not:

- an unmoderated social network
- a public matchmaking platform
- a broad coach directory or marketplace
- a long-form chess course library
- a raw Stockfish analysis product for adults
- a consumer-first subscription app in v1

## 6. Core Loop

The product loop is:

1. Student plays a live game against a classmate or a bot
2. System finds the single most teachable turning point
3. System explains the mistake with arrows plus one simple sentence
4. Student completes 3 targeted drills from a verified puzzle library
5. Student gains theme mastery progress
6. Student returns to the classroom waiting room / mastery map

This loop must be fully automated in v1.

## 7. v1 User Roles

### Student

Can:

- log in with a classroom-specific visual login card
- play live games versus classmates
- play bots when assigned or while waiting
- complete post-game drills
- view their own theme mastery map

Cannot:

- access public matchmaking
- use free-text chat
- edit account details
- see or influence hidden rating

### Coach / Teacher

Can:

- create and manage classrooms
- import student roster
- print login cards
- start and pause sessions
- auto-pair students
- manually pair students
- force bot pairings
- reset student passwords
- move students between classrooms
- pause or deactivate accounts
- delete accounts
- view heatmaps and reports
- export student progress sheets

Cannot:

- edit theme mastery manually
- edit hidden ratings
- alter game history

### Deferred roles

Not in v1:

- Parent portal
- School admin / district admin

## 8. Classroom Flow

### Pre-session coach setup

1. Create organization and classroom
2. Bulk add student roster using first name + last initial
3. Generate printable login cards with 3-picture passwords
4. Set session defaults:
   - time control
   - bot fallback on/off
   - post-game drills on/off
5. Review previous heatmap if returning class

### 45-minute club flow

0:00 to 0:05

- students log in using visual login cards
- student lands in classroom waiting room / mastery map

0:05 to 0:10

- coach reviews blindspot heatmap
- coach teaches quick opening lesson from prior session data

0:10 to 0:35

- coach taps Auto-Pair Class
- live student-vs-student games begin
- when a game ends, student is pushed into post-game lesson and 3 drills
- students who finish early can play a bot while waiting

0:35 to 0:45

- coach taps Pause Play
- coach reviews class progress and gives shoutouts
- session ends

## 9. Gameplay Modes

### Build in v1

1. Student vs Classmate Live
2. Student vs Bot
3. Coach-created challenge positions

### Defer

- asynchronous play
- classroom mini-tournaments

### Product principle

Student-vs-classmate live play is the emotional center of the product.
That is what makes the post-game lesson matter.

## 10. Student UX Model

### Between rounds

The student home screen is a Mastery Map that doubles as a waiting room.

It shows:

- current classroom status banner
- per-theme progress bars
- one obvious button: Play a Bot while you wait

### Post-game lesson

The student sees:

1. friendly result screen
2. board reset to the turning point
3. arrows highlighting the critical mistake
4. one simple sentence explanation
5. button to practice the relevant theme
6. 3 targeted puzzles
7. short mastery gain summary
8. return to waiting room

### Tone

- positive
- non-punitive
- growth-oriented
- minimal notation
- highly visual

### No v1 leaderboards

Do not rank students against each other publicly.
Use:

- personal bests
- theme mastery growth
- classroom milestones

## 11. Coach UX Model

The coach product is about control and insight.

The key coach surfaces are:

- classroom roster
- active waiting students
- auto-pairing controls
- manual pair / bot assignment controls
- classroom blindspot heatmap
- session status controls
- exportable progress reports

### Coach magic moment

The Classroom Blindspot Heatmap.

Example insight:

- 70% of your students missed a back-rank mate this week

This should lead directly to a coach action:

- teach it tomorrow
- eventually generate demo board lesson material

## 12. Visual Identity

Target tone: Premium-Academic.

The product should feel like Duolingo meets Google Classroom, not a dark esports dashboard.

### Visual principles

- light mode by default
- soft blues, warm off-whites, strong green success states
- highly legible rounded sans-serif typography
- chunky touch-friendly controls
- low clutter
- child-readable layouts
- parent- and teacher-trustworthy polish

### Avoid

- dark hacker / esports mood
- aggressive “AI elite performance” copy
- adult subscription-first framing
- dense dashboards as student home experience

## 13. Live Game Architecture

### Source of truth

Server-authoritative game state over WebSockets.

The server owns:

- chess legality validation
- canonical board state
- clocks
- move log
- reconnect state
- disconnect handling

The client sends move intent only.
The server validates and broadcasts the updated game state to both players.

### Why

- school Wi-Fi is unreliable
- kids refresh tabs and close Chromebook lids
- server authority reduces sync issues and trust failures

## 14. Disconnect and Fallback Policy

### Student disconnects mid-game

- server detects dropped socket
- 60-second reconnect timer begins
- if student reconnects, game resumes from server state
- if timer expires, server auto-resigns disconnected player
- connected player sees win state and enters drill loop

### If auto-pairing fails

- coach can trigger Pair All with Bots
- coach can fall back to physical boards while app remains puzzle server

### If turning-point detection times out

- client waits up to 5 seconds
- if no result, system falls back to General Review
- student receives 3 puzzles from lowest mastery theme
- never leave child on a permanent loading state

## 15. Turning-Point Detection Policy

The goal is not “best engine report.”
The goal is “best teachable lesson.”

### Rule

Pick the first major mistake that maps cleanly to one of the 5 launch themes.

If multiple mistakes exist:

- prioritize curriculum fit over raw evaluation swing
- prefer earlier major mistake over later cascade effects

### If no clean theme match exists

Fallback to General Review and assign drills from the student’s lowest mastery theme.

### Child-facing output format

- board arrows
- one simple sentence
- no notation-heavy report
- no deep engine line dump

## 16. Launch Curriculum

### v1 themes

1. Hanging Pieces
2. Missed Captures
3. 1-Move Checkmates
4. Basic Forks
5. Basic Pins

### Puzzle library model

- 5 themes
- 3 rating bands
- 50 puzzles per theme per band
- total launch set: 750 puzzles

### Rating bands

- Beginner: under 600
- Intermediate: 600 to 1000
- Advanced: 1000+

### Puzzle quality rule

All launch puzzles must be manually verified by the founder or a trusted USCF-rated founding team member.

## 17. Mastery and Skill Model

### Visible to student

Per-theme mastery levels.

Examples:

- Forks: Level 3
- Pins: Level 2
- Checkmates: Level 4

This promotes growth mindset and avoids Elo discouragement.

### Hidden from student

Internal pairing rating, such as Elo or Glicko.

Used for:

- pairing fairness
- bot difficulty scaling
- possibly internal drill difficulty support

## 18. Data Model Boundaries

### Store for students in v1

- first name
- last initial
- hashed picture-password
- classroom ID
- hidden pairing rating
- visible theme mastery state
- game history
- drill history

### Explicitly do not store in v1

- email addresses
- phone numbers
- dates of birth
- real photos
- free-text messages
- third-party marketing pixels or tracking cookies in student app

### Identity separation principle

Student identity-lite data must be separable from gameplay and analytics data so deletion and anonymization are straightforward.

## 19. Coach Permissions

### Coach can edit

- first name / last initial
- classroom assignment

### Coach can action

- reset password
- pause account
- deactivate account
- delete account
- manually pair students
- force bot assignment

### Coach cannot change

- game history
- theme mastery
- hidden rating

## 20. Compliance Posture

v1 posture: COPPA-by-design via school-controlled accounts.

Operational behavior:

- coach creates student accounts
- no student email required
- no open social features
- no PII beyond minimal classroom identity
- coach can delete student account
- delete action hard-deletes student identity and login data
- retained game records are anonymized if kept for aggregate analytics

Note:

This is a product operating posture, not legal advice. Legal review is still required before broader rollout.

## 21. Content Operations

### v1 content owner

Founder is the primary content curator and quality gate.

### v1 ingestion model

Founder-only CSV import through a simple admin tool.

Required puzzle fields:

- FEN
- solution moves
- theme tag
- rating band
- kid-friendly explanation
- verification metadata

### Why not CMS first

Speed and trust matter more than authoring flexibility in the pilot.

## 22. Reporting

### Week 1 export artifact

Student Progress Sheet

One-page PDF per student that the coach can send home.

It should show:

- games played this week
- puzzles solved this week
- simple theme mastery chart
- clear improvement story

### Strategic purpose

This report proves to parents and principals that TacticalPath is structured learning, not just recreational screen time.

## 23. Instrumentation

### Most important telemetry from day one

WebSocket reliability and disconnect reasons.

Track at minimum:

- session starts
- active sockets
- disconnect counts
- reconnect success rate
- average game completion rate
- auto-resign due to disconnect
- pairing success rate
- turning-point analysis success / timeout rate
- post-game drill completion rate

### Non-negotiable product KPIs

Child KPI:

- Post-game Drill Completion Rate > 75% by Week 4

Coach KPI:

- Weekly Active Sessions
- Coaches must keep using Auto-Pairing instead of reverting to offline workflows

## 24. Pilot Plan

### Pilot size

- 3 local clubs or schools
- 3 to 5 coaches
- around 100 students total

### Pilot duration

- 4 weeks
- 1 to 2 sessions per week per school

### Success criteria

- system handles 30-student simultaneous live session without catastrophic failure
- coaches use blindspot heatmap to teach at least one real lesson
- post-game drill completion stays above 75% in Week 4
- at least 2 of 3 pilot coaches ask to keep using the product before pricing is raised

## 25. Founder-Ops Playbook

During pilot, founder manually handles:

- coach onboarding
- roster setup
- login card generation
- puzzle ingestion
- weekly parent report production
- live-session support for first 2 sessions per club

### Support model

For first two sessions per coach:

- founder available on Zoom or WhatsApp
- founder watches server logs and active connections live
- by Week 3, support shifts toward asynchronous to test product independence

### Wizard-of-oz boundary

Allowed to manualize:

- onboarding
- reporting
- content ingestion

Not allowed to manualize:

- live play
- turning-point detection trigger
- drill assignment in-session

## 26. Build Now vs Defer

### Build now

- classroom and roster model
- coach dashboard basics
- student safe login
- server-authoritative live play
- pairing engine
- bot fallback
- game logs
- turning-point detection mapped to 5 themes
- 3-puzzle drill loop
- mastery map
- heatmap
- exportable reports
- reliability instrumentation

### Defer

- parent portal
- district admin
- public social features
- self-serve billing
- tournaments
- asynchronous play
- projector live observation mode
- custom-generated puzzles
- broad student analytics pages
- marketplace features

## 27. v1, v1.5, v2 Roadmap

### v1

Prove the classroom loop.

- live play works
- coach can run club session
- student completes post-game drills
- coach gets usable heatmap
- founder can deliver pilot support

### v1.5

Reduce founder labor and deepen coach value.

- projector / observation mode
- improved coach lesson generation from real student games
- automated progress PDF generation
- richer coach reporting
- stronger bot tools
- expanded puzzle set

### v2

Expand platform scope only after pilot proof.

- parent portal
- school admin multi-classroom support
- billing and license management
- larger curriculum and content tooling
- advanced coach operations
- possible home practice outside club sessions

## 28. Anti-Restart Rules

Do not violate these without deliberate strategic review:

- Do not drift back into adult consumer chess UX
- Do not expose raw engine complexity to children
- Do not add public social systems before safety is proven
- Do not build parent complexity before coach retention is real
- Do not expand themes before the first 5-theme loop is trusted
- Do not compromise server-authoritative gameplay for prototyping speed
- Do not let reporting automation distract from classroom reliability

## 29. The 3 Promises the Pilot Must Keep

1. Zero Classroom Chaos
   - sessions run smoothly
   - no catastrophic server failures

2. Pedagogical Trust
   - every assigned puzzle is kid-safe and relevant

3. The Aha Dashboard
   - coach leaves with a clear understanding of what to teach next