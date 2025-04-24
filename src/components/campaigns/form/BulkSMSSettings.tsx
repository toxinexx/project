import React from 'react';
import { MessageSquare } from 'lucide-react';

interface BulkSMSSettingsProps {
  messageTemplate: string;
  onMessageTemplateChange: (template: string) => void;
}

export function BulkSMSSettings({ messageTemplate, onMessageTemplateChange }: BulkSMSSettingsProps) {
  return (
    <div className="space-y-4 border-t pt-4 mt-4">
      <h3 className="text-lg font-medium text-gray-800">SMS Settings</h3>
      
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium text-gray-700">Message Template</label>
          <span className="text-xs text-gray-500">
            Use {'{name}'} to include recipient's name
          </span>
        </div>
        <div className="relative">
          <MessageSquare className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
          <textarea
            value={messageTemplate}
            onChange={(e) => onMessageTemplateChange(e.target.value)}
            placeholder="Hi {name}, this is a message template..."
            className="w-full pl-10 pr-3 py-2 border rounded-md resize-none h-24"
          />
          <div className="mt-1 text-right text-sm text-gray-500">
            <span>{messageTemplate.length}</span>
            <span className="text-gray-400">/160 characters</span>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-500">
        Message will be personalized for each recipient
      </div>
    </div>
  );
}