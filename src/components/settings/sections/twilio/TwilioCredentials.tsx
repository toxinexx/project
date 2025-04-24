import React, { useState } from 'react';
import { Phone, Key, Shield, Check } from 'lucide-react';
import { Input } from '../../controls/Input';
import { useTwilioCredentials } from './hooks/useTwilioCredentials';

export function TwilioCredentials() {
  const { credentials, isActivating, error, activate, updateCredentials } = useTwilioCredentials();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Account SID"
          icon={Key}
          value={credentials.accountSid}
          onChange={(value) => updateCredentials('accountSid', value)}
          type={isVisible ? 'text' : 'password'}
          placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        />
        <Input
          label="Auth Token"
          icon={Shield}
          value={credentials.authToken}
          onChange={(value) => updateCredentials('authToken', value)}
          type={isVisible ? 'text' : 'password'}
          placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isVisible}
            onChange={(e) => setIsVisible(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">Show credentials</span>
        </label>

        <button
          onClick={activate}
          disabled={isActivating || !credentials.accountSid || !credentials.authToken}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
            transition-colors disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center gap-2"
        >
          {isActivating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Activating...
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              Activate Credentials
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
}