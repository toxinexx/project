import React, { useState } from 'react';
import { Users, UserPlus, Download, Upload, ChevronDown } from 'lucide-react';
import { ContactList } from './ContactList';
import { useContacts } from '../../hooks/useContacts';
import { useContactGroups } from '../../hooks/useContactGroups';
import { GroupModal } from './groups/GroupModal';
import { ContactGroup } from '../../types/contact';
import { ContactFilters } from './filters/ContactFilters';
import { ContactFilterBadges } from './ContactFilterBadges';
import { ThreeDButton } from '../ui/3DButton';

export function Contacts() {
  const { contacts, isLoading } = useContacts();
  const { groups, createGroup, updateGroup, deleteGroup } = useContactGroups();
  const [selectedGroupId, setSelectedGroupId] = useState<string>();
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState<ContactGroup>();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ContactFilters>({});
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);
  
  const handleCreateGroup = () => {
    setEditingGroup(undefined);
    setShowGroupModal(true);
  };

  const handleEditGroup = (group: ContactGroup) => {
    setEditingGroup(group);
    setShowGroupModal(true);
  };

  const handleSaveGroup = (data: { name: string; description?: string; color: string }) => {
    if (editingGroup) {
      updateGroup(editingGroup.id, data);
    } else {
      const newGroup = createGroup(data.name, data.description, data.color);
      setSelectedGroupId(newGroup.id);
    }
    setShowGroupModal(false);
  };

  const handleDeleteGroup = (groupId: string) => {
    if (confirm('Are you sure you want to delete this group? This will not delete the contacts in the group.')) {
      deleteGroup(groupId);
      if (selectedGroupId === groupId) {
        setSelectedGroupId(undefined);
      }
    }
  };

  const handleAddContactsToGroup = (contactIds: string[], groupId: string) => {
    // In a real app, this would update the contacts' group assignments
    console.log('Adding contacts to group:', { contactIds, groupId });
  };

  const handleCreateGroupWithContacts = (contactIds: string[]) => {
    setEditingGroup(undefined);
    setShowGroupModal(true);
  };

  const handleRemoveFilter = (type: keyof ContactFilters, value?: string) => {
    if (type === 'location' && value) {
      setFilters(prev => ({
        ...prev,
        location: prev.location?.filter(loc => loc !== value)
      }));
    } else {
      setFilters(prev => {
        const newFilters = { ...prev };
        delete newFilters[type];
        return newFilters;
      });
    }
  };
  
  // Filter contacts based on selected group and filters
  const filteredContacts = contacts.filter(contact => {
    // First apply group filter
    if (selectedGroupId && (!contact.groupIds || !contact.groupIds.includes(selectedGroupId))) {
      return false;
    }

    // Then apply other filters
    if (filters.dateCreated) {
      const createdAt = new Date(contact.createdAt);
      if (filters.dateCreated.from && createdAt < new Date(filters.dateCreated.from)) {
        return false;
      }
      if (filters.dateCreated.to && createdAt > new Date(filters.dateCreated.to)) {
        return false;
      }
    }

    if (filters.location && filters.location.length > 0) {
      const contactLocation = `${contact.city}, ${contact.state}`;
      if (!filters.location.includes(contactLocation)) {
        return false;
      }
    }

    return true;
  });

  const selectedGroup = groups.find(g => g.id === selectedGroupId);
  
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="crm-tile p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-50">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Contacts</h2>
              <p className="text-sm text-gray-600">
                {contacts.length} total contacts
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* Group Selector Dropdown */}
            <div className="relative">
              <ThreeDButton
                variant="secondary"
                size="md"
                icon={Users}
                onClick={() => setShowGroupDropdown(!showGroupDropdown)}
                className="w-full sm:w-auto"
              >
                <span className="flex items-center gap-2">
                  {selectedGroup ? selectedGroup.name : 'All Contacts'}
                  <ChevronDown className="w-4 h-4" />
                </span>
              </ThreeDButton>

              {showGroupDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-20"
                    onClick={() => setShowGroupDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-30">
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setSelectedGroupId(undefined);
                          setShowGroupDropdown(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg transition-colors ${
                          !selectedGroupId ? 'bg-purple-50 text-purple-700' : 'hover:bg-gray-50'
                        }`}
                      >
                        All Contacts
                      </button>

                      {groups.map((group) => (
                        <button
                          key={group.id}
                          onClick={() => {
                            setSelectedGroupId(group.id);
                            setShowGroupDropdown(false);
                          }}
                          className={`w-full text-left p-2 rounded-lg transition-colors ${
                            selectedGroupId === group.id ? 'bg-purple-50 text-purple-700' : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{group.name}</span>
                            <span className="text-sm text-gray-500">{group.contactCount}</span>
                          </div>
                        </button>
                      ))}

                      <div className="border-t mt-2 pt-2">
                        <button
                          onClick={() => {
                            handleCreateGroup();
                            setShowGroupDropdown(false);
                          }}
                          className="w-full text-left p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <UserPlus className="w-4 h-4" />
                          Create New Group
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              className="px-4 py-2 flex items-center gap-2 border border-primary-100 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Upload className="w-4 h-4 text-gray-600" />
              <span>Import</span>
            </button>
            
            <button
              className="px-4 py-2 flex items-center gap-2 border border-primary-100 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4 text-gray-600" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Badges */}
      <ContactFilterBadges
        filters={filters}
        onRemoveFilter={handleRemoveFilter}
      />
      
      {/* Contact List */}
      <ContactList 
        contacts={filteredContacts}
        isLoading={isLoading}
        selectedGroupId={selectedGroupId}
        onAddToGroup={handleAddContactsToGroup}
        onCreateGroupWithContacts={handleCreateGroupWithContacts}
        groups={groups}
        onShowFilters={() => setShowFilters(true)}
        activeFilterCount={Object.keys(filters).length}
      />

      {/* Modals */}
      {showGroupModal && (
        <GroupModal
          group={editingGroup}
          onClose={() => setShowGroupModal(false)}
          onSave={handleSaveGroup}
        />
      )}

      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-start justify-center pt-20">
          <div className="w-full max-w-2xl mx-4">
            <ContactFilters
              filters={filters}
              onApplyFilters={(newFilters) => {
                setFilters(newFilters);
                setShowFilters(false);
              }}
              onClose={() => setShowFilters(false)}
              availableLocations={Array.from(new Set(contacts.map(c => `${c.city}, ${c.state}`).filter(Boolean)))}
            />
          </div>
        </div>
      )}
    </div>
  );
}