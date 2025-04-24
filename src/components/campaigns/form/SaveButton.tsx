import React from 'react';
import { Save, Loader2 } from 'lucide-react';
import { ThreeDButton } from '../../ui/3DButton';

interface SaveButtonProps {
  onClick: () => void;
  isSaving: boolean;
  label?: string;
}

export function SaveButton({ onClick, isSaving, label = 'Save Campaign' }: SaveButtonProps) {
  return (
    <ThreeDButton
      onClick={onClick}
      disabled={isSaving}
      variant="primary"
      size="md"
      icon={isSaving ? Loader2 : Save}
    >
      {isSaving ? 'Saving...' : label}
    </ThreeDButton>
  );
}