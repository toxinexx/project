import React from 'react';
import { ExternalLink } from 'lucide-react';

interface DocsLinkProps {
  url: string;
}

export function DocsLink({ url }: DocsLinkProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
    >
      View Documentation
      <ExternalLink className="w-4 h-4" />
    </a>
  );
}