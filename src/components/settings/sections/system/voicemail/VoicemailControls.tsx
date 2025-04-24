import React from 'react';
import { Mic, Square, Brain } from 'lucide-react';

interface VoicemailControlsProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onGenerateAI: () => void;
  disabled?: boolean;
}

export function VoicemailControls({
  isRecording,
  onStartRecording,
  onStopRecording,
  onGenerateAI,
  disabled
}: VoicemailControlsProps) {
  const buttonClasses = "px-3 py-1.5 text-sm rounded-md transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="flex gap-2">
      {isRecording ? (
        <button
          onClick={onStopRecording}
          className={`${buttonClasses} bg-red-600 text-white hover:bg-red-700`}
        >
          <Square className="w-4 h-4" />
          Stop Recording
        </button>
      ) : (
        <>
          <button
            onClick={onStartRecording}
            disabled={disabled}
            className={`${buttonClasses} bg-blue-600 text-white hover:bg-blue-700`}
          >
            <Mic className="w-4 h-4" />
            Record New Greeting
          </button>
          <button
            onClick={onGenerateAI}
            disabled={disabled}
            className={`${buttonClasses} bg-purple-600 text-white hover:bg-purple-700`}
          >
            <Brain className="w-4 h-4" />
            Generate with AI
          </button>
        </>
      )}
    </div>
  );
}