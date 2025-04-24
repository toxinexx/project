import React from 'react';
import { useVoicemailDrops } from './useVoicemailDrops';
import { VoicemailDropList } from './VoicemailDropList';
import { VoicemailDropRecorder } from './VoicemailDropRecorder';
import { VoicemailDropAIGenerator } from './VoicemailDropAIGenerator';

export function VoicemailDrops() {
  const {
    drops,
    isRecording,
    selectedDrop,
    handleStartRecording,
    handleStopRecording,
    handleGenerateAI,
    handleSaveDrop,
    handleDeleteDrop,
    handlePreviewDrop
  } = useVoicemailDrops();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-800">Voicemail Drops</h3>
        <p className="text-sm text-gray-500">
          Create pre-recorded voicemails to use during calls
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <VoicemailDropRecorder
            isRecording={isRecording}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            onSave={handleSaveDrop}
          />
          
          <div className="mt-6">
            <VoicemailDropAIGenerator
              onGenerate={handleGenerateAI}
              onSave={handleSaveDrop}
            />
          </div>
        </div>

        <VoicemailDropList
          drops={drops}
          selectedDrop={selectedDrop}
          onPreview={handlePreviewDrop}
          onDelete={handleDeleteDrop}
        />
      </div>
    </div>
  );
}