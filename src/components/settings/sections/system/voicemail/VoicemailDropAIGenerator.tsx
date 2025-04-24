import React, { useState } from 'react';
import { Brain, Save } from 'lucide-react';

interface VoicemailDropAIGeneratorProps {
  onGenerate: (text: string) => void;
  onSave: (name: string) => void;
}

export function VoicemailDropAIGenerator({
  onGenerate,
  onSave
}: VoicemailDropAIGeneratorProps) {
  const [dropName, setDropName] = useState('');
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const buttonClasses = "px-3 py-1.5 text-sm rounded-md transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const handleGenerate = async () => {
    if (!text.trim()) return;
    
    setIsGenerating(true);
    await onGenerate(text);
    setIsGenerating(false);
  };

  const handleSave = () => {
    if (!dropName.trim()) return;
    onSave(dropName);
    setDropName('');
    setText('');
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-700">AI Generator</h4>
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter the text you want to convert to speech..."
        className="w-full h-32 px-3 py-2 text-sm border rounded-md resize-none"
      />

      {/* Separate the buttons into two rows for better layout */}
      <div className="space-y-2">
        {/* First row: Generate button */}
        <button
          onClick={handleGenerate}
          disabled={!text.trim() || isGenerating}
          className={`${buttonClasses} w-full bg-purple-600 text-white hover:bg-purple-700`}
        >
          <Brain className="w-4 h-4" />
          {isGenerating ? 'Generating...' : 'Generate with AI'}
        </button>

        {/* Second row: Name input and Save button */}
        <div className="flex gap-2">
          <input
            type="text"
            value={dropName}
            onChange={(e) => setDropName(e.target.value)}
            placeholder="Enter drop name..."
            className="flex-1 px-3 py-1.5 text-sm border rounded-md"
          />
          <button
            onClick={handleSave}
            disabled={!dropName.trim()}
            className={`${buttonClasses} bg-green-600 text-white hover:bg-green-700 whitespace-nowrap`}
          >
            <Save className="w-4 h-4" />
            Save Drop
          </button>
        </div>
      </div>
    </div>
  );
}