import React from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function PhoneInput({ value, onChange, className = '' }: PhoneInputProps) {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-12 sm:h-16 text-2xl sm:text-3xl py-2 sm:py-4 px-0 border-b-2 border-gray-200 
          text-center bg-transparent font-light tracking-wider
          focus:outline-none focus:border-purple-500 ${className}`}
        placeholder="Enter phone number"
      />
    </div>
  );
}