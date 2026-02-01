
import React, { useState, useRef, useEffect } from 'react';
import { Transaction, ChatMessage, Wallet } from '../types';
import { getFinancialAdvice } from '../services/geminiService';

interface AssistantProps {
  transactions: Transaction[];
  wallets?: Wallet[];
  monthlyLimit?: number;
  onBack: () => void;
}

const Assistant: React.FC<AssistantProps> = ({ transactions, wallets = [], monthlyLimit = 0, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      content: 'Dạ, em chào sếp Tùng! Em đã sẵn sàng báo cáo tình hình tài chính hôm nay. Sếp muốn em kiểm tra ví nào hay cần mẹo tiết kiệm gì không ạ?',
      widget: 'saving_goal'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async (text?: string) => {
    const userMsg = text || input.trim();
    if (!userMsg || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const advice = await getFinancialAdvice(transactions, userMsg, wallets, monthlyLimit);
      setMessages(prev => [...prev, { role: 'assistant', content: advice }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Dạ lỗi kết nối rồi sếp ơi, sếp kiểm tra lại mạng hoặc API Key giúp em!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-white dark:bg-black animate-in fade-in duration-300">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-gray-100 dark:border-white/5 p-4 flex items-center gap-3 shadow-sm">
        <button onClick={onBack} className="p-2 active-scale text-black dark:text-white">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center shadow-inner">
          <span className="material-symbols-outlined text-white dark:text-black text-2xl">visibility</span>
        </div>
        <div>
          <h1 className="text-base font-bold leading-tight tracking-tight dark:text-white">Trợ lý sếp Tùng</h1>
          <div className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`}></span>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">
              {isLoading ? 'Đang tính toán...' : 'Đang trực tuyến'}
            </span>
          </div>
        </div>
      </header>

      <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 hide-scrollbar bg-gray-50/30 dark:bg-zinc-950">
        {messages.map((m, i) => (
          <div key={i} className={`flex items-start gap-3 ${m.role === 'user' ? 'justify-end ml-auto' : ''} max-w-[90%] animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-white border border-black flex shrink-0 items-center justify-center mt-1 shadow-sm">
                <span className="material-symbols-outlined text-black text-xs">visibility</span>
              </div>
            )}
            <div className="flex flex-col gap-1.5 w-full">
              <div className={`p-4 rounded-[1.5rem] leading-relaxed text-[15px] shadow-sm whitespace-pre-wrap ${
                m.role === 'user' 
                  ? 'bg-black text-white rounded-tr-none ml-auto' 
                  : 'bg-white dark:bg-zinc-800 dark:text-white rounded-tl-none border border-gray-200/50 dark:border-white/5'
              }`}>
                {m.content}
                {m.widget === 'saving_goal' && (
                  <div className="bg-gray-50 dark:bg-zinc-900 p-3 rounded-xl border border-gray-200 dark:border-white/10 mt-4 shadow-inner">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hạn mức chi tiêu</span>
                      <span className="text-xs font-bold text-emerald-500">
                        {Math.round((transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0) / (monthlyLimit || 1)) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${Math.min(100, (transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0) / (monthlyLimit || 1)) * 100)}%` }}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 p-4 bg-white/50 dark:bg-zinc-800/50 rounded-2xl w-fit animate-pulse border border-gray-100 dark:border-white/5 ml-11">
             <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
             </div>
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Em đang tính số liệu cho sếp...</span>
          </div>
        )}
      </main>

      <div className="p-4 ios-blur border-t border-gray-100 dark:border-white/5 bg-white/80 dark:bg-black/80">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-gray-100 dark:bg-zinc-900 rounded-[1.5rem] border border-transparent focus-within:border-black dark:focus-within:border-white focus-within:bg-white dark:focus-within:bg-zinc-800 px-4 py-3 flex items-center gap-3 transition-all duration-300">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-1 dark:text-white" 
              placeholder="Sếp muốn hỏi gì em ạ?..." 
              disabled={isLoading}
            />
            <button className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <span className="material-symbols-outlined !text-[22px]">mic</span>
            </button>
          </div>
          <button 
            onClick={() => handleSend()} 
            disabled={!input.trim() || isLoading}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
              !input.trim() || isLoading 
                ? 'bg-gray-100 text-gray-300 dark:bg-zinc-800' 
                : 'bg-black dark:bg-white text-white dark:text-black active-scale'
            }`}
          >
            <span className="material-symbols-outlined !text-[22px] fill-1">send</span>
          </button>
        </div>
        <p className="text-[8px] text-center text-gray-400 mt-3 font-bold uppercase tracking-[0.2em]">Hỗ trợ bởi Google Gemini 3 Flash</p>
      </div>
    </div>
  );
};

export default Assistant;
