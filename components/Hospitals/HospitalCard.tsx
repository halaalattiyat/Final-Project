
import React from 'react';
import { Hospital } from '../../types';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { MapPinIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../../context/LanguageContext';

interface HospitalCardProps {
  hospital: Hospital;
  onSelect: (hospital: Hospital) => void;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onSelect }) => {
  const { language, t } = useLanguage();
  return (
    <div 
      onClick={() => onSelect(hospital)}
      className={`bg-white rounded-[2.5rem] overflow-hidden border border-jordan-gold/10 hover:border-jordan-green hover:shadow-premium transition-all duration-500 cursor-pointer group flex flex-col md:flex-row h-full text-right ltr:text-left`}
    >
      <div className="w-full md:w-72 h-64 md:h-auto overflow-hidden flex-shrink-0">
        <img 
          src={hospital.image} 
          alt={language === 'ar' ? hospital.nameAr : hospital.nameEn} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      
      <div className="flex-1 p-8 flex flex-col">
        <div className={`flex justify-between items-start mb-4 ${language === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className="flex flex-wrap gap-2">
            {hospital.accreditations.map(acc => (
              <span key={acc} className="px-2 py-0.5 bg-jordan-green/10 text-jordan-green text-[9px] font-bold rounded uppercase tracking-tighter border border-jordan-green/20 flex items-center">
                <ShieldCheckIcon className={`h-3 w-3 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                {acc}
              </span>
            ))}
          </div>
          <div className="flex items-center text-jordan-gold">
            <StarSolid className={`h-4 w-4 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
            <span className="text-sm font-bold">{hospital.rating}</span>
          </div>
        </div>

        <h3 className="text-2xl font-serif font-bold text-jordan-black mb-2 group-hover:text-jordan-green transition-colors">
          {language === 'ar' ? hospital.nameAr : hospital.nameEn}
        </h3>
        
        <div className="flex items-center text-gray-400 text-xs mb-4">
          <MapPinIcon className={`h-4 w-4 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
          {hospital.location}
        </div>

        <p className="text-jordan-slate text-sm leading-relaxed line-clamp-2 mb-6">
          {language === 'ar' ? hospital.description : "Providing the highest standards of international healthcare and hospitality."}
        </p>

        <div className="mt-auto grid grid-cols-3 gap-4 pt-6 border-t border-jordan-gold/5">
          <div className="text-center">
            <span className="text-[10px] text-gray-400 block uppercase mb-1">{t('hosp.established')}</span>
            <span className="text-sm font-bold text-jordan-black">{hospital.establishedYear || '---'}</span>
          </div>
          <div className="text-center border-x border-jordan-gold/5">
            <span className="text-[10px] text-gray-400 block uppercase mb-1">{t('hosp.beds')}</span>
            <span className="text-sm font-bold text-jordan-black">{hospital.stats?.beds || '--'}</span>
          </div>
          <div className="text-center">
            <span className="text-[10px] text-gray-400 block uppercase mb-1">{t('hosp.doctors')}</span>
            <span className="text-sm font-bold text-jordan-black">{hospital.stats?.doctors || '--'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
