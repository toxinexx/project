import React from 'react';
import { Play } from 'lucide-react';
import { VoicemailDrop } from '../../../types/voicemail';

interface VoicemailDropSelectorProps {
  drops: VoicemailDrop[];
  selectedDropId?: string;
  onSelect: (id: string) => void;
}

export function VoicemailDropSelector({
  drops,
  selectedDropId,
  onSelect
}: VoicemailDropSelectorProps) {
  const handlePreview = (e: React.MouseEvent, drop: VoicemailDrop) => {
    e.preventDefault();
    // In a real app, this would play the voicemail drop
    console.log('Playing preview for:', drop.name);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Select Voicemail Drop
      </label>
      <div className="grid gap-2">
        {drops.map((drop) => (
          <label
            key={drop.id}
            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer
              hover:bg-gray-50 ${selectedDropId === drop.id ? 'border-blue-500 bg-blue-50' : ''}`}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="voicemailDrop"
                value={drop.id}
                checked={selectedDropId === drop.id}
                onChange={() => onSelect(drop.id)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{drop.name}</p>
                <p className="text-xs text-gray-500">{drop.duration}s • {drop.type}</p>
              </div>
            </div>
            <button
              onClick={(e) => handlePreview(e, drop)}
              className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"
            >
              <Play className="w-4 h-4" />
            </button>
          </label>
        ))}
      </div>
    </div>
  );
}