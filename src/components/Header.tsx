import React from 'react';
import { Gift, Wallet2, ArrowUpRight, MessageSquareCode } from 'lucide-react';
import { AppTab } from '../types';

interface HeaderProps {
  currentTab: AppTab;
  setCurrentTab: (tab: AppTab) => void;
  openLoginModal: () => void;
  openRegisterModal: () => void;
  onOpenLuckyWheel: () => void;
  userBalance: number;
  isLoggedIn: boolean;
  username: string;
}

export default function Header({
  currentTab,
  setCurrentTab,
  openLoginModal,
  openRegisterModal,
  onOpenLuckyWheel,
  userBalance,
  isLoggedIn,
  username
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#1a1a1a] border-b border-[#333] shadow-md flex flex-col">
      {/* Primary Brand Navbar row */}
      <div className="flex items-center justify-between px-3 py-2.5 sm:px-4">
        {/* Stylized Logo & Admin toggle */}
        <div className="flex items-center space-x-1.5">
          <div 
            onClick={() => setCurrentTab('home')} 
            className="flex items-center space-x-1 cursor-pointer select-none group"
            id="brand-logo"
          >
            <div className="text-[#FFBF00] font-black text-xl sm:text-2xl tracking-tighter transition duration-150 group-hover:scale-102">
              4999<span className="text-white group-hover:text-yellow-400 transition-colors">BET</span>
            </div>
          </div>
          
          {/* Interactive Controller gateway */}
          <button
            type="button"
            onClick={() => setCurrentTab('admin')}
            className={`px-2 py-0.5 rounded text-[8px] font-black tracking-wide border uppercase flex items-center gap-1 transition ${
              currentTab === 'admin'
                ? 'bg-[#FFBF00] text-black border-transparent shadow-[0_0_10px_#FFBF00]'
                : 'bg-yellow-950/30 text-[#FFBF00] border-[#FFBF00]/30 hover:bg-yellow-500/10'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            কন্ট্রোলার
          </button>
        </div>

        {/* User Balance or Log In Actions */}
        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2 bg-[#0d0d0d] px-2.5 py-1 rounded-full border border-[#333]">
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-medium">@{username}</p>
                <p className="text-xs text-[#FFBF00] font-bold">৳ {userBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div 
                onClick={() => setCurrentTab('member')} 
                className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FFBF00] to-yellow-500 text-black flex items-center justify-center font-bold text-[10px] shadow-sm cursor-pointer"
              >
                VIP
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              {/* Login Button in Sleek Minimal theme */}
              <button
                type="button"
                onClick={openLoginModal}
                className="px-4 py-1.5 border border-[#FFBF00] text-[#FFBF00] rounded-md font-black text-xs uppercase transition-colors hover:bg-[#FFBF00]/10 active:scale-95"
                id="btn-login-top"
              >
                লগইন
              </button>

              {/* Register Button in Glossy Gold with glow */}
              <button
                type="button"
                onClick={openRegisterModal}
                className="px-4 py-1.5 bg-[#FFBF00] text-black rounded-md font-black text-xs uppercase shadow-[0_0_15px_rgba(255,191,0,0.3)] hover:brightness-110 active:scale-95 transition-transform"
                id="btn-register-top"
              >
                নিবন্ধন
              </button>
            </div>
          )}

          {/* Bangladesh Circle Flag Accent from reference UI */}
          <div className="w-5.5 h-5.5 rounded-full bg-[#006a4e] relative overflow-hidden flex items-center justify-center border border-emerald-900 shadow shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f42a41] absolute"></div>
          </div>
        </div>
      </div>

      {/* Secondary Quick Action Bar (পুরস্কার, ডিপোজিট, উত্তোলন, লাইভ চ্যাট) */}
      <div className="grid grid-cols-4 bg-[#1a1a1a] border-t border-[#333] text-gray-300">
        <button
          type="button"
          onClick={onOpenLuckyWheel}
          className="flex flex-col items-center justify-center py-1.5 hover:text-white transition group border-r border-[#333]"
        >
          <div className="p-1 rounded-full group-hover:bg-amber-500/20 transition-all">
            <Gift className="w-4 h-4 text-[#FFBF00]" />
          </div>
          <span className="text-[10px] sm:text-xs">পুরস্কার</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentTab('deposit')}
          className={`flex flex-col items-center justify-center py-1.5 hover:text-white transition group border-r border-[#333] ${currentTab === 'deposit' ? 'text-[#FFBF00] bg-black/30' : ''}`}
        >
          <div className="p-1 rounded-full group-hover:bg-yellow-500/20 transition-all">
            <Wallet2 className="w-4 h-4" />
          </div>
          <span className="text-[10px] sm:text-xs">ডিপোজিট</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentTab('deposit')}
          className="flex flex-col items-center justify-center py-1.5 hover:text-white transition group border-r border-[#333]"
        >
          <div className="p-1 rounded-full group-hover:bg-amber-500/20 transition-all">
            <ArrowUpRight className="w-4 h-4 text-[#FFBF00]" />
          </div>
          <span className="text-[10px] sm:text-xs">উত্তোলন</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentTab('member')}
          className="flex flex-col items-center justify-center py-1.5 hover:text-white transition group"
        >
          <div className="p-1 rounded-full group-hover:bg-yellow-500/20 transition-all">
            <MessageSquareCode className="w-4 h-4 text-[#FFBF00]" />
          </div>
          <span className="text-[10px] sm:text-xs">লাইভ চ্যাট</span>
        </button>
      </div>
    </header>
  );
}
