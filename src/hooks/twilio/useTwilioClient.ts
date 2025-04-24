import { useState, useEffect, useRef, useCallback } from 'react';
import { Call } from '@twilio/voice-sdk';
import { TwilioClient } from '../../lib/twilio/TwilioClient';

interface UseTwilioClientOptions {
  token?: string;
  onIncomingCall?: (call: Call) => void;
  onOutgoingCall?: (call: Call) => void;
  onError?: (error: Error) => void;
}

export function useTwilioClient({
  token,
  onIncomingCall,
  onOutgoingCall,
  onError
}: UseTwilioClientOptions) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const clientRef = useRef<TwilioClient | null>(null);

  useEffect(() => {
    if (!token || clientRef.current?.isReady()) return;

    const client = new TwilioClient();
    clientRef.current = client;

    const cleanup = [
      client.on('ready', () => setIsReady(true)),
      client.on('error', (err) => {
        setError(err);
        onError?.(err);
      }),
      client.on('incoming', (call) => onIncomingCall?.(call)),
      client.on('outgoing', (call) => onOutgoingCall?.(call))
    ];

    client.initialize(token).catch((err) => {
      setError(err);
      onError?.(err);
    });

    return () => {
      cleanup.forEach(unsubscribe => unsubscribe());
      client.destroy();
    };
  }, [token, onIncomingCall, onOutgoingCall, onError]);

  const makeCall = useCallback(async (to: string) => {
    if (!clientRef.current?.isReady()) {
      throw new Error('Client not ready');
    }
    return clientRef.current.makeCall(to);
  }, []);

  return {
    isReady,
    error,
    makeCall
  };
}