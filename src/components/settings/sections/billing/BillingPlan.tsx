import React from 'react';
import { Package } from 'lucide-react';

export function BillingPlan() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center gap-2">
        <Package className="w-5 h-5 text-blue-600" />
        <span className="font-medium text-blue-800">Current Plan: Professional</span>
      </div>
      <div className="mt-2 text-sm text-blue-600">
        $49/month • Unlimited calls • 5 phone numbers • Premium support
      </div>
    </div>
  );
}