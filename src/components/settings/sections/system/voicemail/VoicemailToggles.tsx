import React from 'react';
import { ToggleSwitch } from '../../../controls/ToggleSwitch';

interface VoicemailTogglesProps {
  voicemailEnabled: boolean;
  greetingEnabled: boolean;
  onVoicemailToggle: (enabled: boolean) => void;
  onGreetingToggle: (enabled: boolean) => void;
}

export function VoicemailToggles({
  voicemailEnabled,
  greetingEnabled,
  onVoicemailToggle,
  onGreetingToggle
}: VoicemailTogglesProps) {
  return (
    <div className="space-y-4">
      <ToggleSwitch
        label="Enable Voicemail"
        checked={voicemailEnabled}
        onChange={onVoicemailToggle}
      />
      {voicemailEnabled && (
        <div className="ml-6">
          <ToggleSwitch
            label="Play Greeting"
            checked={greetingEnabled}
            onChange={onGreetingToggle}
          />
        </div>
      )}
    </div>
  );
}