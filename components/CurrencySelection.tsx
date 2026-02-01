
import React from 'react';
import { Currency } from '../types';

interface CurrencySelectionProps {
  current: Currency;
  onBack: () => void;
  onSelect: (c: Currency) => void;
}

const CurrencySelection: React.FC<CurrencySelectionProps> = ({ current, onBack, onSelect }) => {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black animate-in slide-in-from-right duration-300">
      <header className="p-4 flex items-center border-b border-gray-50 dark:border-white/5">
        <button onClick={onBack} className="p-2 active-scale"><span className="material-symbols-outlined">arrow_back_ios_new</span></button>
        <h2 className="flex-1 text-center font-bold text-lg dark:text-white pr-8">Tiền tệ mặc định</h2>
      </header>

      <main className="p-6 space-y-4">
        <div className="bg-gray-50 dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/5">
          <SelectionItem 
            label="Việt Nam Đồng (₫)" 
            code="VND" 
            active={current === 'VND'} 
            onClick={() => onSelect('VND')} 
          />
          <SelectionItem 
            label="Đô la Mỹ ($)" 
            code="USD" 
            active={current === 'USD'} 
            onClick={() => onSelect('USD')} 
          />
        </div>
        <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest px-8 leading-relaxed">
          Tỷ giá quy đổi sẽ được cập nhật tự động theo thị trường khi bạn thực hiện giao dịch liên ngân hàng.
        </p>
      </main>
    </div>
  );
};

const SelectionItem = ({ label, code, active, onClick }: any) => (
  <div 
    onClick={onClick} 
    className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-white/5 last:border-0 active:bg-gray-100 dark:active:bg-zinc-800 transition-colors cursor-pointer"
  >
    <div className="flex items-center gap-4">
      <div className="size-10 rounded-xl bg-white dark:bg-black border border-gray-100 dark:border-white/10 flex items-center justify-center font-black text-xs">
        {code}
      </div>
      <span className="font-bold text-sm dark:text-white">{label}</span>
    </div>
    {active && <span className="material-symbols-outlined text-accent font-bold">check_circle</span>}
  </div>
);

export default CurrencySelection;
