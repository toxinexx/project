import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ContactGroup } from '../../../types/contact';
import { ThreeDButton } from '../../ui/3DButton';

interface GroupModalProps {
  group?: ContactGroup;
  onClose: () => void;
  onSave: (data: { name: string; description?: string; color: string }) => void;
}

export function GroupModal({ group, onClose, onSave }: GroupModalProps) {
  const [name, setName] = useState(group?.name || '');
  const [description, setDescription] = useState(group?.description || '');
  const [color, setColor] = useState(group?.color || 'purple');

  const colors = [
    { id: 'purple', name: 'Purple', class: 'bg-purple-500' },
    { id: 'blue', name: 'Blue', class: 'bg-blue-500' },
    { id: 'amber', name: 'Amber', class: 'bg-amber-500' },
    { id: 'green', name: 'Green', class: 'bg-green-500' },
    { id: 'red', name: 'Red', class: 'bg-red-500' },
    { id: 'indigo', name: 'Indigo', class: 'bg-indigo-500' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    onSave({ name, description, color });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-x-4 top-[20%] max-w-md mx-auto bg-white rounded-lg shadow-xl z-50">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {group ? 'Edit Group' : 'Create New Group'}
          </h2>
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
              Group Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter group name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none h-24"
              placeholder="Enter group description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="grid grid-cols-6 gap-2">
              {colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColor(c.id)}
                  className={`w-8 h-8 rounded-full ${c.class} ${
                    color === c.id ? 'ring-2 ring-offset-2 ring-purple-500' : ''
                  }`}
                  title={c.name}
                />
              ))}
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
            <ThreeDButton
              type="submit"
              variant="primary"
              size="md"
              disabled={!name.trim()}
            >
              {group ? 'Update Group' : 'Create Group'}
            </ThreeDButton>
          </div>
        </form>
      </div>
    </>
  );
}