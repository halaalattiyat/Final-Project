
import React, { useState } from 'react';
import { PaymentMethod, PaymentStatus } from '../../types';
import { 
  CreditCardIcon, 
  BuildingLibraryIcon, 
  CheckCircleIcon,
  CloudArrowUpIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface PaymentPortalProps {
  amount: number;
  bookingId: string;
  onSuccess: (method: PaymentMethod) => void;
  onClose: () => void;
}

const PaymentPortal: React.FC<PaymentPortalProps> = ({ amount, bookingId, onSuccess, onClose }) => {
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptUploaded, setReceiptUploaded] = useState(false);

  const handleCardPayment = () => {
    setIsProcessing(true);
    // Simulate payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(PaymentMethod.CREDIT_CARD);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-jordan-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl p-8">
        <button onClick={onClose} className="absolute top-6 left-6 text-gray-400 hover:text-jordan-red">
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-jordan-sand rounded-full text-jordan-green mb-4">
            <CheckCircleIcon className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-jordan-black">تأكيد الحجز</h2>
          <p className="text-gray-500 mt-2">يرجى اختيار وسيلة الدفع لتأكيد موعدك</p>
        </div>

        <div className="bg-jordan-sand/50 rounded-2xl p-6 mb-8 flex justify-between items-center border border-jordan-gold/10">
          <div>
            <span className="text-sm text-gray-500 block">إجمالي المبلغ المستحق</span>
            <span className="text-2xl font-bold text-jordan-green">{amount} دينار أردني</span>
          </div>
          <div className="text-left">
            <span className="text-xs text-gray-400 block">رقم المرجعي</span>
            <span className="font-mono font-medium text-jordan-black">#BK-{bookingId.slice(0, 6)}</span>
          </div>
        </div>

        {!method ? (
          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={() => setMethod(PaymentMethod.CREDIT_CARD)}
              className="flex items-center justify-between p-6 rounded-2xl border-2 border-gray-100 hover:border-jordan-green transition-all group"
            >
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-jordan-green/5 transition-colors">
                  <CreditCardIcon className="h-8 w-8 text-jordan-green" />
                </div>
                <div className="text-right">
                  <span className="font-bold block text-jordan-black">بطاقة ائتمان / مدى</span>
                  <span className="text-xs text-gray-400">دفع فوري وآمن (Visa, Mastercard)</span>
                </div>
              </div>
            </button>

            <button 
              onClick={() => setMethod(PaymentMethod.BANK_TRANSFER)}
              className="flex items-center justify-between p-6 rounded-2xl border-2 border-gray-100 hover:border-jordan-green transition-all group"
            >
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-jordan-green/5 transition-colors">
                  <BuildingLibraryIcon className="h-8 w-8 text-jordan-green" />
                </div>
                <div className="text-right">
                  <span className="font-bold block text-jordan-black">حوالة بنكية (SWIFT)</span>
                  <span className="text-xs text-gray-400">للمبالغ الكبيرة، تأكيد خلال ٢٤ ساعة</span>
                </div>
              </div>
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {method === PaymentMethod.CREDIT_CARD && (
              <div className="space-y-4">
                <input type="text" placeholder="رقم البطاقة" className="w-full p-4 border border-gray-200 rounded-xl" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM/YY" className="p-4 border border-gray-200 rounded-xl" />
                  <input type="text" placeholder="CVC" className="p-4 border border-gray-200 rounded-xl" />
                </div>
                <button 
                  disabled={isProcessing}
                  onClick={handleCardPayment}
                  className="w-full bg-jordan-black text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center space-x-3 space-x-reverse"
                >
                  {isProcessing ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <span>دفع الآن {amount} JOD</span>
                  )}
                </button>
              </div>
            )}

            {method === PaymentMethod.BANK_TRANSFER && (
              <div className="space-y-6">
                <div className="bg-jordan-black text-white p-6 rounded-2xl space-y-2 text-sm">
                  <p><span className="text-jordan-gold">اسم المستفيد:</span> تباشير خير للسياحة العلاجية</p>
                  <p><span className="text-jordan-gold">البنك:</span> بنك الإسكان للتجارة والتمويل</p>
                  <p><span className="text-jordan-gold">IBAN:</span> JO 00 HBTF 1234 5678 9000 0000</p>
                  <p><span className="text-jordan-gold">Swift Code:</span> HBTFJOAX</p>
                </div>
                <div 
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${receiptUploaded ? 'bg-green-50 border-jordan-green' : 'border-gray-200 hover:border-jordan-green'}`}
                  onClick={() => setReceiptUploaded(true)}
                >
                  {receiptUploaded ? (
                    <div className="text-jordan-green">
                      <CheckCircleIcon className="h-10 w-10 mx-auto mb-2" />
                      <p className="font-bold">تم رفع إشعار التحويل</p>
                    </div>
                  ) : (
                    <>
                      <CloudArrowUpIcon className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">ارفع صورة إشعار التحويل هنا</p>
                    </>
                  )}
                </div>
                <button 
                  disabled={!receiptUploaded}
                  onClick={() => onSuccess(PaymentMethod.BANK_TRANSFER)}
                  className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all ${receiptUploaded ? 'bg-jordan-green text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                >
                  إرسال للتدقيق
                </button>
              </div>
            )}

            <button onClick={() => setMethod(null)} className="w-full text-center text-sm text-gray-400 font-medium hover:text-jordan-green">العودة لخيارات الدفع</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPortal;
