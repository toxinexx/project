import React from 'react';
import { UserMenu } from '../user/UserMenu';
import { ConversationsButton } from '../conversations/ConversationsButton';
import { WalletButton } from '../wallet/WalletButton';
import { Logo } from '../brand/Logo';
import { Wallet } from '../wallet/Wallet';

export function Header() {
  const [showWallet, setShowWallet] = React.useState(false);
  const [balance, setBalance] = React.useState(0);

  return (
    <header className="bg-white border-b sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          {/* Desktop menu */}
          <div className="flex items-center gap-4">
            <WalletButton 
              balance={balance}
              onClick={() => setShowWallet(true)}
            />
            <ConversationsButton />
            <div className="h-6 w-px bg-gray-200" />
            <UserMenu />
          </div>
        </div>
      </div>

      {/* Wallet Modal */}
      {showWallet && (
        <div 
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setShowWallet(false)}
        >
          <div 
            className="fixed inset-x-4 top-20 max-w-3xl mx-auto bg-white rounded-xl shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <Wallet />
          </div>
        </div>
      )}
    </header>
  );
}