import React, { useState } from 'react';
import { Mic, Square, Save } from 'lucide-react';

interface VoicemailDropRecorderProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onSave: (name: string) => void;
}

export function VoicemailDropRecorder({
  isRecording,
  onStartRecording,
  onStopRecording,
  onSave
}: VoicemailDropRecorderProps) {
  const [dropName, setDropName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  const buttonClasses = "px-3 py-1.5 text-sm rounded-md transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const handleSave = () => {
    if (!dropName.trim()) return;
    onSave(dropName);
    setDropName('');
    setShowNameInput(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {isRecording ? (
          <button
            onClick={() => {
              onStopRecording();
              setShowNameInput(true);
            }}
            className={`${buttonClasses} bg-red-600 text-white hover:bg-red-700`}
          >
            <Square className="w-4 h-4" />
            Stop Recording
          </button>
        ) : (
          <button
            onClick={onStartRecording}
            className={`${buttonClasses} bg-blue-600 text-white hover:bg-blue-700`}
          >
            <Mic className="w-4 h-4" />
            Record New Drop
          </button>
        )}
      </div>

      {showNameInput && (
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
            className={`${buttonClasses} bg-green-600 text-white hover:bg-green-700`}
          >
            <Save className="w-4 h-4" />
            Save Drop
          </button>
        </div>
      )}
    </div>
  );
}