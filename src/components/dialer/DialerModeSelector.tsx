import React from 'react';
import { Phone, MousePointer, Database } from 'lucide-react';
import { DialerMode } from '../../types';

interface DialerModeSelectorProps {
  mode: DialerMode;
  onChange: (mode: DialerMode) => void;
}

export function DialerModeSelector({ mode, onChange }: DialerModeSelectorProps) {
  const modes = [
    { id: 'simple' as const, icon: Phone, label: 'Simple Dialer' },
    { id: 'highlight' as const, icon: MousePointer, label: 'Click to Dial' },
    { id: 'crm' as const, icon: Database, label: 'CRM Integration' },
  ];

  return (
    <div className="flex gap-4 mb-6">
      {modes.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            mode === id
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
}