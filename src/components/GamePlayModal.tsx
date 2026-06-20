import React, { useState, useEffect } from 'react';
import { X, Play, RefreshCw, Sparkles, Coins, HelpCircle } from 'lucide-react';
import { GameItem } from '../types';
import AviatorGame from './AviatorGame';

interface GamePlayModalProps {
  game: GameItem | null;
  isOpen: boolean;
  onClose: () => void;
  userBalance: number;
  onUpdateBalance: (amount: number, gameDetail?: string) => void;
  winMultiplierBoost?: boolean;
}

export default function GamePlayModal({
  game,
  isOpen,
  onClose,
  userBalance,
  onUpdateBalance,
  winMultiplierBoost = false
}: GamePlayModalProps) {
  const [betAmount, setBetAmount] = useState<number>(50);
  const [playingState, setPlayingState] = useState<'idle' | 'running' | 'won' | 'lost'>('idle');
  const [simulationMsg, setSimulationMsg] = useState('');
  const [wonAmount, setWonAmount] = useState(0);
  const [multiplier, setMultiplier] = useState(1.0);
  const [crashTicking, setCrashTicking] = useState(false);

  if (!isOpen || !game) return null;

  // Intercept and load custom designed premium real-time Aviator simulation game board
  if (game.imageType === 'aviator') {
    return (
      <AviatorGame
        onClose={onClose}
        userBalance={userBalance}
        onUpdateBalance={onUpdateBalance}
        winMultiplierBoost={winMultiplierBoost}
      />
    );
  }

  // Predefined bet size triggers
  const betSizes = [10, 50, 100, 500];

  const handleStartPlay = () => {
    if (playingState === 'running') return;

    if (userBalance < betAmount) {
      alert('দুঃখিত! আপনার মূল ব্যালেন্স অপর্যাপ্ত। দয়া করে আগে ডিপোজিট করুন!');
      return;
    }

    // Deduct bet amount
    onUpdateBalance(-betAmount, `গেম খেলেছেন "${game.banglaName}": বেট ৳ ${betAmount}`);
    setPlayingState('running');
    setSimulationMsg('গেম সার্ভারের সাথে সংযোগ করা হচ্ছে...');
    setWonAmount(0);

    // Dynamic simulate outcome based on casino math logic
    if (game.imageType === 'aviator' || game.imageType === 'flyx') {
      // Crash Multipiler game style physics
      let currentMult = 1.0;
      setCrashTicking(true);
      const interval = setInterval(() => {
        // If win multiplier boost, make it climb higher and fast!
        currentMult = parseFloat((currentMult + Math.random() * (winMultiplierBoost ? 0.35 : 0.15) + 0.02).toFixed(2));
        setMultiplier(currentMult);
        setSimulationMsg(`সুপরসনিক জেট উড্ডয়ন করছে... গুনকঃ ${currentMult}x`);

        // Random crash trigger
        const crashThreshold = winMultiplierBoost ? 8.5 : 1.4;
        const crashChance = winMultiplierBoost ? 0.02 : 0.12;
        if (currentMult > crashThreshold && Math.random() < crashChance) {
          clearInterval(interval);
          setCrashTicking(false);
          // Auto Cashout chance 50%
          const autoCash = winMultiplierBoost ? true : Math.random() < 0.55;
          if (autoCash) {
            const prize = Math.floor(betAmount * currentMult);
            onUpdateBalance(prize, `গেম জিতেছেন "${game.banglaName}": প্রাপ্তি ৳ ${prize} (${currentMult}x গুনক)`);
            setWonAmount(prize);
            setSimulationMsg(`ক্যাশ আউট হয়েছে! আপনি ${currentMult}x গুনকে ৳ ${prize} পেয়েছেন!`);
            setPlayingState('won');
          } else {
            setSimulationMsg(`বিমান ক্র্যাশ করেছে! ${currentMult}x এ রান আউট হয়েছে`);
            setPlayingState('lost');
          }
        }
      }, 100);

    } else {
      // Standard Slots / Fishings / Pokers style spin logic
      setTimeout(() => {
        const isWin = winMultiplierBoost ? true : Math.random() < 0.45; // 45% win probability
        if (isWin) {
          const mult = parseFloat((winMultiplierBoost ? (5.0 + Math.random() * 25) : (1.2 + Math.random() * 8.5)).toFixed(1));
          const totalP = Math.floor(betAmount * mult);
          onUpdateBalance(totalP, `গেম জিতেছেন "${game.banglaName}": প্রাপ্তি ৳ ${totalP} (${mult}x গুনক)`);
          setWonAmount(totalP);
          setMultiplier(mult);

          if (mult > 5) {
            setSimulationMsg(`🎉 মেগা জ্যাকপট! +৳ ${totalP} জিতেছেন (${mult}x গুনক)!`);
          } else {
            setSimulationMsg(`অভিনন্দন! আপনি ৳ ${totalP} জিতেছেন (${mult}x গুনক)`);
          }
          setPlayingState('won');
        } else {
          setSimulationMsg('দুঃখিত! এই রাউন্ডে জিতেননি। আবার চেষ্টা করুন!');
          setPlayingState('lost');
        }
      }, 1500);
    }
  };

  const cleanExit = () => {
    setPlayingState('idle');
    setSimulationMsg('');
    setWonAmount(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-sm bg-[#0e0e11] rounded-2xl overflow-hidden border border-[#FFBF00]/30 shadow-2xl flex flex-col">
        
        {/* Header Title bar */}
        <div className="bg-[#1a1a1a] p-3 border-b border-[#333] flex items-center justify-between select-none shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🎰</span>
            <div>
              <h3 className="text-sm font-black text-white uppercase">{game.name}</h3>
              <p className="text-[9px] text-[#FFBF05] font-bold text-[#FFBF00]">{game.banglaName} • {game.provider}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={cleanExit}
            className="p-1 px-2.5 rounded bg-black/40 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Play Screen Simulation Stage */}
        <div className="p-4 bg-[#0a0a0a] flex-1 flex flex-col justify-between h-[320px]">
          
          {/* Main Visual Display Screen */}
          <div className="flex-1 bg-gradient-to-t from-black to-[#1a1a1a] rounded-xl border border-[#333] p-4 flex flex-col items-center justify-center text-center relative overflow-hidden select-none">
            {/* Matrix light layout */}
            <div className="absolute inset-0 bg-grid-[#FFBF00]/5 opacity-10"></div>
            
            {playingState === 'idle' && (
              <div className="space-y-2">
                <span className="text-5xl animate-bounce block">🎮</span>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">রিয়েল-টাইম প্লেয়ার সিমুলেটর</p>
                <p className="text-[10px] text-gray-500">আপনার বেট ধরুন এবং নিচের "প্লে করুন" ট্যাপ করুন</p>
              </div>
            )}

            {playingState === 'running' && (
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-t-[#FFBF00] border-gray-800 animate-spin mx-auto"></div>
                <p className="text-xs text-amber-400 font-bold animate-pulse">{simulationMsg}</p>
              </div>
            )}

            {playingState === 'won' && (
              <div className="space-y-2 animate-[pulse_1s_infinite]">
                <span className="text-5xl block">🎉🏆🎉</span>
                <p className="text-xs text-emerald-400 font-extrabold uppercase">{simulationMsg}</p>
                <p className="text-2xl font-black text-[#FFBF00]">৳ {wonAmount.toLocaleString()}</p>
              </div>
            )}

            {playingState === 'lost' && (
              <div className="space-y-2">
                <span className="text-5xl block">💔</span>
                <p className="text-xs text-rose-500 font-bold">{simulationMsg}</p>
                <p className="text-[10px] text-gray-600 uppercase font-mono">চেষ্টা করা সবচেয়ে ভালো গুণ</p>
              </div>
            )}
          </div>

          {/* Bet Size Configuration Controls */}
          <div className="space-y-2.5 mt-4 select-none">
            <div className="flex justify-between items-center text-xs font-bold text-gray-400">
              <span className="flex items-center text-gray-400">
                <Coins className="w-3.5 h-3.5 text-[#FFBF00] mr-1.5" />
                আপনার বেট নির্ধারণ করুনঃ
              </span>
              <span className="text-white">৳ {betAmount}</span>
            </div>

            {/* Sizes selector pills */}
            <div className="grid grid-cols-4 gap-1.5">
              {betSizes.map((size) => {
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => { if (playingState !== 'running') setBetAmount(size); }}
                    className={`py-1.5 rounded-lg text-xs font-black transition ${
                      betAmount === size
                        ? 'bg-[#FFBF00] text-black shadow'
                        : 'bg-neutral-900 text-gray-400 hover:text-white'
                    }`}
                  >
                    ৳ {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Simulated balance indicator & trigger */}
          <div className="mt-4 pt-3 border-t border-[#333] flex items-center justify-between gap-2.5">
            <div className="text-left select-none">
              <p className="text-[9px] text-gray-500 font-bold uppercase font-sans">ব্যালেন্স</p>
              <p className="text-xs font-black text-[#FFBF00]">৳ {userBalance.toLocaleString()}</p>
            </div>

            <button
              type="button"
              onClick={handleStartPlay}
              disabled={playingState === 'running'}
              className="flex-1 py-3 rounded-lg bg-[#FFBF00] hover:brightness-110 text-black text-xs font-black uppercase tracking-wide flex items-center justify-center space-x-1 sm:space-x-1.5 cursor-pointer disabled:bg-neutral-800 disabled:text-gray-600 disabled:shadow-none transition shadow-[0_0_15px_rgba(255,191,0,0.2)]"
              id="gameplay-trigger-btn"
            >
              <Play className="w-4 h-4 fill-current shrink-0" />
              <span>প্লে করুন</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
