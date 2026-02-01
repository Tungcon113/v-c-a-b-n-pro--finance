
import React, { useRef } from 'react';

interface EditProfilePictureProps {
  onBack: () => void;
  onSelectImage: (base64: string) => void;
  onDeleteImage: () => void;
  profileImage: string;
}

const EditProfilePicture: React.FC<EditProfilePictureProps> = ({ onBack, onSelectImage, onDeleteImage, profileImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onSelectImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-white dark:bg-black animate-in fade-in duration-300">
      {/* Top Bar */}
      <header className="flex items-center p-4 sticky top-0 bg-white dark:bg-black z-10">
        <button onClick={onBack} className="flex size-12 items-center justify-center text-black dark:text-white active-scale">
          <span className="material-symbols-outlined text-[28px]">arrow_back_ios</span>
        </button>
        <h2 className="flex-1 text-center text-lg font-bold dark:text-white pr-12">
          Chỉnh sửa Ảnh đại diện
        </h2>
      </header>

      {/* Profile Image with Camera overlay */}
      <div className="flex flex-col items-center justify-center py-10">
        <div className="relative">
          <div className="size-52 rounded-full border-4 border-white dark:border-zinc-800 shadow-xl overflow-hidden bg-gray-100">
            <img src={profileImage} className="w-full h-full object-cover" alt="Current Avatar" />
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-3 right-3 size-14 rounded-full bg-accent text-white flex items-center justify-center border-4 border-white dark:border-zinc-800 shadow-lg active-scale"
          >
            <span className="material-symbols-outlined text-[26px]">photo_camera</span>
          </button>
        </div>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />

      {/* Action List */}
      <div className="flex-1 px-4 space-y-2">
        <ActionButton 
          icon="add_a_photo" 
          label="Chụp ảnh mới" 
          onClick={() => fileInputRef.current?.click()} 
        />
        <ActionButton 
          icon="image" 
          label="Chọn từ thư viện" 
          onClick={() => fileInputRef.current?.click()} 
        />
        <ActionButton 
          icon="delete" 
          label="Xóa ảnh hiện tại" 
          destructive 
          onClick={onDeleteImage} 
        />
      </div>

      {/* Bottom Footer */}
      <div className="p-6 pb-12">
        <button onClick={onBack} className="w-full h-16 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-lg shadow-xl active-scale transition-all">
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, destructive, onClick }: any) => (
  <div onClick={onClick} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-[1.5rem] cursor-pointer active:bg-gray-100 dark:active:bg-zinc-800 transition-colors">
    <div className="flex items-center gap-4">
      <div className={`size-11 rounded-full flex items-center justify-center ${destructive ? 'bg-rose-50 text-rose-500 dark:bg-rose-900/20' : 'bg-accent/10 text-accent dark:bg-accent/20'}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <p className={`text-base font-bold ${destructive ? 'text-rose-500' : 'dark:text-white'}`}>{label}</p>
    </div>
    <span className="material-symbols-outlined text-gray-300">chevron_right</span>
  </div>
);

export default EditProfilePicture;
