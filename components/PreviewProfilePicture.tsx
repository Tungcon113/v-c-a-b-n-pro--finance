
import React from 'react';

interface PreviewProfilePictureProps {
  onBack: () => void;
  onSave: () => void;
  profileImage: string;
}

const PreviewProfilePicture: React.FC<PreviewProfilePictureProps> = ({ onBack, onSave, profileImage }) => {
  return (
    <div className="flex h-screen flex-col bg-white dark:bg-black animate-in fade-in duration-300">
      {/* Top Bar */}
      <header className="flex items-center p-4 sticky top-0 bg-white dark:bg-black z-10">
        <button onClick={onBack} className="flex size-12 items-center justify-center text-black dark:text-white active-scale">
          <span className="material-symbols-outlined text-[28px]">arrow_back_ios</span>
        </button>
        <h2 className="flex-1 text-center text-lg font-bold dark:text-white pr-12">
          Xem trước Ảnh đại diện
        </h2>
      </header>

      {/* Preview Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="relative">
          <div className="size-64 rounded-full border-2 border-gray-100 dark:border-zinc-800 shadow-2xl overflow-hidden">
            <img src={profileImage} className="w-full h-full object-cover" alt="Preview" />
          </div>
          <div className="absolute bottom-4 right-4 size-10 rounded-full bg-white dark:bg-zinc-800 text-black dark:text-white flex items-center justify-center border border-gray-200 dark:border-white/10 shadow-md">
            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex gap-4 mt-12 w-full max-w-xs">
          <button 
            onClick={onBack}
            className="flex-1 h-12 flex items-center justify-center rounded-full border border-black dark:border-white text-black dark:text-white font-bold text-sm active-scale"
          >
            Chọn lại
          </button>
          <button 
            className="flex-1 h-12 flex items-center justify-center rounded-full border border-black dark:border-white text-black dark:text-white font-bold text-sm active-scale"
          >
            Cắt ảnh
          </button>
        </div>
      </div>

      {/* Helper Text (Disabled style like mockup) */}
      <div className="px-6 py-4 opacity-40 pointer-events-none border-t border-gray-50 dark:border-white/5">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-gray-400">add_a_photo</span>
            <span className="text-sm font-bold">Chụp ảnh mới</span>
          </div>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
        </div>
      </div>

      {/* Save Button */}
      <div className="p-6 pb-12">
        <button onClick={onSave} className="w-full h-16 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-lg shadow-xl active-scale transition-all">
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default PreviewProfilePicture;
