import React, { useState } from 'react';
import { Database } from 'lucide-react';
import { IntegrationLayout } from './components/IntegrationLayout';
import { CRMSelector } from './components/CRMSelector';
import { PodioConfig } from './crm/PodioConfig';
import { GoHighLevelConfig } from './crm/GoHighLevelConfig';
import { CRM_TYPES } from './constants';

export function CRMIntegration() {
  const [selectedCRM, setSelectedCRM] = useState<string | null>(null);

  return (
    <IntegrationLayout
      icon={Database}
      iconColor="text-purple-500"
      title="CRM Integration"
      description="Connect your CRM to sync contacts and track interactions"
    >
      <CRMSelector
        selected={selectedCRM}
        onSelect={setSelectedCRM}
      />

      {selectedCRM === CRM_TYPES.PODIO && <PodioConfig />}
      {selectedCRM === CRM_TYPES.GO_HIGH_LEVEL && <GoHighLevelConfig />}
    </IntegrationLayout>
  );
}