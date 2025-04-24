import React, { useState } from 'react';
import { Users, UserPlus } from 'lucide-react';
import { TeamMemberList } from './team/TeamMemberList';
import { AddMemberModal } from './team/AddMemberModal';
import { useTeamMembers } from './team/useTeamMembers';

export function TeamSection() {
  const { members, addMember, updateMember, removeMember } = useTeamMembers();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="crm-tile">
      <div className="p-6 border-b flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Team Members</h2>
          <p className="mt-1 text-sm text-gray-600">Manage your team and their permissions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 
            transition-colors flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Add Member
        </button>
      </div>
      
      <div className="p-6">
        <TeamMemberList
          members={members}
          onUpdate={updateMember}
          onRemove={removeMember}
        />
      </div>

      {showAddModal && (
        <AddMemberModal
          onClose={() => setShowAddModal(false)}
          onAdd={(member) => {
            addMember({ ...member, status: 'offline' });
          }}
        />
      )}
    </div>
  );
}