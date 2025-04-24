import React from 'react';
import { PhoneIncoming, PhoneOutgoing } from 'lucide-react';

interface CallListItemProps {
  call: {
    id: number;
    name: string;
    number: string;
    duration: string;
    type: 'incoming' | 'outgoing';
    timestamp: string;
  };
}

export function CallListItem({ call }: CallListItemProps) {
  return (
    <div className="p-4 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-full ${
            call.type === 'incoming' ? 'bg-green-100' : 'bg-blue-100'
          }`}>
            {call.type === 'incoming' ? (
              <PhoneIncoming className="w-4 h-4 text-green-600" />
            ) : (
              <PhoneOutgoing className="w-4 h-4 text-blue-600" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-800">{call.name}</h3>
            <p className="text-sm text-gray-500">{call.number}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-600">{call.duration}</p>
          <p className="text-sm text-gray-500">{call.timestamp}</p>
        </div>
      </div>
    </div>
  );
}