import { useState, useEffect } from 'react';
import { useUserProfile } from '../../../../user/hooks/useUserProfile';

export function useVoicemailState() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState('');
  const [showMissingInfoAlert, setShowMissingInfoAlert] = useState(false);
  const [voicemailEnabled, setVoicemailEnabled] = useState(true);
  const [greetingEnabled, setGreetingEnabled] = useState(true);
  const { companyName, hasCompanyInfo } = useUserProfile();

  useEffect(() => {
    // Load saved preferences
    const savedVoicemailEnabled = localStorage.getItem('voicemail_enabled');
    const savedGreetingEnabled = localStorage.getItem('greeting_enabled');
    
    if (savedVoicemailEnabled !== null) {
      setVoicemailEnabled(savedVoicemailEnabled === 'true');
    }
    if (savedGreetingEnabled !== null) {
      setGreetingEnabled(savedGreetingEnabled === 'true');
    }
  }, []);

  const handleVoicemailToggle = (enabled: boolean) => {
    setVoicemailEnabled(enabled);
    localStorage.setItem('voicemail_enabled', String(enabled));
    if (!enabled) {
      setGreetingEnabled(false);
      localStorage.setItem('greeting_enabled', 'false');
    }
  };

  const handleGreetingToggle = (enabled: boolean) => {
    setGreetingEnabled(enabled);
    localStorage.setItem('greeting_enabled', String(enabled));
  };

  const handleStartRecording = () => {
    if (!hasCompanyInfo) {
      setShowMissingInfoAlert(true);
      return;
    }
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordedText(`Thank you for calling ${companyName}. We're unable to take your call right now, but please leave a message and we'll get back to you as soon as possible.`);
  };

  const handleGenerateAIVoice = () => {
    if (!hasCompanyInfo) {
      setShowMissingInfoAlert(true);
      return;
    }
    setRecordedText(`Thank you for calling ${companyName}. We're unable to take your call right now, but please leave a message and we'll get back to you as soon as possible.`);
  };

  const handlePreview = () => {
    // In a real app, this would play the recorded or AI-generated audio
    alert('Playing voicemail greeting preview...');
  };

  const handleSave = () => {
    // In a real app, this would save the voicemail greeting to the server
    localStorage.setItem('voicemail_greeting', recordedText);
    alert('Voicemail greeting saved successfully!');
  };

  return {
    isRecording,
    recordedText,
    showMissingInfoAlert,
    voicemailEnabled,
    greetingEnabled,
    setShowMissingInfoAlert,
    handleStartRecording,
    handleStopRecording,
    handleGenerateAIVoice,
    handlePreview,
    handleSave,
    handleVoicemailToggle,
    handleGreetingToggle
  };
}