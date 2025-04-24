import { useState, useCallback, useEffect } from 'react';
import { Campaign } from '../../../types/campaign';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  // Initialize with sample campaigns
  useEffect(() => {
    const sampleCampaigns: Campaign[] = [
      {
        id: '1',
        name: 'Summer Promotion Calls',
        type: 'power-dialing',
        startDate: '2025-06-01',
        startTime: '09:00',
        status: 'active',
        contacts: [
          { id: '1', name: 'John Smith', phone: '+1 (555) 123-4567', email: 'john@example.com' },
          { id: '2', name: 'Sarah Johnson', phone: '+1 (555) 234-5678', email: 'sarah@example.com' },
          { id: '3', name: 'Michael Brown', phone: '+1 (555) 345-6789', email: 'michael@example.com' },
          { id: '4', name: 'Emily Davis', phone: '+1 (555) 456-7890', email: 'emily@example.com' },
          { id: '5', name: 'Robert Wilson', phone: '+1 (555) 567-8901', email: 'robert@example.com' }
        ],
        fieldMapping: {
          name: 'name',
          phone: 'phone',
          email: 'email'
        },
        settings: {
          useVoicemailDrop: true,
          maxAttempts: 3
        },
        assignedTeam: ['1', '2'],
        voicemailDropId: '1'
      },
      {
        id: '2',
        name: 'Holiday SMS Campaign',
        type: 'bulk-sms',
        startDate: '2025-12-10',
        startTime: '10:00',
        status: 'scheduled',
        contacts: [
          { id: '6', name: 'Jennifer Lopez', phone: '+1 (555) 678-9012', email: 'jennifer@example.com' },
          { id: '7', name: 'David Miller', phone: '+1 (555) 789-0123', email: 'david@example.com' },
          { id: '8', name: 'Lisa Taylor', phone: '+1 (555) 890-1234', email: 'lisa@example.com' },
          { id: '9', name: 'James Anderson', phone: '+1 (555) 901-2345', email: 'james@example.com' },
          { id: '10', name: 'Patricia White', phone: '+1 (555) 012-3456', email: 'patricia@example.com' }
        ],
        fieldMapping: {
          name: 'name',
          phone: 'phone',
          email: 'email'
        },
        settings: {
          messageTemplate: 'Hi {name}, enjoy 20% off your next purchase this holiday season! Use code HOLIDAY20 at checkout. Reply STOP to opt out.'
        },
        assignedTeam: ['1']
      },
      {
        id: '3',
        name: 'New Product Announcement',
        type: 'power-dialing',
        startDate: '2025-09-15',
        startTime: '13:30',
        status: 'paused',
        contacts: [
          { id: '11', name: 'Thomas Clark', phone: '+1 (555) 123-7890', email: 'thomas@example.com' },
          { id: '12', name: 'Nancy Wright', phone: '+1 (555) 234-8901', email: 'nancy@example.com' },
          { id: '13', name: 'George Moore', phone: '+1 (555) 345-9012', email: 'george@example.com' },
          { id: '14', name: 'Karen Hill', phone: '+1 (555) 456-0123', email: 'karen@example.com' }
        ],
        fieldMapping: {
          name: 'name',
          phone: 'phone',
          email: 'email'
        },
        settings: {
          useVoicemailDrop: false,
          maxAttempts: 2
        },
        assignedTeam: ['2']
      },
      {
        id: '4',
        name: 'Customer Feedback SMS',
        type: 'bulk-sms',
        startDate: '2025-07-20',
        startTime: '11:00',
        status: 'completed',
        contacts: [
          { id: '15', name: 'Daniel Lewis', phone: '+1 (555) 567-2345', email: 'daniel@example.com' },
          { id: '16', name: 'Susan Allen', phone: '+1 (555) 678-3456', email: 'susan@example.com' },
          { id: '17', name: 'Edward Scott', phone: '+1 (555) 789-4567', email: 'edward@example.com' }
        ],
        fieldMapping: {
          name: 'name',
          phone: 'phone',
          email: 'email'
        },
        settings: {
          messageTemplate: '{name}, we value your opinion! Please rate your recent experience with us from 1-5 by replying to this message. Thank you!'
        },
        assignedTeam: ['1', '2']
      }
    ];

    // Only set sample campaigns if no campaigns exist yet
    if (campaigns.length === 0) {
      setCampaigns(sampleCampaigns);
    }
  }, [campaigns.length]);

  const addCampaign = useCallback((campaign: Campaign) => {
    setCampaigns(prev => [...prev, campaign]);
  }, []);

  const updateCampaign = useCallback((id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === id ? { ...campaign, ...updates } : campaign
    ));
  }, []);

  const deleteCampaign = useCallback((id: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
  }, []);

  return {
    campaigns,
    addCampaign,
    updateCampaign,
    deleteCampaign
  };
}