import React, { useRef } from 'react';

interface LogoUploadProps {
  onUpload: (logo: string) => void;
}

export function LogoUpload({ onUpload }: LogoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Upload Logo
      </button>
      <p className="mt-2 text-sm text-gray-500">
        Recommended: Square image, at least 200x200px
      </p>
    </div>
  );
}