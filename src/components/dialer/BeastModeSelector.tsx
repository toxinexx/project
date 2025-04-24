import React, { useState } from 'react';
import { Phone, MessageSquare, PhoneOutgoing, MessageCircle, Clock, CheckCircle, XCircle, PhoneOff } from 'lucide-react';
import { ThreeDButton } from '../ui/3DButton';

export function BeastModeSelector() {
  const [selectedCampaign, setSelectedCampaign] = useState('');
  
  const campaigns = [
    { id: '1', name: 'Sales Campaign' },
    { id: '2', name: 'Follow-up Campaign' },
    { id: '3', name: 'Lead Generation' }
  ];

  const stats = {
    calls: {
      total: 156,
      connected: 134,
      missed: 22
    },
    sms: {
      sent: 89,
      replied: 64,
      rate: '71%'
    }
  };

  const recentCalls = [
    { 
      name: 'John Smith',
      number: '+1 (555) 123-4567',
      duration: '4:32',
      outcome: 'Appointment',
      status: 'success'
    },
    { 
      name: 'Sarah Wilson',
      number: '+1 (555) 987-6543',
      duration: '0:45',
      outcome: 'No Answer',
      status: 'error'
    },
    { 
      name: 'Mike Johnson',
      number: '+1 (555) 234-5678',
      duration: '2:15',
      outcome: 'Hangup',
      status: 'warning'
    }
  ];

  return (
    <div className="space-y-4">
      {/* This component is now simplified as the structure moved to Dialer.tsx */}
      {/* Campaign Selection */}
      <div className="crm-tile p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Phone className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-800">Campaign Calls</h3>
        </div>
        <div className="divide-y">
          {recentCalls.map((call, index) => (
            <div key={index} className="py-3 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">{call.name}</p>
                <p className="text-sm text-gray-500">{call.number}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{call.duration}</span>
                </div>
                <span className={`text-sm ${
                  call.status === 'success' ? 'text-green-600' :
                  call.status === 'error' ? 'text-red-600' : 'text-amber-600'
                }`}>
                  {call.outcome}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}