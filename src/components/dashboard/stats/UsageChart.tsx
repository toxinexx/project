import React from 'react';

interface UsageChartProps {
  used: number;
  total: number;
}

export function UsageChart({ used, total }: UsageChartProps) {
  const percentage = (used / total) * 100;
  
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const getSlicePath = (startAngle: number, endAngle: number, depth: number = 0) => {
    const start = polarToCartesian(50, 50 - depth, 40, endAngle);
    const end = polarToCartesian(50, 50 - depth, 40, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    // Create the main arc path
    const mainArc = [
      "M", 50, 50 - depth,
      "L", start.x, start.y,
      "A", 40, 40, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");

    // If depth is 0, return just the main arc
    if (depth === 0) return mainArc;

    // Create the side wall paths for 3D effect
    const startBottom = polarToCartesian(50, 50, 40, endAngle);
    const endBottom = polarToCartesian(50, 50, 40, startAngle);
    
    const wall = [
      "M", start.x, start.y,
      "L", startBottom.x, startBottom.y,
      "A", 40, 40, 0, largeArcFlag, 0, endBottom.x, endBottom.y,
      "L", end.x, end.y,
      "A", 40, 40, 0, largeArcFlag, 1, start.x, start.y
    ].join(" ");

    return mainArc + " " + wall;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-[60deg]">
          <defs>
            <linearGradient id="usedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#93C5FD' }} />
              <stop offset="100%" style={{ stopColor: '#60A5FA' }} />
            </linearGradient>
            <linearGradient id="remainingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#F3F4F6' }} />
              <stop offset="100%" style={{ stopColor: '#E5E7EB' }} />
            </linearGradient>
          </defs>
          
          {/* 3D effect layers - deeper for more pronounced effect */}
          <path
            d={getSlicePath((percentage * 3.6), 360, 8)}
            fill="url(#remainingGradient)"
            className="transition-all duration-500 opacity-70"
          />
          <path
            d={getSlicePath(0, (percentage * 3.6), 8)}
            fill="url(#usedGradient)"
            className="transition-all duration-500 opacity-70"
          />
          
          {/* Top layers */}
          <path
            d={getSlicePath((percentage * 3.6), 360)}
            fill="url(#remainingGradient)"
            className="transition-all duration-500"
          />
          <path
            d={getSlicePath(0, (percentage * 3.6))}
            fill="url(#usedGradient)"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-500">Used</div>
            <div className="text-2xl font-bold text-blue-600">{Math.round(percentage)}%</div>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span className="text-sm text-gray-600">Used</span>
          </div>
          <span className="text-sm font-medium text-gray-800">{used} mins</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <span className="text-sm text-gray-600">Remaining</span>
          </div>
          <span className="text-sm font-medium text-gray-800">{total - used} mins</span>
        </div>
      </div>
    </div>
  );
}