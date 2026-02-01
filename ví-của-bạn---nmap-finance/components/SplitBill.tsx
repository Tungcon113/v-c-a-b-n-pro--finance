
import React, { useState } from 'react';

interface SplitBillProps {
  onBack: () => void;
  onScanClick: () => void;
}

interface Member {
  id: string;
  name: string;
  avatar: string;
  isMe?: boolean;
}

interface BillItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  assignedTo: string[]; // IDs of members
  icon: string;
}

const SplitBill: React.FC<SplitBillProps> = ({ onBack, onScanClick }) => {
  const [members] = useState<Member[]>([
    { id: 'me', name: 'Tôi', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAszbWs1SfPJ8oku0HYd4KcndH0uwbbamiDHdWVMudSMD_t_wmZlDmPgqRsNwNfAsb9XDsHYX3MgTmph2f8zUJjW4JSgyQ9OKFEjikKbGMiVkLgat_30Kk77DN0k8B-1Mps3-lXwmHFXqQgymINYIp3OZn3mZqfWRbi4-dUjuXfPrbD66U6OIHIVt2CIm5VtsAjDrpAup42S2RhGYxaFqldqORnTKglzjA3hrYVt_LcC_N1BYcBKGk_Hi_ZkPA1FeLBFtMrNlOjWDkO', isMe: true },
    { id: '1', name: 'Linh', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0q5v9IZKXK645nCYPNbDrBDJkEnFpgpN0Bf2uZxcfjKsub5vfVjrsXPeBe3RknGYilXNA-cYt7nSBuE6NYEP9CJsKFub8WvQH11mg2YHfVYpT_rht_wxxLk7DH86wTwcjhlU_3P-95f3HEqxbLaaSobHzJXHqDQcum0SVzkOCcyE4vtXO1qeN357St8BpYbdsLebDAKxhI2k332j5v4n-YYQqRYFkuDWwHOFsCae7PjDrMZax2ghBN0D_ZVN1s4SkSllr5ZDU2MAl' },
    { id: '2', name: 'Tuấn', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlGxCIJ7X0yCd_LBo5X5HJCoWP8k28eIeKEG-yIeOgAhlZYM7l5IekFv1p0vRaj216htwaMYxkddErlaihYDs7VN2l5lkp9tqgKHdPrkpkMmJCkScQKDny3yMV4Qq5FjLFWYuMrVzOv-JsB9Jojixf1IFVti64Fm56SYjzzdadjmT29fY97022OleCeKqVb65VUh6yrO0TOO--T5LlneSvjV_fhGipU7aFZi5k4sbNwG_oIexxCSPSHmtkcLxVkHQggT8bIvEaBvWP' },
    { id: '3', name: 'Hạnh', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAFmc5_BZh0StefiRyzPhNd6kHJe6Cfw0sAZ_n5Ptz7tuBal0gjfQrawzrI0N8dYfv-2Jx9CUOubZRYpOBPMK5myiJ2166vNBzn0PvEpIe80PRO6KNeEP1M2OJ2eLq7pjNgDSgeDh2xMAuaAhwOXRhL7-8tX9Fz1y0EhPrkUO0Ay5hpNyAnF0CyT9n_RLDXO2pD2jIGqwF7-PoCxFhZcQYXbbYJAEWJhtRy_bJmifDHvJ5Txsu4nlne0_i3VUyARqgSoNm3eMlL2hf' },
  ]);

  const [items] = useState<BillItem[]>([
    { id: 'i1', name: 'Phở Bò Đặc Biệt', price: 75000, quantity: 1, assignedTo: ['me'], icon: 'soup_kitchen' },
    { id: 'i2', name: 'Cà Phê Muối', price: 45000, quantity: 2, assignedTo: ['1', '2'], icon: 'coffee' },
    { id: 'i3', name: 'Bánh Mì Chảo', price: 55000, quantity: 1, assignedTo: [], icon: 'bakery_dining' },
    { id: 'i4', name: 'Nước suối', price: 10000, quantity: 4, assignedTo: ['me', '1', '2', '3'], icon: 'water_drop' },
  ]);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;
  const myPart = 85000; // Mocked value
  const remaining = 55000; // Mocked value

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black animate-in fade-in duration-500 overflow-x-hidden">
      {/* TopAppBar */}
      <header className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-black/80 backdrop-blur-md p-4 justify-between border-b border-gray-100 dark:border-white/5">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full active-scale">
          <span className="material-symbols-outlined text-black dark:text-white">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-black leading-tight tracking-tight flex-1 text-center dark:text-white">Chia hóa đơn AI</h2>
        <div className="flex w-10 items-center justify-end">
          <button onClick={onScanClick} className="flex size-10 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 text-black dark:text-white active-scale">
            <span className="material-symbols-outlined">qr_code_scanner</span>
          </button>
        </div>
      </header>

      <main className="flex-1 pb-44 overflow-y-auto hide-scrollbar">
        {/* Group Members Section */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Thành viên ({members.length})</h3>
            <button className="text-accent text-[11px] font-black flex items-center gap-1 uppercase tracking-widest active-scale">
              <span className="material-symbols-outlined !text-[16px] font-bold">person_add</span>
              Thêm
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar py-2">
            {members.map(member => (
              <div key={member.id} className="flex flex-col items-center gap-2 shrink-0">
                <div className={`size-14 rounded-full border-2 p-0.5 transition-all ${member.isMe ? 'border-accent shadow-lg shadow-accent/20' : 'border-gray-100 dark:border-white/10 opacity-60'}`}>
                  <img src={member.avatar} className="size-full rounded-full object-cover" alt={member.name} />
                </div>
                <span className={`text-[10px] font-black tracking-tight ${member.isMe ? 'text-accent' : 'text-gray-400'}`}>
                  {member.isMe ? 'Tôi' : member.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SectionHeader */}
        <div className="bg-gray-50 dark:bg-zinc-900/50 py-3 px-6 flex justify-between items-center mt-4">
          <h3 className="text-black dark:text-white text-[11px] font-black leading-tight tracking-[0.15em] uppercase">Danh sách món ăn</h3>
          <span className="text-[9px] bg-accent/10 text-accent px-2.5 py-1 rounded-full font-black uppercase tracking-wider">AI đã quét</span>
        </div>

        {/* Bill Items List */}
        <div className="divide-y divide-gray-50 dark:divide-white/5">
          {items.map(item => (
            <div key={item.id} className={`flex items-center gap-4 px-6 py-4 justify-between transition-all ${item.assignedTo.length === 0 ? 'bg-accent/5 border-l-4 border-accent' : 'bg-white dark:bg-black'}`}>
              <div className="flex items-center gap-4">
                <div className="text-black dark:text-white flex items-center justify-center rounded-2xl bg-gray-50 dark:bg-zinc-800 shrink-0 size-12 shadow-sm border border-gray-100 dark:border-white/5">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <p className="text-black dark:text-white text-[15px] font-black leading-tight">{item.name}</p>
                  <p className="text-gray-400 text-[11px] font-bold mt-0.5">{item.quantity} x {item.price.toLocaleString('vi-VN')}đ</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-accent text-[15px] font-black">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                {item.assignedTo.length > 0 ? (
                  <div className="flex -space-x-2">
                    {item.assignedTo === members.map(m => m.id) ? (
                       <div className="size-6 rounded-full border-2 border-white dark:border-black bg-gray-200 flex items-center justify-center text-[8px] font-black text-gray-500">ALL</div>
                    ) : (
                      item.assignedTo.map(mid => {
                        const m = members.find(member => member.id === mid);
                        return <img key={mid} src={m?.avatar} className="size-6 rounded-full border-2 border-white dark:border-black object-cover" alt="avatar" />;
                      })
                    )}
                  </div>
                ) : (
                  <span className="text-[10px] text-accent font-black uppercase tracking-widest">Chưa chia</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="px-6 py-6">
          <div className="bg-gray-50 dark:bg-zinc-900/50 rounded-[2rem] p-6 space-y-4 border border-gray-100 dark:border-white/5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Tạm tính</span>
              <span className="font-black dark:text-white">{subtotal.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Phí dịch vụ (5%)</span>
              <span className="font-black dark:text-white">{serviceFee.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="h-px bg-gray-100 dark:bg-white/5"></div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-sm font-black uppercase tracking-[0.2em] dark:text-white">Tổng cộng</span>
              <span className="text-2xl font-black text-accent tracking-tighter">{total.toLocaleString('vi-VN')}đ</span>
            </div>
          </div>
        </div>

        {/* Payment QR Section */}
        <div className="px-6 pb-12">
          <div className="border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-[2.5rem] p-8 flex flex-col items-center gap-5">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Quét để trả cho chủ tiệc</p>
            <div className="bg-white p-4 rounded-3xl shadow-xl shadow-black/5">
              <div className="size-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative rounded-2xl overflow-hidden">
                <span className="material-symbols-outlined !text-[80px] text-gray-200">qr_code_2</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-10 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-50">
                    <span className="material-symbols-outlined text-accent !text-[24px]">account_balance</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-black dark:text-white tracking-wide uppercase">NGUYEN VAN A</p>
              <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">VCB • **** 1234</p>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Footer Summary */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto ios-blur border-t border-gray-100 dark:border-white/5 p-6 pb-10 flex flex-col gap-4 z-50">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest mb-1">Phần của tôi</p>
            <p className="text-3xl font-black dark:text-white tracking-tighter">{myPart.toLocaleString('vi-VN')}đ</p>
          </div>
          <div className="flex items-center bg-rose-50 dark:bg-rose-900/20 px-4 py-2 rounded-2xl shadow-sm">
            <span className="text-[9px] font-black text-rose-400 mr-2 uppercase tracking-widest">CÒN LẠI</span>
            <span className="text-[13px] font-black text-rose-600 uppercase tracking-tight">{remaining.toLocaleString('vi-VN')}đ</span>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="w-full bg-accent hover:bg-accent/90 text-white h-16 rounded-2xl font-black text-base shadow-xl shadow-accent/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest"
        >
          <span>Hoàn tất & Gửi yêu cầu</span>
          <span className="material-symbols-outlined !text-[22px]">send</span>
        </button>
      </footer>
    </div>
  );
};

export default SplitBill;
