import { useState, useCallback } from 'react';

interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  avatar?: string;
  connected: boolean;
}

export function useSocialAccounts() {
  const [accounts, setAccounts] = useState<SocialAccount[]>([
    {
      id: '1',
      platform: 'facebook',
      username: 'business_facebook',
      connected: true
    }
  ]);

  const connectAccount = useCallback((platform: string) => {
    // In a real app, this would open OAuth flow
    console.log(`Connecting to ${platform}...`);
    
    // Simulate successful connection
    const newAccount: SocialAccount = {
      id: crypto.randomUUID(),
      platform,
      username: `business_${platform}`,
      connected: true
    };
    
    setAccounts(prev => {
      const exists = prev.some(a => a.platform === platform);
      if (exists) {
        return prev.filter(a => a.platform !== platform);
      }
      return [...prev, newAccount];
    });
  }, []);

  return {
    accounts,
    connectAccount
  };
}