import React from 'react';
import { Search, Filter, Plus, X, Users } from 'lucide-react';
import { ThreeDButton } from '../ui/3DButton';

interface ContactListHeaderProps {
  onAddContact: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  showSelectionMode?: boolean;
  selectedCount?: number;
  onClearSelection?: () => void;
  onCreateGroup?: () => void;
  onShowFilters?: () => void;
  activeFilterCount?: number;
}

export function ContactListHeader({ 
  onAddContact, 
  searchTerm, 
  onSearchChange,
  showSelectionMode = false,
  selectedCount = 0,
  onClearSelection,
  onCreateGroup,
  onShowFilters,
  activeFilterCount = 0
}: ContactListHeaderProps) {
  return (
    <div className="py-4 px-4 sm:px-6 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white border-b">
      {showSelectionMode ? (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <ThreeDButton
              variant="primary"
              size="sm"
              icon={Users}
              onClick={onCreateGroup}
            >
              Groups ({selectedCount})
            </ThreeDButton>
            <button
              onClick={onClearSelection}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
            <ThreeDButton
              variant="secondary"
              size="md"
              icon={Filter}
              onClick={onShowFilters}
              className="flex-1 sm:flex-none"
            >
              Filter
              {activeFilterCount > 0 && (
                <span className="ml-1 bg-purple-100 text-purple-800 px-2 rounded-full text-xs">
                  {activeFilterCount}
                </span>
              )}
            </ThreeDButton>
            
            <ThreeDButton
              variant="primary"
              size="md"
              icon={Plus}
              onClick={onAddContact}
              className="flex-1 sm:flex-none"
            >
              Add Contact
            </ThreeDButton>
          </div>
        </>
      )}
    </div>
  );
}