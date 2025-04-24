import { useState, useCallback } from 'react';

export function useCallControls() {
  const [isMuted, setIsMuted] = useState(false);

  const handleTransfer = useCallback(() => {
    // In production, this would initiate a call transfer
    console.log('Initiating call transfer...');
  }, []);

  const handleMerge = useCallback(() => {
    // In production, this would merge active calls
    console.log('Merging calls...');
  }, []);

  const handleMute = useCallback(() => {
    setIsMuted(prev => !prev);
    // In production, this would mute/unmute the call
    console.log('Toggling mute:', !isMuted);
  }, [isMuted]);

  return {
    isMuted,
    handleTransfer,
    handleMerge,
    handleMute
  };
}