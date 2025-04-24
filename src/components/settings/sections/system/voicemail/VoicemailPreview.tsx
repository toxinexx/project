import React from 'react';
import { Play, Save } from 'lucide-react';

interface VoicemailPreviewProps {
  text: string;
  onSave: () => void;
  onPlay: () => void;
}

export function VoicemailPreview({ text, onSave, onPlay }: VoicemailPreviewProps) {
  const buttonClasses = "px-3 py-1.5 text-sm rounded-md transition-colors flex items-center gap-2";

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-700">{text}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onPlay}
          className={`${buttonClasses} bg-blue-600 text-white hover:bg-blue-700`}
        >
          <Play className="w-4 h-4" />
          Preview
        </button>
        <button
          onClick={onSave}
          className={`${buttonClasses} bg-green-600 text-white hover:bg-green-700`}
        >
          <Save className="w-4 h-4" />
          Save Greeting
        </button>
      </div>
    </div>
  );
}