import React, { useState } from 'react';
import { ArrowLeft, Landmark, CreditCard, ReceiptIndianRupee, ChevronRight, CheckCircle2, ShieldCheck, Wallet, DollarSign, ArrowUpRight } from 'lucide-react';

interface DepositSectionProps {
  onBackToHome: () => void;
  userBalance: number;
  onAddBalance: (amount: number) => void;
  onWithdrawBalance: (amount: number) => boolean;
  onRequestDeposit?: (amount: number, channel: string) => void;
  onRequestWithdraw?: (amount: number, account: string) => void;
}

export default function DepositSection({
  onBackToHome,
  userBalance,
  onAddBalance,
  onWithdrawBalance,
  onRequestDeposit,
  onRequestWithdraw
}: DepositSectionProps) {
  const [activeChannel, setActiveChannel] = useState<'bkash' | 'nagad' | 'rocket'>('bkash');
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [depositMsg, setDepositMsg] = useState('');
  const [isDepositing, setIsDepositing] = useState(true); // switch between deposit and withdraw

  // Withdraw state
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [withdrawAccount, setWithdrawAccount] = useState<string>('');
  const [withdrawMsg, setWithdrawMsg] = useState('');

  const depositChannels = [
    {
      id: 'bkash' as const,
      name: 'bKash (বিকাশ)',
      officialColor: 'bg-[#e2125a]',
      accentBorder: 'border-[#e2152a]',
      iconText: 'bkash'
    },
    {
      id: 'nagad' as const,
      name: 'Nagad (নগদ)',
      officialColor: 'bg-[#f26522]',
      accentBorder: 'border-[#f23c21]',
      iconText: 'nagad'
    },
    {
      id: 'rocket' as const,
      name: 'Rocket (রকেট)',
      officialColor: 'bg-[#8c3192]',
      accentBorder: 'border-[#8c1292]',
      iconText: 'rock'
    }
  ];

  const presetAmounts = [100, 500, 1000, 5000, 10000, 25000];

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmt = customAmount ? parseFloat(customAmount) : selectedAmount;
    
    if (isNaN(finalAmt) || finalAmt <= 0) {
      setDepositMsg('অনুগ্রহ করে সঠিক টাকা নির্ধারণ করুন');
      return;
    }

    if (finalAmt < 100) {
      setDepositMsg('সর্বনিম্ন ডিপোজিট পরিমাণ ৳ ১০০');
      return;
    }

    if (onRequestDeposit) {
      onRequestDeposit(finalAmt, activeChannel.toUpperCase());
      setDepositMsg(`আবেদন জমা হয়েছে! ৳ ${finalAmt.toLocaleString()} ডিপোজিট আবেদনটি সফলভাবে পাঠানো হয়েছে। কন্ট্রোলার প্যানেল থেকে অনুমোদন করলেই তা ব্যালেন্সে যোগ হবে।`);
    } else {
      // Call state update fallback
      onAddBalance(finalAmt);
      setDepositMsg(`অভিনন্দন! আপনার ${activeChannel.toUpperCase()} এর মাধ্যমে ৳ ${finalAmt.toLocaleString()} সফলভাবে জমা হয়েছে।`);
    }
    setCustomAmount('');
    
    setTimeout(() => {
      setDepositMsg('');
    }, 6000);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalWithdraw = parseFloat(withdrawAmount);
    
    if (isNaN(finalWithdraw) || finalWithdraw <= 0) {
      setWithdrawMsg('অনুগ্রহ করে সঠিক টাকা নির্ধারণ করুন');
      return;
    }

    if (finalWithdraw > userBalance) {
      setWithdrawMsg('দুঃখিত! আপনার মূল ব্যালেন্স অপর্যাপ্ত');
      return;
    }

    if (!withdrawAccount.trim()) {
      setWithdrawMsg('দয়া করে আপনার অ্যাকাউন্ট নম্বর দিন');
      return;
    }

    if (onRequestWithdraw) {
      onRequestWithdraw(finalWithdraw, withdrawAccount);
      setWithdrawMsg(`আবেদন জমা হয়েছে! ৳ ${finalWithdraw.toLocaleString()} উত্তোলনের আবেদনটি কন্ট্রোলারের কাছে পাঠানো হয়েছে। এডমিন অ্যাপ্রুভ করলে ব্যালেন্স কর্তন হবে।`);
      setWithdrawAmount('');
      setWithdrawAccount('');
    } else {
      const completed = onWithdrawBalance(finalWithdraw);
      if (completed) {
        setWithdrawMsg(`আবেদন সফল! ৳ ${finalWithdraw.toLocaleString()} আপনার ${withdrawAccount} নম্বরে ২ ঘন্টার মধ্যে পাঠানো হবে।`);
        setWithdrawAmount('');
        setWithdrawAccount('');
      }
    }
    
    setTimeout(() => {
      setWithdrawMsg('');
    }, 6000);
  };

  return (
    <div className="flex-1 bg-[#0a0a0a] p-3 overflow-y-auto h-[calc(100vh-155px)] no-scrollbar pb-10">
      
      {/* Tab Navigation header */}
      <div className="flex items-center justify-between py-2 border-b border-[#333] mb-4 px-1 bg-[#1a1a1a]/40 rounded-xl shadow-inner">
        <button
          type="button"
          onClick={onBackToHome}
          className="p-1 px-2.5 rounded-lg bg-[#1a1a1a] border border-[#333] text-gray-400 hover:text-white flex items-center space-x-1 transition"
          id="btn-deposit-back"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-bold font-sans">হোম</span>
        </button>
        
        {/* Toggle Deposit vs Withdraw */}
        <div className="flex space-x-1.5 p-0.5 bg-black rounded-lg border border-[#333]">
          <button
            type="button"
            onClick={() => { setIsDepositing(true); setDepositMsg(''); setWithdrawMsg(''); }}
            className={`px-3 py-1 text-xs font-extrabold rounded-md transition ${isDepositing ? 'bg-[#FFBF00] text-black' : 'text-gray-400'}`}
          >
            ডিপোজিট
          </button>
          <button
            type="button"
            onClick={() => { setIsDepositing(false); setDepositMsg(''); setWithdrawMsg(''); }}
            className={`px-3 py-1 text-xs font-extrabold rounded-md transition ${!isDepositing ? 'bg-[#FFBF00] text-black' : 'text-gray-400'}`}
          >
            উত্তোলন
          </button>
        </div>
        <div className="w-14"></div>
      </div>

      {isDepositing ? (
        /* DEPOSIT FORM */
        <div className="space-y-4">
          <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-[#333]">
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-2">নিরাপদ গেটওয়ে নির্বাচন করুন</h3>
            
            {/* Horizontal Gateway selectors with brand colors */}
            <div className="grid grid-cols-3 gap-2">
              {depositChannels.map((channel) => {
                const isActive = activeChannel === channel.id;
                return (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => { setActiveChannel(channel.id); setDepositMsg(''); }}
                    className={`p-3 rounded-xl flex flex-col items-center justify-center border transition-all relative overflow-hidden select-none cursor-pointer ${
                      isActive 
                        ? 'border-[#FFBF00] bg-[#FFBF00]/10 text-[#FFBF00]' 
                        : 'border-[#333] bg-black/40 hover:bg-[#1a1a1a]'
                    }`}
                  >
                    {/* Small Colored Circle representing active gateway color */}
                    <div className={`w-8 h-8 rounded-full ${channel.officialColor} flex items-center justify-center text-white font-black text-xs shadow-inner`}>
                      {channel.iconText[0].toUpperCase()}
                    </div>
                    <span className="text-[10px] sm:text-xs font-black text-white mt-2 truncate max-w-full">
                      {channel.name.split(' ')[0]}
                    </span>
                    {isActive && (
                      <div className="absolute right-1 top-1 text-[#FFBF00]">
                        <CheckCircle2 className="w-3.5 h-3.5 fill-black" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleDepositSubmit} className="space-y-4">
            
            {/* Amount Selection */}
            <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-[#333] space-y-3">
              <div className="flex justify-between items-center select-none">
                <h3 className="text-xs font-extrabold text-gray-400">টাকার পরিমাণ নির্বাচন করুন (Amount)</h3>
                <span className="text-[10px] text-gray-500 font-mono">৳ ১০০ - ৳ ২৫,০০০</span>
              </div>

              {/* Preset Cards */}
              <div className="grid grid-cols-3 gap-2">
                {presetAmounts.map((amt) => {
                  const isAmtSelected = selectedAmount === amt && !customAmount;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                      className={`py-2 rounded-lg text-xs font-black relative overflow-hidden transition-all border ${
                        isAmtSelected
                          ? 'bg-[#FFBF00]/10 text-[#FFBF00] border-[#FFBF00]'
                          : 'bg-black/40 text-gray-400 border-[#333] hover:text-white'
                      }`}
                    >
                      ৳ {amt.toLocaleString()}
                    </button>
                  );
                })}
              </div>

              {/* Custom Input directly */}
              <div className="pt-2">
                <div className="flex items-center bg-[#0d0d0d] rounded-xl border border-[#333] p-2.5 focus-within:border-[#FFBF00] transition">
                  <span className="text-[#FFBF00] font-black text-sm mr-2 select-none">৳</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0); }}
                    placeholder="অন্যান্য পরিমাণ লিখুন (যেমন ৫০০)"
                    className="bg-transparent border-none outline-none text-white text-xs w-full placeholder-gray-600 font-sans"
                    id="deposit-custom-input"
                  />
                </div>
              </div>
            </div>

            {/* Instruction list matching high polish layout */}
            <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-[#333] text-xs text-gray-400 space-y-2 select-none">
              <h4 className="text-[#FFBF00] font-black flex items-center mb-1">
                <ShieldCheck className="w-4 h-4 mr-1.5" />
                ডিপোজিট নির্দেশাবলী (Step-by-step)
              </h4>
              <p>১. গেটওয়ে নির্বাচন করে ক্লেম করার পরিমাণ নির্ধারণ করুন।</p>
              <p>২. "নিরাপদে জমা করুন" বাটনে ক্লিক করলে ৫ সেকেন্ডে টাকা যুক্ত হবে।</p>
              <p>৩. যেকোনো ডিপোজিট সমস্যা হলে সাথে সাথে লাইভ কাস্টমার কেয়ার প্রতিনিধির সাথে যোগাযোগ করুন।</p>
            </div>

            {/* Simulated success popup notifications */}
            {depositMsg && (
              <div className="bg-emerald-950/40 border-2 border-emerald-500/30 text-emerald-250 text-xs py-3.5 px-4 rounded-xl text-center font-bold">
                🎉 {depositMsg}
              </div>
            )}

            {/* Confirm button */}
            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-[#FFBF00] text-black font-extrabold text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-[0_0_15px_rgba(255,191,0,0.3)]"
              id="deposit-submit-btn"
            >
              নিরাপদে জমা করুন
            </button>
          </form>
        </div>
      ) : (
        /* WITHDRAWAL FORM */
        <div className="space-y-4">
          <form onSubmit={handleWithdrawSubmit} className="space-y-4">
            
            {/* Total Balance Plate */}
            <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-[#333] flex justify-between items-center select-none">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">উত্তোলনযোগ্য ব্যালেন্স</p>
                <p className="text-xl font-black text-[#FFBF01] text-[#FFBF00]">
                  ৳ {userBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="p-2.5 bg-[#FFBF00]/10 rounded-full text-[#FFBF00]">
                <Wallet className="w-5 h-5" />
              </div>
            </div>

            {/* Inputs card view */}
            <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-[#333] space-y-4">
              
              {/* Account channel Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">উত্তোলন চ্যানেল (bKash / Nagad / Rocket)</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#0a0a0a] border border-[#333] flex items-center justify-between">
                    <span className="text-xs text-white font-bold select-none font-sans">বিকাশ (bKash)</span>
                    <input type="radio" name="withch" defaultChecked className="text-[#FFBF00] focus:ring-0" />
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0a0a0a] border border-[#333] flex items-center justify-between">
                    <span className="text-xs text-white font-bold select-none font-sans">নগদ (Nagad)</span>
                    <input type="radio" name="withch" className="text-[#FFBF00] focus:ring-0" />
                  </div>
                </div>
              </div>

              {/* Amount input */}
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">উত্তোলন করুন (Amount)</label>
                <div className="flex items-center bg-[#0d0d0d] rounded-xl border border-[#333] p-2.5 focus-within:border-[#FFBF00]">
                  <span className="text-[#FFBF00] font-black text-sm mr-2 select-none">৳</span>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="মিনিমাম উত্তোলন ৳ ৫০০"
                    className="bg-transparent border-none text-white text-xs w-full placeholder-gray-600 outline-none font-sans"
                    id="withdraw-amt-input"
                  />
                </div>
              </div>

              {/* Mobile Account Details */}
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">মোবাইল অ্যাকাউন্ট নম্বর</label>
                <div className="flex items-center bg-[#0d0d0d] rounded-xl border border-[#333] p-2.5 focus-within:border-[#FFBF00]">
                  <input
                    type="text"
                    value={withdrawAccount}
                    placeholder="যেমনঃ 017XXXXXXXX"
                    onChange={(e) => setWithdrawAccount(e.target.value)}
                    className="bg-transparent border-none text-white text-xs w-full placeholder-gray-600 outline-none tracking-widest font-sans"
                    id="withdraw-acc-input"
                  />
                </div>
              </div>
            </div>

            {withdrawMsg && (
              <div className="bg-orange-950/40 border-2 border-orange-500/30 text-orange-200 text-xs py-3 px-4 rounded-xl text-center font-bold">
                {withdrawMsg}
              </div>
            )}

            {/* Withdraw trigger */}
            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-[#FFBF00] text-black font-extrabold text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-[0_0_15px_rgba(255,191,0,0.3)]"
              id="withdraw-submit-btn"
            >
              উত্তোলনের আবেদন করুন
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
