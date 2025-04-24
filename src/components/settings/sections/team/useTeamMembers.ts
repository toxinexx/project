import { useState, useCallback, useEffect } from 'react';
import { TeamMember } from '../../../../types/conversation';

export function useTeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  // Initialize with sample team members
  useEffect(() => {
    if (members.length === 0) {
      setMembers([
        {
          id: '1',
          name: 'Alice Johnson',
          email: 'alice@example.com',
          role: 'admin',
          status: 'online'
        },
        {
          id: '2',
          name: 'Bob Smith',
          email: 'bob@example.com',
          role: 'agent',
          status: 'away'
        }
      ]);
    }
  }, [members.length]);

  const addMember = useCallback((member: Omit<TeamMember, 'id'>) => {
    const newMember = {
      ...member,
      id: crypto.randomUUID()
    };
    setMembers(prev => [...prev, newMember]);
  }, []);

  const updateMember = useCallback((id: string, updates: Partial<TeamMember>) => {
    setMembers(prev => prev.map(member =>
      member.id === id ? { ...member, ...updates } : member
    ));
  }, []);

  const removeMember = useCallback((id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  }, []);

  return {
    members,
    addMember,
    updateMember,
    removeMember
  };
}