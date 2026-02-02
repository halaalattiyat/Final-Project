
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, ChatThread } from '../../types';
import { 
  PaperAirplaneIcon, 
  PaperClipIcon, 
  ShieldCheckIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface ChatWindowProps {
  thread: ChatThread;
  currentUserId: string;
  programTitle: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ thread, currentUserId, programTitle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      threadId: thread.id,
      senderId: 'admin_1',
      senderName: 'المنسق الطبي (تباشير)',
      senderRole: 'ADMIN',
      content: 'أهلاً بك سيد أحمد. لقد استلمنا ملفاتك الطبية ونحن نقوم حالياً بمراجعتها مع أطباء العظام في المستشفى التخصصي.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isRead: true
    },
    {
      id: '2',
      threadId: thread.id,
      senderId: currentUserId,
      senderName: 'أحمد العلي',
      senderRole: 'PATIENT',
      content: 'شكراً لكم. هل يمكنني معرفة الوقت المتوقع للرد؟ أنا أحتاج لترتيب إجازتي السنوية.',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      isRead: true
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg: ChatMessage = {
      id: Date.now().toString(),
      threadId: thread.id,
      senderId: currentUserId,
      senderName: 'أحمد العلي',
      senderRole: 'PATIENT',
      content: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-sm border border-jordan-gold/10 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-jordan-sand/30">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="h-10 w-10 bg-jordan-green rounded-full flex items-center justify-center text-white font-bold">
            ج
          </div>
          <div>
            <h4 className="font-bold text-jordan-black text-sm">التنسيق الطبي: {programTitle}</h4>
            <div className="flex items-center text-[10px] text-jordan-green font-medium">
              <span className="h-1.5 w-1.5 bg-jordan-green rounded-full ml-1 animate-pulse"></span>
              المنسق متصل الآن
            </div>
          </div>
        </div>
        <div className="flex items-center text-xs text-gray-400">
           <ShieldCheckIcon className="h-4 w-4 ml-1 text-jordan-gold" />
           محادثة مشفرة آمنة
        </div>
      </div>

      {/* Info Bar */}
      <div className="px-4 py-2 bg-jordan-gold/5 border-b border-jordan-gold/10 flex items-center text-[11px] text-jordan-gold font-medium">
        <InformationCircleIcon className="h-4 w-4 ml-2" />
        يمكنك هنا مناقشة تفاصيل العلاج، الإقامة، والمواصلات مع منسق تباشير خير.
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUserId;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] ${isMe ? 'order-1' : 'order-2'}`}>
                <div className={`text-[10px] mb-1 text-gray-400 ${isMe ? 'text-right' : 'text-left'}`}>
                  {msg.senderName} • {new Date(msg.timestamp).toLocaleTimeString('ar-JO', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  isMe 
                    ? 'bg-jordan-green text-white rounded-tr-none' 
                    : 'bg-white border border-gray-100 text-jordan-black rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center space-x-2 space-x-reverse">
          <button type="button" className="p-2 text-gray-400 hover:text-jordan-gold transition-colors">
            <PaperClipIcon className="h-6 w-6" />
          </button>
          <input 
            type="text" 
            placeholder="اكتب رسالتك هنا..."
            className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-jordan-green transition-all"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button 
            type="submit"
            disabled={!newMessage.trim()}
            className="p-3 bg-jordan-black text-white rounded-xl hover:bg-jordan-green transition-all disabled:opacity-50"
          >
            <PaperAirplaneIcon className="h-5 w-5 rotate-180" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
