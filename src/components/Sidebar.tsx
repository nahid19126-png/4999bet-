import React from 'react';
import { Flame, ToyBrick, Video, Waves, Trophy, Club } from 'lucide-react';
import { GameCategory } from '../types';

interface SidebarProps {
  activeCategory: GameCategory;
  setActiveCategory: (category: GameCategory) => void;
  onTabChange: () => void;
}

export default function Sidebar({
  activeCategory,
  setActiveCategory,
  onTabChange
}: SidebarProps) {
  const categories = [
    {
      id: 'hot' as GameCategory,
      label: 'গরম',
      icon: <Flame className="w-5 h-5" />,
      colorClass: 'from-amber-600 to-red-600',
      glowColor: 'shadow-red-500/50'
    },
    {
      id: 'slots' as GameCategory,
      label: 'স্লট',
      icon: <ToyBrick className="w-5 h-5" />,
      colorClass: 'from-yellow-500 to-amber-600',
      glowColor: 'shadow-amber-500/50'
    },
    {
      id: 'live' as GameCategory,
      label: 'লাইভ',
      icon: <Video className="w-5 h-5" />,
      colorClass: 'from-pink-600 to-pink-900',
      glowColor: 'shadow-pink-500/30'
    },
    {
      id: 'fishing' as GameCategory,
      label: 'ফিশিং',
      icon: <Waves className="w-5 h-5" />,
      colorClass: 'from-orange-500 to-yellow-505',
      glowColor: 'shadow-yellow-500/30'
    },
    {
      id: 'sports' as GameCategory,
      label: 'স্পোর্টস',
      icon: <Trophy className="w-5 h-5" />,
      colorClass: 'from-emerald-600 to-teal-800',
      glowColor: 'shadow-teal-500/30'
    },
    {
      id: 'poker' as GameCategory,
      label: 'পোকার',
      icon: <Club className="w-5 h-5" />,
      colorClass: 'from-yellow-600 to-amber-700',
      glowColor: 'shadow-yellow-500/40'
    }
  ];

  const handleCategoryClick = (catId: GameCategory) => {
    setActiveCategory(catId);
    onTabChange(); // Switch back to 'home' tab automatically when sidebar is clicked
  };

  return (
    <aside className="w-[72px] sm:w-20 bg-[#121212] border-r border-[#333] flex flex-col items-center py-4 space-y-4 select-none shrink-0 sticky top-[92.5px] h-[calc(100vh-155px)] overflow-y-auto no-scrollbar z-20">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`flex flex-col items-center w-full py-2 focus:outline-none transition-all duration-200 group relative ${
              isActive 
                ? 'bg-gradient-to-r from-[#FFBF00]/10 to-transparent border-l-4 border-[#FFBF00]' 
                : 'border-l-4 border-transparent'
            }`}
            id={`sidebar-category-${cat.id}`}
          >
            {/* Round Icon Container */}
            <div
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                isActive
                  ? 'bg-[#FFBF00] text-black shadow-[0_0_15px_rgba(255,191,0,0.45)] scale-102 font-bold'
                  : 'bg-[#1a1a1a] text-gray-400 border border-[#333] group-hover:text-white group-hover:border-gray-500'
              }`}
            >
              {cat.icon}
            </div>

            {/* Bangla Title */}
            <span
              className={`text-[10px] sm:text-xs mt-1.5 font-bold transition-all duration-200 ${
                isActive ? 'text-[#FFBF00]' : 'text-gray-400 group-hover:text-gray-200'
              }`}
            >
              {cat.label}
            </span>
          </button>
        );
      })}
    </aside>
  );
}
