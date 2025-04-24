import React, { useState } from 'react';
import { SingleSMS } from './SingleSMS';
import { BulkSMS } from './BulkSMS';
import { useCampaigns } from '../campaigns/hooks/useCampaigns';
import { MessageSquare, Megaphone } from 'lucide-react';

export function SMSPage() {
  const { campaigns, addCampaign } = useCampaigns();
  const [activeTab, setActiveTab] = useState<'conversations' | 'bulk'>('conversations');
  
  return (
    <div className="space-y-4 sm:space-y-6 py-4 sm:py-6">
      {/* SMS Tabs */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('conversations')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'conversations' 
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="truncate">Conversations</span>
          </button>
          <button
            onClick={() => setActiveTab('bulk')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'bulk' 
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span className="truncate">Bulk SMS</span>
          </button>
        </div>
      </div>
      
      {/* Conditional Content Based on Active Tab */}
      {activeTab === 'conversations' ? (
        <SingleSMS />
      ) : (
        <BulkSMS 
          campaigns={campaigns}
          onAddCampaign={addCampaign}
        />
      )}
    </div>
  );
}