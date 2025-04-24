import React, { useState } from 'react';
import { Video as VideoIcon, Plus } from 'lucide-react';
import { VideoRoom } from '../video/VideoRoom';
import { generateTwilioToken } from '../../utils/twilioUtils';

export function VideoSection() {
  const [isInRoom, setIsInRoom] = useState(false);
  const [roomName, setRoomName] = useState('');

  const handleJoinRoom = () => {
    if (!roomName.trim()) return;
    setIsInRoom(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {!isInRoom ? (
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Video Meetings</h2>
            <button
              onClick={() => setRoomName(`meeting-${Date.now()}`)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg 
                hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Meeting
            </button>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name"
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 
                focus:border-blue-500"
            />
            <button
              onClick={handleJoinRoom}
              disabled={!roomName.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center gap-2"
            >
              <VideoIcon className="w-4 h-4" />
              Join
            </button>
          </div>
        </div>
      ) : (
        <div className="h-[600px]">
          <VideoRoom
            roomName={roomName}
            token={generateTwilioToken('user')}
            onLeave={() => setIsInRoom(false)}
          />
        </div>
      )}
    </div>
  );
}