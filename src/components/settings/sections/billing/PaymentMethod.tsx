import React from 'react';
import { CreditCard } from 'lucide-react';
import { Input } from '../../controls/Input';

export function PaymentMethod() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Card Number"
          icon={CreditCard}
          placeholder="•••• •••• •••• ••••"
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Expiry"
            placeholder="MM/YY"
          />
          <Input
            label="CVC"
            placeholder="•••"
            type="password"
          />
        </div>
      </div>
      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        Update Payment Method
      </button>
    </div>
  );
}