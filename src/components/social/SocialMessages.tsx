import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useSocialMessages } from './hooks/useSocialMessages';

export function SocialMessages() {
  const { messages } = useSocialMessages();

  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <MessageSquare className="w-8 h-8 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">No Messages Yet</h3>
          <p className="text-gray-500">Connect your social accounts to see messages here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm divide-y">
      {messages.map((message) => (
        <div key={message.id} className="p-4 hover:bg-gray-50">
          <div className="flex items-start gap-3">
            <img
              src={message.avatar}
              alt={message.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{message.name}</span>
                <span className="text-sm text-gray-500">via {message.platform}</span>
              </div>
              <p className="text-gray-600 mt-1">{message.content}</p>
              <div className="flex items-center gap-4 mt-2">
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Reply
                </button>
                <span className="text-sm text-gray-500">{message.time}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}