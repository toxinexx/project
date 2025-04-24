import React from 'react';
import { Mic, Square, Play } from 'lucide-react';

interface RecordingControlsProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onGenerateAIVoice: () => void;
  recordedText: string;
}

export function RecordingControls({
  isRecording,
  onStartRecording,
  onStopRecording,
  onGenerateAIVoice,
  recordedText
}: RecordingControlsProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {isRecording ? (
          <button
            onClick={onStopRecording}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 
              transition-colors flex items-center gap-2"
          >
            <Square className="w-4 h-4" />
            Stop Recording
          </button>
        ) : (
          <button
            onClick={onStartRecording}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
              transition-colors flex items-center gap-2"
          >
            <Mic className="w-4 h-4" />
            Start Recording
          </button>
        )}
      </div>

      {recordedText && (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">{recordedText}</p>
          </div>
          <button
            onClick={onGenerateAIVoice}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 
              transition-colors flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Generate AI Voice
          </button>
        </div>
      )}
    </div>
  );
}