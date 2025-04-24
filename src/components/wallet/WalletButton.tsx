import React from 'react';
import { Wallet } from 'lucide-react';

interface WalletButtonProps {
  balance: number;
  onClick: () => void;
}

export function WalletButton({ balance, onClick }: WalletButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 rounded-full transition-colors"
      title="Wallet"
    >
      <Wallet className="w-5 h-5 text-purple-600" />
      <span className="font-medium text-purple-700">${balance.toFixed(2)}</span>
    </button>
  );
}