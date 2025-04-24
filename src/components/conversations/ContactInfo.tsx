import React from 'react';
import { User, ThermometerSun } from 'lucide-react';
import { Conversation } from '../../types/conversation';

interface ContactInfoProps {
  contact: Conversation['contact'];
}

export function ContactInfo({ contact }: ContactInfoProps) {
  const getTemperatureColor = (temp: string) => {
    switch (temp) {
      case 'hot': return 'text-red-500';
      case 'warm': return 'text-amber-500';
      case 'cold': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        <User className="w-5 h-5 text-gray-600" />
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{contact.name}</h3>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">{contact.phone}</span>
          <span className="text-gray-300">•</span>
          <span className={`flex items-center gap-1 ${getTemperatureColor(contact.temperature)}`}>
            <ThermometerSun className="w-4 h-4" />
            {contact.temperature}
          </span>
        </div>
      </div>
    </div>
  );
}