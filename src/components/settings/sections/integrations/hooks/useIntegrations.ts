import { useState } from 'react';

interface Integration {
  id: string;
  name: string;
  status: 'connected' | 'not_connected';
  apiKey?: string;
}

export function useIntegrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);

  const connectIntegration = async (id: string) => {
    // In production, this would make an API call
    setIntegrations(prev => [
      ...prev,
      {
        id,
        name: id,
        status: 'connected',
        apiKey: `${id}_${crypto.randomUUID()}`
      }
    ]);
  };

  const disconnectIntegration = async (id: string) => {
    setIntegrations(prev => prev.filter(i => i.id !== id));
  };

  return {
    integrations,
    connectIntegration,
    disconnectIntegration
  };
}