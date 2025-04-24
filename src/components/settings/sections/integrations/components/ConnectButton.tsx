import React from 'react';
import { Check, Loader2 } from 'lucide-react';

interface ConnectButtonProps {
  isConnected: boolean;
  isConnecting: boolean;
  onClick: () => void;
  label?: string;
}

export function ConnectButton({
  isConnected,
  isConnecting,
  onClick,
  label = 'Connect'
}: ConnectButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isConnecting}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
        ${isConnected
          ? 'bg-green-100 text-green-700 hover:bg-green-200'
          : 'bg-blue-600 text-white hover:bg-blue-700'}`}
    >
      {isConnecting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Connecting...
        </>
      ) : isConnected ? (
        <>
          <Check className="w-4 h-4" />
          Connected
        </>
      ) : (
        label
      )}
    </button>
  );
}