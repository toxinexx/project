import React from 'react';
import { X } from 'lucide-react';
import { CampaignForm } from './form/CampaignForm';
import { Campaign } from '../../types/campaign';

interface NewCampaignModalProps {
  onClose: () => void;
  onSubmit: (campaign: Campaign) => void;
  initialType?: 'power-dialing' | 'bulk-sms';
}

export function NewCampaignModal({ onClose, onSubmit, initialType }: NewCampaignModalProps) {
  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40" 
        onClick={onClose}
      />
      <div className="fixed inset-x-4 top-4 bottom-4 max-w-4xl mx-auto bg-white rounded-lg shadow-xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Create New Campaign</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <CampaignForm 
            onSubmit={onSubmit} 
            onCancel={onClose}
            initialType={initialType}
          />
        </div>
      </div>
    </>
  );
}