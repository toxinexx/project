import { useState, useEffect, useCallback } from 'react';

export function useCallPlayback(recordingUrl?: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (recordingUrl) {
      const audioElement = new Audio(recordingUrl);
      setAudio(audioElement);

      audioElement.addEventListener('timeupdate', () => {
        const percent = (audioElement.currentTime / audioElement.duration) * 100;
        setProgress(percent);
      });

      audioElement.addEventListener('ended', () => {
        setIsPlaying(false);
        setProgress(0);
      });

      return () => {
        audioElement.pause();
        audioElement.remove();
      };
    }
  }, [recordingUrl]);

  const togglePlayback = useCallback(() => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }, [audio, isPlaying]);

  return {
    isPlaying,
    progress,
    togglePlayback
  };
}