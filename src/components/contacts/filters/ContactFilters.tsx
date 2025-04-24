import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Check, X } from 'lucide-react';
import { ThreeDButton } from '../../ui/3DButton';

export interface ContactFilters {
  dateCreated?: {
    from?: string;
    to?: string;
  };
  lastActivity?: 'today' | 'thisWeek' | 'thisMonth' | 'thisYear' | 'older';
  location?: string[];
}

interface ContactFiltersProps {
  filters: ContactFilters;
  onApplyFilters: (filters: ContactFilters) => void;
  onClose: () => void;
  availableLocations?: string[];
}

export function ContactFilters({ 
  filters, 
  onApplyFilters, 
  onClose,
  availableLocations = []
}: ContactFiltersProps) {
  const [localFilters, setLocalFilters] = useState<ContactFilters>(filters);
  
  const handleDateChange = (field: 'from' | 'to', value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      dateCreated: {
        ...prev.dateCreated,
        [field]: value
      }
    }));
  };
  
  const handleLastActivityChange = (value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      lastActivity: value as ContactFilters['lastActivity']
    }));
  };
  
  const handleLocationChange = (location: string) => {
    setLocalFilters(prev => {
      const locations = prev.location || [];
      if (locations.includes(location)) {
        return {
          ...prev,
          location: locations.filter(loc => loc !== location)
        };
      } else {
        return {
          ...prev,
          location: [...locations, location]
        };
      }
    });
  };
  
  const handleApply = () => {
    onApplyFilters(localFilters);
  };
  
  const handleClear = () => {
    setLocalFilters({});
    onApplyFilters({});
  };
  
  // If we don't have any locations from the dataset, use these as defaults
  const locations = availableLocations.length > 0 
    ? availableLocations 
    : ['New York, NY', 'Austin, TX', 'Chicago, IL', 'Seattle, WA', 'Miami, FL', 'Denver, CO', 'Boston, MA'];
  
  const activeFilterCount = [
    localFilters.dateCreated?.from || localFilters.dateCreated?.to ? 1 : 0,
    localFilters.lastActivity ? 1 : 0,
    localFilters.location && localFilters.location.length > 0 ? 1 : 0
  ].reduce((a, b) => a + b, 0);
  
  return (
    <div className="bg-white rounded-lg shadow-lg border-2 border-primary-100 overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between bg-purple-50">
        <h3 className="font-medium text-gray-800">Filter Contacts</h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-4 max-h-[70vh] overflow-y-auto">
        <div className="space-y-6">
          {/* Date Created Filter */}
          <div className="space-y-2">
            <div className="font-medium flex items-center gap-2 text-gray-700">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span>Date Created</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm text-gray-600 mb-1">From</label>
                <input
                  type="date"
                  value={localFilters.dateCreated?.from || ''}
                  onChange={(e) => handleDateChange('from', e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">To</label>
                <input
                  type="date"
                  value={localFilters.dateCreated?.to || ''}
                  onChange={(e) => handleDateChange('to', e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
          </div>
          
          {/* Last Activity Filter */}
          <div className="space-y-2">
            <div className="font-medium flex items-center gap-2 text-gray-700">
              <Clock className="w-5 h-5 text-purple-600" />
              <span>Last Activity</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 mt-2">
              <button
                onClick={() => handleLastActivityChange('today')}
                className={`p-3 border rounded-md text-sm text-left transition-colors ${
                  localFilters.lastActivity === 'today' 
                    ? 'bg-purple-50 border-purple-500 text-purple-700' 
                    : 'hover:bg-gray-50'
                }`}
              >
                Today
              </button>
              
              <button
                onClick={() => handleLastActivityChange('thisWeek')}
                className={`p-3 border rounded-md text-sm text-left transition-colors ${
                  localFilters.lastActivity === 'thisWeek' 
                    ? 'bg-purple-50 border-purple-500 text-purple-700' 
                    : 'hover:bg-gray-50'
                }`}
              >
                This Week
              </button>
              
              <button
                onClick={() => handleLastActivityChange('thisMonth')}
                className={`p-3 border rounded-md text-sm text-left transition-colors ${
                  localFilters.lastActivity === 'thisMonth' 
                    ? 'bg-purple-50 border-purple-500 text-purple-700' 
                    : 'hover:bg-gray-50'
                }`}
              >
                This Month
              </button>
              
              <button
                onClick={() => handleLastActivityChange('thisYear')}
                className={`p-3 border rounded-md text-sm text-left transition-colors ${
                  localFilters.lastActivity === 'thisYear' 
                    ? 'bg-purple-50 border-purple-500 text-purple-700' 
                    : 'hover:bg-gray-50'
                }`}
              >
                This Year
              </button>
              
              <button
                onClick={() => handleLastActivityChange('older')}
                className={`p-3 border rounded-md text-sm text-left transition-colors ${
                  localFilters.lastActivity === 'older' 
                    ? 'bg-purple-50 border-purple-500 text-purple-700' 
                    : 'hover:bg-gray-50'
                }`}
              >
                Older
              </button>
            </div>
          </div>
          
          {/* Location Filter */}
          <div className="space-y-2">
            <div className="font-medium flex items-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-purple-600" />
              <span>Location</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {locations.map((location) => (
                <label 
                  key={location}
                  className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50 ${
                    localFilters.location?.includes(location) ? 'bg-purple-50 border-purple-500' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={localFilters.location?.includes(location) || false}
                    onChange={() => handleLocationChange(location)}
                    className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                  />
                  <span className="text-gray-700">{location}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
        <button
          onClick={handleClear}
          className="text-gray-600 hover:text-gray-800 px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          Clear All
        </button>
        
        <ThreeDButton
          variant="primary"
          size="md"
          icon={Check}
          onClick={handleApply}
        >
          Apply Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </ThreeDButton>
      </div>
    </div>
  );
}