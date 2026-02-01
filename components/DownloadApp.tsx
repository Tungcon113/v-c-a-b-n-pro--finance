
import React from 'react';

interface DownloadAppProps {
  onBack: () => void;
}

const DownloadApp: React.FC<DownloadAppProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black animate-in slide-in-from-right duration-300">
      {/* Top Bar */}
      <header className="flex items-center p-4 sticky top-0 bg-white/90 dark:bg-black/90 backdrop-blur-md z-10 border-b border-gray-50 dark:border-white/5">
        <button onClick={onBack} className="flex size-12 items-center justify-center text-black dark:text-white active-scale">
          <span className="material-symbols-outlined text-[28px]">arrow_back</span>
        </button>
        <h2 className="flex-1 text-center text-lg font-black dark:text-white">Cài đặt ứng dụng</h2>
        <div className="size-12"></div>
      </header>

      <main className="flex-1 overflow-y-auto hide-scrollbar p-6">
        <div className="text-center py-8">
          <div className="w-24 h-24 bg-black dark:bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-black/10">
            <span className="material-symbols-outlined text-white dark:text-black text-5xl">visibility</span>
          </div>
          <h1 className="text-2xl font-black dark:text-white mb-2">Cài đặt vào điện thoại</h1>
          <p className="text-gray-400 text-sm font-medium leading-relaxed px-4">
            Sếp Tùng ơi, hãy làm theo hướng dẫn dưới đây để đưa app ra màn hình chính, dùng mượt mà không cần trình duyệt nhé!
          </p>
        </div>

        {/* Real Installation Guides */}
        <div className="space-y-6 mt-4">
          <section className="bg-gray-50 dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/5 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
               <div className="size-10 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-md">
                 <svg viewBox="0 0 384 512" className="w-5 h-5 fill-current"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
               </div>
               <h3 className="text-lg font-black dark:text-white">Dành cho iPhone</h3>
            </div>
            
            <div className="space-y-4">
              <Step number="1" text="Mở ứng dụng bằng trình duyệt Safari" />
              <Step number="2" text="Nhấn vào nút Chia sẻ (Biểu tượng mũi tên lên)" isIcon icon="share" />
              <Step number="3" text="Cuộn xuống và chọn 'Thêm vào MH chính'" isIcon icon="add_box" />
              <Step number="4" text="Nhấn 'Thêm' ở góc trên cùng bên phải" />
            </div>
          </section>

          <section className="bg-gray-50 dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/5 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
               <div className="size-10 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-md">
                 <svg viewBox="0 0 512 512" className="w-5 h-5 fill-current"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 32.8c-5.8 5.4-9 13.9-9 24v398.5c0 10.1 3.2 18.6 9 24L285.6 256 47 32.8zm338.4 361.9L104.6 499l220.7-121.3 60.1-60.1zM348.3 256l60.1-60.1 63 36.1c11.6 6.6 18.6 16.3 18.6 24s-7 17.4-18.6 24l-63 36.1L348.3 256z"/></svg>
               </div>
               <h3 className="text-lg font-black dark:text-white">Dành cho Android</h3>
            </div>
            
            <div className="space-y-4">
              <Step number="1" text="Mở ứng dụng bằng trình duyệt Chrome" />
              <Step number="2" text="Nhấn vào dấu 3 chấm ở góc phải" isIcon icon="more_vert" />
              <Step number="3" text="Chọn 'Cài đặt ứng dụng' hoặc 'Thêm vào MH chính'" />
            </div>
          </section>
        </div>

        <div className="mt-12 p-6 bg-emerald-50 dark:bg-emerald-950/20 rounded-[2rem] border border-emerald-100 dark:border-emerald-500/10">
           <h4 className="text-emerald-600 dark:text-emerald-400 font-black text-xs mb-2 uppercase tracking-widest flex items-center gap-2">
             <span className="material-symbols-outlined text-sm">auto_awesome</span>
             Lợi ích khi cài đặt
           </h4>
           <ul className="text-[11px] text-emerald-700/70 dark:text-emerald-400/60 space-y-2 font-bold leading-relaxed">
             <li>• Mở nhanh tức thì từ màn hình chính.</li>
             <li>• Trải nghiệm toàn màn hình (Full Screen).</li>
             <li>• Không có thanh địa chỉ trình duyệt làm phiền.</li>
             <li>• Tiết kiệm pin và dung lượng hơn.</li>
           </ul>
        </div>
      </main>

      <footer className="p-8 text-center">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
          Nmap Finance PWA v1.0.1 (Stable)<br/>
          Sẵn sàng phục vụ sếp Tùng 🫡
        </p>
      </footer>
    </div>
  );
};

const Step = ({ number, text, isIcon, icon }: any) => (
  <div className="flex items-start gap-4">
    <div className="size-6 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
      <span className="text-[10px] font-black dark:text-white">{number}</span>
    </div>
    <div className="flex-1">
      <p className="text-sm font-bold text-gray-600 dark:text-gray-300 leading-tight">
        {text}
        {isIcon && (
          <span className="material-symbols-outlined text-[18px] align-middle ml-1.5 text-black dark:text-white bg-gray-200/50 dark:bg-white/10 p-1 rounded-lg">{icon}</span>
        )}
      </p>
    </div>
  </div>
);

export default DownloadApp;
