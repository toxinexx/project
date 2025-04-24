import React from 'react';
import { Megaphone, Phone, Check } from 'lucide-react';
import { Campaign } from '../../types/campaign';

interface CampaignSelectorProps {
  campaigns: Campaign[];
  selectedCampaign: Campaign | null;
  onSelect: (campaign: Campaign) => void;
}

export function CampaignSelector({ campaigns, selectedCampaign, onSelect }: CampaignSelectorProps) {
  if (campaigns.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <p className="text-gray-500">No campaigns available. Create a new campaign to get started.</p>
      </div>
    );
  }

  const getCampaignIcon = (campaign: Campaign) => {
    switch (campaign.type) {
      case 'bulk-sms':
        return <Megaphone className="w-4 h-4 text-purple-600" />;
      case 'power-dialing':
        return <Phone className="w-4 h-4 text-blue-600" />;
      default:
        return <Megaphone className="w-4 h-4 text-purple-600" />;
    }
  };

  const getCampaignBgColor = (campaign: Campaign) => {
    switch (campaign.type) {
      case 'bulk-sms':
        return 'bg-purple-100';
      case 'power-dialing':
        return 'bg-blue-100';
      default:
        return 'bg-purple-100';
    }
  };

  return (
    <div className="space-y-2 mt-4">
      <h3 className="text-sm font-medium text-gray-700">Select Campaign</h3>
      <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto p-1">
        {campaigns.map((campaign) => (
          <button
            key={campaign.id}
            onClick={() => onSelect(campaign)}
            className={`p-4 flex items-center justify-between text-left border rounded-lg transition-colors
              ${selectedCampaign?.id === campaign.id 
                ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${getCampaignBgColor(campaign)}`}>
                {getCampaignIcon(campaign)}
              </div>
              <div>
                <div className="font-medium text-gray-900">{campaign.name}</div>
                <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                    {campaign.type === 'bulk-sms' ? 'SMS Campaign' : 'Call Campaign'}
                  </span>
                  <span>{campaign.contacts.length} contacts</span>
                </div>
              </div>
            </div>
            
            {selectedCampaign?.id === campaign.id && (
              <Check className="w-5 h-5 text-purple-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}