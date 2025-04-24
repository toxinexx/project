import React from 'react';
import { Phone, Check } from 'lucide-react';

interface PhoneNumber {
  number: string;
  status: 'active' | 'available';
}

interface PhoneNumberSelectorProps {
  label: string;
  numbers: PhoneNumber[];
  onSelect: (number: string) => void;
}

export function PhoneNumberSelector({ label, numbers, onSelect }: PhoneNumberSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="space-y-2">
        {numbers.map((num) => (
          <button
            key={num.number}
            onClick={() => onSelect(num.number)}
            className={`w-full flex items-center justify-between p-3 rounded-md border
              ${num.status === 'active' 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-300 hover:border-gray-400'}`}
          >
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <span>{num.number}</span>
            </div>
            {num.status === 'active' && (
              <Check className="w-5 h-5 text-blue-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}