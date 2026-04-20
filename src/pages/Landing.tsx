import { motion } from "motion/react";
import { ArrowRight, Brain, Play, Sparkles, Swords, Target } from "lucide-react";
import { Link } from "react-router-dom";

const BOARD_SQUARES = Array.from({ length: 64 }, (_, index) => ({
  id: index,
  isDark: (Math.floor(index / 8) + (index % 8)) % 2 === 1,
}));

const HERO_PIECES = [
  { label: "♞", left: "18%", top: "18%", tone: "text-[#f8ecda]" },
  { label: "♛", left: "44%", top: "12%", tone: "text-[#1f140d]" },
  { label: "♟", left: "62%", top: "41%", tone: "text-[#20140d]" },
  { label: "♙", left: "28%", top: "58%", tone: "text-[#f8ecda]" },
  { label: "◎", left: "72%", top: "68%", tone: "text-[#d9a352]" },
];

const DIFFERENCE_LINES = [
  {
    label: "Chess first",
    title: "Full games against a real engine, with one clear post-game lesson instead of noisy overlays.",
  },
  {
    label: "Morabaraba matters",
    title: "A distinct board with local cultural weight, not a token side mode buried under chess clone UI.",
  },
  {
    label: "Daily rhythm",
    title: "One puzzle, one streak, one reason to come back tomorrow and feel sharper than yesterday.",
  },
];

const BOARD_LINKS = [
  {
    to: "/play/chess",
    eyebrow: "Core board",
    title: "Chess",
    summary: "Play the engine, find the turning point, rematch immediately.",
    tone:
      "border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(216,146,59,0.22),transparent_28%),linear-gradient(145deg,#120c08_0%,#241711_100%)] text-[#f8ecda]",
  },
  {
    to: "/morris",
    eyebrow: "Featured board",
    title: "Morabaraba",
    summary: "Build mills, block lines, and learn a board that deserves hero treatment.",
    tone:
      "border-[#d6c2a5] bg-[radial-gradient(circle_at_top_left,rgba(85,103,76,0.18),transparent_30%),linear-gradient(145deg,#f1e4cf_0%,#e5d2b4_100%)] text-[#241711]",
  },
];

const QUICK_LINKS = [
  { to: "/checkers", title: "Checkers", summary: "Forced captures and promotion pressure." },
  { to: "/tictactoe", title: "Tic Tac Toe", summary: "Fast pattern recognition and fork discipline." },
  { to: "/daily", title: "Daily Board", summary: "A single puzzle to keep your streak alive." },
  { to: "/multiplayer", title: "Live Rooms", summary: "Share a room code and challenge a friend." },
];

