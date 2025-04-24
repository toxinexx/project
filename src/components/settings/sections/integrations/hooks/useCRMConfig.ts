import { useState } from 'react';

export function useCRMConfig() {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [isConnecting, setIsConnecting] = useState(false);

  const updateConfig = (key: string, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const connect = async () => {
    setIsConnecting(true);
    try {
      // In production, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  return {
    config,
    isConnecting,
    updateConfig,
    connect
  };
}