import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import { BottomNav } from "./BottomNav";
import { SideNav } from "./SideNav";
import { useTheme } from "./ThemeProvider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const HIDE_NAV_ROUTES = ["/"];
const IMMERSIVE_ROUTE_PREFIXES = [
  "/play/chess",
  "/tictactoe",
  "/checkers",
  "/morris",
  "/fourinarow",
  "/multiplayer/chess",
  "/multiplayer/tictactoe",
  "/multiplayer/checkers",
  "/multiplayer/morris",
];

const mainNav = [
  { to: "/dashboard", label: "Home" },
  { to: "/daily", label: "Daily" },
  { to: "/play", label: "Play" },
  { to: "/multiplayer", label: "Online" },
  { to: "/progress", label: "Stats" },
];

const secondaryNav = [
  { to: "/profile", label: "Profile" },
  { to: "/settings", label: "Settings" },
];

const PAGE_META: Record<string, { eyebrow: string; title: string }> = {
  "/dashboard": { eyebrow: "Training hub", title: "Your next sharp move" },
  "/daily": { eyebrow: "Daily board", title: "Solve the puzzle, keep the streak" },
  "/play": { eyebrow: "Solo play", title: "Choose a board worth replaying" },
  "/multiplayer": { eyebrow: "Live rooms", title: "Challenge a real opponent" },
  "/progress": { eyebrow: "Progress", title: "See where your edge is growing" },
  "/profile": { eyebrow: "Player profile", title: "Own your training identity" },
  "/settings": { eyebrow: "Settings", title: "Tune the experience" },
};

function MobileHeader() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const meta = PAGE_META[location.pathname];

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/60 bg-white/80 px-4 py-3 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="flex items-center justify-between gap-3">
        <Link to="/dashboard" className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-lg shadow-slate-300/60 dark:bg-white dark:text-slate-950 dark:shadow-none">
            TP
          </div>
          <div className="min-w-0">
            <p className="truncate text-[10px] font-black uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">
              {meta?.eyebrow ?? "TacticalPath"}
            </p>
            <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
              {meta?.title ?? "Train smarter"}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-lg"
                  className="rounded-2xl border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[20rem] border-l border-white/60 bg-white/95 p-0 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95"
            >
              <div className="flex h-full flex-col">
                <div className="border-b border-slate-100 px-5 py-5 dark:border-slate-800">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">
                    Navigation
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">TacticalPath</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Switch between boards, progress, and room play without losing your place.
                  </p>
                </div>
                <div className="flex-1 overflow-y-auto px-3 py-4">
                  <nav className="space-y-1.5">
                    {mainNav.map(({ to, label }) => (
                      <Link
                        key={to}
                        to={to}
                        className={`flex items-center rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                          location.pathname === to
                            ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                            : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        }`}
                      >
                        {label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                    {secondaryNav.map(({ to, label }) => (
                      <Link
                        key={to}
                        to={to}
                        className="flex items-center rounded-2xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function Layout() {
  const location = useLocation();
  const shouldHideNav =
    HIDE_NAV_ROUTES.includes(location.pathname) ||
    IMMERSIVE_ROUTE_PREFIXES.some((route) => location.pathname.startsWith(route));

  return (
    <div className="tp-page min-h-screen text-slate-950 dark:text-white">
      {!shouldHideNav && (
        <>
          <SideNav />
          <MobileHeader />
          <BottomNav />
        </>
      )}
      <main className={!shouldHideNav ? "pb-24 pt-[4.5rem] md:pb-10 md:pl-72 md:pt-0" : ""}>
        <Outlet />
      </main>
    </div>
  );
}
