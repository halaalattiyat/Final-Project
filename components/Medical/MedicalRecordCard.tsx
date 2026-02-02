
import React from 'react';
import { MedicalRecord, VisibilityLevel, MedicalRecordCategory } from '../../types';
import { 
  DocumentIcon, 
  EyeIcon, 
  LockClosedIcon, 
  ShareIcon,
  TrashIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface MedicalRecordCardProps {
  record: MedicalRecord;
  onDelete?: (id: string) => void;
  onToggleVisibility?: (id: string) => void;
}

const CategoryBadge: React.FC<{ category: MedicalRecordCategory }> = ({ category }) => {
  const labels: Record<MedicalRecordCategory, string> = {
    [MedicalRecordCategory.RADIOLOGY]: 'تصوير إشعاعي',
    [MedicalRecordCategory.LAB_RESULTS]: 'نتائج مخبرية',
    [MedicalRecordCategory.PRESCRIPTION]: 'وصفة طبية',
    [MedicalRecordCategory.SURGERY_REPORT]: 'تقرير جراحي',
    [MedicalRecordCategory.GENERAL]: 'عام'
  };
  return (
    <span className="text-[10px] font-bold bg-jordan-sand text-jordan-gold px-2 py-0.5 rounded-md uppercase tracking-wider">
      {labels[category]}
    </span>
  );
};

const MedicalRecordCard: React.FC<MedicalRecordCardProps> = ({ record, onDelete, onToggleVisibility }) => {
  return (
    <div className="bg-white border border-jordan-gold/10 rounded-2xl p-4 hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="p-3 bg-jordan-sand/50 rounded-xl text-jordan-green">
            <DocumentIcon className="h-6 w-6" />
          </div>
          <div>
            <CategoryBadge category={record.category} />
            <h4 className="font-bold text-jordan-black mt-1 line-clamp-1">{record.title}</h4>
            <p className="text-[10px] text-gray-400">{new Date(record.uploadDate).toLocaleDateString('ar-JO')}</p>
          </div>
        </div>
        <div className="flex space-x-1 space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 hover:bg-red-50 text-gray-400 hover:text-jordan-red rounded-lg transition-colors">
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-3 mb-4">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center text-gray-500">
            {record.visibility === VisibilityLevel.PRIVATE ? (
              <LockClosedIcon className="h-3.5 w-3.5 ml-1.5" />
            ) : record.visibility === VisibilityLevel.COORDINATOR ? (
              <InformationCircleIcon className="h-3.5 w-3.5 ml-1.5 text-blue-500" />
            ) : (
              <ShareIcon className="h-3.5 w-3.5 ml-1.5 text-jordan-green" />
            )}
            <span>
              {record.visibility === VisibilityLevel.PRIVATE && 'خاص بك فقط'}
              {record.visibility === VisibilityLevel.COORDINATOR && 'مشاركة مع المنسق'}
              {record.visibility === VisibilityLevel.HOSPITAL && 'مشاركة مع المركز الطبي'}
            </span>
          </div>
          <button 
            onClick={() => onToggleVisibility?.(record.id)}
            className="text-jordan-green font-bold hover:underline"
          >
            تغيير
          </button>
        </div>
      </div>

      <button className="w-full flex items-center justify-center space-x-2 space-x-reverse py-2.5 bg-jordan-black text-white rounded-xl text-sm font-bold hover:bg-jordan-green transition-colors">
        <EyeIcon className="h-4 w-4" />
        <span>عرض الملف الآمن</span>
      </button>
    </div>
  );
};

export default MedicalRecordCard;
