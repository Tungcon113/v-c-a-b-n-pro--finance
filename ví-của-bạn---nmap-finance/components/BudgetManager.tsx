
import React, { useState, useMemo } from 'react';
import { Transaction } from '../types';
import { CATEGORY_MAP } from '../constants';

interface BudgetManagerProps {
  transactions: Transaction[];
  monthlyLimit: number;
  onUpdateLimit: (val: number) => void;
}

const BudgetManager: React.FC<BudgetManagerProps> = ({ transactions, monthlyLimit, onUpdateLimit }) => {
  const [view, setView] = useState<'budget' | 'garden'>('budget');
  const [waterAmount, setWaterAmount] = useState(120);
  const [treeScale, setTreeScale] = useState(1);
  const [missions, setMissions] = useState([
    { id: 1, text: 'Không ăn ngoài 3 ngày', progress: '2/3', reward: 20, done: false },
    { id: 2, text: 'Tiết kiệm 500k tuần này', progress: '320k/500k', reward: 50, done: false },
    { id: 3, text: 'Ghi chép chi tiêu hôm nay', progress: 'Xong', reward: 10, done: true },
  ]);

  // Tính toán tổng chi tiêu thực tế từ danh sách transactions
  const totalSpent = useMemo(() => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  // Phân bổ chi tiêu theo từng hạng mục
  const categorySpending = useMemo(() => {
    const map: Record<string, number> = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });
    return map;
  }, [transactions]);

  const overallPercent = Math.min(Math.round((totalSpent / monthlyLimit) * 100), 100);

  const handleEditLimit = () => {
    const newVal = prompt("Nhập hạn mức chi tiêu mới cho tháng này (VND):", monthlyLimit.toString());
    if (newVal !== null) {
      const parsed = parseInt(newVal.replace(/\D/g, ''));
      if (!isNaN(parsed) && parsed > 0) {
        onUpdateLimit(parsed);
      }
    }
  };

  const handleWater = () => {
    if (waterAmount <= 0) return;
    setWaterAmount(0);
    setTreeScale(treeScale + 0.1);
    alert("Cảm ơn! Cây sếp Tùng đã cao thêm một chút 🌱");
  };

  const completeMission = (id: number) => {
    setMissions(missions.map(m => {
      if (m.id === id && !m.done) {
        setWaterAmount(prev => prev + m.reward);
        return { ...m, done: true, progress: 'Xong' };
      }
      return m;
    }));
  };

  return (
    <div className="animate-in fade-in duration-500">
      <header className="p-6 ios-blur border-b border-gray-50 dark:border-white/5 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-extrabold tracking-tight dark:text-white">Ngân sách & Vườn</h1>
          <div className="flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-xl">
            <button onClick={() => setView('budget')} className={`px-4 py-1.5 text-[10px] font-bold rounded-lg transition-all ${view === 'budget' ? 'bg-white dark:bg-zinc-700 shadow-sm text-black dark:text-white' : 'text-gray-400'}`}>Hạn mức</button>
            <button onClick={() => setView('garden')} className={`px-4 py-1.5 text-[10px] font-bold rounded-lg transition-all ${view === 'garden' ? 'bg-white dark:bg-zinc-700 shadow-sm text-black dark:text-white' : 'text-gray-400'}`}>Vườn AI</button>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-8">
        {view === 'budget' ? (
          <>
            <section className="space-y-4">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Hạn mức tháng này</p>
                  <button onClick={handleEditLimit} className="text-accent text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">edit</span> Chỉnh sửa
                  </button>
                </div>
                <div className="flex items-baseline justify-between">
                  <h2 onClick={handleEditLimit} className="text-4xl font-black tracking-tighter dark:text-white cursor-pointer active:opacity-60 transition-opacity">
                    {(monthlyLimit).toLocaleString('vi-VN')}₫
                  </h2>
                  <span className={`text-[10px] font-black px-2.5 py-1.5 rounded-xl uppercase shadow-sm ${overallPercent > 90 ? 'bg-rose-500 text-white' : 'bg-black dark:bg-white text-white dark:text-black'}`}>
                    {overallPercent}%
                  </span>
                </div>
              </div>
              <div className="space-y-3 pt-2">
                <div className="h-4 w-full bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden p-1 shadow-inner">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out shadow-lg ${overallPercent > 90 ? 'bg-rose-500 shadow-rose-500/50' : overallPercent > 70 ? 'bg-amber-500 shadow-amber-500/50' : 'bg-emerald-500 shadow-emerald-500/50'}`} 
                    style={{ width: `${overallPercent}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tighter">Đã chi: {totalSpent.toLocaleString()}₫</p>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tighter">Còn lại: {(monthlyLimit - totalSpent).toLocaleString()}₫</p>
                </div>
              </div>
            </section>

            <div className="h-px bg-gray-50 dark:bg-white/5"></div>

            <section className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Hạng mục chính</h3>
              <BudgetItem 
                icon={CATEGORY_MAP['Ăn uống']?.icon || 'restaurant'} 
                label="Ăn uống" 
                spent={categorySpending['Ăn uống'] || 0} 
                limit={monthlyLimit * 0.3} // Giả định ăn uống chiếm 30% hạn mức
                color={(categorySpending['Ăn uống'] || 0) > (monthlyLimit * 0.3) ? 'danger' : ''}
              />
              <BudgetItem 
                icon={CATEGORY_MAP['Giải trí']?.icon || 'local_activity'} 
                label="Giải trí" 
                spent={categorySpending['Giải trí'] || 0} 
                limit={monthlyLimit * 0.1} // Giả định giải trí 10%
                color={(categorySpending['Giải trí'] || 0) > (monthlyLimit * 0.1) ? 'danger' : 'warning'}
              />
              <BudgetItem 
                icon={CATEGORY_MAP['Hóa đơn']?.icon || 'receipt_long'} 
                label="Hóa đơn" 
                spent={categorySpending['Hóa đơn'] || 0} 
                limit={monthlyLimit * 0.2} // Giả định hóa đơn 20%
              />
            </section>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center animate-in zoom-in-95">
            <h2 className="text-2xl font-bold dark:text-white mb-1">Cây Đang Phát Triển</h2>
            <p className="text-emerald-500 font-bold text-[10px] uppercase tracking-widest">Cấp độ 4: Cây Non</p>
            
            <div className="relative w-64 h-64 mt-6 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-3xl"></div>
              <svg 
                className="w-48 h-48 text-black dark:text-white transition-transform duration-700" 
                style={{ transform: `scale(${treeScale})` }}
                fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 100 100"
              >
                <path d="M50 95 L50 60 M50 60 C50 45 40 40 30 35 M50 60 C50 45 60 40 70 35 M50 40 L50 15" strokeLinecap="round" />
                <circle cx="30" cy="35" r="3" fill="#10b981" />
                <circle cx="70" cy="35" r="3" fill="#10b981" />
                <circle cx="50" cy="15" r="4" fill="#10b981" />
              </svg>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full mt-8">
              <div className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-2xl text-center shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Nước tích lũy</p>
                <p className="text-xl font-black text-black dark:text-white">{waterAmount}ml</p>
              </div>
              <div className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-2xl text-center shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Sức khỏe cây</p>
                <p className="text-xl font-black text-emerald-500">95%</p>
              </div>
            </div>

            <div className="w-full mt-8 space-y-3">
              <h3 className="text-sm font-bold dark:text-white">Nhiệm vụ tài chính</h3>
              {missions.map(m => (
                <div key={m.id} onClick={() => completeMission(m.id)} className={`flex items-center justify-between p-4 rounded-2xl transition-all cursor-pointer ${m.done ? 'bg-emerald-50 dark:bg-emerald-950/20 opacity-60 shadow-inner' : 'bg-gray-50 dark:bg-zinc-900 active-scale shadow-sm'}`}>
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined ${m.done ? 'text-emerald-500' : 'text-gray-400'}`}>
                      {m.done ? 'check_circle' : 'task_alt'}
                    </span>
                    <div>
                      <p className={`text-sm font-bold ${m.done ? 'line-through text-gray-400' : 'dark:text-white'}`}>{m.text}</p>
                      <p className="text-[10px] font-medium text-gray-400">{m.progress}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-500">+{m.reward}ml</span>
                </div>
              ))}
            </div>

            <button 
              onClick={handleWater}
              disabled={waterAmount <= 0}
              className={`mt-10 w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active-scale shadow-lg transition-all ${waterAmount > 0 ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-gray-100 text-gray-400 grayscale cursor-not-allowed'}`}
            >
               <span className="material-symbols-outlined">water_drop</span>
               Tưới cây ngay ({waterAmount}ml)
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

const BudgetItem = ({ icon, label, spent, limit, color }: any) => {
  const percent = Math.min(Math.round((spent / limit) * 100), 100);
  const colorClass = color === 'danger' ? 'bg-rose-500 shadow-rose-500/30' : color === 'warning' ? 'bg-amber-500 shadow-amber-500/30' : 'bg-black dark:bg-white shadow-black/30 dark:shadow-white/30';
  
  return (
    <div className="space-y-3 bg-white dark:bg-zinc-900/40 p-1 rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-2xl bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-white/5 flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-black dark:text-white text-xl">{icon}</span>
          </div>
          <div>
            <p className="font-bold text-sm dark:text-white tracking-tight">{label}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Chi {spent.toLocaleString()}₫ / {limit.toLocaleString()}₫</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-black text-sm dark:text-white">{percent}%</p>
        </div>
      </div>
      <div className="h-2 w-full bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden shadow-inner">
        <div className={`h-full rounded-full transition-all duration-700 shadow-md ${colorClass}`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
};

export default BudgetManager;
