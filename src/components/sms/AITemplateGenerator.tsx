import React, { useState } from 'react';
import { Sparkles, Send, X, AlertCircle, Loader } from 'lucide-react';
import { ThreeDButton } from '../ui/3DButton';

interface AITemplateGeneratorProps {
  onGenerate: (content: string) => void;
  onClose: () => void;
}

export function AITemplateGenerator({ onGenerate, onClose }: AITemplateGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [messageType, setMessageType] = useState('promotional');

  const messageTypes = [
    { id: 'promotional', name: 'Promotional', description: 'Messages to promote your products or services' },
    { id: 'informational', name: 'Informational', description: 'Updates, announcements and general information' },
    { id: 'follow-up', name: 'Follow-up', description: 'Messages to follow up with prospects or clients' },
    { id: 'appointment', name: 'Appointment', description: 'Scheduling, reminders or confirmations' },
    { id: 'thank-you', name: 'Thank You', description: 'Gratitude messages for clients or partners' }
  ];

  const handleGenerateTemplate = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI generation with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate content based on message type and prompt
      let generatedText = '';
      
      switch (messageType) {
        case 'promotional':
          generatedText = `Hi {name}, we're excited to share our latest offer with you! ${prompt} This special deal is available to you as a valued customer. Reply YES for more information or call us at {phone}.`;
          break;
        case 'informational':
          generatedText = `Important Update: ${prompt} Thank you for your attention to this information. Please contact us at {phone} if you have any questions.`;
          break;
        case 'follow-up':
          generatedText = `Hi {name}, just following up regarding ${prompt}. We'd love to hear your thoughts on this. Would you be available for a quick call this week?`;
          break;
        case 'appointment':
          generatedText = `Hi {name}, this is a reminder about your upcoming appointment for ${prompt}. It's scheduled for {date} at {time}. Reply CONFIRM to confirm or RESCHEDULE if you need to change it.`;
          break;
        case 'thank-you':
          generatedText = `Thank you, {name}, for ${prompt}! We truly appreciate your business and look forward to serving you again in the future.`;
          break;
        default:
          generatedText = `Hi {name}, ${prompt}. Please let us know if you have any questions!`;
      }
      
      setGeneratedContent(generatedText);
    } catch (error) {
      console.error('Error generating template:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseTemplate = () => {
    onGenerate(generatedContent);
  };

  return (
    <div className="mb-4 bg-white border border-primary-100 rounded-lg shadow-sm">
      <div className="p-3 border-b flex items-center justify-between bg-purple-50">
        <div className="flex items-center">
          <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
          <h3 className="font-medium text-purple-800">AI Template Generator</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {messageTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setMessageType(type.id)}
                className={`text-left p-2 rounded-md border ${
                  messageType === type.id 
                    ? 'border-purple-500 bg-purple-50 text-purple-700' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium text-sm">{type.name}</div>
                <div className="text-xs text-gray-500 line-clamp-1">{type.description}</div>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What's this message about? (optional)
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., 'our summer sale', 'confirming their appointment', etc."
            className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none h-20 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
          />
        </div>
        
        <div className="flex justify-end">
          <ThreeDButton
            variant="primary"
            size="md"
            icon={Sparkles}
            onClick={handleGenerateTemplate}
            disabled={isGenerating || (!prompt && messageType === '')}
          >
            {isGenerating ? 'Generating...' : 'Generate Template'}
          </ThreeDButton>
        </div>
        
        {isGenerating && (
          <div className="flex items-center justify-center p-4">
            <Loader className="w-6 h-6 text-purple-600 animate-spin" />
          </div>
        )}
        
        {generatedContent && !isGenerating && (
          <div className="border rounded-md p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-800">Generated Template</h4>
              <ThreeDButton
                variant="success"
                size="sm"
                icon={Send}
                onClick={handleUseTemplate}
              >
                Use This
              </ThreeDButton>
            </div>
            <p className="text-sm text-gray-600">{generatedContent}</p>
          </div>
        )}
        
        <div className="bg-blue-50 border border-blue-200 rounded p-3 flex">
          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mr-2" />
          <div className="text-xs text-blue-700">
            <p className="font-medium">Template Variables:</p>
            <p>Use <code>{"{name}"}</code> to include recipient's name</p>
            <p>Other variables: <code>{"{phone}"}</code>, <code>{"{date}"}</code>, <code>{"{time}"}</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}