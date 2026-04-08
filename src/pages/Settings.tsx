import { Link } from "react-router-dom";
import { ArrowLeft, User, Bell, Shield, CreditCard, HelpCircle, LogOut, ChevronRight, Moon, Sun } from "lucide-react";
import { useTheme } from "../components/ThemeProvider";

export function Settings() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex-1 overflow-y-auto pb-32 bg-slate-50 dark:bg-[#0b111a] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200">
      <header className="sticky top-0 z-50 flex items-center p-4 border-b border-slate-200 dark:border-slate-800/50 backdrop-blur-md bg-white/75 dark:bg-[#0b111a]/75 transition-colors duration-200">
        <Link
          to="/profile"
          className="text-slate-900 dark:text-slate-100 p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 ml-2">
          Settings
        </h1>
      </header>

      <div className="p-4 space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors duration-200">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 transition-colors duration-200">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Account</h2>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            <Link to="#" className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Personal Information</span>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </Link>
            <Link to="#" className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Security & Privacy</span>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </Link>
            <Link to="/subscription" className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Subscription</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-500/20">Pro</span>
                <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors duration-200">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 transition-colors duration-200">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Preferences</h2>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            <div className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Notifications</span>
              </div>
              <div className="w-10 h-6 bg-blue-500 rounded-full relative cursor-pointer transition-colors">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform"></div>
              </div>
            </div>
            <div 
              onClick={toggleTheme}
              className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {isDark ? (
                  <Moon className="h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                ) : (
                  <Sun className="h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                )}
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Dark Mode</span>
              </div>
              <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${isDark ? 'bg-blue-500' : 'bg-slate-300'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isDark ? 'right-1' : 'left-1'}`}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors duration-200">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 transition-colors duration-200">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Support</h2>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            <Link to="#" className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Help Center</span>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </Link>
            <Link to="#" className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors pl-8">Terms of Service</span>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </Link>
            <Link to="#" className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors pl-8">Privacy Policy</span>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>

        <button 
          onClick={() => alert("Signing out...")}
          className="w-full bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-500 border border-rose-200 dark:border-rose-500/20 font-bold py-4 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 mt-8"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
        
        <div className="text-center mt-8">
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest">Version 2.4.1</p>
        </div>
      </div>
    </div>
  );
}
