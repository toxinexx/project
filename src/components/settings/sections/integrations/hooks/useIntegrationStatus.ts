import { useState, useCallback } from 'react';
import { Integration } from '../types';

export function useIntegrationStatus(integrationId: string) {
  const [status, setStatus] = useState<Integration['status']>('not_connected');
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('connected');
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  return {
    status,
    isConnecting,
    connect
  };
}