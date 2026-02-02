
import React, { useState, useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { TreatmentProgram, Hospital, Booking, BookingStatus } from './types';
import { LoginForm, RegisterForm } from './components/Auth/AuthForms';
import ProgramDetails from './components/Booking/ProgramDetails';
import BookingWizard from './components/Booking/BookingWizard';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Services from './pages/Services';
import Hospitals from './pages/Hospitals';
import HospitalProfile from './pages/HospitalProfile';

const TrustBanner = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-jordan-green text-white text-center py-2 text-xs font-bold uppercase tracking-widest">
      Tabasheer Khair — {t('hero.badge')}
    </div>
  );
};

const Navbar = ({ onAuthClick, onNavigate, activeTab }: { 
  onAuthClick: () => void, 
  onNavigate: (view: any) => void,
  activeTab: string 
}) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useLanguage();
  
  return (
    <nav className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-[100] shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="h-10 w-10 bg-jordan-green rounded-xl flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm border border-jordan-gold/20">T</div>
          <div className="flex flex-col items-start leading-none">
            <span className="text-xl font-serif font-bold text-jordan-black">Tabasheer Khair</span>
            <span className="text-[10px] text-jordan-gold font-bold tracking-widest uppercase">Jordan Medical Tourism</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => onNavigate('home')} className={`text-sm font-bold transition-colors ${activeTab === 'home' ? 'text-jordan-green border-b-2 border-jordan-green' : 'text-gray-600 hover:text-jordan-green'}`}>{t('nav.home')}</button>
          <button onClick={() => onNavigate('services')} className={`text-sm font-bold transition-colors ${activeTab === 'services' ? 'text-jordan-green border-b-2 border-jordan-green' : 'text-gray-600 hover:text-jordan-green'}`}>{t('nav.services')}</button>
          <button onClick={() => onNavigate('hospitals')} className={`text-sm font-bold transition-colors ${activeTab === 'hospitals' ? 'text-jordan-green border-b-2 border-jordan-green' : 'text-gray-600 hover:text-jordan-green'}`}>{t('nav.hospitals')}</button>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => onNavigate(user?.role === 'ADMIN' ? 'admin' : 'profile')}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold bg-jordan-sand text-jordan-black hover:bg-gray-200 transition-colors"
              >
                <UserCircleIcon className="h-5 w-5" />
                <span className="hidden sm:inline">{user?.role === 'ADMIN' ? t('nav.admin') : t('nav.profile')}</span>
              </button>
              <button onClick={logout} className="text-xs text-jordan-red font-bold hover:underline">{t('nav.logout')}</button>
            </div>
          ) : (
            <button onClick={onAuthClick} className="bg-jordan-black text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-jordan-green transition-all">{t('nav.login')}</button>
          )}
        </div>
      </div>
    </nav>
  );
};

const AppContent: React.FC = () => {
  const [activeView, setActiveView] = useState<'home' | 'services' | 'hospitals' | 'profile' | 'admin'>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [viewingProgram, setViewingProgram] = useState<TreatmentProgram | null>(null);
  const [viewingHospital, setViewingHospital] = useState<Hospital | null>(null);
  const [bookingProgram, setBookingProgram] = useState<TreatmentProgram | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();

  // Initialize bookings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tk_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load bookings", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) setIsAuthModalOpen(false);
  }, [isAuthenticated]);

  const handleBookingInquiry = (formData: any) => {
    if (!user) return;

    const newBooking: Booking = {
      id: `BK-${Math.floor(Math.random() * 90000) + 10000}`,
      patientId: user.id,
      programId: bookingProgram?.id || '',
      status: BookingStatus.PENDING,
      preferredDate: formData.preferredDate,
      medicalNotes: formData.medicalNotes,
      files: [],
      createdAt: new Date().toISOString()
    };

    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem('tk_bookings', JSON.stringify(updatedBookings));
    
    // Note: Success state is handled by the Wizard's internal state
  };

  const renderMain = () => {
    if (activeView === 'admin' && user?.role === 'ADMIN') return <AdminDashboard />;
    if (activeView === 'profile' && isAuthenticated) return <Profile bookings={bookings.filter(b => b.patientId === user.id)} />;

    switch (activeView) {
      case 'services': return <Services onSelectSpecialty={() => setActiveView('home')} />;
      case 'hospitals': return <Hospitals onSelectHospital={setViewingHospital} />;
      default: return (
        <div className="animate-in fade-in duration-500">
          <Hero />
          <Home onSelectProgram={setViewingProgram} />
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-jordan-sand/10 selection:bg-jordan-green/20">
      <TrustBanner />
      <Navbar activeTab={activeView} onNavigate={setActiveView} onAuthClick={() => setIsAuthModalOpen(true)} />
      <main className="flex-grow">{renderMain()}</main>

      {isAuthModalOpen && !isAuthenticated && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-jordan-black/80 backdrop-blur-md" onClick={() => setIsAuthModalOpen(false)}></div>
          <div className="relative w-full max-w-md animate-in fade-in zoom-in duration-300">
            {authMode === 'login' ? <LoginForm onToggle={() => setAuthMode('register')} /> : <RegisterForm onToggle={() => setAuthMode('login')} />}
          </div>
        </div>
      )}

      {viewingProgram && <ProgramDetails program={viewingProgram} onClose={() => setViewingProgram(null)} onBook={() => { setViewingProgram(null); setBookingProgram(viewingProgram); }} />}
      {viewingHospital && <HospitalProfile hospital={viewingHospital} onClose={() => setViewingHospital(null)} onSelectProgram={(p) => { setViewingHospital(null); setViewingProgram(p); }} />}
      {bookingProgram && (
        <BookingWizard 
          program={bookingProgram} 
          onClose={() => setBookingProgram(null)} 
          onSubmit={handleBookingInquiry} 
        />
      )}

      <footer className="bg-jordan-black py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
          <div className="h-12 w-12 bg-jordan-green rounded-xl flex items-center justify-center text-white font-serif font-bold text-2xl mb-8 border border-white/10">T</div>
          <p className="text-gray-400 text-sm max-w-md mx-auto mb-12">{t('footer.desc')}</p>
          <div className="w-full pt-12 border-t border-white/5">
            <p className="text-gray-600 text-xs">{t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-jordan-sand/30 py-32 border-b border-jordan-gold/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <div className="inline-block px-4 py-1.5 bg-jordan-gold/10 text-jordan-gold text-[10px] font-bold rounded-full mb-6 uppercase tracking-widest border border-jordan-gold/20">
          {t('hero.badge')}
        </div>
        <h1 className="text-6xl font-serif font-bold text-jordan-black mb-8 leading-tight max-w-4xl mx-auto">{t('hero.title')}</h1>
        <p className="text-xl text-jordan-slate max-w-2xl mx-auto leading-relaxed">{t('hero.subtitle')}</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;
