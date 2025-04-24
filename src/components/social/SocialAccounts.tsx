import React from 'react';
import { Facebook, Instagram, Linkedin, GitBranch as BrandTiktok, Youtube } from 'lucide-react';
import { useSocialAccounts } from './hooks/useSocialAccounts';

export function SocialAccounts() {
  const { accounts, connectAccount } = useSocialAccounts();

  const platforms = [
    { 
      id: 'facebook', 
      name: 'Facebook', 
      icon: Facebook, 
      color: 'bg-[#1877F2]',
      hoverColor: 'hover:bg-[#1877F2]/90',
      iconColor: 'text-[#1877F2]'
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      icon: Instagram,
      color: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
      hoverColor: 'hover:opacity-90',
      iconColor: 'text-[#DD2A7B]'
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      icon: Linkedin,
      color: 'bg-[#0A66C2]',
      hoverColor: 'hover:bg-[#0A66C2]/90',
      iconColor: 'text-[#0A66C2]'
    },
    { 
      id: 'tiktok', 
      name: 'TikTok', 
      icon: BrandTiktok,
      color: 'bg-[#000000]',
      hoverColor: 'hover:bg-[#000000]/90',
      iconColor: 'text-[#000000]'
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      icon: Youtube,
      color: 'bg-[#FF0000]',
      hoverColor: 'hover:bg-[#FF0000]/90',
      iconColor: 'text-[#FF0000]'
    }
  ];

  return (
    <div className="crm-tile p-4 sm:p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Connected Accounts</h2>
      <div className="grid grid-cols-5 gap-3">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const isConnected = accounts.some(a => a.platform === platform.id);
          
          return (
            <button
              key={platform.id}
              onClick={() => connectAccount(platform.id)}
              className={`group relative overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                isConnected 
                  ? `${platform.color} text-white shadow-lg hover:shadow-xl ${platform.hoverColor}`
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {!isConnected && (
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 grid grid-cols-2 gap-0.5">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="w-full h-full bg-gray-900/20" />
                    ))}
                  </div>
                </div>
              )}

              <div className="relative p-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="transform transition-transform group-hover:scale-110">
                    <Icon className={`w-6 h-6 ${isConnected ? 'text-white' : platform.iconColor}`} />
                  </div>
                  <span className={`text-xs font-medium ${isConnected ? 'text-white' : 'text-gray-700'}`}>
                    {platform.name}
                  </span>
                  
                  {!isConnected && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span className="w-2 h-2 rounded-full border-2 border-current animate-pulse" />
                      Connect
                    </div>
                  )}
                </div>

                {isConnected && (
                  <div className="absolute top-2 right-2">
                    <span className="flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}