
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

      {/* Top Bar - Precise as Screenshot */}
      <header className="flex items-center p-4 sticky top-0 bg-white/95 dark:bg-black/95 backdrop-blur-md z-10 border-b border-gray-50 dark:border-white/5">
        <button onClick={onBack} className="flex size-10 items-center justify-center text-black dark:text-white active-scale">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h2 className="flex-1 text-center text-[15px] font-black dark:text-white">Biểu tượng Ví của bạn</h2>
        <div className="size-10 flex items-center justify-center">
          <span className="material-symbols-outlined text-black dark:text-white text-[22px]">share</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto hide-scrollbar pb-10">
        {/* Branding Title Section */}
        <div className="text-center pt-10 px-8">
          <h1 className="text-black dark:text-white tracking-tight text-[42px] font-black mb-2">Ví của bạn</h1>
          <p className="text-gray-400 text-[13px] font-bold leading-relaxed max-w-[280px] mx-auto opacity-80">
            Quản lý tài chính cá nhân • Light Mode Minimalist • Biểu tượng đồng xu tinh tế
          </p>
        </div>

        {/* Variant Indicator */}
        <div className="mt-14 flex flex-col items-center">
          <p className="text-[10px] font-black text-gray-300 dark:text-zinc-700 uppercase tracking-[0.3em] mb-12">BIẾN THỂ: LIGHT MODE</p>
          
          {/* THE ICON DESIGN PREVIEW */}
          <div className="w-56 h-56 bg-white shadow-[0_30px_70px_rgba(0,0,0,0.06)] app-icon-squircle flex items-center justify-center relative animate-in zoom-in duration-500 ring-1 ring-black/[0.03]">
            <div className="relative flex items-center justify-center">
              {/* Eye Shape */}
              <div className="size-36 rounded-full border-[10px] border-black flex items-center justify-center relative">
                {/* Pupil */}
                <div className="size-14 bg-black rounded-full"></div>
              </div>
              
              {/* Coin Badge - Bottom Right */}
              <div className="absolute -bottom-2 -right-2 size-11 bg-white rounded-full flex items-center justify-center shadow-lg border border-black/5">
                <div className="size-9 rounded-full border-2 border-black flex items-center justify-center">
                   <span className="text-black font-black text-base">$</span>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-14 text-[12px] text-gray-400 text-center italic max-w-[260px] leading-relaxed font-bold px-4">
            Nền trắng tinh khiết, con mắt tối giản kết hợp đồng xu line-art mảnh mai ở góc dưới
          </p>
        </div>

        {/* Presentation Section */}
        <div className="mt-20 px-6">
          <h4 className="text-black dark:text-white text-xl font-black mb-10 text-center tracking-tight">Trình bày trên iOS</h4>
          <div className="flex justify-center">
             {/* Realistic iPhone Mockup */}
            <div className="w-full max-w-[280px] aspect-[9/18.5] bg-cover rounded-[3.5rem] shadow-2xl relative overflow-hidden border-[8px] border-zinc-900 dark:border-zinc-800" 
                 style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuACJOu4nE-hiFbFjT6rG0udEahX4HDTFNBjsKJ6bBM3O3Tm4IIUF9vyWAIVVuEunrqYQq6VuQ7MGgI4Y9dKILN7u3fZqhLE_rV27LEAd2KHnpoxQ1K-dtjHZKlbWuXQbDAn4rjVSXCgR8xZ57QFd1ae6hmFXie1QGFeHx0hn67K_vSfVl8sN5fj7vjeWQ3P7G9WsCrA80LKEauEk0NqqYiFh9LCEPMpDuqOmFt29UyBwdCU2vE6CoQVsIXgOEllhYuRXewoihhOwI4K")' }}>
              <div className="absolute inset-0 bg-black/5 backdrop-blur-[0.5px]"></div>
              
              {/* Home Screen Icons */}
              <div className="absolute top-20 left-6 right-6 grid grid-cols-4 gap-x-5 gap-y-10">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full aspect-square bg-white app-icon-squircle flex items-center justify-center shadow-xl relative p-1.5 ring-1 ring-black/5">
                    <div className="size-full rounded-full border-[2.5px] border-black flex items-center justify-center relative">
                      <div className="size-3 bg-black rounded-full"></div>
                    </div>
                    <div className="absolute bottom-0 right-0 size-4 bg-white rounded-full flex items-center justify-center shadow-xs border border-black/5 scale-[0.85]">
                      <div className="size-3 rounded-full border-[1px] border-black flex items-center justify-center">
                        <span className="text-black font-black text-[5px] scale-75">$</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] text-white font-black drop-shadow-md whitespace-nowrap tracking-tight">Ví của bạn</span>
                </div>
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex flex-col items-center gap-2 opacity-40">
                    <div className="w-full aspect-square bg-white/20 backdrop-blur-md app-icon-squircle"></div>
                  </div>
                ))}
              </div>

              {/* iOS Dock Bar */}
              <div className="absolute bottom-8 left-4 right-4 h-20 bg-white/20 backdrop-blur-2xl rounded-[2.5rem] flex items-center justify-around px-2 border border-white/10 shadow-lg">
                {[1, 2, 3, 4].map(i => <div key={i} className="w-12 h-12 bg-white/40 rounded-[1.25rem]"></div>)}
              </div>
            </div>
          </div>
          <p className="text-[9px] text-center text-gray-400 mt-8 uppercase font-black tracking-[0.3em] opacity-60">Giao diện iOS Home Screen</p>
        </div>

        {/* Design Details Section */}
        <div className="px-6 mt-16 space-y-6">
          <h4 className="text-black dark:text-white text-xl font-black tracking-tight">Chi tiết thiết kế</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 space-y-4">
              <span className="material-symbols-outlined text-black dark:text-white text-3xl fill-1">branding_watermark</span>
              <div className="space-y-1">
                <h5 className="font-black text-sm dark:text-white tracking-tight">Tên ứng dụng</h5>
                <p className="text-[11px] text-gray-400 font-bold leading-relaxed">Cập nhật thành 'Ví của bạn' đồng bộ thương hiệu</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 space-y-4">
              <span className="material-symbols-outlined text-black dark:text-white text-3xl">balance</span>
              <div className="space-y-1">
                <h5 className="font-black text-sm dark:text-white tracking-tight">Cân bằng</h5>
                <p className="text-[11px] text-gray-400 font-bold leading-relaxed">Đồng xu được thu nhỏ, đặt khéo léo ở góc</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Bottom Action */}
      <footer className="p-8 pb-14 bg-white/95 dark:bg-black/95 backdrop-blur-md border-t border-gray-100 dark:border-white/5 flex flex-col items-center gap-6">
        <button className="w-full h-18 bg-[#121212] dark:bg-white text-white dark:text-black rounded-[2rem] font-black text-base shadow-2xl active-scale flex items-center justify-center gap-3 tracking-[0.1em] uppercase">
          <span className="material-symbols-outlined text-[24px]">download</span>
          Tải xuống Icon (.PNG / .SVG)
        </button>
        <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] cursor-pointer hover:text-black dark:hover:text-white transition-colors underline-offset-4 underline decoration-gray-200">
          Hướng dẫn sử dụng Logo
        </p>
      </footer>
    </div>
  );
};

export default AppIconSelection;
