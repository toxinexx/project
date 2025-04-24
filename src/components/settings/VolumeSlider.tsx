import React from 'react';

interface VolumeSliderProps {
  label: string;
}

export function VolumeSlider({ label }: VolumeSliderProps) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-gray-700">{label}</label>
      <input type="range" className="w-48" />
    </div>
  );
}