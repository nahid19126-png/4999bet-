import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock, X, Headphones, Phone, Gift, ShieldAlert } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string, startingBalance?: number) => void;
  isRegister?: boolean;
}

interface UserAccount {
  phone: string;
  username: string;
  password: string;
  balance: number;
}

export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
  isRegister = false
}: LoginModalProps) {
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [promoCode, setPromoCode] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSignMode, setIsSignMode] = useState(isRegister);

  // Sync state with open prop
  useEffect(() => {
    setIsSignMode(isRegister);
    setErrorMsg('');
  }, [isRegister, isOpen]);

  if (!isOpen) return null;

  // Initialize simulated database in localStorage
  const getStoredUsers = (): UserAccount[] => {
    const raw = localStorage.getItem('site_registered_users');
    if (!raw) {
      const defaultUsers: UserAccount[] = [
        { phone: '01712345678', username: 'nahid_tech', password: '1234', balance: 15000 },
        { phone: '01911223344', username: 'ruma_khan', password: '4321', balance: 8888 },
        { phone: '01888888888', username: 'bipul_boss', password: '5555', balance: 25000 }
      ];
      localStorage.setItem('site_registered_users', JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    return JSON.parse(raw);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const users = getStoredUsers();

    if (isSignMode) {
      // REGISTRATION SUBMIT
      if (!phone.trim()) {
        setErrorMsg('ডিপ্লয়মেন্ট সুরক্ষায় দয়া করে মোবাইল নম্বরটি দিন');
        return;
      }
      // BD phone check: 11 digits starting with 01
      const bdPhoneRegex = /^01[3-9]\d{8}$/;
      if (!bdPhoneRegex.test(phone.trim())) {
        setErrorMsg('দয়া করে সঠিক ১১ ডিজিটের বাংলাদেশী মোবাইল নম্বর লিখুন (যেমন: 017xxxxxxxx)');
        return;
      }

      if (!username.trim()) {
        setErrorMsg('দয়া করে আপনার ব্যবহারকারী নাম (Username) লিখুন');
        return;
      }
      
      if (username.trim().length < 3) {
        setErrorMsg('ব্যবহারকারী নামটি অত্যন্ত ছোট (কমপক্ষে ৩ অক্ষর হতে হবে)');
        return;
      }

      if (!password || password.length < 4) {
        setErrorMsg('পাসওয়ার্ড অন্তত ৪ অক্ষরের বা সংখ্যার হওয়া আবশ্যক');
        return;
      }

      // Check if phone or username already registered
      const phoneExists = users.some(u => u.phone === phone.trim());
      const userExists = users.some(u => u.username.toLowerCase() === username.trim().toLowerCase());

      if (phoneExists) {
        setErrorMsg('এই মোবাইল নম্বরটি দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট তৈরি করা হয়েছে!');
        return;
      }
      if (userExists) {
        setErrorMsg('এই ব্যবহারকারী নাম (Username) ইতিমধ্যে ব্যবহৃত হয়েছে, অন্য নাম দিন!');
        return;
      }

      // Add user to database
      const initialBalance = 5888.00; // Sign up free balance as advertised
      const newUser: UserAccount = {
        phone: phone.trim(),
        username: username.trim(),
        password: password,
        balance: initialBalance
      };

      users.push(newUser);
      localStorage.setItem('site_registered_users', JSON.stringify(users));

      // Save currentUser session details in localStorage for dynamic state retention
      localStorage.setItem('site_active_user_phone', phone.trim());

      // Trigger callback
      onLoginSuccess(username.trim(), initialBalance);
      onClose();
    } else {
      // LOGIN SUBMIT
      const identifier = phone.trim(); // can be phone or username
      if (!identifier) {
        setErrorMsg('দয়া করে আপনার মোবাইল নম্বর অথবা ব্যবহারকারী নাম দিন');
        return;
      }
      if (!password) {
        setErrorMsg('দয়া করে পাসওয়ার্ড দিন');
        return;
      }

      // Find user
      const foundUser = users.find(u => 
        u.phone === identifier || 
        u.username.toLowerCase() === identifier.toLowerCase()
      );

      if (!foundUser) {
        setErrorMsg('অ্যাকাউন্ট পাওয়া যায়নি! দয়া করে সঠিক মোবাইল নম্বর বা নাম ব্যবহার করুন অথবা নতুন অ্যাকাউন্ট তৈরি করুন।');
        return;
      }

      if (foundUser.password !== password) {
        setErrorMsg('ভুল পাসওয়ার্ড! দয়া করে সঠিক পাসওয়ার্ড টাইপ করুন বা পাসওয়ার্ড জিজ্ঞাসা করতে সাপোর্ট এ কথা বলুন।');
        return;
      }

      // Save active session
      localStorage.setItem('site_active_user_phone', foundUser.phone);

      // Trigger success login
      onLoginSuccess(foundUser.username, foundUser.balance);
      onClose();
    }
  };

  const handleSocialLogin = (platform: string) => {
    const mockUser = `${platform}_User_${Math.floor(100 + Math.random() * 900)}`;
    onLoginSuccess(mockUser, 12888);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-full max-w-sm bg-[#16161a] rounded-3xl overflow-hidden border border-[#FFBF00]/25 shadow-[0_20px_50px_rgba(255,191,0,0.15)] flex flex-col max-h-[95vh]">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 text-gray-400 hover:text-white hover:bg-neutral-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 1. Header luxury casino style branding */}
        <div className="relative h-28 bg-gradient-to-br from-[#FFBF00] to-yellow-600 flex flex-col items-center justify-center select-none shrink-0 text-center">
          <div className="text-4xl font-extrabold text-black opacity-15 absolute -bottom-1.5 -left-1.5 font-sans">4999BET</div>
          <p className="text-[10px] text-amber-950 font-black tracking-widest uppercase mb-0.5">অফিশিয়াল গেটওয়ে</p>
          <h2 className="text-xl font-black text-black tracking-wide">
            {isSignMode ? 'নতুন অ্যাকাউন্ট খুলুন' : 'লগইন করুন (Secure Portal)'}
          </h2>
        </div>

        {/* 2. Login or Sign up interactive Form */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-5 no-scrollbar">
          
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {/* Display error warning if validation fails */}
            {errorMsg && (
              <div className="bg-rose-950/50 border border-rose-500/35 text-rose-200 text-xs py-2 px-3 rounded-xl flex items-center gap-2 font-semibold">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* If Sign up mode: we need BOTH Mobile Phone AND Username */}
            {isSignMode ? (
              <>
                {/* 1. REGISTRATION: Phone Number Field */}
                <div className="space-y-1">
                  <label className="text-[10px] text-[#FFBF00] font-black uppercase tracking-wider block">মোবাইল নম্বর (Eleven Digits)</label>
                  <div className="relative border-b border-[#333] hover:border-[#FFBF00]/50 focus-within:border-[#FFBF00] flex items-center gap-2.5 py-1.5 transition">
                    <Phone className="w-4 h-4 text-[#FFBF00] shrink-0" />
                    <input
                      type="tel"
                      maxLength={11}
                      placeholder="যেমন: 017xxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full bg-transparent text-sm text-white placeholder-gray-600 outline-none border-none tracking-wider font-mono"
                      id="reg-phone-input"
                    />
                  </div>
                </div>

                {/* 2. REGISTRATION: Username Field */}
                <div className="space-y-1">
                  <label className="text-[10px] text-[#FFBF00] font-black uppercase tracking-wider block">আপনার নাম (Username)</label>
                  <div className="relative border-b border-[#333] hover:border-[#FFBF00]/50 focus-within:border-[#FFBF00] flex items-center gap-2.5 py-1.5 transition">
                    <User className="w-4 h-4 text-[#FFBF00] shrink-0" />
                    <input
                      type="text"
                      placeholder="যেমন: milon_nagad"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-transparent text-sm text-white placeholder-gray-600 outline-none border-none tracking-wide"
                      id="reg-username-input"
                    />
                  </div>
                </div>
              </>
            ) : (
              /* LOGIN MODE: Single Mobile or Username Field */
              <div className="space-y-1">
                <label className="text-[10px] text-[#FFBF00] font-black uppercase tracking-wider block">মোবাইল নম্বর অথবা ব্যবহারকারী নাম</label>
                <div className="relative border-b border-[#333] hover:border-[#FFBF00]/50 focus-within:border-[#FFBF00] flex items-center gap-2.5 py-1.5 transition">
                  <User className="w-4 h-4 text-[#FFBF00] shrink-0" />
                  <input
                    type="text"
                    placeholder="017xxxxxxxx অথবা ব্যবহারকারী নাম"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent text-sm text-white placeholder-gray-600 outline-none border-none tracking-wide"
                    id="login-username-or-phone-input"
                  />
                </div>
              </div>
            )}

            {/* BOTH: Password Field */}
            <div className="space-y-1">
              <label className="text-[10px] text-[#FFBF00] font-black uppercase tracking-wider block">পাসওয়ার্ড (Password)</label>
              <div className="relative border-b border-[#333] hover:border-[#FFBF00]/50 focus-within:border-[#FFBF00] flex items-center gap-2.5 py-1.5 transition">
                <Lock className="w-4 h-4 text-[#FFBF00] shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={isSignMode ? "একটি নিরাপদ পাসওয়ার্ড সেট করুন" : "আপনার পাসওয়ার্ড লিখুন"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder-gray-600 outline-none border-none tracking-wide"
                  id="login-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* REGISTRATION ONLY: Optional Referral Promotion Invitation Code */}
            {isSignMode && (
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">আমন্ত্রণ কোড (Referral Code - Optional)</label>
                <div className="relative border-b border-[#333] flex items-center gap-2.5 py-1.5 opacity-80">
                  <Gift className="w-4 h-4 text-gray-500 shrink-0" />
                  <input
                    type="text"
                    placeholder="যেমন: Super4999 (ফ্রি ট্রায়াল সুবিধা)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-transparent text-xs text-white placeholder-gray-700 outline-none border-none"
                    id="reg-promo-gift-input"
                  />
                </div>
              </div>
            )}

            {/* Remember Me box & helper CTA link */}
            <div className="flex items-center justify-between text-[11px] text-gray-400 select-none pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="rounded border-[#333] bg-black text-[#FFBF00] focus:ring-0 focus:ring-offset-0"
                />
                <span>পাসওয়ার্ড মনে রাখুন</span>
              </label>
              {!isSignMode && (
                <button
                  type="button"
                  onClick={() => alert('আপনার পাসওয়ার্ড পুনরায় উদ্ধার করতে অথবা রিসেট করতে, দয়া করে আপনার ফোন নম্বরটি আমাদের ২৪/৭ সাপোর্ট এজেন্টের কাছে প্রদান করুন।')}
                  className="text-[#FFBF00] hover:underline"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </button>
              )}
            </div>

            {/* Authentication Submit Request CTA */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#FFBF00] hover:brightness-110 active:scale-98 text-black text-xs font-black uppercase tracking-widest rounded-xl transition shadow-[0_4px_20px_rgba(255,191,0,0.2)] mt-2 cursor-pointer"
              id="auth-primary-submit-btn"
            >
              {isSignMode ? 'নতুন অ্যাকাউন্ট খুলুন' : 'লগইন করুন'}
            </button>
          </form>

          {/* Inline notification info about fast signup bonus promotion */}
          {isSignMode && (
            <div className="mt-4 p-2.5 rounded-xl bg-yellow-500/5 border border-yellow-500/10 text-[9px] text-[#FFBF00] text-center font-bold">
              🎉 নতুন একাউন্ট খুলে পান ফ্রি সাইন-আপ বোনাস ৳ ৫,৮৮৮ সরাসরি ওয়ালেটে!
            </div>
          )}

          {/* Social Auth Separator */}
          <div className="relative my-5 text-center select-none">
            <span className="absolute inset-x-0 top-1/2 h-[1px] bg-neutral-900"></span>
            <span className="relative z-10 px-3 bg-[#16161a] text-[10px] text-gray-500 font-bold uppercase tracking-wider font-sans">
              অথবা অন্য মাধ্যমে
            </span>
          </div>

          {/* One click Facebook & Google instant credentials trial */}
          <div className="flex gap-2 text-[10px]">
            <button
              type="button"
              onClick={() => handleSocialLogin('Facebook')}
              className="flex-1 py-1.5 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/20 rounded-lg text-white font-bold transition flex items-center justify-center gap-1"
              id="btn-fast-fb"
            >
              <span>FACEBOOK</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="flex-1 py-1.5 bg-red-600/10 hover:bg-red-600/20 border border-red-600/20 rounded-lg text-white font-bold transition flex items-center justify-center gap-1"
              id="btn-fast-google"
            >
              <span>GOOGLE</span>
            </button>
          </div>

          {/* Modal toggle switch: Login <-> Register */}
          <div className="mt-6 pt-3.5 border-t border-neutral-900 flex items-center justify-between text-xs select-none">
            <div className="text-gray-400">
              {isSignMode ? 'ইতিমধ্যে অ্যাকাউন্ট আছে?' : 'এখনও কোনো অ্যাকাউন্ট নেই?'}
              <button
                type="button"
                onClick={() => {
                  setIsSignMode(!isSignMode);
                  setErrorMsg('');
                }}
                className="text-[#FFBF00] font-black hover:underline cursor-pointer ml-1.5"
              >
                {isSignMode ? 'লগইন করুন' : 'নিবন্ধন করুন'}
              </button>
            </div>

            {/* Helpline fast CTA bubble */}
            <button
              type="button"
              onClick={() => alert('২৪/৭ সেবা বিভাগঃ আমাদের কাস্টমার সাপোর্ট লাইনে আপনাকে স্বাগতম। আপনি চাইলে যেকোনো মোবাইল নম্বর সম্পর্কিত পাসওয়ার্ড পরিবর্তন করতে পারেন।')}
              className="flex items-center space-x-1.5 py-1.5 px-3 bg-neutral-850 hover:bg-neutral-800 text-[#FFBF00] font-black text-[10px] rounded-lg border border-[#333] transition"
              id="btn-inline-helpline"
            >
              <Headphones className="w-3 h-3" />
              <span>সহায়তা</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
