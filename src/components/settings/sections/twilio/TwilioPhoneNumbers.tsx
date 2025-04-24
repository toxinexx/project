import React, { useState } from 'react';
import { Search, Phone } from 'lucide-react';
import { PhoneNumberSelector } from '../../controls/PhoneNumberSelector';

interface PhoneNumber {
  number: string;
  status: 'active' | 'available';
  monthlyPrice?: string;
  features?: string[];
}

export function TwilioPhoneNumbers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<PhoneNumber[]>([]);

  // Simulated phone numbers - in production, these would come from Twilio's API
  const activeNumbers: PhoneNumber[] = [
    { number: '+1 (555) 123-4567', status: 'active' }
  ];

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API call to Twilio
    setTimeout(() => {
      const results: PhoneNumber[] = [
        {
          number: `+1 (${searchQuery}) 555-0123`,
          status: 'available',
          monthlyPrice: '$1.00',
          features: ['Voice', 'SMS', 'MMS']
        },
        {
          number: `+1 (${searchQuery}) 555-0124`,
          status: 'available',
          monthlyPrice: '$1.00',
          features: ['Voice', 'SMS']
        }
      ];
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  const handlePurchase = (number: string) => {
    console.log('Purchasing number:', number);
    // In production, this would make an API call to purchase the number
    alert('Number purchased successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Active Numbers</h3>
        <PhoneNumberSelector
          numbers={activeNumbers}
          onSelect={(number) => console.log('Selected:', number)}
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Search Available Numbers</h3>
        
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area Code
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter area code (e.g., 415)"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
                maxLength={3}
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={searchQuery.length !== 3 || isSearching}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {isSearching ? (
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 animate-spin" />
                Searching...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search
              </span>
            )}
          </button>
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-4">
            {searchResults.map((number) => (
              <div
                key={number.number}
                className="flex items-center justify-between p-4 bg-white border rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{number.number}</p>
                  <p className="text-sm text-gray-500">
                    {number.features?.join(' • ')}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm font-medium text-gray-600">
                    {number.monthlyPrice}/month
                  </p>
                  <button
                    onClick={() => handlePurchase(number.number)}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                  >
                    Purchase
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}