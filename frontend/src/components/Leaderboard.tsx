import React from 'react';
import { Trophy, Medal, ArrowUpRight, Star } from 'lucide-react';
import type { AppData } from '../types';

// We'll extend AppData for the leaderboard to include rank
interface LeaderboardItem extends AppData {
  rank: number;
}
// 1. Update the interface to include onBack
interface LeaderboardProps {
  apps: LeaderboardItem[];
  onBack: () => void;      // <--- Add this line
  onSelect: (name: string) => void;
}

// 2. Update the component definition to use that interface and destructure onBack
const Leaderboard = ({ apps, onBack, onSelect }: LeaderboardProps) => {
  const topThree = apps.slice(0, 3);
  const others = apps.slice(3);

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-5xl font-black tracking-tighter text-white">Market Rankings</h2>
        <p className="text-slate-500 font-medium">The most trusted business banking apps in Nigeria, ranked by AI sentiment.</p>
      </div>

      {/* Podium Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end">
        {/* Silver - Rank 2 */}
        <div className="order-2 md:order-1 bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] text-center space-y-4 h-[280px] flex flex-col justify-center relative overflow-hidden">
          <Medal className="mx-auto text-slate-400" size={40} />
          <p className="text-2xl font-bold">{topThree[1]?.name}</p>
          <p className="text-emerald-500 font-black text-xl">{Math.round(topThree[1]?.trust_score * 100)}%</p>
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-400/30" />
        </div>

        {/* Gold - Rank 1 */}
        <div className="order-1 md:order-2 bg-gradient-to-b from-emerald-500/20 to-slate-900/40 border border-emerald-500/30 p-10 rounded-[2.5rem] text-center space-y-4 h-[340px] flex flex-col justify-center relative shadow-[0_0_50px_rgba(16,185,129,0.1)]">
          <Trophy className="mx-auto text-yellow-500" size={56} />
          <p className="text-3xl font-black">{topThree[0]?.name}</p>
          <p className="text-emerald-500 font-black text-3xl">{Math.round(topThree[0]?.trust_score * 100)}%</p>
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
        </div>

        {/* Bronze - Rank 3 */}
        <div className="order-3 bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] text-center space-y-4 h-[240px] flex flex-col justify-center relative">
          <Medal className="mx-auto text-orange-700" size={40} />
          <p className="text-xl font-bold">{topThree[2]?.name}</p>
          <p className="text-emerald-500 font-black text-lg">{Math.round(topThree[2]?.trust_score * 100)}%</p>
          <div className="absolute top-0 left-0 w-full h-1 bg-orange-700/30" />
        </div>
      </div>

      {/* The Rest of the List */}
      <div className="space-y-3">
        {others.map((app) => (
          <div 
            key={app.name}
            className="group flex items-center justify-between p-5 bg-slate-900/30 border border-slate-800/50 rounded-2xl hover:bg-slate-800/50 transition-all cursor-pointer"
            onClick={() => onSelect(app.name)}
          >
            <div className="flex items-center gap-6">
              <span className="text-slate-600 font-black w-6">{app.rank}</span>
              <img src={app.image} alt="" className="w-10 h-10 rounded-xl bg-slate-800" referrerPolicy="no-referrer" />
              <span className="font-bold text-white group-hover:text-emerald-400 transition-colors">{app.name}</span>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Trust Score</p>
                <p className="text-emerald-500 font-black">{Math.round(app.trust_score * 100)}%</p>
              </div>
              <ArrowUpRight className="text-slate-700 group-hover:text-white transition-colors" size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;