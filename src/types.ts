export type AppTab = 'home' | 'promotion' | 'invite' | 'deposit' | 'member' | 'admin';

export type GameCategory = 'hot' | 'slots' | 'live' | 'fishing' | 'sports' | 'poker';

export interface GameItem {
  id: string;
  name: string;
  banglaName: string;
  category: GameCategory;
  provider: string; // e.g. JILI, FC, PG, JDB, KINGMAKER
  imageType: 'ace' | 'aviator' | 'showdown' | 'fishing' | 'ocean' | 'fortune' | 'flyx' | 'circus' | 'boxing' | 'garuda' | 'anubis' | 'chicken' | 'crazy' | 'poker' | 'dice' | 'updown' | 'andar';
  tag?: string; // e.g. 'HOT', 'NEW', '25000x', '100000x'
  isFavorite?: boolean;
}

export interface WinnerRow {
  username: string;
  status: string;
  prize: number;
}

export interface PromotionItem {
  id: string;
  title: string;
  badge: string;
  subText: string;
  bulletBonus: string;
  accentText?: string;
  imageTheme: 'registration' | 'download' | 'invite' | 'deposit';
}

export interface AdminLogItem {
  id: string;
  timestamp: string;
  user: string;
  type: 'deposit' | 'withdraw' | 'gameplay' | 'luckywheel' | 'system';
  detail: string;
  amount?: number;
  status: 'completed' | 'pending' | 'rejected';
}
