
import React from 'react';

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-[340px] bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col p-8 text-center animate-in zoom-in-95 duration-200">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 dark:bg-zinc-800 mx-auto">
          <span className="material-symbols-outlined text-black dark:text-white text-3xl">logout</span>
        </div>
        
        <h4 className="text-black dark:text-white text-xl font-bold leading-tight mb-3">Đăng xuất?</h4>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed mb-8">
          Bạn có chắc chắn muốn đăng xuất khỏi tài khoản của <span className="text-black dark:text-white font-bold">sếp Tùng</span> không?
        </p>

        <div className="flex flex-col gap-3">
          <button 
            onClick={onConfirm}
            className="h-14 w-full rounded-2xl bg-black dark:bg-white text-white dark:text-black font-bold active-scale transition-all"
          >
            Đăng xuất
          </button>
          <button 
            onClick={onCancel}
            className="h-14 w-full rounded-2xl bg-transparent border border-gray-200 dark:border-zinc-700 text-black dark:text-white font-bold active-scale transition-all"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
