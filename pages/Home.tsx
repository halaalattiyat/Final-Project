import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowRightIcon, 
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Discovery from '../components/Booking/Discovery';
import { HOSPITALS } from '../data/seedData';
import { Specialty } from '../types';

const SpecialtiesGrid = () => {
  const { t } = useLanguage();
  const specialties = [
    { id: Specialty.CARDIOLOGY, name: 'Cardiology', icon: '❤️' },
    { id: Specialty.ORTHOPEDICS, name: 'Orthopedics', icon: '🦴' },
    { id: Specialty.ONCOLOGY, name: 'Oncology', icon: '🎗️' },
    { id: Specialty.FERTILITY, name: 'Fertility', icon: '👶' },
    { id: Specialty.OPHTHALMOLOGY, name: 'Ophthalmology', icon: '👁️' },
    { id: Specialty.WELLNESS, name: 'Wellness', icon: '🌊' },
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-jordan-black mb-4">
            {t('home.spec_title')}
          </h2>
          <div className="h-1 w-20 bg-jordan-gold mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {specialties.map((spec) => (
            <div key={spec.id} className="group cursor-pointer">
              <div className="bg-jordan-sand/50 rounded-3xl p-8 text-center border border-transparent group-hover:border-jordan-gold/30 group-hover:bg-white group-hover:shadow-premium transition-all duration-500">
                <div className="text-4xl mb-4 transition-transform group-hover:scale-110">{spec.icon}</div>
                <h3 className="text-sm font-bold text-jordan-black uppercase tracking-wider">{spec.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PartnerHospitals = () => {
  const { t } = useLanguage();
  return (
    <div className="py-24 bg-white border-t border-jordan-sand">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-serif font-bold text-jordan-black mb-4">{t('hosp.partners')}</h2>
            <p className="text-jordan-slate text-lg">{t('hosp.desc')}</p>
          </div>
          <button className="text-jordan-green font-bold flex items-center group whitespace-nowrap px-6 py-2 rounded-xl hover:bg-jordan-green/5 transition-colors">
            {t('hosp.view_all')}
            <ArrowRightIcon className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {HOSPITALS.slice(0, 4).map((hospital) => (
            <div key={hospital.id} className="bg-jordan-sand/20 rounded-[2.5rem] p-6 flex flex-col sm:flex-row gap-8 items-center border border-transparent hover:border-jordan-gold/20 transition-all group shadow-sm">
              <div className="w-full sm:w-48 h-48 rounded-[2rem] overflow-hidden flex-shrink-0 shadow-md">
                 <img src={hospital.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={hospital.nameEn} />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                   {hospital.accreditations.map(acc => (
                     <span key={acc} className="px-2 py-0.5 bg-jordan-gold/10 text-jordan-gold text-[10px] font-bold rounded border border-jordan-gold/20 uppercase tracking-tighter">{acc}</span>
                   ))}
                </div>
                <h3 className="text-2xl font-bold text-jordan-black mb-2">{hospital.nameEn}</h3>
                <p className="text-sm text-jordan-slate mb-4 line-clamp-2">{hospital.description}</p>
                <div className="flex items-center text-xs font-bold text-jordan-green">
                   <CheckCircleIcon className="h-4 w-4 mr-1.5" />
                   {t('hosp.confirmed')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Home: React.FC<{ onSelectProgram: (p: any) => void }> = ({ onSelectProgram }) => {
  return (
    <div className="animate-in fade-in duration-700">
      <SpecialtiesGrid />
      <section id="services">
        <Discovery onSelectProgram={onSelectProgram} />
      </section>
      <PartnerHospitals />
    </div>
  );
};

export default Home;