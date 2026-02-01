
import React, { useState, useMemo } from 'react';
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
}

const TransactionVerification: React.FC<TransactionVerificationProps> = ({ onBack, onCancel, onConfirm, wallets }) => {
  // Giả lập danh sách mặt hàng AI vừa quét được
  const [items, setItems] = useState<ReceiptItem[]>([
    { id: '1', name: 'Phở Bò Đặc Biệt', price: 75000 },
    { id: '2', name: 'Cà Phê Muối', price: 45000 },
    { id: '3', name: 'Nước Suối', price: 10000 },
  ]);
  
  const [source, setSource] = useState('Tiệm Ăn Sáng');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState('Ăn uống');
  const [walletId, setWalletId] = useState(wallets[0]?.id || 'cash');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Tính tổng tiền từ danh sách mặt hàng
  const totalAmount = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items]);

  const handleConfirm = () => {
    const newTx: Transaction = {
      id: Date.now().toString(),
      title: source || 'Giao dịch từ hóa đơn',
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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5">
        <button onClick={onBack} className="flex items-center gap-1 text-black dark:text-white active-scale">
          <span className="material-symbols-outlined !text-[20px]">arrow_back_ios</span>
          <span className="text-sm font-bold -ml-1">Quay lại</span>
        </button>
        <h2 className="text-base font-black dark:text-white">Kiểm tra hóa đơn</h2>
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
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            <span className="text-[10px] font-black uppercase tracking-tighter text-emerald-600">AI đã bóc tách</span>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-8 mt-4">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-2xl font-black dark:text-white tracking-tight">Chi tiết món ăn</h3>
            <p className="text-xs text-gray-400 font-medium mt-1">Sếp kiểm tra lại từng món nhé.</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tổng cộng</p>
            <p className="text-2xl font-black text-black dark:text-white tracking-tighter">{totalAmount.toLocaleString('vi-VN')}₫</p>
          </div>
        </div>

        {/* Danh sách mặt hàng */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-transparent hover:border-black/5 dark:hover:border-white/5 transition-all">
              <div className="flex items-center gap-3">
                <button onClick={() => removeItem(item.id)} className="size-6 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center active-scale">
                  <span className="material-symbols-outlined text-sm font-bold">close</span>
                </button>
                <span className="text-sm font-bold dark:text-white">{item.name}</span>
              </div>
              <span className="text-sm font-black text-black dark:text-white">{item.price.toLocaleString('vi-VN')}₫</span>
            </div>
          ))}
          <button className="w-full py-3 border-2 border-dashed border-gray-100 dark:border-white/5 rounded-2xl text-gray-400 text-[10px] font-black uppercase tracking-widest hover:text-black dark:hover:text-white transition-colors">
            + Thêm món khác
          </button>
        </div>

        <div className="h-px bg-gray-50 dark:bg-white/5"></div>

        {/* Thông tin giao dịch */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Loại</label>
              <div className="flex p-1 bg-gray-100 dark:bg-zinc-800 rounded-xl">
                <button onClick={() => setType('expense')} className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${type === 'expense' ? 'bg-white dark:bg-zinc-700 shadow-sm text-black dark:text-white' : 'text-gray-400'}`}>CHI</button>
                <button onClick={() => setType('income')} className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${type === 'income' ? 'bg-white dark:bg-zinc-700 shadow-sm text-black dark:text-white' : 'text-gray-400'}`}>THU</button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Hạng mục</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 bg-gray-50 dark:bg-zinc-900 border-none rounded-xl px-3 text-xs font-bold dark:text-white focus:ring-0"
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Nguồn chi / Thu</label>
            <input 
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full h-12 bg-gray-50 dark:bg-zinc-900 border-none rounded-xl px-4 text-sm font-bold dark:text-white focus:ring-0"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Sử dụng ví</label>
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
      </div>

      {/* Button Xác nhận & Lưu */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent z-50">
        <button 
          onClick={handleConfirm}
          className="w-full h-16 bg-black dark:bg-white text-white dark:text-black rounded-[2rem] font-black text-lg shadow-2xl active-scale transition-all flex items-center justify-center gap-3"
        >
          Xác nhận & Trừ ví
          <span className="material-symbols-outlined">send_money</span>
        </button>
      </div>
    </div>
  );
};

export default TransactionVerification;
