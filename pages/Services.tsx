
import React from 'react';
import { MEDICAL_SERVICES } from '../data/seedData';
import ServiceCard from '../components/Services/ServiceCard';
import { Specialty } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ServicesProps {
  onSelectSpecialty: (specialty: Specialty) => void;
}

const Services: React.FC<ServicesProps> = ({ onSelectSpecialty }) => {
  const { t } = useLanguage();
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="max-w-3xl mb-20 text-right ltr:text-left">
        <h1 className="text-5xl font-serif font-bold text-jordan-black mb-6">{t('serv.title')}</h1>
        <p className="text-xl text-jordan-slate leading-relaxed">
          {t('serv.desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {MEDICAL_SERVICES.map(service => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            onClick={onSelectSpecialty}
          />
        ))}
        
        {/* Support Section */}
        <div className="lg:col-span-3 mt-16 bg-jordan-black rounded-[3rem] p-16 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-jordan-green/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10 max-w-xl text-right ltr:text-left">
             <h3 className="text-3xl font-serif font-bold mb-4">{t('serv.help_title')}</h3>
             <p className="text-gray-400 leading-relaxed">{t('serv.help_desc')}</p>
          </div>
          <button className="relative z-10 mt-8 md:mt-0 bg-jordan-green text-white px-12 py-5 rounded-3xl font-bold shadow-premium hover:scale-105 transition-transform whitespace-nowrap">
             {t('serv.contact_btn')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
