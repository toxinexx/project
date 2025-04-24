import React, { useState } from 'react';
import { Send, Image, X, Facebook, Instagram, Linkedin, GitBranch as BrandTiktok, Brain, Calendar, Clock } from 'lucide-react';
import { useSocialAccounts } from './hooks/useSocialAccounts';
import { AIContentGenerator } from './AIContentGenerator';
import { DateTimePicker } from './DateTimePicker';
import { ThreeDButton } from '../ui/3DButton';

export function SocialPostComposer() {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const { accounts } = useSocialAccounts();

  const platforms = [
    { 
      id: 'facebook', 
      icon: Facebook, 
      color: 'text-[#1877F2]',
      activeColor: 'bg-[#1877F2]',
      hoverColor: 'hover:bg-[#1877F2]/90'
    },
    { 
      id: 'instagram', 
      icon: Instagram,
      color: 'text-[#DD2A7B]',
      activeColor: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
      hoverColor: 'hover:opacity-90'
    },
    { 
      id: 'linkedin', 
      icon: Linkedin,
      color: 'text-[#0A66C2]',
      activeColor: 'bg-[#0A66C2]',
      hoverColor: 'hover:bg-[#0A66C2]/90'
    },
    { 
      id: 'tiktok', 
      icon: BrandTiktok,
      color: 'text-[#000000]',
      activeColor: 'bg-[#000000]',
      hoverColor: 'hover:bg-[#000000]/90'
    }
  ];

  const handlePost = () => {
    if (!content.trim() || selectedPlatforms.length === 0) return;
    
    const postData = {
      content,
      platforms: selectedPlatforms,
      image,
      scheduledDate: scheduledDate?.toISOString()
    };
    
    console.log('Posting:', postData);
    
    // Reset form
    setContent('');
    setSelectedPlatforms([]);
    setImage(null);
    setScheduledDate(null);
    setIsScheduling(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleGeneratedContent = (generatedContent: string) => {
    setContent(generatedContent);
    setShowAIGenerator(false);
  };

  return (
    <div className="crm-tile p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Create Post</h2>
        <div className="flex gap-3">
          {platforms.map(({ id, icon: Icon, color, activeColor }) => {
            const isConnected = accounts.some(a => a.platform === id);
            const isSelected = selectedPlatforms.includes(id);
            
            return (
              <button
                key={id}
                onClick={() => isConnected && togglePlatform(id)}
                disabled={!isConnected}
                className={`relative p-2 rounded-lg transition-all transform hover:scale-110 ${
                  isConnected
                    ? isSelected
                      ? `${activeColor} text-white ring-2 ring-offset-2 ring-purple-500`
                      : `${color} hover:bg-gray-50`
                    : 'text-gray-300 cursor-not-allowed'
                }`}
                title={isConnected ? `Post to ${id}` : `${id} not connected`}
              >
                <Icon className="w-5 h-5" />
                {isSelected && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full">
                    <span className="absolute animate-ping w-2 h-2 rounded-full bg-green-500 opacity-75" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {showAIGenerator && (
        <AIContentGenerator
          onGenerate={handleGeneratedContent}
          onClose={() => setShowAIGenerator(false)}
        />
      )}

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-3 border rounded-lg resize-none h-32 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
      />

      {image && (
        <div className="relative mt-2 inline-block">
          <img
            src={image}
            alt="Upload preview"
            className="max-w-xs rounded-lg border"
          />
          <button
            onClick={() => setImage(null)}
            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transform hover:scale-110 transition-transform"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2">
          <label className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors hover:bg-gray-100 rounded-full">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Image className="w-5 h-5" />
          </label>
          
          <button
            onClick={() => setShowAIGenerator(true)}
            className="p-2 text-purple-500 hover:text-purple-700 hover:bg-purple-50 rounded-full transition-colors"
            title="Generate with AI"
          >
            <Brain className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsScheduling(!isScheduling)}
            className={`p-2 rounded-full transition-colors ${
              isScheduling 
                ? 'text-purple-600 bg-purple-50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
            title="Schedule post"
          >
            <Calendar className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          {isScheduling && (
            <DateTimePicker
              selectedDate={scheduledDate}
              onDateChange={setScheduledDate}
              minDate={new Date()}
            />
          )}
          
          <button
            onClick={handlePost}
            disabled={!content.trim() || selectedPlatforms.length === 0}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
              transition-all transform hover:scale-105 hover:-translate-y-1
              flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed
              disabled:hover:scale-100 disabled:hover:translate-y-0"
          >
            {isScheduling ? (
              <>
                <Clock className="w-4 h-4" />
                Schedule
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Post
              </>
            )}
            {selectedPlatforms.length > 0 && ` (${selectedPlatforms.length})`}
          </button>
        </div>
      </div>
    </div>
  );
}