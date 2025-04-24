import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Calendar, MessageSquare, Clock, MapPin, 
  FileText, Tag, Check, Edit3, Star, Heart, Briefcase, DollarSign } from 'lucide-react';
import { LeadActivity } from './LeadActivity';
import { LeadSidebar } from './LeadSidebar';
import { useContacts } from '../../hooks/useContacts';
import { Lead } from '../../types/lead';
import { ThreeDButton } from '../ui/3DButton';

export function LeadInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contacts } = useContacts();
  
  // Find the lead from contacts
  const lead = contacts.find(contact => contact.id === id) as Lead | undefined;
  
  if (!lead) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Lead not found</h2>
        <ThreeDButton
          variant="primary"
          size="md"
          onClick={() => navigate('/')}
        >
          Return to Contacts
        </ThreeDButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">
            {lead.name} <span className="text-gray-500 text-base font-normal">({lead.temperature || 'Lead'})</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50 transition-colors">
            Archive
          </button>
          <ThreeDButton
            variant="primary"
            size="sm"
          >
            Edit Lead
          </ThreeDButton>
        </div>
      </div>
      
      {/* Main Content - 3 Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
        {/* Left Column - Lead Details */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow">
            {/* Lead Profile */}
            <div className="p-6 border-b">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{lead.name}</h2>
                  <p className="text-gray-500">{lead.tags?.[0] || 'Potential Client'}</p>
                </div>
              </div>
              
              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-800">{lead.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-800">{lead.email}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                  <span className="text-gray-800">{lead.address || '123 Business Ave, Suite 101, New York, NY 10001'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-800">{lead.propertyType || 'Business Services'}</span>
                </div>
              </div>
            </div>
            
            {/* Lead Status */}
            <div className="p-6 border-b">
              <h3 className="font-medium text-gray-800 mb-3">Lead Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className={`px-2 py-1 ${
                    lead.temperature === 'hot' ? 'bg-green-100 text-green-800' :
                    lead.temperature === 'warm' ? 'bg-amber-100 text-amber-800' :
                    'bg-blue-100 text-blue-800'
                  } text-xs rounded-full font-medium`}>
                    {lead.temperature ? `${lead.temperature.charAt(0).toUpperCase() + lead.temperature.slice(1)} Lead` : 'Lead'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Source</span>
                  <span className="text-sm font-medium">{lead.source || lead.leadSource || 'Website'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Created</span>
                  <span className="text-sm font-medium">{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Feb 10, 2025'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Owner</span>
                  <span className="text-sm font-medium">{lead.assignedTo || 'Account Manager'}</span>
                </div>
              </div>
            </div>
            
            {/* Deal Information */}
            <div className="p-6 border-b">
              <h3 className="font-medium text-gray-800 mb-3">Deal Information</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Deal Size</span>
                  <span className="text-sm font-medium text-green-600">
                    {lead.dealSize ? new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0
                    }).format(lead.dealSize) : '$25,000'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Service Type</span>
                  <span className="text-sm font-medium">{lead.propertyType || 'Premium Package'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Stage</span>
                  <span className="text-sm font-medium">{lead.stage || 'Pending'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Probability</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${lead.probability || 75}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tags */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-800">Tags</h3>
                <button className="text-sm text-purple-600 hover:text-purple-700">
                  Edit
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {lead.tags?.map((tag, index) => (
                  <span 
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
                  >
                    <Tag className="w-3 h-3" />
                    {tag.includes('Real Estate') ? 'Business Services' : tag}
                  </span>
                ))}
                {lead.temperature === 'hot' && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    <Star className="w-3 h-3" />
                    Priority Lead
                  </span>
                )}
                {lead.propertyType === 'Commercial' && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    <Briefcase className="w-3 h-3" />
                    Enterprise
                  </span>
                )}
                {lead.tags?.includes('Buyer') && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
                    <DollarSign className="w-3 h-3" />
                    Decision Maker
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Middle Column - Activity Timeline */}
        <div className="md:col-span-6">
          <LeadActivity leadId={lead.id} lead={lead} />
        </div>
        
        {/* Right Column - Tasks & Appointments */}
        <div className="md:col-span-3">
          <LeadSidebar leadId={lead.id} lead={lead} />
        </div>
      </div>
    </div>
  );
}