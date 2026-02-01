
import React from 'react';
import { Wallet, Currency } from '../types';

interface WalletsListProps {
  wallets: Wallet[];
  onBack: () => void;
  onUpdateWallet: (id: string, amount: number) => void;
  currency: Currency;
}

const WalletsList: React.FC<WalletsListProps> = ({ wallets, onBack, onUpdateWallet, currency }) => {
  const isUSD = currency === 'USD';

  const handleEdit = (w: Wallet) => {
    const val = prompt(`Nhập số dư mới cho ${w.name}:`, w.balance.toString());
    if (val !== null && !isNaN(parseInt(val))) {
      onUpdateWallet(w.id, parseInt(val));
    }
  };

  const formatAmount = (val: number) => {
    const amount = isUSD ? val / 25000 : val;
    if (isUSD) return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    return `${amount.toLocaleString('vi-VN')}₫`;
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black animate-in slide-in-from-right duration-300">
      <header className="p-4 flex items-center sticky top-0 bg-white/90 dark:bg-black/90 backdrop-blur-md z-10 border-b border-gray-50 dark:border-white/5">
        <button onClick={onBack} className="p-2 active-scale"><span className="material-symbols-outlined">arrow_back_ios_new</span></button>
        <h2 className="flex-1 text-center font-bold text-lg dark:text-white pr-8">Ví của tôi</h2>
      </header>

      <main className="p-6 space-y-4">
        {wallets.map(w => (
          <div 
            key={w.id} 
            onClick={() => handleEdit(w)}
            className="flex items-center justify-between p-5 rounded-[2rem] bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-white/5 active-scale cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className={`size-12 rounded-2xl ${w.color} text-white flex items-center justify-center shadow-lg`}>
                <span className="material-symbols-outlined text-2xl">{w.icon}</span>
              </div>
              <div>
                <p className="text-sm font-extrabold dark:text-white">{w.name}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Ví đang hoạt động</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-black dark:text-white">{formatAmount(w.balance)}</p>
              <p className="text-[9px] text-emerald-500 font-bold uppercase">Khả dụng</p>
            </div>
          </div>
        ))}

        <button className="w-full py-5 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-[2rem] text-gray-400 font-bold text-sm flex items-center justify-center gap-2 active-scale">
          <span className="material-symbols-outlined">add_circle</span>
          Thêm ví mới
        </button>
      </main>
    </div>
  );
};

export default WalletsList;
