import { useState, useCallback } from 'react';
import { Conversation, Message, SocialPlatform } from '../../../types/conversation';

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      platform: 'phone',
      contact: {
        id: '1',
        name: 'John Doe',
        phone: '+1 (555) 123-4567',
        leadStatus: 'hot',
        temperature: 'warm',
        assignedTo: 'alice',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces'
      },
      messages: [
        {
          id: '1',
          type: 'incoming',
          content: 'Hi, I\'m interested in your services',
          timestamp: new Date().toISOString(),
          read: false
        }
      ]
    },
    {
      id: '2',
      platform: 'facebook',
      contact: {
        id: '2',
        name: 'Sarah Wilson',
        leadStatus: 'warm',
        temperature: 'hot',
        assignedTo: 'bob',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces',
        socialProfile: {
          platform: 'facebook',
          username: 'sarahwilson',
          profileUrl: 'https://facebook.com/sarahwilson'
        }
      },
      messages: [
        {
          id: '3',
          type: 'incoming',
          content: 'Hello! I saw your ad on Facebook',
          timestamp: new Date().toISOString(),
          read: false
        }
      ]
    },
    {
      id: '3',
      platform: 'instagram',
      contact: {
        id: '3',
        name: 'Mike Chen',
        leadStatus: 'cold',
        temperature: 'warm',
        assignedTo: 'alice',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=faces',
        socialProfile: {
          platform: 'instagram',
          username: '@mikechen',
          profileUrl: 'https://instagram.com/mikechen'
        }
      },
      messages: [
        {
          id: '4',
          type: 'incoming',
          content: 'DM from your latest post',
          timestamp: new Date().toISOString(),
          read: false
        }
      ]
    }
  ]);

  const addMessage = useCallback((conversationId: string, message: Message) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          messages: [...conv.messages, message]
        };
      }
      return conv;
    }));
  }, []);

  const markAsRead = useCallback((conversationId: string) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          messages: conv.messages.map(msg => ({ ...msg, read: true }))
        };
      }
      return conv;
    }));
  }, []);

  const unreadCount = conversations.reduce((count, conv) => 
    count + conv.messages.filter(msg => !msg.read).length, 0
  );

  return {
    conversations,
    unreadCount,
    addMessage,
    markAsRead
  };
}