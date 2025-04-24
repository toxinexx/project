import React, { useEffect, useRef } from 'react';
import { Video, Monitor, Mic, MicOff, Camera, CameraOff } from 'lucide-react';
import { useVideoRoom } from './hooks/useVideoRoom';
import { VideoParticipant } from './VideoParticipant';
import { VideoControls } from './VideoControls';

interface VideoRoomProps {
  roomName: string;
  token: string;
  onLeave: () => void;
}

export function VideoRoom({ roomName, token, onLeave }: VideoRoomProps) {
  const {
    room,
    participants,
    isMicEnabled,
    isCameraEnabled,
    isScreenSharing,
    toggleMic,
    toggleCamera,
    toggleScreenShare,
    leaveRoom
  } = useVideoRoom({ roomName, token });

  const handleLeave = () => {
    leaveRoom();
    onLeave();
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Video Grid */}
      <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
        {participants.map((participant) => (
          <VideoParticipant
            key={participant.identity}
            participant={participant}
          />
        ))}
      </div>

      {/* Controls */}
      <VideoControls
        isMicEnabled={isMicEnabled}
        isCameraEnabled={isCameraEnabled}
        isScreenSharing={isScreenSharing}
        onToggleMic={toggleMic}
        onToggleCamera={toggleCamera}
        onToggleScreenShare={toggleScreenShare}
        onLeave={handleLeave}
      />
    </div>
  );
}