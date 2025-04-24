import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sent: boolean;
  timestamp: string;
}

export function SMSConversation() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi, I'm interested in your services",
      sent: false,
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      text: "Thanks for reaching out! How can I help?",
      sent: true,
      timestamp: '10:31 AM'
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      text: message,
      sent: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev.slice(-3), newMessage]);
    setMessage('');

    // Simulate received message
    setTimeout(() => {
      const response: Message = {
        id: crypto.randomUUID(),
        text: "Thanks for your message. I'll get back to you soon.",
        sent: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev.slice(-3), response]);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Messages */}
      <div className="p-4 space-y-3 min-h-[200px] max-h-[200px] overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.sent
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.sent ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 
              transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}