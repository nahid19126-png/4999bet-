import React, { useState, useMemo } from 'react';
import { Search, Heart, SlidersHorizontal, Play, Sparkles } from 'lucide-react';
import { GameItem, GameCategory } from '../types';
import { GAMES_DATA, PROVIDERS } from '../data';

interface HomeSectionProps {
  activeCategory: GameCategory;
  favorites: string[];
  toggleFavorite: (gameId: string) => void;
  onPlayGame: (game: GameItem) => void;
}

export default function HomeSection({
  activeCategory,
  favorites,
  toggleFavorite,
  onPlayGame
}: HomeSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Filter games based on current active category, search prompt, selected provider, and favorite filter
  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter((game) => {
      // 1. Matches Sidebar Category
      if (game.category !== activeCategory) return false;

      // 2. Matches Selected Provider
      if (selectedProvider !== 'all' && game.provider.toLowerCase() !== selectedProvider.toLowerCase()) {
        return false;
      }

      // 3. Matches Favorites Toggle
      if (showOnlyFavorites && !favorites.includes(game.id)) {
        return false;
      }

      // 4. Matches Search Keyword
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = game.name.toLowerCase().includes(query);
        const matchesBangla = game.banglaName.toLowerCase().includes(query);
        const matchesProvider = game.provider.toLowerCase().includes(query);
        if (!matchesName && !matchesBangla && !matchesProvider) return false;
      }

      return true;
    });
  }, [activeCategory, selectedProvider, showOnlyFavorites, searchQuery, favorites]);

  // Category title display helper in Bangla
  const getCategoryTitle = (cat: GameCategory) => {
    switch (cat) {
      case 'hot': return 'গরম গেমস (Hot)';
      case 'slots': return 'স্লট গেমস (Slots)';
      case 'live': return 'লাইভ ক্যাসিনো (Live)';
      case 'fishing': return 'ফিশিং গেমস (Fishing)';
      case 'sports': return 'স্পোর্টস বেটিং (Sports)';
      case 'poker': return 'পোকার ও কার্ড (Poker)';
      default: return 'ফিশিং গেমস (Fishing)';
    }
  };

  // Render a beautifully designed background & illustration based on game card type to represent reference screenshot quality
  const renderCardGraphics = (type: GameItem['imageType'], provider: string, item: GameItem) => {
    switch (type) {
      case 'ace':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-rose-800 to-black p-2 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-8 right-[-10px] w-14 h-14 rounded-full bg-yellow-400/20 blur-xl"></div>
            <div className="absolute bottom-2 left-2 text-white/5 font-bold text-5xl">A</div>
            <div className="flex justify-center items-center h-full flex-col">
              {/* Crown representation */}
              <div className="relative z-10 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                <span className="text-5xl font-extrabold text-[#FFE57F] leading-none select-none tracking-tight">♠</span>
              </div>
              <p className="text-white font-extrabold text-xs tracking-wider z-10 uppercase text-center mt-1">Super Ace</p>
            </div>
            {/* Soft decorative bottom lines */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-yellow-400 to-red-500"></div>
          </div>
        );
      case 'aviator':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-[#141517] via-[#210206] to-[#040404] p-3 flex flex-col justify-between">
            <div className="absolute top-2 left-2 text-[#e31a31] text-[9px] font-mono tracking-widest uppercase">3.42x</div>
            <div className="flex flex-col justify-center items-center h-full relative">
              {/* Aviator Red Supersonic Jet Plane */}
              <div className="font-extrabold text-[#e31a31] text-3xl filter drop-shadow-[0_0_15px_#e31a31] animate-[pulse_1.5s_infinite]">
                 ✈
              </div>
              <span className="text-[10px] text-gray-400 font-bold tracking-tight mt-1">AVIATOR</span>
            </div>
            <div className="absolute bottom-1 right-2 text-[8px] font-black text-rose-500/30">Multiplier</div>
          </div>
        );
      case 'showdown':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-700 via-[#1f1604] to-black p-2 flex flex-col justify-between">
            <div className="absolute top-10 right-2 text-white/5 font-extrabold text-3xl">PG</div>
            <div className="flex flex-col justify-center items-center h-full">
              <span className="text-4xl text-amber-500 font-bold">🤠</span>
              <p className="text-amber-400 font-bold text-[9px] text-center mt-1 tracking-tight">WILD BOUNTY</p>
            </div>
          </div>
        );
      case 'fishing':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-900 to-black p-2 flex flex-col justify-between">
            <div className="absolute top-1 right-1 flex space-x-1">
              <span className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-ping"></span>
              <span className="w-1.5 h-1.5 bg-sky-305 rounded-full"></span>
            </div>
            <div className="flex flex-col justify-center items-center h-full">
              <span className="text-4xl filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">🦈</span>
              <p className="text-white font-black text-[10px] uppercase tracking-wider text-center mt-1">Happy Fish</p>
            </div>
            <div className="absolute bottom-0.5 right-1 text-[8px] text-cyan-300 font-semibold italic">৳ 200,000 max</div>
          </div>
        );
      case 'ocean':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-teal-700 via-emerald-950 to-neutral-900 p-2 flex flex-col justify-between">
            <div className="flex flex-col justify-center items-center h-full">
              <span className="text-4xl filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">🐙</span>
              <p className="text-[#FFBF00] font-black text-[9px] text-center mt-1 uppercase">Ocean King</p>
            </div>
          </div>
        );
      case 'fortune':
        return (
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 via-[#3b2707] to-neutral-950 p-2 flex flex-col justify-between">
            <div className="flex flex-col justify-center items-center h-full">
              <span className="text-4xl filter drop-shadow-[0_4px_8px_rgba(255,191,0,0.3)] animate-bounce">👑</span>
              <p className="text-[#efe38c] font-bold text-[8px] text-center mt-0.5 tracking-tighter">FORTUNE GEMS</p>
            </div>
          </div>
        );
      case 'flyx':
        return (
          <div className="absolute inset-0 bg-gradient-to-tr from-[#2d1c5d] via-[#10072b] to-black p-2 flex flex-col justify-between">
            <div className="flex flex-col justify-center items-center h-full">
              <span className="text-3xl text-indigo-400 font-bold">🚀</span>
              <p className="text-indigo-300 font-bold text-[10px] text-center mt-1">FLY X</p>
            </div>
          </div>
        );
      case 'circus':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600 via-purple-950 to-neutral-950 p-2 flex flex-col justify-between">
            <div className="flex flex-col justify-center items-center h-full">
              <span className="text-4xl animate-pulse">🎪</span>
              <p className="text-fuchsia-200 font-extrabold text-[9px] text-center mt-1">CIRCUS JOKER</p>
            </div>
          </div>
        );
      case 'boxing':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-950 to-black p-3 flex flex-col justify-between">
            <div className="flex flex-col justify-center items-center h-full">
              <span className="text-4xl filter drop-shadow-[0_4px_8px_#ff3c3c]">🥊</span>
              <p className="text-white font-extrabold text-[9px] text-center mt-1 uppercase">Boxing King</p>
            </div>
          </div>
        );
      case 'garuda':
        return (
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-600 via-yellow-950 to-neutral-950 p-2 flex flex-col justify-between">
            <div className="flex flex-col justify-center items-center h-full">
              <span className="text-3xl">🦅</span>
              <p className="text-yellow-400 font-black text-[9px] text-center tracking-tighter mt-1">GARUDA WARRIOR</p>
            </div>
          </div>
        );
      case 'anubis':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-700 via-neutral-950 to-black p-2 flex flex-col justify-between">
            <div className="flex flex-col justify-center items-center h-full">
              <span className="text-3xl">☥</span>
              <p className="text-[#FFBF00] font-bold text-[9px] tracking-widest text-center mt-1 uppercase">Anubis Gold</p>
            </div>
          </div>
        );
      case 'chicken':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-950 to-stone-900 p-2 flex flex-col justify-between">
            <div className="flex flex-col justify-center items-center h-full">
              <span className="text-3xl">🐔</span>
              <p className="text-emerald-200 font-extrabold text-[9px] text-center mt-1">Chicken Dash</p>
            </div>
          </div>
        );
      case 'crazy':
        return (
          <div className="absolute inset-0 bg-gradient-to-tr from-red-600 via-purple-900 to-[#10072b] p-2 flex flex-col justify-between">
            <div className="flex flex-col justify-center items-center h-full">
              <span className="text-3xl animate-spin">🎡</span>
              <p className="text-red-200 font-extrabold text-[9px] text-center tracking-tighter mt-1">Crazy Time</p>
            </div>
          </div>
        );
      case 'poker':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-stone-950 to-black p-2 flex flex-col justify-between animate-pulse">
            <div className="flex flex-col justify-center items-center h-full">
              <span className="text-4xl text-yellow-505">🎴</span>
              <p className="text-white font-extrabold text-[8px] text-center mt-1">POKER ROULETTE</p>
            </div>
          </div>
        );
      case 'dice':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 via-stone-900 to-[#221005] p-2 flex flex-col justify-between">
            <div className="flex flex-col justify-center items-center h-full">
              <span className="text-4xl drop-shadow-[0_4px_8px_rgba(255,191,0,0.5)]">🎲</span>
              <p className="text-[#FFBF00] font-black text-[9px] text-center mt-1">DICE DUET</p>
            </div>
          </div>
        );
      case 'updown':
        return (
          <div className="absolute inset-0 bg-[#160d2b] border border-indigo-900 p-2 flex flex-col justify-between bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950 via-[#07011d] to-black">
            <div className="flex flex-col justify-center items-center h-full">
              <span className="text-4xl text-indigo-400">🎰</span>
              <p className="text-indigo-100 font-extrabold text-[8px] text-center tracking-widest mt-1">7 UP 7 DOWN</p>
            </div>
          </div>
        );
      case 'andar':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-emerald-950 to-neutral-950 p-2 flex flex-col justify-between">
            <div className="flex flex-col justify-center items-center h-full">
              <span className="text-4xl animate-pulse">🃏</span>
              <p className="text-emerald-300 font-extrabold text-[9px] text-center mt-1">ANDAR BAHAR</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center p-2">
            <span className="text-white text-xs">{item.name}</span>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 bg-[#0a0a0a] p-3 overflow-y-auto h-[calc(100vh-155px)] no-scrollbar pb-10">
      {/* 1. Header Search and Favorites Row */}
      <div className="flex items-center space-x-2 mb-3.5">
        <div className="flex-1 bg-[#1a1a1a] rounded-xl px-3 py-2 flex items-center border border-[#333] focus-within:border-[#FFBF00] transition">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="আপনার প্রিয় গেম খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm text-gray-200 outline-none w-full placeholder-gray-600 font-sans"
            id="game-search-input"
          />
        </div>

        {/* Favorite Filter Toggle */}
        <button
          type="button"
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          className={`p-2.5 rounded-xl border transition flex items-center justify-center ${
            showOnlyFavorites
              ? 'bg-[#FFBF00]/10 border-[#FFBF00] text-[#FFBF00]'
              : 'bg-[#1a1a1a] border-[#333] text-gray-400 hover:text-white'
          }`}
          title="শুধুমাত্র প্রিয় গেমস"
          id="btn-favorites-filter"
        >
          <Heart className={`w-4 h-4 ${showOnlyFavorites ? 'fill-current' : ''}`} />
        </button>

        {/* Filter configuration indicator */}
        <button
          type="button"
          onClick={() => {
            setSearchQuery('');
            setSelectedProvider('all');
            setShowOnlyFavorites(false);
          }}
          className="p-2.5 rounded-xl bg-[#1a1a1a] border border-[#333] text-gray-400 hover:text-white active:scale-95 transition"
          title="রিসেট করুন"
          id="btn-reset-filters"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Provider Logos/Names horizontal slider matches Screenshot 1, 2, 3 */}
      <div className="mb-4">
        <div className="flex space-x-1.5 overflow-x-auto no-scrollbar py-1">
          {PROVIDERS.map((prov) => {
            const isSelected = selectedProvider === prov.id;
            return (
              <button
                key={prov.id}
                type="button"
                onClick={() => setSelectedProvider(prov.id)}
                className={`px-5 py-1.5 rounded-lg text-xs font-black tracking-wider transition-all uppercase whitespace-nowrap border shrink-0 ${
                  isSelected
                    ? 'bg-[#FFBF00] text-black border-transparent shadow shadow-yellow-500/20'
                    : 'bg-[#1a1a1a] text-gray-400 border-[#333] hover:text-white hover:border-[#FFBF00]'
                }`}
                id={`provider-tab-${prov.id}`}
              >
                {prov.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Category Header Title Display */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-sm font-extrabold text-[#FFBF00] tracking-wide uppercase flex items-center">
          <Sparkles className="w-4 h-4 mr-1.5 animate-pulse" />
          {getCategoryTitle(activeCategory)}
        </h2>
        <span className="text-[10px] text-gray-500 font-mono">
          {filteredGames.length}টি গেম
        </span>
      </div>

      {/* 4. Game Card Grid (3 Columns) representing actual gameplay entries */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 sm:gap-3" id="home-games-grid">
          {filteredGames.map((game) => {
            const isFav = favorites.includes(game.id);
            return (
              <div
                key={game.id}
                className="group bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg border border-[#333] flex flex-col justify-between relative transition-all duration-350 hover:border-[#FFBF01] hover:border-[#FFBF00] select-none"
                id={`game-card-${game.id}`}
              >
                {/* 1:1 Aspect ratio wrapper representing standard image size ratios */}
                <div className="aspect-square w-full relative overflow-hidden bg-neutral-950">
                  {/* Game Graphics rendering */}
                  {renderCardGraphics(game.imageType, game.provider, game)}

                  {/* Top-left Provider ribbon badge */}
                  {game.tag && (
                    <div className="absolute top-2 left-2 bg-red-650 bg-red-600 text-white font-extrabold text-[8px] uppercase px-1.5 py-0.5 rounded shadow-lg z-10 whitespace-nowrap">
                      {game.tag}
                    </div>
                  )}

                  {/* Interactive heart overlay button (Favorites) toggled directly */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(game.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isFav ? 'text-red-500 fill-current' : 'text-white'
                      }`}
                    />
                  </button>

                  {/* Play Overlay Hover Effect */}
                  <div 
                    onClick={() => onPlayGame(game)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer z-10"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#FFBF00] text-black flex items-center justify-center shadow-lg shadow-black/80 transform scale-50 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Bottom title with Gold Label/Accent */}
                <div 
                  onClick={() => onPlayGame(game)}
                  className="bg-gradient-to-b from-[#FFF3C2] to-[#FFBF00] p-1.5 text-center cursor-pointer select-none border-t border-yellow-450/10 active:opacity-90 transition-opacity"
                >
                  <p className="text-[10px] sm:text-xs font-black text-black truncate leading-tight uppercase">
                    {game.banglaName}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 bg-[#161617] rounded-2xl border border-gray-800 my-4 text-center">
          <span className="text-4xl mb-2">🎰</span>
          <p className="text-gray-400 font-bold text-sm">কোনো গেম খুঁজে পাওয়া যায়নি</p>
          <p className="text-gray-600 text-xs mt-1">অনুগ্রহ করে সার্চ বা ফিল্টারটি পরিবর্তন করুন</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedProvider('all');
              setShowOnlyFavorites(false);
            }}
            className="mt-3 px-4 py-1.5 bg-[#FFBF00] text-black text-xs font-bold rounded-lg hover:brightness-110"
          >
            ফিল্টার রিসেট করুন
          </button>
        </div>
      )}

      {/* Decorative footer text matching Screenshot branding (Anti-AI-Slop strict literal branding) */}
      <div className="mt-8 text-center text-[10px] text-gray-600 font-medium">
        <p>© 2026 4999bet. All rights reserved.</p>
        <p>দ্বায়িত্বশীলতার সাথে খেলুন • ১৮+</p>
      </div>
    </div>
  );
}
