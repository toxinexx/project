import React from 'react';
import { AlertCircle } from 'lucide-react';

interface WebformEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function WebformEditor({ value, onChange }: WebformEditorProps) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-2">
          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
          <div className="text-sm text-blue-700">
            <p className="font-medium">Important:</p>
            <ul className="mt-1 list-disc list-inside space-y-1">
              <li>Use only HTML form elements</li>
              <li>Form submissions will be handled automatically</li>
              <li>All form data will appear in your dashboard</li>
            </ul>
          </div>
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-64 font-mono text-sm p-4 border rounded-lg 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter your form HTML here..."
      />
    </div>
  );
}