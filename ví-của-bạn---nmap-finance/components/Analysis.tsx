
import React, { useState, useMemo } from 'react';
import { Transaction } from '../types';

interface AnalysisProps {
  transactions: Transaction[];
}

const Analysis: React.FC<AnalysisProps> = ({ transactions }) => {
  const [type, setType] = useState<'expense' | 'income'>('expense');

  const filteredData = useMemo(() => {
    const relevant = transactions.filter(t => t.type === type);
    const groups: { [key: string]: number } = {};
    let total = 0;
    relevant.forEach(t => {
      groups[t.category] = (groups[t.category] || 0) + t.amount;
      total += t.amount;
    });
    return Object.entries(groups).map(([cat, amount]) => ({
      cat,
      amount,
      percent: Math.round((amount / total) * 100)
    })).sort((a, b) => b.amount - a.amount);
  }, [transactions, type]);

  const totalAmount = filteredData.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="animate-in fade-in duration-500 p-6 space-y-6">
      <header className="text-center mb-8">
        <h2 className="text-lg font-extrabold tracking-tight dark:text-white">Phân tích tài chính</h2>
      </header>

      <div className="flex h-11 w-full items-center justify-center rounded-xl bg-gray-100 dark:bg-zinc-800 p-1">
        <button 
          onClick={() => setType('expense')}
          className={`flex-1 h-full rounded-lg text-sm font-bold transition-all ${type === 'expense' ? 'bg-white dark:bg-zinc-700 shadow-sm text-black dark:text-white' : 'text-gray-400'}`}
        >
          Chi phí
        </button>
        <button 
          onClick={() => setType('income')}
          className={`flex-1 h-full rounded-lg text-sm font-bold transition-all ${type === 'income' ? 'bg-white dark:bg-zinc-700 shadow-sm text-black dark:text-white' : 'text-gray-400'}`}
        >
          Thu nhập
        </button>
      </div>

      <div className="relative flex flex-col items-center justify-center py-8">
        <div className="relative size-60 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="10" className="text-gray-100 dark:text-zinc-800" />
            <circle 
              cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="10" 
              className="text-black dark:text-white"
              strokeDasharray="251.2" 
              strokeDashoffset={251.2 * (1 - 0.65)} 
              strokeLinecap="round" 
            />
          </svg>
          <div className="text-center">
            <p className="text-gray-400 text-[9px] font-extrabold uppercase tracking-widest mb-1">TỔNG {type === 'expense' ? 'CHI' : 'THU'}</p>
            <p className="text-2xl font-black dark:text-white">{totalAmount.toLocaleString('vi-VN')}đ</p>
            <div className="flex items-center justify-center gap-1 mt-1 text-emerald-500">
              <span className="material-symbols-outlined text-[14px] font-bold">trending_up</span>
              <p className="text-[11px] font-bold">8.5%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-base font-bold dark:text-white">Hạng mục</h3>
          <button className="text-gray-400 text-xs font-bold uppercase tracking-wider">Xem tất cả</button>
        </div>
        {filteredData.map((d, i) => (
          <div key={d.cat} className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-50 dark:border-white/5 active-scale">
            <div className="flex items-center gap-4">
              <div className={`size-11 flex items-center justify-center rounded-xl ${i === 0 ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-50 dark:bg-zinc-800 text-gray-400'}`}>
                <span className="material-symbols-outlined text-2xl">category</span>
              </div>
              <div>
                <p className="font-bold text-sm dark:text-white">{d.cat}</p>
                <p className="text-xs font-medium text-gray-400">{d.percent}% tổng cộng</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm dark:text-white">{d.amount.toLocaleString('vi-VN')}đ</p>
              <div className="w-20 h-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-black dark:bg-white h-full rounded-full" style={{ width: `${d.percent}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analysis;
