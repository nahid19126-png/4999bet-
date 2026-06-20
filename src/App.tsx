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
import { AppTab, GameCategory, GameItem } from './types';

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

  // Toggle Favorite
  const toggleFavorite = (gameId: string) => {
    setFavorites((prev) =>
      prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId]
    );
  };

  // Login Success
  const handleLoginSuccess = (newUsername: string) => {
    setUsername(newUsername);
    setIsLoggedIn(true);
    setUserBalance(12888.00); // Give them welcome bonus balance simulation!
    alert(`স্বাগতম @${newUsername}! 4999bet প্ল্যাটফর্মে লগইন সফল হয়েছে। ১৫০০ টাকা স্বাগতম বোনাস যুক্ত হয়েছে!`);
  };

  // Register Success Trigger
  const handleRegisterSuccess = (newUsername: string) => {
    setUsername(newUsername);
    setIsLoggedIn(true);
    setUserBalance(5888.00); // Free sign-up bonus as advertised in promotion!
    alert(`অভিনন্দন @${newUsername}! 4999bet নিবন্ধন সম্পূর্ণ হয়েছে। ফ্রি ৫,৮৮৮ টাকা সাইন-আপ বোনাস যুক্ত করা হয়েছে!`);
  };

  // Logout Trigger
  const handleLogout = () => {
    const confirm = window.confirm('আপনি কি সত্যি লগআউট করতে চান?');
    if (confirm) {
      setIsLoggedIn(false);
      setUsername('Guest_4999bet');
      setUserBalance(1000.00); // reset back to base test balance
      alert('সফলভাবে লগআউট করা হয়েছে।');
    }
  };

  // Handle Win from Lucky Spin Wheel
  const handleWinAmount = (amount: number) => {
    setUserBalance((prev) => prev + amount);
  };

  // Claim Promotion Promo
  const handleClaimPromo = (promoTitle: string, bonusStr: string) => {
    // extract digits from string (e.g. "৳ ৫৮" -> 58, "৳ ৩০০" -> 300)
    const matches = bonusStr.replace(/[^0-9]/g, '');
    const amt = parseFloat(matches) || 100;
    
    setUserBalance((prev) => prev + amt);
    alert(`প্রোমোশন দাবি সফল! "${promoTitle}" বোনাস বাবদ ৳ ${amt} আপনার অ্যাকাউন্টে যুক্ত হয়েছে।`);
  };

  // Update Balance from gameplay bets/wins
  const handleUpdateBalance = (amount: number) => {
    setUserBalance((prev) => prev + amount);
  };

  // Handle withdrawal simulation
  const handleWithdrawBalance = (amount: number): boolean => {
    if (amount > userBalance) {
      return false;
    }
    setUserBalance((prev) => prev - amount);
    return true;
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
      />
    </div>
  );
}
