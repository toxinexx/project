import React from 'react';
import { Users } from 'lucide-react';

interface SMSButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function SMSButton({ onClick, disabled }: SMSButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-500 hover:bg-gray-600 active:bg-gray-700
        text-white flex items-center justify-center transition-all
        disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Users className="w-6 h-6 sm:w-8 sm:h-8" />
    </button>
  );
}