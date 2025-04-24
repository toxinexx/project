import React from 'react';
import { Check } from 'lucide-react';

interface CRMSelectorProps {
  selected: string | null;
  onSelect: (crm: string) => void;
}

export function CRMSelector({ selected, onSelect }: CRMSelectorProps) {
  const crms = [
    {
      id: 'podio',
      name: 'Podio',
      description: 'Citrix\'s flexible and customizable CRM platform'
    },
    {
      id: 'gohighlevel',
      name: 'GoHighLevel',
      description: 'All-in-one marketing and sales platform'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {crms.map((crm) => (
        <button
          key={crm.id}
          onClick={() => onSelect(crm.id)}
          className={`relative p-6 text-left border rounded-lg transition-all hover:shadow-md
            ${selected === crm.id
              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-offset-2'
              : 'hover:border-gray-300'}`}
        >
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-semibold text-gray-900">{crm.name}</h4>
            <p className="text-sm text-gray-500 line-clamp-2">{crm.description}</p>
          </div>

          {selected === crm.id && (
            <div className="absolute top-4 right-4">
              <div className="p-1 bg-blue-500 rounded-full">
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}