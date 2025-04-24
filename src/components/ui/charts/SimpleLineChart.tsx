import React from 'react';

interface LineConfig {
  key: string;
  color: string;
  name: string;
}

interface SimpleLineChartProps {
  data: any[];
  lines: LineConfig[];
  xAxisKey: string;
  height?: number;
}

export function SimpleLineChart({ 
  data, 
  lines, 
  xAxisKey,
  height = 300 
}: SimpleLineChartProps) {
  // Calculate scales and dimensions
  const width = 800;
  const padding = 40;
  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);

  // Find min/max values
  const allValues = data.flatMap(d => lines.map(l => d[l.key]));
  const maxValue = Math.max(...allValues);

  // Create SVG points for each line
  const createPoints = (lineKey: string) => {
    return data.map((d, i) => {
      const x = (i / (data.length - 1)) * chartWidth + padding;
      const y = height - (d[lineKey] / maxValue * chartHeight) - padding;
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {/* Grid lines */}
        {[...Array(5)].map((_, i) => {
          const y = padding + (i * (chartHeight / 4));
          return (
            <line
              key={i}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          );
        })}

        {/* Lines */}
        {lines.map(line => (
          <polyline
            key={line.key}
            points={createPoints(line.key)}
            fill="none"
            stroke={line.color}
            strokeWidth="2"
          />
        ))}

        {/* Axis */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#9CA3AF"
          strokeWidth="1"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="#9CA3AF"
          strokeWidth="1"
        />

        {/* X-axis labels */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * chartWidth + padding;
          return (
            <text
              key={i}
              x={x}
              y={height - padding + 20}
              textAnchor="middle"
              className="text-xs fill-gray-500"
            >
              {d[xAxisKey]}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-4">
        {lines.map(line => (
          <div key={line.key} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: line.color }} 
            />
            <span className="text-sm text-gray-600">{line.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}