export function Landing() {
  return (
    <div className="bg-[#120c08] text-[#f8ecda]">
      <section className="relative isolate min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(216,146,59,0.32),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(85,103,76,0.22),transparent_24%),linear-gradient(180deg,#120c08_0%,#1a120d_45%,#251711_100%)]" />

          <motion.div
            initial={{ opacity: 0, scale: 1.06, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="tp-hero-board tp-hero-grid absolute right-[-22vw] top-[-6vh] h-[88vh] w-[92vw] rounded-[3rem] border border-white/10 sm:right-[-12vw] sm:w-[76vw] lg:right-[-4vw] lg:top-[4vh] lg:h-[84vh] lg:w-[58vw]"
          >
            <div className="grid h-full w-full grid-cols-8">
              {BOARD_SQUARES.map((square) => (
                <div
                  key={square.id}
                  className={square.isDark ? "bg-[#3b271d]/80" : "bg-[#efe2c8]/28"}
                />
              ))}
            </div>

            <svg
              viewBox="0 0 100 100"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <path
                d="M17 72C25 62 38 53 54 45C63 40 72 33 78 21"
                fill="none"
                stroke="rgba(216,146,59,0.92)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="4 4"
              />
              <path
                d="M73 22L79 19L77 26"
                fill="none"
                stroke="rgba(216,146,59,0.92)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {HERO_PIECES.map((piece, index) => (
              <motion.span
                key={piece.label + piece.left}
                initial={{ opacity: 0, scale: 0.5, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.18 + index * 0.08, duration: 0.55 }}
                className={`pointer-events-none absolute text-[clamp(2.4rem,5vw,4.8rem)] font-black ${piece.tone}`}
                style={{ left: piece.left, top: piece.top }}
                aria-hidden="true"
              >
                {piece.label}
              </motion.span>
            ))}
          </motion.div>

          <div className="absolute inset-0 bg-[linear-gradient(90deg,#120c08_0%,rgba(18,12,8,0.88)_38%,rgba(18,12,8,0.38)_68%,rgba(18,12,8,0.92)_100%)] lg:bg-[linear-gradient(90deg,#120c08_0%,rgba(18,12,8,0.94)_34%,rgba(18,12,8,0.4)_62%,rgba(18,12,8,0.12)_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-10 pt-6 sm:px-10 lg:px-12">
          <header className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d6b78d]/30 bg-[#f7ead4] text-sm font-black text-[#1c120c]">
                TP
              </div>
              <div>
                <p className="tp-kicker text-[#d7b17b]">TacticalPath</p>
                <p className="text-sm font-medium text-[#f1debd]">Board training with a pulse.</p>
              </div>
            </div>

            <Link
              to="/play"
              className="tp-quiet-link inline-flex items-center gap-2 rounded-full border border-[#d6b78d]/30 px-4 py-2 text-sm font-bold text-[#f7ead4]"
            >
              Enter boards
              <ArrowRight className="h-4 w-4" />
            </Link>
          </header>

          <div className="mt-auto max-w-2xl pb-8 pt-16 sm:pb-14">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="tp-kicker text-[#d7b17b]"
            >
              Chess first. Morabaraba in the mix.
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.58 }}
              className="tp-display mt-4 text-[clamp(4rem,14vw,8.8rem)] leading-[0.86] text-[#fff4df]"
            >
              TACTICALPATH
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.62 }}
              className="mt-5 max-w-2xl text-[clamp(1.7rem,4vw,3.15rem)] font-black leading-tight text-[#f7ead4]"
            >
              Turn one move into tomorrow's edge.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.58 }}
              className="mt-5 max-w-xl text-base leading-8 text-[#e6d7bd] sm:text-lg"
            >
              Play a real board, get one clear coaching insight, and go straight into the rematch with a sharper idea in your hands.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.55 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/play/chess"
                className="inline-flex items-center gap-2 rounded-full bg-[#d58e3f] px-6 py-3 text-sm font-black text-[#1c120c] shadow-[0_18px_40px_rgba(213,142,63,0.28)] transition hover:translate-y-[-1px] hover:bg-[#e5a052]"
              >
                <Play className="h-4 w-4" />
                Play chess now
              </Link>
              <Link
                to="/daily"
                className="inline-flex items-center gap-2 rounded-full border border-[#d6b78d]/30 bg-white/5 px-6 py-3 text-sm font-bold text-[#f7ead4] transition hover:bg-white/10"
              >
                <Target className="h-4 w-4" />
                Solve today's board
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <main className="bg-[#f5ecde] text-[#201510]">
        <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
          <div className="max-w-2xl">
            <p className="tp-kicker text-[#8e4a2f]">Why it feels different</p>
            <h2 className="tp-display mt-3 text-4xl leading-tight text-[#201510] sm:text-5xl">
              TacticalPath should feel like a training room, not another SaaS dashboard.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-[#5d4a3f]">
              The current product is real where it matters most today: boards, bots, puzzles, replays, and quick feedback loops. The design should make that feel alive.
            </p>
          </div>

          <div className="mt-10 border-t border-[#d7c4a8]">
            {DIFFERENCE_LINES.map((line) => (
              <div
                key={line.label}
                className="grid gap-3 border-b border-[#d7c4a8] py-6 lg:grid-cols-[12rem,minmax(0,1fr)] lg:items-start"
              >
                <p className="tp-kicker text-[#8e4a2f]">{line.label}</p>
                <p className="text-lg font-semibold leading-8 text-[#201510]">{line.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-[#dcc8ab] bg-[#efe3cf]">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
            <div className="max-w-2xl">
              <p className="tp-kicker text-[#55674c]">Choose your board</p>
              <h2 className="tp-display mt-3 text-4xl leading-tight text-[#201510] sm:text-5xl">
                Start on a board worth replaying.
              </h2>
              <p className="mt-4 text-base leading-8 text-[#5d4a3f]">
                Chess leads because the coaching loop is deepest there. Morabaraba stays in the spotlight because it gives TacticalPath a stronger identity than another generic tactics app.
              </p>
            </div>

            <div className="mt-10 grid gap-4">
              {BOARD_LINKS.map((board) => (
                <Link
                  key={board.to}
                  to={board.to}
                  className={`group overflow-hidden rounded-[2.5rem] border p-6 transition hover:translate-y-[-2px] ${board.tone}`}
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-xl">
                      <p className="tp-kicker">{board.eyebrow}</p>
                      <h3 className="tp-display mt-3 text-4xl">{board.title}</h3>
                      <p className="mt-3 text-base leading-8 opacity-80">{board.summary}</p>
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em]">
                      Enter board
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group rounded-[2rem] border border-[#d7c4a8] bg-[#f7f0e4] px-5 py-5 transition hover:border-[#c8923b] hover:bg-[#fbf5ea]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-[#201510]">{link.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#5d4a3f]">{link.summary}</p>
                    </div>
                    <ArrowRight className="mt-1 h-5 w-5 text-[#8e4a2f] transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
          <div className="overflow-hidden rounded-[2.5rem] border border-[#d7c4a8] bg-[#201510] px-6 py-10 text-[#f7ead4] sm:px-10">
            <div className="max-w-3xl">
              <p className="tp-kicker text-[#d7b17b]">One clear next step</p>
              <h2 className="tp-display mt-3 text-4xl leading-tight sm:text-5xl">
                Start with a real game, then come back tomorrow for the next board.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#e6d7bd]">
                TacticalPath is strongest when it keeps you in motion: play, review, rematch, return. No fake productivity wallpaper needed.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-[#d58e3f] px-6 py-3 text-sm font-black text-[#1c120c] transition hover:bg-[#e5a052]"
              >
                <Sparkles className="h-4 w-4" />
                Open your training board
              </Link>
              <Link
                to="/multiplayer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-bold text-[#f7ead4] transition hover:bg-white/10"
              >
                <Swords className="h-4 w-4" />
                Challenge a friend
              </Link>
              <Link
                to="/daily"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-bold text-[#f7ead4] transition hover:bg-white/10"
              >
                <Brain className="h-4 w-4" />
                Keep the streak alive
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
