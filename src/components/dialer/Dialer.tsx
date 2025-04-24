import React, { useState } from 'react';
import { SimpleDialer } from './simple/SimpleDialer';
import { BeastModeSelector } from './BeastModeSelector';
import { useDialer } from './hooks/useDialer';
import { useCallState } from '../../contexts/CallContext';
import { Switch } from '../ui/Switch';
import { Play, PauseCircle, Phone, ClockIcon, CalendarClock, User, FileText, Plus, ChevronDown, X, BarChart2 } from 'lucide-react';
import { ThreeDButton } from '../ui/3DButton';
import { RecentCalls } from '../calls/RecentCalls';
import { ScriptSection } from './script/ScriptSection';
import { PowerDialerLines } from './PowerDialerLines';
import { NewCampaignModal } from '../campaigns/NewCampaignModal';
import { RVMSettings } from './RVMSettings';
import { StatsModal } from './StatsModal';
import { SMSAutomation } from './SMSAutomation';

export function Dialer() {
  const [powerDialer, setPowerDialer] = useState(false);
  const [isAutoDialing, setIsAutoDialing] = useState(false);
  const [showScripts, setShowScripts] = useState(false);
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [useRVM, setUseRVM] = useState(false);
  const [selectedDropId, setSelectedDropId] = useState('');
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [useSMSAutomation, setUseSMSAutomation] = useState(false);
  const [callStats, setCallStats] = useState({
    totalCalls: 24,
    connected: 18,
    voicemails: 4,
    notInterested: 2,
    avgDuration: '2:45',
    totalDuration: '1h 15m'
  });
  
  const [lines] = useState([
    {
      id: '1',
      number: '+1 (555) 123-4567',
      status: 'available' as const
    },
    {
      id: '2',
      number: '+1 (555) 234-5678',
      status: 'available' as const
    },
    {
      id: '3',
      number: '+1 (555) 345-6789',
      status: 'available' as const
    },
    {
      id: '4',
      number: '+1 (555) 456-7890',
      status: 'available' as const
    }
  ]);
  
  const {
    number,
    isReady,
    error,
    callStatus,
    handleNumberChange,
    handleCall,
    handleSMS
  } = useDialer();

  const { isIncomingCall, isOutgoingCall } = useCallState();

  // Sample recent calls data
  const recentCalls = [
    { id: 1, name: 'John Doe', number: '+1 (555) 123-4567', duration: '5:23', type: 'outgoing', timestamp: '2 hours ago' },
    { id: 2, name: 'Jane Smith', number: '+1 (555) 987-6543', duration: '3:45', type: 'incoming', timestamp: '4 hours ago' },
    { id: 3, name: 'Mike Johnson', number: '+1 (555) 456-7890', duration: '1:30', type: 'outgoing', timestamp: 'Yesterday' },
    { id: 4, name: 'Sarah Wilson', number: '+1 (555) 234-5678', duration: '2:15', type: 'incoming', timestamp: 'Yesterday' },
  ];

  const toggleAutoDial = () => {
    if (isAutoDialing) {
      // When stopping, show the stats modal
      setShowStatsModal(true);
    }
    setIsAutoDialing(!isAutoDialing);
  };

  const handleLineToggle = (lineId: string) => {
    // In a real app, this would toggle the line status
    console.log('Toggling line:', lineId);
  };

  const handleCreateCampaign = (campaign: any) => {
    // In a real app, this would create the campaign and update the list
    console.log('Creating new campaign:', campaign);
    setShowNewCampaignModal(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6 py-4 sm:py-6">
      {/* Header with Power Dialer Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Phone Dialer</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Power Dialer</span>
          <Switch 
            checked={powerDialer} 
            onCheckedChange={setPowerDialer}
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Side - Phone Dialer */}
        <div className="col-span-1 space-y-4">
          {powerDialer ? (
            <>
              {/* Campaign Selection */}
              <div className="crm-tile p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Campaign
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none cursor-pointer text-gray-700 font-medium pr-10"
                    onChange={(e) => {
                      if (e.target.value === "new") {
                        setShowNewCampaignModal(true);
                        e.target.value = ''; // Reset select
                      }
                    }}
                  >
                    <option value="">Select a campaign to start dialing</option>
                    <option value="new" className="font-semibold text-purple-600">
                      + Create New Campaign
                    </option>
                    <option disabled className="text-gray-400">
                      ───────────────────────────
                    </option>
                    <optgroup label="Active Campaigns" className="font-medium">
                      <option value="1" className="py-2">
                        Sales Campaign (32 contacts)
                      </option>
                      <option value="2" className="py-2">
                        Follow-up Campaign (18 contacts)
                      </option>
                    </optgroup>
                    <optgroup label="Scheduled Campaigns" className="font-medium">
                      <option value="3" className="py-2">
                        Lead Generation (45 contacts)
                      </option>
                    </optgroup>
                  </select>
                  
                  {/* Custom dropdown arrow */}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Quick stats */}
                <div className="mt-3 grid grid-cols-3 gap-3">
                  <div className="bg-purple-50 rounded-lg p-2 text-center">
                    <div className="text-sm font-medium text-purple-800">32</div>
                    <div className="text-xs text-purple-600">Contacts</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2 text-center">
                    <div className="text-sm font-medium text-blue-800">18</div>
                    <div className="text-xs text-blue-600">Connected</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 text-center">
                    <div className="text-sm font-medium text-green-800">56%</div>
                    <div className="text-xs text-green-600">Success Rate</div>
                  </div>
                </div>
              </div>

              {/* Available Lines */}
              <div className="crm-tile">
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-800">Available Lines</h3>
                  </div>
                  <span className="text-sm text-gray-500">
                    {lines.filter(l => l.status === 'available').length} available
                  </span>
                </div>
                <div className="p-4">
                  <PowerDialerLines 
                    lines={lines}
                    onLineToggle={handleLineToggle}
                    isAutoDialing={isAutoDialing}
                    type="available"
                  />
                </div>
              </div>

              {/* RVM Settings */}
              <div className="crm-tile">
                <RVMSettings
                  enabled={useRVM}
                  onToggle={setUseRVM}
                  onSelect={setSelectedDropId}
                  selectedDropId={selectedDropId}
                />
              </div>

              {/* SMS Automation */}
              <div className="crm-tile">
                <SMSAutomation
                  enabled={useSMSAutomation}
                  onToggle={setUseSMSAutomation}
                />
              </div>
            </>
          ) : (
            <div className="iphone-frame">
              {/* iPhone frame */}
              <div className="mx-auto max-w-[280px] sm:max-w-[320px] bg-black rounded-[30px] sm:rounded-[50px] p-2 sm:p-3 shadow-lg border-6 sm:border-8 border-gray-800">
                {/* iPhone notch */}
                <div className="relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 sm:w-1/2 h-4 sm:h-6 bg-black rounded-b-2xl sm:rounded-b-3xl z-10"></div>
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-3 sm:h-5 bg-black rounded-b-lg sm:rounded-b-xl z-20"></div>
                </div>
                
                {/* iPhone screen */}
                <div className="rounded-[25px] sm:rounded-[40px] bg-gray-100 overflow-hidden relative pt-6 sm:pt-8 pb-6 sm:pb-8">
                  <SimpleDialer
                    number={number}
                    onNumberChange={handleNumberChange}
                    onCall={handleCall}
                    onSMS={handleSMS}
                    disabled={!isReady}
                    callStatus={callStatus}
                    isIncoming={isIncomingCall}
                    isOutgoing={isOutgoingCall}
                  />
                  
                  {/* iPhone home indicator */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Call Activity */}
        <div className="col-span-1 space-y-4 sm:space-y-6">
          {/* Play Button Tile - Moved here */}
          {powerDialer && (
            <div className="crm-tile p-6 flex justify-center">
              <ThreeDButton
                variant={isAutoDialing ? "danger" : "success"}
                size="xl"
                icon={isAutoDialing ? PauseCircle : Play}
                onClick={toggleAutoDial}
                isCircle={true}
                className="w-20 h-20"
              />
            </div>
          )}

          {/* Call Stats */}
          <div className="crm-tile p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Call Activity</h3>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-600">Total Calls</span>
                </div>
                <div className="text-lg sm:text-xl font-semibold text-purple-700">24</div>
              </div>
              <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <ClockIcon className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-600">Talk Time</span>
                </div>
                <div className="text-lg sm:text-xl font-semibold text-purple-700">2.5h</div>
              </div>
              <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-600">Contacts</span>
                </div>
                <div className="text-lg sm:text-xl font-semibold text-purple-700">12</div>
              </div>
            </div>
          </div>

          {/* Active Calls - Only show in power dialer mode */}
          {powerDialer && isAutoDialing && (
            <div className="crm-tile">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-800">Active Calls</h3>
                </div>
              </div>
              <div className="p-4">
                <PowerDialerLines 
                  lines={[]}
                  onLineToggle={handleLineToggle}
                  isAutoDialing={isAutoDialing}
                  type="active"
                />
              </div>
            </div>
          )}

          {/* Recent Calls - Only show in regular mode */}
          {!powerDialer && (
            <div className="crm-tile">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarClock className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-800">Recent Calls</h3>
                </div>
              </div>
              <div className="max-h-[300px] sm:max-h-[400px] overflow-y-auto">
                <RecentCalls calls={recentCalls} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scripts Section */}
      <div className="crm-tile">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-800">Call Scripts</h3>
          </div>
          <ThreeDButton
            variant="primary"
            size="sm"
            onClick={() => setShowScripts(!showScripts)}
          >
            {showScripts ? 'Hide Scripts' : 'Show Scripts'}
          </ThreeDButton>
        </div>
        
        {showScripts && <ScriptSection />}
      </div>

      {/* New Campaign Modal */}
      {showNewCampaignModal && (
        <NewCampaignModal
          onClose={() => setShowNewCampaignModal(false)}
          onSubmit={handleCreateCampaign}
          initialType="power-dialing"
        />
      )}

      {/* Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 overflow-hidden">
            <div className="p-4 sm:p-6 border-b flex items-center justify-between bg-purple-50">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-800">Call Activity Report</h3>
              </div>
              <button
                onClick={() => setShowStatsModal(false)}
                className="p-2 hover:bg-purple-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-purple-600" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-700">{callStats.totalCalls}</div>
                  <div className="text-sm text-purple-600">Total Calls</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">{callStats.connected}</div>
                  <div className="text-sm text-green-600">Connected</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">{callStats.voicemails}</div>
                  <div className="text-sm text-blue-600">Voicemails</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-amber-700">{callStats.notInterested}</div>
                  <div className="text-sm text-amber-600">Not Interested</div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-700">{callStats.avgDuration}</div>
                  <div className="text-sm text-indigo-600">Avg Duration</div>
                </div>
                <div className="bg-violet-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-violet-700">{callStats.totalDuration}</div>
                  <div className="text-sm text-violet-600">Total Duration</div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <ThreeDButton
                  variant="secondary"
                  size="md"
                  onClick={() => setShowStatsModal(false)}
                >
                  Close
                </ThreeDButton>
                <ThreeDButton
                  variant="primary"
                  size="md"
                  icon={BarChart2}
                >
                  Detailed Report
                </ThreeDButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}