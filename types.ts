
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  walletId?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  widget?: 'saving_goal' | 'none';
}

export interface UserProfile {
  fullName: string;
  dob: string;
  cccd: string;
  address: string;
  email: string;
  password?: string;
  wallets?: Wallet[];
  transactions?: Transaction[];
  monthlyLimit?: number;
}

export interface Wallet {
  id: string;
  name: string;
  balance: number;
  icon: string;
  color: string;
}

export type Language = 'vi' | 'en';
export type Currency = 'VND' | 'USD';

export type AppTab = 'overview' | 'analysis' | 'assistant' | 'budget' | 'settings' | 'scanner' | 'split_bill' | 'edit_profile' | 'preview_profile' | 'personal_info' | 'change_password' | 'language' | 'currency' | 'wallets' | 'widget_config' | 'app_icon' | 'download_app';
export type AuthStep = 'welcome' | 'login' | 'register' | 'otp' | 'success';
