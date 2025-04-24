import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IntegrationLayoutProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function IntegrationLayout({
  icon: Icon,
  iconColor,
  title,
  description,
  children
}: IntegrationLayoutProps) {
  return (
    <div className="border rounded-lg">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${iconColor} bg-opacity-10`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800">{title}</h3>
            <p className="mt-1 text-sm text-gray-600">{description}</p>
            <div className="mt-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}