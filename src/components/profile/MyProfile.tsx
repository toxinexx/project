import React from 'react';
import { CompanySection } from '../settings/sections/CompanySection';
import { SystemSection } from '../settings/sections/SystemSection';
import { TwilioSection } from '../settings/sections/TwilioSection';
import { WebformSection } from '../settings/sections/WebformSection';
import { IntegrationsSection } from '../settings/sections/integrations/IntegrationsSection';
import { BillingSection } from '../settings/sections/BillingSection';
import { DialerSection } from '../settings/sections/DialerSection';

export function MyProfile() {
  return (
    <div className="space-y-6">
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