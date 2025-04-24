import React from 'react';
import { Phone } from 'lucide-react';
import { ToggleControl } from '../../controls/ToggleControl';
import { VoicemailSettings } from './voicemail/VoicemailSettings';

export function PhoneSettings() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
        <Phone className="w-5 h-5" />
        Phone Settings
      </h3>
      
      <div className="space-y-8 pl-7">
        {/* Voicemail Settings */}
        <VoicemailSettings />

        {/* Other Phone Settings */}
        <div className="space-y-4">
          <ToggleControl label="Call Recording" />
          <ToggleControl label="Call Waiting" defaultChecked />
          <ToggleControl label="Caller ID" defaultChecked />
        </div>
      </div>
    </div>
  );
}