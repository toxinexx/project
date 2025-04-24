import { useState } from 'react';

interface BillingStatement {
  id: string;
  month: string;
  date: string;
  amount: string;
}

export function useBillingStatements() {
  const [statements] = useState<BillingStatement[]>([
    {
      id: '1',
      month: 'November 2023',
      date: 'Nov 1, 2023',
      amount: '$49.00'
    },
    {
      id: '2',
      month: 'October 2023',
      date: 'Oct 1, 2023',
      amount: '$49.00'
    },
    {
      id: '3',
      month: 'September 2023',
      date: 'Sep 1, 2023',
      amount: '$49.00'
    }
  ]);

  const downloadStatement = async (id: string) => {
    // In production, this would make an API call to download the PDF
    console.log('Downloading statement:', id);
  };

  return {
    statements,
    downloadStatement
  };
}