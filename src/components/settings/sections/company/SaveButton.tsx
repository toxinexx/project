import React from 'react';
import { Save, Check } from 'lucide-react';

interface SaveButtonProps {
  onClick: () => void;
  isSaving: boolean;
  showSuccess: boolean;
  disabled?: boolean;
}

export function SaveButton({ onClick, isSaving, showSuccess, disabled }: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isSaving}
      className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2
        ${showSuccess 
          ? 'bg-green-600 hover:bg-green-700' 
          : 'bg-blue-600 hover:bg-blue-700'} 
        text-white disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {showSuccess ? (
        <>
          <Check className="w-4 h-4" />
          Saved!
        </>
      ) : (
        <>
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </>
      )}
    </button>
  );
}