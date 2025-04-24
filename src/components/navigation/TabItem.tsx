import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface TabItemProps {
  id: string;
  name: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

export function TabItem({ id, name, icon: Icon, isActive, onClick }: TabItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center justify-center gap-2 py-4 px-4 text-sm font-medium transition-colors
        ${isActive 
          ? 'text-purple-600 border-b-2 border-purple-600' 
          : 'text-gray-500 hover:text-gray-700'}`}
      data-tab={id}
    >
      <Icon className="w-6 h-6" />
      <span className="truncate">{name}</span>
    </button>
  );
}