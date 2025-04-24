import React from 'react';
import { CreditCard } from 'lucide-react';
import { PaymentMethodForm } from './billing/PaymentMethodForm';
import { BillingStatements } from './billing/BillingStatements';
import { usePaymentMethod } from './billing/hooks/usePaymentMethod';

export function BillingSection() {
  const { isProcessing, error, updatePaymentMethod } = usePaymentMethod();

  return (
    <div className="crm-tile">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-gray-500" />
          <h2 className="text-xl font-semibold text-gray-800">Billing & Payment</h2>
        </div>
        <p className="mt-1 text-sm text-gray-600">
          Manage your payment information and billing preferences
        </p>
      </div>

      <div className="p-6 space-y-8">
        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="max-w-xl">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Method</h3>
          <PaymentMethodForm
            onSubmit={updatePaymentMethod}
            isProcessing={isProcessing}
          />
        </div>

        <div className="border-t pt-8">
          <BillingStatements />
        </div>
      </div>
    </div>
  );
}