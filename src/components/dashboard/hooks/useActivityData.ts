import { useMemo } from 'react';

export function useActivityData() {
  return useMemo(() => {
    const data = [];
    const now = new Date();
    
    // Generate 30 days of data by default
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Generate some random but somewhat realistic data
      const baseCallValue = Math.floor(Math.random() * 20) + 10;
      const baseSmsValue = Math.floor(Math.random() * 15) + 5;
      
      // Add some weekly patterns
      const dayOfWeek = date.getDay();
      const weekendMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 0.6 : 1;
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        calls: Math.floor(baseCallValue * weekendMultiplier),
        sms: Math.floor(baseSmsValue * weekendMultiplier)
      });
    }
    
    return data;
  }, []);
}