
import React, { useState } from 'react';
import { Transaction, TransactionType } from '../types';
import { CATEGORIES } from '../constants';

interface TransactionFormProps {
  onClose: () => void;
  onSubmit: (tx: Transaction) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState(CATEGORIES[2]); // Default to Food

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0]
    };

    onSubmit(newTx);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Thêm giao dịch</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex p-1 bg-gray-100 dark:bg-slate-800 rounded-2xl">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
                type === 'expense' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary dark:text-white' : 'text-gray-500'
              }`}
            >
              Chi tiêu
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
                type === 'income' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary dark:text-white' : 'text-gray-500'
              }`}
            >
              Thu nhập
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Tên giao dịch</label>
            <input
              autoFocus
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-14 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-5 focus:ring-2 focus:ring-primary dark:text-white"
              placeholder="Vd: Mua cà phê"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Số tiền (VND)</label>
            <input
              required
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-14 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-5 focus:ring-2 focus:ring-primary dark:text-white"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Danh mục</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-14 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-5 focus:ring-2 focus:ring-primary dark:text-white appearance-none"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full h-16 bg-primary dark:bg-white text-white dark:text-primary rounded-2xl font-bold text-lg mt-4 transition-transform active:scale-95"
          >
            Lưu giao dịch
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
