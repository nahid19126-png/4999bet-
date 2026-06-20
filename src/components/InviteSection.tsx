import React, { useState } from 'react';
import { ArrowLeft, Trophy, Star, Medal, Briefcase, Footprints, Copy, Check, Users, Sparkles } from 'lucide-react';
import { MOCK_WINNERS } from '../data';

interface InviteSectionProps {
  onBackToHome: () => void;
  userBalance: number;
}

export default function InviteSection({ onBackToHome, userBalance }: InviteSectionProps) {
  const [copied, setCopied] = useState(false);
  const referralCode = "4999BET_REF_7718";
  const referralLink = `https://4999bet.com/register?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 bg-[#0a0a0a] text-white p-3 overflow-y-auto h-[calc(100vh-155px)] no-scrollbar pb-10">
      {/* 1. Header Row matches Screenshot title formatting */}
      <div className="flex items-center justify-between py-2.5 border-b border-[#333] mb-4 px-1 bg-[#1a1a1a]/40 rounded-xl shadow-sm">
        <button
          type="button"
          onClick={onBackToHome}
          className="p-1 px-2.5 rounded-lg bg-[#1a1a1a] hover:bg-neutral-800 border border-[#333] text-gray-400 hover:text-white flex items-center space-x-1 transition"
          id="invite-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-bold font-sans">হোম</span>
        </button>
        <h1 className="text-sm sm:text-base font-black text-white tracking-wide text-center uppercase">আমন্ত্রণে কমিশন (Affiliate Program)</h1>
        <div className="w-14"></div>
      </div>

      {/* 2. Main Blue-to-Purple Gradient Leaderboard Container matches Leaderboard image */}
      <div 
        className="rounded-2xl bg-gradient-to-br from-[#1c13ff]/30 to-[#8c1292]/30 border border-[#333] p-4 text-white shadow-xl relative overflow-hidden mb-6"
        id="leaderboard-card-gradient"
      >
        {/* Title */}
        <h2 className="text-center text-xl font-black tracking-wide flex items-center justify-center space-x-1">
          <span>🏆</span>
          <span className="text-[#FFBF00] drop-shadow">সাপ্তাহিক লিডারবোর্ড</span>
          <span>🏆</span>
        </h2>
        <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest font-extrabold mt-1">
          যে ব্যক্তি পুরস্কৃত হয়েছে (Winner List)
        </p>

        {/* Winner Rows styled exactly like Screenshot 6 */}
        <div className="space-y-2 mt-4" id="winner-list-rows">
          {MOCK_WINNERS.slice(0, 4).map((winner, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between bg-black/50 border border-[#333] rounded-xl px-4 py-2 text-white shadow-inner text-xs sm:text-sm font-bold transition-transform hover:scale-102"
              >
                {/* Username masked */}
                <span className="text-gray-300 tracking-wider font-mono">
                  {winner.username}
                </span>

                {/* Status pill "গৃহীত" (Received) */}
                <span className="text-emerald-400 bg-emerald-900/20 border border-emerald-500/20 px-2.5 py-0.5 rounded text-[10px] font-black uppercase">
                  {winner.status}
                </span>

                {/* Prize Amount in Taka */}
                <span className="text-[#FFBF00] font-extrabold flex items-center">
                  ৳ {winner.prize.toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Referral Code Link Section */}
      <div className="bg-[#1a1a1a] rounded-2xl p-4 shadow-sm border border-[#333] mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 select-none">
          <div className="w-10 h-10 rounded-full bg-[#FFBF00]/10 flex items-center justify-center text-[#FFBF00] shrink-0">
            <Users className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-extrabold text-[#FFBF00]">আপনার অনন্য আমন্ত্রণ লিঙ্ক (Invite Link)</h3>
            <p className="text-[10px] text-gray-400 font-medium">বন্ধুদের আমন্ত্রণ জানিয়ে অতিরিক্ত কমিশন উপার্জন করুন</p>
          </div>
        </div>

        <div className="flex w-full md:w-auto items-center justify-between space-x-2 bg-black/40 border border-[#333] rounded-lg p-2 px-3">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-gray-300 truncate max-w-[200px]">
            {referralLink}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className={`p-1.5 rounded-md flex items-center justify-center text-black ${
              copied ? 'bg-emerald-500 text-white' : 'bg-[#FFBF00] hover:brightness-110 active:scale-95'
            } transition`}
            id="copy-ref-link-btn"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 3. Section Title "প্রাপ্ত পুরস্কার" matches Leaderboard image lower half */}
      <div className="mb-3 px-1 flex items-center justify-between select-none">
        <h3 className="text-sm font-black text-white flex items-center uppercase font-bold tracking-wide">
          <Sparkles className="w-4 h-4 text-[#FFBF00] mr-1.5" />
          প্রাপ্ত পুরস্কার (Rewards Received)
        </h3>
        <span className="text-[10px] text-gray-500 font-mono">সর্বশেষ ২৪ ঘন্টার হিসাব</span>
      </div>

      {/* Detailed Prize cards exactly structured with colorful vectors from Screenshot part */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="prizes-received-cards">
        
        {/* Card 1: Star Invitation Rewards */}
        <div className="bg-[#1a1a1a] rounded-2xl p-4.5 flex items-center space-x-4 shadow-sm border border-[#333] relative overflow-hidden group">
          {/* Decorative background glow overlay */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-yellow-200/10 to-transparent rounded-full"></div>
          
          {/* Star illustration exactly held up */}
          <div className="w-14 h-14 bg-black/40 border border-[#333] rounded-xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition duration-250 select-none">
            ⭐
          </div>

          <div className="flex-1 space-y-0.5">
            <h4 className="text-xs font-semibold text-gray-400 uppercase">
              আমন্ত্রণ পুরস্কার (Invitation)
            </h4>
            <p className="text-lg font-black text-[#FFBF00] tracking-tight leading-tight">
              ৳ 3,241,176.00
            </p>
            <p className="text-[10px] text-gray-500 font-bold bg-black/40 inline-block px-2 py-0.5 rounded leading-none">
              7955 দাবিত (Claims)
            </p>
          </div>
        </div>

        {/* Card 2: Success Medal Rewards */}
        <div className="bg-[#1a1a1a] rounded-2xl p-4.5 flex items-center space-x-4 shadow-sm border border-[#333] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-200/10 to-transparent rounded-full"></div>
          
          {/* Medal Illustration */}
          <div className="w-14 h-14 bg-black/40 border border-[#333] rounded-xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition duration-250 select-none">
            🏅
          </div>

          <div className="flex-1 space-y-0.5">
            <h4 className="text-xs font-semibold text-gray-400 uppercase">
              সাফল্য পুরস্কার (Success Bonus)
            </h4>
            <p className="text-lg font-black text-[#FFBF00] tracking-tight leading-tight">
              ৳ 441,936.00
            </p>
            <p className="text-[10px] text-gray-500 font-bold bg-black/40 inline-block px-2 py-0.5 rounded leading-none">
              792 দাবিত (Claims)
            </p>
          </div>
        </div>

        {/* Card 3: Cash Bag No Deposit Rewards */}
        <div className="bg-[#1a1a1a] rounded-2xl p-4.5 flex items-center space-x-4 shadow-sm border border-[#333] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-200/10 to-transparent rounded-full"></div>
          
          {/* Sacks illustration */}
          <div className="w-14 h-14 bg-black/40 border border-[#333] rounded-xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition duration-250 select-none">
            💰
          </div>

          <div className="flex-1 space-y-0.5">
            <h4 className="text-xs font-semibold text-gray-400 uppercase">
              জমা ছাড়া পুরস্কার (No Deposit)
            </h4>
            <p className="text-lg font-black text-[#FFBF00] tracking-tight leading-tight">
              ৳ 1,868,199.54
            </p>
            <p className="text-[10px] text-gray-500 font-bold bg-black/40 inline-block px-2 py-0.5 rounded leading-none">
              18807 দাবিত (Claims)
            </p>
          </div>
        </div>

        {/* Card 4: Football Betting Rebate */}
        <div className="bg-[#1a1a1a] rounded-2xl p-4.5 flex items-center space-x-4 shadow-sm border border-[#333] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-red-200/10 to-transparent rounded-full"></div>
          
          {/* Football representation spinner */}
          <div className="w-14 h-14 bg-black/40 border border-[#333] rounded-xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition duration-250 select-none">
            ⚽
          </div>

          <div className="flex-1 space-y-0.5">
            <h4 className="text-xs font-semibold text-gray-400 uppercase">
              বেটিং রিবেট বোনাস (Bet Rebate)
            </h4>
            <p className="text-lg font-black text-[#FFBF00] tracking-tight leading-tight">
              ৳ 2,455,100.00
            </p>
            <p className="text-[10px] text-gray-500 font-bold bg-black/40 inline-block px-2 py-0.5 rounded leading-none">
              3401 দাবিত (Claims)
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
