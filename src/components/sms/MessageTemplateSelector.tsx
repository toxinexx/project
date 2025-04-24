import React from 'react';
import { Check, Copy } from 'lucide-react';
import { ThreeDButton } from '../ui/3DButton';

interface Template {
  id: string;
  name: string;
  content: string;
}

interface MessageTemplateSelectorProps {
  templates: Template[];
  onSelect: (content: string) => void;
  onClose: () => void;
}

export function MessageTemplateSelector({ templates, onSelect, onClose }: MessageTemplateSelectorProps) {
  return (
    <div className="mb-4 bg-white border border-primary-100 rounded-lg shadow-sm">
      <div className="p-3 border-b flex items-center justify-between bg-purple-50">
        <h3 className="font-medium text-purple-800">Select a Template</h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {templates.map((template) => (
          <div 
            key={template.id} 
            className="p-3 border-b hover:bg-gray-50 last:border-b-0"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-800">{template.name}</h4>
              <ThreeDButton
                variant="secondary"
                size="sm"
                icon={Copy}
                onClick={() => onSelect(template.content)}
              >
                Use
              </ThreeDButton>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{template.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}