import React from 'react';
import { ShieldAlert, Gem, UserRoundPlus, Wallet, UserCircle2 } from 'lucide-react';
import { AppTab } from '../types';

interface BottomNavProps {
  currentTab: AppTab;
  setCurrentTab: (tab: AppTab) => void;
}

export default function BottomNav({ currentTab, setCurrentTab }: BottomNavProps) {
  const navItems = [
    {
      id: 'home' as AppTab,
      label: 'হোম',
      icon: <ShieldAlert className="w-5 h-5 rotate-180" /> // Using shield alert rotated to resemble the castle/tower badge
    },
    {
      id: 'promotion' as AppTab,
      label: 'প্রোমোশন',
      icon: <Gem className="w-5 h-5" />
    },
    {
      id: 'invite' as AppTab,
      label: 'আমন্ত্রণ',
      icon: <UserRoundPlus className="w-5 h-5" />
    },
    {
      id: 'deposit' as AppTab,
      label: 'ডিপোজিট',
      icon: <Wallet className="w-5 h-5" />
    },
    {
      id: 'member' as AppTab,
      label: 'সদস্য',
      icon: <UserCircle2 className="w-5 h-5" />
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#1a1a1a] border-t border-[#333] h-[62px] flex items-center justify-around shadow-[0_-5px_15px_rgba(0,0,0,0.4)] pb-safe">
      {navItems.map((item) => {
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className="flex flex-col items-center justify-center flex-1 py-1 relative focus:outline-none transition group"
            id={`bottom-nav-${item.id}`}
          >
            {/* Soft highlight bar on top of the active state */}
            {isActive && (
              <span className="absolute top-0 w-10 h-1 bg-[#FFBF00] rounded-full shadow-[0_2px_10px_#FFBF00]"></span>
            )}

            {/* Icon Wrapper */}
            <div
              className={`transition-all duration-200 mt-1 ${
                isActive
                  ? 'text-[#FFBF00] scale-110 drop-shadow-[0_0_8px_rgba(255,191,0,0.5)]'
                  : 'text-gray-400 group-hover:text-gray-200'
              }`}
            >
              {item.icon}
            </div>

            {/* Label in Bangla */}
            <span
              className={`text-[10px] mt-0.5 font-bold transition-all ${
                isActive ? 'text-[#FFBF00]' : 'text-gray-400'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
