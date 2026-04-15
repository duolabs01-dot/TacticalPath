import { Link } from "react-router-dom";
import { ArrowLeft, Bell, Home, LogOut, Moon, Palette, Shield, Sun, User, Zap } from "lucide-react";
import { useTheme } from "../components/ThemeProvider";

const settingPill = "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]";

export function Settings() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex-1 overflow-y-auto pb-24 pt-6">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center px-4 sm:px-6">
          <Link
            to="/profile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:text-blue-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="ml-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Settings</p>
            <h1 className="text-2xl font-black tracking-tight text-slate-950">Arcade preferences</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <section className="space-y-6">
          <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 p-6 text-white shadow-2xl shadow-slate-200 sm:p-7">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-200">Player-first defaults</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Keep the shell light, clear, and ready for the next match.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200">
              Settings now support the public arcade loop: simple identity, device-level comfort choices, and believable transitions back into live play.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className={`${settingPill} bg-white/10 text-white`}>Public-first</span>
              <span className={`${settingPill} bg-white/10 text-white`}>Game-first</span>
              <span className={`${settingPill} bg-white/10 text-white`}>No classroom residue</span>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Identity</p>
              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-4 rounded-[1.4rem] bg-slate-50 p-4">
                  <User className="mt-1 h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Lightweight player profile</p>
                    <p className="mt-1 text-sm leading-7 text-slate-600">Profiles should help players return to the board quickly, not force social setup before the fun starts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-[1.4rem] bg-slate-50 p-4">
                  <Shield className="mt-1 h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Device-safe by default</p>
                    <p className="mt-1 text-sm leading-7 text-slate-600">Keep the demo local and low-friction. Real account depth should only appear when the product has earned it.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Comfort</p>
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between rounded-[1.4rem] bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-slate-900">Next-action nudges</p>
                      <p className="text-sm leading-6 text-slate-600">Short prompts that point you back to a useful board or rematch lane.</p>
                    </div>
                  </div>
                  <div className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">On</div>
                </div>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex w-full items-center justify-between rounded-[1.4rem] bg-slate-50 p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    {isDark ? <Moon className="h-5 w-5 text-blue-600" /> : <Sun className="h-5 w-5 text-blue-600" />}
                    <div>
                      <p className="font-semibold text-slate-900">Theme</p>
                      <p className="text-sm leading-6 text-slate-600">Switch between light and dark mode for longer play sessions.</p>
                    </div>
                  </div>
                  <div className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${isDark ? "bg-slate-900 text-white" : "bg-white text-slate-700"}`}>
                    {isDark ? "Dark" : "Light"}
                  </div>
                </button>

                <div className="flex items-start gap-4 rounded-[1.4rem] bg-slate-50 p-4">
                  <Palette className="mt-1 h-5 w-5 text-violet-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Visual tone</p>
                    <p className="mt-1 text-sm leading-7 text-slate-600">The shell now leans more arcade than admin so the app feels alive before the first move is made.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3 text-slate-900">
                <Zap className="h-5 w-5 text-blue-600" />
                <h2 className="text-3xl font-black tracking-tight">Quick return</h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Good settings pages should get out of the way quickly. Jump back into the hub, your profile, or public home without feeling trapped in preferences.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700">
                  <Home className="h-4 w-4" />
                  Return to arcade
                </Link>
                <Link to="/profile" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">
                  Back to profile
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3 text-slate-900">
                <LogOut className="h-5 w-5 text-rose-600" />
                <h2 className="text-3xl font-black tracking-tight">Exit</h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Signing out in this prototype simply returns to the public landing page. That keeps the demo believable without pretending there is full account infrastructure underneath.
              </p>
              <Link to="/" className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-bold text-rose-700 transition hover:bg-rose-100">
                <LogOut className="h-4 w-4" />
                Return to landing page
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
