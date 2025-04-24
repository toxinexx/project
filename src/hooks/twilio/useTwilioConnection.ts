import { useState, useEffect } from 'react';
import { TwilioConnection } from '../../lib/twilio/TwilioConnection';

interface UseTwilioConnectionProps {
  connection?: TwilioConnection;
  onDisconnect?: () => void;
}

export function useTwilioConnection({ connection, onDisconnect }: UseTwilioConnectionProps) {
  const [status, setStatus] = useState<string>('');
  const [direction, setDirection] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!connection) return;

    const unsubscribe = [
      connection.on('accept', () => setStatus('accepted')),
      connection.on('disconnect', () => {
        setStatus('disconnected');
        onDisconnect?.();
      }),
      connection.on('error', (err) => setError(err)),
      connection.on('reject', () => setStatus('rejected'))
    ];

    setStatus(connection.getStatus());
    setDirection(connection.getDirection());

    return () => unsubscribe.forEach(fn => fn());
  }, [connection, onDisconnect]);

  return {
    status,
    direction,
    error,
    accept: () => connection?.accept(),
    reject: () => connection?.reject(),
    disconnect: () => connection?.disconnect()
  };
}