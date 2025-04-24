import React from 'react';
import { StatsGrid } from './stats/StatsGrid';
import { ActivityOverview } from './activity/ActivityOverview';
import { ActivityFeed } from './activity/ActivityFeed';
import { SMSConversations } from './sms/SMSConversations';

export function Dashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Grid */}
      <div className="crm-tile p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Dashboard Overview</h2>
        <StatsGrid />
      </div>
      
      {/* Activity and SMS Conversations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <ActivityOverview />
        </div>
        <div className="lg:col-span-1">
          <SMSConversations />
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="crm-tile">
        <ActivityFeed />
      </div>
    </div>
  );
}