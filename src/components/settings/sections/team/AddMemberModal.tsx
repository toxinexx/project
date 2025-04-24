import React, { useState } from 'react';
import { X, User, Mail, Shield } from 'lucide-react';
import { TeamMember } from '../../../../types/conversation';

interface AddMemberModalProps {
  onClose: () => void;
  onAdd: (member: Omit<TeamMember, 'id' | 'status'>) => void;
}

export function AddMemberModal({ onClose, onAdd }: AddMemberModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'agent' as TeamMember['role']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-x-4 top-[20%] max-w-md mx-auto bg-white rounded-lg shadow-xl z-50">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Add Team Member</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full pl-10 pr-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full pl-10 pr-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.role}
                onChange={e => setFormData(prev => ({ ...prev, role: e.target.value as TeamMember['role'] }))}
                className="w-full pl-10 pr-3 py-2 border rounded-md"
                required
              >
                <option value="agent">Agent</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </>
  );
}