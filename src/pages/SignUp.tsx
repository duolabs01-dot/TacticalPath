import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export function SignUp() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 min-h-screen">
      <div className="w-full max-w-[440px] flex flex-col gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-500/10 p-3 rounded-xl mb-4">
            <Shield className="text-blue-500 h-10 w-10" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Tactical Path
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Join the elite tactical community
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="fullname"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Full Name
              </label>
              <input
                id="fullname"
                type="text"
                placeholder="John Doe"
                className="flex h-12 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@tactical.com"
                className="flex h-12 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="flex h-12 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-500/90 h-12 px-4 py-2 w-full"
          >
            Create Account
          </Link>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-800"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-50 dark:bg-[#0b111a] px-2 text-slate-500 dark:text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 h-12 px-4 py-2">
              GitHub
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 h-12 px-4 py-2">
              Google
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Already have an account?
          </span>
          <Link
            to="/login"
            className="text-sm font-semibold text-blue-500 hover:underline"
          >
            Log In
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="relative h-24 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-blue-500/5"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                  JD
                </div>
                <div className="h-8 w-8 rounded-full border-2 border-slate-900 bg-blue-500 flex items-center justify-center text-[10px] font-bold">
                  AK
                </div>
                <div className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                  LS
                </div>
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                +1.2k members active now
              </span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          By clicking continue, you agree to our{" "}
          <Link to="#" className="underline underline-offset-4 hover:text-blue-500">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="#" className="underline underline-offset-4 hover:text-blue-500">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
