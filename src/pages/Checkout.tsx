import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";

export function Checkout() {
  return (
    <div className="flex-1 overflow-y-auto pb-32 bg-slate-50 dark:bg-[#0b111a] text-slate-900 dark:text-slate-100 min-h-screen">
      <header className="sticky top-0 z-50 flex items-center p-4 border-b border-slate-200 dark:border-slate-800/50 backdrop-blur-md bg-white/75 dark:bg-[#0b111a]/75">
        <Link
          to="/subscription"
          className="text-slate-900 dark:text-slate-100 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 ml-2">
          Secure Checkout
        </h1>
      </header>

      <div className="p-4 space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg">
            Pro Annual
          </div>
          
          <div className="mb-6">
            <h3 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">Order Summary</h3>
            <div className="flex justify-between items-center mt-4">
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Pro Annual Plan</span>
              <span className="text-slate-900 dark:text-white font-bold">$119.88</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">7-Day Trial</span>
              <span className="text-emerald-500 dark:text-emerald-400 font-bold">-$119.88</span>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-800 mt-4 pt-4 flex justify-between items-center">
              <span className="text-slate-900 dark:text-white font-bold">Total Due Today</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">$0.00</span>
            </div>
            <p className="text-slate-500 text-[10px] mt-2 text-right">You will be charged $119.88 on Oct 31, 2023.</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight px-1">
            Payment Method
          </h3>
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="h-5 w-5 text-blue-500" />
              <span className="text-slate-900 dark:text-white font-bold text-sm">Credit or Debit Card</span>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-slate-500 dark:text-slate-400 text-xs font-bold mb-1 uppercase tracking-wider">Card Number</label>
                <input
                  type="text"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="0000 0000 0000 0000"
                />
              </div>
              
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-slate-500 dark:text-slate-400 text-xs font-bold mb-1 uppercase tracking-wider">Expiry Date</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-slate-500 dark:text-slate-400 text-xs font-bold mb-1 uppercase tracking-wider">CVC</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="123"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-slate-500 dark:text-slate-400 text-xs font-bold mb-1 uppercase tracking-wider">Cardholder Name</label>
                <input
                  type="text"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Name on card"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 px-1">
          <ShieldCheck className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
            Your payment is secure and encrypted. We do not store your full card details. By confirming, you agree to our <Link to="#" className="text-blue-500 hover:underline">Terms of Service</Link> and <Link to="#" className="text-blue-500 hover:underline">Privacy Policy</Link>.
          </p>
        </div>

        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-xl transition-colors shadow-lg shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-2">
          <Lock className="h-4 w-4" />
          Start Free Trial
        </button>
      </div>
    </div>
  );
}
