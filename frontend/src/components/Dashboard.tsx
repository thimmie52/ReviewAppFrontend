import React from 'react'
import { ArrowLeft, Star, Users, Shield, TrendingUp, TrendingDown, Zap } from 'lucide-react'
import type { ComparisonResponse, AppData } from '../types'

interface DashboardProps {
  data: ComparisonResponse
  onBack: () => void
}

const AppCard = ({ app, accent, glow }: { app: AppData; accent: string, glow: string }) => (
  <div className={`relative group bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-8 space-y-8 backdrop-blur-xl transition-all duration-500 hover:border-slate-700 hover:shadow-2xl`}>
    {/* Subtle Glow Background */}
    <div className={`absolute -top-24 -right-24 w-64 h-64 ${glow} rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity`} />

    {/* Header Section */}
    <div className="relative flex items-center gap-6">
      <div className="relative">
        <div className={`absolute inset-0 ${glow} blur-xl opacity-40 rounded-full`}></div>
        <img 
          src={app.image} 
          alt={app.name} 
          referrerPolicy="no-referrer"
          className="relative w-20 h-20 rounded-[1.5rem] bg-slate-800 object-cover border border-slate-700/50 shadow-2xl"
        />
      </div>
      <div>
        <h2 className="text-3xl font-black tracking-tight text-white">{app.name}</h2>
        <div className="flex items-center gap-4 text-slate-400 text-sm mt-2 font-medium">
          <span className="flex items-center gap-1.5 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/30">
            <Users size={14} className="text-emerald-500" /> {app.install_count}
          </span>
          <span className="flex items-center gap-1.5 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/30">
            <Star size={14} className="text-yellow-500 fill-yellow-500" /> {app.score.toFixed(1)}
          </span>
        </div>
      </div>
    </div>

    {/* Sentiment / Trust Section */}
    <div className="relative space-y-4">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Market Sentiment</p>
          <p className="text-4xl font-black text-white leading-none">
            {Math.round(app.trust_score * 100)}<span className="text-xl text-slate-600 ml-1">%</span>
          </p>
        </div>
        <div className={`text-xs font-bold px-4 py-2 rounded-xl border ${accent.includes('emerald') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
          {app.trust_score > 0.75 ? 'MARKET LEADER' : 'RELIABLE'}
        </div>
      </div>
      
      <div className="h-4 w-full bg-slate-950 rounded-full p-1 border border-slate-800/50 overflow-hidden flex">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out shadow-lg ${accent.includes('emerald') ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' : 'bg-gradient-to-r from-blue-600 to-blue-400'}`} 
          style={{ width: `${(app.positive_reviews / (app.positive_reviews + app.negative_reviews)) * 100}%` }}
        />
        <div className="h-full bg-red-500/20 rounded-full ml-1" style={{ width: '10%' }} />
      </div>
    </div>

    {/* Insights Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-emerald-500 flex items-center gap-2">
          <TrendingUp size={14} /> Strengths
        </h4>
        <div className="space-y-2">
          {app.top_praises.map((p, i) => (
            <div key={i} className="text-xs font-semibold text-slate-300 bg-slate-800/30 border border-slate-700/20 px-4 py-3 rounded-2xl flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              {p}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-red-400 flex items-center gap-2">
          <TrendingDown size={14} /> Pain Points
        </h4>
        <div className="space-y-2">
          {app.top_complaints.map((c, i) => (
            <div key={i} className="text-xs font-semibold text-slate-400 bg-red-500/5 border border-red-500/10 px-4 py-3 rounded-2xl flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/50 mt-1.5 shrink-0" />
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* AI Verdict - The "Hero" box */}
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-3xl p-6">
       <div className="absolute top-0 right-0 p-4 opacity-10">
          <Zap size={40} className="text-emerald-500" />
       </div>
       <h4 className="text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
         <Shield size={14} className="text-emerald-500" /> AI Insights & Strategy
       </h4>
       <p className="text-sm text-slate-300 leading-relaxed font-medium italic">"{app.summary}"</p>
    </div>
  </div>
)

const Dashboard: React.FC<DashboardProps> = ({ data, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <button 
            onClick={onBack}
            className="flex w-fit items-center gap-2 text-slate-500 hover:text-white transition-all font-bold text-sm uppercase tracking-widest group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
            Back to search
          </button>
          
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
            <p className="text-emerald-500 text-xs font-black tracking-tighter uppercase">Live Sentiment Analysis Active</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AppCard app={data.app1} accent="text-emerald-500" glow="bg-emerald-500" />
          <AppCard app={data.app2} accent="text-blue-400" glow="bg-blue-500" />
        </div>
      </div>
    </div>
  )
}

export default Dashboard