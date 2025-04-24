import React from 'react';
import { Phone, PhoneOff, Loader2 } from 'lucide-react';

interface CallButtonProps {
  onClick: () => void;
  status: 'idle' | 'calling' | 'connected';
  disabled?: boolean;
}

export function CallButton({ onClick, status, disabled }: CallButtonProps) {
  // Define status based styling
  const buttonClasses = {
    idle: "bg-green-500 hover:bg-green-600 active:bg-green-700",
    calling: "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 animate-pulse",
    connected: "bg-red-500 hover:bg-red-600 active:bg-red-700"
  };

  const getButtonContent = () => {
    switch (status) {
      case 'connected':
        return <PhoneOff className="w-6 h-6 sm:w-8 sm:h-8" />;
      case 'calling':
        return <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin" />;
      default:
        return <Phone className="w-6 h-6 sm:w-8 sm:h-8" />;
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || status === 'calling'}
      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${buttonClasses[status]} text-white 
        flex items-center justify-center transition-all cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-95 hover:scale-105 transform`}
    >
      {getButtonContent()}
    </button>
  );
}