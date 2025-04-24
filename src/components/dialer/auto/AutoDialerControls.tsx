import React from 'react';
import { Play, Pause } from 'lucide-react';

interface AutoDialerControlsProps {
  isDialing: boolean;
  onToggle: () => void;
}

export function AutoDialerControls({ isDialing, onToggle }: AutoDialerControlsProps) {
  return (
    <button
      onClick={onToggle}
      className={`px-4 py-2 rounded-lg ${
        isDialing ? 'bg-yellow-500' : 'bg-green-500'
      } text-white`}
    >
      {isDialing ? (
        <Pause className="w-4 h-4" />
      ) : (
        <Play className="w-4 h-4" />
      )}
    </button>
  );
}