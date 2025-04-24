import React from 'react';
import { Bell } from 'lucide-react';
import { ToggleControl } from '../controls/ToggleControl';

export function NotificationSection() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
        <Bell className="w-5 h-5" />
        Notifications
      </h3>
      <div className="space-y-4 pl-7">
        <ToggleControl label="Call Notifications" defaultChecked />
        <ToggleControl label="SMS Notifications" defaultChecked />
        <ToggleControl label="Campaign Notifications" defaultChecked />
      </div>
    </div>
  );
}