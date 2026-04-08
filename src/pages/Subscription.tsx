import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Zap, Brain, Shield, Star } from "lucide-react";

export function Subscription() {
  return (
    <div className="flex-1 overflow-y-auto pb-32 bg-slate-50 dark:bg-[#0b111a] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200">
      <header className="sticky top-0 z-50 flex items-center p-4 border-b border-slate-200 dark:border-slate-800/50 backdrop-blur-md bg-white/75 dark:bg-[#0b111a]/75 transition-colors duration-200">
        <Link
          to="/dashboard"
          className="text-slate-900 dark:text-slate-100 p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 ml-2">
          Upgrade to Pro
        </h1>
      </header>

      <div className="p-4 space-y-6">
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-[0_0_20px_rgba(60,131,246,0.5)]">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 transition-colors duration-200">Unlock Your Potential</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs mx-auto transition-colors duration-200">
            Get unlimited access to AI analysis, personalized study plans, and advanced tactical training.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl transition-colors duration-200">
          <div className="absolute top-0 right-0 bg-blue-600 dark:bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg transition-colors duration-200">
            Most Popular
          </div>
          
          <div className="mb-6">
            <h3 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight transition-colors duration-200">Pro Annual</h3>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors duration-200">$9.99</span>
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium transition-colors duration-200">/ month</span>
            </div>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-bold mt-1 transition-colors duration-200">Billed annually ($119.88)</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5 transition-colors duration-200" />
              <div>
                <p className="text-slate-900 dark:text-white text-sm font-bold transition-colors duration-200">Unlimited Game Analysis</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 transition-colors duration-200">Deep engine evaluation for every move.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5 transition-colors duration-200" />
              <div>
                <p className="text-slate-900 dark:text-white text-sm font-bold transition-colors duration-200">AI Study Plans</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 transition-colors duration-200">Personalized curriculum based on your weaknesses.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5 transition-colors duration-200" />
              <div>
                <p className="text-slate-900 dark:text-white text-sm font-bold transition-colors duration-200">Advanced Puzzle Bank</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 transition-colors duration-200">Access to 100,000+ categorized tactical puzzles.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5 transition-colors duration-200" />
              <div>
                <p className="text-slate-900 dark:text-white text-sm font-bold transition-colors duration-200">Coach Connect Discount</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 transition-colors duration-200">Save 15% on all 1-on-1 coaching sessions.</p>
              </div>
            </div>
          </div>

          <Link 
            to="/checkout"
            className="block text-center w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-xl transition-colors shadow-lg shadow-blue-500/20 active:scale-[0.98]"
          >
            Start 7-Day Free Trial
          </Link>
          <p className="text-center text-slate-500 dark:text-slate-500 text-[10px] mt-4 transition-colors duration-200">Cancel anytime. No commitment.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 opacity-80 hover:opacity-100 transition-all duration-200 shadow-sm">
          <div className="mb-6">
            <h3 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight transition-colors duration-200">Pro Monthly</h3>
            <div className="flex items-baseline gap-1 mt-2">
               <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors duration-200">$14.99</span>
               <span className="text-slate-500 dark:text-slate-400 text-sm font-medium transition-colors duration-200">/ month</span>
            </div>
          </div>
          <Link 
            to="/checkout"
            className="block text-center w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold py-3 px-4 rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
          >
            Select Monthly
          </Link>
        </div>
      </div>
    </div>
  );
}
