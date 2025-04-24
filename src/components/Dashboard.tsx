import React from 'react';
import { Phone, Clock, MessageSquare } from 'lucide-react';
import { StatCard } from './ui/StatCard';
import { RecentCalls } from './calls/RecentCalls';

export function Dashboard() {
  const recentCalls = [
    { id: 1, name: 'John Doe', number: '+1 (555) 123-4567', duration: '5:23', type: 'outgoing' as const, timestamp: '2 hours ago' },
    { id: 2, name: 'Jane Smith', number: '+1 (555) 987-6543', duration: '3:45', type: 'incoming' as const, timestamp: '4 hours ago' },
    { id: 3, name: 'Mike Johnson', number: '+1 (555) 456-7890', duration: '1:30', type: 'outgoing' as const, timestamp: 'Yesterday' },
  ];

  const stats = [
    { icon: Phone, title: 'Total Calls', value: '156', color: 'bg-blue-100' },
    { icon: Clock, title: 'Talk Time', value: '23h 45m', color: 'bg-green-100' },
    { icon: MessageSquare, title: 'SMS Sent', value: '89', color: 'bg-purple-100' },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <RecentCalls calls={recentCalls} />
    </div>
  );
}