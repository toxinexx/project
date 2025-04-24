import React, { useState } from 'react';
import { ActivityHeader } from './ActivityHeader';
import { ActivityList } from './ActivityList';
import { useActivity } from '../hooks/useActivity';
import { Filter } from 'lucide-react';
import { ThreeDButton } from '../../ui/3DButton';

export function ActivityFeed() {
  const { activities } = useActivity();
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredActivities = activeFilter === 'all' 
    ? activities 
    : activities.filter(a => a.type === activeFilter);

  return (
    <div className="bg-white rounded-lg shadow border-2 border-primary-100">
      <div className="p-4 sm:p-6 border-b flex items-center justify-between">
        <ActivityHeader />
        <ThreeDButton
          variant="secondary"
          size="sm"
          icon={Filter}
          onClick={() => setShowFilters(!showFilters)}
        >
          <span className="hidden xs:inline">Filter</span>
        </ThreeDButton>
      </div>

      {showFilters && (
        <div className="px-4 sm:px-6 py-3 border-b bg-gray-50 overflow-x-auto whitespace-nowrap">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 text-sm rounded-full ${
                activeFilter === 'all' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('incoming-call')}
              className={`px-3 py-1 text-sm rounded-full ${
                activeFilter === 'incoming-call' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Incoming
            </button>
            <button
              onClick={() => setActiveFilter('outgoing-call')}
              className={`px-3 py-1 text-sm rounded-full ${
                activeFilter === 'outgoing-call' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Outgoing
            </button>
            <button
              onClick={() => setActiveFilter('sms')}
              className={`px-3 py-1 text-sm rounded-full ${
                activeFilter === 'sms' 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              SMS
            </button>
          </div>
        </div>
      )}

      <ActivityList activities={filteredActivities} />
    </div>
  );
}