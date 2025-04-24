import { useState } from 'react';

export interface PhoneNumber {
  id: string;
  phoneNumber: string;
  label: string;
  isActive: boolean;
}

export function usePhoneNumbers() {
  // In a real app, this would fetch from your backend
  const [numbers] = useState<PhoneNumber[]>([
    {
      id: '1',
      phoneNumber: '+1 (555) 123-4567',
      label: 'Main Line',
      isActive: true
    },
    {
      id: '2',
      phoneNumber: '+1 (555) 987-6543',
      label: 'Sales',
      isActive: true
    },
    {
      id: '3',
      phoneNumber: '+1 (555) 456-7890',
      label: 'Support',
      isActive: true
    }
  ]);

  const [selectedNumber, setSelectedNumber] = useState<PhoneNumber | undefined>(
    numbers.find(n => n.isActive)
  );

  const selectNumber = (id: string) => {
    const number = numbers.find(n => n.id === id);
    if (number?.isActive) {
      setSelectedNumber(number);
    }
  };

  return {
    numbers,
    selectedNumber,
    selectNumber
  };
}