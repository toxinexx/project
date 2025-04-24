import React, { useState } from 'react';
import { User, X, Building2, Phone, Settings, Puzzle, CreditCard } from 'lucide-react';
import { CompanySection } from '../settings/sections/CompanySection';
import { SystemSection } from '../settings/sections/SystemSection';
import { TwilioSection } from '../settings/sections/TwilioSection';
import { IntegrationsSection } from '../settings/sections/integrations/IntegrationsSection';
import { BillingSection } from '../settings/sections/BillingSection';
import { DialerSection } from '../settings/sections/DialerSection';

interface UserMenuProps {
  logo?: string;
  name?: string;
}

type TabId = 'company' | 'dialer' | 'system' | 'phone' | 'integrations' | 'billing';

interface Tab {
  id: TabId;
  name: string;
  icon: React.ElementType;
  component: React.ComponentType;
}

export function UserMenu({ logo, name }: UserMenuProps) {
  const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('company');

  const tabs: Tab[] = [
    { id: 'company', name: 'Company', icon: Building2, component: CompanySection },
    { id: 'dialer', name: 'Dialer', icon: Phone, component: DialerSection },
    { id: 'system', name: 'System', icon: Settings, component: SystemSection },
    { id: 'phone', name: 'Phone', icon: Phone, component: TwilioSection },
    { id: 'integrations', name: 'Integrations', icon: Puzzle, component: IntegrationsSection },
    { id: 'billing', name: 'Billing', icon: CreditCard, component: BillingSection }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <>
      <button
        onClick={() => setShowProfile(true)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        {logo ? (
          <img src={logo} alt={name} className="w-full h-full object-cover rounded-full" />
        ) : (
          <User className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Profile Modal */}
      {showProfile && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowProfile(false)}
          />
          <div className="fixed inset-4 sm:inset-8 bg-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-4 bg-white border-b">
                <h2 className="text-xl font-semibold text-gray-800">My Profile</h2>
                <button
                  onClick={() => setShowProfile(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-64 bg-white border-r overflow-y-auto">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-500'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {ActiveComponent && <ActiveComponent />}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}