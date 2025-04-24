import React, { useState } from 'react';
import { Code, Copy, Check, Eye } from 'lucide-react';
import { useWebform } from './webform/hooks/useWebform';
import { WebformPreview } from './webform/WebformPreview';
import { WebformEditor } from './webform/WebformEditor';

export function WebformSection() {
  const { webformHtml, updateWebform } = useWebform();
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const embedCode = `<iframe 
  src="${window.location.origin}/webform" 
  style="width: 100%; height: 500px; border: none;"
  title="Contact Form"
></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="crm-tile">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Webform Integration</h2>
        <p className="mt-1 text-sm text-gray-600">
          Customize and embed your contact form on any website
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* HTML Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800">Form HTML</h3>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 
                hover:bg-gray-200 rounded-md transition-colors"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
          </div>

          <WebformEditor
            value={webformHtml}
            onChange={updateWebform}
          />
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="border rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-4">Preview</h4>
            <WebformPreview html={webformHtml} />
          </div>
        )}

        {/* Embed Code */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-800">Embed Code</h3>
          <div className="relative">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Code className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                  {embedCode}
                </pre>
              </div>
            </div>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-600 
                rounded-md hover:bg-gray-100 transition-colors"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}