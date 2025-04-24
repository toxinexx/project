import React from 'react';
import { useUsageData } from './hooks/useUsageData';
import { UsageChart } from './UsageChart';

export function UsageSection() {
  const { used, total } = useUsageData();
  
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Usage Overview</h3>
      <div className="flex items-center justify-center">
        <div className="w-64">
          <UsageChart used={used} total={total} />
        </div>
      </div>
    </div>
  );
}