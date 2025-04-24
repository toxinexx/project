import React, { useState } from 'react';
import { Send, Phone, MessageSquare } from 'lucide-react';
import { Conversation, Message } from '../../types/conversation';
import { MessageList } from './MessageList';
import { ContactInfo } from './ContactInfo';

interface ConversationDetailProps {
  conversation: Conversation;
  onClose: () => void;
  onSendMessage: (message: string) => void;
  onCall: () => void;
}

export function ConversationDetail({ 
  conversation, 
  onClose,
  onSendMessage,
  onCall 
}: ConversationDetailProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    onSendMessage(message);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <ContactInfo contact={conversation.contact} />
        <div className="flex items-center gap-2">
          <button
            onClick={onCall}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Call contact"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Close conversation"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={conversation.messages} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 
              transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}