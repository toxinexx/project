{/* Previous Tasks.tsx content with renamed component */}
import React, { useState } from 'react';
import { CheckSquare, Clock, User, MessageSquare, Phone, Mail, Calendar, Plus, Filter, Search } from 'lucide-react';
import { ThreeDButton } from '../ui/3DButton';

type FollowUpStatus = 'pending' | 'completed';
type FollowUpPriority = 'high' | 'medium' | 'low';

interface FollowUp {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  status: FollowUpStatus;
  priority: FollowUpPriority;
  assignedTo: string;
  type: 'sms' | 'call' | 'social' | 'email';
  contact: {
    name: string;
    info: string;
  };
}

export function FollowUps() {
  const [filter, setFilter] = useState<FollowUpStatus>('pending');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample follow-ups data
  const followUps: FollowUp[] = [
    {
      id: '1',
      title: 'Follow up on Facebook inquiry',
      description: 'Respond to message about property listing',
      dueDate: '2025-04-15T14:00:00',
      status: 'pending',
      priority: 'high',
      assignedTo: 'Alice Johnson',
      type: 'social',
      contact: {
        name: 'John Smith',
        info: '@johnsmith'
      }
    },
    {
      id: '2',
      title: 'Schedule callback',
      description: 'Discuss premium service package options',
      dueDate: '2025-04-14T11:30:00',
      status: 'pending',
      priority: 'medium',
      assignedTo: 'Bob Wilson',
      type: 'call',
      contact: {
        name: 'Sarah Davis',
        info: '+1 (555) 123-4567'
      }
    },
    {
      id: '3',
      title: 'Send SMS confirmation',
      description: 'Confirm appointment for property viewing',
      dueDate: '2025-04-14T10:00:00',
      status: 'pending',
      priority: 'high',
      assignedTo: 'Alice Johnson',
      type: 'sms',
      contact: {
        name: 'Michael Brown',
        info: '+1 (555) 987-6543'
      }
    },
    {
      id: '4',
      title: 'Send follow-up email',
      description: 'Share additional information about investment opportunities',
      dueDate: '2025-04-13T16:00:00',
      status: 'pending',
      priority: 'medium',
      assignedTo: 'Charlie Davis',
      type: 'email',
      contact: {
        name: 'Emily Wilson',
        info: 'emily@example.com'
      }
    }
  ];

  const getTypeIcon = (type: FollowUp['type']) => {
    switch (type) {
      case 'sms':
        return <MessageSquare className="w-4 h-4" />;
      case 'call':
        return <Phone className="w-4 h-4" />;
      case 'social':
        return <MessageSquare className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: FollowUp['type']) => {
    switch (type) {
      case 'sms':
        return 'bg-purple-100 text-purple-600';
      case 'call':
        return 'bg-blue-100 text-blue-600';
      case 'social':
        return 'bg-pink-100 text-pink-600';
      case 'email':
        return 'bg-indigo-100 text-indigo-600';
    }
  };

  const getPriorityColor = (priority: FollowUpPriority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-amber-100 text-amber-700';
      case 'low':
        return 'bg-green-100 text-green-700';
    }
  };

  const filteredFollowUps = followUps
    .filter(followUp => followUp.status === filter)
    .filter(followUp => 
      searchTerm === '' ||
      followUp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-4 sm:space-y-6 py-4 sm:py-6">
      {/* Header */}
      <div className="crm-tile p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-50">
              <CheckSquare className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Follow Ups</h2>
              <p className="text-sm text-gray-600">Manage your follow-ups and reminders</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <ThreeDButton
              variant="secondary"
              size="md"
              icon={Filter}
              onClick={() => setFilter(filter === 'pending' ? 'completed' : 'pending')}
            >
              {filter === 'pending' ? 'Show Completed' : 'Show Pending'}
            </ThreeDButton>

            <ThreeDButton
              variant="primary"
              size="md"
              icon={Plus}
              onClick={() => {}}
            >
              New Follow Up
            </ThreeDButton>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search follow-ups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Follow Ups List */}
      <div className="space-y-3">
        {filteredFollowUps.map((followUp) => (
          <div 
            key={followUp.id}
            className="crm-tile p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                checked={followUp.status === 'completed'}
                onChange={() => {}}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">{followUp.title}</h3>
                    {followUp.description && (
                      <p className="text-sm text-gray-600 mt-1">{followUp.description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(followUp.priority)}`}>
                      {followUp.priority.charAt(0).toUpperCase() + followUp.priority.slice(1)}
                    </span>
                    <span className={`p-1.5 rounded-lg ${getTypeColor(followUp.type)}`}>
                      {getTypeIcon(followUp.type)}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(followUp.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(followUp.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{followUp.assignedTo}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-gray-700">{followUp.contact.name}</span>
                    <span className="text-gray-400">•</span>
                    <span>{followUp.contact.info}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredFollowUps.length === 0 && (
          <div className="crm-tile p-8 text-center">
            <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-800">No follow-ups found</h3>
            <p className="text-gray-500 mt-1">
              {filter === 'completed' 
                ? 'No completed follow-ups to show'
                : searchTerm 
                  ? 'No follow-ups match your search'
                  : 'Create a new follow-up to get started'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}