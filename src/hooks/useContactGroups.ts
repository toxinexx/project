import { useState, useEffect, useCallback } from 'react';
import { ContactGroup } from '../types/contact';

export function useContactGroups() {
  const [groups, setGroups] = useState<ContactGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial groups
  useEffect(() => {
    const loadGroups = async () => {
      setIsLoading(true);
      try {
        // In production, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Sample groups
        const sampleGroups: ContactGroup[] = [
          {
            id: '1',
            name: 'VIP Clients',
            description: 'High-value clients and key accounts',
            color: 'purple',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            contactCount: 12
          },
          {
            id: '2',
            name: 'Prospects',
            description: 'Potential clients in the sales pipeline',
            color: 'blue',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            contactCount: 45
          },
          {
            id: '3',
            name: 'Follow Up',
            description: 'Contacts requiring follow-up',
            color: 'amber',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            contactCount: 8
          }
        ];
        
        setGroups(sampleGroups);
      } catch (error) {
        console.error('Failed to load groups:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadGroups();
  }, []);

  const createGroup = useCallback((name: string, description?: string, color: string = 'purple') => {
    const newGroup: ContactGroup = {
      id: crypto.randomUUID(),
      name,
      description,
      color,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      contactCount: 0
    };
    
    setGroups(prev => [...prev, newGroup]);
    return newGroup;
  }, []);

  const updateGroup = useCallback((id: string, updates: Partial<ContactGroup>) => {
    setGroups(prev => prev.map(group => 
      group.id === id 
        ? { 
            ...group, 
            ...updates, 
            updatedAt: new Date().toISOString() 
          } 
        : group
    ));
  }, []);

  const deleteGroup = useCallback((id: string) => {
    setGroups(prev => prev.filter(group => group.id !== id));
  }, []);

  return {
    groups,
    isLoading,
    createGroup,
    updateGroup,
    deleteGroup
  };
}