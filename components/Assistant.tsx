
import React, { useState, useRef, useEffect } from 'react';
import { Transaction, ChatMessage } from '../types';
import { getFinancialAdvice } from '../services/geminiService';

interface AssistantProps {
  transactions: Transaction[];
  onBack: () => void;
}

const Assistant: React.FC<AssistantProps> = ({ transactions, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      content: 'Chào bạn! Tôi là trợ lý của sếp Tùng. Bạn có muốn xem mẹo tiết kiệm hay báo cáo chi tiêu hôm nay không?',
      widget: 'saving_goal'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text: string) => {
    const userMsg = text.trim() || input.trim();
    if (!userMsg || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const advice = await getFinancialAdvice(transactions, userMsg);
    setMessages(prev => [...prev, { role: 'assistant', content: advice }]);
    setIsLoading(false);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Giả lập giọng nói - sau 3 giây tự động dừng và gửi câu hỏi mẫu
      setTimeout(() => {
        setIsListening(false);
        handleSend("Tháng này tôi tiêu bao nhiêu tiền?");
      }, 3000);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-white dark:bg-black animate-in fade-in duration-300">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-gray-100 dark:border-white/5 p-4 flex items-center gap-3">
        <button onClick={onBack} className="p-2 active-scale"><span className="material-symbols-outlined">arrow_back_ios_new</span></button>
        <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center">
          <span className="material-symbols-outlined text-white dark:text-black text-2xl">visibility</span>
        </div>
        <div>
          <h1 className="text-base font-bold leading-tight tracking-tight dark:text-white">Nhân viên sếp Tùng</h1>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Đang hoạt động</span>
          </div>
        </div>
      </header>

      <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 hide-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex items-start gap-3 ${m.role === 'user' ? 'justify-end ml-auto' : ''} max-w-[90%]`}>
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-white border border-black flex shrink-0 items-center justify-center mt-1 shadow-sm">
                <span className="material-symbols-outlined text-black text-xs">visibility</span>
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <div className={`p-4 rounded-[1.5rem] leading-relaxed text-[15px] shadow-sm ${
                m.role === 'user' 
                  ? 'bg-black text-white rounded-tr-none' 
                  : 'bg-gray-100 dark:bg-zinc-800 dark:text-white rounded-tl-none border border-gray-200/50 dark:border-white/5'
              }`}>
                {m.content}
                {m.widget === 'saving_goal' && (
                  <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-gray-100 dark:border-white/10 mt-4 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Tiến độ tiết kiệm</span>
                      <span className="text-xs font-bold text-emerald-500">80%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[80%]"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && <div className="text-gray-400 text-[10px] animate-pulse px-4 italic">Sếp Tùng đang phân tích...</div>}
      </main>

      {/* Control Area */}
      <div className="p-4 ios-blur border-t border-gray-100 dark:border-white/5 space-y-4">
        {isListening && (
          <div className="flex justify-center items-center gap-1 h-8">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-1 bg-black dark:bg-white rounded-full animate-bounce" style={{ height: `${Math.random()*24+4}px`, animationDelay: `${i*0.1}s` }}></div>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-gray-50 dark:bg-zinc-900 rounded-[1.5rem] border border-gray-200 dark:border-white/5 px-4 py-3 flex items-center gap-3 focus-within:border-black transition-all">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend('')}
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-1 dark:text-white" 
              placeholder="Hỏi trợ lý sếp Tùng..." 
            />
            <button onClick={toggleListening} className={`p-1 rounded-full transition-colors ${isListening ? 'text-emerald-500 bg-emerald-50' : 'text-gray-400'}`}>
              <span className="material-symbols-outlined !text-[24px]">mic</span>
            </button>
          </div>
          <button onClick={() => handleSend('')} className="w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center active-scale shadow-lg">
            <span className="material-symbols-outlined !text-[22px] fill-1">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
