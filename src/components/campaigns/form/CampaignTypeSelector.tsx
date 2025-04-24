import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { CampaignType } from '../../../types/campaign';

interface CampaignTypeSelectorProps {
  value: CampaignType;
  onChange: (type: CampaignType) => void;
}

export function CampaignTypeSelector({ value, onChange }: CampaignTypeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Campaign Type
      </label>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onChange('power-dialing')}
          className={`p-4 rounded-lg border-2 transition-colors flex items-center gap-3
            ${value === 'power-dialing'
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
              : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
        >
          <Phone className="w-5 h-5" />
          <div className="text-left">
            <div className="font-medium">Power Dialing</div>
            <div className="text-sm opacity-75">Automated outbound calls</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onChange('bulk-sms')}
          className={`p-4 rounded-lg border-2 transition-colors flex items-center gap-3
            ${value === 'bulk-sms'
              ? 'border-purple-500 bg-purple-50 text-purple-700'
              : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
        >
          <MessageSquare className="w-5 h-5" />
          <div className="text-left">
            <div className="font-medium">Bulk SMS</div>
            <div className="text-sm opacity-75">Mass text messaging</div>
          </div>
        </button>
      </div>
    </div>
  );
}