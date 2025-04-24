import React from 'react';
import { Mic, MicOff, Camera, CameraOff, Monitor, PhoneOff } from 'lucide-react';
import { ThreeDButton } from '../ui/3DButton';

interface VideoControlsProps {
  isMicEnabled: boolean;
  isCameraEnabled: boolean;
  isScreenSharing: boolean;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onToggleScreenShare: () => void;
  onLeave: () => void;
}

export function VideoControls({
  isMicEnabled,
  isCameraEnabled,
  isScreenSharing,
  onToggleMic,
  onToggleCamera,
  onToggleScreenShare,
  onLeave
}: VideoControlsProps) {
  return (
    <div className="p-4 bg-gray-800 border-t border-gray-700">
      <div className="flex items-center justify-center gap-4">
        <ThreeDButton
          variant={isMicEnabled ? 'secondary' : 'danger'}
          size="md"
          isCircle
          onClick={onToggleMic}
        >
          {isMicEnabled ? (
            <Mic className="w-5 h-5" />
          ) : (
            <MicOff className="w-5 h-5" />
          )}
        </ThreeDButton>

        <ThreeDButton
          variant={isCameraEnabled ? 'secondary' : 'danger'}
          size="md"
          isCircle
          onClick={onToggleCamera}
        >
          {isCameraEnabled ? (
            <Camera className="w-5 h-5" />
          ) : (
            <CameraOff className="w-5 h-5" />
          )}
        </ThreeDButton>

        <ThreeDButton
          variant={isScreenSharing ? 'info' : 'secondary'}
          size="md"
          isCircle
          onClick={onToggleScreenShare}
        >
          <Monitor className="w-5 h-5" />
        </ThreeDButton>

        <ThreeDButton
          variant="danger"
          size="md"
          isCircle
          onClick={onLeave}
        >
          <PhoneOff className="w-5 h-5" />
        </ThreeDButton>
      </div>
    </div>
  );
}