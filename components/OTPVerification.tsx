
import React, { useState, useEffect, useRef } from 'react';

interface OTPVerificationProps {
  email: string;
  onVerify: () => void;
  onBack: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ email, onVerify, onBack }) => {
  const [timer, setTimer] = useState(59);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  // Focus ô đầu tiên khi vào màn hình
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Tự động chuyển sang ô tiếp theo
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirm = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      alert("Vui lòng nhập đủ 6 số!");
      return;
    }
    // Cho phép mọi mã trong bản demo, hoặc sếp có thể quy định là 123456
    onVerify();
  };

  return (
    <div className="flex h-screen w-full flex-col bg-white dark:bg-zinc-950 px-6 animate-in slide-in-from-right duration-300">
      <div className="flex items-center py-6">
        <button onClick={onBack} className="text-black dark:text-white size-10 flex items-center justify-start active-scale">
          <span className="material-symbols-outlined text-2xl font-bold">arrow_back</span>
        </button>
      </div>

      <div className="pb-2 pt-4">
        <h1 className="text-black dark:text-white text-3xl font-black leading-tight tracking-tight">Xác thực mã OTP</h1>
      </div>
      
      <p className="text-gray-400 text-base font-medium leading-relaxed max-w-[280px] mb-8">
        Vui lòng nhập mã 6 số đã được gửi đến <span className="text-black dark:text-white font-bold">{email}</span>
      </p>

      {/* Demo hint */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl mb-8 border border-blue-100 dark:border-blue-800/30 flex items-center gap-3">
        <span className="material-symbols-outlined text-blue-500">info</span>
        <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
          Vì đây là bản Demo, sếp có thể nhập bất kỳ mã 6 số nào (Vd: 123456) để tiếp tục.
        </p>
      </div>

      <div className="flex justify-between mb-12 gap-2">
        {otp.map((digit, i) => (
          <input 
            key={i}
            // Fix: React ref callback should return void or a cleanup function. 
            // Wrapping assignment in braces prevents returning the assigned element.
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text" 
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="w-full h-16 text-center text-2xl font-black bg-transparent border-0 border-b-2 border-gray-100 dark:border-white/10 focus:border-black dark:focus:border-white focus:ring-0 dark:text-white transition-all"
            placeholder="-"
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-gray-400 text-sm font-bold">Không nhận được mã?</p>
        <button 
          onClick={() => setTimer(59)}
          disabled={timer > 0}
          className={`text-sm font-black uppercase tracking-widest ${timer > 0 ? 'text-gray-300' : 'text-black dark:text-white hover:underline'}`}
        >
          {timer > 0 ? `Gửi lại sau ${timer}s` : 'Gửi lại mã ngay'}
        </button>
      </div>

      <div className="mt-auto pb-12">
        <button 
          onClick={handleConfirm}
          className="w-full h-16 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black text-lg shadow-xl active-scale"
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
