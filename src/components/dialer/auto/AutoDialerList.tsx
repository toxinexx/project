import React from 'react';
import { X } from 'lucide-react';

interface AutoDialerListProps {
  numbers: string[];
  onRemove: (index: number) => void;
}

export function AutoDialerList({ numbers, onRemove }: AutoDialerListProps) {
  return (
    <div className="space-y-2">
      {numbers.map((number, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-gray-50 p-2 rounded"
        >
          <span>{number}</span>
          <button
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}