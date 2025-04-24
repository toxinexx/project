import { useMemo } from 'react';

export function useUsageData() {
  return useMemo(() => ({
    used: 450,
    total: 1000
  }), []);
}