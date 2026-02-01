
import React from 'react';

interface AppIconSelectionProps {
  onBack: () => void;
}

const AppIconSelection: React.FC<AppIconSelectionProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black animate-in slide-in-from-right duration-300">
      <style>{`
        .app-icon-squircle {
          mask-image: url('data:image/svg+xml;utf8,<svg preserveAspectRatio="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 0C10 0 0 10 0 50s10 50 50 50 50-10 50-50S90 0 50 0z" fill="black"/></svg>');
          -webkit-mask-image: url('data:image/svg+xml;utf8,<svg preserveAspectRatio="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 0C10 0 0 10 0 50s10 50 50 50 50-10 50-50S90 0 50 0z" fill="black"/></svg>');
          mask-size: 100% 100%;
          -webkit-mask-size: 100% 100%;
        }
      `}</style>

      {/* Top Bar */}
      <header className="flex items-center p-4 sticky top-0 bg-white/90 dark:bg-black/90 backdrop-blur-md z-10 border-b border-gray-50 dark:border-white/5">
        <button onClick={onBack} className="flex size-12 items-center justify-center text-black dark:text-white active-scale">
          <span className="material-symbols-outlined text-[28px]">arrow_back</span>
        </button>
        <h2 className="flex-1 text-center text-lg font-black dark:text-white">Biểu tượng ứng dụng</h2>
        <div className="size-12 flex items-center justify-center">
          <span className="material-symbols-outlined text-gray-400">share</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto hide-scrollbar pb-10">
        <div className="text-center pt-8 px-6">
          <h1 className="text-black dark:text-white tracking-tight text-3xl font-black leading-tight mb-2">Ví của bạn</h1>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest leading-relaxed">
            Quản lý tài chính cá nhân • Light Mode Minimalist
          </p>
        </div>

        {/* Main Icon Preview */}
        <div className="px-6 py-12 flex flex-col items-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Biến thể: Light Mode</p>
          <div className="w-56 h-56 bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12)] app-icon-squircle flex items-center justify-center border border-gray-50 relative animate-in zoom-in duration-500">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <span className="material-symbols-outlined text-black !text-[100px] font-extralight opacity-95">visibility</span>
              <div className="absolute bottom-1 right-2 w-8 h-8 bg-white flex items-center justify-center rounded-full shadow-sm">
                <span className="material-symbols-outlined text-black !text-[24px] font-light">monetization_on</span>
              </div>
            </div>
          </div>
          <p className="mt-8 text-[11px] text-gray-400 text-center italic max-w-[240px] leading-relaxed font-medium">
            Nền trắng tinh khiết, con mắt tối giản kết hợp đồng xu line-art mảnh mai ở góc dưới
          </p>
        </div>

        {/* iOS Home Screen Presentation */}
        <div className="p-6 mt-4">
          <h4 className="text-black dark:text-white text-base font-black mb-8 text-center uppercase tracking-widest">Trình bày trên iOS</h4>
          <div className="flex justify-center">
            <div className="w-full max-w-[280px] aspect-[9/19.5] bg-cover rounded-[3rem] shadow-2xl relative overflow-hidden border-[8px] border-zinc-900" 
                 style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuACJOu4nE-hiFbFjT6rG0udEahX4HDTFNBjsKJ6bBM3O3Tm4IIUF9vyWAIVVuEunrqYQq6VuQ7MGgI4Y9dKILN7u3fZqhLE_rV27LEAd2KHnpoxQ1K-dtjHZKlbWuXQbDAn4rjVSXCgR8xZ57QFd1ae6hmFXie1QGFeHx0hn67K_vSfVl8sN5fj7vjeWQ3P7G9WsCrA80LKEauEk0NqqYiFh9LCEPMpDuqOmFt29UyBwdCU2vE6CoQVsIXgOEllhYuRXewoihhOwI4K")' }}>
              <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px]"></div>
              
              {/* iOS Icons Grid */}
              <div className="absolute top-20 left-6 right-6 grid grid-cols-4 gap-x-5 gap-y-8">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-full aspect-square bg-white app-icon-squircle flex items-center justify-center shadow-md relative">
                    <span className="material-symbols-outlined text-black text-[14px] scale-[1.8] font-light">visibility</span>
                    <div className="absolute bottom-[2px] right-[2px] w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-black text-[9px] font-light">monetization_on</span>
                    </div>
                  </div>
                  <span className="text-[9px] text-white font-black drop-shadow-sm whitespace-nowrap tracking-tight">Ví của bạn</span>
                </div>
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex flex-col items-center gap-1.5 opacity-60">
                    <div className="w-full aspect-square bg-white/20 backdrop-blur-md app-icon-squircle"></div>
                    <div className="h-1.5 w-8 bg-white/40 rounded-full"></div>
                  </div>
                ))}
              </div>

              {/* iOS Dock */}
              <div className="absolute bottom-6 left-4 right-4 h-16 bg-white/20 backdrop-blur-xl rounded-[2rem] flex items-center justify-around px-2 border border-white/10">
                {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 bg-white/40 rounded-xl"></div>)}
              </div>
            </div>
          </div>
          <p className="text-[9px] text-center text-gray-400 mt-6 uppercase font-black tracking-[0.3em]">Giao diện iOS Home Screen</p>
        </div>

        {/* Details */}
        <div className="p-6 mt-8 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-zinc-900 p-5 rounded-[2rem] border border-gray-100 dark:border-white/5">
            <span className="material-symbols-outlined text-accent mb-3">branding_watermark</span>
            <h5 className="font-black text-xs uppercase dark:text-white mb-1">Thương hiệu</h5>
            <p className="text-[11px] text-gray-500 font-bold">Đồng bộ 'Ví của bạn' trên toàn hệ thống</p>
          </div>
          <div className="bg-gray-50 dark:bg-zinc-900 p-5 rounded-[2rem] border border-gray-100 dark:border-white/5">
            <span className="material-symbols-outlined text-accent mb-3">balance</span>
            <h5 className="font-black text-xs uppercase dark:text-white mb-1">Thiết kế</h5>
            <p className="text-[11px] text-gray-500 font-bold">Line-art tối giản, tập trung vào trải nghiệm</p>
          </div>
        </div>
      </main>

      <footer className="p-6 pb-12 bg-white dark:bg-black border-t border-gray-50 dark:border-white/5">
        <button className="w-full h-16 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black text-base shadow-xl active-scale flex items-center justify-center gap-3 uppercase tracking-widest">
          <span className="material-symbols-outlined">download</span>
          Tải xuống Icon (.PNG)
        </button>
      </footer>
    </div>
  );
};

export default AppIconSelection;
