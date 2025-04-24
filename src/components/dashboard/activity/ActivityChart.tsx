import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ActivityData } from '../../../types/activity';

interface ActivityChartProps {
  data: ActivityData[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis
          dataKey="date"
          stroke="#9CA3AF"
          fontSize={12}
          tickLine={false}
        />
        <YAxis
          stroke="#9CA3AF"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '0.375rem',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
          }}
        />
        <Legend
          verticalAlign="top"
          height={36}
          iconType="circle"
          iconSize={8}
        />
        <Line
          type="monotone"
          dataKey="calls"
          stroke="#8B5CF6"
          strokeWidth={2}
          dot={false}
          name="Calls"
        />
        <Line
          type="monotone"
          dataKey="sms"
          stroke="#C084FC"
          strokeWidth={2}
          dot={false}
          name="SMS"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}