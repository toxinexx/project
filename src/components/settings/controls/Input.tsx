import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps {
  label: string;
  icon?: LucideIcon;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function Input({ label, icon: Icon, type = 'text', placeholder, value, onChange }: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative rounded-md shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm
            ${Icon ? 'pl-10' : 'pl-3'}`}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange?.(e.target.value)}
        />
      </div>
    </div>
  );
}