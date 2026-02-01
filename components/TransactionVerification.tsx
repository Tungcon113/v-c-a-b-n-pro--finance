
import React, { useState } from 'react';
import { Transaction, Wallet } from '../types';
import { CATEGORIES } from '../constants';

interface TransactionVerificationProps {
  onBack: () => void;
  onCancel: () => void;
  onConfirm: (tx: Transaction) => void;
  wallets: Wallet[];
}

const TransactionVerification: React.FC<TransactionVerificationProps> = ({ onBack, onCancel, onConfirm, wallets }) => {
  // Dữ liệu mặc định 15.000.000đ như sếp yêu cầu
  const [amount, setAmount] = useState('15.000.000');
  const [source, setSource] = useState('Công ty ABC');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('Lương');
  const [walletId, setWalletId] = useState(wallets[1]?.id || 'bank');

  const handleConfirm = () => {
    const numericAmount = parseInt(amount.replace(/\./g, ''));
    const newTx: Transaction = {
      id: Date.now().toString(),
      title: source || 'Giao dịch từ hóa đơn',
      amount: numericAmount,
      type: category === 'Lương' || category === 'Thưởng' ? 'income' : 'expense',
      category: category,
      date: date,
      walletId: walletId
    };
    onConfirm(newTx);
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-zinc-950 animate-in slide-in-from-bottom duration-500 overflow-y-auto hide-scrollbar pb-32">
      {/* Header chuẩn mẫu sếp gửi */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5">
        <button onClick={onBack} className="flex items-center gap-1 text-black dark:text-white active-scale">
          <span className="material-symbols-outlined !text-[20px]">arrow_back_ios</span>
          <span className="text-sm font-bold -ml-1">Quay lại</span>
        </button>
        <h2 className="text-base font-black dark:text-white">Kiểm tra thông tin</h2>
        <button onClick={onCancel} className="text-gray-400 text-sm font-bold active-scale">Hủy</button>
      </header>

      {/* Ảnh hóa đơn mockup */}
      <div className="p-4">
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-inner bg-gray-100 dark:bg-zinc-900">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvh_nh7JOUZJs7_3SDUqX4fZ3W7w9CZniv3giaSx9FjxJrnsGs0tfjyzTapWQl56v5il7INEE9QPWJz9RH4GzW14eFnW_xHFGslZme5lRidgFgfqdBKfPjxFlsN9t6ICPT77SA9ylWJ6rKxQvV58PPfGjSXsMr0Kv3LjmtNbX8RsV-z7CRdXZuQo1dubCaRiBlq8cQ9RWaMI00tvq3-tim37Plg-LWuWNEEa_JF2ReOiRTI_fMFlvteJ8J4PigQ6m60E-CwsjPjIVw" 
            className="w-full h-full object-cover"
            alt="Receipt"
          />
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg border border-black/5">
            <span className="material-symbols-outlined text-[18px]">zoom_in</span>
            <span className="text-[10px] font-black uppercase tracking-tighter">Chạm để phóng to</span>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-8 mt-4">
        <div>
          <h3 className="text-2xl font-black dark:text-white tracking-tight">Chi tiết giao dịch</h3>
          <p className="text-xs text-gray-400 font-medium mt-1">Vui lòng xác minh lại thông tin thu nhập của bạn.</p>
        </div>

        {/* Số tiền 15tr */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
             <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Số tiền</label>
             <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-500/20">
                <span className="material-symbols-outlined text-[14px] text-emerald-500 fill-1">auto_awesome</span>
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Trích xuất tự động</span>
             </div>
          </div>
          <div className="flex items-center bg-gray-50 dark:bg-zinc-900 rounded-2xl p-4 border border-transparent focus-within:border-black dark:focus-within:border-white transition-all">
             <span className="text-3xl font-black text-black dark:text-white mr-2 opacity-30">₫</span>
             <input 
               value={amount}
               onChange={(e) => setAmount(e.target.value)}
               className="flex-1 bg-transparent border-none p-0 text-3xl font-black text-black dark:text-white focus:ring-0"
             />
             <span className="material-symbols-outlined text-gray-300">edit</span>
          </div>
        </div>

        {/* Nguồn thu */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nguồn thu / Nội dung</label>
          <div className="flex items-center bg-gray-50 dark:bg-zinc-900 rounded-2xl p-4 border border-transparent focus-within:border-black dark:focus-within:border-white transition-all">
             <input 
               value={source}
               onChange={(e) => setSource(e.target.value)}
               className="flex-1 bg-transparent border-none p-0 text-base font-bold text-black dark:text-white focus:ring-0"
             />
             <span className="material-symbols-outlined text-gray-300">corporate_fare</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ngày</label>
            <div className="flex items-center bg-gray-50 dark:bg-zinc-900 rounded-2xl p-4 border border-transparent">
              <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-1 bg-transparent border-none p-0 text-sm font-bold text-black dark:text-white focus:ring-0"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Hạng mục</label>
            <div className="flex items-center bg-gray-50 dark:bg-zinc-900 rounded-2xl p-4 border border-transparent">
               <select 
                 value={category}
                 onChange={(e) => setCategory(e.target.value)}
                 className="flex-1 bg-transparent border-none p-0 text-sm font-bold text-black dark:text-white focus:ring-0 appearance-none"
               >
                 {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
               </select>
               <span className="material-symbols-outlined text-gray-300 text-sm">expand_more</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nạp vào ví</label>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
            {wallets.map(w => (
              <button 
                key={w.id} 
                onClick={() => setWalletId(w.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all shrink-0 ${walletId === w.id ? 'bg-black dark:bg-white text-white dark:text-black border-transparent shadow-lg' : 'bg-gray-50 dark:bg-zinc-900 text-gray-400 border-transparent'}`}
              >
                <span className="material-symbols-outlined text-lg">{w.icon}</span>
                <span className="text-[11px] font-black whitespace-nowrap">{w.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent z-50">
        <button 
          onClick={handleConfirm}
          className="w-full h-16 bg-black dark:bg-white text-white dark:text-black rounded-[2rem] font-black text-lg shadow-2xl active-scale transition-all flex items-center justify-center gap-3"
        >
          Xác nhận & Lưu
          <span className="material-symbols-outlined">check_circle</span>
        </button>
      </div>
    </div>
  );
};

export default TransactionVerification;
