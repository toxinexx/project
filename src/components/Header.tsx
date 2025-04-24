import React from 'react';
import { UserMenu } from './user/UserMenu';
import { ConversationsButton } from './conversations/ConversationsButton';
import { Flame } from 'lucide-react';

function Logo() {
  return (
    <div className="relative flex items-center">
      {/* Animated smoke effect */}
      <div className="absolute -top-1 left-1">
        <div className="w-3 h-3 bg-gradient-to-t from-gray-300/0 to-gray-300/30 rounded-full animate-smoke-1" />
        <div className="w-3 h-3 bg-gradient-to-t from-gray-300/0 to-gray-300/30 rounded-full animate-smoke-2" />
        <div className="w-3 h-3 bg-gradient-to-t from-gray-300/0 to-gray-300/30 rounded-full animate-smoke-3" />
      </div>
      
      {/* Logo icon */}
      <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg shadow-lg">
        <Flame className="w-6 h-6 text-white" />
      </div>
      
      {/* Brand text */}
      <h1 className="ml-3 text-2xl font-bold">
        Burner<span className="text-orange-500">Phone</span>
        <span className="text-gray-400 text-sm font-normal">.ai</span>
      </h1>
    </div>
  );
}

export function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Logo />
          <div className="flex items-center space-x-4">
            <ConversationsButton />
            <div className="h-6 w-px bg-gray-200" />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}