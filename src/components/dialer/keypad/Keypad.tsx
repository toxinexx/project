import React from 'react';
import { KeypadButton } from './KeypadButton';

interface KeypadProps {
  onDigitPress: (digit: string | number) => void;
}

export function Keypad({ onDigitPress }: KeypadProps) {
  const keypadData = [
    { digit: 1, letters: '' },
    { digit: 2, letters: 'ABC' },
    { digit: 3, letters: 'DEF' },
    { digit: 4, letters: 'GHI' },
    { digit: 5, letters: 'JKL' },
    { digit: 6, letters: 'MNO' },
    { digit: 7, letters: 'PQRS' },
    { digit: 8, letters: 'TUV' },
    { digit: 9, letters: 'WXYZ' },
    { digit: '*', letters: '' },
    { digit: 0, letters: '+' },
    { digit: '#', letters: '' }
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
      {keypadData.map((item) => (
        <KeypadButton 
          key={item.digit} 
          digit={item.digit} 
          letters={item.letters}
          onClick={onDigitPress} 
        />
      ))}
    </div>
  );
}