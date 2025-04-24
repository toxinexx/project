import React from 'react';
import { AudioSettings } from './system/AudioSettings';
import { NotificationSettings } from './system/NotificationSettings';
import { PhoneSettings } from './system/PhoneSettings';
import { AISettings } from './system/AISettings';

export function SystemSection() {
  return (
    <div className="crm-tile">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-800">System Settings</h2>
        <p className="mt-1 text-sm text-gray-600">Configure system preferences</p>
      </div>
      <div className="p-6 space-y-8">
        <PhoneSettings />
        <AISettings />
        <AudioSettings />
        <NotificationSettings />
      </div>
    </div>
  );
}