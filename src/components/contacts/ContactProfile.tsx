import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Calendar, MessageSquare, Clock, MapPin, 
  FileText, Tag, Check, Edit3, Star, Heart, Briefcase, DollarSign, Send } from 'lucide-react';
import { useContacts } from '../../hooks/useContacts';
import { ThreeDButton } from '../ui/3DButton';
import { ContactActivity } from './ContactActivity';
import { ContactSidebar } from './ContactSidebar';

export function ContactProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { contacts, isLoading } = useContacts();
  
  // Find the contact
  const contact = contacts.find(contact => contact.id === id);
  
  // If still loading, show a loading indicator instead of "contact not found"
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading contact information...</p>
        </div>
      </div>
    );
  }
  
  // Only show contact not found after loading is complete
  if (!contact) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact not found</h2>
        <p className="text-gray-600 mb-6">
          The contact with ID {id} could not be found.
        </p>
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
            {contact.name} <span className="text-gray-500 text-base font-normal">({contact.source})</span>
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
            Edit Contact
          </ThreeDButton>
        </div>
      </div>
      
      {/* Main Content - 3 Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
        {/* Left Column - Contact Details */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow">
            {/* Contact Profile */}
            <div className="p-6 border-b">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{contact.name}</h2>
                  <p className="text-gray-500">{contact.source}</p>
                </div>
              </div>
              
              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-800">{contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-800">{contact.email}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                  <span className="text-gray-800">
                    {contact.address || '123 Business Ave, Suite 101, New York, NY 10001'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-800">
                    {(contact as any).company || 'Business Consulting'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Contact Status */}
            <div className="p-6 border-b">
              <h3 className="font-medium text-gray-800 mb-3">Contact Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className={`px-2 py-1 ${
                    contact.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  } text-xs rounded-full font-medium`}>
                    {contact.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Source</span>
                  <span className="text-sm font-medium">{contact.source}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Created</span>
                  <span className="text-sm font-medium">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Owner</span>
                  <span className="text-sm font-medium">
                    {(contact as any).assignedTo || 'Account Manager'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Deal Information */}
            <div className="p-6 border-b">
              <h3 className="font-medium text-gray-800 mb-3">Engagement</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Calls</span>
                  <span className="text-sm font-medium text-blue-600">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Emails</span>
                  <span className="text-sm font-medium text-blue-600">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">SMS</span>
                  <span className="text-sm font-medium text-blue-600">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Last Contact</span>
                  <span className="text-sm font-medium">{contact.lastActivity}</span>
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
                {contact.tags?.map((tag, index) => (
                  <span 
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
                  >
                    <Tag className="w-3 h-3" />
                    {tag.includes('Real Estate') ? 'Business' : tag}
                  </span>
                ))}
                {contact.tags?.includes('Hot Lead') && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                    <Star className="w-3 h-3" />
                    Priority Lead
                  </span>
                )}
                {contact.tags?.includes('Real Estate') && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    <Briefcase className="w-3 h-3" />
                    Business
                  </span>
                )}
                {!contact.tags || contact.tags.length === 0 && (
                  <span className="text-sm text-gray-500 italic">No tags added yet</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Middle Column - Activity Timeline */}
        <div className="md:col-span-6">
          <ContactActivity contactId={contact.id} contact={contact} />
        </div>
        
        {/* Right Column - Tasks & Appointments */}
        <div className="md:col-span-3">
          <ContactSidebar contactId={contact.id} contact={contact} />
        </div>
      </div>
    </div>
  );
}