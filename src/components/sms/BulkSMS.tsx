import React, { useState, useEffect } from 'react';
import { MessageSquare, Plus, Send, ChevronDown, ChevronUp, Sparkles, BookTemplate as Template, Copy, ArrowRight, User, Clock } from 'lucide-react';
import { Campaign } from '../../types/campaign';
import { NewCampaignModal } from '../campaigns/NewCampaignModal';
import { ThreeDButton } from '../ui/3DButton';
import { MessageTemplateSelector } from './MessageTemplateSelector';
import { AITemplateGenerator } from './AITemplateGenerator';

interface BulkSMSProps {
  campaigns: Campaign[];
  onAddCampaign: (campaign: Campaign) => void;
}

export function BulkSMS({ campaigns, onAddCampaign }: BulkSMSProps) {
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [sentMessages, setSentMessages] = useState<SentMessage[]>([]);
  const [receivedMessages, setReceivedMessages] = useState<ReceivedMessage[]>([]);
  const [activeRecipientIndex, setActiveRecipientIndex] = useState(0);
  const [showDeliveryStatus, setShowDeliveryStatus] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  
  type SentMessage = {
    id: string;
    content: string;
    timestamp: string;
    recipients: number;
    status: 'sending' | 'delivered' | 'failed';
    recipientDeliveries?: {
      name: string;
      phone: string;
      deliveredAt?: string;
    }[];
  };
  
  type ReceivedMessage = {
    id: string;
    content: string;
    timestamp: string;
    sender: {
      name: string;
      phone: string;
    };
  };
  
  // Pre-defined templates
  const templates = [
    {
      id: '1',
      name: 'Appointment Reminder',
      content: 'Hi {name}, this is a friendly reminder of your upcoming appointment on {date} at {time}. Reply CONFIRM to confirm or RESCHEDULE to reschedule.'
    },
    {
      id: '2',
      name: 'Special Offer',
      content: 'Hi {name}! We have a special offer just for you: 20% off our premium services until the end of the month. Call us at {phone} to claim this offer!'
    },
    {
      id: '3',
      name: 'Follow-up',
      content: 'Hi {name}, thanks for your recent interest in our services. I\'d love to follow up with you. Is there a good time for us to connect this week?'
    },
    {
      id: '4',
      name: 'Thank You',
      content: 'Thank you, {name}, for choosing our services! We appreciate your business and look forward to working with you. Feel free to reach out with any questions!'
    }
  ];
  
  // Set up rotation for the delivery status updates
  useEffect(() => {
    if (sentMessages.length > 0 && sentMessages[0].recipientDeliveries && sentMessages[0].recipientDeliveries.length > 0) {
      setShowDeliveryStatus(true);
      
      // Set up interval to rotate through recipients every 3 seconds
      const interval = setInterval(() => {
        const recipientCount = sentMessages[0].recipientDeliveries?.length || 0;
        setActiveRecipientIndex(prev => (prev + 1) % recipientCount);
      }, 3000);
      
      // Clean up interval
      return () => clearInterval(interval);
    }
    
    return undefined;
  }, [sentMessages]);
  
  // Load some sample received messages
  useEffect(() => {
    const sampleReceivedMessages: ReceivedMessage[] = [
      {
        id: '1',
        content: 'Yes, I can make it to the appointment. Thank you for the reminder!',
        timestamp: '10:15 AM',
        sender: {
          name: 'John Smith',
          phone: '+1 (555) 123-4567'
        }
      },
      {
        id: '2',
        content: 'I would like to reschedule my appointment to next week if possible.',
        timestamp: 'Yesterday',
        sender: {
          name: 'Sarah Johnson',
          phone: '+1 (555) 234-5678'
        }
      },
      {
        id: '3',
        content: 'Thanks for the offer! Can you tell me more about your premium services?',
        timestamp: '2 days ago',
        sender: {
          name: 'Michael Brown',
          phone: '+1 (555) 345-6789'
        }
      }
    ];
    
    setReceivedMessages(sampleReceivedMessages);
  }, []);
  
  // Filter SMS and convertible campaigns
  useEffect(() => {
    const smsCompatibleCampaigns = campaigns.filter(campaign => {
      // Include bulk-sms campaigns
      if (campaign.type === 'bulk-sms') return true;
      
      // Include power-dialing campaigns that have contacts
      if (campaign.type === 'power-dialing' && campaign.contacts && campaign.contacts.length > 0) return true;
      
      return false;
    });
    
    setFilteredCampaigns(smsCompatibleCampaigns);
  }, [campaigns]);
  
  // Auto-fill message if campaign has a template
  useEffect(() => {
    if (selectedCampaign?.settings?.messageTemplate) {
      setMessage(selectedCampaign.settings.messageTemplate);
    }
  }, [selectedCampaign]);
  
  const handleCreateCampaign = (campaign: Campaign) => {
    // Force the type to be 'bulk-sms'
    const bulkSMSCampaign = {
      ...campaign,
      type: 'bulk-sms' as const
    };
    onAddCampaign(bulkSMSCampaign);
    setSelectedCampaign(bulkSMSCampaign);
    setShowNewCampaignModal(false);
  };
  
  const handleSendBulk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaign || !message) return;
    
    setIsSending(true);
    
    // Set up recipient deliveries tracking for animation
    const recipientDeliveries = selectedCampaign.contacts.map(contact => ({
      name: contact.name || 'Contact',
      phone: contact.phone || '+1 (555) 000-0000'
    }));
    
    // Create a new sent message record
    const newSentMessage: SentMessage = {
      id: crypto.randomUUID(),
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      recipients: selectedCampaign.contacts.length,
      status: 'sending',
      recipientDeliveries
    };
    
    setSentMessages([newSentMessage, ...sentMessages]);
    
    // In production, this would make API calls to send messages to all contacts
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update message status to delivered
    setSentMessages(prev => prev.map(msg => 
      msg.id === newSentMessage.id ? { ...msg, status: 'delivered' } : msg
    ));
    
    setIsSending(false);
    setMessage('');
    
    // Simulate a reply after some time
    setTimeout(() => {
      const randomContact = selectedCampaign.contacts[
        Math.floor(Math.random() * selectedCampaign.contacts.length)
      ];
      
      if (randomContact) {
        const newReply: ReceivedMessage = {
          id: crypto.randomUUID(),
          content: 'Thank you for your message! I appreciate the information.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sender: {
            name: randomContact.name || 'Customer',
            phone: randomContact.phone || '+1 (555) 000-0000'
          }
        };
        
        setReceivedMessages([newReply, ...receivedMessages]);
      }
    }, 3000);
  };

  const handleSelectTemplate = (templateContent: string) => {
    setMessage(templateContent);
    setShowTemplateSelector(false);
  };

  const handleGenerateAITemplate = (templateContent: string) => {
    setMessage(templateContent);
    setShowAIGenerator(false);
  };

  const handleCampaignChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    
    // Handle "New Campaign" option
    if (value === "new_campaign") {
      setShowNewCampaignModal(true);
      return;
    }
    
    // Handle regular campaign selection
    const campaign = filteredCampaigns.find(c => c.id === value);
    if (campaign) {
      setSelectedCampaign(campaign);
    } else {
      setSelectedCampaign(null);
    }
  };
  
  const handleReply = (message: ReceivedMessage) => {
    // Show the user that we're processing the reply action
    setIsReplying(true);
    
    // Navigate to SMS tab to reply to this conversation
    const smsTab = document.querySelector('[data-tab="sms"]');
    if (smsTab) {
      // Click the SMS tab
      (smsTab as HTMLElement).click();
      
      // Wait for tab change and then populate the recipient
      // Increased timeout to give more time for the tab to load
      setTimeout(() => {
        try {
          // More specific selector to find the input in SingleSMS component
          // Try multiple potential selectors to increase chances of finding it
          const possibleSelectors = [
            'input[placeholder="Search or enter number..."]',
            '.crm-tile input[placeholder="Search or enter number..."]',
            'div[class*="crm-tile"] input[type="text"]',
            'form input[type="text"]'
          ];
          
          let recipientInput = null;
          
          // Try each selector until we find the input
          for (const selector of possibleSelectors) {
            recipientInput = document.querySelector(selector);
            if (recipientInput) break;
          }
          
          if (recipientInput) {
            // Set the value and trigger change event
            (recipientInput as HTMLInputElement).value = message.sender.phone;
            
            // Create a proper input event that will trigger React's onChange handlers
            const inputEvent = new Event('input', { bubbles: true, cancelable: true });
            recipientInput.dispatchEvent(inputEvent);
            
            // Also dispatch a change event for components that might listen to onChange
            const changeEvent = new Event('change', { bubbles: true });
            recipientInput.dispatchEvent(changeEvent);
            
            // Focus the message input
            setTimeout(() => {
              const messageInput = document.querySelector('input[placeholder="Type a message..."]');
              if (messageInput) {
                (messageInput as HTMLInputElement).focus();
              }
            }, 300);
            
            // Reset the replying status after everything is done
            setIsReplying(false);
          } else {
            console.error("Could not find recipient input field");
            setIsReplying(false);
          }
        } catch (error) {
          console.error("Error finding recipient input:", error);
          setIsReplying(false);
        }
      }, 1000); // Increased timeout for more reliability
    } else {
      console.error("Could not find SMS tab");
      setIsReplying(false);
    }
  };
  
  const getDeliveryStatus = () => {
    if (sentMessages.length === 0 || !sentMessages[0].recipientDeliveries) {
      return null;
    }
    
    const currentRecipient = sentMessages[0].recipientDeliveries[activeRecipientIndex];
    if (!currentRecipient) return null;
    
    return (
      <div className="bg-green-200 p-4 rounded-lg border-2 border-green-400 mb-4 animate-[pulse_2s_ease-in-out_infinite] shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-500 rounded-full p-2 shadow-inner">
              <Send className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-medium text-green-900">
                Message delivered to <span className="font-bold text-green-700">{currentRecipient.name}</span>
              </p>
              <p className="text-xs text-green-700">{currentRecipient.phone}</p>
            </div>
          </div>
          <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm">
            Delivered
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="crm-tile">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Bulk SMS</h2>
            <p className="mt-1 text-gray-600">
              Send text messages to multiple recipients using campaigns
            </p>
          </div>
          <ThreeDButton
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => setShowNewCampaignModal(true)}
          >
            New Campaign
          </ThreeDButton>
        </div>
      </div>
      
      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {/* Left Column - Campaign Selection and Message Composition */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Select Campaign
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              value={selectedCampaign?.id || ""}
              onChange={handleCampaignChange}
            >
              <option value="">Select a campaign</option>
              <option value="new_campaign" className="font-medium text-purple-600">+ New Campaign</option>
              {filteredCampaigns.length > 0 && <option disabled>─────────────</option>}
              {filteredCampaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.name} ({campaign.type === 'bulk-sms' ? 'SMS Campaign' : 'Call Campaign'}) - {campaign.contacts.length} contacts
                </option>
              ))}
            </select>
          </div>
          
          {filteredCampaigns.length === 0 && !showNewCampaignModal && (
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-gray-500">No campaigns available. Create a new campaign to get started.</p>
            </div>
          )}
          
          {selectedCampaign && (
            <form onSubmit={handleSendBulk} className="space-y-6 mt-6 pt-6 border-t">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Message Content
                  </label>
                  <div className="flex gap-2">
                    <span className="text-xs text-gray-500 self-center">
                      Will be sent to {selectedCampaign.contacts.length} recipients
                    </span>
                    <div className="flex">
                      <ThreeDButton
                        variant="info"
                        size="sm"
                        icon={Template}
                        onClick={() => {
                          setShowTemplateSelector(!showTemplateSelector);
                          setShowAIGenerator(false);
                        }}
                        title="Select from templates"
                      >
                        Templates
                      </ThreeDButton>
                      <ThreeDButton
                        variant="secondary"
                        size="sm"
                        icon={Sparkles}
                        onClick={() => {
                          setShowAIGenerator(!showAIGenerator);
                          setShowTemplateSelector(false);
                        }}
                        title="Generate with AI"
                        className="ml-2"
                      >
                        AI
                      </ThreeDButton>
                    </div>
                  </div>
                </div>

                {showTemplateSelector && (
                  <MessageTemplateSelector 
                    templates={templates} 
                    onSelect={handleSelectTemplate}
                    onClose={() => setShowTemplateSelector(false)}
                  />
                )}

                {showAIGenerator && (
                  <AITemplateGenerator
                    onGenerate={handleGenerateAITemplate}
                    onClose={() => setShowAIGenerator(false)}
                  />
                )}

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-3 py-2 border border-primary-100 rounded-md resize-none h-32 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
                <div className="flex justify-between mt-1 text-sm text-gray-500">
                  <div>
                    <span className="text-xs">
                      Use {'{name}'} to personalize with contact name
                    </span>
                  </div>
                  <div>
                    <span>{message.length}</span>
                    <span className="text-gray-400">/160 characters</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <ThreeDButton
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={MessageSquare}
                  disabled={isSending || !message || selectedCampaign.contacts.length === 0}
                >
                  {isSending ? 'Sending...' : `Send to ${selectedCampaign.contacts.length} Recipients`}
                </ThreeDButton>
              </div>
            </form>
          )}
        </div>
        
        {/* Right Column - Message Preview and Replies */}
        <div className="p-6 flex flex-col h-[600px]">
          {/* Delivery Status Animation - Shows which contact received the message */}
          {showDeliveryStatus && sentMessages.length > 0 && getDeliveryStatus()}
          
          {/* Replies Section - Now takes full height */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-green-600" />
                Recent Replies
              </h3>
            </div>
            
            <div className="space-y-4">
              {receivedMessages.length > 0 ? (
                receivedMessages.map((message) => (
                  <div key={message.id} className="bg-green-50 p-4 rounded-lg border border-green-100 relative hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                        <User className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <p className="font-medium text-gray-800">{message.sender.name}</p>
                          <p className="text-xs text-gray-500">{message.sender.phone}</p>
                        </div>
                        <p className="text-gray-700 mt-1">{message.content}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <ThreeDButton
                        variant="secondary"
                        size="sm"
                        icon={Send}
                        onClick={() => handleReply(message)}
                        disabled={isReplying}
                      >
                        {isReplying ? 'Opening...' : 'Reply'}
                      </ThreeDButton>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-20" />
                  <p>No replies yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {showNewCampaignModal && (
        <NewCampaignModal
          onClose={() => setShowNewCampaignModal(false)}
          onSubmit={handleCreateCampaign}
          initialType="bulk-sms"
        />
      )}
    </div>
  );
}