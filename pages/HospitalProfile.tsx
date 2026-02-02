
import React, { useState } from 'react';
import { Hospital, TreatmentProgram } from '../types';
import { PROGRAMS } from '../data/seedData';
import { useLanguage } from '../context/LanguageContext';
import { 
  XMarkIcon, 
  MapPinIcon, 
  BuildingOffice2Icon,
  UsersIcon,
  HeartIcon,
  ChevronLeftIcon,
  StarIcon as StarSolid
} from '@heroicons/react/24/outline';

interface HospitalProfileProps {
  hospital: Hospital;
  onClose: () => void;
  onSelectProgram: (program: TreatmentProgram) => void;
}

const HospitalProfile: React.FC<HospitalProfileProps> = ({ hospital, onClose, onSelectProgram }) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'programs'>('overview');
  const relatedPrograms = PROGRAMS.filter(p => p.hospitalId === hospital.id);

  return (
    <div className="fixed inset-0 z-[110] bg-white overflow-y-auto">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <img src={hospital.image} className="w-full h-full object-cover" alt={language === 'ar' ? hospital.nameAr : hospital.nameEn} />
        <div className="absolute inset-0 bg-gradient-to-t from-jordan-black/80 via-transparent to-transparent"></div>
        
        <button 
          onClick={onClose}
          className={`absolute top-8 ${language === 'ar' ? 'left-8' : 'right-8'} bg-white/20 backdrop-blur-xl p-4 rounded-full text-white hover:bg-white/40 transition-all z-20`}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className={`absolute bottom-12 ${language === 'ar' ? 'right-12' : 'left-12'} text-white max-w-4xl`}>
          <div className="flex flex-wrap gap-2 mb-4">
            {hospital.accreditations.map(acc => (
              <span key={acc} className="px-3 py-1 bg-jordan-green text-xs font-bold rounded-lg border border-white/20">
                {acc}
              </span>
            ))}
          </div>
          <h1 className="text-6xl font-serif font-bold mb-4">{language === 'ar' ? hospital.nameAr : hospital.nameEn}</h1>
          <div className="flex items-center space-x-4 space-x-reverse ltr:space-x-reverse-0 text-gray-300">
            <div className="flex items-center">
              <MapPinIcon className={`h-5 w-5 ${language === 'ar' ? 'ml-1' : 'mr-1'} text-jordan-gold`} />
              {hospital.location}
            </div>
            <div className="flex items-center">
              <StarSolid className={`h-5 w-5 ${language === 'ar' ? 'ml-1' : 'mr-1'} text-jordan-gold fill-jordan-gold`} />
              {hospital.rating} ({hospital.reviewCount} {language === 'ar' ? 'تقييم' : 'Reviews'})
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          <div className="flex space-x-12 space-x-reverse ltr:space-x-reverse-0 border-b border-gray-100 mb-12">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`pb-4 font-bold text-lg transition-all border-b-2 ${activeTab === 'overview' ? 'border-jordan-green text-jordan-green' : 'border-transparent text-gray-400'}`}
            >
              {t('hosp.overview')}
            </button>
            <button 
              onClick={() => setActiveTab('programs')}
              className={`pb-4 font-bold text-lg transition-all border-b-2 ${activeTab === 'programs' ? 'border-jordan-green text-jordan-green' : 'border-transparent text-gray-400'}`}
            >
              {t('hosp.programs_tab')} ({relatedPrograms.length})
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="animate-in fade-in duration-500">
              <p className="text-xl text-jordan-slate leading-relaxed mb-12">
                {language === 'ar' ? hospital.description : hospital.description}
              </p>
              
              <h3 className="text-2xl font-serif font-bold text-jordan-black mb-8">{t('hosp.infra')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="bg-jordan-sand/30 p-8 rounded-[2rem] border border-jordan-gold/5">
                   <BuildingOffice2Icon className="h-8 w-8 text-jordan-gold mb-4" />
                   <div className="text-3xl font-bold text-jordan-black mb-1">{hospital.stats?.beds}</div>
                   <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">{t('hosp.beds')}</div>
                </div>
                <div className="bg-jordan-sand/30 p-8 rounded-[2rem] border border-jordan-gold/5">
                   <UsersIcon className="h-8 w-8 text-jordan-gold mb-4" />
                   <div className="text-3xl font-bold text-jordan-black mb-1">{hospital.stats?.doctors}</div>
                   <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">{t('hosp.doctors')}</div>
                </div>
                <div className="bg-jordan-sand/30 p-8 rounded-[2rem] border border-jordan-gold/5">
                   <HeartIcon className="h-8 w-8 text-jordan-gold mb-4" />
                   <div className="text-3xl font-bold text-jordan-black mb-1">{hospital.stats?.surgeryRooms}</div>
                   <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">{t('hosp.surgery_rooms')}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'programs' && (
            <div className="animate-in fade-in duration-500 grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPrograms.map(p => (
                <div 
                  key={p.id}
                  onClick={() => onSelectProgram(p)}
                  className="bg-white p-8 rounded-[2.5rem] border border-jordan-gold/10 hover:border-jordan-green transition-all cursor-pointer group"
                >
                  <span className="text-[10px] font-bold text-jordan-gold uppercase tracking-widest mb-2 block">{p.specialty}</span>
                  <h4 className="text-xl font-bold text-jordan-black mb-4 group-hover:text-jordan-green transition-colors">
                    {language === 'ar' ? p.titleAr : p.titleEn}
                  </h4>
                  <div className="flex justify-between items-center pt-6 border-t border-jordan-gold/5">
                    <span className="text-lg font-bold text-jordan-green">{p.basePrice} {t('common.currency')}</span>
                    <button className="h-10 w-10 bg-jordan-black text-white rounded-xl flex items-center justify-center group-hover:bg-jordan-green">
                      <ChevronLeftIcon className={`h-5 w-5 ${language === 'en' ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
           <div className="sticky top-28 bg-white rounded-[3rem] p-10 border border-jordan-gold/10 shadow-premium">
              <h3 className="text-xl font-serif font-bold text-jordan-black mb-6">{t('hosp.contact_title')}</h3>
              <div className="space-y-6">
                <div className="bg-jordan-sand/50 p-6 rounded-2xl">
                   <p className="text-sm text-gray-500 mb-4">{language === 'ar' ? 'هل لديك تقارير طبية جاهزة؟' : 'Do you have medical reports ready?'}</p>
                   <button className="w-full bg-jordan-green text-white py-4 rounded-xl font-bold shadow-lg">{t('hosp.send_report')}</button>
                </div>
                <div className="text-center pt-4">
                   <p className="text-xs text-gray-400 leading-relaxed italic">
                     {t('hosp.guarantee')}
                   </p>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalProfile;
