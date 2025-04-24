import React from 'react';
import { MessageSquare, Facebook, Instagram, Phone } from 'lucide-react';
import { Conversation } from '../../types/conversation';

interface ConversationListItemProps {
  conversation: Conversation;
  onSelect: () => void;
}

export function ConversationListItem({ conversation, onSelect }: ConversationListItemProps) {
  const getPlatformIcon = () => {
    switch (conversation.platform) {
      case 'facebook':
        return <Facebook className="w-4 h-4 text-blue-600" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-600" />;
      default:
        return <Phone className="w-4 h-4 text-gray-600" />;
    }
  };

  const hasUnreadMessages = conversation.messages.some(m => !m.read);

  return (
    <button
      onClick={onSelect}
      className="w-full p-4 hover:bg-gray-50 flex items-start gap-4 text-left relative"
    >
      <div className="relative">
        <img
          src={conversation.contact.avatar}
          alt={conversation.contact.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
          {getPlatformIcon()}
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 truncate">
            {conversation.contact.name}
          </h3>
          {conversation.contact.socialProfile && (
            <span className="text-xs text-gray-500">
              {conversation.contact.socialProfile.username}
            </span>
          )}
        </div>
        
        <p className="mt-1 text-sm text-gray-500 truncate">
          {conversation.messages[conversation.messages.length - 1]?.content}
        </p>
        
        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
          <MessageSquare className="w-3 h-3" />
          {new Date(conversation.messages[conversation.messages.length - 1]?.timestamp).toLocaleTimeString()}
        </div>
      </div>
      
      {hasUnreadMessages && (
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full" />
      )}
    </button>
  );
}