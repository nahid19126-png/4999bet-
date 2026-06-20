import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Activity, 
  Check, 
  X, 
  Coins, 
  Users, 
  Wallet, 
  Flame, 
  RefreshCw, 
  Play, 
  UserPlus
} from 'lucide-react';
import { AdminLogItem } from '../types';

interface AdminSectionProps {
  onBackToHome: () => void;
  userBalance: number;
  username: string;
  isLoggedIn: boolean;
  onModifyBalance: (amount: number) => void;
  adminLogs: AdminLogItem[];
  winMultiplierBoost: boolean;
  onToggleWinBoost: () => void;
  onApproveWithdraw: (logId: string) => void;
  onRejectWithdraw: (logId: string) => void;
  onApproveDeposit: (logId: string) => void;
  onRejectDeposit: (logId: string) => void;
  onAddSimulatedLog: (type: 'deposit' | 'withdraw' | 'gameplay' | 'luckywheel', details: string, amount: number) => void;
}

export default function AdminSection({
  onBackToHome,
  userBalance,
  username,
  isLoggedIn,
  onModifyBalance,
  adminLogs,
  winMultiplierBoost,
  onToggleWinBoost,
  onApproveWithdraw,
  onRejectWithdraw,
  onApproveDeposit,
  onRejectDeposit,
  onAddSimulatedLog
}: AdminSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'deposit' | 'withdraw' | 'gameplay'>('all');
  const [simulatedPlayerCount, setSimulatedPlayerCount] = useState<number>(47);

  // Filter logs based on selection
  const filteredLogs = adminLogs.filter(log => {
    if (activeTab === 'all') return true;
    return log.type === activeTab;
  });

  // Calculate statistics based on logs list
  const totalIncomingDeposits = adminLogs
    .filter(l => l.type === 'deposit' && l.status === 'completed')
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const totalOutgoingWithdrawals = adminLogs
    .filter(l => l.type === 'withdraw' && l.status === 'completed')
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const totalPlayedBets = adminLogs
    .filter(l => l.type === 'gameplay')
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);

  // Quick action to seed simulated activity
  const handleSeedActivity = () => {
    const listSimulatedUsers = ['rahid_boss', 'asif_king', 'milon_nag', 'sakib_cricket', 'lipu_dhaka', 'shuvo_88'];
    const listSimulatedGames = ['Super Ace', 'Aviator Spark', 'Happy Fishing', 'Crazy Fortune', 'Boxing Champion'];
    const randomUser = listSimulatedUsers[Math.floor(Math.random() * listSimulatedUsers.length)];
    const randomGame = listSimulatedGames[Math.floor(Math.random() * listSimulatedGames.length)];
    const actionType = Math.random() > 0.5 ? 'win' : 'bet';
    
    if (actionType === 'win') {
      const winAmt = Math.floor(Math.random() * 8000) + 500;
      onAddSimulatedLog(
        'gameplay', 
        `ব্যবহারকারী @${randomUser} গেম খেলেছেন "${randomGame}" এবং ৳ ${winAmt} জয়লাভ করেছেন!`, 
        winAmt
      );
    } else {
      const depositAmt = [500, 1000, 5000, 10000][Math.floor(Math.random() * 4)];
      onAddSimulatedLog(
        'deposit', 
        `ব্যবহারকারী @${randomUser} বিকাশ (bKash) দ্বারা ৳ ${depositAmt} ডিপোজিট করার জন্য আবেদন জমা দিয়েছেন।`, 
        depositAmt
      );
    }
    setSimulatedPlayerCount(prev => prev + Math.floor(Math.random() * 5) - 2);
  };

  return (
    <div className="flex-1 bg-[#0a0a0a] p-3 overflow-y-auto h-[calc(100vh-155px)] no-scrollbar pb-10">
      
      {/* 1. Controller Top Header bar */}
      <div className="flex items-center justify-between py-2.5 border-b border-[#333] mb-4 px-1 bg-[#1a1a1a]/40 rounded-xl shadow-sm">
        <button
          type="button"
          onClick={onBackToHome}
          className="p-1 px-2.5 rounded-lg bg-[#1a1a1a] hover:bg-neutral-800 border border-[#333] text-gray-400 hover:text-white flex items-center space-x-1 transition"
          id="btn-admin-back"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-bold font-sans">হোম</span>
        </button>
        <h1 className="text-sm font-black text-[#FFBF00] tracking-wide text-center uppercase flex items-center gap-1.5 animate-pulse">
          <Activity className="w-4 h-4 text-[#FFBF00]" />
          কন্ট্রোলার / এডমিন প্যানেল
        </h1>
        <div className="w-14"></div>
      </div>

      {/* 2. Overview Bento-Style Summary Cards */}
      <div className="grid grid-cols-2 gap-2.5 mb-5 select-none text-left">
        {/* Card 1: Total Deposited */}
        <div className="bg-[#1a1a1a] p-3 rounded-xl border border-[#333] flex flex-col justify-between">
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">মোট সফল ডিপোজিট</p>
            <p className="text-sm font-black text-emerald-400 mt-1">
              ৳ {totalIncomingDeposits.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="flex items-center gap-1 mt-2 text-[8px] text-gray-500">
            <Coins className="w-3 h-3 text-[#FFBF00]" />
            সিস্টেম ক্যাশ ইনফ্লো
          </div>
        </div>

        {/* Card 2: Total Withdrawn */}
        <div className="bg-[#1a1a1a] p-3 rounded-xl border border-[#333] flex flex-col justify-between">
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">মোট সফল উত্তোলন</p>
            <p className="text-sm font-black text-rose-400 mt-1">
              ৳ {totalOutgoingWithdrawals.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="flex items-center gap-1 mt-2 text-[8px] text-gray-500">
            <Wallet className="w-3 h-3 text-[#FFBF00]" />
            সিস্টেম পেআউটস আউটফ্লো
          </div>
        </div>

        {/* Card 3: Total Game bets placed */}
        <div className="bg-[#1a1a1a] p-3 rounded-xl border border-[#333] flex flex-col justify-between">
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">মোট ট্রানজেকশন বেট</p>
            <p className="text-sm font-black text-[#FFBF00] mt-1">
              ৳ {totalPlayedBets.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="flex items-center gap-1 mt-2 text-[8px] text-gray-500 font-sans">
            <Play className="w-3 h-3 text-yellow-500" />
            গেমপ্লে টার্নওভার
          </div>
        </div>

        {/* Card 4: Live Active Simulated Players */}
        <div className="bg-[#1a1a1a] p-3 rounded-xl border border-[#333] flex flex-col justify-between">
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">অনলাইন ও খেলোয়াড়</p>
            <p className="text-sm font-black text-amber-400 mt-1">
              {simulatedPlayerCount} জন একটিভ
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1 text-[8px] text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block"></span>
              লাইভ ট্র্যাকিং
            </div>
            <button 
              onClick={handleSeedActivity}
              className="p-1 rounded bg-[#FFBF00]/10 hover:bg-[#FFBF00]/30 transition"
              title="নতুন ফেক লাইভ ইভেন্ট ট্রিগার করুন"
            >
              <RefreshCw className="w-2.5 h-2.5 text-[#FFBF00]" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Controller Center Variables Settings panel */}
      <h2 className="text-xs font-extrabold text-[#FFBF00] mb-2 uppercase select-none tracking-wide text-left">
        🔧 এডমিন সুপার কন্ট্রোল অপশনস
      </h2>
      
      <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#333] mb-5 space-y-4 text-left">
        
        {/* Aviator Secret Algorithm Insights Card */}
        <div className="p-3 bg-red-950/20 border border-red-500/25 rounded-xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-xs font-black text-red-400 uppercase tracking-wider">গোপন এভিয়েটর অ্যালগরিদম প্যারামিটার (Secret)</span>
          </div>
          <p className="text-[10px] text-gray-300 leading-relaxed font-sans">
            নিচের বিন্যাসটি রিয়েল-টাইম ক্র্যাশ গণিতে প্রোগ্রাম করা আছে (এটি সাধারণ ব্যবহারকারীদের কাছে গোপন রাখা হয়েছে):
          </p>
          <div className="grid grid-cols-2 gap-1.5 pt-1 text-[9px] font-mono font-bold text-gray-400">
            <div className="bg-black/40 px-2 py-1 rounded border border-zinc-800/60">
              <span className="text-red-400">৭০% সময়:</span> ১.০০x থেকে ১.৫০x
            </div>
            <div className="bg-black/40 px-2 py-1 rounded border border-zinc-800/60">
              <span className="text-amber-400">২০% সময়:</span> ১.৫১x থেকে ৫.০০x
            </div>
            <div className="bg-black/40 px-2 py-1 rounded border border-zinc-800/60">
              <span className="text-emerald-400">৫% সময়:</span> ৫.০১x থেকে ১০.০০x
            </div>
            <div className="bg-black/40 px-2 py-1 rounded border border-zinc-800/60">
              <span className="text-purple-400">৩% সময়:</span> ১০.০১x থেকে ১৫.০০x
            </div>
            <div className="bg-black/40 px-2 py-1 rounded border border-zinc-800/60 col-span-2">
              <span className="text-cyan-400">১.৫% সময়:</span> ১৫.০১x থেকে ১৫০.০০x
            </div>
            <div className="bg-black/40 px-2 py-1 rounded border border-zinc-800/60 col-span-2 text-yellow-450 text-yellow-400 border-yellow-600/30">
              ⚡ <span className="text-yellow-400 font-extrabold">১.৫% জ্যাকপট:</span> ১৫০.০১x থেকে ৫,০০,০০০.০০x পর্যন্ত!
            </div>
          </div>
        </div>

        {/* Win Rate Multiplier Switch */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold text-white">গেমপ্লে উইন রেট বুস্ট করুন (Always win)</p>
            <p className="text-[10px] text-gray-400 font-medium">সক্রিয় হলে গেমপ্লেতে খেলোয়াড় সবসময় মেগা উইন ও জ্যাকপট পাবে!</p>
          </div>
          <button
            type="button"
            onClick={onToggleWinBoost}
            className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-200 focus:outline-none flex ${
              winMultiplierBoost ? 'bg-emerald-500 justify-end' : 'bg-neutral-800 justify-start'
            }`}
          >
            <span className="w-4.5 h-4.5 bg-white rounded-full shadow-md transform flex items-center justify-center">
              {winMultiplierBoost ? <Flame className="w-3 h-3 text-emerald-600" /> : null}
            </span>
          </button>
        </div>

        {/* Current logged user custom manual balance adjustment */}
        <div className="pt-2 border-t border-[#333] space-y-2">
          <p className="text-xs font-extrabold text-white">
            বর্তমান প্লেয়ার ব্যালেন্স এডজাস্ট করুন 
            <span className="text-[#FFBF00] ml-2 font-mono text-[10px]">(@{isLoggedIn ? username : 'GUEST'} | ৳{userBalance.toLocaleString()})</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => onModifyBalance(500)}
              className="flex-1 py-1.5 text-[10px] font-bold bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-900/30 active:scale-95 transition"
            >
              +৳৫০০ জোগান
            </button>
            <button
              onClick={() => onModifyBalance(5000)}
              className="flex-1 py-1.5 text-[10px] font-bold bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 rounded-lg hover:bg-emerald-900/40 active:scale-95 transition"
            >
              +৳৫০০০ জোগান
            </button>
            <button
              onClick={() => onModifyBalance(-1000)}
              className="flex-1 py-1.5 text-[10px] font-bold bg-rose-950/40 border border-rose-500/20 text-rose-400 rounded-lg hover:bg-rose-900/30 active:scale-95 transition"
            >
              -৳১০০০ হরণ
            </button>
          </div>
        </div>
      </div>

      {/* 4. Filterable Logs list */}
      <div className="mb-3 flex items-center justify-between select-none">
        <h3 className="text-xs font-extrabold text-[#FFBF00] uppercase tracking-wide">
          📜 রিয়েল-টাইম অডিট ট্রেইল (Live Feed)
        </h3>
        <span className="text-[9px] text-gray-500 font-mono">
          মোট {adminLogs.length}টি ঘটনা
        </span>
      </div>

      {/* Audit filter tab options */}
      <div className="flex gap-1.5 mb-3.5 select-none">
        {(['all', 'deposit', 'withdraw', 'gameplay'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded transition border ${
              activeTab === tab
                ? 'bg-[#FFBF00] text-black border-transparent'
                : 'bg-[#1a1a1a] text-gray-400 border-[#333] hover:text-white'
            }`}
          >
            {tab === 'all' && 'সমস্ত ফিড'}
            {tab === 'deposit' && 'ডিপোজিট'}
            {tab === 'withdraw' && 'উত্তোলন'}
            {tab === 'gameplay' && 'গেমপ্লে'}
          </button>
        ))}
      </div>

      {/* Audit Event List representation cards */}
      <div className="space-y-2.5">
        {filteredLogs.length === 0 ? (
          <div className="py-10 text-center text-xs text-gray-650 bg-[#1a1a1a] rounded-xl border border-[#333] text-gray-500">
            অডিট ট্রেইলে কোনো রেকর্ড খুঁজে পাওয়া যায়নি।
          </div>
        ) : (
          filteredLogs.map((log) => {
            const isPending = log.status === 'pending';
            return (
              <div
                key={log.id}
                className="bg-[#1a1a1a] p-3 rounded-xl border border-[#333] text-left text-xs relative space-y-1"
                id={`admin-log-card-${log.id}`}
              >
                {/* Time + User details row */}
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-gray-500 font-mono">{log.timestamp}</span>
                  <span className="bg-black text-gray-400 px-1.5 py-0.5 rounded font-mono font-bold">
                    @{log.user}
                  </span>
                </div>

                {/* Event detail */}
                <p className="text-white text-[11px] leading-relaxed pt-0.5 pr-2 w-[90%]">
                  {log.detail}
                </p>

                {/* Amount display bottom left if exists */}
                {log.amount && (
                  <div className="pt-1 flex justify-between items-center">
                    <span className="font-extrabold text-[#FFBF00] font-mono">
                      ৳ {log.amount.toLocaleString()}
                    </span>
                    
                    {/* Event Type / Status Badge representation */}
                    <div className="flex items-center gap-1.5">
                      {log.status === 'completed' && (
                        <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 border border-emerald-500/20 rounded font-black tracking-tighter uppercase">
                          অনুমোদিত (Completed)
                        </span>
                      )}
                      {log.status === 'pending' && (
                        <span className="text-[9px] bg-amber-955 text-[#FFBF00] bg-yellow-950/40 px-1.5 py-0.5 border border-[#FFBF00]/30 rounded font-black tracking-tighter uppercase">
                          অপেক্ষারত (Pending)
                        </span>
                      )}
                      {log.status === 'rejected' && (
                        <span className="text-[9px] bg-rose-955 text-rose-400 bg-rose-950/40 px-1.5 py-0.5 border border-rose-500/30 rounded font-black tracking-tighter uppercase">
                          প্রত্যাখ্যাত (Rejected)
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Interactive Action Controls if PENDING for admin approval */}
                {isPending && (
                  <div className="mt-2.5 pt-2 border-t border-[#333] flex justify-end gap-2">
                    <button
                      onClick={() => {
                        if (log.type === 'deposit') {
                          onApproveDeposit(log.id);
                        } else {
                          onApproveWithdraw(log.id);
                        }
                      }}
                      className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-black text-[10px] font-black rounded flex items-center gap-1 shadow transition-transform active:scale-95"
                      title="অ্যাকশন অনুমোদন করুন"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3px]" />
                      অনুমোদন করুন
                    </button>
                    <button
                      onClick={() => {
                        if (log.type === 'deposit') {
                          onRejectDeposit(log.id);
                        } else {
                          onRejectWithdraw(log.id);
                        }
                      }}
                      className="px-3 py-1 bg-rose-500/25 hover:bg-rose-500/40 text-rose-450 border border-rose-500/40 text-rose-400 text-[10px] font-black rounded flex items-center gap-1 transition-transform active:scale-95"
                      title="অনুরোধ প্রত্যাখ্যান করুন"
                    >
                      <X className="w-3.5 h-3.5 stroke-[3px]" />
                      বাতিল করুন
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
