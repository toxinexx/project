export type SocialPlatform = 'facebook' | 'instagram' | 'phone' | 'whatsapp' | 'telegram';

export interface SocialProfile {
  platform: SocialPlatform;
  username: string;
  profileUrl: string;
}

export interface Conversation {
  id: string;
  platform: SocialPlatform;
  contact: {
    id: string;
    name: string;
    phone?: string;
    leadStatus: 'cold' | 'warm' | 'hot';
    temperature: 'cold' | 'warm' | 'hot';
    assignedTo?: string;
    avatar: string;
    socialProfile?: SocialProfile;
  };
  messages: Message[];
}

export interface Message {
  id: string;
  type: 'incoming' | 'outgoing';
  content: string;
  timestamp: string;
  read: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent';
  status: 'online' | 'offline' | 'away';
}