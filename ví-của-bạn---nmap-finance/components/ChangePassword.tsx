
import React, { useState } from 'react';

interface ChangePasswordProps {
  onBack: () => void;
  onSave: (newPass: string) => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onBack, onSave }) => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleSave = () => {
    if (!oldPass || !newPass || !confirmPass) {
      alert("Vui lòng nhập đầy đủ các trường!");
      return;
    }
    if (newPass !== confirmPass) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    if (newPass.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }
    // Truyền mật khẩu mới về App.tsx để lưu vào localStorage
    onSave(newPass);
    alert("Đã đổi mật khẩu thành công! Hãy ghi nhớ mật khẩu mới của sếp.");
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black animate-in slide-in-from-right duration-300">
      <header className="p-4 flex items-center border-b border-gray-50 dark:border-white/5">
        <button onClick={onBack} className="p-2 active-scale"><span className="material-symbols-outlined">arrow_back_ios_new</span></button>
        <h2 className="flex-1 text-center font-bold text-lg dark:text-white pr-8">Đổi mật khẩu</h2>
      </header>

      <main className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-1">Mật khẩu hiện tại</label>
            <input 
              type="password"
              value={oldPass}
              onChange={(e) => setOldPass(e.target.value)}
              className="w-full h-14 bg-gray-50 dark:bg-zinc-900 border-none rounded-2xl px-5 focus:ring-2 focus:ring-accent dark:text-white"
              placeholder="••••••••"
            />
          </div>

          <div className="h-px bg-gray-100 dark:bg-white/5 my-2"></div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-1">Mật khẩu mới</label>
            <input 
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full h-14 bg-gray-50 dark:bg-zinc-900 border-none rounded-2xl px-5 focus:ring-2 focus:ring-accent dark:text-white"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-1">Xác nhận mật khẩu mới</label>
            <input 
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full h-14 bg-gray-50 dark:bg-zinc-900 border-none rounded-2xl px-5 focus:ring-2 focus:ring-accent dark:text-white"
              placeholder="••••••••"
            />
          </div>
        </div>
      </main>

      <footer className="p-6 pb-12">
        <button 
          onClick={handleSave}
          className="w-full h-16 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-lg shadow-xl active-scale"
        >
          Cập nhật mật khẩu
        </button>
      </footer>
    </div>
  );
};

export default ChangePassword;
