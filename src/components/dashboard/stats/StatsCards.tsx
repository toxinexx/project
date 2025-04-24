import React from 'react';
import { Phone, MessageSquare, PhoneMissed, Voicemail } from 'lucide-react';
import { StatCard } from '../../ui/StatCard';

export function StatsCards() {
  const stats = [
    { icon: Phone, title: 'Total Calls', value: '156', color: 'bg-purple-100', textColor: 'text-purple-600' },
    { icon: MessageSquare, title: 'SMS Sent', value: '89', color: 'bg-violet-100', textColor: 'text-violet-600' },
    { icon: PhoneMissed, title: 'Missed Calls', value: '12', color: 'bg-indigo-100', textColor: 'text-indigo-600' },
    { icon: Voicemail, title: 'Voicemails', value: '5', color: 'bg-fuchsia-100', textColor: 'text-fuchsia-600', hasNotification: true }
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          {...stat}
          className="h-[140px]" // Fixed height for consistent sizing
        />
      ))}
    </>
  );
}