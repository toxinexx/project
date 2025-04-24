import React from 'react';
import { Brain } from 'lucide-react';

interface ApiKeyAlertProps {
  onClose: () => void;
}

export function ApiKeyAlert({ onClose }: ApiKeyAlertProps) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
      <Brain className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-medium text-amber-800">OpenAI API Key Required</h4>
        <p className="mt-1 text-sm text-amber-700">
          An OpenAI API key is required to generate AI voice greetings. Please configure your API key in the AI settings.
        </p>
        <button
          onClick={() => {
            onClose();
            // Navigate to AI settings section
            const aiTab = document.querySelector('[data-section="ai"]');
            aiTab?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          }}
          className="mt-2 text-sm font-medium text-amber-800 hover:text-amber-900"
        >
          Configure API Key →
        </button>
      </div>
    </div>
  );
}