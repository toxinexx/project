import React from 'react';
import { UsageChart } from './UsageChart';
import { useUsageData } from '../hooks/useUsageData';

export function UsageSection() {
  const { used, total } = useUsageData();
  
  return (
    <div className="crm-tile h-full">
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Usage</h3>
        <div className="flex-1 flex items-center justify-center">
          <UsageChart used={used} total={total} />
        </div>
      </div>
    </div>
  );
}