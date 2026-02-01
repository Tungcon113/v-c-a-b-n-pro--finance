
import React, { useMemo } from 'react';
import { Transaction, Currency, Wallet } from '../types';
import TransactionList from './TransactionList';

interface DashboardProps {
  transactions: Transaction[];
  wallets: Wallet[];
  onAddClick: () => void;
  onAssistantClick: () => void;
  onWalletsClick: () => void;
  onSplitBillClick: () => void;
  onUpdateWallet: (id: string, amount: number) => void;
  profileImage: string;
  currency: Currency;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  transactions, 
  wallets, 
  onAddClick, 
  onAssistantClick, 
  onWalletsClick, 
  onSplitBillClick,
  onUpdateWallet,
  profileImage, 
  currency 
}) => {
  const isUSD = currency === 'USD';
  
  const balance = useMemo(() => {
    let total = wallets.reduce((sum, w) => sum + w.balance, 0);
    if (isUSD) total = total / 25000;
    return total;
  }, [wallets, isUSD]);

  const formatAmount = (val: number) => {
    if (isUSD) return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return `${val.toLocaleString('vi-VN')}₫`;
  };

  const handleWalletEdit = (wallet: Wallet) => {
    const newVal = prompt(`Cập nhật số dư cho [${wallet.name}] (VND):`, wallet.balance.toString());
    if (newVal !== null) {
      const parsed = parseInt(newVal.replace(/\D/g, ''));
      if (!isNaN(parsed)) {
        onUpdateWallet(wallet.id, parsed);
      }
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <header className="flex items-center p-6 pb-2 justify-between sticky top-0 bg-white/90 dark:bg-black/90 backdrop-blur-md z-40">
        <div className="flex size-10 shrink-0 items-center overflow-hidden rounded-full border border-gray-100 dark:border-white/10 shadow-sm">
          <img src={profileImage} className="w-full h-full object-cover" alt="User" />
        </div>
        <div className="flex-1 px-4 text-left">
          <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold">Chào buổi sáng</p>
          <h2 className="text-black dark:text-white text-lg font-extrabold leading-tight">Tổng quan</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={onAssistantClick} className="flex size-10 items-center justify-center rounded-full bg-gray-50 dark:bg-zinc-800 text-black dark:text-white active-scale">
            <span className="material-symbols-outlined text-[22px]">smart_toy</span>
          </button>
          <button onClick={onAddClick} className="flex size-10 items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black active-scale">
            <span className="material-symbols-outlined font-bold text-[20px]">add</span>
          </button>
        </div>
      </header>

      <main className="px-6 py-4 space-y-6">
        {/* Split Bill Entry Point */}
        <div 
          onClick={onSplitBillClick}
          className="group bg-gradient-to-br from-accent to-blue-600 p-5 rounded-[2.5rem] flex items-center justify-between cursor-pointer active-scale overflow-hidden relative shadow-xl shadow-accent/20 transition-all hover:shadow-accent/30"
        >
           <div className="relative z-10">
             <div className="flex items-center gap-2 mb-1">
               <span className="bg-white/20 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white">Tính năng mới</span>
             </div>
             <h3 className="text-white text-lg font-black leading-tight tracking-tight">Chia hóa đơn AI</h3>
             <p className="text-white/70 text-[11px] font-bold mt-1">Quét hóa đơn & chia tiền trong 10 giây</p>
           </div>
           <div className="size-14 bg-white/10 rounded-2xl flex items-center justify-center text-white relative z-10 backdrop-blur-md border border-white/10">
              <span className="material-symbols-outlined text-3xl font-bold">qr_code_scanner</span>
           </div>
           <span className="material-symbols-outlined text-[120px] text-white opacity-5 absolute -right-4 -bottom-4 rotate-12">receipt_long</span>
        </div>

        <div className="relative flex flex-col items-stretch justify-start rounded-[2.5rem] p-7 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 shadow-xl shadow-gray-200/50 dark:shadow-none">
          <div className="flex justify-between items-start mb-1">
            <p className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em]">Tổng số dư</p>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">
              <p className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">+2.5%</p>
            </div>
          </div>
          <h1 className="text-black dark:text-white text-4xl font-black tracking-tighter mb-4">
            {formatAmount(balance)}
          </h1>
          <div className="flex items-center gap-2 mt-2 pt-4 border-t border-gray-50 dark:border-white/5">
            <div className="flex -space-x-2">
              {[1,2,3].map(i => <div key={i} className={`w-6 h-6 rounded-full border-2 border-white dark:border-zinc-900 ${i===1?'bg-emerald-500':i===2?'bg-sky-500':'bg-violet-600'}`}></div>)}
            </div>
            <p className="text-gray-400 text-[11px] font-medium tracking-tight">Quản lý trên {wallets.length} nguồn ví</p>
          </div>
        </div>

        <section>
          <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="text-black dark:text-white text-base font-black tracking-tight">Ví của tôi</h3>
            <button onClick={onWalletsClick} className="text-gray-400 text-[11px] font-bold uppercase tracking-widest hover:text-black dark:hover:text-white transition-colors">Xem tất cả</button>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
            {wallets.map(w => (
              <WalletCard 
                key={w.id}
                icon={w.icon} 
                label={w.name} 
                color={w.color}
                amount={formatAmount(isUSD ? w.balance / 25000 : w.balance)} 
                onClick={() => handleWalletEdit(w)}
              />
            ))}
          </div>
        </section>

        <section className="pb-8">
           <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="text-black dark:text-white text-base font-black tracking-tight">Giao dịch gần đây</h3>
            <button className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">Xem lịch sử</button>
          </div>
          <TransactionList transactions={transactions.slice(0, 8)} />
        </section>
      </main>
    </div>
  );
};

const WalletCard = ({ icon, label, amount, color, onClick }: any) => (
  <div onClick={onClick} className="flex flex-col shrink-0 w-40 p-5 rounded-[2.2rem] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 active-scale cursor-pointer shadow-md transition-all hover:shadow-lg">
    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-5 shadow-lg shadow-inherit opacity-90`}>
      <span className="material-symbols-outlined text-white text-[24px] font-bold">{icon}</span>
    </div>
    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
    <p className="text-black dark:text-white text-[19px] font-black tracking-tighter truncate">{amount}</p>
  </div>
);

export default Dashboard;
