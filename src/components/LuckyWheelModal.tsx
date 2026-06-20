import React, { useState } from 'react';
import { X, Sparkles, AlertCircle, Trophy } from 'lucide-react';

interface LuckyWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWinAmount: (amount: number) => void;
}

export default function LuckyWheelModal({
  isOpen,
  onClose,
  onWinAmount
}: LuckyWheelModalProps) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<string | null>(null);
  const [dailySpinsLeft, setDailySpinsLeft] = useState(3);

  if (!isOpen) return null;

  const prizes = [
    { label: '৳ ৫০', value: 50, color: 'bg-[#ea1c24] text-white' },
    { label: '৳ ৫০০', value: 500, color: 'bg-[#121212] text-yellow-300' },
    { label: '৳ ১,০০০', value: 1000, color: 'bg-[#ea1c24] text-white' },
    { label: '৳ ৫,০০০', value: 5000, color: 'bg-[#121212] text-yellow-300' },
    { label: '৳ ২০', value: 20, color: 'bg-[#ea1c24] text-white' },
    { label: '৳ ১০,০০০', value: 10000, color: 'bg-[#D4AF37] text-black font-black' },
    { label: '৳ ১০০', value: 100, color: 'bg-[#ea1c24] text-white' },
    { label: 'আবার স্পিন', value: 0, color: 'bg-[#121212] text-white' }
  ];

  const handleSpin = () => {
    if (spinning || dailySpinsLeft <= 0) return;

    setSpinning(true);
    setWonPrize(null);
    setDailySpinsLeft((prev) => prev - 1);

    // Dynamic rotation math
    const segmentDegree = 360 / prizes.length;
    const randomSegment = Math.floor(Math.random() * prizes.length);
    // Spin at least 5 full circles
    const newRotation = rotation + 1800 + (360 - randomSegment * segmentDegree);
    
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      const prize = prizes[randomSegment];
      if (prize.value > 0) {
        setWonPrize(`অভিনন্দন! আপনি জিতে নিয়েছেন ${prize.label}`);
        onWinAmount(prize.value);
      } else {
        setWonPrize('আবার চেষ্টা করুন! ফ্রিতে আরেকটি স্পিন পেয়েছেন।');
        setDailySpinsLeft((prev) => prev + 1); // grant extra spin
      }
    }, 3200); // Wait for translation transition
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-full max-w-sm bg-[#0e0e10] rounded-2xl p-5 border border-amber-600/50 shadow-[0_10px_30px_rgba(255,191,0,0.15)] text-center flex flex-col justify-between overflow-hidden">
        
        {/* Lights ornament */}
        <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-yellow-400 animate-ping"></div>
        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping delay-500"></div>

        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-gray-400 hover:text-white hover:bg-neutral-800 transition z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Head text */}
        <div className="mb-2 select-none">
          <h2 className="text-lg font-black text-[#FFBF00] uppercase tracking-wide flex items-center justify-center">
            <Sparkles className="w-5 h-5 mr-1.5 animate-pulse text-yellow-450" />
            দৈনিক গোল্ডেন স্পিন চাকা
          </h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase">4999bet LUCKY SPIN WHEEL</p>
        </div>

        {/* The rotating wheel */}
        <div className="relative my-4 flex items-center justify-center select-none h-64">
          
          {/* Static center pointer pointing downwards */}
          <div className="absolute top-0 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-t-[20px] border-t-yellow-400 border-r-[12px] border-r-transparent filter drop-shadow"></div>

          {/* Core spinning wheel body */}
          <div
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 3.2s cubic-bezier(0.25, 0.1, 0.1, 1)' : 'none'
            }}
            className="w-56 h-56 rounded-full border-4 border-[#FFBF00] bg-zinc-950 relative overflow-hidden shadow-inner flex items-center justify-center shadow-yellow-500/10"
          >
            {/* Center golden rivet badge */}
            <div className="absolute z-10 w-12 h-12 rounded-full bg-gradient-to-tr from-[#FFE57F] via-[#FFBF00] to-[#E6A100] text-black font-black text-center flex items-center justify-center text-[10px] border-2 border-zinc-950 shadow-lg">
              SPIN
            </div>

            {/* Segment dividing layout render lines and texts */}
            {prizes.map((p, index) => {
              const rotationSegment = index * (360 / prizes.length);
              return (
                <div
                  key={index}
                  style={{
                    transform: `rotate(${rotationSegment}deg)`,
                    transformOrigin: '50% 50%'
                  }}
                  className="absolute inset-0 flex items-start justify-center pt-2"
                >
                  <div className={`text-[8px] font-black h-24 flex flex-col justify-start text-center uppercase tracking-tighter ${p.color}`}>
                    <span className="block">{p.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Spin trigger CTA control */}
        <div className="space-y-3 z-10">
          <button
            type="button"
            onClick={handleSpin}
            disabled={spinning || dailySpinsLeft <= 0}
            className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider transition ${
              spinning 
                ? 'bg-neutral-800 text-gray-500 cursor-not-allowed'
                : dailySpinsLeft <= 0
                  ? 'bg-neutral-800 text-gray-600'
                  : 'bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500 text-black shadow-lg shadow-yellow-500/20 active:scale-95'
            }`}
          >
            {spinning ? 'ভাগ্য চাকা ঘুরছে...' : dailySpinsLeft <= 0 ? 'আজকের ফ্রী স্পিন শেষ!' : 'স্পিন করুন (Spin Now)'}
          </button>

          {/* Status logs */}
          <div className="flex justify-between items-center text-xs font-bold px-1 select-none">
            <span className="text-gray-400 flex items-center">
              <AlertCircle className="w-3.5 h-3.5 mr-1" />
              দৈনিক ফ্রি স্পিন:
            </span>
            <span className="text-[#FFBF00]">{dailySpinsLeft} বার বাকী</span>
          </div>

          {/* Won notification banner pop-up */}
          {wonPrize && (
            <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 font-extrabold text-[11px] animate-[pulse_1s_infinite] flex items-center justify-center space-x-1">
              <Trophy className="w-3.5 h-3.5 shrink-0 text-amber-400" />
              <span>{wonPrize}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
