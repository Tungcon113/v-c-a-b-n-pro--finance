
import React from 'react';

interface WelcomeScreenProps {
  onLogin: () => void;
  onSignUp: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLogin, onSignUp }) => {
  return (
    <div className="relative flex h-screen w-full flex-col bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-hidden">
      {/* Background decoration - subtle gradients */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-blue-50/50 dark:bg-blue-900/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[60%] h-[60%] bg-gray-50/50 dark:bg-slate-900/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 animate-in fade-in zoom-in duration-700">
        {/* Logo Squircle */}
        <div className="w-32 h-32 mb-10 flex items-center justify-center rounded-[40px] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-none transition-transform hover:scale-105 duration-500">
          <span className="material-symbols-outlined text-[72px] text-black dark:text-white font-extralight">visibility</span>
        </div>
        
        {/* Branding Text */}
        <div className="text-center space-y-3">
          <h1 className="text-black dark:text-white tracking-[0.25em] text-4xl font-black leading-tight uppercase">
            VÍ CỦA BẠN
          </h1>
          <div className="flex flex-col items-center gap-1">
             <div className="h-[2px] w-8 bg-black dark:bg-white mb-1 opacity-20"></div>
             <p className="text-gray-400 dark:text-gray-500 text-[10px] font-black tracking-[0.3em] uppercase">
               Thông minh • Tối giản • Hiệu quả
             </p>
          </div>
        </div>
      </div>

      {/* Action Area - Bottom Aligned */}
      <div className="w-full max-w-sm mx-auto px-8 pb-14 space-y-8 animate-in slide-in-from-bottom duration-700 delay-100">
        
        {/* Buttons Group */}
        <div className="flex flex-col gap-3.5">
          <button 
            onClick={onLogin}
            className="w-full h-16 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-black/10 active-scale transition-all"
          >
            Đăng nhập
          </button>
          
          <button 
            onClick={onSignUp}
            className="w-full h-16 bg-transparent border-2 border-black dark:border-white text-black dark:text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] active-scale transition-all"
          >
            Đăng ký
          </button>
        </div>

        {/* Download Section */}
        <div className="flex flex-col items-center gap-5">
           <div className="flex items-center gap-3 w-full">
              <div className="h-px flex-1 bg-gray-100 dark:bg-white/5"></div>
              <p className="text-[9px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-[0.25em]">Tải ứng dụng cho</p>
              <div className="h-px flex-1 bg-gray-100 dark:bg-white/5"></div>
           </div>

           <div className="flex items-center justify-center gap-10">
              <button className="flex flex-col items-center gap-1.5 group active-scale">
                <div className="size-11 rounded-full bg-gray-50 dark:bg-zinc-900 flex items-center justify-center border border-gray-100 dark:border-white/5 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                  <svg viewBox="0 0 384 512" className="w-5 h-5 fill-current">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                  </svg>
                </div>
                <span className="text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">iOS</span>
              </button>

              <button className="flex flex-col items-center gap-1.5 group active-scale">
                <div className="size-11 rounded-full bg-gray-50 dark:bg-zinc-900 flex items-center justify-center border border-gray-100 dark:border-white/5 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                  <svg viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 32.8c-5.8 5.4-9 13.9-9 24v398.5c0 10.1 3.2 18.6 9 24L285.6 256 47 32.8zm338.4 361.9L104.6 499l220.7-121.3 60.1-60.1zM348.3 256l60.1-60.1 63 36.1c11.6 6.6 18.6 16.3 18.6 24s-7 17.4-18.6 24l-63 36.1L348.3 256z"/>
                  </svg>
                </div>
                <span className="text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Android</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
