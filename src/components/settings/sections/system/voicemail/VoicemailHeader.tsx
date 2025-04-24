import React from 'react';
import { HelpCircle } from 'lucide-react';

export function VoicemailHeader() {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium text-gray-800">Voicemail Greeting</h3>
      <button
        className="text-gray-400 hover:text-gray-600"
        onClick={() => alert("Voicemail greeting helps callers know they have reached the right place and what information to leave.")}
      >
        <HelpCircle className="w-5 h-5" />
      </button>
    </div>
  );
}