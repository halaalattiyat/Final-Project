
import React, { useState } from 'react';
import StarRating from './StarRating';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

interface ReviewFormProps {
  bookingId: string;
  programTitle: string;
  hospitalName: string;
  onSubmit: (data: { rating: number; comment: string }) => void;
  onCancel: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ bookingId, programTitle, hospitalName, onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-jordan-gold/10 max-w-lg w-full">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-serif font-bold text-jordan-black">تقييم رحلتك العلاجية</h3>
        <p className="text-gray-500 text-sm mt-1">{programTitle} في {hospitalName}</p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <label className="text-sm font-bold text-gray-700 mb-2">ما هو تقييمك العام للتجربة؟</label>
          <StarRating rating={rating} size="lg" interactive onChange={setRating} />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">شاركنا تجربتك بالتفصيل</label>
          <textarea
            placeholder="كيف كانت الخدمة؟ هل تنصح الآخرين بهذا المركز؟"
            className="w-full h-32 p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-jordan-green outline-none transition-all resize-none text-sm"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="bg-jordan-sand/50 p-4 rounded-xl flex items-start space-x-3 space-x-reverse">
          <ShieldCheckIcon className="h-5 w-5 text-jordan-green mt-0.5" />
          <p className="text-[10px] text-gray-500 leading-relaxed">
            سياسة الخصوصية: تقييمك يساعد الآخرين. لن نقوم بنشر معلوماتك الشخصية الحساسة. سيتم مراجعة التقييم من قبل فريق الإشراف قبل النشر.
          </p>
        </div>

        <div className="flex space-x-3 space-x-reverse">
          <button
            onClick={() => onSubmit({ rating, comment })}
            disabled={rating === 0 || comment.length < 10}
            className="flex-1 bg-jordan-green text-white py-3.5 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 transition-all"
          >
            نشر التقييم
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3.5 text-gray-400 font-bold hover:text-jordan-red transition-colors"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
