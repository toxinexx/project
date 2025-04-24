import React from 'react';
import { Users } from 'lucide-react';
import { TeamMember } from '../../../types/conversation';

interface TeamSelectorProps {
  members: TeamMember[];
  selectedMembers: string[];
  onChange: (selectedIds: string[]) => void;
}

export function TeamSelector({ members, selectedMembers, onChange }: TeamSelectorProps) {
  const handleToggleMember = (memberId: string) => {
    const newSelection = selectedMembers.includes(memberId)
      ? selectedMembers.filter(id => id !== memberId)
      : [...selectedMembers, memberId];
    onChange(newSelection);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Assign Team Members
      </label>
      <div className="space-y-2">
        {members.map((member) => (
          <label
            key={member.id}
            className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedMembers.includes(member.id)}
              onChange={() => handleToggleMember(member.id)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <div className="ml-3 flex items-center justify-between flex-1">
              <div>
                <p className="text-sm font-medium text-gray-700">{member.name}</p>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                member.role === 'admin'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {member.role}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}