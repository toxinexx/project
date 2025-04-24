import React from 'react';
import { Keypad } from '../keypad/Keypad';
import { PhoneInput } from '../input/PhoneInput';
import { CallActions } from '../actions/CallActions';
import { CallIndicator } from '../CallIndicator';
import { CallerID } from './CallerID';

interface SimpleDialerProps {
  number: string;
  onNumberChange: (number: string) => void;
  onCall: () => void;
  onSMS: () => void;
  disabled?: boolean;
  callStatus?: 'idle' | 'calling' | 'connected';
  isIncoming?: boolean;
  isOutgoing?: boolean;
}

export function SimpleDialer({
  number,
  onNumberChange,
  onCall,
  onSMS,
  disabled,
  callStatus = 'idle',
  isIncoming = false,
  isOutgoing = false
}: SimpleDialerProps) {
  const handleDigitPress = (digit: string | number) => {
    onNumberChange(number + digit);
  };

  return (
    <div className="relative">
      <CallIndicator isIncoming={isIncoming} isOutgoing={isOutgoing} />
      
      <div className="space-y-4 px-2 sm:px-4">
        {/* Phone display area with iOS-like styling */}
        <PhoneInput value={number} onChange={onNumberChange} />
        
        {/* Caller ID - Show when call is active */}
        {callStatus !== 'idle' && (
          <CallerID 
            number={number} 
            status={callStatus}
          />
        )}
        
        {/* iOS-style keypad */}
        <Keypad onDigitPress={handleDigitPress} />
        
        {/* Call/SMS action buttons */}
        <CallActions
          onCall={onCall}
          onSMS={onSMS}
          onTransfer={() => {}}
          onMerge={() => {}}
          onMute={() => {}}
          disabled={disabled}
          status={callStatus}
          isMuted={false}
        />
      </div>
    </div>
  );
}