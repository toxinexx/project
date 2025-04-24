import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ApiKeyDisplayProps {
  apiKey: string;
}

export function ApiKeyDisplay({ apiKey }: ApiKeyDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 mt-4 pt-4 border-t">
      <span className="text-sm text-gray-500">API Key:</span>
      <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
        {apiKey}
      </code>
      <button
        onClick={handleCopy}
        className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}