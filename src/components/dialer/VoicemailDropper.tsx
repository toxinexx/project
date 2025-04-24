import React, { useState } from 'react';
import { Mic } from 'lucide-react';

interface VoicemailDropperProps {
  onDrop: (voicemailId: string) => void;
}

export function VoicemailDropper({ onDrop }: VoicemailDropperProps) {
  const [voicemails] = useState([
    { id: '1', name: 'Introduction', duration: '0:30' },
    { id: '2', name: 'Follow-up', duration: '0:45' },
    { id: '3', name: 'Meeting Request', duration: '0:25' },
  ]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Voicemail Drop</h3>
      <div className="space-y-2">
        {voicemails.map((vm) => (
          <button
            key={vm.id}
            onClick={() => onDrop(vm.id)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              <Mic className="w-4 h-4 text-blue-600" />
              <span>{vm.name}</span>
            </div>
            <span className="text-sm text-gray-500">{vm.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
}