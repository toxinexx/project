import { useState, useEffect, useCallback } from 'react';
import type { Room, LocalTrack, RemoteParticipant } from 'twilio-video';

interface UseVideoRoomProps {
  roomName: string;
  token: string;
}

interface VideoRoom {
  room: Room | null;
  participants: RemoteParticipant[];
  isMicEnabled: boolean;
  isCameraEnabled: boolean;
  isScreenSharing: boolean;
  toggleMic: () => void;
  toggleCamera: () => void;
  toggleScreenShare: () => Promise<void>;
  leaveRoom: () => void;
}

export function useVideoRoom({ roomName, token }: UseVideoRoomProps): VideoRoom {
  const [room, setRoom] = useState<Room | null>(null);
  const [participants, setParticipants] = useState<RemoteParticipant[]>([]);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // Mock video functionality in development
  const isDevelopment = import.meta.env.DEV;

  useEffect(() => {
    if (isDevelopment) {
      // Simulate room connection in development
      const mockRoom = {
        disconnect: () => console.log('Mock room disconnected'),
        localParticipant: {
          audioTracks: new Map(),
          videoTracks: new Map()
        }
      };
      setRoom(mockRoom as any);
      return;
    }

    // In production, this would connect to Twilio Video
    const connectToRoom = async () => {
      try {
        // Actual Twilio Video connection would happen here
        console.log('Connecting to room:', roomName);
      } catch (error) {
        console.error('Failed to connect to room:', error);
      }
    };

    connectToRoom();

    return () => {
      room?.disconnect();
    };
  }, [roomName, token, isDevelopment]);

  const toggleMic = useCallback(() => {
    if (isDevelopment) {
      setIsMicEnabled(!isMicEnabled);
      return;
    }

    if (room?.localParticipant) {
      room.localParticipant.audioTracks.forEach(track => {
        if (isMicEnabled) {
          track.track.disable();
        } else {
          track.track.enable();
        }
      });
      setIsMicEnabled(!isMicEnabled);
    }
  }, [room, isMicEnabled, isDevelopment]);

  const toggleCamera = useCallback(() => {
    if (isDevelopment) {
      setIsCameraEnabled(!isCameraEnabled);
      return;
    }

    if (room?.localParticipant) {
      room.localParticipant.videoTracks.forEach(track => {
        if (isCameraEnabled) {
          track.track.disable();
        } else {
          track.track.enable();
        }
      });
      setIsCameraEnabled(!isCameraEnabled);
    }
  }, [room, isCameraEnabled, isDevelopment]);

  const toggleScreenShare = useCallback(async () => {
    if (isDevelopment) {
      setIsScreenSharing(!isScreenSharing);
      return;
    }

    if (!room?.localParticipant) return;

    try {
      if (!isScreenSharing) {
        const stream = await navigator.mediaDevices.getDisplayMedia();
        // Implementation for actual screen sharing would go here
        setIsScreenSharing(true);
      } else {
        // Implementation for stopping screen share would go here
        setIsScreenSharing(false);
      }
    } catch (error) {
      console.error('Failed to toggle screen share:', error);
    }
  }, [room, isScreenSharing, isDevelopment]);

  const leaveRoom = useCallback(() => {
    if (room) {
      room.disconnect();
      setRoom(null);
    }
  }, [room]);

  return {
    room,
    participants,
    isMicEnabled,
    isCameraEnabled,
    isScreenSharing,
    toggleMic,
    toggleCamera,
    toggleScreenShare,
    leaveRoom
  };
}