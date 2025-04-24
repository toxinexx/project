import React from 'react';
import { Key, Globe } from 'lucide-react';
import { Input } from '../../../controls/Input';
import { ConnectButton } from '../components/ConnectButton';
import { useCRMConfig } from '../hooks/useCRMConfig';

export function PodioConfig() {
  const { config, isConnecting, updateConfig, connect } = useCRMConfig();

  return (
    <div className="mt-6 space-y-6 border rounded-lg p-6 bg-gray-50">
      <div>
        <h4 className="font-medium text-gray-800">Podio Configuration</h4>
        <p className="mt-1 text-sm text-gray-600">
          Enter your Podio API credentials to connect your workspace
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Client ID"
          icon={Key}
          value={config.clientId}
          onChange={(value) => updateConfig('clientId', value)}
          placeholder="Enter your Podio client ID"
        />
        <Input
          label="Client Secret"
          icon={Key}
          type="password"
          value={config.clientSecret}
          onChange={(value) => updateConfig('clientSecret', value)}
          placeholder="Enter your Podio client secret"
        />
        <Input
          label="Workspace URL"
          icon={Globe}
          value={config.workspaceUrl}
          onChange={(value) => updateConfig('workspaceUrl', value)}
          placeholder="https://podio.com/workspacename"
        />
      </div>

      <div className="flex justify-end">
        <ConnectButton
          isConnected={false}
          isConnecting={isConnecting}
          onClick={connect}
          label="Connect Podio"
        />
      </div>
    </div>
  );
}