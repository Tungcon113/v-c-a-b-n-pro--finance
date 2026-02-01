
import React from 'react';
import { Language } from '../types';

interface LanguageSelectionProps {
  current: Language;
  onBack: () => void;
  onSelect: (l: Language) => void;
}

const LanguageSelection: React.FC<LanguageSelectionProps> = ({ current, onBack, onSelect }) => {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black animate-in slide-in-from-right duration-300">
      <header className="p-4 flex items-center border-b border-gray-50 dark:border-white/5">
        <button onClick={onBack} className="p-2 active-scale"><span className="material-symbols-outlined">arrow_back_ios_new</span></button>
        <h2 className="flex-1 text-center font-bold text-lg dark:text-white pr-8">Ngôn ngữ</h2>
      </header>

      <main className="p-6 space-y-4">
        <div className="bg-gray-50 dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/5">
          <SelectionItem 
            label="Tiếng Việt" 
            active={current === 'vi'} 
            onClick={() => onSelect('vi')} 
            flag="🇻🇳"
          />
          <SelectionItem 
            label="English" 
            active={current === 'en'} 
            onClick={() => onSelect('en')} 
            flag="🇺🇸"
          />
        </div>
      </main>
    </div>
  );
};

const SelectionItem = ({ label, active, onClick, flag }: any) => (
  <div 
    onClick={onClick} 
    className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-white/5 last:border-0 active:bg-gray-100 dark:active:bg-zinc-800 transition-colors cursor-pointer"
  >
    <div className="flex items-center gap-4">
      <span className="text-2xl">{flag}</span>
      <span className="font-bold text-sm dark:text-white">{label}</span>
    </div>
    {active && <span className="material-symbols-outlined text-accent font-bold">check</span>}
  </div>
);

export default LanguageSelection;
