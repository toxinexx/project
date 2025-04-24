import { useState, useEffect } from 'react';
import { Contact } from '../types/contact';
import { Lead } from '../types/lead';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadContacts = async () => {
      setIsLoading(true);
      try {
        // In production, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Sample data with complete Lead information for the lead detail page
        const sampleContacts: Lead[] = [
          {
            id: '1',
            name: 'John Smith',
            phone: '+1 (555) 123-4567',
            email: 'john@example.com',
            source: 'Website Lead',
            tags: ['Hot Lead', 'Real Estate'],
            createdAt: '2025-03-15T10:30:00Z',
            status: 'active',
            lastActivity: '2 days ago',
            temperature: 'hot',
            assignedTo: 'Alice Johnson',
            stage: 'Initial Contact',
            probability: 75,
            dealSize: 1400000,
            propertyType: 'Multi-family',
            address: '412 7th St, Brooklyn, NY 11215',
            city: 'Brooklyn',
            state: 'NY',
            zipCode: '11215',
            leadSource: 'Zillow',
            groupIds: ['1']
          },
          {
            id: '2',
            name: 'Sarah Johnson',
            phone: '+1 (555) 234-5678',
            email: 'sarah@example.com',
            source: 'Facebook Ad',
            tags: ['Warm Lead', 'Investor'],
            createdAt: '2025-03-10T14:45:00Z',
            status: 'active',
            lastActivity: '4 hours ago',
            temperature: 'warm',
            assignedTo: 'Bob Williams',
            stage: 'Qualification',
            probability: 50,
            dealSize: 750000,
            propertyType: 'Single Family',
            address: '123 Main St, Austin, TX 78701',
            city: 'Austin',
            state: 'TX',
            zipCode: '78701',
            leadSource: 'Facebook',
            groupIds: ['2']
          },
          {
            id: '3',
            name: 'Michael Brown',
            phone: '+1 (555) 345-6789',
            email: 'michael@example.com',
            source: 'Referral',
            tags: ['Cold Lead'],
            createdAt: '2025-03-05T09:15:00Z',
            status: 'active',
            lastActivity: '1 week ago',
            temperature: 'cold',
            assignedTo: 'Sarah Miller',
            stage: 'Needs Analysis',
            probability: 25,
            dealSize: 320000,
            propertyType: 'Condo',
            address: '555 Park Ave, Miami, FL 33101',
            city: 'Miami',
            state: 'FL',
            zipCode: '33101',
            leadSource: 'Referral',
            groupIds: ['3']
          },
          {
            id: '4',
            name: 'Emily Davis',
            phone: '+1 (555) 456-7890',
            email: 'emily@example.com',
            source: 'Google Ads',
            tags: ['Hot Lead', 'Commercial'],
            createdAt: '2025-03-01T11:20:00Z',
            status: 'active',
            lastActivity: 'Yesterday',
            temperature: 'hot',
            assignedTo: 'James Wilson',
            stage: 'Proposal',
            probability: 80,
            dealSize: 2300000,
            propertyType: 'Commercial',
            address: '789 Business Blvd, Chicago, IL 60601',
            city: 'Chicago',
            state: 'IL',
            zipCode: '60601',
            leadSource: 'Google',
            groupIds: ['1', '3']
          },
          {
            id: '5',
            name: 'Robert Wilson',
            phone: '+1 (555) 567-8901',
            email: 'robert@example.com',
            source: 'Cold Call',
            tags: ['Warm Lead'],
            createdAt: '2025-02-28T16:10:00Z',
            status: 'inactive',
            lastActivity: '3 weeks ago',
            temperature: 'warm',
            assignedTo: 'Karen Thomas',
            stage: 'Negotiation',
            probability: 60,
            dealSize: 550000,
            propertyType: 'Townhouse',
            address: '321 Oak St, Seattle, WA 98101',
            city: 'Seattle',
            state: 'WA',
            zipCode: '98101',
            leadSource: 'Cold Call',
            groupIds: ['2']
          },
          {
            id: '6',
            name: 'Jennifer Lopez',
            phone: '+1 (555) 678-9012',
            email: 'jennifer@example.com',
            source: 'Instagram',
            tags: ['Hot Lead', 'Buyer'],
            createdAt: '2025-02-25T13:40:00Z',
            status: 'active',
            lastActivity: '2 days ago',
            temperature: 'hot',
            assignedTo: 'Mike Johnson',
            stage: 'Closing',
            probability: 90,
            dealSize: 875000,
            propertyType: 'Single Family',
            address: '456 Elm St, Denver, CO 80202',
            city: 'Denver',
            state: 'CO',
            zipCode: '80202',
            leadSource: 'Instagram',
            groupIds: ['1']
          },
          {
            id: '7',
            name: 'David Miller',
            phone: '+1 (555) 789-0123',
            email: 'david@example.com',
            source: 'Event',
            tags: ['Cold Lead', 'Commercial'],
            createdAt: '2025-02-20T10:15:00Z',
            status: 'active',
            lastActivity: '5 days ago',
            temperature: 'cold',
            assignedTo: 'Lisa Clark',
            stage: 'Initial Contact',
            probability: 20,
            dealSize: 1800000,
            propertyType: 'Commercial',
            address: '987 Commerce St, Boston, MA 02108',
            city: 'Boston',
            state: 'MA',
            zipCode: '02108',
            leadSource: 'Conference',
            groupIds: ['3']
          }
        ];
        
        // Convert contactIds to strings if they're not already
        const contactsWithStringIds = sampleContacts.map(contact => ({
          ...contact,
          id: String(contact.id) // Ensure ID is a string
        }));
        
        console.log('Loaded contacts with IDs:', contactsWithStringIds.map(c => c.id));
        setContacts(contactsWithStringIds);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load contacts'));
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContacts();
  }, []);

  const addContact = (contact: Omit<Contact, 'id' | 'createdAt'>) => {
    const newContact: Contact = {
      ...contact,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const updateContact = (id: string, updates: Partial<Contact>) => {
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === id ? { ...contact, ...updates } : contact
      )
    );
  };

  const deleteContact = (id: string) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  return {
    contacts,
    isLoading,
    error,
    addContact,
    updateContact,
    deleteContact
  };
}