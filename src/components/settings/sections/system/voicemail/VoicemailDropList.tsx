import React from 'react';
import { Play, Trash2, Clock } from 'lucide-react';
import { VoicemailDrop } from '../../../../../types/voicemail';

interface VoicemailDropListProps {
  drops: VoicemailDrop[];
  selectedDrop?: VoicemailDrop;
  onPreview: (drop: VoicemailDrop) => void;
  onDelete: (id: string) => void;
}

export function VoicemailDropList({
  drops,
  selectedDrop,
  onPreview,
  onDelete
}: VoicemailDropListProps) {
  const buttonClasses = "p-1.5 rounded-md transition-colors";

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h4 className="font-medium text-gray-700">Saved Drops</h4>
      </div>
      
      <div className="divide-y max-h-[400px] overflow-y-auto">
        {drops.map((drop) => (
          <div
            key={drop.id}
            className={`p-4 flex items-center justify-between hover:bg-gray-50 ${
              selectedDrop?.id === drop.id ? 'bg-blue-50' : ''
            }`}
          >
            <div>
              <h5 className="font-medium text-gray-800">{drop.name}</h5>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {drop.duration}s
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => onPreview(drop)}
                className={`${buttonClasses} text-gray-600 hover:bg-blue-50 hover:text-blue-600`}
                title="Preview"
              >
                <Play className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(drop.id)}
                className={`${buttonClasses} text-gray-600 hover:bg-red-50 hover:text-red-600`}
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {drops.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No voicemail drops created yet
          </div>
        )}
      </div>
    </div>
  );
}