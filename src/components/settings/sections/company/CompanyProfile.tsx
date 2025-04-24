import React from 'react';
import { Building2 } from 'lucide-react';
import { LogoUpload } from '../../controls/LogoUpload';
import { useUserProfile } from '../../../user/hooks/useUserProfile';

export function CompanyProfile() {
  const { logo, updateLogo } = useUserProfile();

  return (
    <div className="flex items-center space-x-6">
      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
        {logo ? (
          <img src={logo} alt="Company Logo" className="w-full h-full object-cover" />
        ) : (
          <Building2 className="w-12 h-12 text-gray-500" />
        )}
      </div>
      <LogoUpload onUpload={updateLogo} />
    </div>
  );
}