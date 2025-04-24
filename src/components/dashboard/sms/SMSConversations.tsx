import React from 'react';
import { MessageSquare, ArrowRight, User, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThreeDButton } from '../../ui/3DButton';

interface Conversation {
  id: string;
  contact: {
    name: string;
    phone: string;
    avatar?: string;
  };
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

export function SMSConversations() {
  const navigate = useNavigate();
  
  // Sample conversation data
  const conversations: Conversation[] = [
    {
      id: '1',
      contact: {
        name: 'John Smith',
        phone: '+1 (555) 123-4567',
        avatar: undefined
      },
      lastMessage: 'I\'m interested in the service. When can we schedule a call?',
      timestamp: '10 min ago',
      unread: true
    },
    {
      id: '2',
      contact: {
        name: 'Sarah Johnson',
        phone: '+1 (555) 234-5678',
        avatar: undefined
      },
      lastMessage: 'Just sent the information you requested about our options.',
      timestamp: '2 hours ago',
      unread: false
    },
    {
      id: '3',
      contact: {
        name: 'Michael Brown',
        phone: '+1 (555) 345-6789',
        avatar: undefined
      },
      lastMessage: 'Thanks for your help with the paperwork yesterday!',
      timestamp: 'Yesterday',
      unread: false
    }
  ];
  
  const handleViewAllClick = () => {
    // Navigate to the SMS tab
    const smsTab = document.querySelector('[data-tab="sms"]');
    if (smsTab) {
      (smsTab as HTMLElement).click();
    }
  };
  
  return (
    <div className="crm-tile h-[300px] sm:h-[364px] flex flex-col">
      <div className="p-4 sm:p-6 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-purple-50 rounded-lg">
            <MessageSquare className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Recent SMS</h3>
        </div>
        <ThreeDButton
          variant="info"
          size="sm"
          icon={ArrowRight}
          onClick={handleViewAllClick}
        >
          <span className="hidden xs:inline">View All</span>
        </ThreeDButton>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.length > 0 ? (
          <div className="divide-y">
            {conversations.map((conversation) => (
              <ConversationItem 
                key={conversation.id} 
                conversation={conversation} 
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500 p-4">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p>No recent conversations</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ConversationItemProps {
  conversation: Conversation;
}

function ConversationItem({ conversation }: ConversationItemProps) {
  const navigate = useNavigate();
  
  const goToSMS = () => {
    // Navigate to the SMS tab
    const smsTab = document.querySelector('[data-tab="sms"]');
    if (smsTab) {
      (smsTab as HTMLElement).click();
    }
  };
  
  return (
    <div 
      className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={goToSMS}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          {conversation.contact.avatar ? (
            <img 
              src={conversation.contact.avatar} 
              alt={conversation.contact.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-purple-600" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-800 truncate">
              {conversation.contact.name}
            </span>
            {conversation.unread && (
              <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></span>
            )}
          </div>
          <p className="text-sm text-gray-500 truncate">
            {conversation.lastMessage}
          </p>
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {conversation.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}