
import React, { useState } from 'react';
import AdminSidebar from '../components/Admin/AdminSidebar';
import ReviewModeration from '../components/Admin/ReviewModeration';
import { useLanguage } from '../context/LanguageContext';
import { HOSPITALS, PROGRAMS } from '../data/seedData';
import { 
  UserGroupIcon, 
  CurrencyDollarIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  CheckIcon,
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
  ChatBubbleLeftEllipsisIcon
} from '@heroicons/react/24/outline';

const StatCard: React.FC<{ title: string; value: string | number; icon: any; color: string }> = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-jordan-gold/10 flex items-center justify-between hover:shadow-md transition-shadow">
    <div className="text-right ltr:text-left">
      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-3xl font-serif font-bold text-jordan-black">{value}</h3>
    </div>
    <div className={`p-4 rounded-2xl ${color} shadow-lg`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState('');

  const [bookings, setBookings] = useState([
    { id: 'BK-1001', patient: 'أحمد العلي', patientEn: 'Ahmad Al-Ali', program: 'جراحة القلب المفتوح', programEn: 'Open Heart Surgery', hospital: 'مستشفى الأردن', hospitalEn: 'Jordan Hospital', status: 'PENDING', date: '2024-05-12', amount: 8500, unread: 2 },
    { id: 'BK-1002', patient: 'سارة منصور', patientEn: 'Sara Mansour', program: 'علاج الصدفية الملكي', programEn: 'Royal Psoriasis Treatment', hospital: 'مركز البحر الميت', hospitalEn: 'Dead Sea Center', status: 'PENDING', date: '2024-05-14', amount: 3200, unread: 0 },
  ]);

  const handleBookingAction = (id: string, newStatus: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title={t('admin.stats.total_patients')} value="1,240" icon={UserGroupIcon} color="bg-jordan-green" />
        <StatCard title={t('admin.stats.pending')} value={bookings.filter(b => b.status === 'PENDING').length} icon={ExclamationCircleIcon} color="bg-jordan-red" />
        <StatCard title={t('admin.stats.confirmed')} value="48" icon={CheckCircleIcon} color="bg-jordan-gold" />
        <StatCard title={t('admin.stats.revenue')} value={`28,500 ${t('common.currency')}`} icon={CurrencyDollarIcon} color="bg-jordan-black" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-jordan-gold/10 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-jordan-sand/10">
            <h3 className="font-bold text-jordan-black">{language === 'ar' ? 'آخر الحجوزات' : 'Recent Bookings'}</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {bookings.map(b => (
              <div key={b.id} className="p-4 flex items-center justify-between hover:bg-jordan-sand/20 transition-colors">
                <div className="flex items-center space-x-3 space-x-reverse ltr:space-x-reverse-0">
                  <div className="h-10 w-10 bg-jordan-sand rounded-xl flex items-center justify-center font-bold text-jordan-green">{language === 'ar' ? b.patient[0] : b.patientEn[0]}</div>
                  <div className="px-3">
                    <p className="text-sm font-bold text-jordan-black">{language === 'ar' ? b.patient : b.patientEn}</p>
                    <p className="text-[10px] text-gray-400">{language === 'ar' ? b.program : b.programEn}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${b.status === 'PENDING' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                  {b.status === 'PENDING' ? (language === 'ar' ? 'معلق' : 'Pending') : (language === 'ar' ? 'مؤكد' : 'Confirmed')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-jordan-gold/10 shadow-sm p-8 flex flex-col items-center justify-center text-center">
            <div className="h-20 w-20 bg-jordan-green/10 rounded-full flex items-center justify-center text-jordan-green mb-4">
                <CheckCircleIcon className="h-10 w-10" />
            </div>
            <h4 className="font-bold text-jordan-black mb-2">{language === 'ar' ? 'النظام يعمل بكفاءة' : 'System Healthy'}</h4>
            <p className="text-xs text-gray-400 max-w-xs">{language === 'ar' ? 'جميع الخوادم متصلة، ويتم تحديث بيانات السياحة العلاجية بشكل لحظي.' : 'All servers are connected. Medical tourism data is updating in real-time.'}</p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'settings': return <ReviewModeration />;
      default: return renderOverview();
    }
  };

  return (
    <div className="flex bg-jordan-sand/30 min-h-screen">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-8">
        <header className="mb-12 flex justify-between items-center text-right ltr:text-left">
          <div>
            <h1 className="text-4xl font-serif font-bold text-jordan-black">{t('admin.title')}</h1>
            <div className={`flex items-center text-xs text-jordan-green font-bold mt-2 uppercase tracking-widest`}>
               <div className={`h-2 w-2 bg-jordan-green rounded-full ${language === 'ar' ? 'ml-2' : 'mr-2'} animate-pulse`}></div>
               {t('admin.status')}
            </div>
          </div>
          <div className="flex items-center space-x-6 space-x-reverse ltr:space-x-reverse-0">
             <div className="px-4">
                <p className="text-sm font-bold text-jordan-black">{language === 'ar' ? 'مدير المنصة' : 'Platform Admin'}</p>
                <p className="text-[10px] text-gray-400 font-bold tracking-tighter uppercase">v1.0 PREMIUM</p>
             </div>
             <div className="h-12 w-12 bg-jordan-black text-white rounded-2xl flex items-center justify-center font-serif text-xl border-2 border-jordan-gold/30 shadow-premium">T</div>
          </div>
        </header>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
