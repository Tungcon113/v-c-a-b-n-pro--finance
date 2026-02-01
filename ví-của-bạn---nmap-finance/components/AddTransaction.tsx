
import React, { useState } from 'react';
import { Transaction, TransactionType, Wallet } from '../types';
import { CATEGORIES, CATEGORY_MAP } from '../constants';

interface AddTransactionProps {
  onClose: () => void;
  onSubmit: (tx: Transaction) => void;
  onScanClick: () => void;
  wallets: Wallet[];
}

const AddTransaction: React.FC<AddTransactionProps> = ({ onClose, onSubmit, onScanClick, wallets }) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('0');
  const [category, setCategory] = useState('Ăn uống');
  const [note, setNote] = useState('');
  const [selectedWalletId, setSelectedWalletId] = useState(wallets[0]?.id || 'cash');

  const handleKeyPress = (num: string) => {
    setAmount(prev => {
      if (prev === '0') return num;
      if (prev.length > 9) return prev;
      return prev + num;
    });
  };

  const handleBackspace = () => {
    setAmount(prev => {
      if (prev.length <= 1) return '0';
      return prev.slice(0, -1);
    });
  };

  const handleSubmit = () => {
    if (amount === '0') return;
    const newTx: Transaction = {
      id: Date.now().toString(),
      title: note || category,
      amount: parseInt(amount),
      type,
      category,
      date: new Date().toLocaleDateString('vi-VN'),
      walletId: selectedWalletId
    };
    onSubmit(newTx);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-white dark:bg-black overflow-hidden relative z-[100] animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center p-4 pb-2 justify-between shrink-0">
        <button onClick={onClose} className="p-2 active-scale"><span className="material-symbols-outlined text-2xl font-bold">close</span></button>
        <h2 className="text-lg font-black tracking-tight dark:text-white">Thêm giao dịch</h2>
        <button onClick={onScanClick} className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-full active-scale mr-2"><span className="material-symbols-outlined">qr_code_scanner</span></button>
      </div>

      <div className="px-6 py-2 shrink-0">
        <div className="flex p-1 bg-gray-100 dark:bg-zinc-800 rounded-2xl">
          <button onClick={() => setType('expense')} className={`flex-1 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all ${type === 'expense' ? 'bg-white dark:bg-zinc-700 shadow-sm text-black dark:text-white' : 'text-gray-400'}`}>Chi phí</button>
          <button onClick={() => setType('income')} className={`flex-1 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all ${type === 'income' ? 'bg-white dark:bg-zinc-700 shadow-sm text-black dark:text-white' : 'text-gray-400'}`}>Thu nhập</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-6">
        <div className="pt-6 pb-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">Số tiền ghi chép</p>
          <div className="flex items-center justify-center gap-1">
            <h1 className={`tracking-tighter text-[56px] font-black leading-none ${type === 'income' ? 'text-emerald-500' : 'text-black dark:text-white'}`}>
              {parseInt(amount).toLocaleString('vi-VN')}
            </h1>
            <span className="text-3xl font-black dark:text-white ml-2 opacity-30">₫</span>
          </div>
        </div>

        {/* Wallet Selection */}
        <div className="mb-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-1">Chọn nguồn tiền</p>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar py-1">
            {wallets.map(w => (
              <button 
                key={w.id} 
                onClick={() => setSelectedWalletId(w.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl border-2 transition-all shrink-0 ${selectedWalletId === w.id ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black' : 'border-gray-100 dark:border-white/5 text-gray-400'}`}
              >
                <span className="material-symbols-outlined text-lg">{w.icon}</span>
                <span className="text-xs font-bold whitespace-nowrap">{w.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-1">Danh mục</p>
          <div className="grid grid-cols-3 gap-x-4 gap-y-6 pb-12">
            {CATEGORIES.map(cat => {
              const info = CATEGORY_MAP[cat];
              const isSelected = category === cat;
              return (
                <button key={cat} onClick={() => setCategory(cat)} className="flex flex-col items-center justify-center active-scale group">
                  <div className={`size-14 rounded-2xl flex items-center justify-center mb-2 transition-all duration-300 shadow-sm ${isSelected ? `${info.color} text-white scale-110 shadow-lg shadow-inherit/30` : 'bg-gray-50 dark:bg-zinc-900 text-gray-400'}`}>
                    <span className="material-symbols-outlined text-[24px] font-bold">{info.icon}</span>
                  </div>
                  <span className={`text-[10px] font-black tracking-tight ${isSelected ? 'text-black dark:text-white' : 'text-gray-400'}`}>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-6 pt-2">
        <button onClick={handleSubmit} className="w-full h-16 bg-black dark:bg-white text-white dark:text-black py-4 rounded-[2rem] font-black text-lg shadow-xl active-scale transition-all">Lưu giao dịch</button>
      </div>

      <div className="bg-gray-50 dark:bg-zinc-900 grid grid-cols-3 gap-px border-t border-gray-100 dark:border-white/5">
        {['1','2','3','4','5','6','7','8','9','000','0'].map(num => (
          <button key={num} onClick={() => handleKeyPress(num)} className="h-14 bg-white dark:bg-zinc-900 text-xl font-black active:bg-gray-100 dark:active:bg-zinc-800 transition-colors dark:text-white">{num}</button>
        ))}
        <button onClick={handleBackspace} className="h-14 bg-white dark:bg-zinc-900 flex items-center justify-center active:bg-gray-100 dark:active:bg-zinc-800 transition-colors"><span className="material-symbols-outlined text-gray-400 text-xl font-bold">backspace</span></button>
      </div>
    </div>
  );
};

export default AddTransaction;
