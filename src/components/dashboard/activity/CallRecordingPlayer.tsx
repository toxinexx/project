import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Download, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { useCallRecordings } from '../../../hooks/useCallRecordings';
import { useCallPlayback } from '../hooks/useCallPlayback';

interface CallRecordingPlayerProps {
  callId: string;
}

export function CallRecordingPlayer({ callId }: CallRecordingPlayerProps) {
  const { isLoading, error, getRecording, downloadRecording } = useCallRecordings();
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { isPlaying, progress, togglePlayback } = useCallPlayback();

  useEffect(() => {
    const loadRecording = async () => {
      const recording = await getRecording(callId);
      if (recording) {
        setDuration(recording.duration);
        if (audioRef.current) {
          audioRef.current.src = recording.url;
        }
      }
    };
    loadRecording();
  }, [callId, getRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const time = duration * percent;
    
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-24">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 text-sm bg-red-50 rounded-lg">
        Failed to load recording
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <audio ref={audioRef} className="hidden" />
      
      {/* Progress bar */}
      <div 
        ref={progressRef}
        onClick={handleProgressClick}
        className="relative h-3 bg-gray-200 rounded-full overflow-hidden cursor-pointer group touch-pan-x"
      >
        <div 
          className="absolute inset-y-0 left-0 bg-blue-500 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 px-0.5">
        <span>{formatTime(duration * (progress / 100))}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1">
          <button
            onClick={skipBackward}
            className="p-3 text-gray-600 hover:text-gray-800 active:bg-gray-100 
              rounded-full transition-colors touch-manipulation"
            title="Skip back 10 seconds"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={togglePlayback}
            className="p-3 text-gray-600 hover:text-gray-800 active:bg-gray-100 
              rounded-full transition-colors touch-manipulation"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          <button
            onClick={skipForward}
            className="p-3 text-gray-600 hover:text-gray-800 active:bg-gray-100 
              rounded-full transition-colors touch-manipulation"
            title="Skip forward 10 seconds"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleMute}
            className="p-3 text-gray-600 hover:text-gray-800 active:bg-gray-100 
              rounded-full transition-colors touch-manipulation"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <button
            onClick={() => downloadRecording(callId)}
            className="p-3 text-gray-600 hover:text-gray-800 active:bg-gray-100 
              rounded-full transition-colors touch-manipulation"
            title="Download recording"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}