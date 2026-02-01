
import React from 'react';

interface SuccessScreenProps {
  onStart: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ onStart }) => {
  return (
    <div className="flex h-screen w-full flex-col bg-white dark:bg-zinc-950 px-6 items-center justify-center animate-in zoom-in-95 duration-500">
      <div className="relative flex items-center justify-center w-full mb-12">
        <div className="absolute w-64 h-64 border border-black/5 dark:border-white/5 rounded-full animate-ping duration-[3s]"></div>
        <div className="absolute w-48 h-48 border border-black/10 dark:border-white/10 rounded-full"></div>
        <div className="relative w-40 h-40 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-xl overflow-hidden border border-zinc-100 dark:border-zinc-700">
          <div 
            className="w-full h-full bg-center bg-no-repeat bg-cover" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCVjTujGaGQUR3Laej8B2Oilua5e-NmBA1HV5IRdYUqPEpMh_3NtmrccXt8bOxvRHeElGQNQ4bOwOcReM2LQtp7YU2PMgkTnm-fVRAS0U6lgVXYmCUSMBsWI31aQktRql_4fTHfg7wn94Yc36hfj2VY9Y8vV1QGGEARFQTS7fsgUH2Rk0XldICBaDjOuYq0wWiORgJZGwU9KSQcTaYu9CB5MU8tG55NhsBuqECx10nZXRXghAzMJB0Bir9q3PMxQ9t56lHjU36UW3cb")' }}
          ></div>
        </div>
      </div>

      <div className="text-center space-y-2 mb-12">
        <h1 className="text-black dark:text-white tracking-[0.1em] text-[32px] font-black leading-tight uppercase">CHÚC MỪNG!</h1>
        <p className="text-gray-400 text-lg font-bold leading-normal px-8">Tài khoản của bạn đã sẵn sàng</p>
      </div>

      <div className="w-full mt-auto pb-12">
        <button 
          onClick={onStart}
          className="w-full h-16 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black text-lg shadow-xl active-scale"
        >
          Bắt đầu ngay
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
