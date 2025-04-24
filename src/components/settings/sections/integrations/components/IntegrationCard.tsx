import React from 'react';
import { LucideIcon, Check, ExternalLink } from 'lucide-react';

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  status: 'connected' | 'not_connected';
  apiKey?: string;
  docsUrl?: string;
  connectLabel?: string;
  features?: string[];
}

export function IntegrationCard({
  title,
  description,
  icon: Icon,
  iconColor,
  status,
  apiKey,
  docsUrl,
  connectLabel = 'Connect',
  features
}: IntegrationCardProps) {
  return (
    <div className="border rounded-lg">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg ${iconColor} bg-opacity-10`}>
              <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">{title}</h3>
              <p className="mt-1 text-sm text-gray-600">{description}</p>
            </div>
          </div>

          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${status === 'connected'
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {status === 'connected' ? (
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Connected
              </span>
            ) : (
              connectLabel
            )}
          </button>
        </div>

        {features && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500" />
                {feature}
              </div>
            ))}
          </div>
        )}

        {(apiKey || docsUrl) && (
          <div className="mt-4 pt-4 border-t flex items-center justify-between">
            {apiKey && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">API Key:</span>
                <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
                  {apiKey}
                </code>
              </div>
            )}
            {docsUrl && (
              <a
                href={docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View Documentation
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}