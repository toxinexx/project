import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import { Contact } from '../../../types/campaign';

interface FileUploaderProps {
  onUpload: (contacts: Contact[]) => void;
}

export function FileUploader({ onUpload }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        // Add unique IDs to contacts
        const contactsWithIds = results.data.map((contact: any) => ({
          ...contact,
          id: crypto.randomUUID()
        }));
        onUpload(contactsWithIds);
      },
      error: (error) => {
        console.error('Error parsing file:', error);
      }
    });
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
        transition-colors ${
          isDragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
    >
      <input {...getInputProps()} />
      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-600">
        {isDragActive
          ? 'Drop your file here'
          : 'Drag and drop your CSV file here, or click to select'}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Supports CSV files
      </p>
    </div>
  );
}