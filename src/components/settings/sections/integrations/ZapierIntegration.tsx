import React from 'react';
import { Zap } from 'lucide-react';
import { IntegrationLayout } from './components/IntegrationLayout';
import { ConnectButton } from './components/ConnectButton';
import { ApiKeyDisplay } from './components/ApiKeyDisplay';
import { FeatureList } from './components/FeatureList';
import { useIntegrationStatus } from './hooks/useIntegrationStatus';

const FEATURES = [
  'Trigger automations on new calls',
  'Create contacts from other apps',
  'Log calls to your CRM',
  'Send SMS notifications'
];

export function ZapierIntegration() {
  const { status, isConnecting, connect } = useIntegrationStatus('zapier');
  const isConnected = status === 'connected';

  return (
    <IntegrationLayout
      icon={Zap}
      iconColor="text-orange-500"
      title="Zapier"
      description="Automate your workflow by connecting BurnerPhone with 3000+ apps"
    >
      <div className="flex items-center justify-between">
        <ConnectButton
          isConnected={isConnected}
          isConnecting={isConnecting}
          onClick={connect}
        />
      </div>

      <FeatureList features={FEATURES} />

      {isConnected && (
        <ApiKeyDisplay apiKey="zap_live_xxxxxxxxxxxx" />
      )}
    </IntegrationLayout>
  );
}