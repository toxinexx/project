import { useState, useCallback } from 'react';
import { useTwilioClient } from '../../../hooks/twilio/useTwilioClient';
import { formatPhoneNumber, isValidPhoneNumber } from '../../../utils/phoneUtils';
import { generateTwilioToken } from '../../../utils/twilioUtils';

export function useDialer() {
  const [number, setNumber] = useState('');
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'connected'>('idle');
  const [useRVM, setUseRVM] = useState(false);
  const [selectedDropId, setSelectedDropId] = useState<string>();
  
  const token = generateTwilioToken('user');
  
  const { isReady, error, makeCall } = useTwilioClient({
    token,
    onIncomingCall: useCallback((call) => {
      console.log('Incoming call', call);
    }, []),
    onError: useCallback((error) => {
      console.error('Twilio error:', error);
      setCallStatus('idle');
    }, [])
  });

  const handleNumberChange = useCallback((value: string) => {
    const formattedNumber = formatPhoneNumber(value);
    setNumber(formattedNumber);
  }, []);

  const handleCall = useCallback(async () => {
    if (!isReady || !isValidPhoneNumber(number)) return;
    
    try {
      if (callStatus === 'connected') {
        // If already in a call, hang up
        setCallStatus('idle');
        return;
      }

      setCallStatus('calling');
      await makeCall(number);
      setCallStatus('connected');
    } catch (error) {
      console.error('Failed to make call:', error);
      setCallStatus('idle');
    }
  }, [isReady, number, makeCall, callStatus]);

  const handleSMS = useCallback(async () => {
    if (import.meta.env.DEV) {
      console.log('Development mode: Simulating SMS to:', number);
      return;
    }
    // Implement actual SMS functionality here
  }, [number]);

  return {
    number,
    isReady,
    error,
    callStatus,
    useRVM,
    setUseRVM,
    selectedDropId,
    setSelectedDropId,
    handleNumberChange,
    handleCall,
    handleSMS
  };
}