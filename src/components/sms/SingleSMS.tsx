import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Phone, Clock, Calendar, Search, Plus, X, Brain } from 'lucide-react';
import { ThreeDButton } from '../ui/3DButton';
import { AIResponseGenerator } from './AIResponseGenerator';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'contact';
  timestamp: string;
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastMessage?: string;
  lastActivity?: string;
  unread?: boolean;
}

export function SingleSMS() {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showContactSearch, setShowContactSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const recipientInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sample contacts
  const contacts: Contact[] = [
    { 
      id: '1',
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      email: "john@example.com",
      lastMessage: "Thanks for the update!",
      lastActivity: "2 hours ago",
      unread: true
    },
    { 
      id: '2',
      name: "Sarah Johnson",
      phone: "+1 (555) 987-6543",
      email: "sarah@example.com",
      lastMessage: "I'll check my schedule",
      lastActivity: "Yesterday",
      unread: false
    },
    { 
      id: '3',
      name: "Michael Brown",
      phone: "+1 (555) 456-7890",
      email: "michael@example.com",
      lastMessage: "Looking forward to our call",
      lastActivity: "3 days ago",
      unread: false
    },
    { 
      id: '4',
      name: "Emily Davis",
      phone: "+1 (555) 234-5678",
      email: "emily@example.com",
      lastMessage: "Perfect, thank you!",
      lastActivity: "1 week ago",
      unread: false
    },
    { 
      id: '5',
      name: "Robert Wilson",
      phone: "+1 (555) 567-8901",
      email: "robert@example.com",
      lastMessage: "Can we schedule a meeting?",
      lastActivity: "2 weeks ago",
      unread: true
    }
  ];

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Load sample messages when recipient changes
  useEffect(() => {
    if (recipient) {
      // Find contact info if available
      const contact = contacts.find(c => c.phone === recipient);
      
      // Simulate loading messages for this recipient
      const sampleMessages = [
        {
          id: '1',
          content: "Hi there! I'm interested in your services.",
          sender: 'contact' as const,
          timestamp: '10:30 AM'
        },
        {
          id: '2',
          content: "Thanks for reaching out! What specific services are you interested in?",
          sender: 'user' as const,
          timestamp: '10:32 AM'
        },
        {
          id: '3',
          content: "I'm looking for help with my business communications. Do you offer any monthly plans?",
          sender: 'contact' as const,
          timestamp: '10:35 AM'
        },
        {
          id: '4',
          content: "Yes, we have several monthly plans! Our most popular plan includes unlimited calling and 500 text messages for $49/month.",
          sender: 'user' as const,
          timestamp: '10:38 AM'
        }
      ];
      
      setMessages(sampleMessages);
      setSelectedContact(contact || {
        id: crypto.randomUUID(),
        name: recipient.startsWith("+") ? "Unknown" : recipient,
        phone: recipient,
        email: ''
      });
    } else {
      setMessages([]);
      setSelectedContact(null);
    }
  }, [recipient]);
  
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !message) return;
    
    setIsSending(true);
    
    // Add the new message to the conversation
    const newMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user' as const,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // In production, this would make an API call
    await new Promise(resolve => setTimeout(resolve, 600));
    setIsSending(false);
    
    // Reset message input
    setMessage('');
    
    // Simulate response after a short delay
    setTimeout(() => {
      const responseMessage = {
        id: Date.now().toString(),
        content: "Thanks for the information! That sounds perfect for my needs. Can we schedule a call to discuss the details?",
        sender: 'contact' as const,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 2000);
  };

  const handleSelectContact = (contact: Contact) => {
    setRecipient(contact.phone);
    setShowContactSearch(false);
    setSearchTerm('');
  };

  const handleNewContact = () => {
    // In a real app, this would open a new contact form
    alert('New contact form coming soon!');
  };

  const handleAIResponse = (response: string) => {
    setMessage(response);
    setShowAIGenerator(false);
  };
  
  return (
    <div className="crm-tile">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">SMS Conversations</h2>
      </div>
      
      <div className="grid grid-cols-3 h-[600px]">
        {/* Left sidebar - Contact list */}
        <div className="col-span-1 border-r">
          <div className="p-3 border-b">
            <div className="relative">
              <input
                type="text"
                ref={recipientInputRef}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowContactSearch(true);
                }}
                onFocus={() => setShowContactSearch(true)}
                placeholder="Search or enter number..."
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <div className="overflow-y-auto max-h-[calc(600px-56px)]">
            {contacts.map((contact) => (
              <div 
                key={contact.id}
                className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b ${
                  recipient === contact.phone ? 'bg-purple-50' : ''
                }`}
                onClick={() => handleSelectContact(contact)}
              >
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between">
                    <div className="font-medium text-gray-800 truncate">{contact.name}</div>
                    {contact.lastActivity && (
                      <span className="text-xs text-gray-500">{contact.lastActivity}</span>
                    )}
                  </div>
                  {contact.lastMessage && (
                    <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                  )}
                </div>
                {contact.unread && (
                  <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                )}
              </div>
            ))}

            {/* New Contact Button */}
            <button
              onClick={handleNewContact}
              className="w-full p-3 flex items-center gap-3 text-purple-600 hover:bg-purple-50 transition-colors"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <span className="font-medium">New Contact</span>
            </button>
          </div>
        </div>
        
        {/* Right side - Chat area */}
        <div className="col-span-2 flex flex-col">
          {/* Chat header */}
          {selectedContact && (
            <div className="p-3 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">{selectedContact.name}</div>
                  <div className="text-xs text-gray-500">{selectedContact.phone}</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <ThreeDButton
                  variant="info"
                  size="sm"
                  icon={Phone}
                  title="Call"
                />
                <ThreeDButton
                  variant="info"
                  size="sm"
                  icon={Calendar}
                  title="Schedule"
                />
              </div>
            </div>
          )}
          
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      msg.sender === 'user'
                        ? 'bg-purple-600 text-white rounded-tr-none shadow-sm'
                        : 'bg-white text-gray-800 rounded-tl-none shadow-sm border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 flex items-center gap-1 ${
                      msg.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
                    }`}>
                      <Clock className="w-3 h-3" />
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              recipient ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <p>No messages yet</p>
                    <p className="text-sm">Send a message to start the conversation</p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <p>Select a contact to view messages</p>
                    <p className="text-sm">Or enter a phone number to start a new conversation</p>
                  </div>
                </div>
              )
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message input */}
          <div className="p-3 border-t bg-white">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                disabled={!recipient}
              />
              <ThreeDButton
                variant="secondary"
                size="sm"
                icon={Brain}
                onClick={() => setShowAIGenerator(true)}
                disabled={!recipient || !messages.length}
                title="Generate AI Response"
              />
              <ThreeDButton
                type="submit"
                variant="primary"
                size="sm"
                icon={Send}
                disabled={isSending || !message.trim() || !recipient}
              />
            </form>
          </div>
        </div>
      </div>

      {/* AI Response Generator */}
      {showAIGenerator && messages.length > 0 && (
        <AIResponseGenerator
          message={messages[messages.length - 1].content}
          onGenerate={handleAIResponse}
          onClose={() => setShowAIGenerator(false)}
        />
      )}
    </div>
  );
}