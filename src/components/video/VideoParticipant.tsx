import React, { useEffect, useRef } from 'react';
import { User } from 'lucide-react';
import { useParticipantTracks } from './hooks/useParticipantTracks';

interface VideoParticipantProps {
  participant: any; // Twilio.Video.Participant
}

export function VideoParticipant({ participant }: VideoParticipantProps) {
  const { videoTrack, audioTrack, isVideoEnabled, isAudioEnabled } = useParticipantTracks(participant);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (videoTrack && videoRef.current) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTrack]);

  useEffect(() => {
    if (audioTrack && audioRef.current) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTrack]);

  return (
    <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
      {isVideoEnabled ? (
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <User className="w-16 h-16 text-gray-400" />
        </div>
      )}
      <audio ref={audioRef} autoPlay />
      
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
        <span className="px-2 py-1 bg-black/50 text-white text-sm rounded">
          {participant.identity}
        </span>
        {!isAudioEnabled && (
          <span className="px-2 py-1 bg-red-500/90 text-white text-sm rounded">
            Muted
          </span>
        )}
      </div>
    </div>
  );
}