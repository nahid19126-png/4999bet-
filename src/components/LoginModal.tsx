import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, X, Headphones, Facebook, Chrome } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
  isRegister?: boolean;
}

export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
  isRegister = false
}: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSignMode, setIsSignMode] = useState(isRegister);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorMsg('দয়া করে ব্যবহারকারীর নাম লিখুন');
      return;
    }
    if (password.length < 4) {
      setErrorMsg('পাসওয়ার্ড অত্যন্ত ছোট (অন্তত ৪ অক্ষর)');
      return;
    }

    // Success login mock
    setErrorMsg('');
    onLoginSuccess(username.trim());
    onClose();
  };

  const handleSocialLogin = (platform: string) => {
    onLoginSuccess(`${platform}_User_${Math.floor(100+Math.random()*900)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-full max-w-sm bg-[#1a1a1a] rounded-3xl overflow-hidden border border-[#333] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col max-h-[95vh]">
        
        {/* Top Absolute Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-1.5 rounded-full bg-black/40 text-gray-400 hover:text-white hover:bg-neutral-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. Header luxury casino style matching description */}
        <div className="relative h-32 bg-gradient-to-br from-[#FFBF00] to-orange-600 flex flex-col items-center justify-center select-none shrink-0">
          <div className="text-5xl font-black text-black opacity-30 absolute -bottom-2 -left-2">4999</div>
          <h2 className="text-2xl font-black text-black uppercase tracking-widest">
            {isSignMode ? 'নিবন্ধন করুন' : 'লগইন করুন'}
          </h2>
        </div>

        {/* 2. Form Section */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Display validation warning if any */}
            {errorMsg && (
              <div className="bg-red-950/40 border border-red-500/30 text-red-200 text-xs py-2 px-3 rounded-lg text-center font-bold">
                ⚠ {errorMsg}
              </div>
            )}

            {/* Username Input underline-style */}
            <div className="relative border-b border-[#444] flex items-center gap-3 py-2 group">
              <User className="w-5 h-5 text-[#FFBF00]" />
              <input
                type="text"
                placeholder={isSignMode ? "পছন্দের ব্যবহারকারী নাম" : "ব্যবহারকারী নাম (Username)"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none border-none tracking-wide"
                id="login-username-input"
              />
            </div>

            {/* Password Input underline-style */}
            <div className="relative border-b border-[#444] flex items-center gap-3 py-2 group">
              <Lock className="w-5 h-5 text-[#FFBF00]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="পাসওয়ার্ড (Password)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none border-none tracking-widest"
                id="login-password-input"
              />
              {/* Password toggle eye icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center justify-between text-xs text-gray-400 select-none pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="rounded border-[#444] bg-black text-[#FFBF00] focus:ring-0 focus:ring-offset-0"
                />
                <span>মনে রাখুন (Remember)</span>
              </label>
              <a href="#" className="text-[#FFBF00] hover:underline" onClick={() => alert('দয়া করে আমাদের ২৪/৭ সাপোর্ট লাইনেই পাসওয়ার্ড রিঅ্যাক্টিভেশন দাবি করুন।')}>পাসওয়ার্ড ভুলে গেছেন?</a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#FFBF00] text-black font-black uppercase rounded-lg shadow-xl hover:brightness-110 active:scale-95 transition-transform"
              id="login-submit-btn"
            >
              {isSignMode ? 'নিবন্ধন সম্পন্ন করুন' : 'লগইন'}
            </button>
          </form>

          {/* Social Auth Separator */}
          <div className="relative my-6 text-center select-none">
            <span className="absolute inset-x-0 top-1/2 h-[1px] bg-neutral-800"></span>
            <span className="relative z-10 px-3 bg-[#1a1a1a] text-xs text-gray-500 font-bold uppercase tracking-wider">
              অথবা চালিয়ে যান
            </span>
          </div>

          {/* Social login action rows */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleSocialLogin('Facebook')}
              className="flex-1 py-2 bg-[#3b5998] rounded-md text-xs font-bold text-white hover:brightness-110 active:scale-95 transition"
              id="social-login-facebook"
            >
              FACEBOOK
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="flex-1 py-2 bg-[#ea4335] rounded-md text-xs font-bold text-white hover:brightness-110 active:scale-95 transition"
              id="social-login-google"
            >
              GOOGLE
            </button>
          </div>

          {/* Bottom toggle between states and service CTA */}
          <div className="mt-8 pt-3 border-t border-neutral-900 flex items-center justify-between text-xs select-none">
            <div className="text-gray-400">
              {isSignMode ? 'ইতিমধ্যে অ্যাকাউন্ট আছে?' : 'এখনও কোনও অ্যাকাউন্ট নেই?'}
              <button
                type="button"
                onClick={() => {
                  setIsSignMode(!isSignMode);
                  setErrorMsg('');
                }}
                className="text-[#FFBF00] font-black hover:underline cursor-pointer ml-1"
              >
                {isSignMode ? 'লগইন' : 'নিবন্ধন'}
              </button>
            </div>

            {/* Customer support inline bubble */}
            <button
              type="button"
              onClick={() => alert('লাইভ সেবা প্রতিনিধি দলের সাথে যোগাযোগ করা হচ্ছে... অনুগ্রহ করে অপেক্ষা করুন')}
              className="flex items-center space-x-1.5 py-1.5 px-3 bg-[#FFBF00] hover:brightness-110 active:scale-95 rounded-full text-black font-extrabold text-[10px] shadow"
              id="btn-inline-service"
            >
              <Headphones className="w-3 h-3" />
              <span>সেবা</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
