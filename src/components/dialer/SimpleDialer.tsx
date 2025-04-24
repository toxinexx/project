import React from 'react';
import { Keypad } from './keypad/Keypad';
import { PhoneInput } from './input/PhoneInput';
import { CallActions } from './actions/CallActions';

interface SimpleDialerProps {
  number: string;
  onNumberChange: (number: string) => void;
  onCall: () => void;
  onSMS: () => void;
}

export function SimpleDialer({ number, onNumberChange, onCall, onSMS }: SimpleDialerProps) {
  const handleDigitPress = (digit: string | number) => {
    onNumberChange(number + digit);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <PhoneInput value={number} onChange={onNumberChange} />
      <Keypad onDigitPress={handleDigitPress} />
      <CallActions onCall={onCall} onSMS={onSMS} disabled={!number} />
    </div>
  );
}