import React, { useState } from 'react';
import { Brain, Sparkles, X, AlertCircle } from 'lucide-react';
import { useAIContent } from './hooks/useAIContent';
import { ThreeDButton } from '../ui/3DButton';

interface AIContentGeneratorProps {
  onGenerate: (content: string) => void;
  onClose: () => void;
}

export function AIContentGenerator({ onGenerate, onClose }: AIContentGeneratorProps) {
  const [tone, setTone] = useState<'professional' | 'casual' | 'engaging'>('professional');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [purpose, setPurpose] = useState<'promotional' | 'informational' | 'engagement'>('promotional');
  const [keywords, setKeywords] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  
  const { isGenerating, error, generateContent } = useAIContent();

  const handleGenerate = async () => {
    const content = await generateContent({
      tone,
      length,
      purpose,
      keywords: keywords.split(',').map(k => k.trim()).filter(Boolean)
    });
    
    if (content) {
      setGeneratedContent(content);
    }
  };

  return (
    <div className="mb-4 bg-white border border-primary-100 rounded-lg shadow-sm">
      <div className="p-3 border-b flex items-center justify-between bg-purple-50">
        <div className="flex items-center">
          <Brain className="w-5 h-5 text-purple-600 mr-2" />
          <h3 className="font-medium text-purple-800">AI Content Generator</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Content Purpose */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Purpose
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['promotional', 'informational', 'engagement'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPurpose(p)}
                className={`p-2 text-sm rounded-lg border transition-colors ${
                  purpose === p 
                    ? 'border-purple-500 bg-purple-50 text-purple-700' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tone Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tone
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['professional', 'casual', 'engaging'] as const).map((t) => (
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

        {/* Length Selection */}
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

        {/* Keywords Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Keywords (optional)
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Enter keywords separated by commas"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        
        <div className="flex justify-end">
          <ThreeDButton
            variant="primary"
            size="md"
            icon={Sparkles}
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Content'}
          </ThreeDButton>
        </div>
        
        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        {generatedContent && !isGenerating && (
          <div className="border rounded-md p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-800">Generated Content</h4>
              <ThreeDButton
                variant="success"
                size="sm"
                icon={Sparkles}
                onClick={() => onGenerate(generatedContent)}
              >
                Use This
              </ThreeDButton>
            </div>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{generatedContent}</p>
          </div>
        )}
        
        <div className="bg-blue-50 border border-blue-200 rounded p-3 flex">
          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mr-2" />
          <div className="text-xs text-blue-700">
            <p className="font-medium">Content Guidelines:</p>
            <p>• Professional: Formal and business-focused</p>
            <p>• Casual: Friendly and conversational</p>
            <p>• Engaging: Dynamic and interactive</p>
          </div>
        </div>
      </div>
    </div>
  );
}