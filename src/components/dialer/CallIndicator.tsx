import React from 'react';
import { Phone } from 'lucide-react';

interface CallIndicatorProps {
  isIncoming?: boolean;
  isOutgoing?: boolean;
}

export function CallIndicator({ isIncoming, isOutgoing }: CallIndicatorProps) {
  if (!isIncoming && !isOutgoing) return null;

  const color = isIncoming ? 'red' : 'green';
  const text = isIncoming ? 'Incoming Call' : 'Outgoing Call';

  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="relative">
        {/* Outer pulsing ring */}
        <div className="absolute -inset-4">
          <div className={`w-24 h-24 rounded-full bg-${color}-500/20 animate-ping`} />
        </div>
        
        {/* Inner pulsing ring */}
        <div className="absolute -inset-2">
          <div className={`w-20 h-20 rounded-full bg-${color}-500/30 animate-pulse`} />
        </div>
        
        {/* Main circle */}
        <div className={`relative w-16 h-16 bg-${color}-500 rounded-full flex items-center justify-center shadow-lg`}>
          <Phone className="w-8 h-8 text-white animate-bounce" />
        </div>
      </div>
      
      <div className={`mt-4 text-${color}-600 font-semibold animate-pulse`}>
        {text}
      </div>
    </div>
  );
}