import React from 'react';
import { Key, Globe } from 'lucide-react';
import { Input } from '../../../controls/Input';
import { ConnectButton } from '../components/ConnectButton';
import { useCRMConfig } from '../hooks/useCRMConfig';

export function GoHighLevelConfig() {
  const { config, isConnecting, updateConfig, connect } = useCRMConfig();

  return (
    <div className="mt-6 space-y-6 border rounded-lg p-6 bg-gray-50">
      <div>
        <h4 className="font-medium text-gray-800">GoHighLevel Configuration</h4>
        <p className="mt-1 text-sm text-gray-600">
          Enter your GoHighLevel API credentials to connect your account
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="API Key"
          icon={Key}
          type="password"
          value={config.apiKey}
          onChange={(value) => updateConfig('apiKey', value)}
          placeholder="Enter your GoHighLevel API key"
        />
        <Input
          label="Agency Domain"
          icon={Globe}
          value={config.domain}
          onChange={(value) => updateConfig('domain', value)}
          placeholder="youragency.gohighlevel.com"
        />
      </div>

      <div className="flex justify-end">
        <ConnectButton
          isConnected={false}
          isConnecting={isConnecting}
          onClick={connect}
          label="Connect GoHighLevel"
        />
      </div>
    </div>
  );
}