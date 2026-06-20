import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Minus, Users, Play, Headphones, AlertTriangle } from 'lucide-react';

interface AviatorGameProps {
  onClose: () => void;
  userBalance: number;
  onUpdateBalance: (amount: number, gameDetail?: string) => void;
  winMultiplierBoost: boolean;
}

// Simulated other players in live aviator game lobby
interface SimulatedPlayerBet {
  username: string;
  avatar: string;
  betAmount: number;
  cashoutMult?: number;
  cashedOut: boolean;
}

export default function AviatorGame({
  onClose,
  userBalance,
  onUpdateBalance,
  winMultiplierBoost
}: AviatorGameProps) {
  // Game state: 'countdown' | 'flying' | 'crashed'
  const [gameState, setGameState] = useState<'countdown' | 'flying' | 'crashed'>('countdown');
  const [countdown, setCountdown] = useState<number>(5);
  const [currentMultiplier, setCurrentMultiplier] = useState<number>(1.0);
  const [crashMultiplier, setCrashMultiplier] = useState<number>(2.5);
  const [multiplierHistory, setMultiplierHistory] = useState<number[]>([
    2.15, 1.47, 2.82, 6.90, 1.05, 1.17, 2.62, 10.45, 1.25, 4.31, 1.88, 1.11, 23.40
  ]);

  // Two parallel bet panels as shown in the screenshot
  const [panel1Bet, setPanel1Bet] = useState<string>('100');
  const [panel2Bet, setPanel2Bet] = useState<string>('200');
  
  // Is bet placed for the next round
  const [panel1Placed, setPanel1Placed] = useState<boolean>(false);
  const [panel2Placed, setPanel2Placed] = useState<boolean>(false);

  // Is bet currently active in the running flight
  const [panel1Active, setPanel1Active] = useState<boolean>(false);
  const [panel2Active, setPanel2Active] = useState<boolean>(false);

  // States to track if cashed out successfully inside the current round
  const [panel1CashedOut, setPanel1CashedOut] = useState<boolean>(false);
  const [panel2CashedOut, setPanel2CashedOut] = useState<boolean>(false);
  const [panel1WonAmount, setPanel1WonAmount] = useState<number>(0);
  const [panel2WonAmount, setPanel2WonAmount] = useState<number>(0);

  // Simulate multiplayer lobby members placing bets
  const [simulatedPlayers, setSimulatedPlayers] = useState<SimulatedPlayerBet[]>([]);
  const [totalWinBDT, setTotalWinBDT] = useState<number>(9919.30);

  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Sound effects alert banner (optional feedback helper)
  const [statusMsg, setStatusMsg] = useState<string>('');

  // Generate starting sim players on load
  useEffect(() => {
    generateSimulatedPlayers();
  }, []);

  const generateSimulatedPlayers = () => {
    const userNamesList = [
      'sabuj_dhaka', 'shakil_09', 'babu_nagad', 'raj_king', 'milon_bkash', 
      'laila_khan', 'shirin_99', 'rohim_boss', 'habib_77', 'mim_cute'
    ];
    const avatars = ['🔴', '🟡', '🔵', '🟢', '🎨', '✈️', '🎮'];
    
    const players: SimulatedPlayerBet[] = Array.from({ length: 8 }).map(() => {
      const u = userNamesList[Math.floor(Math.random() * userNamesList.length)] + '_' + Math.floor(10 + Math.random() * 90);
      const av = avatars[Math.floor(Math.random() * avatars.length)];
      return {
        username: u,
        avatar: av,
        betAmount: [50, 100, 200, 500, 1000, 2000][Math.floor(Math.random() * 6)],
        cashedOut: false
      };
    });
    setSimulatedPlayers(players);
  };

  // Main Game Loop Controller
  useEffect(() => {
    let timer: any = null;

    if (gameState === 'countdown') {
      // Countdown tick down
      setCountdown(5);
      setCurrentMultiplier(1.0);
      setPanel1CashedOut(false);
      setPanel2CashedOut(false);
      setPanel1WonAmount(0);
      setPanel2WonAmount(0);
      setTotalWinBDT(9000 + Math.random() * 2000);
      setStatusMsg('পরবর্তী রাউন্ডের জন্য আপনার বেট ধরুন...');

      // Regenerate sim players for lobby feeling
      generateSimulatedPlayers();

      timer = setInterval(() => {
        setCountdown((curr) => {
          if (curr <= 0.1) {
            clearInterval(timer);
            startFlyingState();
            return 0;
          }
          return parseFloat((curr - 0.1).toFixed(1));
        });
      }, 100);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState]);

  const startFlyingState = () => {
    // Determine the crash multiplier. Any random number based on the secret operator algorithm.
    // If win multiplier boost (from admin control dashboard) is on, force big multiplier.
    let randomCrash = 1.01;
    const rng = Math.random();
    
    if (winMultiplierBoost) {
      // High multiplier crash index
      randomCrash = parseFloat((15.5 + Math.random() * 85.0).toFixed(2));
    } else {
      if (rng < 0.70) {
        // 70% of the time: 1.00 to 1.50
        randomCrash = parseFloat((1.01 + Math.random() * 0.49).toFixed(2));
      } else if (rng < 0.90) {
        // 20% of the time: up to 5.00
        randomCrash = parseFloat((1.51 + Math.random() * 3.49).toFixed(2));
      } else if (rng < 0.95) {
        // 5% of the time: up to 10.00
        randomCrash = parseFloat((5.01 + Math.random() * 4.99).toFixed(2));
      } else if (rng < 0.98) {
        // 3% of the time: up to 15.00
        randomCrash = parseFloat((10.01 + Math.random() * 4.99).toFixed(2));
      } else if (rng < 0.995) {
        // 1.5% of the time: up to 150.00
        randomCrash = parseFloat((15.01 + Math.random() * 134.99).toFixed(2));
      } else {
        // 1.5% of the time: up to 500,000.00 (Jackpot range)
        // Using a progressive power multiplier to keep extreme spikes exciting
        randomCrash = parseFloat((150.01 + Math.pow(Math.random(), 3) * 499849.99).toFixed(2));
      }
    }

    setCrashMultiplier(randomCrash);

    // Deduct balances for placed bets at start of flight
    if (panel1Placed) {
      const b1 = parseFloat(panel1Bet) || 0;
      if (userBalance >= b1) {
        onUpdateBalance(-b1, `এভিয়েটর বিমান উড্ডয়ন ফি: বেট ৳ ${b1.toLocaleString()}`);
        setPanel1Active(true);
      } else {
        setPanel1Placed(false);
      }
    }

    if (panel2Placed) {
      const b2 = parseFloat(panel2Bet) || 0;
      if (userBalance >= b2) {
        onUpdateBalance(-b2, `এভিয়েটর বিমান উড্ডয়ন ফি: বেট ৳ ${b2.toLocaleString()}`);
        setPanel2Active(true);
      } else {
        setPanel2Placed(false);
      }
    }

    setGameState('flying');
    startTimeRef.current = performance.now();
    animateMultiplier(randomCrash);
  };

  const animateMultiplier = (targetCrash: number) => {
    const updatePhysics = (time: number) => {
      if (!startTimeRef.current) return;
      const elapsedSeconds = (time - startTimeRef.current) / 1000;

      // Exponential rising function simulating actual Aviator multiplier curves
      // y = 1.00 * e^(0.1 * t^1.1)
      const currentVal = parseFloat((1.00 + Math.pow(elapsedSeconds, 1.35) * 0.08).toFixed(2));

      if (currentVal >= targetCrash) {
        // Airplane exploded! CRASHED STATE triggers
        triggerCrash(targetCrash);
      } else {
        setCurrentMultiplier(currentVal);

        // Randomly simulate lobby players cashing out as multiplier goes up
        setSimulatedPlayers((prevPlayers) =>
          prevPlayers.map((player) => {
            if (!player.cashedOut && Math.random() < 0.03 && currentVal > 1.1) {
              return {
                ...player,
                cashedOut: true,
                cashoutMult: currentVal
              };
            }
            return player;
          })
        );

        requestRef.current = requestAnimationFrame(updatePhysics);
      }
    };

    requestRef.current = requestAnimationFrame(updatePhysics);
  };

  const triggerCrash = (targetCrash: number) => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    setGameState('crashed');
    setPanel1Active(false);
    setPanel2Active(false);
    setPanel1Placed(false);
    setPanel2Placed(false);

    // Append to high history list (keep max 13)
    setMultiplierHistory((prev) => {
      const updated = [targetCrash, ...prev];
      return updated.slice(0, 13);
    });

    setStatusMsg(`বিমানটি ${targetCrash.toFixed(2)}x এ ক্র্যাশ করেছে এবং দূরে উড়ে গেছে! 💥`);

    // Reset loop after 3.5 seconds
    setTimeout(() => {
      setGameState('countdown');
    }, 3500);
  };

  // Perform instant visual Cash Out for Panel 1
  const handleCashoutPanel1 = () => {
    if (gameState !== 'flying' || !panel1Active || panel1CashedOut) return;

    const betVal = parseFloat(panel1Bet) || 0;
    const finalMult = currentMultiplier;
    const winAmt = Math.floor(betVal * finalMult);

    onUpdateBalance(winAmt, `ক্র্যাশ গেম এভিয়েটর-এ জয়লাভ: ৳ ${winAmt.toLocaleString()} (${finalMult}x গুনক)`);
    setPanel1CashedOut(true);
    setPanel1WonAmount(winAmt);
    setPanel1Active(false);
    setPanel1Placed(false);
    setStatusMsg(`বোর্ডিং ১ ক্যাশ আউট! আপনি ৳ ${winAmt.toLocaleString()} জিতেছেন! 🎉`);
  };

  // Perform instant visual Cash Out for Panel 2
  const handleCashoutPanel2 = () => {
    if (gameState !== 'flying' || !panel2Active || panel2CashedOut) return;

    const betVal = parseFloat(panel2Bet) || 0;
    const finalMult = currentMultiplier;
    const winAmt = Math.floor(betVal * finalMult);

    onUpdateBalance(winAmt, `ক্র্যাশ গেম এভিয়েটর-এ জয়লাভ: ৳ ${winAmt.toLocaleString()} (${finalMult}x গুনক)`);
    setPanel2CashedOut(true);
    setPanel2WonAmount(winAmt);
    setPanel2Active(false);
    setPanel2Placed(false);
    setStatusMsg(`বোর্ডিং ২ ক্যাশ আউট! আপনি ৳ ${winAmt.toLocaleString()} জিতেছেন! 🎉`);
  };

  // Safe validation wrapper for manually typed bet changes (Min 1 to Max 5000)
  const validateAndSetBet = (valStr: string, setFn: (val: string) => void) => {
    const rawNum = valStr.replace(/[^0-9]/g, '');
    if (rawNum === '') {
      setFn('');
      return;
    }
    const num = parseInt(rawNum) || 1;
    if (num > 5000) {
      setFn('5000');
    } else {
      setFn(num.toString());
    }
  };

  // Helper increment button
  const adjustBet = (dir: 'up' | 'down', currentVal: string, setFn: (val: string) => void) => {
    let num = parseInt(currentVal) || 100;
    if (dir === 'up') {
      num = Math.min(5000, num + 100);
    } else {
      num = Math.max(1, num - 100);
    }
    setFn(num.toString());
  };

  // Stop flying animations on unmount
  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/95 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-full max-w-md bg-[#16161a] rounded-3xl overflow-hidden border border-red-600/30 shadow-[0_0_50px_rgba(239,68,68,0.2)] flex flex-col max-h-[98vh]">
        
        {/* TOP BRAND NAVIGATION HEADER BAR */}
        <div className="bg-[#0e0e11]/90 px-4 py-3 border-b border-zinc-900 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-[#e21a36] italic font-black text-2xl tracking-tighter uppercase flex items-center gap-1.5 animate-pulse">
              ✈️ Aviator
            </span>
            <div className="hidden sm:inline-block rotate-12 text-[10px] bg-[#e21a36]/20 text-[#e21a36] font-bold py-0.5 px-2 rounded-full border border-[#e21a36]/30">
              OFFICIAL RATING
            </div>
          </div>

          <div className="flex items-center space-x-3 select-none">
            {/* Bright BDT balance display precisely aligned with image */}
            <div className="bg-zinc-950 px-3 py-1 rounded-full border border-[#e21a36]/20 flex items-center gap-1.5">
              <span className="text-[#00e676] text-xs font-black tracking-wide font-mono">
                {userBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BDT
              </span>
            </div>

            {/* Custom support or exit icon */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
              title="গেম থেকে প্রস্থান"
              id="aviator-close-cta"
            >
              <X className="w-5 h-5 text-zinc-300" />
            </button>
          </div>
        </div>

        {/* MULTIPLIER HISTORY RIBBON (Styled with precise dynamic colors shown on screen) */}
        <div className="bg-[#111115] py-2 px-3 border-b border-zinc-950 flex items-center space-x-1.5 overflow-x-auto shrink-0 no-scrollbar select-none">
          {multiplierHistory.map((val, idx) => {
            // Apply corresponding aviator colors (blue/violet for high, lavender/cyan for small)
            let colorClasses = "bg-[#805ad5]/15 text-[#b794f4] border-[#805ad5]/25"; // default high
            if (val < 1.3) {
              colorClasses = "bg-sky-950/20 text-sky-400 border-sky-500/25";
            } else if (val < 2.0) {
              colorClasses = "bg-[#1e202c]/40 text-[#8f92a9] border-zinc-800";
            } else if (val > 10.0) {
              colorClasses = "bg-rose-950/20 text-rose-400 border-rose-500/35 font-extrabold animate-pulse";
            }
            return (
              <span
                key={idx}
                className={`px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-full border shrink-0 ${colorClasses}`}
              >
                {val.toFixed(2)}x
              </span>
            );
          })}
        </div>

        {/* FLIGHT STAGE GRID CANVAS PANEL (Main high-density central view block) */}
        <div className="relative aspect-video sm:aspect-auto sm:h-56 bg-zinc-950 flex flex-col justify-center items-center overflow-hidden border-b border-zinc-900 shrink-0 select-none">
          {/* Radar background circles & radial sunburst ray patterns */}
          <div className="absolute inset-0 bg-[#0c0c0e]">
            <div className="absolute inset-0 bg-radial-grid opacity-15"></div>
            {/* Spinning sunburst effect */}
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(226,26,54,0.01)_0%,rgba(0,0,0,0)_50%,rgba(226,26,54,0.01)_100%)] animate-[spin_40s_linear_infinite]"></div>
          </div>

          {/* ACTIVE MULTIPLIER DIGITAL BOARD */}
          <div className="relative z-10 text-center flex flex-col items-center">
            {gameState === 'countdown' && (
              <div className="animate-pulse flex flex-col items-center">
                <p className="text-[#00e676] text-xs font-black uppercase tracking-widest mb-1 font-sans">
                  পরবর্তী রাউন্ড শুরু হচ্ছে
                </p>
                <h1 className="text-4xl font-extrabold text-white tracking-widest font-mono">
                  {countdown.toFixed(1)}s
                </h1>
                <div className="w-24 h-1 bg-zinc-800 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className="h-full bg-[#00e676] transition-all duration-100"
                    style={{ width: `${(countdown / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {gameState === 'flying' && (
              <div className="flex flex-col items-center drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
                <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight font-sans select-none">
                  {currentMultiplier.toFixed(2)}x
                </h1>
                <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1 tracking-wider">
                  বিমান উড্ডয়নশীল গতিতে রয়েছে
                </p>
              </div>
            )}

            {gameState === 'crashed' && (
              <div className="flex flex-col items-center animate-[bounce_0.2s_ease-out_1]">
                <h1 className="text-[#e21a36] text-3xl font-black uppercase tracking-widest font-mono italic">
                  Flew Away!
                </h1>
                <p className="text-zinc-400 text-xs mt-1.5 font-bold">
                  বিমানটি দূরে হারিয়ে গেছে। ক্র্যাশ গুনকঃ
                  <span className="text-[#e21a36] ml-1.5 font-mono font-black">{crashMultiplier.toFixed(2)}x</span>
                </p>
              </div>
            )}
          </div>

          {/* DYNAMIC DRAWN RED LINE ROADWAY + FLYING SVG PLANE */}
          {gameState === 'flying' && (
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Dynamic light red fill shape mirroring progress */}
              <svg className="w-full h-full absolute bottom-0 left-0">
                <defs>
                  <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e21a36" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#e21a36" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d={`M 0 170 Q 150 170 ${Math.min(320, 20 + (currentMultiplier - 1) * 35)} ${Math.max(40, 170 - (currentMultiplier - 1) * 22)} L ${Math.min(320, 20 + (currentMultiplier - 1) * 35)} 180 L 0 180 Z`}
                  fill="url(#curveGradient)"
                  className="transition-all duration-100 ease-out"
                />
                <path
                  d={`M 0 170 Q 150 170 ${Math.min(320, 20 + (currentMultiplier - 1) * 35)} ${Math.max(40, 170 - (currentMultiplier - 1) * 22)}`}
                  fill="none"
                  stroke="#e21a36"
                  strokeWidth="3.5"
                  className="transition-all duration-100 ease-out"
                />
              </svg>

              {/* Red Plane Image Element aligned at the very edge of the curve */}
              <div
                className="absolute transition-all duration-100 ease-out"
                style={{
                  left: `${Math.min(84, 5 + (currentMultiplier - 1) * 9.5)}%`,
                  bottom: `${Math.min(84, 5 + (currentMultiplier - 1) * 6.0)}%`,
                  transform: `translate(-50%, 50%) rotate(${-12 - (currentMultiplier > 5 ? 15 : currentMultiplier)}deg)`,
                }}
              >
                <div className="relative">
                  {/* Propeller red aircraft widget representation */}
                  <span className="text-4xl filter drop-shadow-[0_2px_10px_rgba(226,26,54,0.8)] block animate-[pulse_0.4s_infinite]">
                    ✈️
                  </span>
                  
                  {/* Fire exhaust particle trail representation */}
                  <span className="absolute -left-3.5 top-2 w-3.5 h-1.5 bg-gradient-to-r from-orange-500 to-transparent rounded-full animate-ping"></span>
                </div>
              </div>
            </div>
          )}

          {/* Tiny live players avatar stack on screen exactly like screenshot */}
          <div className="absolute bottom-2.5 right-3 bg-black/60 px-2.5 py-1 rounded-full border border-zinc-800/60 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-white text-[10px] font-black font-mono">
              2,825
            </span>
          </div>

          {/* Simulated user activity status bar (just on top of betting console) */}
          {statusMsg && (
            <div className="absolute bottom-2 left-3 bg-black/85 px-3 py-1 rounded-full border border-zinc-800 text-[9px] text-[#00e676] font-bold">
              {statusMsg}
            </div>
          )}
        </div>

        {/* CHAT/SUPPORT HELPLINE ALIEN INLINE HELPER BANNER */}
        <div className="bg-yellow-500/5 px-4 py-2 border-b border-zinc-900 flex items-center justify-between text-[11px] select-none text-[#FFBF00] shrink-0">
          <span className="font-semibold">⚠️ বিঃদ্রঃ - এভিয়েটর লিমিট সর্বনিম্ন ৳ ১ থেকে সর্বোচ্চ ৳ ৫,০০০</span>
          <button
            type="button"
            onClick={() => alert('লাইভ সহায়তাঃ ১ টাকা থেকে ৫০০০ টাকা পর্যন্ত যেকোনো অঙ্ক উড্ডয়নের আগে সেট করে স্পিন বা ক্যাশ আউট করুন।')}
            className="flex items-center space-x-1 hover:underline text-[#FFBF00] font-bold"
          >
            <Headphones className="w-3 h-3 text-[#FFBF00] shrink-0" />
            <span>সহায়তা নিন</span>
          </button>
        </div>

        {/* TWO SEPARATE DOUBLE-PANEL BET CONTROLS (Exactly as Aviator features) */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3.5 no-scrollbar bg-[#111115]">
          
          {/* ================ PANEL 1: BOARDING PANEL 1 ================ */}
          <div className="bg-[#1b1c21] p-3.5 rounded-2xl border border-zinc-800 relative flex flex-col justify-between">
            {/* Cashout overlay badge if won */}
            {panel1CashedOut && (
              <div className="absolute inset-0 z-20 bg-black/90 flex flex-col items-center justify-center text-center rounded-2xl select-none">
                <span className="text-[#00e676] text-xs font-black uppercase tracking-widest animate-bounce">
                  ✔️ ক্যাশ আউট সফল
                </span>
                <p className="text-xl font-black text-white">৳ {panel1WonAmount.toLocaleString()}</p>
              </div>
            )}

            {/* Top configuration headers: Bet / Auto */}
            <div className="flex items-center justify-between md:justify-around text-[10px] font-bold text-gray-400 select-none border-b border-zinc-800/40 pb-2 mb-2">
              <span className="text-[#FFBF00] uppercase font-black tracking-wiest border-b border-[#FFBF00] pb-1">
                Bet (বোর্ডিং ১)
              </span>
              <span className="text-gray-500 cursor-not-allowed">Auto Play</span>
            </div>

            {/* Input field and adjustments in vertical row */}
            <div className="grid grid-cols-12 gap-2">
              
              {/* Left Column: Number Input & Predefined Quick buttons */}
              <div className="col-span-7 flex flex-col justify-between space-y-2">
                {/* Plus & Minus Increments Input */}
                <div className="bg-zinc-950 px-2 py-1 rounded-xl flex items-center justify-between border border-zinc-800">
                  <button
                    type="button"
                    disabled={panel1Placed || gameState === 'flying'}
                    onClick={() => adjustBet('down', panel1Bet, setPanel1Bet)}
                    className="p-1 rounded bg-zinc-900 text-gray-400 hover:text-white disabled:opacity-50"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <input
                    type="text"
                    disabled={panel1Placed || gameState === 'flying'}
                    value={panel1Bet}
                    onChange={(e) => validateAndSetBet(e.target.value, setPanel1Bet)}
                    className="w-16 bg-transparent text-center text-sm text-white font-black font-mono focus:outline-none"
                  />

                  <button
                    type="button"
                    disabled={panel1Placed || gameState === 'flying'}
                    onClick={() => adjustBet('up', panel1Bet, setPanel1Bet)}
                    className="p-1 rounded bg-zinc-900 text-gray-400 hover:text-white disabled:opacity-50"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Multi-bet grids pre-composed helper */}
                <div className="grid grid-cols-4 gap-1 select-none">
                  {[100, 200, 500, 5000].map((size) => (
                    <button
                      key={size}
                      type="button"
                      disabled={panel1Placed || gameState === 'flying'}
                      onClick={() => setPanel1Bet(size.toString())}
                      className="py-1 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 rounded font-mono text-[10px] font-bold border border-zinc-800/40 transition"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Dynamic Bet Trigger / Cashout Button */}
              <div className="col-span-5 flex">
                {gameState === 'flying' && panel1Active ? (
                  /* Live High-Voltage Cash out button */
                  <button
                    type="button"
                    onClick={handleCashoutPanel1}
                    className="w-full h-full min-h-[58px] bg-gradient-to-b from-orange-400 to-orange-600 active:brightness-95 text-black rounded-2xl flex flex-col items-center justify-center transition shadow-[0_5px_15px_rgba(249,115,22,0.4)] cursor-pointer"
                    id="aviator-cashout-p1"
                  >
                    <span className="text-[10px] uppercase font-black text-orange-950 font-sans tracking-tight">
                      ক্যাশ আউট
                    </span>
                    <span className="text-sm font-black tracking-tight font-mono">
                      ৳ {Math.floor((parseFloat(panel1Bet) || 0) * currentMultiplier)}
                    </span>
                  </button>
                ) : (
                  /* Put Bet / Cancel Bet button */
                  <button
                    type="button"
                    disabled={gameState === 'flying' && !panel1Placed}
                    onClick={() => {
                      if (panel1Placed) {
                        setPanel1Placed(false);
                      } else {
                        const betVal = parseFloat(panel1Bet) || 0;
                        if (betVal < 1 || betVal > 5000) {
                          alert('দুঃখিত! বেটের লিমিট ১ টাকা থেকে ৫০০০ টাকা পর্যন্ত প্রযোজ্য।');
                          return;
                        }
                        if (userBalance < betVal) {
                          alert('দুঃখিত! আপনার মূল ব্যালেন্স অপর্যাপ্ত। দয়া করে আগে ডিপোজিট করুন!');
                          return;
                        }
                        setPanel1Placed(true);
                      }
                    }}
                    className={`w-full h-full min-h-[58px] rounded-2xl flex flex-col items-center justify-center text-center transition select-none cursor-pointer border ${
                      panel1Placed
                        ? 'bg-rose-950 border-rose-600 text-white shadow-[0_0_12px_rgba(225,29,72,0.4)]'
                        : 'bg-[#2ca01c] hover:bg-[#32b220] border-green-700 text-white shadow-[0_4px_14px_rgba(40,160,25,0.4)]'
                    }`}
                    id="aviator-bet-action-p1"
                  >
                    <span className="text-sm font-black uppercase font-sans tracking-wide">
                      {panel1Placed ? 'ক্যান্সেল' : 'BET'}
                    </span>
                    <span className="text-[10px] font-bold font-mono text-zinc-100 opacity-90 mt-0.5">
                      {panel1Bet} BDT
                    </span>
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* ================ PANEL 2: BOARDING PANEL 2 ================ */}
          <div className="bg-[#1b1c21] p-3.5 rounded-2xl border border-zinc-800 relative flex flex-col justify-between">
            {/* Cashout overlay badge if won */}
            {panel2CashedOut && (
              <div className="absolute inset-0 z-20 bg-black/90 flex flex-col items-center justify-center text-center rounded-2xl select-none">
                <span className="text-[#00e676] text-xs font-black uppercase tracking-widest animate-bounce">
                  ✔️ ক্যাশ আউট সফল
                </span>
                <p className="text-xl font-black text-white">৳ {panel2WonAmount.toLocaleString()}</p>
              </div>
            )}

            {/* Top configuration headers: Bet / Auto */}
            <div className="flex items-center justify-between md:justify-around text-[10px] font-bold text-gray-400 select-none border-b border-zinc-800/40 pb-2 mb-2">
              <span className="text-[#FFBF00] uppercase font-black tracking-wiest border-b border-[#FFBF00] pb-1">
                Bet (বোর্ডিং ২)
              </span>
              <span className="text-gray-500 cursor-not-allowed">Auto Play</span>
            </div>

            {/* Input field and adjustments in vertical row */}
            <div className="grid grid-cols-12 gap-2">
              
              {/* Left Column: Number Input & Predefined Quick buttons */}
              <div className="col-span-7 flex flex-col justify-between space-y-2">
                {/* Plus & Minus Increments Input */}
                <div className="bg-zinc-950 px-2 py-1 rounded-xl flex items-center justify-between border border-zinc-800">
                  <button
                    type="button"
                    disabled={panel2Placed || gameState === 'flying'}
                    onClick={() => adjustBet('down', panel2Bet, setPanel2Bet)}
                    className="p-1 rounded bg-zinc-900 text-gray-400 hover:text-white disabled:opacity-50"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <input
                    type="text"
                    disabled={panel2Placed || gameState === 'flying'}
                    value={panel2Bet}
                    onChange={(e) => validateAndSetBet(e.target.value, setPanel2Bet)}
                    className="w-16 bg-transparent text-center text-sm text-white font-black font-mono focus:outline-none"
                  />

                  <button
                    type="button"
                    disabled={panel2Placed || gameState === 'flying'}
                    onClick={() => adjustBet('up', panel2Bet, setPanel2Bet)}
                    className="p-1 rounded bg-zinc-900 text-gray-400 hover:text-white disabled:opacity-50"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Multi-bet grids pre-composed helper */}
                <div className="grid grid-cols-4 gap-1 select-none">
                  {[200, 500, 1000, 5000].map((size) => (
                    <button
                      key={size}
                      type="button"
                      disabled={panel2Placed || gameState === 'flying'}
                      onClick={() => setPanel2Bet(size.toString())}
                      className="py-1 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 rounded font-mono text-[10px] font-bold border border-zinc-800/40 transition"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Dynamic Bet Trigger / Cashout Button */}
              <div className="col-span-5 flex">
                {gameState === 'flying' && panel2Active ? (
                  /* Live High-Voltage Cash out button */
                  <button
                    type="button"
                    onClick={handleCashoutPanel2}
                    className="w-full h-full min-h-[58px] bg-gradient-to-b from-orange-400 to-orange-600 active:brightness-95 text-black rounded-2xl flex flex-col items-center justify-center transition shadow-[0_5px_15px_rgba(249,115,22,0.4)] cursor-pointer"
                    id="aviator-cashout-p2"
                  >
                    <span className="text-[10px] uppercase font-black text-orange-950 font-sans tracking-tight">
                      ক্যাশ আউট
                    </span>
                    <span className="text-sm font-black tracking-tight font-mono">
                      ৳ {Math.floor((parseFloat(panel2Bet) || 0) * currentMultiplier)}
                    </span>
                  </button>
                ) : (
                  /* Put Bet / Cancel Bet button */
                  <button
                    type="button"
                    disabled={gameState === 'flying' && !panel2Placed}
                    onClick={() => {
                      if (panel2Placed) {
                        setPanel2Placed(false);
                      } else {
                        const betVal = parseFloat(panel2Bet) || 0;
                        if (betVal < 1 || betVal > 5000) {
                          alert('দুঃখিত! বেটের লিমিট ১ টাকা থেকে ৫০০০ টাকা পর্যন্ত প্রযোজ্য।');
                          return;
                        }
                        if (userBalance < betVal) {
                          alert('দুঃখিত! আপনার মূল ব্যালেন্স অপর্যাপ্ত। দয়া করে আগে ডিপোজিট করুন!');
                          return;
                        }
                        setPanel2Placed(true);
                      }
                    }}
                    className={`w-full h-full min-h-[58px] rounded-2xl flex flex-col items-center justify-center text-center transition select-none cursor-pointer border ${
                      panel2Placed
                        ? 'bg-rose-950 border-rose-600 text-white shadow-[0_0_12px_rgba(225,29,72,0.4)]'
                        : 'bg-[#2ca01c] hover:bg-[#32b220] border-green-700 text-white shadow-[0_4px_14px_rgba(40,160,25,0.4)]'
                    }`}
                    id="aviator-bet-action-p2"
                  >
                    <span className="text-sm font-black uppercase font-sans tracking-wide">
                      {panel2Placed ? 'ক্যান্সেল' : 'BET'}
                    </span>
                    <span className="text-[10px] font-bold font-mono text-zinc-100 opacity-90 mt-0.5">
                      {panel2Bet} BDT
                    </span>
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* SIMULATED OTHER PLAYERS LIVE LIST & LOBBY STATS (Precisely shown inside and beneath Aviator screenshot) */}
          <div className="bg-[#16161a] rounded-2xl border border-zinc-900 p-3 select-none">
            <div className="flex items-center justify-between text-[11px] font-black uppercase text-[#FFBF00] mb-2 border-b border-zinc-900 pb-1.5">
              <span>লাইভ মেম্বার উড্ডয়ন বেটস</span>
              <span className="font-mono text-[10px] text-zinc-400">মোট উড্ডয়ন: ৳ {totalWinBDT.toLocaleString(undefined, {maximumFractionDigits:1})}</span>
            </div>

            <div className="space-y-1.5 max-h-32 overflow-y-auto no-scrollbar">
              {simulatedPlayers.map((player, idx) => (
                <div key={idx} className="flex items-center justify-between text-[10px] bg-zinc-950/70 py-1.5 px-2.5 rounded-lg border border-zinc-900">
                  <span className="text-zinc-350 font-medium flex items-center gap-1.5">
                    <span>{player.avatar}</span>
                    <span className="font-mono">@{player.username}</span>
                  </span>
                  
                  <div className="flex items-center space-x-2.5">
                    <span className="text-zinc-500 font-mono">৳{player.betAmount}</span>
                    {player.cashedOut ? (
                      <span className="bg-[#00e676]/10 text-[#00e676] px-1.5 py-0.2 rounded font-sans font-black text-[9px]">
                        {player.cashoutMult?.toFixed(2)}x
                      </span>
                    ) : (
                      <span className="text-zinc-600 italic">উড়ছে..</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
