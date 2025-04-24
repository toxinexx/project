import { useState, useCallback, useEffect } from 'react';
import { VoicemailDrop } from '../../../../../types/voicemail';

export function useVoicemailDrops() {
  const [drops, setDrops] = useState<VoicemailDrop[]>([]);
  
  // Initialize with sample voicemail drops
  useEffect(() => {
    if (drops.length === 0) {
      setDrops([
        {
          id: '1',
          name: 'Standard Greeting',
          duration: 30,
          type: 'recorded'
        },
        {
          id: '2',
          name: 'Follow-up',
          duration: 45,
          type: 'ai'
        },
        {
          id: '3',
          name: 'Product Announcement',
          duration: 38,
          type: 'recorded'
        },
        {
          id: '4',
          name: 'Holiday Special',
          duration: 42,
          type: 'ai'
        }
      ]);
    }
  }, [drops.length]);
  
  const [isRecording, setIsRecording] = useState(false);
  const [selectedDrop, setSelectedDrop] = useState<VoicemailDrop>();

  const handleStartRecording = useCallback(() => {
    setIsRecording(true);
  }, []);

  const handleStopRecording = useCallback(() => {
    setIsRecording(false);
  }, []);

  const handleGenerateAI = useCallback(async (text: string) => {
    // In a real app, this would call an AI service
    console.log('Generating AI voicemail for:', text);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }, []);

  const handleSaveDrop = useCallback((name: string) => {
    const newDrop: VoicemailDrop = {
      id: crypto.randomUUID(),
      name,
      duration: Math.floor(Math.random() * 30) + 15, // Simulated duration
      type: isRecording ? 'recorded' : 'ai'
    };
    
    setDrops(prev => [...prev, newDrop]);
  }, [isRecording]);

  const handleDeleteDrop = useCallback((id: string) => {
    setDrops(prev => prev.filter(drop => drop.id !== id));
    if (selectedDrop?.id === id) {
      setSelectedDrop(undefined);
    }
  }, [selectedDrop]);

  const handlePreviewDrop = useCallback((drop: VoicemailDrop) => {
    setSelectedDrop(drop);
    // In a real app, this would play the audio
    console.log('Playing voicemail drop:', drop.name);
  }, []);

  return {
    drops,
    isRecording,
    selectedDrop,
    handleStartRecording,
    handleStopRecording,
    handleGenerateAI,
    handleSaveDrop,
    handleDeleteDrop,
    handlePreviewDrop
  };
}