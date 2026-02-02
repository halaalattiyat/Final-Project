
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  UserIcon, 
  DocumentTextIcon, 
  ClockIcon, 
  ArrowLeftOnRectangleIcon,
  CreditCardIcon,
  ChatBubbleLeftEllipsisIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import PaymentPortal from '../components/Payment/PaymentPortal';
import MedicalRecordsManager from '../components/Medical/MedicalRecordsManager';
import ChatWindow from '../components/Chat/ChatWindow';
import ChatList from '../components/Chat/ChatList';
import ReviewForm from '../components/Review/ReviewForm';
import { Booking, BookingStatus, PaymentMethod, ChatThread } from '../types';
import { PROGRAMS, HOSPITALS } from '../data/seedData';

interface ProfileProps {
  bookings?: Booking[];
}

const Profile: React.FC<ProfileProps> = ({ bookings = [] }) => {
  const { user, logout } = useAuth();
  const [activeView, setActiveView] = useState<'profile' | 'reports' | 'bookings' | 'chat'>('bookings');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [reviewingBooking, setReviewingBooking] = useState<any>(null);

  if (!user) return null;

  const mockThreads: ChatThread[] = [
    {
      id: 'thread_1',
      bookingId: 'General',
      patientId: user.id,
      lastMessage: 'Welcome to Tabasheer Khair.',
      updatedAt: new Date().toISOString(),
      participants: ['admin_1', user.id]
    }
  ];

  const [activeThread, setActiveThread] = useState<ChatThread>(mockThreads[0]);

  const handlePaymentSuccess = (method: PaymentMethod) => {
    setIsPaymentOpen(false);
    alert('Payment received! Your booking is now being processed by the hospital.');
  };

  const handleReviewSubmit = (data: { rating: number; comment: string }) => {
    setReviewingBooking(null);
    alert('Thank you for your feedback! It will be published after moderation.');
  };

  const getProgramInfo = (programId: string) => {
    const prog = PROGRAMS.find(p => p.id === programId);
    const hosp = prog ? HOSPITALS.find(h => h.id === prog.hospitalId) : null;
    return { prog, hosp };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-jordan-gold/10 p-6">
            <div className="text-center mb-8">
              <div className="h-20 w-20 bg-jordan-sand rounded-full mx-auto flex items-center justify-center text-jordan-green mb-4 border-2 border-jordan-gold/20">
                <UserIcon className="h-10 w-10" />
              </div>
              <h2 className="text-xl font-bold text-jordan-black">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveView('bookings')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeView === 'bookings' ? 'bg-jordan-green text-white shadow-md' : 'text-gray-600 hover:bg-jordan-sand'}`}
              >
                <ClockIcon className="h-5 w-5" />
                <span>My Journey</span>
              </button>
              <button 
                onClick={() => setActiveView('reports')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeView === 'reports' ? 'bg-jordan-green text-white shadow-md' : 'text-gray-600 hover:bg-jordan-sand'}`}
              >
                <DocumentTextIcon className="h-5 w-5" />
                <span>Medical Records</span>
              </button>
              <button 
                onClick={() => setActiveView('chat')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeView === 'chat' ? 'bg-jordan-green text-white shadow-md' : 'text-gray-600 hover:bg-jordan-sand'}`}
              >
                <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
                <span>Concierge Chat</span>
              </button>
              <button 
                onClick={() => setActiveView('profile')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeView === 'profile' ? 'bg-jordan-green text-white shadow-md' : 'text-gray-600 hover:bg-jordan-sand'}`}
              >
                <UserIcon className="h-5 w-5" />
                <span>Personal Data</span>
              </button>
              <div className="pt-4 mt-4 border-t border-gray-100">
                <button 
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-jordan-red hover:bg-jordan-red/5 transition-colors"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 lg:mt-0 lg:col-span-9 space-y-8 animate-fade-in">
          {activeView === 'reports' && (
            <div className="bg-white/40 rounded-3xl p-2">
              <MedicalRecordsManager />
            </div>
          )}

          {activeView === 'chat' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <ChatList 
                  threads={mockThreads} 
                  activeThreadId={activeThread?.id} 
                  onSelect={setActiveThread} 
                />
              </div>
              <div className="md:col-span-2">
                {activeThread ? (
                  <ChatWindow 
                    thread={activeThread} 
                    currentUserId={user.id} 
                    programTitle="Medical Support" 
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-white rounded-2xl border border-jordan-gold/10 text-gray-400">
                    Select a conversation
                  </div>
                )}
              </div>
            </div>
          )}

          {activeView === 'bookings' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-bold text-jordan-black">Treatment Inquiries</h3>
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <div className="bg-white p-16 rounded-[2.5rem] text-center border border-dashed border-jordan-gold/20">
                    <ClockIcon className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-bold">You haven't submitted any inquiries yet.</p>
                  </div>
                ) : (
                  bookings.map((booking) => {
                    const { prog, hosp } = getProgramInfo(booking.programId);
                    return (
                      <div key={booking.id} className="bg-white rounded-2xl shadow-sm border border-jordan-gold/10 overflow-hidden">
                        <div className="p-8">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                              <span className="inline-block px-3 py-1 bg-jordan-gold/10 text-jordan-gold text-[10px] font-bold rounded-full mb-2 uppercase">Ref: {booking.id}</span>
                              <h4 className="text-xl font-bold text-jordan-black">{prog?.titleEn || 'Treatment'}</h4>
                              <p className="text-gray-500 text-sm">{hosp?.nameEn || 'Hospital'} • Requested: {new Date(booking.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="text-left md:text-right">
                              <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold block mb-2 text-center uppercase tracking-widest ${
                                booking.status === BookingStatus.APPROVED ? 'bg-green-100 text-green-700' : 
                                booking.status === BookingStatus.PENDING ? 'bg-jordan-sand text-jordan-gold' : 'bg-jordan-black text-white'
                              }`}>
                                {booking.status}
                              </span>
                              <p className="text-2xl font-bold text-jordan-green">{prog?.basePrice || '---'} JOD</p>
                            </div>
                          </div>
                          
                          <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            {booking.status === BookingStatus.APPROVED ? (
                              <>
                                <button 
                                  onClick={() => setIsPaymentOpen(true)}
                                  className="flex-1 bg-jordan-green text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                                >
                                  <CreditCardIcon className="h-5 w-5" />
                                  <span>Secure Payment</span>
                                </button>
                                <button 
                                  onClick={() => setActiveView('chat')}
                                  className="px-8 py-4 bg-jordan-sand text-jordan-black rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center space-x-2"
                                >
                                  <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
                                  <span>Chat with Coordinator</span>
                                </button>
                              </>
                            ) : (
                              <>
                                <div className="flex-1 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                   <p className="text-xs text-gray-500 font-medium leading-relaxed italic">
                                     Our medical board is currently reviewing your documents. You will receive a formal quotation and medical plan within 24 hours.
                                   </p>
                                </div>
                                <button 
                                  onClick={() => setActiveView('chat')}
                                  className="px-8 py-4 bg-white border border-gray-100 text-jordan-black rounded-xl font-bold hover:bg-jordan-sand transition-all"
                                >
                                  Ask a Question
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {activeView === 'profile' && (
             <div className="bg-white rounded-2xl shadow-sm border border-jordan-gold/10 p-8">
               <h3 className="text-2xl font-serif font-bold text-jordan-black mb-6">Personal Profile</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-xs text-gray-400">Full Name</label>
                   <p className="font-bold text-jordan-black border-b border-gray-100 pb-2">{user.firstName} {user.lastName}</p>
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs text-gray-400">Email Address</label>
                   <p className="font-bold text-jordan-black border-b border-gray-100 pb-2">{user.email}</p>
                 </div>
               </div>
             </div>
          )}
        </div>
      </div>

      {isPaymentOpen && (
        <PaymentPortal 
          amount={5500} 
          bookingId="BK-PENDING" 
          onClose={() => setIsPaymentOpen(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {reviewingBooking && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-jordan-black/80 backdrop-blur-sm" onClick={() => setReviewingBooking(null)}></div>
          <div className="relative animate-in fade-in zoom-in duration-300">
            <ReviewForm 
              bookingId={reviewingBooking.id}
              programTitle={reviewingBooking.programName}
              hospitalName={reviewingBooking.hospitalName}
              onCancel={() => setReviewingBooking(null)}
              onSubmit={handleReviewSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
