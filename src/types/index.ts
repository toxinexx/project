export interface Call {
  id: string;
  name: string;
  number: string;
  duration: number;
  timestamp: Date;
  type: 'incoming' | 'outgoing';
  status: 'active' | 'completed' | 'missed';
  voicemail?: {
    url: string;
    duration: number;
  };
}

export interface SMS {
  id: string;
  name: string;
  number: string;
  message: string;
  timestamp: Date;
  type: 'incoming' | 'outgoing';
}

export interface TwilioConfig {
  accountSid: string;
  authToken: string;
  phoneNumber: string;
}

export interface CRMContact {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  notes: string;
}

export type DialerMode = 'simple' | 'highlight' | 'crm';