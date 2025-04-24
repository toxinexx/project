import React from 'react';
import { VoicemailDropSelector } from './VoicemailDropSelector';
import { useVoicemailDrops } from '../../settings/sections/system/voicemail/useVoicemailDrops';

interface PowerDialingSettingsProps {
  useVoicemailDrop: boolean;
  voicemailDropId?: string;
  onUseVoicemailDropChange: (use: boolean) => void;
  onVoicemailDropChange: (id: string) => void;
}

export function PowerDialingSettings({
  useVoicemailDrop,
  voicemailDropId,
  onUseVoicemailDropChange,
  onVoicemailDropChange
}: PowerDialingSettingsProps) {
  const { drops } = useVoicemailDrops();

  return (
    <div className="space-y-4 border-t pt-4 mt-4">
      <h3 className="text-lg font-medium text-gray-800">Power Dialing Settings</h3>
      
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">Use Voicemail Drop</label>
          <p className="text-sm text-gray-500">Automatically leave a voicemail when calls go unanswered</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={useVoicemailDrop}
            onChange={(e) => onUseVoicemailDropChange(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
            peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full 
            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
            after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
            after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {useVoicemailDrop && (
        <VoicemailDropSelector
          drops={drops}
          selectedDropId={voicemailDropId}
          onSelect={onVoicemailDropChange}
        />
      )}
    </div>
  );
}