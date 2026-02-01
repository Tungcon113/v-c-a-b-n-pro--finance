
import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Login from './components/Login';
import Register from './components/Register';
import OTPVerification from './components/OTPVerification';
import SuccessScreen from './components/SuccessScreen';
import Dashboard from './components/Dashboard';
import Analysis from './components/Analysis';
import Assistant from './components/Assistant';
import BudgetManager from './components/BudgetManager';
import Settings from './components/Settings';
import CameraScanner from './components/CameraScanner';
import AddTransaction from './components/AddTransaction';
import LogoutModal from './components/LogoutModal';
import EditProfilePicture from './components/EditProfilePicture';
import PreviewProfilePicture from './components/PreviewProfilePicture';
import PersonalInfo from './components/PersonalInfo';
import ChangePassword from './components/ChangePassword';
import LanguageSelection from './components/LanguageSelection';
import CurrencySelection from './components/CurrencySelection';
import WalletsList from './components/WalletsList';
import SplitBill from './components/SplitBill';
import LockScreenWidget from './components/LockScreenWidget';
import AppIconSelection from './components/AppIconSelection';
import DownloadApp from './components/DownloadApp';
import TransactionVerification from './components/TransactionVerification';
import { Transaction, AppTab, UserProfile, Language, Currency, Wallet, AuthStep } from './types';
import { MOCK_TRANSACTIONS, INITIAL_WALLETS } from './constants';

const USERS_STORAGE_KEY = 'NMAP_USERS_DATA';
const CURRENT_USER_KEY = 'NMAP_LOGGED_IN_EMAIL';

