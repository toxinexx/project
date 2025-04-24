import React from 'react';
import { Phone, MessageSquare, PhoneMissed, Voicemail } from 'lucide-react';
import { StatCard } from '../../ui/StatCard';
import { UsageChart } from './UsageChart';
import { ActivityChart } from './ActivityChart';
import { useActivityData } from '../hooks/useActivityData';

export function DashboardStats() {
  const stats = [
    { icon: Phone, title: 'Total Calls', value: '156', color: 'bg-blue-100' },
    { icon: MessageSquare, title: 'SMS Sent', value: '89', color: 'bg-purple-100' },
    { icon: PhoneMissed, title: 'Missed Calls', value: '12', color: 'bg-red-100' },
    { icon: Voicemail, title: 'Voicemails', value: '5', color: 'bg-amber-100', hasNotification: true },
  ];

  const activityData = useActivityData();

  return (
    <div className="space-y-6">
      {/* Activity Chart - Full Width */}
      <div className="crm-tile">
        <div className="p-6 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Activity Overview</h3>
          <div className="flex gap-2">
            {['30d', '90d', '180d', '360d'].map((range) => (
              <button
                key={range}
                className="px-3 py-1 rounded-md text-sm font-medium transition-colors
                  hover:bg-gray-100 text-gray-600"
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        <div className="p-6">
          <div className="h-[300px]">
            <ActivityChart data={activityData} />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Stats */}
        <div className="col-span-8 grid grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              color={stat.color}
              hasNotification={stat.hasNotification}
            />
          ))}
        </div>

        {/* Right Column - Usage Chart */}
        <div className="col-span-4 crm-tile">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Usage</h3>
            <UsageChart used={450} total={1000} />
          </div>
        </div>
      </div>
    </div>
  );
}