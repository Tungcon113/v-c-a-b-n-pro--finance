
import React from 'react';
import { UserProfile, Language, Currency } from '../types';

interface SettingsProps {
  onLogoutRequest: () => void;
  onEditProfile: () => void;
  onEditPicture: () => void;
  onLanguage: () => void;
  onCurrency: () => void;
  onChangePassword: () => void;
  onWidgetConfig: () => void;
  onAppIcon: () => void;
  onDownloadApp: () => void;
  profileImage: string;
  userProfile: UserProfile;
  language: Language;
  currency: Currency;
}

const Settings: React.FC<SettingsProps> = ({ 
  onLogoutRequest, 
  onEditProfile, 
  onEditPicture,
  onLanguage,
  onCurrency,
  onChangePassword,
  onWidgetConfig,
  onAppIcon,
  onDownloadApp,
  profileImage, 
  userProfile,
  language,
  currency
}) => {
  const isVi = language === 'vi';

  return (
    <div className="animate-in fade-in duration-500">
      <header className="p-6 text-center border-b border-gray-50 dark:border-white/5 sticky top-0 bg-white/90 dark:bg-black/90 backdrop-blur-md z-40">
        <h2 className="text-lg font-bold dark:text-white">{isVi ? 'Cài đặt' : 'Settings'}</h2>
      </header>

      <div className="p-4 space-y-6">
        {/* Profile Card Summary */}
        <section className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 flex items-center gap-4 border border-gray-50 dark:border-white/5 shadow-sm active-scale cursor-pointer" onClick={onEditPicture}>
          <div className="size-16 rounded-full overflow-hidden border-2 border-accent/20 p-1">
            <img src={profileImage} className="w-full h-full rounded-full object-cover" alt="Profile" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-extrabold dark:text-white leading-tight">{userProfile.fullName}</h3>
            <p className="text-xs text-gray-400 font-medium tracking-wide">{userProfile.email}</p>
          </div>
          <span className="material-symbols-outlined text-gray-300">photo_camera</span>
        </section>

        <section>
          <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 px-2">{isVi ? 'Tài khoản' : 'Account'}</h3>
          <div className="bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-gray-50 dark:border-white/5 shadow-sm">
            <SettingsItem icon="person" label={isVi ? "Thông tin cá nhân" : "Personal Information"} onClick={onEditProfile} />
            <SettingsItem icon="lock" label={isVi ? "Đổi mật khẩu" : "Change Password"} onClick={onChangePassword} />
            <SettingsItem icon="widgets" label={isVi ? "Widget màn hình khóa" : "Lock Screen Widgets"} onClick={onWidgetConfig} />
            <SettingsItem icon="auto_awesome" label={isVi ? "Biểu tượng ứng dụng" : "App Icon"} onClick={onAppIcon} />
            <SettingsItem icon="install_mobile" label={isVi ? "Tải ứng dụng Mobile" : "Download App"} onClick={onDownloadApp} />
          </div>
        </section>

        <section>
          <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 px-2">{isVi ? 'Tùy chỉnh' : 'Preferences'}</h3>
          <div className="bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm">
            <SettingsItem icon="payments" label={isVi ? "Tiền tệ" : "Currency"} value={currency} onClick={onCurrency} />
            <SettingsItem icon="language" label={isVi ? "Ngôn ngữ" : "Language"} value={isVi ? "Tiếng Việt" : "English"} onClick={onLanguage} />
            <SettingsItem icon="palette" label={isVi ? "Chế độ tối" : "Dark Mode"} />
          </div>
        </section>

        <div className="pt-8 px-2">
          <button 
            onClick={onLogoutRequest}
            className="w-full flex items-center justify-center gap-3 border-2 border-rose-500 text-rose-500 py-4 rounded-2xl font-bold active-scale transition-all uppercase"
          >
            <span className="material-symbols-outlined font-bold">logout</span>
            {isVi ? 'ĐĂNG XUẤT' : 'LOGOUT'}
          </button>
          <p className="text-center text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-8">Nmap Finance v1.0.1</p>
        </div>
      </div>
    </div>
  );
};

const SettingsItem = ({ icon, label, value, onClick }: { icon: string, label: string, value?: string, onClick?: () => void }) => (
  <div onClick={onClick} className="flex items-center justify-between p-4 border-b border-gray-50 dark:border-white/5 last:border-0 active:bg-gray-50 dark:active:bg-zinc-800 transition-colors cursor-pointer">
    <div className="flex items-center gap-4">
      <div className="size-10 rounded-xl bg-gray-50 dark:bg-zinc-800 flex items-center justify-center text-black dark:text-white">
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </div>
      <span className="text-sm font-bold dark:text-white">{label}</span>
    </div>
    <div className="flex items-center gap-1 text-gray-400">
      {value && <span className="text-xs font-bold mr-1 text-accent">{value}</span>}
      <span className="material-symbols-outlined text-lg">chevron_right</span>
    </div>
  </div>
);

export default Settings;
