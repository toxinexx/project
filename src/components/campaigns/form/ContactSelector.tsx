import React, { useState } from 'react';
import { Users, FileSpreadsheet, Plus } from 'lucide-react';
import { Contact } from '../../../types/contact';
import { FileUploader } from './FileUploader';
import { ThreeDButton } from '../../ui/3DButton';

interface ContactSelectorProps {
  selectedContacts: Contact[];
  onContactsChange: (contacts: Contact[]) => void;
  groups: { id: string; name: string; contactCount: number }[];
  onUpload: (contacts: Contact[]) => void;
}

export function ContactSelector({
  selectedContacts,
  onContactsChange,
  groups,
  onUpload
}: ContactSelectorProps) {
  const [selectionMethod, setSelectionMethod] = useState<'upload' | 'group' | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');

  const handleGroupSelect = (groupId: string) => {
    setSelectedGroupId(groupId);
    // In a real app, this would fetch contacts for the selected group
    // For now, we'll simulate it with sample data
    const sampleContacts: Contact[] = [
      {
        id: crypto.randomUUID(),
        name: 'John Smith',
        phone: '+1 (555) 123-4567',
        email: 'john@example.com',
        source: 'Group Import',
        createdAt: new Date().toISOString(),
        status: 'active'
      },
      {
        id: crypto.randomUUID(),
        name: 'Sarah Johnson',
        phone: '+1 (555) 234-5678',
        email: 'sarah@example.com',
        source: 'Group Import',
        createdAt: new Date().toISOString(),
        status: 'active'
      }
    ];
    onContactsChange(sampleContacts);
  };

  return (
    <div className="space-y-6">
      {/* Selection Method Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => setSelectionMethod('upload')}
          className={`p-6 border-2 rounded-xl text-left transition-colors relative overflow-hidden group
            ${selectionMethod === 'upload' 
              ? 'border-purple-500 bg-purple-50' 
              : 'border-gray-200 hover:border-gray-300'}`}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 grid grid-cols-4 gap-1">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-full h-full bg-gray-900/20" />
              ))}
            </div>
          </div>
          
          {/* Content */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileSpreadsheet className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-800">Upload Contact List</h3>
            </div>
            <p className="text-sm text-gray-600">
              Import contacts from a CSV or Excel file
            </p>
          </div>
        </button>

        <button
          onClick={() => setSelectionMethod('group')}
          className={`p-6 border-2 rounded-xl text-left transition-colors relative overflow-hidden group
            ${selectionMethod === 'group' 
              ? 'border-purple-500 bg-purple-50' 
              : 'border-gray-200 hover:border-gray-300'}`}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 grid grid-cols-4 gap-1">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-full h-full bg-gray-900/20" />
              ))}
            </div>
          </div>
          
          {/* Content */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-800">Select from Groups</h3>
            </div>
            <p className="text-sm text-gray-600">
              Choose contacts from your existing groups
            </p>
          </div>
        </button>
      </div>

      {/* Contact Selection Content */}
      {selectionMethod === 'upload' && (
        <div className="space-y-4">
          <FileUploader onUpload={onUpload} />
          
          {selectedContacts.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-700">
                  {selectedContacts.length} Contacts Selected
                </h4>
                <button
                  onClick={() => onContactsChange([])}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Clear All
                </button>
              </div>
              <div className="border rounded-lg divide-y max-h-48 overflow-y-auto">
                {selectedContacts.map((contact) => (
                  <div key={contact.id} className="p-3 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800">{contact.name}</div>
                      <div className="text-sm text-gray-500">{contact.phone}</div>
                    </div>
                    <button
                      onClick={() => onContactsChange(selectedContacts.filter(c => c.id !== contact.id))}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Plus className="w-4 h-4 rotate-45" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {selectionMethod === 'group' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => handleGroupSelect(group.id)}
                className={`p-4 border rounded-lg text-left transition-colors
                  ${selectedGroupId === group.id 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'hover:bg-gray-50'}`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-800">{group.name}</span>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  {group.contactCount} contacts
                </div>
              </button>
            ))}
          </div>

          {selectedContacts.length > 0 && (
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-purple-800">
                  Selected Group Contacts
                </h4>
                <span className="text-sm text-purple-600">
                  {selectedContacts.length} contacts
                </span>
              </div>
              <p className="text-sm text-purple-600">
                All contacts from this group will be included in the campaign
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}