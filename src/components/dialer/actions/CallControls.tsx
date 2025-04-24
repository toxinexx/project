import React from 'react';
import { PhoneForwarded, Users, Mic, MicOff } from 'lucide-react';
import { ControlButton } from './ControlButton';

interface CallControlsProps {
  onTransfer: () => void;
  onMerge: () => void;
  onMute: () => void;
  isMuted: boolean;
}

export function CallControls({
  onTransfer,
  onMerge,
  onMute,
  isMuted
}: CallControlsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <ControlButton
        icon={PhoneForwarded}
        label="Transfer"
        onClick={onTransfer}
        color="amber"
        description="Transfer call"
      />
      <ControlButton
        icon={Users}
        label="Merge"
        onClick={onMerge}
        color="purple"
        description="Merge calls"
      />
      <ControlButton
        icon={isMuted ? MicOff : Mic}
        label={isMuted ? "Unmute" : "Mute"}
        onClick={onMute}
        color={isMuted ? "red" : "gray"}
        active={isMuted}
        description="Toggle mute"
      />
    </div>
  );
}