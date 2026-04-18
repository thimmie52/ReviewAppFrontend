import React, { useState } from 'react'
import { Search, ArrowRightLeft, Loader2, BarChart3, ShieldCheck, Zap } from 'lucide-react'


interface HeroProps {
  appList: string[];
  onCompare: (a: string, b: string) => void;
  isLoading: boolean;
  onShowLeaderboard: () => void; // <--- Add this line
}

// 2. Add it to the destructured props in the component
const Hero: React.FC<HeroProps> = ({ appList, onCompare, isLoading, onShowLeaderboard: _onShowLeaderboard }) => {
  const [a, setA] = useState('')
  const [b, setB] = useState('')

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 flex flex-col items-center overflow-hidden bg-slate-950">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Main Content */}
      <div className="max-w-5xl w-full text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-md mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">AI-Powered Market Intelligence</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
          Know Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-blue-400">
            Business Financial App.
          </span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          Stop relying on 5-star ratings. We analyze thousands of real user experiences to reveal the truth behind Nigeria's top fintech apps.
        </p>

        {/* Comparison Selector Card */}
        <div className="mt-12 w-full max-w-4xl mx-auto p-2 bg-slate-900/40 border border-slate-800/50 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col md:flex-row gap-2 items-center">
            
            <div className="relative w-full group">
               <select 
                className="w-full bg-slate-950/50 text-white p-5 rounded-[1.8rem] outline-none border border-slate-800 focus:border-emerald-500/50 transition-all appearance-none cursor-pointer font-bold"
                value={a}
                onChange={(e) => setA(e.target.value)}
              >
                <option value="">Select First App</option>
                {appList.map(name => <option key={name} value={name}>{name}</option>)}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <Search size={18} />
              </div>
            </div>

            <div className="p-3 rounded-full bg-slate-800/50 border border-slate-700/50 text-emerald-500">
              <ArrowRightLeft size={20} />
            </div>

            <div className="relative w-full">
              <select 
                className="w-full bg-slate-950/50 text-white p-5 rounded-[1.8rem] outline-none border border-slate-800 focus:border-emerald-500/50 transition-all appearance-none cursor-pointer font-bold"
                value={b}
                onChange={(e) => setB(e.target.value)}
              >
                <option value="">Select Second App</option>
                {appList.map(name => <option key={name} value={name}>{name}</option>)}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <Search size={18} />
              </div>
            </div>

            <button
              onClick={() => onCompare(a, b)}
              disabled={!a || !b || isLoading}
              className="w-full md:w-auto px-12 py-5 bg-emerald-500 text-slate-950 font-black rounded-[1.8rem] hover:bg-emerald-400 transition-all active:scale-95 disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'ANALYZE'}
            </button>
          </div>
        </div>

        {/* How it Works / Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left">
          <div className="p-8 bg-slate-900/30 border border-slate-800/50 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Sentiment Scoring</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              We process text from thousands of reviews to calculate an objective "Trust Score" beyond the basic Play Store rating.
            </p>
          </div>

          <div className="p-8 bg-slate-900/30 border border-slate-800/50 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Instant Insights</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              See the top 5 praises and complaints side-by-side to know exactly where an app excels or fails.
            </p>
          </div>

          <div className="p-8 bg-slate-900/30 border border-slate-800/50 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">AI Strategy Verdict</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Get a generated summary that highlights the current stability and reputation of the bank's digital infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero