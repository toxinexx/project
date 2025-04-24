import React, { useState } from 'react';
import { Sparkles, MessageSquare, Brain, Check, X, AlertCircle } from 'lucide-react';
import { ThreeDButton } from '../ui/3DButton';

interface AIResponseGeneratorProps {
  message: string;
  onGenerate: (response: string) => void;
  onClose: () => void;
}

export function AIResponseGenerator({ message, onGenerate, onClose }: AIResponseGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState<'professional' | 'friendly' | 'direct'>('professional');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [generatedResponse, setGeneratedResponse] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI generation with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate response based on tone and length
      let response = '';
      
      switch (tone) {
        case 'professional':
          response = length === 'short' 
            ? "Thank you for your message. I'll assist you shortly."
            : length === 'medium'
              ? "Thank you for reaching out. I understand your inquiry and would be happy to help. Let me know what time works best for a call to discuss this further."
              : "Thank you for your detailed message. I appreciate you taking the time to reach out. I've reviewed your inquiry and would be happy to provide comprehensive assistance. Would you be available for a brief call tomorrow to discuss this in detail?";
          break;
        case 'friendly':
          response = length === 'short'
            ? "Hi! Thanks for your message! 😊"
            : length === 'medium'
              ? "Hey there! Thanks for getting in touch! I'd love to help you out with this. When's a good time to chat?"
              : "Hey! Thanks so much for reaching out! I really appreciate you taking the time to explain everything. This is definitely something I can help with! Would love to hop on a quick call to discuss this further - what time works best for you?";
          break;
        case 'direct':
          response = length === 'short'
            ? "Yes, I can help with that."
            : length === 'medium'
              ? "I can help with your request. Let's schedule a call tomorrow at 2 PM."
              : "I've reviewed your request and can provide the assistance you need. I have availability tomorrow at 2 PM or Thursday at 10 AM for a detailed discussion. Please let me know which time you prefer.";
          break;
      }
      
      setGeneratedResponse(response);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mb-4 bg-white border border-primary-100 rounded-lg shadow-sm">
      <div className="p-3 border-b flex items-center justify-between bg-purple-50">
        <div className="flex items-center">
          <Brain className="w-5 h-5 text-purple-600 mr-2" />
          <h3 className="font-medium text-purple-800">AI Response Generator</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Original Message */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Responding to:</div>
          <p className="text-gray-700">{message}</p>
        </div>
        
        {/* Response Options */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tone
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['professional', 'friendly', 'direct'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`p-2 text-sm rounded-lg border transition-colors ${
                    tone === t 
                      ? 'border-purple-500 bg-purple-50 text-purple-700' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Length
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['short', 'medium', 'long'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLength(l)}
                  className={`p-2 text-sm rounded-lg border transition-colors ${
                    length === l 
                      ? 'border-purple-500 bg-purple-50 text-purple-700' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <ThreeDButton
            variant="primary"
            size="md"
            icon={Sparkles}
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Response'}
          </ThreeDButton>
        </div>
        
        {isGenerating && (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
          </div>
        )}
        
        {generatedResponse && !isGenerating && (
          <div className="border rounded-md p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-800">Generated Response</h4>
              <ThreeDButton
                variant="success"
                size="sm"
                icon={MessageSquare}
                onClick={() => onGenerate(generatedResponse)}
              >
                Use This
              </ThreeDButton>
            </div>
            <p className="text-sm text-gray-600">{generatedResponse}</p>
          </div>
        )}
        
        <div className="bg-blue-50 border border-blue-200 rounded p-3 flex">
          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mr-2" />
          <div className="text-xs text-blue-700">
            <p className="font-medium">Response Guidelines:</p>
            <p>• Professional: Formal and business-like</p>
            <p>• Friendly: Casual and approachable</p>
            <p>• Direct: Clear and concise</p>
          </div>
        </div>
      </div>
    </div>
  );
}