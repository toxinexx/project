import React from 'react';
import { Phone } from 'lucide-react';

export function Logo() {
  return (
    <div className="relative flex items-center">
      {/* Smoke particles */}
      <div className="absolute -top-2 left-1 pointer-events-none">
        <div className="absolute w-3 h-3 rounded-full bg-gradient-to-t from-transparent to-gray-200/40 animate-smoke-1" />
        <div className="absolute w-3 h-3 rounded-full bg-gradient-to-t from-transparent to-gray-200/40 animate-smoke-2" />
        <div className="absolute w-3 h-3 rounded-full bg-gradient-to-t from-transparent to-gray-200/40 animate-smoke-3" />
      </div>
      
      {/* Logo icon with gradient */}
      <div className="relative bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg shadow-lg">
        <Phone className="w-6 h-6 text-white" />
      </div>
      
      {/* Brand text */}
      <div className="ml-3">
        <h1 className="text-2xl font-bold flex items-baseline">
          Deal<span className="text-purple-500">Fone</span>
          <span className="text-gray-400 text-sm font-normal ml-0.5">.ai</span>
        </h1>
      </div>
    </div>
  );
}