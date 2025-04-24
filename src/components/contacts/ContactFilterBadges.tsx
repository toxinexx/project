import React from 'react';
import { X, Calendar, Clock, MapPin } from 'lucide-react';
import { ContactFilters } from './filters/ContactFilters';

interface ContactFilterBadgesProps {
  filters: ContactFilters;
  onRemoveFilter: (type: keyof ContactFilters, value?: string) => void;
}

export function ContactFilterBadges({ filters, onRemoveFilter }: ContactFilterBadgesProps) {
  if (!filters.dateCreated && !filters.lastActivity && (!filters.location || filters.location.length === 0)) {
    return null;
  }
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };
  
  const activityLabels = {
    today: 'Today',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    thisYear: 'This Year',
    older: 'Older'
  };
  
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {/* Date Created Badges */}
      {filters.dateCreated && (filters.dateCreated.from || filters.dateCreated.to) && (
        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
          <Calendar className="w-3 h-3" />
          <span>
            {filters.dateCreated.from && filters.dateCreated.to 
              ? `${formatDate(filters.dateCreated.from)} - ${formatDate(filters.dateCreated.to)}`
              : filters.dateCreated.from 
                ? `From ${formatDate(filters.dateCreated.from)}`
                : `Until ${formatDate(filters.dateCreated.to || '')}`
            }
          </span>
          <button 
            onClick={() => onRemoveFilter('dateCreated')}
            className="ml-1 hover:bg-purple-200 p-0.5 rounded-full"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      
      {/* Last Activity Badge */}
      {filters.lastActivity && (
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
          <Clock className="w-3 h-3" />
          <span>Activity: {activityLabels[filters.lastActivity]}</span>
          <button 
            onClick={() => onRemoveFilter('lastActivity')}
            className="ml-1 hover:bg-green-200 p-0.5 rounded-full"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      
      {/* Location Badges */}
      {filters.location && filters.location.map((location) => (
        <div 
          key={location}
          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
        >
          <MapPin className="w-3 h-3" />
          <span>{location}</span>
          <button 
            onClick={() => onRemoveFilter('location', location)}
            className="ml-1 hover:bg-blue-200 p-0.5 rounded-full"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
}