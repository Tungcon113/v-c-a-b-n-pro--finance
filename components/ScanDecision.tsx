
import React from 'react';

interface ScanDecisionProps {
  data: any;
  onPersonal: () => void;
  onSplit: () => void;
  onCancel: () => void;
}

const ScanDecision: React.FC<ScanDecisionProps> = ({ data, onPersonal, onSplit, onCancel }) => {
  const totalAmount = data?.totalAmount || 0;
  const storeName = data?.storeName || 'Cửa hàng chưa xác định';

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-black animate-in fade-in duration-500 overflow-hidden">
      <header className="p-6 pt-12 text-center">
        <div className="size-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
          <span className="material-symbols-outlined text-white text-4xl font-bold">check_circle</span>
        </div>
        <h2 className="text-2xl font-black dark:text-white tracking-tight">Đã bóc tách thành công!</h2>
        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-2">Báo cáo sếp Tùng</p>
      </header>

      <main className="flex-1 px-6 flex flex-col justify-center gap-8">
        {/* Receipt Summary Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/5 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-2">Hóa đơn từ Gemini</p>
            <h3 className="text-xl font-black dark:text-white mb-1 truncate">{storeName}</h3>
            <p className="text-gray-400 text-xs font-bold">{data?.items?.length || 0} món hàng • {data?.date || 'Hôm nay'}</p>
            
            <div className="mt-6 pt-6 border-t border-gray-50 dark:border-white/5">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Tổng cộng</p>
              <h1 className="text-4xl font-black text-black dark:text-white tracking-tighter">
                {totalAmount.toLocaleString('vi-VN')}₫
              </h1>
            </div>
          </div>
          <span className="material-symbols-outlined text-[150px] absolute -right-8 -bottom-8 text-black/[0.03] dark:text-white/[0.03] rotate-12">receipt_long</span>
        </div>

        {/* Action Options */}
        <div className="grid grid-cols-1 gap-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] text-center mb-2">Sếp muốn xử lý thế nào?</p>
          
          <button 
            onClick={onPersonal}
            className="group flex items-center gap-5 p-6 bg-black dark:bg-white rounded-[2rem] shadow-xl active-scale transition-all"
          >
            <div className="size-14 rounded-2xl bg-white/10 dark:bg-black/10 flex items-center justify-center text-white dark:text-black">
              <span className="material-symbols-outlined text-3xl font-bold">person</span>
            </div>
            <div className="text-left">
              <h4 className="text-white dark:text-black font-black text-lg leading-tight">Tính cho tôi</h4>
              <p className="text-white/50 dark:text-black/50 text-[11px] font-bold uppercase tracking-wider">Lưu vào lịch sử cá nhân</p>
            </div>
          </button>

          <button 
            onClick={onSplit}
            className="group flex items-center gap-5 p-6 bg-white dark:bg-zinc-800 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-lg active-scale transition-all"
          >
            <div className="size-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl font-bold">group</span>
            </div>
            <div className="text-left">
              <h4 className="text-black dark:text-white font-black text-lg leading-tight">Chia cho hội bạn</h4>
              <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">Chia tiền & Gửi yêu cầu</p>
            </div>
          </button>
        </div>
      </main>

      <footer className="p-10 text-center">
        <button onClick={onCancel} className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] hover:text-rose-500 transition-colors">
          Hủy bỏ & Chụp lại
        </button>
      </footer>
    </div>
  );
};

export default ScanDecision;
