import React from 'react';
import {
  CompanySection,
  SystemSection,
  TwilioSection,
  WebformSection,
  IntegrationsSection,
  BillingSection
} from './sections';

export function Settings() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <CompanySection />
      <SystemSection />
      <TwilioSection />
      <WebformSection />
      <IntegrationsSection />
      <BillingSection />
    </div>
  );
}