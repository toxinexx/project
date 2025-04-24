import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ControlButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  color: 'amber' | 'purple' | 'gray' | 'red';
  active?: boolean;
  description?: string;
}

export function ControlButton({
  icon: Icon,
  label,
  onClick,
  color,
  active,
  description
}: ControlButtonProps) {
  // Define iOS-like styling
  const getColorClasses = () => {
    const baseClasses = 'transition-all duration-150';
    
    if (active) {
      // Active state coloring
      switch (color) {
        case 'amber': return `${baseClasses} bg-amber-500 text-white`;
        case 'purple': return `${baseClasses} bg-purple-500 text-white`;
        case 'red': return `${baseClasses} bg-red-500 text-white`;
        default: return `${baseClasses} bg-gray-700 text-white`;
      }
    } else {
      // Inactive state coloring
      switch (color) {
        case 'amber': return `${baseClasses} bg-gray-200 text-amber-600`;
        case 'purple': return `${baseClasses} bg-gray-200 text-purple-600`;
        case 'red': return `${baseClasses} bg-gray-200 text-red-600`;
        default: return `${baseClasses} bg-gray-200 text-gray-600`;
      }
    }
  };

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center
        ${getColorClasses()}
        rounded-full w-16 h-16 p-3
        transform active:scale-95 relative group`}
      title={description}
    >
      <Icon className="w-6 h-6 mb-1" />
      <span className="text-xs font-medium">{label}</span>
      
      {description && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2
          bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100
          transition-opacity pointer-events-none whitespace-nowrap">
          {description}
        </div>
      )}
    </button>
  );
}