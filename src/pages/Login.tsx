import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-sky-100 px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <Link to="/" className="flex items-center gap-2 text-slate-600 mb-6">
          <span className="text-2xl">←</span>
          <span className="text-sm font-medium">Back</span>
        </Link>
        <div className="text-center">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">♞</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Log in to continue learning</p>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-sm mx-auto space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
          <input 
            type="email" 
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm pr-12"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        <Link 
          to="/dashboard"
          className="block w-full py-4 bg-blue-600 text-white font-semibold text-center rounded-xl"
        >
          Log In
        </Link>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gradient-to-b from-blue-50 to-sky-100 text-slate-500">or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700">
            Google
          </button>
          <button className="py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700">
            Apple
          </button>
        </div>
      </div>

      {/* Sign up link */}
      <p className="text-center text-sm text-slate-500 mt-8">
        Don't have an account?{" "}
        <Link to="/signup" className="font-semibold text-blue-600">Sign up</Link>
      </p>
    </div>
  );
}