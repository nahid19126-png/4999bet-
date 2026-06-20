import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import HomeSection from './components/HomeSection';
import LoginModal from './components/LoginModal';
import PromotionSection from './components/PromotionSection';
import InviteSection from './components/InviteSection';
import DepositSection from './components/DepositSection';
import MemberSection from './components/MemberSection';
import FloatingActions from './components/FloatingActions';
import LuckyWheelModal from './components/LuckyWheelModal';
import GamePlayModal from './components/GamePlayModal';
import AdminSection from './components/AdminSection';
import { AppTab, GameCategory, GameItem, AdminLogItem } from './types';

export default function App() {
  // Navigation States
  const [currentTab, setCurrentTab] = useState<AppTab>('home');
  const [activeCategory, setActiveCategory] = useState<GameCategory>('hot');

  // User States
  const [userBalance, setUserBalance] = useState<number>(8420.50);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('Guest_4999bet');

  // Modal Open/Close Toggles
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isLuckyWheelOpen, setIsLuckyWheelOpen] = useState<boolean>(false);
  const [selectedGamePlay, setSelectedGamePlay] = useState<GameItem | null>(null);

  // Favorites List Tracker
  const [favorites, setFavorites] = useState<string[]>(['super-ace-hot', 'happy-fishing']);

  // Admin and controller operational trackers
  const [winMultiplierBoost, setWinMultiplierBoost] = useState<boolean>(false);
  const [adminLogs, setAdminLogs] = useState<AdminLogItem[]>([
    {
      id: 'log-initial-1',
      timestamp: '23:15:10',
      user: 'sakib_dhaka',
      type: 'deposit',
      detail: 'বিকাশ (bKash) মাধ্যমে ৳ ৫,০০০ ডিপোজিট অনুরোধ কন্ট্রোলারের দ্বারা সফলভাবে সম্পন্ন হয়েছে।',
      amount: 5000,
      status: 'completed'
    },
    {
      id: 'log-initial-2',
      timestamp: '23:18:44',
      user: 'milon_k',
      type: 'gameplay',
      detail: 'মেগা ডাবল স্লট গেম খেলেছেন এবং ৳ ১,২৫০ জয়লাভ করেছেন।',
      amount: 1250,
      status: 'completed'
    },
    {
      id: 'log-initial-3',
      timestamp: '23:22:01',
      user: 'ruma_99',
      type: 'withdraw',
      detail: 'নগদ (Nagad) ওয়ালেটে ৳ ৪,৫০০ উত্তোলন কন্ট্রোলার অনুমতি ও অ্যাপ্রুভালের অপেক্ষায় রয়েছে।',
      amount: 4500,
      status: 'pending'
    },
    {
      id: 'log-initial-4',
      timestamp: '23:24:19',
      user: 'rajesh_77',
      type: 'luckywheel',
      detail: 'লাকি স্পিন হুইল থেকে ৳ ৫০০ স্পিন বোনাস জিতে নিয়েছেন।',
      amount: 500,
      status: 'completed'
    }
  ]);

  const getFormattedTime = () => {
    const d = new Date();
    return d.toTimeString().split(' ')[0];
  };

  const addAdminLog = (
    type: 'deposit' | 'withdraw' | 'gameplay' | 'luckywheel' | 'system',
    detail: string,
    amount?: number,
    status: 'completed' | 'pending' | 'rejected' = 'completed',
    customUser?: string
  ) => {
    const newLog: AdminLogItem = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: getFormattedTime(),
      user: customUser || username,
      type,
      detail,
      amount,
      status
    };
    setAdminLogs((prev) => [newLog, ...prev]);
  };

  // Toggle Favorite
  const toggleFavorite = (gameId: string) => {
    setFavorites((prev) =>
      prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId]
    );
  };

  // Helper to persist balance changes for general public account simulation
  const syncUserBalanceToStorage = (targetUser: string, newBalance: number) => {
    try {
      const raw = localStorage.getItem('site_registered_users');
      if (raw) {
        const users = JSON.parse(raw);
        const updated = users.map((u: any) => {
          if (u.username.toLowerCase() === targetUser.toLowerCase()) {
            return { ...u, balance: newBalance };
          }
          return u;
        });
        localStorage.setItem('site_registered_users', JSON.stringify(updated));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Login Success
  const handleLoginSuccess = (newUsername: string, startingBalance?: number) => {
    setUsername(newUsername);
    setIsLoggedIn(true);
    
    // If a saved balance is present, use it, otherwise default welome simulation
    const balanceToSet = startingBalance !== undefined ? startingBalance : 12888.00;
    setUserBalance(balanceToSet);
    
    addAdminLog('system', `@${newUsername} সফলভাবে প্ল্যাটফর্মে লগইন সম্পন্ন করেছেন।`, undefined, 'completed', newUsername);
    alert(`স্বাগতম @${newUsername}! 4999bet প্ল্যাটফর্মে লগইন সফল হয়েছে। আপনার ওয়ালেট ব্যালেন্স: ৳ ${balanceToSet.toLocaleString()}`);
  };

  // Register Success Trigger
  const handleRegisterSuccess = (newUsername: string, startingBalance?: number) => {
    setUsername(newUsername);
    setIsLoggedIn(true);
    
    const balanceToSet = startingBalance !== undefined ? startingBalance : 5888.00;
    setUserBalance(balanceToSet);
    
    addAdminLog('system', `নতুন ব্যবহারকারী @${newUsername} তার নিজের মোবাইল নম্বর দিয়ে অ্যাকাউন্ট তৈরি করেছেন।`, undefined, 'completed', newUsername);
    addAdminLog('deposit', `নতুন সদস্য @${newUsername} কে ফ্রি সাইন-আপ বোনাস ৳ ৫,৮৮৮ দেওয়া হয়েছে।`, 5888, 'completed', newUsername);
    alert(`অভিনন্দন @${newUsername}! 4999bet ক্যাসিনোতে আপনার অ্যাকাউন্ট খোলা সফল হয়েছে। ৫,৮৮৮ টাকা সাইন-আপ বোনাস ব্যালেন্সে যুক্ত করা হয়েছে!`);
  };

  // Logout Trigger
  const handleLogout = () => {
    const confirm = window.confirm('আপনি কি সত্যি লগআউট করতে চান?');
    if (confirm) {
      addAdminLog('system', `ব্যবহারকারী @${username} প্ল্যাটফর্ম সেশন থেকে লগআউট করেছেন।`);
      setIsLoggedIn(false);
      setUsername('Guest_4999bet');
      setUserBalance(1000.00); // reset back to base test balance
      alert('সফলভাবে লগআউট করা হয়েছে।');
    }
  };

  // Handle Win from Lucky Spin Wheel
  const handleWinAmount = (amount: number) => {
    setUserBalance((prev) => {
      const nextBal = prev + amount;
      if (isLoggedIn) syncUserBalanceToStorage(username, nextBal);
      return nextBal;
    });
    addAdminLog('luckywheel', `লাকি স্পিন হুইলে চাকা ঘুরিয়ে ৳ ${amount} অতিরিক্ত পুরস্কার জিতেছেন।`, amount);
  };

  // Claim Promotion Promo
  const handleClaimPromo = (promoTitle: string, bonusStr: string) => {
    // extract digits from string (e.g. "৳ ৫৮" -> 58, "৳ ৩০০" -> 300)
    const matches = bonusStr.replace(/[^0-9]/g, '');
    const amt = parseFloat(matches) || 100;
    
    setUserBalance((prev) => {
      const nextBal = prev + amt;
      if (isLoggedIn) syncUserBalanceToStorage(username, nextBal);
      return nextBal;
    });
    addAdminLog('deposit', `প্রোমোশন দাবি: "${promoTitle}" বোনাস ৳ ${amt} যুক্ত হয়েছে।`, amt);
    alert(`প্রোমোশন দাবি সফল! "${promoTitle}" বোনাস বাবদ ৳ ${amt} আপনার অ্যাকাউন্টে যুক্ত হয়েছে।`);
  };

  // Update Balance from gameplay bets/wins
  const handleUpdateBalance = (amount: number, gameDetail?: string) => {
    setUserBalance((prev) => {
      const nextBal = Math.max(0, prev + amount);
      if (isLoggedIn) syncUserBalanceToStorage(username, nextBal);
      return nextBal;
    });
    if (gameDetail) {
      addAdminLog('gameplay', gameDetail, Math.abs(amount));
    }
  };

  // Handle withdrawal simulation
  const handleWithdrawBalance = (amount: number): boolean => {
    if (amount > userBalance) {
      return false;
    }
    setUserBalance((prev) => {
      const nextBal = Math.max(0, prev - amount);
      if (isLoggedIn) syncUserBalanceToStorage(username, nextBal);
      return nextBal;
    });
    return true;
  };

  // Submit pending deposit/withdrawal requests for administrator control and approval
  const handleRequestDeposit = (amount: number, channel: string) => {
    addAdminLog(
      'deposit', 
      `${channel} গেটওয়ের মাধ্যমে ৳ ${amount.toLocaleString()} জমার অনুমোদন আবেদন জমা দেওয়া হয়েছে ও কন্ট্রোলার অনুমোদনের অপেক্ষায় রয়েছে।`, 
      amount, 
      'pending'
    );
  };

  const handleRequestWithdraw = (amount: number, account: string) => {
    addAdminLog(
      'withdraw', 
      `অ্যাকাউন্ট নম্বর ${account} এ ৳ ${amount.toLocaleString()} উত্তোলনের আবেদন জমা দেওয়া হয়েছে ও কন্ট্রোলার অনুমোদনের অপেক্ষায় রয়েছে।`, 
      amount, 
      'pending'
    );
  };

  // Admin control operations
  const handleApproveDeposit = (logId: string) => {
    setAdminLogs(prev => prev.map(log => {
      if (log.id === logId) {
        // Add balance logic
        setUserBalance(b => {
          const nextBal = b + (log.amount || 0);
          syncUserBalanceToStorage(log.user, nextBal);
          return nextBal;
        });
        alert(`অনুমোদিত! @${log.user} এর জন্য ৳ ${log.amount?.toLocaleString()} ডিপোজিট সফলভাবে অ্যাপ্রুভ এবং ব্যালেন্সে যোগ করা হয়েছে।`);
        return { ...log, status: 'completed', detail: log.detail.replace('কন্ট্রোলার অনুমোদনের অপেক্ষায় রয়েছে।', 'কন্ট্রোলার দ্বারা অনুমোদিত হয়েছে।') };
      }
      return log;
    }));
  };

  const handleRejectDeposit = (logId: string) => {
    setAdminLogs(prev => prev.map(log => {
      if (log.id === logId) {
        alert(`প্রত্যাখ্যাত! @${log.user} এর জন্য ৳ ${log.amount?.toLocaleString()} ডিপোজিট বাতিল করা হয়েছে।`);
        return { ...log, status: 'rejected', detail: log.detail.replace('কন্ট্রোলার অনুমোদনের অপেক্ষায় রয়েছে।', 'কন্ট্রোলার দ্বারা বাতিল এবং প্রত্যাখ্যান করা হয়েছে।') };
      }
      return log;
    }));
  };

  const handleApproveWithdraw = (logId: string) => {
    setAdminLogs(prev => prev.map(log => {
      if (log.id === logId) {
        const withdrawAmt = log.amount || 0;
        if (userBalance < withdrawAmt) {
          alert('ত্রুটি! প্লেয়ার অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স নেই।');
          return log;
        }
        // Deduct balance logic
        setUserBalance(b => {
          const nextBal = Math.max(0, b - withdrawAmt);
          syncUserBalanceToStorage(log.user, nextBal);
          return nextBal;
        });
        alert(`অনুমোদিত! @${log.user} এর ওয়ালেট হতে ৳ ${withdrawAmt.toLocaleString()} উত্তোলন সফলভাবে প্রক্রিয়া করা হয়েছে।`);
        return { ...log, status: 'completed', detail: log.detail.replace('কন্ট্রোলার অনুমোদনের অপেক্ষায় রয়েছে। font-semibold', 'সফলভাবে অনুমোদিত ও বিতরণ করা হয়েছে।') };
      }
      return log;
    }));
  };

  const handleRejectWithdraw = (logId: string) => {
    setAdminLogs(prev => prev.map(log => {
      if (log.id === logId) {
        alert(`প্রত্যাখ্যাত! @${log.user} এর জন্য ৳ ${log.amount?.toLocaleString()} উত্তোলন দাবী বাতিল করা হয়েছে।`);
        return { ...log, status: 'rejected', detail: log.detail.replace('কন্ট্রোলার অনুমোদনের অপেক্ষায় রয়েছে।', 'কন্ট্রোলার দ্বারা প্রত্যাখ্যাত করা হয়েছে।') };
      }
      return log;
    }));
  };

  const handleAddSimulatedLog = (type: 'deposit' | 'withdraw' | 'gameplay' | 'luckywheel', details: string, amount: number) => {
    const randomUsers = ['shakil_raj', 'babu_nagad', 'mithu_bkash', 'sabbir_boss', 'rohim_king'];
    const selectedSimUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
    const newLog: AdminLogItem = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 105)}`,
      timestamp: getFormattedTime(),
      user: selectedSimUser,
      type,
      detail: details,
      amount,
      status: type === 'deposit' ? 'pending' : 'completed'
    };
    setAdminLogs(prev => [newLog, ...prev]);
  };

  // Scroll back to top on click
  const handleScrollToTop = () => {
    const section = document.getElementById('main-scroll-section');
    if (section) {
      section.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Trigger simulated support Care live chat
  const handleOpenSupport = () => {
    alert('আমাদের 24/7 লাইভ চ্যাট লাইনে সংযুক্ত করা হচ্ছে... অনুগ্রহ করে চ্যাট ব্যাক করতে প্রস্তুত থাকুন।');
  };

  // Core content tab switcher router
  const renderTabContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <HomeSection
            activeCategory={activeCategory}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            onPlayGame={(game) => setSelectedGamePlay(game)}
          />
        );
      case 'promotion':
        return (
          <PromotionSection
            onBackToHome={() => setCurrentTab('home')}
            onClaimPromo={handleClaimPromo}
          />
        );
      case 'invite':
        return (
          <InviteSection
            onBackToHome={() => setCurrentTab('home')}
            userBalance={userBalance}
          />
        );
      case 'deposit':
        return (
          <DepositSection
            onBackToHome={() => setCurrentTab('home')}
            userBalance={userBalance}
            onAddBalance={(amount) => setUserBalance((prev) => prev + amount)}
            onWithdrawBalance={handleWithdrawBalance}
            onRequestDeposit={handleRequestDeposit}
            onRequestWithdraw={handleRequestWithdraw}
          />
        );
      case 'member':
        return (
          <MemberSection
            onBackToHome={() => setCurrentTab('home')}
            userBalance={userBalance}
            isLoggedIn={isLoggedIn}
            username={username}
            onLogout={handleLogout}
            openLoginModal={() => setIsLoginOpen(true)}
            onSwitchToAdmin={() => setCurrentTab('admin')}
          />
        );
      case 'admin':
        return (
          <AdminSection
            onBackToHome={() => setCurrentTab('home')}
            userBalance={userBalance}
            username={username}
            isLoggedIn={isLoggedIn}
            onModifyBalance={(amount) => setUserBalance(b => {
              const nextBal = Math.max(0, b + amount);
              if (isLoggedIn) syncUserBalanceToStorage(username, nextBal);
              return nextBal;
            })}
            adminLogs={adminLogs}
            winMultiplierBoost={winMultiplierBoost}
            onToggleWinBoost={() => {
              setWinMultiplierBoost(curr => !curr);
              addAdminLog('system', `কন্ট্রোলার স্লট রেট বুস্টার ${!winMultiplierBoost ? 'সক্রিয়' : 'নিষ্ক্রিয়'} করা হয়েছে।`);
            }}
            onApproveDeposit={handleApproveDeposit}
            onRejectDeposit={handleRejectDeposit}
            onApproveWithdraw={handleApproveWithdraw}
            onRejectWithdraw={handleRejectWithdraw}
            onAddSimulatedLog={handleAddSimulatedLog}
          />
        );
      default:
        return (
          <HomeSection
            activeCategory={activeCategory}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            onPlayGame={(game) => setSelectedGamePlay(game)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans select-none overflow-hidden max-w-md mx-auto relative border-x border-gray-900 shadow-2xl">
      
      {/* 1. Global Header Section */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openLoginModal={() => { setIsLoginOpen(true); setIsRegisterOpen(false); }}
        openRegisterModal={() => { setIsLoginOpen(true); setIsRegisterOpen(true); }}
        onOpenLuckyWheel={() => setIsLuckyWheelOpen(true)}
        userBalance={userBalance}
        isLoggedIn={isLoggedIn}
        username={username}
      />

      {/* 2. Central Layout Wrapper Container (Sidebar Category Rail + Active Tab contents) */}
      <div className="flex flex-1 relative bg-[#101010]" id="main-scroll-section">
        
        {/* Sidebar categories visible inline as left navigation rail */}
        <Sidebar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onTabChange={() => setCurrentTab('home')}
        />

        {/* Dynamic active view display */}
        {renderTabContent()}
      </div>

      {/* 3. Global Sticky Bottom tabbar controls */}
      <BottomNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      {/* 4. Global Floating bubble support links */}
      <FloatingActions
        onOpenSupport={handleOpenSupport}
        onOpenLuckyWheel={() => setIsLuckyWheelOpen(true)}
        scrollToTop={handleScrollToTop}
      />

      {/* 5. Custom Modal overlays */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={isRegisterOpen ? handleRegisterSuccess : handleLoginSuccess}
        isRegister={isRegisterOpen}
      />

      <LuckyWheelModal
        isOpen={isLuckyWheelOpen}
        onClose={() => setIsLuckyWheelOpen(false)}
        onWinAmount={handleWinAmount}
      />

      <GamePlayModal
        game={selectedGamePlay}
        isOpen={selectedGamePlay !== null}
        onClose={() => setSelectedGamePlay(null)}
        userBalance={userBalance}
        onUpdateBalance={handleUpdateBalance}
        winMultiplierBoost={winMultiplierBoost}
      />
    </div>
  );
}
