import { useEffect } from 'react';

export function useKeypadInput(onDigitPress: (digit: string | number) => void) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      
      // Allow numbers 0-9
      if (/^[0-9]$/.test(key)) {
        onDigitPress(parseInt(key));
        return;
      }

      // Allow * and #
      if (key === '*' || key === '#') {
        onDigitPress(key);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onDigitPress]);
}