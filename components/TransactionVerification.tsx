
import React, { useState, useMemo, useEffect } from 'react';
import { Transaction, Wallet, TransactionType } from '../types';
import { CATEGORIES } from '../constants';

interface ReceiptItem {
  id: string;
  name: string;
  price: number;
}

interface TransactionVerificationProps {
  onBack: () => void;
  onCancel: () => void;
  onConfirm: (tx: Transaction) => void;
  wallets: Wallet[];
  initialData?: any;
}

const TransactionVerification: React.FC<TransactionVerificationProps> = ({ 
  onBack, 
  onCancel, 
  onConfirm, 
  wallets,
  initialData 
}) => {
  const [items, setItems] = useState<ReceiptItem[]>([]);
  const [source, setSource] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState('Ăn uống');
  const [walletId, setWalletId] = useState(wallets[0]?.id || 'cash');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (initialData) {
      setSource(initialData.storeName || 'Hóa đơn mới');
      setItems((initialData.items || []).map((it: any, idx: number) => ({
        id: idx.toString(),
        name: it.name,
        price: it.price
      })));
      setCategory(initialData.suggestedCategory || 'Ăn uống');
      if (initialData.date) setDate(initialData.date);
    }
  }, [initialData]);

  const totalAmount = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items]);

  const handleConfirm = () => {
    if (items.length === 0 && totalAmount === 0) {
      alert("Dạ sếp ơi, hóa đơn đang trống ạ!");
      return;
    }
    const newTx: Transaction = {
      id: Date.now().toString(),
      title: source || 'Giao dịch AI',
      amount: totalAmount,
      type: type,
      category: category,
      date: date,
      walletId: walletId
    };
    onConfirm(newTx);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-zinc-950 animate-in slide-in-from-bottom duration-500 overflow-y-auto hide-scrollbar pb-32">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5">
        <button onClick={onBack} className="flex items-center gap-1 text-black dark:text-white active-scale">
          <span className="material-symbols-outlined !text-[20px]">arrow_back_ios</span>
          <span className="text-sm font-bold -ml-1">Chụp lại</span>
        </button>
        <h2 className="text-base font-black dark:text-white">Xác nhận hóa đơn</h2>
        <button onClick={onCancel} className="text-gray-400 text-sm font-bold active-scale">Đóng</button>
      </header>

      <div className="px-6 py-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest mb-2 inline-block">Báo cáo sếp: Đã quét xong!</span>
            <h3 className="text-3xl font-black dark:text-white tracking-tighter">{source}</h3>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tổng tiền</p>
            <p className="text-3xl font-black text-black dark:text-white tracking-tighter">{totalAmount.toLocaleString('vi-VN')}₫</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Chi tiết món hàng</p>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 group">
                <div className="flex items-center gap-3">
                  <button onClick={() => removeItem(item.id)} className="size-6 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-sm font-bold">close</span>
                  </button>
                  <span className="text-sm font-bold dark:text-white">{item.name}</span>
                </div>
                <span className="text-sm font-black text-black dark:text-white">{item.price.toLocaleString('vi-VN')}₫</span>
              </div>
            ))}
            {items.length === 0 && (
              <div className="py-10 text-center border-2 border-dashed border-gray-100 dark:border-white/5 rounded-3xl">
                <p className="text-xs text-gray-400 font-bold italic">Không tìm thấy món nào...</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Loại tiền</label>
              <div className="flex p-1 bg-gray-100 dark:bg-zinc-800 rounded-xl">
                <button onClick={() => setType('expense')} className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${type === 'expense' ? 'bg-white dark:bg-zinc-700 shadow-sm text-black dark:text-white' : 'text-gray-400'}`}>CHI</button>
                <button onClick={() => setType('income')} className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${type === 'income' ? 'bg-white dark:bg-zinc-700 shadow-sm text-black dark:text-white' : 'text-gray-400'}`}>THU</button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Danh mục AI gợi ý</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-11 bg-gray-50 dark:bg-zinc-900 border-none rounded-xl px-3 text-xs font-bold dark:text-white focus:ring-1 focus:ring-emerald-500"
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Nguồn tiền từ ví</label>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
              {wallets.map(w => (
                <button 
                  key={w.id} 
                  onClick={() => setWalletId(w.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all shrink-0 ${walletId === w.id ? 'bg-black dark:bg-white text-white dark:text-black border-transparent shadow-lg scale-105' : 'bg-gray-50 dark:bg-zinc-900 text-gray-400 border-transparent'}`}
                >
                  <span className="material-symbols-outlined text-lg">{w.icon}</span>
                  <span className="text-[11px] font-black whitespace-nowrap">{w.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white/90 dark:bg-black/90 backdrop-blur-md z-50">
        <button 
          onClick={handleConfirm}
          className="w-full h-16 bg-black dark:bg-white text-white dark:text-black rounded-[2rem] font-black text-lg shadow-2xl active-scale flex items-center justify-center gap-3 transition-all hover:gap-5"
        >
          Xác nhận chi tiêu
          <span className="material-symbols-outlined">check_circle</span>
        </button>
      </div>
    </div>
  );
};

export default TransactionVerification;
