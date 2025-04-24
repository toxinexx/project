import React from 'react';
import { Tabs } from '../navigation/Tabs';
import { Dialer } from '../dialer/Dialer';
import { Dashboard } from '../dashboard/Dashboard';
import { Campaigns } from '../campaigns/Campaigns';
import { Social } from '../social/Social';
import { SMSPage } from '../sms/SMSPage';
import { Contacts } from '../contacts/Contacts';
import { FollowUps } from '../followups/FollowUps';

interface MainContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function MainContent({ activeTab, setActiveTab }: MainContentProps) {
  return (
    <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <div className="sticky top-16 bg-white z-20 -mx-3 sm:-mx-6 lg:-mx-8 px-3 sm:px-6 lg:px-8 shadow-sm">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      <div className="mt-4 sm:mt-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'contacts' && <Contacts />}
        {activeTab === 'dialer' && <Dialer />}
        {activeTab === 'sms' && <SMSPage />}
        {activeTab === 'campaigns' && <Campaigns />}
        {activeTab === 'social' && <Social />}
        {activeTab === 'followups' && <FollowUps />}
      </div>
    </main>
  );
}