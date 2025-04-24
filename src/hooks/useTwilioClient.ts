import { useState, useEffect, useRef } from 'react';
import { Connection } from 'twilio-client';
import { TwilioClient } from '../lib/twilio/TwilioClient';

interface UseTwilioClientProps {
  token?: string;
  onIncomingCall?: (connection: Connection) => void;
}

export function useTwilioClient({ token, onIncomingCall }: UseTwilioClientProps) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientRef = useRef<TwilioClient | null>(null);

  useEffect(() => {
    if (!token) return;

    const initClient = async () => {
      try {
        if (!clientRef.current) {
          clientRef.current = new TwilioClient();
        }

        const device = await clientRef.current.initialize(token);
        
        device.on('ready', () => setIsReady(true));
        device.on('error', (err) => setError(err.message));
        
        if (onIncomingCall) {
          device.on('incoming', onIncomingCall);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize Twilio client');
      }
    };

    initClient();

    return () => {
      if (clientRef.current) {
        clientRef.current.destroy();
      }
    };
  }, [token, onIncomingCall]);

  const makeCall = async (number: string) => {
    if (!clientRef.current) {
      throw new Error('Twilio client not initialized');
    }
    return clientRef.current.makeCall(number);
  };

  return {
    isReady,
    error,
    makeCall
  };
}