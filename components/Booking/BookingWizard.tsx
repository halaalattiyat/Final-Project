
import React, { useState } from 'react';
import { TreatmentProgram, Hospital } from '../../types';
import { HOSPITALS } from '../../data/seedData';
import { 
  XMarkIcon, 
  ChevronLeftIcon, 
  CloudArrowUpIcon, 
  CalendarDaysIcon, 
  ClockIcon,
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface BookingWizardProps {
  program: TreatmentProgram;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const BookingWizard: React.FC<BookingWizardProps> = ({ program, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    preferredDate: '',
    medicalNotes: '',
    stayDays: program.durationDays,
    files: []
  });

  const hospital = HOSPITALS.find(h => h.id === program.hospitalId);

  const nextStep = () => setStep(s => Math.min(3, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const handleFinalSubmit = async () => {
    if (!formData.medicalNotes || !formData.preferredDate) {
      alert("Please ensure all medical details and dates are provided.");
      setStep(1); // Go back to first step to fix errors
      return;
    }

    setIsSubmitting(true);
    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    onSubmit(formData);
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-jordan-black/70 backdrop-blur-md" onClick={onClose}></div>
        <div className="relative bg-white w-full max-w-2xl rounded-[3rem] p-16 text-center shadow-2xl animate-in zoom-in fade-in duration-500">
          <div className="h-24 w-24 bg-jordan-green/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-jordan-green/20">
            <CheckCircleIcon className="h-12 w-12 text-jordan-green" />
          </div>
          <h2 className="text-4xl font-serif font-bold text-jordan-black mb-4">Ahlan wa Sahlan</h2>
          <p className="text-jordan-slate text-lg mb-8 leading-relaxed">
            Your inquiry for <span className="font-bold text-jordan-black">{program.titleEn}</span> has been received. Our medical coordinators will contact you within 24 hours.
          </p>
          
          <div className="bg-jordan-sand rounded-3xl p-8 mb-10 border border-jordan-gold/10 text-left">
             <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Inquiry ID:</span>
                <span className="font-mono font-bold text-jordan-black">#TK-{Math.floor(Math.random() * 90000) + 10000}</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Assigned Facility:</span>
                <span className="font-bold text-jordan-black">{hospital?.nameEn}</span>
             </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-jordan-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-jordan-green transition-all shadow-xl"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-jordan-black/70 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-5xl h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        
        {/* Left Info Panel */}
        <div className="md:w-80 bg-jordan-sand p-10 flex flex-col flex-shrink-0">
          <div className="mb-10">
            <span className="text-[10px] font-bold text-jordan-red uppercase tracking-widest block mb-2">{hospital?.nameEn}</span>
            <h2 className="text-3xl font-serif font-bold text-jordan-black leading-tight">{program.titleEn}</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-jordan-gold/5">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Medical Duration</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-jordan-black">{program.durationDays}</span>
                <span className="text-sm font-medium text-gray-500">Days</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-jordan-gold/5">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Estimated Cost</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-jordan-green">{program.basePrice}</span>
                <span className="text-sm font-bold text-jordan-green ml-1">JOD</span>
              </div>
            </div>
          </div>

          <div className="mt-auto hidden md:block">
             <div className="flex items-center space-x-2 mb-4">
                <SparklesIcon className="h-4 w-4 text-jordan-gold" />
                <h4 className="text-[10px] font-bold text-jordan-gold uppercase tracking-widest">Inquiry Assistance</h4>
             </div>
             <p className="text-[10px] text-jordan-slate leading-relaxed italic opacity-60">
               No credit card required. Our team provides free medical evaluation for international patients.
             </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex-1 flex flex-col relative bg-white overflow-hidden">
          {/* Header */}
          <div className="p-12 pb-6 flex justify-between items-center">
            <div className="flex-1 max-w-md">
                <div className="flex items-center space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-jordan-green' : 'bg-gray-100'}`}></div>
                  ))}
                </div>
            </div>
            <button onClick={onClose} className="ml-8 text-gray-400 hover:text-jordan-red transition-colors">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-12 pb-32">
            <div className="max-w-2xl">
              {step === 1 && (
                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-jordan-black mb-2">Arrival & Stay</h3>
                    <p className="text-gray-500 text-sm">Coordinate your travel dates and choose your preferred length of stay.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center">
                        <CalendarDaysIcon className="h-4 w-4 mr-2" />
                        Preferred Start Date
                      </label>
                      <input 
                        type="date" 
                        required
                        className="w-full p-5 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:ring-2 focus:ring-jordan-green focus:bg-white transition-all text-lg font-medium"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center">
                        <ClockIcon className="h-4 w-4 mr-2" />
                        Desired Stay Days
                      </label>
                      <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                        <button 
                          onClick={() => setFormData(d => ({...d, stayDays: Math.max(1, d.stayDays - 1)}))}
                          className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold text-xl hover:bg-jordan-sand transition-colors"
                        >-</button>
                        <div className="flex-1 text-center">
                          <span className="text-xl font-bold text-jordan-black">{formData.stayDays}</span>
                          <span className="text-xs text-gray-400 ml-1">Days</span>
                        </div>
                        <button 
                          onClick={() => setFormData(d => ({...d, stayDays: d.stayDays + 1}))}
                          className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold text-xl hover:bg-jordan-sand transition-colors"
                        >+</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-jordan-black mb-2">Medical Reports</h3>
                    <p className="text-gray-500 text-sm">Detailed information helps our medical board provide an accurate evaluation.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Medical Summary</label>
                    <textarea 
                      placeholder="Symptoms, previous treatments, or specific medical needs..."
                      className="w-full p-6 h-48 rounded-3xl border border-gray-100 bg-gray-50 outline-none focus:ring-2 focus:ring-jordan-green focus:bg-white transition-all resize-none text-sm leading-relaxed"
                      value={formData.medicalNotes}
                      onChange={(e) => setFormData({...formData, medicalNotes: e.target.value})}
                    />
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-200 rounded-[2rem] p-12 text-center hover:border-jordan-green hover:bg-jordan-green/5 transition-all cursor-pointer group bg-gray-50/50">
                    <CloudArrowUpIcon className="h-12 w-12 text-gray-300 mx-auto mb-4 group-hover:text-jordan-green group-hover:scale-110 transition-all" />
                    <div className="text-sm font-bold text-gray-500 group-hover:text-jordan-green uppercase tracking-widest">Attach Reports (PDF, IMAGES)</div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-3xl font-serif font-bold text-jordan-black">Inquiry Summary</h3>
                  <div className="bg-jordan-sand/50 p-10 rounded-[2.5rem] space-y-6 border border-jordan-gold/10">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                      <span className="text-gray-500 font-medium">Program:</span>
                      <span className="font-bold text-jordan-black">{program.titleEn}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                      <span className="text-gray-500 font-medium">Facility:</span>
                      <span className="font-bold text-jordan-black">{hospital?.nameEn}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                      <span className="text-gray-500 font-medium">Arrival Date:</span>
                      <span className="font-bold text-jordan-black">{formData.preferredDate || 'Select in Step 1'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 font-medium">Stay Request:</span>
                      <span className="font-bold text-jordan-green">{formData.stayDays} Days</span>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-jordan-green/5 rounded-2xl border border-jordan-green/10 flex items-start space-x-4">
                     <CheckCircleIcon className="h-6 w-6 text-jordan-green flex-shrink-0" />
                     <p className="text-xs text-jordan-green font-medium leading-relaxed">
                       By submitting this inquiry, you agree to share your medical data with Tabasheer Khair's medical coordinators and the selected facility for clinical evaluation.
                     </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-8 border-t border-gray-100 flex justify-between items-center z-30">
            {step > 1 ? (
              <button 
                onClick={prevStep} 
                className="flex items-center text-gray-400 font-bold hover:text-jordan-black transition-colors px-4 py-2"
              >
                <ChevronLeftIcon className="h-5 w-5 mr-1" />
                Back
              </button>
            ) : <div />}

            <div className="flex items-center space-x-4">
              {step < 3 ? (
                <button 
                  onClick={nextStep}
                  className="bg-jordan-green text-white px-20 py-4 rounded-2xl font-bold shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all"
                >
                  Continue
                </button>
              ) : (
                <button 
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="bg-jordan-black text-white px-20 py-4 rounded-2xl font-bold shadow-lg hover:bg-jordan-green hover:scale-[1.02] transition-all flex items-center justify-center min-w-[240px]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-3">
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : 'Submit Inquiry'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingWizard;
