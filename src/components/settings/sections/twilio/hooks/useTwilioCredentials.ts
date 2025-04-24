import { useState, useCallback } from 'react';

interface TwilioCredentials {
  accountSid: string;
  authToken: string;
}

export function useTwilioCredentials() {
  const [credentials, setCredentials] = useState<TwilioCredentials>({
    accountSid: '',
    authToken: ''
  });
  const [isActivating, setIsActivating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCredentials = useCallback((field: keyof TwilioCredentials, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    setError(null);
  }, []);

  const activate = useCallback(async () => {
    if (!credentials.accountSid || !credentials.authToken) {
      setError('Please enter both Account SID and Auth Token');
      return;
    }

    setIsActivating(true);
    setError(null);

    try {
      // In production, this would validate the credentials with Twilio
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store the validated credentials
      localStorage.setItem('twilio_credentials', JSON.stringify(credentials));
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to activate credentials');
      return false;
    } finally {
      setIsActivating(false);
    }
  }, [credentials]);

  return {
    credentials,
    isActivating,
    error,
    updateCredentials,
    activate
  };
}