
import React, { useState } from 'react';
import { Review, ReviewStatus } from '../../types';
import StarRating from '../Review/StarRating';
import { 
  CheckIcon, 
  XMarkIcon, 
  ChatBubbleBottomCenterTextIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const ReviewModeration: React.FC = () => {
  const [pendingReviews, setPendingReviews] = useState<Review[]>([
    {
      id: 'rev_1',
      userId: 'u123',
      userName: 'خالد السعد',
      bookingId: 'BK-9981',
      hospitalId: 'h1',
      programId: 'p1',
      rating: 5,
      comment: 'تجربة ممتازة جداً. الطاقم الطبي في الأردن محترف للغاية والمنسق كان معي في كل خطوة. أنصح بشدة.',
      status: ReviewStatus.PENDING,
      createdAt: new Date().toISOString()
    }
  ]);

  const handleAction = (id: string, newStatus: ReviewStatus) => {
    setPendingReviews(pendingReviews.filter(r => r.id !== id));
    alert(`تم ${newStatus === ReviewStatus.PUBLISHED ? 'نشر' : 'رفض'} التقييم بنجاح.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-jordan-black">مراجعة تقييمات المرضى</h3>
        <span className="bg-jordan-red text-white px-3 py-1 rounded-full text-xs font-bold">{pendingReviews.length} بانتظار المراجعة</span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pendingReviews.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-gray-100 text-gray-400">
            لا توجد تقييمات معلقة حالياً.
          </div>
        ) : (
          pendingReviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-2xl border border-jordan-gold/10 shadow-sm flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center space-x-3 space-x-reverse mb-3">
                  <div className="h-10 w-10 bg-jordan-sand rounded-full flex items-center justify-center text-jordan-gold">
                    <UserIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-jordan-black text-sm">{review.userName}</h4>
                    <p className="text-[10px] text-gray-400">حجز رقم: {review.bookingId}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} size="sm" />
                <p className="mt-4 text-sm text-gray-600 leading-relaxed italic">"{review.comment}"</p>
                <div className="mt-4 flex items-center text-[10px] text-jordan-green font-bold uppercase tracking-widest">
                  <ChatBubbleBottomCenterTextIcon className="h-3 w-3 ml-1" />
                  المستشفى التخصصي - تغيير مفصل الركبة
                </div>
              </div>
              <div className="flex md:flex-col justify-end space-x-2 md:space-x-0 md:space-y-2 space-x-reverse">
                <button 
                  onClick={() => handleAction(review.id, ReviewStatus.PUBLISHED)}
                  className="flex items-center justify-center space-x-2 space-x-reverse bg-jordan-green text-white px-4 py-2 rounded-xl text-sm font-bold hover:shadow-lg transition-all"
                >
                  <CheckIcon className="h-4 w-4" />
                  <span>موافقة</span>
                </button>
                <button 
                  onClick={() => handleAction(review.id, ReviewStatus.REJECTED)}
                  className="flex items-center justify-center space-x-2 space-x-reverse border border-gray-100 text-gray-400 px-4 py-2 rounded-xl text-sm font-bold hover:bg-jordan-red hover:text-white transition-all"
                >
                  <XMarkIcon className="h-4 w-4" />
                  <span>رفض</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewModeration;
