import React from 'react';
import { User, Shield, LogOut, ArrowRight, Wallet, History, MessageSquare, KeyRound, Headphones, UserCircle } from 'lucide-react';

interface MemberSectionProps {
  onBackToHome: () => void;
  userBalance: number;
  isLoggedIn: boolean;
  username: string;
  onLogout: () => void;
  openLoginModal: () => void;
}

export default function MemberSection({
  onBackToHome,
  userBalance,
  isLoggedIn,
  username,
  onLogout,
  openLoginModal
}: MemberSectionProps) {
  return (
    <div className="flex-1 bg-[#0a0a0a] p-3 overflow-y-auto h-[calc(100vh-155px)] no-scrollbar pb-10">
      
      {/* isLoggedIn state check */}
      {isLoggedIn ? (
        <div className="space-y-4">
          
          {/* Member Profile Main Banner */}
          <div className="relative rounded-2xl bg-[#1a1a1a] p-4 border border-[#333] shadow-xl overflow-hidden select-none">
            {/* VIP Golden Background stamp */}
            <div className="absolute right-[-20px] top-[-25px] text-gray-800/10 text-9xl font-black font-serif italic uppercase tracking-tighter">
              VIP
            </div>

            <div className="flex items-center space-x-3.5 z-10 relative">
              {/* VIP Avatar ring */}
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#FFBF00] to-yellow-300 p-0.5 shadow-lg shadow-yellow-500/10">
                  <div className="w-full h-full rounded-full bg-[#161617] flex items-center justify-center">
                    <UserCircle className="w-8 h-8 text-[#FFBF00]" />
                  </div>
                </div>
                {/* Yellow text level tag */}
                <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 bg-[#FFBF00] text-black text-[9px] font-black uppercase px-2 py-0.2 rounded-full border border-black shadow">
                  Level 3
                </span>
              </div>

              {/* Username details */}
              <div className="flex-1 space-y-0.5">
                <h3 className="text-white font-extrabold text-sm tracking-wide">
                  @{username}
                </h3>
                <p className="text-[10px] text-gray-405 text-gray-400 font-bold uppercase tracking-widest flex items-center">
                  <Shield className="w-3 h-3 text-[#FFBF00] mr-1" />
                  ভিআইপি ৩ সদস্য (VIP 3 Member)
                </p>
              </div>
            </div>

            {/* VIP Level progress bar exact matches typical high-end designs */}
            <div className="mt-4 pt-3.5 border-t border-[#333]">
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 mb-1">
                <span>VIP 3 EXP (লেভেল সমাপ্তি)</span>
                <span className="text-[#FFBF00]">75%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-900 overflow-hidden border border-[#333] p-[1px]">
                <div className="h-full bg-gradient-to-r from-[#FFBF00] to-yellow-405 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-[9px] text-gray-500 mt-1 font-bold">পরবর্তী ভিআইপি লেভেল ৪ আনলক করতে ৳ ৫,০০০ বাকী</p>
            </div>
          </div>

          {/* Account Balance Plate */}
          <div className="bg-[#1a1a1a] p-4.5 rounded-2xl border border-[#333] flex items-center justify-between shadow-md">
            <div className="space-y-0.5">
              <p className="text-[10px] text-gray-450 text-gray-400 font-bold uppercase tracking-wider font-sans">বর্তমান ওয়ালেট ব্যালেন্স (Balance)</p>
              <p className="text-2xl font-black text-[#FFBF00] tracking-tight">
                ৳ {userBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            
            <div className="shrink-0 bg-yellow-500/10 p-2.5 rounded-full border border-yellow-500/10 text-[#FFBF00]">
              <Wallet className="w-5 h-5 animate-pulse" />
            </div>
          </div>

          {/* Menu Options lists in Bangla with gold icon indicators */}
          <div className="bg-[#1a1a1a] rounded-2xl border border-[#333] overflow-hidden divide-y divide-[#333]">
            
            {/* option 1: Personal info */}
            <div className="flex items-center justify-between p-3.5 hover:bg-[#111] cursor-pointer transition group" onClick={() => alert('ব্যক্তিগত তথ্য সুরক্ষিত স্তরে রয়েছে')}>
              <div className="flex items-center space-x-3 text-gray-300 group-hover:text-white">
                <User className="w-4.5 h-4.5 text-[#FFBF00]" />
                <span className="text-xs font-bold">ব্যক্তিগত তথ্য (Profile details)</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#FFBF00] transition-colors" />
            </div>

            {/* option 2: Transaction History */}
            <div className="flex items-center justify-between p-3.5 hover:bg-[#111] cursor-pointer transition group" onClick={() => alert('ব্যালেন্স লেনদেন বিবরণ ইতিহাস লোড হচ্ছে...')}>
              <div className="flex items-center space-x-3 text-gray-300 group-hover:text-white">
                <History className="w-4.5 h-4.5 text-[#FFBF00]" />
                <span className="text-xs font-bold">লেনদেন ইতিহাস (Transactions)</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#FFBF00] transition-colors" />
            </div>

            {/* option 3: Security Vault */}
            <div className="flex items-center justify-between p-3.5 hover:bg-[#111] cursor-pointer transition group" onClick={() => alert('ভল্ট পাসওয়ার্ড দিয়ে খুলুন...')}>
              <div className="flex items-center space-x-3 text-gray-300 group-hover:text-white">
                <KeyRound className="w-4.5 h-4.5 text-[#FFBF00]" />
                <span className="text-xs font-bold">নিরাপদ ভল্ট (Safe Vault)</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#FFBF00] transition-colors" />
            </div>

            {/* option 4: Message center */}
            <div className="flex items-center justify-between p-3.5 hover:bg-[#111] cursor-pointer transition group" onClick={() => alert('আপাতত কোনো অপঠিত বার্তা নেই!')}>
              <div className="flex items-center space-x-3 text-gray-300 group-hover:text-white">
                <MessageSquare className="w-4.5 h-4.5 text-[#FFBF00]" />
                <span className="text-xs font-bold">বার্তা কেন্দ্র (Inbox Messages)</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#FFBF00] transition-colors" />
            </div>

            {/* option 5: Help center */}
            <div className="flex items-center justify-between p-3.5 hover:bg-[#111] cursor-pointer transition group" onClick={() => alert('সাহায্য সহায়িকা লোড করা হচ্ছে...')}>
              <div className="flex items-center space-x-3 text-gray-300 group-hover:text-white">
                <Headphones className="w-4.5 h-4.5 text-[#FFBF00]" />
                <span className="text-xs font-bold">সাহায্য ডেস্ক (Help Center 24/7)</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#FFBF00] transition-colors" />
            </div>

          </div>

          {/* Logout Action button */}
          <button
            type="button"
            onClick={onLogout}
            className="w-full py-3 rounded-lg border border-red-500/20 bg-red-950/10 text-red-500 hover:bg-red-500/20 font-bold text-xs tracking-wide flex items-center justify-center space-x-2 active:scale-95 transition-all text-center uppercase"
            id="btn-logout"
          >
            <LogOut className="w-4 h-4" />
            <span>লগআউট করুন (Log Out)</span>
          </button>

        </div>
      ) : (
        /* Guest / logged out state layout */
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-4xl select-none shadow">
            👤
          </div>
          <div className="space-y-1">
            <h3 className="text-white font-extrabold text-sm sm:text-base">সদস্য প্রোফাইল দেখতে লগইন করুন</h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto font-sans">নিরাপত্তা ও গোপনীয়তা সুরক্ষার্থে অ্যাকাউন্ট প্রোফাইল অ্যাক্সেস করতে অনুগ্রহ করে নিচে সাইন ইন করুন।</p>
          </div>
          
          <button
            type="button"
            onClick={openLoginModal}
            className="px-6 py-3 rounded-lg bg-[#FFBF00] text-black text-xs font-extrabold uppercase shadow-md hover:brightness-110 active:scale-95 transition"
            id="member-fallback-login-btn"
          >
            সরাসরি লগইন করুন
          </button>
        </div>
      )}

    </div>
  );
}
