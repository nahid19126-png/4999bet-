import React, { useState, useMemo } from 'react';
import { ArrowLeft, Gift, ShieldCheck, Ticket, Gamepad2, ArrowRight } from 'lucide-react';
import { PROMOTIONS_DATA } from '../data';
import { PromotionItem } from '../types';

interface PromotionSectionProps {
  onBackToHome: () => void;
  onClaimPromo: (promoTitle: string, bonusAmount: string) => void;
}

export default function PromotionSection({ onBackToHome, onClaimPromo }: PromotionSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'deposit' | 'download'>('all');

  const filteredPromos = useMemo(() => {
    if (activeFilter === 'all') return PROMOTIONS_DATA;
    if (activeFilter === 'deposit') {
      return PROMOTIONS_DATA.filter(p => p.imageTheme === 'deposit' || p.imageTheme === 'registration');
    }
    if (activeFilter === 'download') {
      return PROMOTIONS_DATA.filter(p => p.imageTheme === 'download' || p.imageTheme === 'invite');
    }
    return PROMOTIONS_DATA;
  }, [activeFilter]);

  // Render highly-polished cartoonish thematic illustrations for each banner type matching screenshot characters
  const renderPromotionIllustration = (theme: PromotionItem['imageTheme']) => {
    switch (theme) {
      case 'registration':
        return (
          <div className="absolute right-0 bottom-0 h-[105px] w-[100px] sm:w-[120px] sm:h-[125px] flex items-end justify-center select-none" id="illustration-warrior">
            {/* Crowned Golden gladiator/warrior representation */}
            <div className="relative text-7xl select-none filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] transform -rotate-3 hover:translate-y-[-5px] transition-transform duration-300">
              👑
              <span className="absolute text-5xl right-[-10px] bottom-1 select-none">🛡️</span>
              <span className="absolute text-4xl left-[-15px] bottom-0 select-none">💰</span>
            </div>
          </div>
        );
      case 'download':
        return (
          <div className="absolute right-1 bottom-0 h-[115px] w-[130px] flex items-end justify-center select-none" id="illustration-jester">
            {/* Jester smiling with holding a cane */}
            <div className="relative text-7xl filter drop-shadow-[0_8px_14px_rgba(236,72,153,0.5)] animate-bounce select-none">
              🃏
              <span className="absolute text-3xl bottom-0 right-[-10px]">✨</span>
            </div>
          </div>
        );
      case 'invite':
        return (
          <div className="absolute right-2 bottom-1 h-[100px] w-[110px] flex items-end justify-center select-none" id="illustration-tiger">
            {/* Cute tiger with gold money heap */}
            <div className="relative text-7xl filter drop-shadow-[0_4px_8px_rgba(249,115,22,0.4)] select-none hover:scale-105 transition-transform duration-200">
              🐯
              <span className="absolute text-4xl -bottom-1 -left-4">🪙</span>
              <span className="absolute text-3xl bottom-1 -right-3">🎉</span>
            </div>
          </div>
        );
      case 'deposit':
        return (
          <div className="absolute right-1 bottom-0 h-[105px] w-[100px] sm:w-[110px] flex items-end justify-center select-none" id="illustration-egypt">
            {/* Golden Egyptian Anubis / God deity with treasures */}
            <div className="relative text-6xl filter drop-shadow-[0_5px_15px_rgba(212,175,55,0.4)] tracking-tighter select-none">
              🐈‍⬛
              <span className="absolute text-4xl -bottom-1 -left-4">🏺</span>
              <span className="absolute text-4xl -bottom-1 -right-3">🎁</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-[#0a0a0a] p-3 overflow-y-auto h-[calc(100vh-155px)] no-scrollbar pb-10">
      {/* Top Banner Navigation Header */}
      <div className="flex items-center justify-between py-2 border-b border-[#333] mb-3.5 px-1 bg-[#1a1a1a]/40 rounded-xl">
        <button
          type="button"
          onClick={onBackToHome}
          className="p-1 px-2.5 rounded-lg bg-neutral-900 border border-[#333] text-gray-400 hover:text-white flex items-center space-x-1 transition"
          id="btn-promo-back"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-bold">হোম</span>
        </button>
        <h1 className="text-sm font-black text-[#FFBF00] tracking-wide text-center uppercase">প্রোমোশন (Promotions)</h1>
        <div className="w-14"></div> {/* empty spacing center layout */}
      </div>

      {/* Filter Tabs matching Screenshot layout exactly: All, Deposit, APP Download */}
      <div className="flex space-x-2.5 mb-4 select-none">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-lg border transition ${
            activeFilter === 'all'
              ? 'bg-[#FFBF00] text-black border-transparent shadow shadow-yellow-500/25'
              : 'bg-[#1a1a1a] text-gray-400 border-[#333] hover:text-white'
          }`}
          id="filter-promo-all"
        >
          All
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('deposit')}
          className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-lg border transition ${
            activeFilter === 'deposit'
              ? 'bg-[#FFBF00] text-black border-transparent shadow shadow-yellow-500/25'
              : 'bg-[#1a1a1a] text-gray-400 border-[#333] hover:text-white'
          }`}
          id="filter-promo-deposit"
        >
          Deposit
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('download')}
          className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-lg border transition ${
            activeFilter === 'download'
              ? 'bg-[#FFBF00] text-black border-transparent shadow shadow-yellow-500/25'
              : 'bg-[#1a1a1a] text-gray-400 border-[#333] hover:text-white'
          }`}
          id="filter-promo-download"
        >
          APP Download
        </button>
      </div>

      {/* List of beautifully designed framed billboards matching Screenshots 4 & 5 */}
      <div className="space-y-4" id="promotions-list">
        {filteredPromos.map((promo) => {
          return (
            <div
              key={promo.id}
              className="relative rounded-2xl border border-[#FFBF00]/30 bg-[#1a1a1a] p-4.5 overflow-hidden shadow-xl hover:border-[#FFBF00] transition duration-300 flex flex-col justify-between h-[155px]"
              id={`promo-card-${promo.id}`}
            >
              {/* Outer decorative light corners inside the rounded border matching reference Screenshot 5 */}
              <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-[#FFBF00] opacity-40"></div>
              <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-[#FFBF00] opacity-40"></div>
              <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-[#FFBF00] opacity-40"></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-[#FFBF00] opacity-40"></div>

              {/* Top Row with Brand Badge and Back Plate */}
              <div className="flex items-center justify-between select-none">
                <div className="flex items-center space-x-1 bg-black/40 px-1.5 py-0.5 rounded-full border border-[#333] scale-90 origin-left">
                  <span className="bg-[#ea1c24] text-white px-1.5 py-0.2 rounded-l text-[9px] font-black skew-x-3">4999</span>
                  <span className="bg-[#FFBF00] text-black px-1 py-0.2 rounded-r text-[9px] font-black skew-x-3 -ml-0.5">BET</span>
                </div>
              </div>

              {/* Center Content Section with Text */}
              <div className="max-w-[65%] sm:max-w-[70%] space-y-1.5 z-10">
                {/* Title in gold */}
                <h3 className="text-base sm:text-lg font-black text-[#FFBF00] drop-shadow select-none">
                  {promo.title}
                </h3>

                {/* Subtitle / Description */}
                <p className="text-[10px] text-gray-300 font-bold leading-relaxed pr-2">
                  {promo.subText}
                </p>

                {/* Red Pill / Badge offering high returns */}
                <div className="flex items-center inline-flex bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 text-white font-extrabold text-[11px] px-3.5 py-1 rounded-full border border-yellow-400/20 shadow-inner group-hover:scale-105 transition-all">
                  <Ticket className="w-3.5 h-3.5 mr-1" />
                  {promo.badge}
                </div>
              </div>

              {/* Character Illustration overlays right side */}
              {renderPromotionIllustration(promo.imageTheme)}

              {/* Highlight Bottom Accent */}
              <div className="flex items-center justify-between mt-1 z-10">
                <span className="text-[9px] sm:text-[10px] text-yellow-300/60 font-semibold italic">
                  {promo.accentText}
                </span>

                <button
                  type="button"
                  onClick={() => onClaimPromo(promo.title, promo.bulletBonus)}
                  className="px-3.5 py-1 rounded-lg bg-gradient-to-b from-[#FFF59D] to-[#FFD54F] text-black text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 hover:brightness-110 active:scale-95 transition"
                >
                  <span>ক্লেম করুন</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
