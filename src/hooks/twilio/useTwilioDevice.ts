import { useState, useEffect, useRef } from 'react';
import { TwilioDevice } from '../../lib/twilio/TwilioDevice';
import { TwilioConnection } from '../../lib/twilio/TwilioConnection';

interface UseTwilioDeviceProps {
  token?: string;
  onIncomingCall?: (connection: TwilioConnection) => void;
}

export function useTwilioDevice({ token, onIncomingCall }: UseTwilioDeviceProps) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const deviceRef = useRef<TwilioDevice | null>(null);

  useEffect(() => {
    if (!token) return;

    const device = new TwilioDevice();
    deviceRef.current = device;

    const unsubscribe = [
      device.on('ready', () => setIsReady(true)),
      device.on('error', (err) => setError(err)),
      device.on('incoming', (conn) => {
        const connection = new TwilioConnection(conn);
        onIncomingCall?.(connection);
      })
    ];

    device.setup(token).catch(setError);

    return () => {
      unsubscribe.forEach(fn => fn());
      device.destroy();
    };
  }, [token, onIncomingCall]);

  return {
    device: deviceRef.current,
    isReady,
    error
  };
}