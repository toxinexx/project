import React, { useState } from 'react';
import { SimpleDialer } from './dialer/SimpleDialer';
import { env } from '../config/env';
import { useTwilioDevice } from '../hooks/useTwilioDevice';
import { generateTwilioToken } from '../utils/twilioUtils';

export function Dialer() {
  const [number, setNumber] = useState('');
  const { device, isReady } = useTwilioDevice({
    token: generateTwilioToken('user'),
    onIncomingCall: (connection) => {
      console.log('Incoming call', connection);
    }
  });

  const handleCall = async () => {
    if (!device || !isReady) return;
    try {
      await device.connect({ To: number });
    } catch (error) {
      console.error('Failed to make call:', error);
    }
  };

  const handleSMS = async () => {
    // Implement SMS functionality
    console.log('Sending SMS to:', number);
  };

  return (
    <div className="max-w-md mx-auto">
      <SimpleDialer
        number={number}
        onNumberChange={setNumber}
        onCall={handleCall}
        onSMS={handleSMS}
      />
    </div>
  );
}