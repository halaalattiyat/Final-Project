
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  BuildingOffice2Icon, 
  CalendarDaysIcon, 
  ChatBubbleLeftRightIcon,
  CreditCardIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  const { t, language } = useLanguage();
  const menuItems = [
    { id: 'overview', name: t('admin.overview'), icon: ChartBarIcon },
    { id: 'bookings', name: t('admin.bookings'), icon: CalendarDaysIcon },
    { id: 'hospitals', name: t('admin.hosp_mgmt'), icon: BuildingOffice2Icon },
    { id: 'users', name: t('admin.users'), icon: UserGroupIcon },
    { id: 'chat', name: t('admin.chat'), icon: ChatBubbleLeftRightIcon },
    { id: 'payments', name: t('admin.payments'), icon: CreditCardIcon },
    { id: 'settings', name: t('admin.settings'), icon: Cog6ToothIcon },
  ];

  return (
    <div className={`w-64 bg-white ${language === 'ar' ? 'border-l' : 'border-r'} border-jordan-gold/20 h-full min-h-[calc(100vh-80px)] p-4`}>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 space-x-reverse ltr:space-x-reverse-0 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-jordan-green text-white shadow-md' 
                : 'text-gray-600 hover:bg-jordan-sand'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium px-2">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
