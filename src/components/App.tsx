import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './layout/Header';
import { MainContent } from './layout/MainContent';
import { CallProvider } from '../contexts/CallContext';
import { LeadInfo } from './leads/LeadInfo';
import { ContactProfile } from './contacts/ContactProfile';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const location = useLocation();

  // Log the current location for debugging
  console.log('Current location:', location);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={<MainContent activeTab={activeTab} setActiveTab={setActiveTab} />} 
        />
        <Route 
          path="/contacts/:id" 
          element={<ContactProfile />} 
        />
        <Route 
          path="/leads/:id" 
          element={<LeadInfo />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export function App() {
  return (
    <CallProvider>
      <AppContent />
    </CallProvider>
  );
}