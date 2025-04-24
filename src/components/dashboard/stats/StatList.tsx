import React from 'react';
import { Phone, Clock, MessageSquare } from 'lucide-react';
import { StatCard } from './StatCard';

export function StatList() {
  const stats = [
    { icon: Phone, title: 'Total Calls', value: '156', color: 'bg-blue-100' },
    { icon: Clock, title: 'Talk Time', value: '23h 45m', color: 'bg-green-100' },
    { icon: MessageSquare, title: 'SMS Sent', value: '89', color: 'bg-purple-100' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}