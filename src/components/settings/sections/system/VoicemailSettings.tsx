import React from 'react';
import { VoicemailHeader } from './voicemail/VoicemailHeader';
import { MissingInfoAlert } from './voicemail/MissingInfoAlert';
import { ApiKeyAlert } from './voicemail/ApiKeyAlert';
import { VoicemailToggles } from './voicemail/VoicemailToggles';
import { VoicemailControls } from './voicemail/VoicemailControls';
import { VoicemailPreview } from './voicemail/VoicemailPreview';
import { useVoicemailState } from './voicemail/useVoicemailState';

export function VoicemailSettings() {
  const {
    isRecording,
    recordedText,
    showMissingInfoAlert,
    showApiKeyAlert,
    voicemailEnabled,
    greetingEnabled,
    setShowMissingInfoAlert,
    setShowApiKeyAlert,
    handleStartRecording,
    handleStopRecording,
    handleGenerateAIVoice,
    handlePreview,
    handleSave,
    handleVoicemailToggle,
    handleGreetingToggle
  } = useVoicemailState();

  return (
    <div className="space-y-6">
      <VoicemailHeader />

      <VoicemailToggles
        voicemailEnabled={voicemailEnabled}
        greetingEnabled={greetingEnabled}
        onVoicemailToggle={handleVoicemailToggle}
        onGreetingToggle={handleGreetingToggle}
      />

      {showMissingInfoAlert && (
        <MissingInfoAlert onClose={() => setShowMissingInfoAlert(false)} />
      )}

      {showApiKeyAlert && (
        <ApiKeyAlert onClose={() => setShowApiKeyAlert(false)} />
      )}

      {voicemailEnabled && greetingEnabled && (
        <>
          <VoicemailControls
            isRecording={isRecording}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            onGenerateAI={handleGenerateAIVoice}
            disabled={showMissingInfoAlert || showApiKeyAlert}
          />

          {recordedText && (
            <VoicemailPreview
              text={recordedText}
              onPlay={handlePreview}
              onSave={handleSave}
            />
          )}
        </>
      )}
    </div>
  );
}