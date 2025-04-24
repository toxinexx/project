import React, { useState, useEffect } from 'react';
import { Phone, X, Check, Clock, VoicemailIcon, XCircle } from 'lucide-react';

interface Line {
  id: string;
  number: string;
  status: 'available' | 'in-use' | 'disabled' | 'answered';
  currentCall?: {
    name: string;
    duration: string;
  };
}

interface PowerDialerLinesProps {
  lines: Line[];
  onLineToggle: (lineId: string) => void;
  isAutoDialing: boolean;
  type: 'available' | 'active';
}

export function PowerDialerLines({ lines, onLineToggle, isAutoDialing, type }: PowerDialerLinesProps) {
  const [dialingIndex, setDialingIndex] = useState(0);
  const [nameIndex, setNameIndex] = useState(0);
  const [callOutcomes, setCallOutcomes] = useState<('hangup' | 'voicemail' | 'not_interested')[]>([
    'hangup',
    'voicemail',
    'not_interested',
    'hangup'
  ]);

  // Sample names for rotation
  const names = [
    'John Smith',
    'Sarah Johnson',
    'Michael Brown',
    'Emily Davis',
    'Robert Wilson',
    'Lisa Anderson',
    'David Miller',
    'Jennifer Taylor'
  ];

  // Sample numbers for rotation
  const numbers = [
    '+1 (555) 123-4567',
    '+1 (555) 234-5678',
    '+1 (555) 345-6789',
    '+1 (555) 456-7890',
    '+1 (555) 567-8901',
    '+1 (555) 678-9012',
    '+1 (555) 789-0123',
    '+1 (555) 890-1234'
  ];

  // Rotate through names, numbers, and outcomes for dialing animation
  useEffect(() => {
    if (isAutoDialing && type === 'active') {
      const nameInterval = setInterval(() => {
        setNameIndex((prev) => (prev + 1) % names.length);
      }, 2000);

      const numberInterval = setInterval(() => {
        setDialingIndex((prev) => (prev + 1) % numbers.length);
      }, 4000);

      // Rotate through outcomes at different intervals for each call
      const outcomeInterval2 = setInterval(() => {
        setCallOutcomes(prev => {
          const outcomes: ('hangup' | 'voicemail' | 'not_interested')[] = ['hangup', 'voicemail', 'not_interested'];
          return [
            outcomes[(outcomes.indexOf(prev[0]) + 1) % outcomes.length],
            prev[1],
            prev[2],
            prev[3]
          ];
        });
      }, 3000); // Call 2 switches every 3 seconds

      const outcomeInterval3 = setInterval(() => {
        setCallOutcomes(prev => {
          const outcomes: ('hangup' | 'voicemail' | 'not_interested')[] = ['hangup', 'voicemail', 'not_interested'];
          return [
            prev[0],
            outcomes[(outcomes.indexOf(prev[1]) + 1) % outcomes.length],
            prev[2],
            prev[3]
          ];
        });
      }, 5000); // Call 3 switches every 5 seconds

      const outcomeInterval4 = setInterval(() => {
        setCallOutcomes(prev => {
          const outcomes: ('hangup' | 'voicemail' | 'not_interested')[] = ['hangup', 'voicemail', 'not_interested'];
          return [
            prev[0],
            prev[1],
            prev[2],
            outcomes[(outcomes.indexOf(prev[3]) + 1) % outcomes.length]
          ];
        });
      }, 8000); // Call 4 switches every 8 seconds

      return () => {
        clearInterval(nameInterval);
        clearInterval(numberInterval);
        clearInterval(outcomeInterval2);
        clearInterval(outcomeInterval3);
        clearInterval(outcomeInterval4);
      };
    }
  }, [isAutoDialing, type]);

  const getStatusColor = (status: Line['status']) => {
    switch (status) {
      case 'available':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'in-use':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'answered':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'disabled':
        return 'bg-gray-100 text-gray-500 border-gray-200';
    }
  };

  const getStatusIcon = (status: Line['status']) => {
    switch (status) {
      case 'available':
        return <Check className="w-4 h-4" />;
      case 'in-use':
      case 'answered':
        return <Phone className="w-4 h-4" />;
      case 'disabled':
        return <X className="w-4 h-4" />;
    }
  };

  const getOutcomeStyle = (outcome: 'hangup' | 'voicemail' | 'not_interested') => {
    switch (outcome) {
      case 'hangup':
        return {
          container: 'bg-red-50 border-red-200',
          icon: 'bg-red-100 text-red-600',
          ring: 'bg-red-400/20',
          text: 'text-red-800',
          subtext: 'text-red-600',
          status: 'Hung Up'
        };
      case 'voicemail':
        return {
          container: 'bg-amber-50 border-amber-200',
          icon: 'bg-amber-100 text-amber-600',
          ring: 'bg-amber-400/20',
          text: 'text-amber-800',
          subtext: 'text-amber-600',
          status: 'Left Voicemail'
        };
      case 'not_interested':
        return {
          container: 'bg-gray-50 border-gray-200',
          icon: 'bg-gray-100 text-gray-600',
          ring: 'bg-gray-400/20',
          text: 'text-gray-800',
          subtext: 'text-gray-600',
          status: 'Not Interested'
        };
    }
  };

  if (type === 'available') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {lines.map((line) => (
          <div
            key={line.id}
            className={`p-3 rounded-lg border ${getStatusColor(line.status)} relative group transition-all
              ${isAutoDialing && line.status === 'available' ? 'animate-pulse' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${line.status === 'disabled' ? 'bg-gray-200' : 'bg-white'}`}>
                  {getStatusIcon(line.status)}
                </div>
                <div>
                  <div className="font-medium">{line.number}</div>
                  {line.currentCall && (
                    <div className="text-sm mt-0.5 flex items-center gap-2">
                      <span>{line.currentCall.name}</span>
                      <span className="text-gray-400">•</span>
                      <span>{line.currentCall.duration}</span>
                    </div>
                  )}
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={line.status !== 'disabled'}
                  onChange={() => onLineToggle(line.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                  peer-focus:ring-purple-300 rounded-full peer 
                  peer-checked:after:translate-x-full peer-checked:after:border-white 
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full 
                  after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600">
                </div>
              </label>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Active calls view
  return (
    <div className="space-y-4">
      {/* First call - Live */}
      <div className="transform transition-all hover:scale-[1.02] hover:-translate-y-1">
        <div className="p-5 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-xl shadow-lg animate-[pulse_2s_ease-in-out_infinite] relative overflow-hidden">
          {/* Animated ring effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-400/20 to-red-300/20 blur-lg animate-pulse" />
          
          {/* Content */}
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shadow-inner">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  {/* Ping animation */}
                  <div className="absolute -inset-2">
                    <div className="w-16 h-16 rounded-full bg-red-400/20 animate-ping" />
                  </div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-red-800">John Smith</div>
                  <div className="text-red-600">+1 (555) 123-4567</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="px-3 py-1.5 bg-red-200 text-red-800 rounded-full text-sm font-medium shadow-sm">
                  Live
                </span>
                <div className="flex items-center gap-2 text-red-700 bg-red-100 px-3 py-1.5 rounded-full shadow-sm">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">4:12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other active calls */}
      {callOutcomes.slice(0, 3).map((outcome, index) => {
        const style = getOutcomeStyle(outcome);
        return (
          <div key={index} className={`p-4 ${style.container} border rounded-lg`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-10 h-10 ${style.icon} rounded-full flex items-center justify-center`}>
                    {outcome === 'voicemail' ? (
                      <VoicemailIcon className="w-5 h-5" />
                    ) : outcome === 'not_interested' ? (
                      <XCircle className="w-5 h-5" />
                    ) : (
                      <Phone className="w-5 h-5" />
                    )}
                  </div>
                </div>
                <div>
                  <div className={`font-medium ${style.text}`}>{names[(nameIndex + index) % names.length]}</div>
                  <div className={`text-sm ${style.subtext}`}>{numbers[(dialingIndex + index) % numbers.length]}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 ${style.icon} rounded-full text-xs font-medium`}>
                  {style.status}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}