import React from 'react';
import { StatsCards } from './StatsCards';

export function StatsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCards />
    </div>
  );
}