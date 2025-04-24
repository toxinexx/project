export type CampaignType = 'power-dialing' | 'bulk-sms';

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  startDate: string;
  startTime: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'paused';
  contacts: Contact[];
  fieldMapping: FieldMapping;
  voicemailDropId?: string;
  assignedTeam?: string[];
  settings?: {
    maxAttempts?: number;
    retryInterval?: number;
    useVoicemailDrop?: boolean;
  };
}

export interface Contact {
  [key: string]: string;
  id: string;
}

export interface FieldMapping {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  [key: string]: string | undefined;
}