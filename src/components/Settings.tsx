import React from 'react';
import { Volume2, Bell, Phone } from 'lucide-react';
import { SettingsSection } from './settings/SettingsSection';
import { VolumeSlider } from './settings/VolumeSlider';
import { ToggleSwitch } from './settings/ToggleSwitch';

export function Settings() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <SettingsSection icon={Volume2} title="Audio Settings">
            <VolumeSlider label="Ringtone Volume" />
            <VolumeSlider label="Speaker Volume" />
          </SettingsSection>

          <SettingsSection icon={Bell} title="Notifications">
            <ToggleSwitch label="Call Notifications" defaultChecked />
            <ToggleSwitch label="SMS Notifications" defaultChecked />
          </SettingsSection>

          <SettingsSection icon={Phone} title="Call Settings">
            <ToggleSwitch label="Auto Answer" />
            <ToggleSwitch label="Call Recording" />
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}