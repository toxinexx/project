import React from 'react';
import { RecentCalls } from '../../calls/RecentCalls';
import { useCalls } from '../hooks/useCalls';

export function DashboardCalls() {
  const calls = useCalls();

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Recent Calls</h2>
      </div>
      <RecentCalls calls={calls} />
    </div>
  );
}