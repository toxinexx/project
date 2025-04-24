import React from 'react';
import { VoicemailHeader } from './VoicemailHeader';
import { MissingInfoAlert } from './MissingInfoAlert';
import { VoicemailToggles } from './VoicemailToggles';
import { VoicemailControls } from './VoicemailControls';
import { VoicemailPreview } from './VoicemailPreview';
import { VoicemailDrops } from './VoicemailDrops';
import { useVoicemailState } from './useVoicemailState';

export function VoicemailSettings() {
  const {
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
  } = useVoicemailState();

  return (
    <div className="space-y-8">
      {/* Voicemail Greeting Section */}
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

        {voicemailEnabled && greetingEnabled && (
          <>
            <VoicemailControls
              isRecording={isRecording}
              onStartRecording={handleStartRecording}
              onStopRecording={handleStopRecording}
              onGenerateAI={handleGenerateAIVoice}
              disabled={showMissingInfoAlert}
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

      {/* Voicemail Drops Section */}
      {voicemailEnabled && (
        <div className="border-t pt-8">
          <VoicemailDrops />
        </div>
      )}
    </div>
  );
}