import React from 'react';
import { CallListItem } from './CallListItem';

interface RecentCallsProps {
  calls: Array<{
    id: number;
    name: string;
    number: string;
    duration: string;
    type: 'incoming' | 'outgoing';
    timestamp: string;
  }>;
}

export function RecentCalls({ calls }: RecentCallsProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Recent Calls</h2>
      </div>
      <div className="divide-y">
        {calls.map((call) => (
          <CallListItem key={call.id} call={call} />
        ))}
      </div>
    </div>
  );
}