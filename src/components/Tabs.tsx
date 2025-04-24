import React from 'react';
import { Phone, LayoutDashboard, Settings } from 'lucide-react';

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Tabs({ activeTab, setActiveTab }: TabProps) {
  const tabs = [
    { id: 'dialer', name: 'Dialer', icon: Phone },
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex bg-white shadow-sm">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 text-sm font-medium transition-colors
              ${isActive 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Icon className="w-4 h-4" />
            {tab.name}
          </button>
        );
      })}
    </div>
  );
}