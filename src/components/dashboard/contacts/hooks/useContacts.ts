import { useState } from 'react';

export function useContacts() {
  const [totalContacts] = useState(156);
  const [favoriteContacts] = useState(12);
  const [recentContacts] = useState(5);

  return {
    totalContacts,
    favoriteContacts,
    recentContacts
  };
}