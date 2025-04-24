import React, { useState } from 'react';
import { Play, Pause, X } from 'lucide-react';

interface AutoDialerProps {
  onDial: (number: string) => void;
}

export function AutoDialer({ onDial }: AutoDialerProps) {
  const [numbers, setNumbers] = useState<string[]>([]);
  const [isDialing, setIsDialing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addNumber = (number: string) => {
    setNumbers([...numbers, number]);
  };

  const removeNumber = (index: number) => {
    setNumbers(numbers.filter((_, i) => i !== index));
  };

  const startDialing = () => {
    setIsDialing(true);
    if (numbers[currentIndex]) {
      onDial(numbers[currentIndex]);
    }
  };

  const pauseDialing = () => {
    setIsDialing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Auto Dialer</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add phone number"
            className="flex-1 px-3 py-2 border rounded-lg"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addNumber(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
          <button
            onClick={isDialing ? pauseDialing : startDialing}
            className={`px-4 py-2 rounded-lg ${
              isDialing ? 'bg-yellow-500' : 'bg-green-500'
            } text-white`}
          >
            {isDialing ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {numbers.map((number, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-50 p-2 rounded"
          >
            <span>{number}</span>
            <button
              onClick={() => removeNumber(index)}
              className="text-red-500 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}