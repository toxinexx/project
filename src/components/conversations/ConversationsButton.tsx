import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useConversations } from './hooks/useConversations';
import { ConversationsPanel } from './ConversationsPanel';

export function ConversationsButton() {
  const { unreadCount } = useConversations();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
        title="Messages"
      >
        <MessageSquare className="w-6 h-6 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-50 animate-ping" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-500 text-[10px] text-white items-center justify-center font-medium">
              {unreadCount}
            </span>
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <ConversationsPanel onClose={() => setIsOpen(false)} />
        </>
      )}
    </>
  );
}