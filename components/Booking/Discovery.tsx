
import React, { useState } from 'react';
import { HOSPITALS, PROGRAMS } from '../../data/seedData';
import { Specialty, TreatmentProgram } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

interface DiscoveryProps {
  onSelectProgram: (program: TreatmentProgram) => void;
}

const Discovery: React.FC<DiscoveryProps> = ({ onSelectProgram }) => {
  const { t, language } = useLanguage();
  const [activeSpecialty, setActiveSpecialty] = useState<Specialty | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrograms = PROGRAMS.filter(p => {
    const hospital = HOSPITALS.find(h => h.id === p.hospitalId);
    const matchesSpecialty = activeSpecialty === 'ALL' || p.specialty === activeSpecialty;
    
    const title = language === 'ar' ? p.titleAr : p.titleEn;
    const hospitalName = language === 'ar' ? hospital?.nameAr : hospital?.nameEn;
    
    const matchesSearch = 
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospitalName?.toLowerCase().includes(searchTerm.toLowerCase());
      
    return matchesSpecialty && matchesSearch;
  });

  const specialtyLabels: Record<string, string> = {
    'ALL': t('discovery.all'),
    [Specialty.CARDIOLOGY]: language === 'ar' ? 'قلب' : 'Cardio',
    [Specialty.ONCOLOGY]: language === 'ar' ? 'سرطان' : 'Oncology',
    [Specialty.NATURAL_THERAPY]: language === 'ar' ? 'استشفاء' : 'Wellness',
    [Specialty.FERTILITY]: language === 'ar' ? 'إخصاب' : 'IVF',
    [Specialty.ORTHOPEDICS]: language === 'ar' ? 'عظام' : 'Ortho',
    [Specialty.WELLNESS]: language === 'ar' ? 'صحي' : 'Wellness',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl text-right ltr:text-left">
          <h2 className="text-4xl font-serif font-bold text-jordan-black mb-4">{t('discovery.title')}</h2>
          <p className="text-jordan-slate">{t('discovery.desc')}</p>
        </div>
        <div className="w-full lg:w-96 relative">
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

      <div className="flex flex-wrap gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {(['ALL', ...Object.values(Specialty)] as string[]).map((s) => (
          specialtyLabels[s] && (
            <button
              key={s}
              onClick={() => setActiveSpecialty(s as any)}
              className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all border whitespace-nowrap ${
                activeSpecialty === s 
                ? 'bg-jordan-green text-white border-jordan-green shadow-premium' 
                : 'bg-white text-jordan-slate border-jordan-gold/10 hover:border-jordan-green'
              }`}
            >
              {specialtyLabels[s]}
            </button>
          )
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredPrograms.map((program) => {
          const hospital = HOSPITALS.find(h => h.id === program.hospitalId);
          return (
            <div key={program.id} className="bg-white rounded-[2.5rem] shadow-premium border border-jordan-gold/5 overflow-hidden hover:-translate-y-2 transition-all duration-500 group flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img src={hospital?.image} alt={language === 'ar' ? program.titleAr : program.titleEn} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className={`absolute top-6 ${language === 'ar' ? 'right-6' : 'left-6'} bg-white/90 backdrop-blur px-4 py-2 rounded-2xl text-xs font-bold text-jordan-green shadow-sm flex items-center`}>
                  <StarSolid className={`h-3 w-3 text-jordan-gold ${language === 'ar' ? 'ml-1.5' : 'mr-1.5'}`} />
                  <span>{hospital?.rating}</span>
                </div>
              </div>
              <div className="p-10 flex-grow flex flex-col text-right ltr:text-left">
                <div className="flex items-center space-x-2 space-x-reverse ltr:space-x-reverse-0 mb-4">
                  <MapPinIcon className="h-4 w-4 text-jordan-gold" />
                  <span className="text-[10px] font-bold text-jordan-gold uppercase tracking-widest">{language === 'ar' ? hospital?.nameAr : hospital?.nameEn}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-jordan-black mb-4 leading-snug">
                  {language === 'ar' ? program.titleAr : program.titleEn}
                </h3>
                <div className="mt-auto pt-6 border-t border-jordan-gold/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block mb-1">{t('discovery.starts_from')}</span>
                    <span className="text-xl font-bold text-jordan-green">{program.basePrice} <span className="text-xs font-medium">{t('common.currency')}</span></span>
                  </div>
                  <button onClick={() => onSelectProgram(program)} className="bg-jordan-black text-white px-6 py-3 rounded-xl font-bold hover:bg-jordan-green transition-all">{t('discovery.details')}</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Discovery;
