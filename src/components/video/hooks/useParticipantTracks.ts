import { useState, useEffect } from 'react';

export function useParticipantTracks(participant: any) {
  const [videoTrack, setVideoTrack] = useState<any>(null);
  const [audioTrack, setAudioTrack] = useState<any>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  useEffect(() => {
    const trackSubscribed = (track: any) => {
      if (track.kind === 'video') {
        setVideoTrack(track);
        setIsVideoEnabled(track.isEnabled);
      } else if (track.kind === 'audio') {
        setAudioTrack(track);
        setIsAudioEnabled(track.isEnabled);
      }
    };

    const trackUnsubscribed = (track: any) => {
      if (track.kind === 'video') {
        setVideoTrack(null);
      } else if (track.kind === 'audio') {
        setAudioTrack(null);
      }
    };

    const trackEnabled = (track: any) => {
      if (track.kind === 'video') setIsVideoEnabled(true);
      if (track.kind === 'audio') setIsAudioEnabled(true);
    };

    const trackDisabled = (track: any) => {
      if (track.kind === 'video') setIsVideoEnabled(false);
      if (track.kind === 'audio') setIsAudioEnabled(false);
    };

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);
    participant.on('trackEnabled', trackEnabled);
    participant.on('trackDisabled', trackDisabled);

    return () => {
      participant.off('trackSubscribed', trackSubscribed);
      participant.off('trackUnsubscribed', trackUnsubscribed);
      participant.off('trackEnabled', trackEnabled);
      participant.off('trackDisabled', trackDisabled);
    };
  }, [participant]);

  return {
    videoTrack,
    audioTrack,
    isVideoEnabled,
    isAudioEnabled
  };
}