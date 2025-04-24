import React from 'react';
import { Check } from 'lucide-react';
import { FieldMapping } from '../../../types/campaign';

interface FieldMapperProps {
  detectedFields: string[];
  mapping: FieldMapping;
  onChange: (field: string, mappedTo: string) => void;
  onConfirm: () => void;
}

export function FieldMapper({
  detectedFields,
  mapping,
  onChange,
  onConfirm
}: FieldMapperProps) {
  const standardFields = ['name', 'phone', 'email', 'address'];

  return (
    <div className="mt-6 p-6 bg-gray-50 rounded-lg">
      <h4 className="text-lg font-medium text-gray-800 mb-4">Map Fields</h4>
      <p className="text-sm text-gray-600 mb-6">
        We detected the following fields in your file. Please map them to the standard fields below.
      </p>

      <div className="space-y-4">
        {standardFields.map((standardField) => (
          <div key={standardField}>
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
              {standardField}
            </label>
            <select
              value={mapping[standardField] || ''}
              onChange={(e) => onChange(standardField, e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-white"
            >
              <option value="">Select a field</option>
              {detectedFields.map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button
        onClick={onConfirm}
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 
          transition-colors flex items-center gap-2"
      >
        <Check className="w-4 h-4" />
        Confirm Mapping
      </button>
    </div>
  );
}