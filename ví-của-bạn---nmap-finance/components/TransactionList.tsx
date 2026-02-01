
import React from 'react';
import { Transaction } from '../types';
import { CATEGORY_MAP } from '../constants';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <span className="material-symbols-outlined text-5xl mb-3 opacity-20">inbox</span>
        <p className="text-xs font-bold uppercase tracking-widest">Không có dữ liệu</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((t) => {
        const catInfo = CATEGORY_MAP[t.category] || { icon: 'category', color: 'bg-gray-400' };
        
        return (
          <div key={t.id} className="flex items-center justify-between p-4 px-5 rounded-[1.8rem] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 active-scale shadow-sm transition-all hover:bg-gray-50 dark:hover:bg-zinc-800/50">
            <div className="flex items-center gap-4">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${catInfo.color} text-white shadow-md shadow-inherit/20`}>
                <span className="material-symbols-outlined text-[22px] font-bold">
                  {catInfo.icon}
                </span>
              </div>
              <div>
                <p className="text-[15px] font-extrabold text-black dark:text-white leading-tight">{t.title}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{t.category} • {t.date}</p>
              </div>
            </div>
            <p className={`text-[15px] font-black tracking-tight ${
              t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-black dark:text-white'
            }`}>
              {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString('vi-VN')}₫
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionList;
