import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ConversationsList } from './ConversationsList';
import { ConversationDetail } from './ConversationDetail';
import { useConversations } from './hooks/useConversations';
import { Conversation } from '../../types/conversation';

interface ConversationsPanelProps {
  onClose: () => void;
}

export function ConversationsPanel({ onClose }: ConversationsPanelProps) {
  const { conversations, addMessage } = useConversations();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const handleSendMessage = (content: string) => {
    if (!selectedConversation) return;
    
    const message = {
      id: crypto.randomUUID(),
      type: 'outgoing' as const,
      content,
      timestamp: new Date().toISOString(),
      read: true
    };

    addMessage(selectedConversation.id, message);
  };

  const handleCall = () => {
    if (!selectedConversation) return;
    // In a real app, this would initiate a call
    console.log('Calling:', selectedConversation.contact.phone);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg z-50 flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Conversations</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {selectedConversation ? (
          <ConversationDetail
            conversation={selectedConversation}
            onClose={() => setSelectedConversation(null)}
            onSendMessage={handleSendMessage}
            onCall={handleCall}
          />
        ) : (
          <ConversationsList
            conversations={conversations}
            onSelect={setSelectedConversation}
          />
        )}
      </div>
    </div>
  );
}