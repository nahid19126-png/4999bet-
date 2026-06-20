import React, { useState } from 'react';
import { MessageSquare, Download, Facebook, Send, ArrowUp, RefreshCw, X, Sparkles } from 'lucide-react';

interface FloatingActionsProps {
  onOpenSupport: () => void;
  onOpenLuckyWheel: () => void;
  scrollToTop: () => void;
}

export default function FloatingActions({
  onOpenSupport,
  onOpenLuckyWheel,
  scrollToTop
}: FloatingActionsProps) {
  const [activePromoBanner, setActivePromoBanner] = useState(true);

  const handleActionClick = (actionName: string) => {
    alert(`${actionName} চ্যানেলে সংযুক্ত হওয়া হচ্ছে... অনুগ্রহ করে ২ সেকেন্ড অপেক্ষা করুন।`);
  };

  return (
    <div className="fixed right-3 bottom-20 z-40 flex flex-col items-center space-y-2 select-none">
      
      {/* 1. Featured mini banner floating widget (matches the small "Featured Games" circular badge on bottom right of the screenshot) */}
      {activePromoBanner && (
        <div className="relative animate-bounce mb-1">
          <button
            type="button"
            onClick={() => setActivePromoBanner(false)}
            className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-black/60 text-white flex items-center justify-center text-[10px] hover:bg-neutral-800 transition"
          >
            <X className="w-2.5 h-2.5" />
          </button>
          
          <div 
            onClick={onOpenLuckyWheel}
            className="bg-gradient-to-tr from-rose-600 via-yellow-501 to-[#FFBF00] p-[2px] rounded-full shadow-[0_4px_12px_rgba(255,191,0,0.4)] cursor-pointer"
            title="দৈনিক স্পিন বোনাস চাকা!"
          >
            <div className="bg-[#121212] rounded-full w-12 h-12 flex flex-col items-center justify-center text-center p-1 font-sans">
              <span className="text-sm">🎰</span>
              <span className="text-[7px] text-[#FFBF00] font-black tracking-tighter uppercase animate-pulse">SPIN</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Customer support care chat badge */}
      <button
        type="button"
        onClick={onOpenSupport}
        className="w-10 h-10 rounded-full bg-black/80 hover:bg-[#1f1f21] text-white flex items-center justify-center shadow-lg border border-gray-800 hover:border-[#FFBF00] transition group duration-200"
        title="লাইভ চ্যাট সহায়তা (Live support)"
        id="float-support-btn"
      >
        <MessageSquare className="w-4.5 h-4.5 text-[#FFBF00] group-hover:scale-110 transition" />
      </button>

      {/* 3. App Download badge */}
      <button
        type="button"
        onClick={() => handleActionClick('মোবাইল অ্যাপ্লিকেশন ডাউনলোড')}
        className="w-10 h-10 rounded-full bg-black/80 hover:bg-[#1f1f21] text-white flex items-center justify-center shadow-lg border border-gray-805 hover:border-[#FFBF00] transition group duration-200"
        title="অ্যান্ড্রয়েড অ্যাপ ডাউনলোড (App package)"
        id="float-download-btn"
      >
        <Download className="w-4.5 h-4.5 text-[#FFBF00] group-hover:scale-110 transition" />
      </button>

      {/* 4. Facebook Group link badge */}
      <button
        type="button"
        onClick={() => handleActionClick('অফিসিয়াল ফেসবুক গ্রুপ')}
        className="w-10 h-10 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] flex items-center justify-center shadow-lg border border-[#1877F2]/20 hover:border-[#1877F2] transition group duration-200"
        title="ফেসবুক গ্রুপ (Facebook Group)"
        id="float-facebook-btn"
      >
        <Facebook className="w-4.5 h-4.5 group-hover:scale-110 transition fill-current" />
      </button>

      {/* 5. Telegram Channel badge */}
      <button
        type="button"
        onClick={() => handleActionClick('টেলিগ্রাম প্রমোশন চ্যানেল')}
        className="w-10 h-10 rounded-full bg-sky-501/10 bg-sky-955/20 text-sky-400 flex items-center justify-center shadow-lg border border-sky-500/20 hover:border-sky-400 transition group duration-200"
        title="টেলিগ্রাম চ্যানেল (Telegram Channel)"
        id="float-telegram-btn"
      >
        <Send className="w-4.5 h-4.5 group-hover:scale-110 transition" />
      </button>

      {/* 6. Back to Top Arrow orange button */}
      <button
        type="button"
        onClick={scrollToTop}
        className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-[#FFBF00] text-black flex items-center justify-center shadow-lg active:scale-90 transition duration-155"
        title="উপরে ফিরে যান (Scroll to Top)"
        id="float-scrolltop-btn"
      >
        <ArrowUp className="w-5 h-5 font-black hover:-translate-y-0.5 transition-transform" />
      </button>

    </div>
  );
}
