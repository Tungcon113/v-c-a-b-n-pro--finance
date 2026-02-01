
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface PersonalInfoProps {
  profile: UserProfile;
  onBack: () => void;
  onSave: (updated: UserProfile) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ profile, onBack, onSave }) => {
  const [formData, setFormData] = useState<UserProfile>(profile);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black animate-in slide-in-from-right duration-300">
      <header className="p-4 flex items-center sticky top-0 bg-white/90 dark:bg-black/90 backdrop-blur-md z-10 border-b border-gray-50 dark:border-white/5">
        <button onClick={onBack} className="p-2 active-scale"><span className="material-symbols-outlined">arrow_back_ios_new</span></button>
        <h2 className="flex-1 text-center font-bold text-lg dark:text-white pr-8">Thông tin cá nhân</h2>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="space-y-4">
          <InputGroup 
            label="Họ và Tên" 
            value={formData.fullName} 
            onChange={(v) => setFormData({...formData, fullName: v})} 
            placeholder="Nguyễn Văn A" 
          />
          <InputGroup 
            label="Ngày tháng năm sinh" 
            type="date"
            value={formData.dob} 
            onChange={(v) => setFormData({...formData, dob: v})} 
          />
          <InputGroup 
            label="Số CCCD / Định danh" 
            value={formData.cccd} 
            onChange={(v) => setFormData({...formData, cccd: v})} 
            placeholder="038..."
          />
          <InputGroup 
            label="Địa chỉ nhà" 
            value={formData.address} 
            onChange={(v) => setFormData({...formData, address: v})} 
            placeholder="Số nhà, Tên đường..."
          />
          <InputGroup 
            label="Email liên hệ" 
            value={formData.email} 
            onChange={(v) => setFormData({...formData, email: v})} 
            placeholder="email@example.com"
          />
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-2xl border border-amber-100 dark:border-amber-900/40">
           <div className="flex gap-3">
             <span className="material-symbols-outlined text-amber-600">info</span>
             <p className="text-[11px] font-medium text-amber-800 dark:text-amber-200 leading-relaxed">
               Thông tin này được dùng để định danh tài khoản và hỗ trợ các giao dịch ngân hàng liên kết. Hãy đảm bảo thông tin chính xác.
             </p>
           </div>
        </div>
      </main>

      <footer className="p-6 pb-12">
        <button 
          onClick={() => onSave(formData)}
          className="w-full h-16 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-lg shadow-xl active-scale"
        >
          Lưu thông tin
        </button>
      </footer>
    </div>
  );
};

const InputGroup = ({ label, value, onChange, type = "text", placeholder }: any) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-1">{label}</label>
    <input 
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-14 bg-gray-50 dark:bg-zinc-900 border-none rounded-2xl px-5 focus:ring-2 focus:ring-accent dark:text-white text-sm font-bold"
    />
  </div>
);

export default PersonalInfo;
