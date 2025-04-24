import { useMemo } from 'react';

export function useCalls() {
  return useMemo(() => [
    { id: 1, name: 'John Doe', number: '+1 (555) 123-4567', duration: '5:23', type: 'outgoing' as const, timestamp: '2 hours ago' },
    { id: 2, name: 'Jane Smith', number: '+1 (555) 987-6543', duration: '3:45', type: 'incoming' as const, timestamp: '4 hours ago' },
    { id: 3, name: 'Mike Johnson', number: '+1 (555) 456-7890', duration: '1:30', type: 'outgoing' as const, timestamp: 'Yesterday' },
  ], []);
}