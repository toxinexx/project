import React, { useState } from 'react';
import { Plus, Calendar, Users, Phone, MessageSquare } from 'lucide-react';
import { Campaign } from '../../types/campaign';
import { NewCampaignModal } from './NewCampaignModal';
import { CampaignList } from './CampaignList';
import { useCampaigns } from './hooks/useCampaigns';
import { StatCard } from '../ui/StatCard';
import { ThreeDButton } from '../ui/3DButton';

export function Campaigns() {
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const { campaigns, addCampaign } = useCampaigns();

  const handleCreateCampaign = (campaign: Campaign) => {
    addCampaign(campaign);
    setShowNewCampaignModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="crm-tile p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Campaigns</h2>
            <p className="mt-1 text-gray-600">Manage your calling campaigns</p>
          </div>
          <ThreeDButton
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => setShowNewCampaignModal(true)}
          >
            New Campaign
          </ThreeDButton>
        </div>

        {/* Campaign Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <StatCard
            icon={Calendar}
            label="Active Campaigns"
            value={campaigns.filter(c => c.status === 'active').length}
            color="purple"
          />
          <StatCard
            icon={Users}
            label="Total Contacts"
            value={campaigns.reduce((acc, c) => acc + (c.contacts?.length || 0), 0)}
            color="indigo"
          />
          <StatCard
            icon={Phone}
            label="Calls Made"
            value="0"
            color="violet"
          />
          <StatCard
            icon={MessageSquare}
            label="SMS Sent"
            value="0"
            color="purple"
          />
        </div>
      </div>

      {/* Campaign List */}
      {campaigns.length > 0 ? (
        <div className="crm-tile">
          <CampaignList campaigns={campaigns} />
        </div>
      ) : (
        <div className="crm-tile">
          <div className="p-6 text-center text-gray-500">
            No campaigns created yet. Create your first campaign to get started.
          </div>
        </div>
      )}

      {/* New Campaign Modal */}
      {showNewCampaignModal && (
        <NewCampaignModal
          onClose={() => setShowNewCampaignModal(false)}
          onSubmit={handleCreateCampaign}
        />
      )}
    </div>
  );
}