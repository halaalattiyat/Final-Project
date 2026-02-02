
import React, { useState } from 'react';
import { HOSPITALS } from '../data/seedData';
import HospitalCard from '../components/Hospitals/HospitalCard';
import { Hospital } from '../types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';

interface HospitalsProps {
  onSelectHospital: (hospital: Hospital) => void;
}

const Hospitals: React.FC<HospitalsProps> = ({ onSelectHospital }) => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = HOSPITALS.filter(h => 
    h.nameAr.includes(searchTerm) || 
    h.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.location.includes(searchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-3xl text-right ltr:text-left">
          <h1 className="text-5xl font-serif font-bold text-jordan-black mb-6">{t('hosp.partners')}</h1>
          <p className="text-xl text-jordan-slate leading-relaxed">
            {t('hosp.desc')}
          </p>
        </div>
        <div className="w-full lg:w-96 flex flex-col gap-4">
           <div className="relative">
             <MagnifyingGlassIcon className={`h-5 w-5 absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-jordan-gold`} />
             <input 
               type="text" 
               placeholder={t('discovery.search_placeholder')}
               className={`w-full ${language === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 rounded-2xl border border-jordan-gold/10 shadow-inner-soft focus:ring-2 focus:ring-jordan-green outline-none bg-white transition-all`}
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {filtered.map(hospital => (
          <HospitalCard 
            key={hospital.id} 
            hospital={hospital} 
            onSelect={onSelectHospital} 
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-gray-400 font-bold">{t('common.search_no_results')}</p>
        </div>
      )}
    </div>
  );
};

export default Hospitals;
