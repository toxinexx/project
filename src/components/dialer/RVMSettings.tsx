import React, { useState } from 'react';
import { VoicemailIcon, Plus, Play, Pause, Trash2, Mic, Brain, X, ChevronDown, ChevronUp } from 'lucide-react';
import { ThreeDButton } from '../ui/3DButton';

interface RVMSettingsProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  onSelect: (dropId: string) => void;
  selectedDropId?: string;
}

export function RVMSettings({ enabled, onToggle, onSelect, selectedDropId }: RVMSettingsProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [showRecorder, setShowRecorder] = useState(false);
  const [showDrops, setShowDrops] = useState(true);

  // Sample voicemail drops
  const drops = [
    {
      id: '1',
      name: 'Professional Greeting',
      duration: '0:30',
      type: 'recorded'
    },
    {
      id: '2',
      name: 'Follow-up Message',
      duration: '0:45',
      type: 'ai'
    },
    {
      id: '3',
      name: 'Appointment Reminder',
      duration: '0:35',
      type: 'recorded'
    }
  ];

  const selectedDrop = drops.find(drop => drop.id === selectedDropId);

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleGenerateAI = () => {
    console.log('Generating AI voicemail...');
  };

  const handleDelete = (dropId: string) => {
    console.log('Deleting drop:', dropId);
  };

  const handlePreview = (dropId: string) => {
    console.log('Playing drop:', dropId);
  };

  return (
    <div className="space-y-4">
      {/* RVM Toggle */}
      <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <VoicemailIcon className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Ringless Voicemail Drop</h3>
            <p className="text-sm text-gray-600">
              {enabled && selectedDrop 
                ? `Using: ${selectedDrop.name} (${selectedDrop.duration})`
                : 'Automatically leave voicemails when calls go unanswered'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {enabled && (
            <button
              onClick={() => setShowDrops(!showDrops)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-purple-100 rounded-full transition-colors"
            >
              {showDrops ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => {
                onToggle(e.target.checked);
                if (e.target.checked) {
                  setShowDrops(true);
                }
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
              peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full 
              peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
              after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600">
            </div>
          </label>
        </div>
      </div>

      {enabled && showDrops && (
        <>
          {/* Voicemail Drops List */}
          <div className="border rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
              <h4 className="font-medium text-gray-700">Select Voicemail Drop</h4>
              <div className="flex gap-2">
                <ThreeDButton
                  variant="secondary"
                  size="sm"
                  icon={Brain}
                  onClick={handleGenerateAI}
                >
                  Generate AI
                </ThreeDButton>
                <ThreeDButton
                  variant="primary"
                  size="sm"
                  icon={Plus}
                  onClick={() => setShowRecorder(true)}
                >
                  New Drop
                </ThreeDButton>
              </div>
            </div>

            <div className="divide-y">
              {drops.map((drop) => (
                <div 
                  key={drop.id}
                  className={`p-4 hover:bg-gray-50 transition-all duration-200 transform ${
                    selectedDropId === drop.id ? 'bg-purple-50 -translate-y-0.5' : 'translate-y-0'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input
                        type="radio"
                        name="voicemailDrop"
                        checked={selectedDropId === drop.id}
                        onChange={() => onSelect(drop.id)}
                        className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                      />
                      <div>
                        <div className="font-medium text-gray-800">{drop.name}</div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                          <span>{drop.duration}</span>
                          {drop.type === 'ai' && (
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full text-xs">
                              AI Generated
                            </span>
                          )}
                        </div>
                      </div>
                    </label>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePreview(drop.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                        title="Preview"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(drop.id)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Voice Recorder */}
          {showRecorder && (
            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-800">Record New Drop</h4>
                <button
                  onClick={() => setShowRecorder(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    isRecording ? 'bg-red-500 animate-pulse' : 'bg-purple-500'
                  }`}>
                    <Mic className="w-8 h-8 text-white" />
                  </div>
                  {isRecording && (
                    <div className="absolute -inset-2">
                      <div className="w-20 h-20 rounded-full bg-red-500/20 animate-ping" />
                    </div>
                  )}
                </div>

                <ThreeDButton
                  variant={isRecording ? "danger" : "primary"}
                  size="md"
                  icon={isRecording ? Pause : Mic}
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                >
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </ThreeDButton>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}