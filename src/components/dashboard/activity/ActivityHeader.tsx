import React from 'react';
import { History } from 'lucide-react';

export function ActivityHeader() {
  return (
    <div className="flex items-center gap-2">
      <History className="w-5 h-5 text-purple-500" />
      <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
    </div>
  );
}