import React from 'react';
import { Phone, Info } from 'lucide-react';
import { ToggleSwitch } from '../controls/ToggleSwitch';

export function DialerSection() {
  return (
    <div className="crm-tile">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-gray-500" />
          <h2 className="text-xl font-semibold text-gray-800">Dialer Settings</h2>
        </div>
        <p className="mt-1 text-sm text-gray-600">Configure your dialing preferences and behavior</p>
      </div>

      <div className="p-6 space-y-8">
        {/* Preview Mode */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800">Preview Dialing Mode</h3>
              <p className="text-sm text-gray-600 mt-1">
                See contact information before placing calls
              </p>
            </div>
            <ToggleSwitch
              label=""
              checked={false}
              onChange={() => {}}
            />
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">How it works:</p>
                <p>In preview mode, agents can review contact details for 15-30 seconds before the call is placed. This allows for:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Better call preparation</li>
                  <li>Review of previous interactions</li>
                  <li>More personalized conversations</li>
                </ul>
                <p className="mt-2 text-sm">
                  Example: A financial advisor can review client portfolio information before discussing investment options.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progressive Mode */}
        <div className="space-y-4 pt-6 border-t">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800">Progressive Dialing Mode</h3>
              <p className="text-sm text-gray-600 mt-1">
                Automatically place next call after completion
              </p>
            </div>
            <ToggleSwitch
              label=""
              checked={false}
              onChange={() => {}}
            />
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">How it works:</p>
                <p>Progressive dialing automatically initiates the next call when the current one ends. Benefits include:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Increased agent efficiency</li>
                  <li>No manual dialing required</li>
                  <li>Optimized call flow</li>
                </ul>
                <p className="mt-2 text-sm">
                  Example: An appointment setter can move through a list of due-for-checkup patients without delay between calls.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="mt-4 space-y-4 pl-4 border-l-2 border-gray-100">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Delay between calls
              </label>
              <select className="px-3 py-1.5 border rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                <option value="0">No delay</option>
                <option value="5">5 seconds</option>
                <option value="10">10 seconds</option>
                <option value="15">15 seconds</option>
                <option value="30">30 seconds</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Auto-pause after consecutive no-answers
              </label>
              <select className="px-3 py-1.5 border rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                <option value="3">After 3 calls</option>
                <option value="5">After 5 calls</option>
                <option value="10">After 10 calls</option>
                <option value="0">Never</option>
              </select>
            </div>

            <ToggleSwitch
              label="Skip answered numbers on retry"
              checked={true}
              onChange={() => {}}
            />

            <ToggleSwitch
              label="Enable call notes prompt"
              checked={true}
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}