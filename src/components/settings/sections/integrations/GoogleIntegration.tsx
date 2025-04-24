import React from 'react';
import { Mail } from 'lucide-react';
import { IntegrationLayout } from './components/IntegrationLayout';
import { ConnectButton } from './components/ConnectButton';
import { FeatureList } from './components/FeatureList';
import { useIntegrationStatus } from './hooks/useIntegrationStatus';

const FEATURES = [
  'Import Google Contacts',
  'Calendar Sync',
  'Gmail Integration',
  'Google Meet Integration'
];

export function GoogleIntegration() {
  const { status, isConnecting, connect } = useIntegrationStatus('google');
  const isConnected = status === 'connected';

  return (
    <IntegrationLayout
      icon={Mail}
      iconColor="text-red-500"
      title="Google Workspace"
      description="Sync contacts, calendar events, and emails with Google"
    >
      <div className="flex items-center justify-between">
        <ConnectButton
          isConnected={isConnected}
          isConnecting={isConnecting}
          onClick={connect}
          label="Connect Google Account"
        />
      </div>

      <FeatureList features={FEATURES} />
    </IntegrationLayout>
  );
}