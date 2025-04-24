import { useState, useEffect } from 'react';
import { Device } from 'twilio-client';

interface UseTwilioDeviceProps {
  token?: string;
  onIncomingCall?: (connection: any) => void;
}

export function useTwilioDevice({ token, onIncomingCall }: UseTwilioDeviceProps) {
  const [device, setDevice] = useState<Device | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const initDevice = async () => {
      try {
        const newDevice = new Device(token);
        
        newDevice.on('ready', () => setIsReady(true));
        newDevice.on('error', (err) => setError(err.message));
        if (onIncomingCall) {
          newDevice.on('incoming', onIncomingCall);
        }

        setDevice(newDevice);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize Twilio device');
      }
    };

    initDevice();

    return () => {
      device?.destroy();
    };
  }, [token, onIncomingCall]);

  return { device, isReady, error };
}