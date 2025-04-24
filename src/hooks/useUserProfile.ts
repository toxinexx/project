import { useState, useCallback } from 'react';

export function useUserProfile() {
  const [logo, setLogo] = useState<string | undefined>();
  const [name] = useState('User');
  const [companyName, setCompanyName] = useState<string>('');
  const [hasCompanyInfo, setHasCompanyInfo] = useState(false);

  const updateLogo = useCallback((newLogo: string) => {
    setLogo(newLogo);
  }, []);

  const updateCompanyInfo = useCallback((info: { name: string }) => {
    setCompanyName(info.name);
    setHasCompanyInfo(true);
  }, []);

  return {
    logo,
    name,
    companyName,
    hasCompanyInfo,
    updateLogo,
    updateCompanyInfo
  };
}