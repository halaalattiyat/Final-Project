
import React from 'react';
import { ChatThread } from '../../types';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface ChatListProps {
  threads: ChatThread[];
  activeThreadId: string;
  onSelect: (thread: ChatThread) => void;
}

const ChatList: React.FC<ChatListProps> = ({ threads, activeThreadId, onSelect }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-jordan-gold/10 overflow-hidden h-full">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-bold text-jordan-black">المحادثات النشطة</h3>
        <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400" />
      </div>
      <div className="overflow-y-auto max-h-[500px]">
        {threads.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">لا توجد محادثات نشطة حالياً.</div>
        ) : (
          threads.map((thread) => (
            <button
              key={thread.id}
              onClick={() => onSelect(thread)}
              className={`w-full p-4 flex items-center space-x-3 space-x-reverse text-right transition-all border-b border-gray-50 last:border-0 ${
                activeThreadId === thread.id ? 'bg-jordan-sand/50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <div className="h-12 w-12 bg-jordan-sand rounded-full flex items-center justify-center text-jordan-green font-bold text-lg">
                  {thread.participants.length > 2 ? 'G' : 'C'}
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-jordan-green border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-jordan-black text-sm truncate">تنسيق: {thread.bookingId}</span>
                  <span className="text-[10px] text-gray-400">اليوم</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{thread.lastMessage || 'بانتظار الرد...'}</p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
