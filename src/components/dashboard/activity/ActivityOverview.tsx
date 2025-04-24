import React, { useState } from 'react';
import { ActivityChart } from './ActivityChart';
import { TimeRangeSelector } from './TimeRangeSelector';
import { useActivityData } from '../hooks/useActivityData';

export function ActivityOverview() {
  const [selectedRange, setSelectedRange] = useState('30d');
  const activityData = useActivityData();

  return (
    <div className="crm-tile h-[300px] sm:h-[364px]">
      <div className="p-4 sm:p-6 border-b">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-gray-800">Activity Overview</h3>
          <TimeRangeSelector
            selectedRange={selectedRange}
            onRangeChange={setSelectedRange}
          />
        </div>
      </div>
      <div className="p-4 sm:p-6 h-[calc(100%-77px)]">
        <ActivityChart data={activityData} />
      </div>
    </div>
  );
}