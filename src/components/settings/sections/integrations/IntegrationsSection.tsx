import React from 'react';
import { Puzzle } from 'lucide-react';
import { ZapierIntegration } from './ZapierIntegration';
import { GoogleIntegration } from './GoogleIntegration';
import { CRMIntegration } from './CRMIntegration';

export function IntegrationsSection() {
  return (
    <div className="crm-tile">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <Puzzle className="w-5 h-5 text-gray-500" />
          <h2 className="text-xl font-semibold text-gray-800">Integrations</h2>
        </div>
        <p className="mt-1 text-sm text-gray-600">Connect your favorite tools and services</p>
      </div>
      
      <div className="p-6 space-y-6">
        <ZapierIntegration />
        <GoogleIntegration />
        <CRMIntegration />
      </div>
    </div>
  );
}