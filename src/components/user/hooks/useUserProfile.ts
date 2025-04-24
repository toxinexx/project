import { useState, useCallback } from 'react';

export function useUserProfile() {
  const [logo, setLogo] = useState<string | undefined>();
  const [name] = useState('User');

  const updateLogo = useCallback((newLogo: string) => {
    setLogo(newLogo);
  }, []);

  return {
    logo,
    name,
    updateLogo
  };
}