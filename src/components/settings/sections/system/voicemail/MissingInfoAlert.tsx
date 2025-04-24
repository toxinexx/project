import React from 'react';
import { AlertCircle } from 'lucide-react';

interface MissingInfoAlertProps {
  onClose: () => void;
}

export function MissingInfoAlert({ onClose }: MissingInfoAlertProps) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-medium text-amber-800">Company Information Required</h4>
        <p className="mt-1 text-sm text-amber-700">
          Please fill out your company information in the Company Profile section before creating a voicemail greeting.
        </p>
        <button
          onClick={() => {
            onClose();
            // Navigate to company profile section
            const companyTab = document.querySelector('[data-section="company"]');
            companyTab?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          }}
          className="mt-2 text-sm font-medium text-amber-800 hover:text-amber-900"
        >
          Go to Company Profile →
        </button>
      </div>
    </div>
  );
}