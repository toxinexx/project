import React from 'react';
import { Volume2 } from 'lucide-react';
import { VolumeControl } from '../../controls/VolumeControl';

export function AudioSettings() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
        <Volume2 className="w-5 h-5" />
        Audio Settings
      </h3>
      <div className="space-y-4 pl-7">
        <VolumeControl label="Ringtone Volume" />
        <VolumeControl label="Speaker Volume" />
      </div>
    </div>
  );
}