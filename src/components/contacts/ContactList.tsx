import React, { useState, useMemo } from 'react';
import { Contact } from '../../types/contact';
import { ContactListItem } from './ContactListItem';
import { ContactListHeader } from './ContactListHeader';
import { useNavigate } from 'react-router-dom';

interface ContactListProps {
  contacts: Contact[];
  isLoading: boolean;
  selectedGroupId?: string;
  onAddToGroup?: (contactIds: string[], groupId: string) => void;
  onCreateGroupWithContacts?: (contactIds: string[]) => void;
  groups?: { id: string; name: string }[];
  onShowFilters?: () => void;
  activeFilterCount?: number;
}

export function ContactList({ 
  contacts, 
  isLoading,
  selectedGroupId,
  onCreateGroupWithContacts,
  onShowFilters,
  activeFilterCount = 0
}: ContactListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const navigate = useNavigate();
  
  const filteredContacts = useMemo(() => {
    if (!searchTerm) return contacts;
    const lowerCaseSearch = searchTerm.toLowerCase();
    
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(lowerCaseSearch) ||
      contact.phone.toLowerCase().includes(lowerCaseSearch) ||
      contact.email.toLowerCase().includes(lowerCaseSearch) ||
      contact.source.toLowerCase().includes(lowerCaseSearch) ||
      contact.tags?.some(tag => tag.toLowerCase().includes(lowerCaseSearch))
    );
  }, [contacts, searchTerm]);
  
  const handlePhoneClick = (phone: string) => {
    const dialerTab = document.querySelector('[data-tab="dialer"]');
    if (dialerTab) {
      (dialerTab as HTMLElement).click();
      
      setTimeout(() => {
        const dialerInput = document.querySelector('input[placeholder="Search or enter number..."]');
        if (dialerInput) {
          (dialerInput as HTMLInputElement).value = phone;
          const event = new Event('input', { bubbles: true });
          dialerInput.dispatchEvent(event);
        }
      }, 100);
    }
  };
  
  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };
  
  const handleSmsClick = (phone: string) => {
    const smsTab = document.querySelector('[data-tab="sms"]');
    if (smsTab) {
      (smsTab as HTMLElement).click();
      
      setTimeout(() => {
        const recipientInput = document.querySelector('input[placeholder="Search or enter number..."]');
        if (recipientInput) {
          (recipientInput as HTMLInputElement).value = phone;
          const event = new Event('input', { bubbles: true });
          recipientInput.dispatchEvent(event);
        }
      }, 100);
    }
  };
  
  const handleAddContact = () => {
    alert('Add contact functionality coming soon!');
  };

  const handleSelectContact = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId) 
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(contact => contact.id));
    }
  };

  const handleClearSelection = () => {
    setSelectedContacts([]);
  };

  const handleCreateGroup = () => {
    if (onCreateGroupWithContacts && selectedContacts.length > 0) {
      onCreateGroupWithContacts(selectedContacts);
      setSelectedContacts([]);
    }
  };
  
  if (isLoading) {
    return (
      <div className="crm-tile">
        <ContactListHeader 
          onAddContact={handleAddContact}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onShowFilters={onShowFilters}
          activeFilterCount={activeFilterCount}
        />
        <div className="py-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="crm-tile">
      <ContactListHeader 
        onAddContact={handleAddContact}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        showSelectionMode={selectedContacts.length > 0}
        selectedCount={selectedContacts.length}
        onClearSelection={handleClearSelection}
        onCreateGroup={handleCreateGroup}
        onShowFilters={onShowFilters}
        activeFilterCount={activeFilterCount}
      />
      
      {/* Desktop Table View */}
      <div className="overflow-x-auto desktop-table">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-xs font-medium text-gray-500 w-8">
                <input
                  type="checkbox"
                  checked={selectedContacts.length > 0 && selectedContacts.length === filteredContacts.length}
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
              </th>
              <th scope="col" className="py-3.5 pl-3 pr-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tags
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <ContactListItem
                  key={contact.id}
                  contact={contact}
                  onPhoneClick={handlePhoneClick}
                  onEmailClick={handleEmailClick}
                  onSmsClick={handleSmsClick}
                  isSelected={selectedContacts.includes(contact.id)}
                  onSelect={() => handleSelectContact(contact.id)}
                />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-10 text-center text-gray-500">
                  {searchTerm ? 'No contacts found matching your search' : 'No contacts found'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}