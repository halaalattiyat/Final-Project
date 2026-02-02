
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheckIcon, UserIcon, KeyIcon } from '@heroicons/react/24/outline';

export const LoginForm: React.FC<{ onToggle: () => void }> = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { t, isRTL } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Admin Credentials
    if (email === 'admin@tabasheer.jo' && password === 'admin123') {
      login('admin_token', { 
        id: 'admin_1', 
        email, 
        firstName: isRTL ? 'مدير' : 'System', 
        lastName: isRTL ? 'النظام' : 'Admin', 
        role: 'ADMIN' 
      });
      return;
    }

    // User Credentials
    if (email === 'user@example.com' && password === 'user123') {
      login('user_token', { 
        id: 'user_123', 
        email, 
        firstName: isRTL ? 'أحمد' : 'Ahmad', 
        lastName: isRTL ? 'العلي' : 'Al-Ali', 
        role: 'PATIENT' 
      });
      return;
    }

    setError(t('auth.error_invalid'));
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-jordan-gold/10 w-full max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <div className="h-16 w-16 bg-jordan-sand rounded-2xl flex items-center justify-center border border-jordan-gold/20">
          <KeyIcon className="h-8 w-8 text-jordan-gold" />
        </div>
      </div>
      <h2 className="text-3xl font-serif font-bold text-jordan-black mb-2 text-center">{t('auth.login_title')}</h2>
      <p className="text-gray-500 text-center mb-8 text-sm">{t('auth.login_subtitle')}</p>
      
      {error && (
        <div className="mb-6 p-4 bg-jordan-red/10 border border-jordan-red/20 text-jordan-red text-xs font-bold rounded-xl text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={`block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('auth.email')}
          </label>
          <input 
            type="email" 
            required 
            placeholder="admin@tabasheer.jo"
            className="w-full px-5 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-jordan-green outline-none transition-all bg-jordan-sand/20"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className={`block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('auth.password')}
          </label>
          <input 
            type="password" 
            required 
            placeholder="••••••••"
            className="w-full px-5 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-jordan-green outline-none transition-all bg-jordan-sand/20"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-jordan-black text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-jordan-green transition-all active:scale-95 mt-4">
          {t('auth.login_btn')}
        </button>
      </form>

      {/* Demo Credentials Helper */}
      <div className="mt-8 p-4 bg-jordan-gold/5 rounded-2xl border border-jordan-gold/10">
        <p className="text-[10px] font-bold text-jordan-gold uppercase tracking-widest mb-3 flex items-center">
          <ShieldCheckIcon className={`h-4 w-4 ${isRTL ? 'ml-1.5' : 'mr-1.5'}`} />
          {t('auth.demo_accounts')}
        </p>
        <div className="grid grid-cols-1 gap-2">
          <button 
            type="button"
            onClick={() => { setEmail('admin@tabasheer.jo'); setPassword('admin123'); }}
            className={`flex items-center justify-between p-2 rounded-xl bg-white border border-jordan-gold/10 hover:border-jordan-green transition-all ${isRTL ? 'text-right' : 'text-left'} group`}
          >
            <div className="flex items-center">
               <div className={`h-6 w-6 bg-jordan-green/10 rounded flex items-center justify-center ${isRTL ? 'ml-2' : 'mr-2'}`}>
                  <ShieldCheckIcon className="h-3.5 w-3.5 text-jordan-green" />
               </div>
               <span className="text-[10px] font-bold text-jordan-black">{t('auth.admin_account')}</span>
            </div>
            <span className="text-[9px] text-gray-400 group-hover:text-jordan-green">{t('auth.fill_hint')}</span>
          </button>
          <button 
            type="button"
            onClick={() => { setEmail('user@example.com'); setPassword('user123'); }}
            className={`flex items-center justify-between p-2 rounded-xl bg-white border border-jordan-gold/10 hover:border-jordan-green transition-all ${isRTL ? 'text-right' : 'text-left'} group`}
          >
            <div className="flex items-center">
               <div className={`h-6 w-6 bg-jordan-sand rounded flex items-center justify-center ${isRTL ? 'ml-2' : 'mr-2'}`}>
                  <UserIcon className="h-3.5 w-3.5 text-jordan-gold" />
               </div>
               <span className="text-[10px] font-bold text-jordan-black">{t('auth.patient_account')}</span>
            </div>
            <span className="text-[9px] text-gray-400 group-hover:text-jordan-green">{t('auth.fill_hint')}</span>
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-jordan-slate text-sm">
        {t('auth.no_account')}{' '}
        <button onClick={onToggle} className="text-jordan-green font-bold hover:underline">{t('auth.register_link')}</button>
      </p>
    </div>
  );
};

export const RegisterForm: React.FC<{ onToggle: () => void }> = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const { register } = useAuth();
  const { t, isRTL } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      id: Date.now().toString(),
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: 'PATIENT'
    });
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-jordan-gold/10 w-full max-w-md mx-auto">
      <h2 className="text-3xl font-serif font-bold text-jordan-black mb-2 text-center">{t('auth.register_title')}</h2>
      <p className="text-gray-500 text-center mb-8 text-sm">{t('auth.register_subtitle')}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={`block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('auth.first_name')}
            </label>
            <input 
              type="text" 
              required
              className="w-full px-5 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-jordan-green outline-none bg-jordan-sand/20"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
          </div>
          <div>
            <label className={`block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('auth.last_name')}
            </label>
            <input 
              type="text" 
              required
              className="w-full px-5 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-jordan-green outline-none bg-jordan-sand/20"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
          </div>
        </div>
        <div>
          <label className={`block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('auth.email')}
          </label>
          <input 
            type="email" 
            required
            className="w-full px-5 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-jordan-green outline-none bg-jordan-sand/20"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label className={`block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('auth.password')}
          </label>
          <input 
            type="password" 
            required
            placeholder={t('auth.password_hint')}
            className="w-full px-5 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-jordan-green outline-none bg-jordan-sand/20"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>
        <div className="pt-2">
          <label className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} cursor-pointer`}>
            <input type="checkbox" required className="w-5 h-5 rounded-lg border-gray-300 text-jordan-green focus:ring-jordan-green" />
            <span className="text-xs text-jordan-slate">{t('auth.agree_terms')}</span>
          </label>
        </div>
        <button type="submit" className="w-full bg-jordan-green text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-jordan-black transition-all mt-4">
          {t('auth.create_btn')}
        </button>
      </form>
      <p className="mt-8 text-center text-jordan-slate text-sm">
        {t('auth.have_account')}{' '}
        <button onClick={onToggle} className="text-jordan-green font-bold hover:underline">{t('auth.login_link')}</button>
      </p>
    </div>
  );
};
