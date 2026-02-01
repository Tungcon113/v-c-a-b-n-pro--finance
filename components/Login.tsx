
import React, { useState } from 'react';

interface LoginProps {
  onBack: () => void;
  onLogin: (email: string, pass: string) => void;
  onGoToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onBack, onLogin, onGoToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col bg-white dark:bg-zinc-950 px-6 animate-in slide-in-from-right duration-300">
      <div className="flex items-center py-6">
        <button onClick={onBack} className="text-black dark:text-white size-10 flex items-center justify-start active-scale">
          <span className="material-symbols-outlined text-2xl font-bold">arrow_back_ios</span>
        </button>
      </div>

      <div className="pb-10 pt-4">
        <h1 className="text-black dark:text-white tracking-tight text-[32px] font-black leading-tight">Chào mừng trở lại</h1>
        <p className="text-gray-500 dark:text-gray-400 text-base mt-2">Quản lý tài chính cá nhân một cách thông minh.</p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col w-full border-b border-gray-100 dark:border-white/5 pb-1">
          <p className="text-black dark:text-white text-[10px] font-black uppercase tracking-[0.2em] mb-1">Email</p>
          <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-none p-0 h-12 text-lg focus:ring-0 dark:text-white placeholder:text-gray-300" 
            placeholder="name@example.com" 
            type="email"
          />
        </div>

        <div className="flex flex-col w-full border-b border-gray-100 dark:border-white/5 pb-1">
          <p className="text-black dark:text-white text-[10px] font-black uppercase tracking-[0.2em] mb-1">Mật khẩu</p>
          <div className="relative flex items-center">
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-none p-0 h-12 text-lg focus:ring-0 dark:text-white placeholder:text-gray-300 pr-10" 
              placeholder="••••••••" 
              type={showPass ? "text" : "password"}
            />
            <span 
              onClick={() => setShowPass(!showPass)}
              className={`material-symbols-outlined absolute right-0 cursor-pointer transition-colors ${showPass ? 'text-black dark:text-white' : 'text-gray-300'}`}
            >
              {showPass ? 'visibility' : 'visibility_off'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <p className="text-gray-400 text-sm font-bold hover:text-black dark:hover:text-white cursor-pointer transition-colors">Quên mật khẩu?</p>
      </div>

      <div className="mt-12">
        <button 
          onClick={() => onLogin(email, password)}
          className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black text-lg active-scale shadow-xl shadow-black/10 transition-all"
        >
          Đăng nhập
        </button>
      </div>

      <div className="flex items-center my-10 gap-4">
        <div className="h-[1px] flex-1 bg-gray-100 dark:bg-white/5"></div>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Hoặc đăng nhập với</p>
        <div className="h-[1px] flex-1 bg-gray-100 dark:bg-white/5"></div>
      </div>

      <div className="flex justify-center gap-6">
        <SocialButton icon="https://www.google.com/favicon.ico" />
        <SocialButton icon="apple" isIcon />
      </div>

      <div className="mt-auto pb-10 text-center">
        <p className="text-gray-500 text-sm font-medium">
          Chưa có tài khoản? <span onClick={onGoToRegister} className="text-black dark:text-white font-black cursor-pointer hover:underline ml-1">Đăng ký ngay</span>
        </p>
      </div>
    </div>
  );
};

const SocialButton = ({ icon, isIcon }: any) => (
  <button className="flex items-center justify-center size-14 rounded-full border border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors active-scale">
    {isIcon ? (
      <span className="material-symbols-outlined text-2xl font-bold dark:text-white">{icon}</span>
    ) : (
      <img src={icon} className="size-6 grayscale" alt="social" />
    )}
  </button>
);

export default Login;
