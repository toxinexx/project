import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface SettingsSectionProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}

export function SettingsSection({ icon: Icon, title, children }: SettingsSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
        <Icon className="w-5 h-5" />
        {title}
      </h3>
      <div className="space-y-4 pl-7">
        {children}
      </div>
    </div>
  );
}