import React, { useState } from 'react';
import { MessageSquare, Clock, Plus, Trash2, Brain, X, ChevronDown, ChevronUp } from 'lucide-react';
import { ThreeDButton } from '../ui/3DButton';

interface SMSAutomationProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export function SMSAutomation({ enabled, onToggle }: SMSAutomationProps) {
  const [selectedMessageId, setSelectedMessageId] = useState<string>('');
  const [showMessages, setShowMessages] = useState(true);
  
  // Sample automated messages
  const messages = [
    {
      id: '1',
      name: 'Follow-up SMS',
      delay: '5 minutes',
      content: "Hi {name}, thanks for taking my call! As discussed, I will send over more information shortly.",
      type: 'recorded'
    },
    {
      id: '2',
      name: 'Voicemail Follow-up',
      delay: '10 minutes',
      content: 'Hi {name}, I just left you a voicemail regarding {topic}. Please call me back at your convenience.',
      type: 'ai'
    }
  ];

  const selectedMessage = messages.find(msg => msg.id === selectedMessageId);

  return (
    <div className="space-y-4">
      {/* SMS Automation Toggle */}
      <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <MessageSquare className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">SMS Automation</h3>
            <p className="text-sm text-gray-600">
              {enabled && selectedMessage 
                ? `Using: ${selectedMessage.name} (After ${selectedMessage.delay})`
                : 'Automatically send follow-up texts after calls'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {enabled && (
            <button
              onClick={() => setShowMessages(!showMessages)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-purple-100 rounded-full transition-colors"
            >
              {showMessages ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => {
                onToggle(e.target.checked);
                if (e.target.checked) {
                  setShowMessages(true);
                }
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
              peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full 
              peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
              after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600">
            </div>
          </label>
        </div>
      </div>

      {enabled && showMessages && (
        <div className="border rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
            <h4 className="font-medium text-gray-700">Select Automated Message</h4>
            <div className="flex gap-2">
              <ThreeDButton
                variant="secondary"
                size="sm"
                icon={Brain}
                onClick={() => {}}
              >
                Generate AI
              </ThreeDButton>
              <ThreeDButton
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={() => {}}
              >
                New Message
              </ThreeDButton>
            </div>
          </div>
          
          <div className="divide-y">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`p-4 hover:bg-gray-50 transition-all duration-200 transform ${
                  selectedMessageId === message.id ? 'bg-purple-50 -translate-y-0.5' : 'translate-y-0'
                }`}
              >
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="relative flex items-center mt-1">
                    <input
                      type="radio"
                      name="automatedMessage"
                      checked={selectedMessageId === message.id}
                      onChange={() => setSelectedMessageId(message.id)}
                      className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-gray-800">{message.name}</h5>
                      {message.type === 'ai' && (
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full text-xs">
                          AI Generated
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <Clock className="w-4 h-4" />
                      <span>After {message.delay}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{message.content}</p>
                  </div>
                  <button
                    onClick={() => {}}
                    className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </label>
              </div>
            ))}

            {messages.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                No automated messages configured
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}