
import { Transaction, Wallet } from './types';

// Add explicit Transaction[] type to ensure correct type inference for 'income' | 'expense'
export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', title: 'Tiền lương tháng 5', amount: 15000000, type: 'income', category: 'Lương', date: '2024-05-01' },
  { id: '2', title: 'Thanh toán tiền điện', amount: 850000, type: 'expense', category: 'Hóa đơn', date: '2024-05-05' },
  { id: '3', title: 'Mua sắm VinMart', amount: 1200000, type: 'expense', category: 'Mua sắm', date: '2024-05-10' },
  { id: '4', title: 'Ăn uống Highlands', amount: 350000, type: 'expense', category: 'Ăn uống', date: '2024-05-12' },
  { id: '5', title: 'Thưởng KPI', amount: 2000000, type: 'income', category: 'Thưởng', date: '2024-05-15' },
];

export const CATEGORIES = [
  'Ăn uống', 'Mua sắm', 'Di chuyển', 'Giải trí', 'Lương', 'Thưởng', 'Hóa đơn', 'Sức khỏe', 'Khác'
];

export const CATEGORY_MAP: Record<string, { icon: string, color: string }> = {
  'Ăn uống': { icon: 'restaurant', color: 'bg-orange-500' },
  'Mua sắm': { icon: 'shopping_bag', color: 'bg-pink-500' },
  'Di chuyển': { icon: 'directions_car', color: 'bg-blue-400' },
  'Giải trí': { icon: 'local_activity', color: 'bg-purple-500' },
  'Lương': { icon: 'payments', color: 'bg-emerald-500' },
  'Thưởng': { icon: 'card_giftcard', color: 'bg-amber-500' },
  'Hóa đơn': { icon: 'receipt_long', color: 'bg-yellow-600' },
  'Sức khỏe': { icon: 'medical_services', color: 'bg-rose-500' },
  'Khác': { icon: 'more_horiz', color: 'bg-gray-500' }
};

// Add explicit Wallet[] type
export const INITIAL_WALLETS: Wallet[] = [
  { id: 'cash', name: 'Tiền mặt', balance: 450000, icon: 'payments', color: 'bg-emerald-500' },
  { id: 'bank', name: 'Ngân hàng', balance: 8200000, icon: 'account_balance', color: 'bg-sky-500' },
  { id: 'credit', name: 'Tín dụng', balance: 3800000, icon: 'credit_card', color: 'bg-violet-600' }
];
