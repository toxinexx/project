import React from 'react';
import { CompanyProfile } from './company/CompanyProfile';
import { CompanyDetails } from './company/CompanyDetails';

export function CompanySection() {
  return (
    <div className="crm-tile">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Company Profile</h2>
        <p className="mt-1 text-sm text-gray-600">Manage your company information and branding</p>
      </div>
      <div className="p-6 space-y-6">
        <CompanyProfile />
        <CompanyDetails />
      </div>
    </div>
  );
}