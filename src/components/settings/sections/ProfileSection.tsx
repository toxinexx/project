import React, { useRef } from 'react';
import { UserCircle } from 'lucide-react';
import { useUserProfile } from '../../user/hooks/useUserProfile';

export function ProfileSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { logo, updateLogo } = useUserProfile();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
        <UserCircle className="w-5 h-5" />
        Profile
      </h3>
      <div className="space-y-4 pl-7">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
            {logo ? (
              <img src={logo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <UserCircle className="w-10 h-10 text-gray-500" />
            )}
          </div>
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
        </div>
      </div>
    </div>
  );
}