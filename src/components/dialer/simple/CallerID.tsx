import React from 'react';
import { Phone } from 'lucide-react';

interface CallerIDProps {
  number: string;
  status: 'idle' | 'calling' | 'connected';
}

export function CallerID({ number, status }: CallerIDProps) {
  const getStatusText = () => {
    switch (status) {
      case 'calling':
        return 'Calling...';
      case 'connected':
        return 'On Call';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'calling':
        return 'text-amber-600';
      case 'connected':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center 
      shadow-lg border border-gray-200 transform transition-all duration-300
      ${status === 'calling' ? 'animate-pulse' : ''}`}
    >
      <div className="flex items-center justify-center mb-2">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center 
          ${status === 'calling' ? 'bg-amber-100' : 'bg-green-100'}`}>
          <Phone className={`w-5 h-5 ${getStatusColor()}`} />
        </div>
      </div>
      <div className="font-medium text-gray-900">{number}</div>
      <div className={`text-sm ${getStatusColor()}`}>{getStatusText()}</div>
      
      {/* Animated ring effect when calling */}
      {status === 'calling' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-full h-full rounded-2xl border-2 border-amber-400 animate-ping" />
          <div className="absolute w-full h-full rounded-2xl border-2 border-amber-400 animate-pulse" />
        </div>
      )}
    </div>
  );
}