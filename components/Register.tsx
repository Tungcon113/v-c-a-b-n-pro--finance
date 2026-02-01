
import React, { useState } from 'react';

interface RegisterProps {
  onBack: () => void;
  onRegister: (data: any) => void;
  onGoToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onBack, onRegister, onGoToLogin }) => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirm: '' });

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (formData.password !== formData.confirm) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }
    onRegister(formData);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-white dark:bg-zinc-950 px-6 animate-in slide-in-from-right duration-300">
      <div className="flex items-center py-6">
        <button onClick={onBack} className="text-black dark:text-white size-10 flex items-center justify-start active-scale">
          <span className="material-symbols-outlined text-2xl font-bold">arrow_back_ios</span>
        </button>
      </div>

      <div className="pb-8 pt-4">
        <h1 className="text-black dark:text-white tracking-tight text-[32px] font-black leading-tight">Tạo tài khoản mới</h1>
        <p className="text-gray-500 dark:text-gray-400 text-base mt-2">Bắt đầu hành trình quản lý tài chính thông minh ngay hôm nay.</p>
      </div>

      <div className="flex flex-col gap-6">
        <InputField 
          label="Họ và tên" 
          placeholder="Nhập họ và tên của bạn" 
          value={formData.fullName}
          onChange={(v) => setFormData({...formData, fullName: v})}
        />
        <InputField 
          label="Email" 
          placeholder="example@email.com" 
          type="email"
          value={formData.email}
          onChange={(v) => setFormData({...formData, email: v})}
        />
        <InputField 
          label="Mật khẩu" 
          placeholder="••••••••" 
          type="password"
          value={formData.password}
          onChange={(v) => setFormData({...formData, password: v})}
        />
        <InputField 
          label="Xác nhận mật khẩu" 
          placeholder="••••••••" 
          type="password"
          value={formData.confirm}
          onChange={(v) => setFormData({...formData, confirm: v})}
        />
      </div>

      <div className="mt-12">
        <button 
          onClick={handleSubmit}
          className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black text-lg active-scale shadow-xl shadow-black/10 transition-all"
        >
          Đăng ký ngay
        </button>
      </div>

      <div className="mt-auto pb-10 text-center">
        <p className="text-gray-500 text-sm font-medium">
          Đã có tài khoản? <span onClick={onGoToLogin} className="text-black dark:text-white font-black cursor-pointer hover:underline ml-1">Đăng nhập</span>
        </p>
      </div>
    </div>
  );
};

const InputField = ({ label, placeholder, type = "text", value, onChange }: any) => (
  <div className="flex flex-col w-full border-b border-gray-100 dark:border-white/5 pb-1">
    <p className="text-black dark:text-white text-[10px] font-black uppercase tracking-[0.2em] mb-1">{label}</p>
    <input 
      className="w-full bg-transparent border-none p-0 h-12 text-lg focus:ring-0 dark:text-white placeholder:text-gray-300" 
      placeholder={placeholder} 
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default Register;
