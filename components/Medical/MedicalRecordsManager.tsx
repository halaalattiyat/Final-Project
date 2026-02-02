
import React, { useState } from 'react';
import { MedicalRecord, MedicalRecordCategory, VisibilityLevel } from '../../types';
import MedicalRecordCard from './MedicalRecordCard';
import { 
  CloudArrowUpIcon, 
  PlusIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const MedicalRecordsManager: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    title: '',
    category: MedicalRecordCategory.GENERAL,
    visibility: VisibilityLevel.PRIVATE
  });

  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: '1',
      patientId: 'p1',
      title: 'تقرير الرنين المغناطيسي - الركبة اليسرى',
      category: MedicalRecordCategory.RADIOLOGY,
      fileUrl: '#',
      fileType: 'pdf',
      uploadDate: '2023-12-01',
      visibility: VisibilityLevel.HOSPITAL
    },
    {
      id: '2',
      patientId: 'p1',
      title: 'تحليل الدم الشامل',
      category: MedicalRecordCategory.LAB_RESULTS,
      fileUrl: '#',
      fileType: 'pdf',
      uploadDate: '2024-01-15',
      visibility: VisibilityLevel.COORDINATOR
    }
  ]);

  const [filter, setFilter] = useState<MedicalRecordCategory | 'ALL'>('ALL');

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const record: MedicalRecord = {
      id: Date.now().toString(),
      patientId: 'p1',
      title: newRecord.title,
      category: newRecord.category,
      fileUrl: '#',
      fileType: 'pdf',
      uploadDate: new Date().toISOString(),
      visibility: newRecord.visibility
    };
    setRecords([record, ...records]);
    setIsAddModalOpen(false);
    setNewRecord({ title: '', category: MedicalRecordCategory.GENERAL, visibility: VisibilityLevel.PRIVATE });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-3xl font-serif font-bold text-jordan-black">حقيبتي الطبية الرقمية</h3>
          <p className="text-jordan-slate text-sm mt-1">إدارة ملفاتك الصحية بخصوصية تامة ومعايير أمان عالمية.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-jordan-green text-white px-8 py-4 rounded-2xl font-bold shadow-premium flex items-center space-x-2 space-x-reverse hover:scale-105 transition-transform"
        >
          <PlusIcon className="h-5 w-5" />
          <span>إضافة تقرير طبي</span>
        </button>
      </div>

      <div className="bg-jordan-green/5 border border-jordan-green/20 rounded-[2rem] p-6 flex items-center space-x-6 space-x-reverse">
        <div className="bg-jordan-green text-white p-3 rounded-xl shadow-lg">
          <ShieldCheckIcon className="h-8 w-8" />
        </div>
        <div className="text-sm">
          <p className="font-bold text-jordan-green text-lg mb-1">بياناتك محمية بتشفير طرفي (End-to-End)</p>
          <p className="text-jordan-green/70">تخضع كافة التقارير الطبية لأعلى معايير التشفير، ولا يمكن لأي جهة الاطلاع عليها إلا بتفويض مباشر منك.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="البحث في التقارير والفحوصات..."
            className="w-full pr-12 pl-4 py-4 rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-jordan-green transition-all bg-white shadow-inner-soft"
          />
        </div>
        <div className="flex space-x-2 space-x-reverse overflow-x-auto pb-2">
          {(['ALL', ...Object.values(MedicalRecordCategory)] as string[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`whitespace-nowrap px-6 py-3 rounded-xl text-xs font-bold transition-all border ${
                filter === cat 
                ? 'bg-jordan-black text-white border-jordan-black shadow-lg' 
                : 'bg-white text-gray-500 border-gray-100 hover:border-jordan-gold'
              }`}
            >
              {cat === 'ALL' ? 'كافة السجلات' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {records
          .filter(r => filter === 'ALL' || r.category === filter)
          .map(record => (
            <MedicalRecordCard 
              key={record.id} 
              record={record} 
              onToggleVisibility={(id) => alert(`تغيير مستوى الخصوصية للملف ${id}`)}
            />
          ))}
        
        <div 
          onClick={() => setIsAddModalOpen(true)}
          className="border-2 border-dashed border-jordan-gold/20 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center hover:border-jordan-green transition-colors cursor-pointer group bg-white/50"
        >
          <div className="h-16 w-16 bg-jordan-sand rounded-full flex items-center justify-center mb-4 group-hover:bg-jordan-green/10 transition-colors">
            <CloudArrowUpIcon className="h-8 w-8 text-jordan-gold group-hover:text-jordan-green" />
          </div>
          <span className="text-sm font-bold text-jordan-slate group-hover:text-jordan-green">رفع ملف طبي جديد</span>
          <p className="text-xs text-gray-400 mt-2">PDF, Images (Max 20MB)</p>
        </div>
      </div>

      {/* Add Record Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-jordan-black/80 backdrop-blur-md" onClick={() => setIsAddModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
             <button onClick={() => setIsAddModalOpen(false)} className="absolute top-8 left-8 text-gray-400 hover:text-jordan-red">
               <XMarkIcon className="h-6 w-6" />
             </button>
             <h3 className="text-2xl font-serif font-bold text-jordan-black mb-6">إضافة ملف للسجل الطبي</h3>
             <form onSubmit={handleAddRecord} className="space-y-6">
                <div>
                   <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">عنوان التقرير</label>
                   <input 
                    type="text" 
                    required
                    placeholder="مثال: فحص دم شامل"
                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-jordan-sand/10 outline-none focus:ring-2 focus:ring-jordan-green"
                    value={newRecord.title}
                    onChange={(e) => setNewRecord({...newRecord, title: e.target.value})}
                   />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">التصنيف</label>
                    <select 
                      className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-jordan-sand/10 outline-none focus:ring-2 focus:ring-jordan-green"
                      value={newRecord.category}
                      onChange={(e) => setNewRecord({...newRecord, category: e.target.value as any})}
                    >
                      {Object.values(MedicalRecordCategory).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">الخصوصية</label>
                    <select 
                      className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-jordan-sand/10 outline-none focus:ring-2 focus:ring-jordan-green"
                      value={newRecord.visibility}
                      onChange={(e) => setNewRecord({...newRecord, visibility: e.target.value as any})}
                    >
                      <option value={VisibilityLevel.PRIVATE}>خاص بي فقط</option>
                      <option value={VisibilityLevel.COORDINATOR}>مشاركة مع المنسق</option>
                      <option value={VisibilityLevel.HOSPITAL}>مشاركة مع المستشفى</option>
                    </select>
                  </div>
                </div>
                <div className="border-2 border-dashed border-jordan-gold/10 p-8 rounded-2xl text-center hover:bg-jordan-sand/30 transition-colors cursor-pointer">
                   <CloudArrowUpIcon className="h-8 w-8 text-jordan-gold mx-auto mb-2" />
                   <p className="text-sm font-bold text-jordan-slate">اختر الملف من جهازك</p>
                </div>
                <button type="submit" className="w-full bg-jordan-green text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-jordan-black transition-all">حفظ الملف في السجل</button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecordsManager;