const App: React.FC = () => {
  const [authStep, setAuthStep] = useState<AuthStep>('welcome');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<AppTab>('overview');
  
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [monthlyLimit, setMonthlyLimit] = useState(20000000);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const [language, setLanguage] = useState<Language>('vi');
  const [currency, setCurrency] = useState<Currency>('VND');
  const [profileImage, setProfileImage] = useState('https://picsum.photos/400/400');

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const loggedEmail = localStorage.getItem(CURRENT_USER_KEY);
    
    if (loggedEmail) {
      const user = users.find((u: UserProfile) => u.email === loggedEmail);
      if (user) {
        loadUserData(user);
        setIsAuthenticated(true);
      }
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
      const updatedUsers = users.map((u: UserProfile) => {
        if (u.email === currentUser.email) {
          return {
            ...u,
            fullName: currentUser.fullName,
            dob: currentUser.dob,
            cccd: currentUser.cccd,
            address: currentUser.address,
            password: currentUser.password, 
            wallets,
            transactions,
            monthlyLimit
          };
        }
        return u;
      });
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    }
  }, [transactions, wallets, monthlyLimit, currentUser]);

  const loadUserData = (user: UserProfile) => {
    setCurrentUser(user);
    setTransactions(user.transactions || MOCK_TRANSACTIONS);
    setWallets(user.wallets || INITIAL_WALLETS);
    setMonthlyLimit(user.monthlyLimit || 20000000);
  };

  const handleLogin = (email: string, pass: string) => {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const user = users.find((u: UserProfile) => u.email === email && u.password === pass);
    
    if (user) {
      loadUserData(user);
      localStorage.setItem(CURRENT_USER_KEY, email);
      setIsAuthenticated(true);
    } else {
      alert("Email hoặc mật khẩu không chính xác!");
    }
  };

  const handleRegister = (data: any) => {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    if (users.some((u: UserProfile) => u.email === data.email)) {
      alert("Email này đã được đăng ký!");
      return;
    }

    const newUser: UserProfile = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      dob: '', cccd: '', address: '',
      wallets: INITIAL_WALLETS,
      transactions: MOCK_TRANSACTIONS,
      monthlyLimit: 20000000
    };

    const newUsersList = [...users, newUser];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(newUsersList));
    setCurrentUser(newUser);
    setAuthStep('otp');
  };

  const handleLogout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setIsAuthenticated(false);
    setCurrentUser(null);
    setAuthStep('welcome');
    setShowLogoutConfirm(false);
  };

  const handleAddTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]);
    if (tx.walletId) {
      setWallets(prev => prev.map(w => {
        if (w.id === tx.walletId) {
          const newBalance = tx.type === 'income' ? w.balance + tx.amount : w.balance - tx.amount;
          return { ...w, balance: newBalance };
        }
        return w;
      }));
    }
    setShowAddModal(false);
    setView('overview');
  };

  const handleChangePassword = (newPass: string) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, password: newPass });
      setView('settings');
    }
  };

  if (!isAuthenticated) {
    switch (authStep) {
      case 'login': return <Login onBack={() => setAuthStep('welcome')} onLogin={handleLogin} onGoToRegister={() => setAuthStep('register')} />;
      case 'register': return <Register onBack={() => setAuthStep('welcome')} onRegister={handleRegister} onGoToLogin={() => setAuthStep('login')} />;
      case 'otp': return <OTPVerification email={currentUser?.email || ''} onVerify={() => setAuthStep('success')} onBack={() => setAuthStep('register')} />;
      case 'success': return <SuccessScreen onStart={() => { localStorage.setItem(CURRENT_USER_KEY, currentUser?.email || ''); setIsAuthenticated(true); loadUserData(currentUser!); }} />;
      default: return <WelcomeScreen onLogin={() => setAuthStep('login')} onSignUp={() => setAuthStep('register')} />;
    }
  }

  const renderView = () => {
    if (!currentUser) return null;
    const totalBalance = wallets.reduce((s, w) => s + w.balance, 0);

    switch (view) {
      case 'overview': return <Dashboard transactions={transactions} wallets={wallets} onAddClick={() => setShowAddModal(true)} onAssistantClick={() => setView('assistant')} onWalletsClick={() => setView('wallets')} onSplitBillClick={() => setView('split_bill')} onUpdateWallet={(id, amt) => setWallets(prev => prev.map(w => w.id === id ? { ...w, balance: amt } : w))} profileImage={profileImage} currency={currency} />;
      case 'wallets': return <WalletsList wallets={wallets} onBack={() => setView('overview')} onUpdateWallet={(id, amt) => setWallets(prev => prev.map(w => w.id === id ? { ...w, balance: amt } : w))} currency={currency} />;
      case 'analysis': return <Analysis transactions={transactions} />;
      case 'assistant': return <Assistant transactions={transactions} wallets={wallets} monthlyLimit={monthlyLimit} onBack={() => setView('overview')} />;
      case 'budget': return <BudgetManager transactions={transactions} monthlyLimit={monthlyLimit} onUpdateLimit={setMonthlyLimit} />;
      case 'settings': return <Settings onLogoutRequest={() => setShowLogoutConfirm(true)} onEditProfile={() => setView('personal_info')} onEditPicture={() => setView('edit_profile')} onLanguage={() => setView('language')} onCurrency={() => setView('currency')} onChangePassword={() => setView('change_password')} onWidgetConfig={() => setView('widget_config')} onAppIcon={() => setView('app_icon')} onDownloadApp={() => setView('download_app')} profileImage={profileImage} userProfile={currentUser} language={language} currency={currency} />;
      case 'personal_info': return <PersonalInfo profile={currentUser} onBack={() => setView('settings')} onSave={(p) => { setCurrentUser(p); setView('settings'); }} />;
      case 'change_password': return <ChangePassword onBack={() => setView('settings')} onSave={handleChangePassword} />;
      case 'language': return <LanguageSelection current={language} onBack={() => setView('settings')} onSelect={(l) => setLanguage(l)} />;
      case 'currency': return <CurrencySelection current={currency} onBack={() => setView('settings')} onSelect={(c) => setCurrency(c)} />;
      case 'scanner': return <CameraScanner onBack={() => setView('overview')} onComplete={() => setView('verification')} />;
      case 'verification': return <TransactionVerification wallets={wallets} onBack={() => setView('scanner')} onCancel={() => setView('overview')} onConfirm={handleAddTransaction} />;
      case 'split_bill': return <SplitBill onBack={() => setView('overview')} onScanClick={() => setView('scanner')} />;
      case 'widget_config': return <LockScreenWidget onBack={() => setView('settings')} balance={totalBalance} />;
      case 'app_icon': return <AppIconSelection onBack={() => setView('settings')} />;
      case 'download_app': return <DownloadApp onBack={() => setView('settings')} />;
      case 'edit_profile': return <EditProfilePicture onBack={() => setView('settings')} onSelectImage={(b) => setProfileImage(b)} onDeleteImage={() => setProfileImage('')} profileImage={profileImage} />;
      default: return null;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white dark:bg-black relative overflow-hidden flex flex-col shadow-2xl">
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">
        {renderView()}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-[100]">
          <AddTransaction 
            onClose={() => setShowAddModal(false)} 
            onSubmit={handleAddTransaction} 
            onScanClick={() => { setShowAddModal(false); setView('scanner'); }} 
            wallets={wallets}
          />
        </div>
      )}

      {showLogoutConfirm && <LogoutModal onConfirm={handleLogout} onCancel={() => setShowLogoutConfirm(false)} />}

      {['overview', 'analysis', 'budget', 'settings', 'wallets'].includes(view) && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pb-8 pt-4 ios-blur border-t border-gray-100 dark:border-white/5 z-50">
          <div className="flex justify-between items-center">
            <TabButton active={view === 'overview' || view === 'wallets'} icon="grid_view" label="Tổng quan" onClick={() => setView('overview')} />
            <TabButton active={view === 'analysis'} icon="bar_chart" label="Phân tích" onClick={() => setView('analysis')} />
            <button onClick={() => setShowAddModal(true)} className="flex flex-col items-center gap-1.5 -mt-8 active-scale">
              <div className="bg-black dark:bg-white text-white dark:text-black rounded-full p-3 shadow-xl ring-4 ring-white dark:ring-black">
                <span className="material-symbols-outlined text-[28px] font-bold">add</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Thêm</span>
            </button>
            <TabButton active={view === 'budget'} icon="account_balance_wallet" label="Ngân sách" onClick={() => setView('budget')} />
            <TabButton active={view === 'settings'} icon="settings" label="Cài đặt" onClick={() => setView('settings')} />
          </div>
        </nav>
      )}
    </div>
  );
};

const TabButton = ({ active, icon, label, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1.5 flex-1 active-scale transition-colors ${active ? 'text-black dark:text-white' : 'text-gray-400'}`}>
    <span className={`material-symbols-outlined text-[24px] ${active ? 'fill-1' : ''}`}>{icon}</span>
    <span className="text-[9px] font-extrabold uppercase tracking-widest">{label}</span>
  </button>
);

export default App;
