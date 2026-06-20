import { GameItem, WinnerRow, PromotionItem } from './types';

export const PROVIDERS = [
  { id: 'all', name: 'সব' },
  { id: 'jili', name: 'JILI' },
  { id: 'fc', name: 'FC' },
  { id: 'pg', name: 'PG' },
  { id: 'jdb', name: 'JDB' },
  { id: 'spribe', name: 'SPRIBE' },
  { id: 'kingmaker', name: 'KINGMAKER' },
  { id: 'kingmidas', name: 'KINGMIDAS' }
];

export const GAMES_DATA: GameItem[] = [
  // HOT CATEGORY
  {
    id: 'super-ace-hot',
    name: 'Super Ace',
    banglaName: 'সুপার এস',
    category: 'hot',
    provider: 'JILI',
    imageType: 'ace',
    tag: 'JILI',
    isFavorite: true
  },
  {
    id: 'aviator-hot',
    name: 'Aviator',
    banglaName: 'এভিয়েটর',
    category: 'hot',
    provider: 'SPRIBE',
    imageType: 'aviator',
    tag: 'HOT'
  },
  {
    id: 'wild-bounty-showdown-hot',
    name: 'Wild Bounty Showdown',
    banglaName: 'বন্য বাউন্টি শ...',
    category: 'hot',
    provider: 'PG',
    imageType: 'showdown',
    tag: 'PG'
  },
  {
    id: 'flyx-hot',
    name: 'FlyX',
    banglaName: 'ফ্লাইএক্স',
    category: 'hot',
    provider: 'SPRIBE',
    imageType: 'flyx',
    tag: 'NEW'
  },
  {
    id: 'super-elements-hot',
    name: 'Super Elements',
    banglaName: 'সুপার এলিমেন্টস',
    category: 'hot',
    provider: 'FC',
    imageType: 'garuda',
    tag: 'FC'
  },
  {
    id: 'fortune-gems3-hot',
    name: 'Fortune Gems 3',
    banglaName: 'ফরচুন জেমস ৩',
    category: 'hot',
    provider: 'JILI',
    imageType: 'fortune',
    tag: 'JILI'
  },
  {
    id: 'magic-ace-hot',
    name: 'Magic Ace',
    banglaName: 'ম্যাজিক এস W...',
    category: 'hot',
    provider: 'JDB',
    imageType: 'ace',
    tag: '25000x'
  },
  {
    id: 'circus-joker-hot',
    name: 'Circus Joker',
    banglaName: 'সার্কাস জোকার...',
    category: 'hot',
    provider: 'PG',
    imageType: 'circus',
    tag: 'PG'
  },
  {
    id: 'boxing-king-hot',
    name: 'Boxing King',
    banglaName: 'বক্সিং কিং',
    category: 'hot',
    provider: 'JILI',
    imageType: 'boxing',
    tag: 'HOT'
  },
  {
    id: 'fortune-garuda-hot',
    name: 'Fortune Garuda',
    banglaName: 'গরুড় যোদ্ধা 50...',
    category: 'hot',
    provider: 'JILI',
    imageType: 'garuda',
    tag: '500x'
  },
  {
    id: 'anubis-hot',
    name: 'Anubis',
    banglaName: 'আনুবিস',
    category: 'hot',
    provider: 'FC',
    imageType: 'anubis',
    tag: 'FC'
  },

  // SLOTS
  {
    id: 'super-ace-slot',
    name: 'Super Ace',
    banglaName: 'সুপার এস',
    category: 'slots',
    provider: 'JILI',
    imageType: 'ace',
    tag: 'JILI'
  },
  {
    id: 'wild-bounty-showdown',
    name: 'Wild Bounty Showdown',
    banglaName: 'বন্য বাউন্টি শ...',
    category: 'slots',
    provider: 'PG',
    imageType: 'showdown',
    tag: 'POPULAR'
  },
  {
    id: 'fortune-gems3-slot',
    name: 'Fortune Gems 3',
    banglaName: 'ফরচুন জেমস ৩',
    category: 'slots',
    provider: 'JILI',
    imageType: 'fortune',
    tag: 'JILI'
  },
  {
    id: 'magic-ace-slot',
    name: 'Magic Ace',
    banglaName: 'ম্যাজিক এস',
    category: 'slots',
    provider: 'JDB',
    imageType: 'ace',
    tag: 'JDB'
  },
  {
    id: 'boxing-king-slot',
    name: 'Boxing King',
    banglaName: 'বক্সিং কিং',
    category: 'slots',
    provider: 'JILI',
    imageType: 'boxing',
    tag: 'HOT'
  },
  {
    id: 'chicken-dash',
    name: 'Chicken Dash',
    banglaName: 'মুরগির দৌড়',
    category: 'slots',
    provider: 'JILI',
    imageType: 'chicken',
    tag: 'JILI'
  },
  {
    id: 'crazy-time-slot',
    name: 'Crazy Time',
    banglaName: 'ক্রেজি টাইম',
    category: 'slots',
    provider: 'EVOLUTION',
    imageType: 'crazy',
    tag: 'LIVE'
  },
  {
    id: 'anubis-slot',
    name: 'Anubis Legend',
    banglaName: 'আজটেক স্বর্ণ',
    category: 'slots',
    provider: 'FC',
    imageType: 'anubis',
    tag: '100000x'
  },

  // LIVE
  {
    id: 'mighty-mania',
    name: 'Mighty Mania',
    banglaName: 'ফিটনেস উন্মাদনা',
    category: 'live',
    provider: 'EVOLUTION',
    imageType: 'circus',
    tag: 'LIVE'
  },
  {
    id: 'crazy-time-live',
    name: 'Crazy Time Live',
    banglaName: 'ক্রেজি টাইম',
    category: 'live',
    provider: 'EVOLUTION',
    imageType: 'crazy',
    tag: 'POPULAR'
  },
  {
    id: 'sicbo-live',
    name: 'Live Sic Bo',
    banglaName: 'লাইভ সিক বো',
    category: 'live',
    provider: 'PP',
    imageType: 'dice',
    tag: 'NEW'
  },

  // FISHING
  {
    id: 'happy-fishing',
    name: 'Happy Fishing',
    banglaName: 'হ্যাপি ফিশিং',
    category: 'fishing',
    provider: 'JILI',
    imageType: 'fishing',
    tag: 'JILI',
    isFavorite: true
  },
  {
    id: 'ocean-king',
    name: 'Ocean King Jackpot',
    banglaName: 'ওশান কিং জ্যাকপ...',
    category: 'fishing',
    provider: 'JILI',
    imageType: 'ocean',
    tag: 'JILI'
  },
  {
    id: 'fortune-king-jackpot',
    name: 'Fortune King Jackpot',
    banglaName: 'ফরচুন কিং জ্যাক...',
    category: 'fishing',
    provider: 'JILI',
    imageType: 'fortune',
    tag: 'JILI'
  },
  {
    id: 'jackpot-fishing-2',
    name: 'Jackpot Fishing 2',
    banglaName: 'দ্রুত জ্যাকপট ...',
    category: 'fishing',
    provider: 'JILI',
    imageType: 'fishing',
    tag: 'HOT'
  },
  {
    id: 'mega-fishing',
    name: 'Mega Fishing',
    banglaName: 'মেগা ফিশিং',
    category: 'fishing',
    provider: 'JILI',
    imageType: 'ocean',
    tag: 'JILI'
  },
  {
    id: 'circus-jackpot-fish',
    name: 'Circus Jackpot',
    banglaName: 'সার্কাস জ্যাকপট',
    category: 'fishing',
    provider: 'FC',
    imageType: 'circus',
    tag: 'FC'
  },
  {
    id: 'gods-grant-fortune',
    name: 'Gods Grant Fortune',
    banglaName: 'গডস গ্র্যান্ট ফর...',
    category: 'fishing',
    provider: 'FC',
    imageType: 'garuda',
    tag: 'FC'
  },
  {
    id: 'dinosaur-tycoon',
    name: 'Dinosaur Tycoon',
    banglaName: 'ডাইনোসর تای...',
    category: 'fishing',
    provider: 'JILI',
    imageType: 'anubis',
    tag: 'JILI'
  },
  {
    id: 'bombing-fishing',
    name: 'Bombing Fishing',
    banglaName: 'বোম্বিং ফিশিং',
    category: 'fishing',
    provider: 'JILI',
    imageType: 'fishing',
    tag: 'JILI'
  },
  {
    id: 'dragon-fishing',
    name: 'Dragon Fishing',
    banglaName: 'ড্রাগন ফিশিং',
    category: 'fishing',
    provider: 'JDB',
    imageType: 'ocean',
    tag: 'JDB'
  },

  // SPORTS
  {
    id: 'cricket-rush',
    name: 'Cricket Star Pro',
    banglaName: 'ক্রিকেট স্টার প্রো',
    category: 'sports',
    provider: 'SABA',
    imageType: 'chicken',
    tag: 'LIVE'
  },
  {
    id: 'football-fever',
    name: 'Football World Cup',
    banglaName: 'ফুটবল বিশ্বকাপ',
    category: 'sports',
    provider: 'SABA',
    imageType: 'anubis',
    tag: 'HOT'
  },

  // POKER
  {
    id: '7up-7down',
    name: '7 Up 7 Down',
    banglaName: '7 Up 7 Down',
    category: 'poker',
    provider: 'KINGMAKER',
    imageType: 'updown',
    tag: 'KM'
  },
  {
    id: 'dice-duet',
    name: 'Dice Duet',
    banglaName: 'ডাইস ডুয়েট',
    category: 'poker',
    provider: 'KINGMIDAS',
    imageType: 'dice',
    tag: 'Midas'
  },
  {
    id: 'poker-roulette',
    name: 'Poker Roulette',
    banglaName: 'Poker Roulette',
    category: 'poker',
    provider: 'KINGMAKER',
    imageType: 'poker',
    tag: 'KM'
  },
  {
    id: 'sic-bo-poker',
    name: 'Sic Bo',
    banglaName: 'Sic Bo',
    category: 'poker',
    provider: 'KINGMAKER',
    imageType: 'dice',
    tag: 'KM'
  },
  {
    id: 'tai-xiu',
    name: 'Tai Xiu',
    banglaName: 'Tai Xiu',
    category: 'poker',
    provider: 'KINGMAKER',
    imageType: 'updown',
    tag: 'KM'
  },
  {
    id: '7up-7down-deluxe',
    name: '7 Up 7 Down Deluxe',
    banglaName: '৭ আপ ৭ ডাউন...',
    category: 'poker',
    provider: 'KINGMAKER',
    imageType: 'updown',
    tag: 'KM'
  },
  {
    id: 'andar-bahar',
    name: 'Andar Bahar',
    banglaName: 'Andar Bahar',
    category: 'poker',
    provider: 'KINGMAKER',
    imageType: 'andar',
    tag: 'KM'
  },
  {
    id: '32-cards',
    name: '32 Cards',
    banglaName: '32 Cards',
    category: 'poker',
    provider: 'KINGMAKER',
    imageType: 'poker',
    tag: 'KM'
  },
  {
    id: 'triple-chance',
    name: 'Triple Chance',
    banglaName: 'Triple Chance',
    category: 'poker',
    provider: 'KINGMAKER',
    imageType: 'poker',
    tag: 'KM'
  },
  {
    id: 'thai-fish-prawn-crab',
    name: 'Thai Fish Prawn Crab',
    banglaName: 'Thai Fish Pra...',
    category: 'poker',
    provider: 'KINGMAKER',
    imageType: 'dice',
    tag: 'KM'
  },
  {
    id: 'andar-bahar-fast',
    name: 'Fast Andar Bahar',
    banglaName: 'দ্রুত অ্যান্ডার বা...',
    category: 'poker',
    provider: 'KINGMIDAS',
    imageType: 'andar',
    tag: 'Midas'
  },
  {
    id: 'burmese-animal-chess',
    name: 'Burmese Animal Chess',
    banglaName: 'বার্মিজ গুটি প্রাণী',
    category: 'poker',
    provider: 'KINGMAKER',
    imageType: 'circus',
    tag: 'KM'
  }
];

