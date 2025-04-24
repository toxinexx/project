import { DivideIcon as LucideIcon } from 'lucide-react';

export interface Activity {
  id: string;
  type: 'email' | 'call' | 'sms' | 'note' | 'appointment' | 'task';
  name: string;
  message: string;
  timestamp: string;
  icon: LucideIcon;
  expanded?: boolean;
}