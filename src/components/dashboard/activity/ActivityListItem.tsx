import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Activity } from '../../../types/activity';
import { CallRecordingPlayer } from './CallRecordingPlayer';
import { ThreeDButton } from '../../ui/3DButton';

interface ActivityListItemProps {
  activity: Activity;
}

export function ActivityListItem({ activity }: ActivityListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getIconBackground = () => {
    switch (activity.type) {
      case 'incoming-call':
        return 'bg-green-100';
      case 'outgoing-call':
        return 'bg-blue-100';
      case 'sms':
        return 'bg-purple-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="group">
      <div className="p-4 hover:bg-gray-50 active:bg-gray-100 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-full ${getIconBackground()} flex-shrink-0`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-gray-800 truncate">{activity.name}</h3>
              <p className="text-sm text-gray-500 truncate">{activity.number}</p>
              {activity.type === 'sms' && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{activity.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 ml-4">
            {activity.type !== 'sms' && (
              <p className="text-sm font-medium text-gray-600">{activity.duration}</p>
            )}
            <p className="text-sm text-gray-500">{activity.timestamp}</p>

            {(activity.type === 'incoming-call' || activity.type === 'outgoing-call') && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="p-2 -mr-2 text-gray-400 hover:text-gray-600 active:bg-gray-100 
                  rounded-full transition-colors touch-manipulation"
              >
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </div>
        
        {isExpanded && activity.type === 'sms' && (
          <div className="mt-3 flex justify-end">
            <ThreeDButton
              variant="primary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                // Navigate to SMS tab
                const smsTab = document.querySelector('[data-tab="sms"]');
                if (smsTab) {
                  (smsTab as HTMLElement).click();
                }
              }}
            >
              Reply
            </ThreeDButton>
          </div>
        )}
      </div>

      {isExpanded && (activity.type === 'incoming-call' || activity.type === 'outgoing-call') && (
        <div className="px-4 pb-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-primary-100">
            <CallRecordingPlayer callId={activity.id.toString()} />
          </div>
        </div>
      )}
    </div>
  );
}