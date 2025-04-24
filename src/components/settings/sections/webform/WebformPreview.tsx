import React from 'react';

interface WebformPreviewProps {
  html: string;
}

export function WebformPreview({ html }: WebformPreviewProps) {
  return (
    <div 
      className="border rounded-lg p-4 bg-white min-h-[300px]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}