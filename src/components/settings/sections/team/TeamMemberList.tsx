import React from 'react';
import { User, Mail, Shield, Trash2, Edit2 } from 'lucide-react';
import { TeamMember } from '../../../../types/conversation';

interface TeamMemberListProps {
  members: TeamMember[];
  onUpdate: (id: string, updates: Partial<TeamMember>) => void;
  onRemove: (id: string) => void;
}

export function TeamMemberList({ members, onUpdate, onRemove }: TeamMemberListProps) {
  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
    }
  };

  return (
    <div className="divide-y">
      {members.map((member) => (
        <div key={member.id} className="py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`} />
            </div>
            
            <div>
              <div className="font-medium text-gray-900">{member.name}</div>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {member.email}
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  {member.role}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdate(member.id, {})}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onRemove(member.id)}
              className="p-2 text-red-400 hover:text-red-600 rounded-full hover:bg-red-50"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}