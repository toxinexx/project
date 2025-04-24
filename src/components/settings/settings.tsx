import React from 'react';
import { CompanySection } from './sections/CompanySection';
import { SystemSection } from './sections/SystemSection';
import { TwilioSection } from './sections/TwilioSection';
import { WebformSection } from './sections/WebformSection';
import { IntegrationsSection } from './sections/integrations/IntegrationsSection';
import { BillingSection } from './sections/BillingSection';
import { DialerSection } from './sections/DialerSection';

export function Settings() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <CompanySection />
      <DialerSection />
      <SystemSection />
      <TwilioSection />
      <WebformSection />
      <IntegrationsSection />
      <BillingSection />
    </div>
  );
}