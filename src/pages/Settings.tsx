import { Link } from "react-router-dom";
import { ArrowLeft, Bell, HelpCircle, Home, LogOut, Moon, Shield, Sun, User } from "lucide-react";
import { useTheme } from "../components/ThemeProvider";

export function Settings() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="tp-page flex-1 overflow-y-auto pb-24 pt-6">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center px-4 sm:px-6">
          <Link
            to="/profile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:text-blue-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="ml-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Settings</p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-950">Classroom preferences</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <section className="space-y-6">
          <div className="tp-card rounded-[2rem] p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Account posture</p>
            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-4 rounded-[1.4rem] bg-slate-50 p-4">
                <User className="mt-1 h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-slate-900">Student identity stays light</p>
                  <p className="mt-1 text-sm leading-7 text-slate-600">This demo keeps the account framed as a classroom profile, not a public social identity.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-[1.4rem] bg-slate-50 p-4">
                <Shield className="mt-1 h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-semibold text-slate-900">Coach-controlled privacy</p>
                  <p className="mt-1 text-sm leading-7 text-slate-600">The approved direction favors minimal student data and no public messaging or marketplace behavior.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="tp-card rounded-[2rem] p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Preferences</p>
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between rounded-[1.4rem] bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Gentle reminders</p>
                    <p className="text-sm leading-6 text-slate-600">Visual nudges for the next class action.</p>
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
                    <p className="text-sm leading-6 text-slate-600">Switch between light and dark mode.</p>
                  </div>
                </div>
                <div className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${isDark ? "bg-slate-900 text-white" : "bg-white text-slate-700"}`}>
                  {isDark ? "Dark" : "Light"}
                </div>
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="tp-card rounded-[2rem] p-6 sm:p-7">
              <div className="flex items-center gap-3 text-slate-900">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                <h2 className="font-display text-3xl font-bold tracking-tight">Support</h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                This demo does not expose fake help-center routes. Keep the settings surface simple and route back into the working student experience.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700">
                  <Home className="h-4 w-4" />
                  Return to home
                </Link>
                <Link to="/profile" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">
                  Back to profile
                </Link>
              </div>
            </div>

            <div className="tp-card rounded-[2rem] p-6 sm:p-7">
              <div className="flex items-center gap-3 text-slate-900">
                <LogOut className="h-5 w-5 text-rose-600" />
                <h2 className="font-display text-3xl font-bold tracking-tight">Session</h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Signing out in this prototype simply returns to the landing page. It keeps the flow believable without pretending there is real auth state.
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
