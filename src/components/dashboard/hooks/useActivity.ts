import { useMemo } from 'react';
import { Activity } from '../../../types/activity';
import { Phone, PhoneOutgoing, MessageSquare } from 'lucide-react';

export function useActivity() {
  return useMemo(() => ({
    activities: [
      {
        id: 1,
        type: 'outgoing-call',
        name: 'John Doe',
        number: '+1 (555) 123-4567',
        duration: '5:23',
        timestamp: '2 hours ago',
        message: 'Outgoing call to John Doe',
        icon: PhoneOutgoing
      },
      {
        id: 2,
        type: 'sms',
        name: 'Alice Smith',
        number: '+1 (555) 987-6543',
        message: 'Thanks for your call. I\'ll review the proposal and get back to you.',
        timestamp: '3 hours ago',
        icon: MessageSquare
      },
      {
        id: 3,
        type: 'incoming-call',
        name: 'Mike Johnson',
        number: '+1 (555) 456-7890',
        duration: '1:30',
        timestamp: 'Yesterday',
        message: 'Incoming call from Mike Johnson',
        icon: Phone
      },
      {
        id: 4,
        type: 'outgoing-call',
        name: 'Sarah Wilson',
        number: '+1 (555) 234-5678',
        duration: '3:45',
        timestamp: '2 days ago',
        message: 'Outgoing call to Sarah Wilson',
        icon: PhoneOutgoing
      },
      {
        id: 5,
        type: 'sms',
        name: 'Robert Taylor',
        number: '+1 (555) 789-0123',
        message: 'I would like to schedule a property viewing for the house on Oak Street.',
        timestamp: '3 days ago',
        icon: MessageSquare
      }
    ] as Activity[]
  }), []);
}