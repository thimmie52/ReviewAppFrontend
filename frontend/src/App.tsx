import { useState, useEffect } from 'react'
import axios from 'axios'
import { Zap, LayoutDashboard, Trophy } from 'lucide-react'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import Leaderboard from './components/Leaderboard'
import type { ComparisonResponse, AppData } from './types'

// Type Definitions
interface LeaderboardItem extends AppData {
  rank: number;
}
type View = 'hero' | 'dashboard' | 'leaderboard';

const API_BASE = "https://reviewapplication-h66x.onrender.com/api/reviews"

function App() {
  const [currentView, setCurrentView] = useState<View>('hero');
  const [appList, setAppList] = useState<string[]>([])
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [comparisonData, setComparisonData] = useState<ComparisonResponse | null>(null)
  const [isComparing, setIsComparing] = useState<boolean>(false)

  // Initial Data Fetch
  useEffect(() => {
    const initData = async () => {
      try {
        const [appsRes, leaderboardRes] = await Promise.all([
          axios.get<string[]>(`${API_BASE}/list_apps/`),
          axios.get<LeaderboardItem[]>(`${API_BASE}/reviews/leaderboard/`)
        ]);
        setAppList(appsRes.data);
        setLeaderboardData(leaderboardRes.data);
      } catch (err) {
        console.error("Initialization failed", err);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  const handleCompare = async (app1: string, app2: string) => {
    setLoading(true)
    setIsComparing(true)
    try {
      const response = await axios.get<ComparisonResponse>(`${API_BASE}/compare/`, {
        params: { app1, app2 }
      })
      setComparisonData(response.data)
      setIsComparing(false)
      setCurrentView('dashboard')
    } catch (err) {
      alert("Analysis failed. Please try different banks.")
      setIsComparing(false)
    } finally {
      setLoading(false)
    }
  }

  const goHome = () => {
    setComparisonData(null);
    setCurrentView('hero');
  };

  if (loading && currentView === 'hero') {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-950">
        <div className="relative">
           <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 animate-pulse" />
           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500 relative" />
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      
      {/* --- FLOATING NAVBAR --- */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4">
        <div className="bg-slate-900/60 backdrop-blur-2xl border border-slate-800/50 rounded-full px-2 py-2 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Logo Section */}
          <div 
            className="flex items-center gap-2 pl-4 cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={goHome}
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
               <Zap size={16} className="text-slate-950 fill-slate-950" />
            </div>
            <span className="font-black tracking-tighter text-sm uppercase hidden sm:block">BankBattle</span>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentView('hero')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${currentView === 'hero' ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
            >
              <LayoutDashboard size={14} />
              Compare
            </button>
            <button 
              onClick={() => setCurrentView('leaderboard')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${currentView === 'leaderboard' ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
            >
              <Trophy size={14} />
              Rankings
            </button>
          </div>
        </div>
      </nav>

      {/* --- PAGE CONTENT --- */}
      <div className="pt-4"> {/* Spacer for fixed nav */}
        {currentView === 'hero' && (
          <Hero 
            appList={appList} 
            onCompare={handleCompare} 
            isLoading={isComparing}
            onShowLeaderboard={() => setCurrentView('leaderboard')}
          />
        )}

        {currentView === 'dashboard' && comparisonData && (
          <Dashboard 
            data={comparisonData} 
            onBack={goHome} 
          />
        )}

        {currentView === 'leaderboard' && (
          <Leaderboard 
            apps={leaderboardData} 
            onBack={goHome} 
            onSelect={(appName) => {
              setCurrentView('hero');
              // Logic could be added here to auto-select appName in Hero selects
            }}
          />
        )}
      </div>

      {/* Footer Branding */}
      <footer className="pb-10 pt-20 text-center">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">
          Engineered for Nigeria's Fintech Ecosystem © 2026
        </p>
      </footer>
    </main>
  )
}

export default App