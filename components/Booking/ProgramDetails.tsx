
import React from 'react';
import { TreatmentProgram, Hospital } from '../../types';
import { HOSPITALS } from '../../data/seedData';
import { useLanguage } from '../../context/LanguageContext';
import { 
  XMarkIcon, 
  CheckBadgeIcon, 
  InformationCircleIcon, 
  CalendarIcon,
  UserIcon
} from '@heroicons/react/24/outline';

interface ProgramDetailsProps {
  program: TreatmentProgram;
  onClose: () => void;
  onBook: () => void;
}

const ProgramDetails: React.FC<ProgramDetailsProps> = ({ program, onClose, onBook }) => {
  const { t, language } = useLanguage();
  const hospital = HOSPITALS.find(h => h.id === program.hospitalId);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-jordan-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-6xl h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in fade-in zoom-in duration-300">
        
        <button onClick={onClose} className={`absolute top-8 ${language === 'ar' ? 'left-8' : 'right-8'} z-20 bg-white/20 hover:bg-white/40 p-3 rounded-full text-white lg:text-jordan-black backdrop-blur-md transition-all`}>
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="lg:w-1/3 bg-jordan-black text-white p-12 overflow-y-auto">
          <div className="mb-12">
            <div className="flex items-center space-x-3 space-x-reverse ltr:space-x-reverse-0 mb-6">
               <div className="h-10 w-10 bg-jordan-green rounded-xl flex items-center justify-center font-serif text-xl border border-jordan-gold/30">ت</div>
               <span className="text-xs font-bold text-jordan-gold uppercase tracking-widest">{language === 'ar' ? 'برنامج علاجي معتمد' : 'Certified Treatment Program'}</span>
            </div>
            <h2 className="text-4xl font-serif font-bold mb-6 leading-tight">
              {language === 'ar' ? program.titleAr : program.titleEn}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              {language === 'ar' ? program.descriptionAr : program.titleEn + ' - Premium medical tourism services.'}
            </p>
            
            <div className="space-y-4">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <span className="text-[10px] text-jordan-gold font-bold uppercase block mb-1">{t('hosp.contact_title')}</span>
                <span className="text-xl font-bold block">{language === 'ar' ? hospital?.nameAr : hospital?.nameEn}</span>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <div className="text-4xl font-bold text-jordan-gold mb-2">{program.basePrice} <span className="text-lg font-medium text-white">{t('common.currency')}</span></div>
            <button 
              onClick={onBook}
              className="w-full bg-jordan-green text-white py-5 rounded-[2rem] font-bold text-lg shadow-premium hover:shadow-2xl transition-all"
            >
              {language === 'ar' ? 'احجز رحلتك الآن' : 'Book Your Journey Now'}
            </button>
          </div>
        </div>

        <div className="flex-1 bg-jordan-sand/30 p-12 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-serif font-bold text-jordan-black mb-8 flex items-center">
                <CalendarIcon className={`h-6 w-6 ${language === 'ar' ? 'ml-3' : 'mr-3'} text-jordan-gold`} />
                {language === 'ar' ? 'المسار الطبي للرحلة' : 'Medical Journey Roadmap'}
              </h3>
              <div className="space-y-8 relative">
                <div className={`absolute ${language === 'ar' ? 'right-[1.15rem]' : 'left-[1.15rem]'} top-2 bottom-2 w-0.5 bg-jordan-gold/20`}></div>
                {(program.roadmap || []).map((step, i) => (
                  <div key={i} className={`relative ${language === 'ar' ? 'pr-12' : 'pl-12'}`}>
                    <div className={`absolute ${language === 'ar' ? 'right-0' : 'left-0'} top-0 h-10 w-10 bg-white border-2 border-jordan-gold rounded-full flex items-center justify-center text-xs font-bold text-jordan-gold z-10 shadow-sm`}>
                      {step.day}
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-jordan-gold/5 shadow-sm">
                       <h4 className="font-bold text-jordan-black mb-2">{language === 'ar' ? step.titleAr : step.titleAr}</h4>
                       <p className="text-xs text-jordan-slate leading-relaxed">{language === 'ar' ? step.descriptionAr : step.descriptionAr}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-serif font-bold text-jordan-black mb-8 flex items-center">
                  <CheckBadgeIcon className={`h-6 w-6 ${language === 'ar' ? 'ml-3' : 'mr-3'} text-jordan-gold`} />
                  {language === 'ar' ? 'ماذا يشمل البرنامج؟' : 'What is included?'}
                </h3>
                <div className="bg-white p-8 rounded-[2.5rem] border border-jordan-gold/5 shadow-sm">
                  <ul className="grid grid-cols-1 gap-4">
                    {program.includes.map((inc, i) => (
                      <li key={i} className="flex items-center text-sm font-medium text-jordan-slate">
                        <div className={`h-6 w-6 bg-jordan-green/10 rounded-full flex items-center justify-center ${language === 'ar' ? 'ml-3' : 'mr-3'}`}>
                           <CheckBadgeIcon className="h-4 w-4 text-jordan-green" />
                        </div>
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails;
