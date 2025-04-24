import React, { useState, useRef, useEffect } from 'react';
import { Phone, Check, ChevronDown } from 'lucide-react';
import { usePhoneNumbers } from './hooks/usePhoneNumbers';

export function PhoneNumberSelector() {
  const { numbers, selectedNumber, selectNumber } = usePhoneNumbers();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="mb-4" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 text-gray-800
          border-b border-gray-200 hover:border-purple-300 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
            <Phone className="w-3 h-3 text-purple-600" />
          </div>
          <div className="text-left">
            <div className="font-light">{selectedNumber?.phoneNumber}</div>
            <div className="text-xs text-gray-500">{selectedNumber?.label}</div>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* iOS-style dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg">
          <div className="p-1">
            {numbers.map((number) => (
              <button
                key={number.id}
                onClick={() => {
                  selectNumber(number.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 hover:bg-gray-50 
                  rounded-lg transition-colors
                  ${selectedNumber?.id === number.id ? 'bg-purple-50 text-purple-700' : 'text-gray-700'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <Phone className="w-3 h-3 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-light">{number.phoneNumber}</div>
                    <div className="text-xs text-gray-500">{number.label}</div>
                  </div>
                </div>
                {selectedNumber?.id === number.id && (
                  <Check className="w-4 h-4 text-purple-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}