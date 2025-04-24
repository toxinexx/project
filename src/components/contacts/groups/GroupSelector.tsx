import React from 'react';
import { Users, Plus, Edit2, Trash2, ChevronDown } from 'lucide-react';
import { ContactGroup } from '../../../types/contact';
import { ThreeDButton } from '../../ui/3DButton';

interface GroupSelectorProps {
  groups: ContactGroup[];
  selectedGroupId?: string;
  onSelectGroup: (groupId: string | undefined) => void;
  onCreateGroup: () => void;
  onEditGroup: (group: ContactGroup) => void;
  onDeleteGroup: (groupId: string) => void;
}

export function GroupSelector({
  groups,
  selectedGroupId,
  onSelectGroup,
  onCreateGroup,
  onEditGroup,
  onDeleteGroup
}: GroupSelectorProps) {
  const getGroupColor = (color: string) => {
    switch (color) {
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'amber': return 'bg-amber-100 text-amber-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const selectedGroup = groups.find(g => g.id === selectedGroupId);

  return (
    <div className="relative group">
      <button
        className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-left">
            <div className="font-medium text-gray-800">
              {selectedGroup ? selectedGroup.name : 'All Contacts'}
            </div>
            <div className="text-sm text-gray-500">
              {selectedGroup ? `${selectedGroup.contactCount} contacts` : `${groups.reduce((acc, g) => acc + g.contactCount, 0)} total`}
            </div>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {/* Dropdown Menu */}
      <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <div className="p-2">
          <button
            onClick={() => onSelectGroup(undefined)}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              !selectedGroupId ? 'bg-purple-50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-700">All Contacts</span>
            </div>
          </button>

          {groups.map((group) => (
            <div
              key={group.id}
              className={`relative group/item p-3 rounded-lg transition-colors ${
                selectedGroupId === group.id ? 'bg-purple-50' : 'hover:bg-gray-50'
              }`}
            >
              <button
                onClick={() => onSelectGroup(group.id)}
                className="w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getGroupColor(group.color)}`} />
                  <span className="font-medium text-gray-700">{group.name}</span>
                  <span className="text-sm text-gray-500">({group.contactCount})</span>
                </div>
                {group.description && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                    {group.description}
                  </p>
                )}
              </button>

              <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditGroup(group);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteGroup(group.id);
                  }}
                  className="p-1 text-gray-400 hover:text-red-500 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-2 pt-2 border-t">
            <ThreeDButton
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={onCreateGroup}
              className="w-full"
            >
              New Group
            </ThreeDButton>
          </div>
        </div>
      </div>
    </div>
  );
}