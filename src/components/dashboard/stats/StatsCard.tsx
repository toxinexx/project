import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  color: string;
  textColor?: string;
  hasNotification?: boolean;
  className?: string;
}

export function StatCard({ 
  icon: Icon, 
  title, 
  value, 
  color,
  textColor,
  hasNotification,
  className = ''
}: StatCardProps) {
  // Convert color classes to base color (e.g., 'bg-blue-100' -> 'blue')
  const resolvedTextColor = textColor || color.replace('bg-', 'text-').replace('-100', '-600');
  
  return (
    <div 
      className={`group bg-white rounded-xl border border-gray-100 shadow-sm 
        hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full ${className}`}
    >
      <div className="p-4 sm:p-6 h-full flex flex-col">
        <div className="flex flex-row items-center justify-between mb-3">
          <div className={`relative ${color} rounded-xl p-3 
            before:absolute before:inset-0 before:rounded-xl
            before:bg-gradient-to-b before:from-white/20 before:to-transparent
            after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-t 
            after:from-black/5 after:to-transparent
            group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
            <div className="relative z-10">
              <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${resolvedTextColor}
                drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]
                group-hover:scale-110 transition-transform duration-300`} />
            </div>
            {hasNotification && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse z-20">
                <span className="absolute inset-0 rounded-full bg-red-400 animate-ping"></span>
              </span>
            )}
          </div>
          <div className={`text-xl sm:text-2xl font-bold ${resolvedTextColor}
            drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]
            group-hover:scale-110 transition-transform duration-300`}>
            {value}
          </div>
        </div>
        <h3 className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
          {title}
        </h3>
      </div>
    </div>
  );
}