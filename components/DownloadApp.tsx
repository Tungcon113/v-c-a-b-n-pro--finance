
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
        <h2 className="flex-1 text-center text-lg font-black dark:text-white">Tải ứng dụng Mobile</h2>
        <div className="size-12"></div>
      </header>

      <main className="flex-1 overflow-y-auto hide-scrollbar p-6">
        <div className="text-center py-8">
          <div className="w-24 h-24 bg-black dark:bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-black/10">
            <span className="material-symbols-outlined text-white dark:text-black text-5xl">visibility</span>
          </div>
          <h1 className="text-2xl font-black dark:text-white mb-2">Ví của bạn trên Mobile</h1>
          <p className="text-gray-400 text-sm font-medium leading-relaxed px-4">
            Trải nghiệm quản lý tài chính mượt mà hơn với ứng dụng native, hỗ trợ FaceID và thông báo thời gian thực.
          </p>
        </div>

        {/* Store Buttons */}
        <div className="flex flex-col gap-4 mt-4">
          <StoreButton 
            platform="iOS" 
            label="Download on the" 
            storeName="App Store" 
            icon="apple" 
            qrCode="qr_code_2"
          />
          <StoreButton 
            platform="Android" 
            label="Get it on" 
            storeName="Google Play" 
            icon="google" 
            qrCode="qr_code_scanner"
          />
        </div>

        {/* Feature List */}
        <div className="mt-12 space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-2">Tại sao nên dùng App?</h3>
          <div className="grid grid-cols-1 gap-4">
            <FeatureItem icon="fingerprint" title="Bảo mật sinh trắc học" desc="Mở khóa nhanh bằng FaceID hoặc vân tay." />
            <FeatureItem icon="notifications_active" title="Thông báo tức thì" desc="Nhắc nhở chi tiêu và cập nhật số dư ngay lập tức." />
            <FeatureItem icon="cloud_sync" title="Đồng bộ đám mây" desc="Dữ liệu luôn an toàn và đồng bộ trên mọi thiết bị." />
          </div>
        </div>
      </main>

      <footer className="p-8 text-center">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
          Phiên bản hiện tại v1.0.1 (Stable)<br/>
          Phát triển bởi Nmap Team
        </p>
      </footer>
    </div>
  );
};

const StoreButton = ({ platform, label, storeName, icon, qrCode }: any) => (
  <div className="bg-gray-50 dark:bg-zinc-900 rounded-[2.5rem] p-6 flex items-center justify-between border border-gray-100 dark:border-white/5 active-scale cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className="size-14 rounded-2xl bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-lg">
        {icon === 'apple' ? (
          <svg viewBox="0 0 384 512" className="w-7 h-7 fill-current">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
          </svg>
        ) : (
          <svg viewBox="0 0 512 512" className="w-7 h-7 fill-current">
            <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 32.8c-5.8 5.4-9 13.9-9 24v398.5c0 10.1 3.2 18.6 9 24L285.6 256 47 32.8zm338.4 361.9L104.6 499l220.7-121.3 60.1-60.1zM348.3 256l60.1-60.1 63 36.1c11.6 6.6 18.6 16.3 18.6 24s-7 17.4-18.6 24l-63 36.1L348.3 256z"/>
          </svg>
        )}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</p>
        <p className="text-lg font-black dark:text-white leading-tight">{storeName}</p>
      </div>
    </div>
    <div className="size-12 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-white/5">
      <span className="material-symbols-outlined text-gray-400 group-hover:text-accent transition-colors">{qrCode}</span>
    </div>
  </div>
);

const FeatureItem = ({ icon, title, desc }: any) => (
  <div className="flex gap-4 items-start px-2">
    <div className="size-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
      <span className="material-symbols-outlined text-xl">{icon}</span>
    </div>
    <div>
      <h4 className="font-black text-sm dark:text-white leading-tight mb-1">{title}</h4>
      <p className="text-xs text-gray-500 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default DownloadApp;
