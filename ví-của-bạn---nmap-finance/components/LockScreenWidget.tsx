
import React, { useState } from 'react';

interface LockScreenWidgetProps {
  onBack: () => void;
  balance: number;
}

const LockScreenWidget: React.FC<LockScreenWidgetProps> = ({ onBack, balance }) => {
  const [activeWidgets, setActiveWidgets] = useState({
    budget: true,
    balance: true,
    quickAdd: true
  });

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black animate-in slide-in-from-right duration-300">
      {/* TopAppBar */}
      <header className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-black/80 backdrop-blur-md p-4 justify-between border-b border-gray-100 dark:border-white/5">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full active-scale">
          <span className="material-symbols-outlined text-black dark:text-white">arrow_back</span>
        </button>
        <h2 className="text-lg font-black leading-tight tracking-tight flex-1 text-center dark:text-white pr-10">Widget Màn Hình Khóa</h2>
      </header>

      <main className="flex-1 pb-10 overflow-y-auto hide-scrollbar">
        {/* Section Preview */}
        <div className="px-6 pt-6">
          <h3 className="text-black dark:text-white text-base font-black leading-tight tracking-tight mb-4 uppercase tracking-[0.1em]">Xem trước trên màn hình</h3>
          
          {/* iOS Style Mockup */}
          <div className="relative w-full aspect-[9/16] rounded-[3rem] overflow-hidden border-[8px] border-zinc-900 dark:border-zinc-800 shadow-2xl bg-cover bg-center transition-all" 
               style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCH7vOnkMaQlPKgeH0mUXREwZLb_8IYhKiULhFZlB10jDNnFtYZgAX2MVGBGSPG5iJV5Uam9LJyjp9MZa6n9ypsLGI9uI_SSO-RGsYp9F8x8OPVoDwF7U7nFoC_b8yZ5ajNxR2Iil2jTeG7fIc8a22OmyQ-MxH3DZScD1Z4yXpeM0l6TenVMGP8VJqcT9xlYn9LAWfiz52En9d2DgdKwx3kmPb5-RpB4bNl7Bw1q7gma2YhuIMVaRFBQVwI0d4JZ6GSzV1tdQqHrNAC")' }}>
            <div className="absolute inset-0 flex flex-col items-center pt-20 bg-black/30 backdrop-blur-[1px]">
              {/* Clock */}
              <div className="text-white text-7xl font-light mb-8 drop-shadow-lg">09:41</div>
              
              {/* Widgets Row */}
              <div className="flex gap-2 px-6 w-full justify-center">
                {/* Circular Widget (Budget) */}
                {activeWidgets.budget && (
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center flex-col border border-white/20 shadow-lg animate-in zoom-in duration-300">
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle className="text-white/20" cx="20" cy="20" fill="transparent" r="18" stroke="currentColor" strokeWidth="3"></circle>
                        <circle className="text-white" cx="20" cy="20" fill="transparent" r="18" stroke="currentColor" strokeDasharray="113" strokeDashoffset="40" strokeWidth="3"></circle>
                      </svg>
                      <span className="absolute text-[9px] font-black text-white">65%</span>
                    </div>
                  </div>
                )}

                {/* Rectangular Widget (Balance) */}
                {activeWidgets.balance && (
                  <div className="flex-1 h-16 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center px-4 gap-3 border border-white/20 shadow-lg animate-in zoom-in duration-300">
                    <span className="material-symbols-outlined text-white text-[20px] font-bold">account_balance_wallet</span>
                    <div className="flex flex-col">
                      <span className="text-white/70 text-[8px] uppercase font-black tracking-widest">Số dư ví</span>
                      <span className="text-white text-[13px] font-black tracking-tight truncate">{balance.toLocaleString('vi-VN')}đ</span>
                    </div>
                  </div>
                )}

                {/* Quick Action Widget (Add) */}
                {activeWidgets.quickAdd && (
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-lg animate-in zoom-in duration-300">
                    <span className="material-symbols-outlined text-white text-3xl font-light">add</span>
                  </div>
                )}
              </div>
              
              {/* Bottom Bar */}
              <div className="absolute bottom-10 w-32 h-1 bg-white/40 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Section Components */}
        <div className="px-6 pt-10">
          <h3 className="text-black dark:text-white text-base font-black leading-tight mb-4 uppercase tracking-[0.1em]">Các widget khả dụng</h3>
          
          <div className="space-y-1 bg-gray-50 dark:bg-zinc-900/50 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/5">
            <WidgetConfigItem 
              icon="pie_chart" 
              label="Ngân sách còn lại" 
              desc="Vòng tròn hiển thị tiến độ chi tiêu"
              active={activeWidgets.budget}
              onToggle={() => setActiveWidgets(prev => ({...prev, budget: !prev.budget}))}
            />
            <WidgetConfigItem 
              icon="payments" 
              label="Số dư tổng quát" 
              desc="Hiển thị số tiền hiện có trong ví"
              active={activeWidgets.balance}
              onToggle={() => setActiveWidgets(prev => ({...prev, balance: !prev.balance}))}
            />
            <WidgetConfigItem 
              icon="add_circle" 
              label="Thêm giao dịch nhanh" 
              desc="Phím tắt mở nhanh màn hình thêm mới"
              active={activeWidgets.quickAdd}
              onToggle={() => setActiveWidgets(prev => ({...prev, quickAdd: !prev.quickAdd}))}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 bg-accent/5 rounded-[2rem] m-6 border border-accent/10">
          <h4 className="text-accent font-black text-xs mb-3 flex items-center gap-2 uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">info</span>
            Cách thiết lập
          </h4>
          <ol className="text-[13px] text-gray-500 dark:text-gray-400 space-y-3 list-decimal pl-4 font-medium leading-relaxed">
            <li>Chạm và giữ vào màn hình khóa của bạn.</li>
            <li>Chọn <strong>Tùy chỉnh</strong> và nhấn vào vùng Widget.</li>
            <li>Tìm ứng dụng <strong>Nmap Finance</strong> trong danh sách.</li>
            <li>Kéo các widget yêu thích của bạn vào vị trí.</li>
          </ol>
        </div>
      </main>

      {/* Footer Action */}
      <footer className="p-6 pb-12 bg-white dark:bg-black border-t border-gray-100 dark:border-white/5">
        <button 
          onClick={onBack}
          className="w-full h-16 bg-accent text-white rounded-2xl font-black text-base shadow-xl shadow-accent/20 active-scale flex items-center justify-center gap-3 uppercase tracking-widest"
        >
          <span className="material-symbols-outlined">save</span>
          Lưu cài đặt Widget
        </button>
      </footer>
    </div>
  );
};

const WidgetConfigItem = ({ icon, label, desc, active, onToggle }: any) => (
  <div className="flex items-center gap-4 px-6 py-4 justify-between bg-white dark:bg-zinc-900 border-b border-gray-50 dark:border-white/5 last:border-0">
    <div className="flex items-center gap-4">
      <div className="size-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
        <span className="material-symbols-outlined text-[24px]">{icon}</span>
      </div>
      <div>
        <p className="text-black dark:text-white text-sm font-black leading-tight mb-0.5">{label}</p>
        <p className="text-gray-400 text-[11px] font-bold tracking-tight">{desc}</p>
      </div>
    </div>
    <button 
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${active ? 'bg-accent' : 'bg-gray-200 dark:bg-zinc-800'}`}
    >
      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${active ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  </div>
);

export default LockScreenWidget;
