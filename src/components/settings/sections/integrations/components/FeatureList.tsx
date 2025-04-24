import React from 'react';
import { Check } from 'lucide-react';

interface FeatureListProps {
  features: string[];
}

export function FeatureList({ features }: FeatureListProps) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2">
      {features.map((feature) => (
        <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
          <Check className="w-4 h-4 text-green-500" />
          {feature}
        </div>
      ))}
    </div>
  );
}