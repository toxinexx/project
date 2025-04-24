import React, { useState } from 'react';
import { Brain, HelpCircle, Check } from 'lucide-react';
import { Input } from '../../controls/Input';

export function AISettings() {
  const [useOwnAccount, setUseOwnAccount] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showSavedIndicator, setShowSavedIndicator] = useState(false);

  const handleSaveKey = () => {
    localStorage.setItem('openai_api_key', apiKey);
    setShowSavedIndicator(true);
    setTimeout(() => setShowSavedIndicator(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <Brain className="w-5 h-5" />
          AI Configuration
        </h3>
        <button
          className="text-gray-400 hover:text-gray-600"
          onClick={() => alert('AI features are used for voicemail greetings and automated voice responses.')}
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6 pl-7">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">ChatGPT Account</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!useOwnAccount}
                  onChange={() => setUseOwnAccount(false)}
                  className="text-blue-600"
                />
                <span className="text-sm text-blue-800">Use our ChatGPT account</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={useOwnAccount}
                  onChange={() => setUseOwnAccount(true)}
                  className="text-blue-600"
                />
                <span className="text-sm text-blue-800">Use my own account</span>
              </label>
            </div>

            {useOwnAccount && (
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    label="OpenAI API Key"
                    value={apiKey}
                    onChange={setApiKey}
                    type="password"
                    placeholder="sk-..."
                    icon={Brain}
                  />
                  {showSavedIndicator && (
                    <div className="absolute right-0 top-0 mt-7 mr-3 text-green-500 flex items-center">
                      <Check className="w-4 h-4" />
                      <span className="text-sm ml-1">Saved</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSaveKey}
                  disabled={!apiKey.startsWith('sk-')}
                  className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 
                    transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save API Key
                </button>
              </div>
            )}
          </div>
        </div>

        {useOwnAccount && (
          <div className="text-sm text-gray-500">
            Don't have an API key?{' '}
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              Get one from OpenAI →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}