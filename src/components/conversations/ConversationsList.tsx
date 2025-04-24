import React from 'react';
import { MessageSquare, User, ThermometerSun, Users } from 'lucide-react';
import { Conversation } from '../../types/conversation';

interface ConversationsListProps {
  conversations: Conversation[];
  onSelect: (conversation: Conversation) => void;
}

export function ConversationsList({ conversations, onSelect }: ConversationsListProps) {
  const getTemperatureColor = (temp: string) => {
    switch (temp) {
      case 'hot': return 'text-red-500';
      case 'warm': return 'text-amber-500';
      case 'cold': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getLeadStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-800';
      case 'warm': return 'bg-amber-100 text-amber-800';
      case 'cold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="divide-y">
      {conversations.map((conversation) => (
        <button
          key={conversation.id}
          onClick={() => onSelect(conversation)}
          className="w-full p-4 hover:bg-gray-50 flex items-start gap-4 text-left"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900 truncate">
                {conversation.contact.name}
              </h3>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                getLeadStatusColor(conversation.contact.leadStatus)
              }`}>
                {conversation.contact.leadStatus.toUpperCase()}
              </span>
            </div>
            
            <div className="mt-1 text-sm text-gray-500">
              {conversation.contact.phone}
            </div>
            
            <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <ThermometerSun className={`w-4 h-4 ${
                  getTemperatureColor(conversation.contact.temperature)
                }`} />
                Temperature: {conversation.contact.temperature}
              </div>
              
              {conversation.contact.assignedTo && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Assigned: {conversation.contact.assignedTo}
                </div>
              )}
            </div>
          </div>
          
          {conversation.messages.some(m => !m.read) && (
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
          )}
        </button>
      ))}
    </div>
  );
}