import React, { useState } from 'react';
import { Send, Phone, Mail, MessageSquare, ChevronDown, ChevronUp, Calendar, Clock, Users, Bell, FileText, ThumbsUp } from 'lucide-react';
import { Lead } from '../../types/lead';
import { Activity } from '../../types/activity';
import { ThreeDButton } from '../ui/3DButton';

interface LeadActivityProps {
  leadId: string;
  lead: Lead;
}

export function LeadActivity({ leadId, lead }: LeadActivityProps) {
  const [message, setMessage] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState('all');
  
  // Mock activities
  const activities: Activity[] = [
    {
      id: '1',
      type: 'sms',
      name: 'Sales',
      message: 'Your Follow Up Boss trial is ending in two days.',
      timestamp: 'Feb 26, 1:36 pm',
      icon: MessageSquare
    },
    {
      id: '2',
      type: 'note',
      name: 'System',
      message: 'Created deal: $1,400,000 - My First Deal',
      timestamp: 'Feb 24, 11:20 am',
      icon: FileText
    },
    {
      id: '3',
      type: 'email',
      name: 'Sales',
      message: 'Your trial has expired. To continue using Follow Up Boss, upgrade now.',
      timestamp: 'Feb 20, 9:45 am',
      icon: Mail,
      expanded: true
    },
    {
      id: '4',
      type: 'call',
      name: 'Outbound Call',
      message: 'Duration: 5:23',
      timestamp: 'Feb 18, 3:12 pm',
      icon: Phone
    },
    {
      id: '5',
      type: 'appointment',
      name: 'Appointment Created',
      message: 'Follow Up Call scheduled for Feb 14th 2025',
      timestamp: 'Feb 15, 2:30 pm',
      icon: Calendar
    },
  ];
  
  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // In a real app, this would send the message to the API
    console.log('Sending message:', message);
    setMessage('');
  };
  
  return (
    <div className="space-y-4">
      {/* Activity Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-medium text-gray-800">Activity</h2>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="text-sm text-gray-500 flex items-center gap-1"
          >
            Filters {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
        
        {showFilters && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t">
            <button 
              onClick={() => setFilter('all')}
              className={`px-2 py-1 text-xs rounded-full ${
                filter === 'all' 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              All Activity
            </button>
            <button 
              onClick={() => setFilter('email')}
              className={`px-2 py-1 text-xs rounded-full ${
                filter === 'email' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              Emails
            </button>
            <button 
              onClick={() => setFilter('call')}
              className={`px-2 py-1 text-xs rounded-full ${
                filter === 'call' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              Calls
            </button>
            <button 
              onClick={() => setFilter('sms')}
              className={`px-2 py-1 text-xs rounded-full ${
                filter === 'sms' 
                ? 'bg-indigo-100 text-indigo-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              SMS
            </button>
            <button 
              onClick={() => setFilter('note')}
              className={`px-2 py-1 text-xs rounded-full ${
                filter === 'note' 
                ? 'bg-amber-100 text-amber-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              Notes
            </button>
            <button 
              onClick={() => setFilter('appointment')}
              className={`px-2 py-1 text-xs rounded-full ${
                filter === 'appointment' 
                ? 'bg-red-100 text-red-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              Appointments
            </button>
          </div>
        )}
      </div>
      
      {/* Send Message Input */}
      <div className="bg-white rounded-lg shadow p-4">
        <form onSubmit={handleSendMessage} className="space-y-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a note, send an email, or create a task..."
            className="w-full px-3 py-2 h-24 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          ></textarea>
          
          <div className="flex flex-wrap justify-between">
            <div className="flex gap-2">
              <ThreeDButton
                variant="info"
                size="sm"
                icon={Mail}
                isCircle
                title="Email"
              />
              <ThreeDButton
                variant="success"
                size="sm"
                icon={Phone}
                isCircle
                title="Call"
              />
              <ThreeDButton
                variant="primary"
                size="sm"
                icon={MessageSquare}
                isCircle
                title="SMS"
              />
              <ThreeDButton
                variant="warning"
                size="sm"
                icon={Bell}
                isCircle
                title="Reminder"
              />
              <ThreeDButton
                variant="info"
                size="sm"
                icon={Calendar}
                isCircle
                title="Schedule"
              />
            </div>
            
            <ThreeDButton
              type="submit"
              variant="primary"
              size="md"
              icon={Send}
              disabled={!message.trim()}
            >
              Send
            </ThreeDButton>
          </div>
        </form>
      </div>
      
      {/* Activity Timeline */}
      <div className="bg-white rounded-lg shadow divide-y">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            No activities found for this filter
          </div>
        )}
      </div>
    </div>
  );
}

interface ActivityItemProps {
  activity: Activity;
}

function ActivityItem({ activity }: ActivityItemProps) {
  const [expanded, setExpanded] = useState(!!activity.expanded);
  
  // Function to get the appropriate background color for the activity icon
  const getIconBgColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100';
      case 'call': return 'bg-green-100';
      case 'sms': return 'bg-indigo-100';
      case 'note': return 'bg-amber-100';
      case 'appointment': return 'bg-red-100';
      default: return 'bg-gray-100';
    }
  };
  
  // Function to get the appropriate text color for the activity icon
  const getIconTextColor = (type: string) => {
    switch (type) {
      case 'email': return 'text-blue-600';
      case 'call': return 'text-green-600';
      case 'sms': return 'text-indigo-600';
      case 'note': return 'text-amber-600';
      case 'appointment': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };
  
  return (
    <div className="p-4 hover:bg-gray-50">
      <div className="flex gap-3">
        <div className={`p-2 rounded-full ${getIconBgColor(activity.type)} flex-shrink-0`}>
          <activity.icon className={`w-4 h-4 ${getIconTextColor(activity.type)}`} />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between mb-1">
            <div className="font-medium text-gray-800">{activity.name}</div>
            <div className="text-sm text-gray-500">{activity.timestamp}</div>
          </div>
          
          <div className="text-gray-600 mb-2">{activity.message}</div>
          
          {activity.type === 'email' && (
            <div className="mt-2">
              <button 
                onClick={() => setExpanded(!expanded)}
                className="text-sm text-purple-600 hover:text-purple-800 mb-2"
              >
                {expanded ? 'Hide details' : 'Show details'}
              </button>
              
              {expanded && (
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                  <div className="mb-2">
                    <span className="font-medium">From:</span> follow-up-boss@example.com
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">To:</span> john@example.com
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">Subject:</span> Your trial has expired
                  </div>
                  <div className="pt-2 border-t">
                    <p>Hi Wholesale,</p>
                    <p className="mt-2">Your Follow Up Boss trial ends today. We hope you enjoyed it!</p>
                    <p className="mt-2">To continue using Follow Up Boss, upgrade now.</p>
                    <p className="mt-2">FYI, everything you've done in the platform will still be there when you upgrade, so you'll be able to pick up right where you left off.</p>
                    <p className="mt-2">-The Follow Up Boss Team</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="flex gap-2 mt-2">
            <ThreeDButton
              variant="secondary"
              size="sm"
              icon={ThumbsUp}
              isCircle
              className="!w-6 !h-6"
            />
            <ThreeDButton
              variant="primary"
              size="sm"
            >
              Reply
            </ThreeDButton>
          </div>
        </div>
      </div>
    </div>
  );
}