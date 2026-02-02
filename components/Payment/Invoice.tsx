
import React from 'react';
import { Booking, TreatmentProgram, Hospital, PriceBreakdown } from '../../types';

interface InvoiceProps {
  booking: Booking;
  program: TreatmentProgram;
  hospital: Hospital;
  breakdown: PriceBreakdown;
}

const Invoice: React.FC<InvoiceProps> = ({ booking, program, hospital, breakdown }) => {
  return (
    <div className="bg-white p-12 max-w-4xl mx-auto shadow-2xl border-t-8 border-jordan-green rounded-b-xl font-sans" id="invoice-content">
      {/* Header */}
      <div className="flex justify-between items-start border-b border-gray-100 pb-8 mb-8">
        <div>
          <div className="flex items-center space-x-3 space-x-reverse mb-4">
            <div className="h-12 w-12 bg-jordan-green rounded-full flex items-center justify-center text-white font-serif text-2xl border-2 border-jordan-gold">ت</div>
            <span className="text-3xl font-serif font-bold text-jordan-green">تباشير خير</span>
          </div>
          <p className="text-gray-500 text-sm">تباشير خير للسياحة العلاجية</p>
          <p className="text-gray-500 text-sm">عمان، الأردن - شارع العبدلي</p>
          <p className="text-gray-500 text-sm">الرقم الضريبي: 123456789</p>
        </div>
        <div className="text-left">
          <h2 className="text-4xl font-serif font-bold text-jordan-black mb-2 uppercase">فاتورة / Invoice</h2>
          <p className="text-gray-600">رقم الفاتورة: <span className="font-bold">#INV-{booking.id.slice(0, 8)}</span></p>
          <p className="text-gray-600">التاريخ: <span className="font-bold">{new Date().toLocaleDateString('ar-JO')}</span></p>
        </div>
      </div>

      {/* Info Sections */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        <div>
          <h3 className="text-sm font-bold text-jordan-gold uppercase tracking-wider mb-3">فوتر إلى / Billed To</h3>
          <p className="text-lg font-bold text-jordan-black">محمد أحمد</p>
          <p className="text-gray-500">مريض دولي - المملكة العربية السعودية</p>
          <p className="text-gray-500">mohammed.a@example.com</p>
        </div>
        <div>
          <h3 className="text-sm font-bold text-jordan-gold uppercase tracking-wider mb-3">المركز الطبي / Facility</h3>
          <p className="text-lg font-bold text-jordan-black">{hospital.nameAr}</p>
          <p className="text-gray-500">{hospital.location}</p>
          <p className="text-gray-500">برنامج: {program.titleAr}</p>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full text-right mb-12">
        <thead>
          <tr className="bg-jordan-sand text-jordan-black font-bold border-y border-jordan-gold/20">
            <th className="px-6 py-4">الوصف / Description</th>
            <th className="px-6 py-4 text-center">الكمية / Qty</th>
            <th className="px-6 py-4 text-left">السعر / Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <tr>
            <td className="px-6 py-4">
              <span className="font-bold block text-jordan-black">{program.titleAr}</span>
              <span className="text-xs text-gray-400">Base medical procedure & consultations</span>
            </td>
            <td className="px-6 py-4 text-center">1</td>
            <td className="px-6 py-4 text-left font-medium">{breakdown.baseTreatment} JOD</td>
          </tr>
          <tr>
            <td className="px-6 py-4">
              <span className="font-bold block text-jordan-black">رسوم المستشفى والإقامة</span>
              <span className="text-xs text-gray-400">Hospital facility fees & 3 nights stay</span>
            </td>
            <td className="px-6 py-4 text-center">1</td>
            <td className="px-6 py-4 text-left font-medium">{breakdown.hospitalFees} JOD</td>
          </tr>
          <tr>
            <td className="px-6 py-4">
              <span className="font-bold block text-jordan-black">رسوم منصة تباشير خير</span>
              <span className="text-xs text-gray-400">Concierge and coordination services</span>
            </td>
            <td className="px-6 py-4 text-center">1</td>
            <td className="px-6 py-4 text-left font-medium">{breakdown.platformFee} JOD</td>
          </tr>
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-64 space-y-3">
          <div className="flex justify-between text-gray-500">
            <span>المجموع الفرعي:</span>
            <span>{breakdown.total} JOD</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>الضريبة (0%):</span>
            <span>0 JOD</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t-2 border-jordan-black">
            <span className="text-lg font-bold text-jordan-black">الإجمالي:</span>
            <span className="text-2xl font-bold text-jordan-green">{breakdown.total} JOD</span>
          </div>
          <p className="text-[10px] text-left text-gray-400 mt-2 italic">approx. ${(breakdown.total * 1.41).toFixed(2)} USD</p>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-16 pt-8 border-t border-gray-100 text-center text-gray-400 text-xs">
        <p className="mb-2 italic">شكراً لاختياركم تباشير خير كشريككم في رحلة الاستشفاء بالأردن</p>
        <p>This is a computer generated invoice and requires no signature.</p>
      </div>
    </div>
  );
};

export default Invoice;
