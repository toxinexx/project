import React from 'react';
import { CallButton } from './CallButton';
import { SMSButton } from './SMSButton';
import { CallControls } from './CallControls';

interface CallActionsProps {
  onCall: () => void;
  onSMS: () => void;
  onTransfer: () => void;
  onMerge: () => void;
  onMute: () => void;
  disabled?: boolean;
  status?: 'idle' | 'calling' | 'connected';
  isMuted?: boolean;
}

export function CallActions({
  onCall,
  onSMS,
  onTransfer,
  onMerge,
  onMute,
  disabled,
  status = 'idle',
  isMuted = false
}: CallActionsProps) {
  return (
    <div className="space-y-4">
      {/* Bottom action buttons in iPhone style */}
      <div className="flex justify-center gap-6 sm:gap-8">
        <SMSButton onClick={onSMS} disabled={disabled} />
        <CallButton onClick={onCall} status={status} disabled={disabled} />
      </div>
      
      {status === 'connected' && (
        <CallControls
          onTransfer={onTransfer}
          onMerge={onMerge}
          onMute={onMute}
          isMuted={isMuted}
        />
      )}
    </div>
  );
}