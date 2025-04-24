import React from 'react';
import { TwilioCredentials } from './twilio/TwilioCredentials';
import { TwilioPhoneNumbers } from './twilio/TwilioPhoneNumbers';

export function TwilioSection() {
  return (
    <div className="crm-tile">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Phone System</h2>
        <p className="mt-1 text-sm text-gray-600">Configure your Twilio phone settings</p>
      </div>
      <div className="p-6 space-y-6">
        <TwilioCredentials />
        <TwilioPhoneNumbers />
      </div>
    </div>
  );
}