import React from 'react';
import { LayoutDashboard, Phone, Megaphone, Share2, MessageSquare, Users, CheckSquare } from 'lucide-react';
import { TabItem } from './TabItem';

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'contacts', name: 'Contacts', icon: Users },
    { id: 'dialer', name: 'Dialer', icon: Phone },
    { id: 'sms', name: 'SMS', icon: MessageSquare },
    { id: 'campaigns', name: 'Campaigns', icon: Megaphone },
    { id: 'social', name: 'Social', icon: Share2 },
    { id: 'followups', name: 'Follow Ups', icon: CheckSquare }
  ];

  return (
    <div className="flex bg-white shadow-sm overflow-x-auto">
      {tabs.map((tab) => (
        <TabItem
          key={tab.id}
          {...tab}
          isActive={activeTab === tab.id}
          onClick={() => setActiveTab(tab.id)}
          data-tab={tab.id}
        />
      ))}
    </div>
  );
}