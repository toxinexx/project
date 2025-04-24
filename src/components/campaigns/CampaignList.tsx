import React from 'react';
import { Campaign } from '../../types/campaign';
import { Phone, MessageSquare, Calendar, Clock, Users, Play, Pause } from 'lucide-react';

interface CampaignListProps {
  campaigns: Campaign[];
}

export function CampaignList({ campaigns }: CampaignListProps) {
  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'paused':
        return 'bg-amber-100 text-amber-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow divide-y">
      {campaigns.map((campaign) => (
        <div key={campaign.id} className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {campaign.type === 'power-dialing' ? (
                <Phone className="w-5 h-5 text-indigo-600" />
              ) : (
                <MessageSquare className="w-5 h-5 text-purple-600" />
              )}
              <div>
                <h3 className="text-lg font-medium text-gray-800">{campaign.name}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {campaign.startDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {campaign.startTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {campaign.contacts.length} contacts
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </span>
              
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                {campaign.status === 'active' ? (
                  <Pause className="w-5 h-5 text-gray-600" />
                ) : (
                  <Play className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}