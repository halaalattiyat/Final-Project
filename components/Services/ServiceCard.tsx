
import React from 'react';
import { MedicalService, Specialty } from '../../types';
import { HOSPITALS, PROGRAMS } from '../../data/seedData';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { ArrowRightIcon, BuildingOfficeIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../../context/LanguageContext';

interface ServiceCardProps {
  service: MedicalService;
  onClick: (specialty: Specialty) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  const { language, t } = useLanguage();
  const hospitalCount = HOSPITALS.filter(h => h.specialties.includes(service.specialty)).length;
  const programCount = PROGRAMS.filter(p => p.specialty === service.specialty).length;

  return (
    <div 
      onClick={() => onClick(service.specialty)}
      className="bg-white rounded-[2.5rem] p-10 shadow-premium border border-jordan-gold/5 hover:border-jordan-green transition-all duration-500 cursor-pointer group flex flex-col h-full text-right ltr:text-left"
    >
      <div className="flex justify-between items-start mb-8">
        <div className="h-20 w-20 bg-jordan-sand rounded-3xl flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
          {service.icon}
        </div>
        <div className="flex items-center bg-jordan-gold/10 px-3 py-1.5 rounded-xl">
          <StarSolid className={`h-4 w-4 text-jordan-gold ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
          <span className="text-xs font-bold text-jordan-gold">{service.rating}</span>
          <span className="text-[10px] text-gray-400 mx-1">({service.reviewCount})</span>
        </div>
      </div>

      <h3 className="text-2xl font-serif font-bold text-jordan-black mb-4 group-hover:text-jordan-green transition-colors">
        {language === 'ar' ? service.titleAr : service.titleEn}
      </h3>
      <p className="text-jordan-slate text-sm leading-relaxed mb-8 flex-grow">
        {language === 'ar' ? service.descriptionAr : service.titleEn + " specialists offering top-tier diagnostic and treatment procedures."}
      </p>

      <div className="space-y-3 mb-8">
        {service.keyFeatures.map((feature, i) => (
          <div key={i} className="flex items-center text-xs font-medium text-gray-500">
            <div className={`h-1.5 w-1.5 bg-jordan-green rounded-full ${language === 'ar' ? 'ml-2' : 'mr-2'}`}></div>
            {feature}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-jordan-gold/10">
        <div className="flex items-center">
          <BuildingOfficeIcon className={`h-4 w-4 text-gray-400 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{hospitalCount} {t('serv.hosp_count')}</span>
        </div>
        <div className="flex items-center">
          <DocumentDuplicateIcon className={`h-4 w-4 text-gray-400 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{programCount} {t('serv.prog_count')}</span>
        </div>
      </div>

      <div className={`mt-8 flex ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
        <div className="h-12 w-12 bg-jordan-black text-white rounded-2xl flex items-center justify-center group-hover:bg-jordan-green transition-colors">
          <ArrowRightIcon className={`h-5 w-5 ${language === 'ar' ? 'rotate-0' : 'rotate-180'}`} />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
