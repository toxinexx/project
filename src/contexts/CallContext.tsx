import React, { createContext, useContext, useState, useCallback } from 'react';

interface CallContextType {
  isIncomingCall: boolean;
  isOutgoingCall: boolean;
  setIncomingCall: (value: boolean) => void;
  setOutgoingCall: (value: boolean) => void;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export function CallProvider({ children }: { children: React.ReactNode }) {
  const [isIncomingCall, setIncomingCall] = useState(false);
  const [isOutgoingCall, setOutgoingCall] = useState(false);

  return (
    <CallContext.Provider value={{
      isIncomingCall,
      isOutgoingCall,
      setIncomingCall,
      setOutgoingCall
    }}>
      {children}
    </CallContext.Provider>
  );
}

export function useCallState() {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error('useCallState must be used within a CallProvider');
  }
  return context;
}