import React from 'react';
import { Message } from '../../types/conversation';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-lg px-4 py-2 ${
              message.type === 'outgoing'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <p>{message.content}</p>
            <p className={`text-xs mt-1 ${
              message.type === 'outgoing' ? 'text-blue-100' : 'text-gray-500'
            }`}>
              {new Date(message.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}