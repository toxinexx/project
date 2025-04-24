import React from 'react';

interface TimeRangeSelectorProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

export function TimeRangeSelector({ selectedRange, onRangeChange }: TimeRangeSelectorProps) {
  const ranges = ['30d', '90d', '180d', '360d'];
  
  return (
    <div className="flex flex-wrap gap-2">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => onRangeChange(range)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
            ${selectedRange === range 
              ? 'bg-purple-100 text-purple-600' 
              : 'hover:bg-gray-100 text-gray-600'}`}
        >
          {range}
        </button>
      ))}
    </div>
  );
}