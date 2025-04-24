import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { MainContent } from './components/layout/MainContent';
import { CallProvider } from './contexts/CallContext';
import { LeadInfo } from './components/leads/LeadInfo';
import { ContactProfile } from './components/contacts/ContactProfile';

function AppContent() {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const location = useLocation();

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