export const MOCK_WINNERS: WinnerRow[] = [
  { username: 'vi*****2', status: 'গৃহীত', prize: 288.00 },
  { username: 'md*******9', status: 'গৃহীত', prize: 218.00 },
  { username: 'mr***6', status: 'গৃহীত', prize: 218.00 },
  { username: '01*********8', status: 'গৃহীত', prize: 218.00 },
  { username: 'sh*****3', status: 'গৃহীত', prize: 500.00 },
  { username: 'ab****1', status: 'গৃহীত', prize: 1500.00 },
  { username: 'ra*****k', status: 'গৃহীত', prize: 350.00 },
  { username: 'ta******7', status: 'গৃহীত', prize: 218.00 },
  { username: 'as*****2', status: 'গৃহীত', prize: 288.00 }
];

export const PROMOTIONS_DATA: PromotionItem[] = [
  {
    id: 'promo-reg',
    title: '4999bet নিবন্ধন',
    badge: 'ফ্রি ৳ ৫,৮৮৮ পান',
    subText: 'সর্বাধিক তোলার পরিমাণ',
    bulletBonus: '৳ ৩০০',
    accentText: 'নতুন সদস্যদের জন্য উপহার',
    imageTheme: 'registration'
  },
  {
    id: 'promo-download',
    title: 'অ্যাপ ডাউনলোড বোনাস',
    badge: 'বোনাস পান ৳ ৫৮',
    subText: 'অ্যাপ ডাউনলোড করে সরাসরি সাইন ইন করুন',
    bulletBonus: '৳ ৫৮',
    accentText: 'মোবাইল গেমিং আরও সহজ',
    imageTheme: 'download'
  },
  {
    id: 'promo-invite',
    title: 'বন্ধুর আমন্ত্রণ',
    badge: '৳ ১৮,৮৮৮,৮৮৮ পুরস্কার পান',
    subText: 'শেয়ার করুন এবং ৪ টি প্রধান সুবিধা পান',
    bulletBonus: '৳ ২৮৮ প্রতি রেফার',
    accentText: '০.৪৪% ডিপোজিট সুবিধা ও ০.৬৩% অতিরিক্ত অফার',
    imageTheme: 'invite'
  },
  {
    id: 'promo-members',
    title: 'নতুন সদস্যরা',
    badge: 'প্রথম জমা বোনাস ১০০%',
    subText: 'আপনার প্রথম ডিপোজিটে দ্বিগুণ বোনাস নিন',
    bulletBonus: '৳ ৫,০০০ পর্যন্ত',
    accentText: 'আজই বুক করুন',
    imageTheme: 'deposit'
  }
];
