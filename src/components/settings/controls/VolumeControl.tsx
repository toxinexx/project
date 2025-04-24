import React from 'react';

interface VolumeControlProps {
  label: string;
  defaultValue?: number;
}

export function VolumeControl({ label, defaultValue = 75 }: VolumeControlProps) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-gray-700">{label}</label>
      <input 
        type="range" 
        className="w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
        defaultValue={defaultValue}
      />
    </div>
  );
}