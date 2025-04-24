import { useState, useCallback } from 'react';

export function useCallPlayback() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayback = useCallback(() => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control actual audio playback
  }, [isPlaying]);

  return {
    isPlaying,
    progress,
    togglePlayback
  };
}