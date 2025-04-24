import { useState } from 'react';

export function useAutoDialer(onDial: (number: string) => void) {
  const [numbers, setNumbers] = useState<string[]>([]);
  const [isDialing, setIsDialing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addNumber = (number: string) => {
    setNumbers([...numbers, number]);
  };

  const removeNumber = (index: number) => {
    setNumbers(numbers.filter((_, i) => i !== index));
  };

  const toggleDialing = () => {
    const newIsDialing = !isDialing;
    setIsDialing(newIsDialing);
    
    if (newIsDialing && numbers[currentIndex]) {
      onDial(numbers[currentIndex]);
    }
  };

  return {
    numbers,
    isDialing,
    currentIndex,
    addNumber,
    removeNumber,
    toggleDialing
  };
}