import React from 'react';
import { CreditCard, Calendar, Lock } from 'lucide-react';

interface PaymentMethodFormProps {
  onSubmit: (data: PaymentFormData) => void;
  isProcessing: boolean;
}

export interface PaymentFormData {
  cardNumber: string;
  expiry: string;
  cvc: string;
  name: string;
}

export function PaymentMethodForm({ onSubmit, isProcessing }: PaymentMethodFormProps) {
  const [formData, setFormData] = React.useState<PaymentFormData>({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cardholder Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Name on card"
          required
        />
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card Number
        </label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={formData.cardNumber}
            onChange={e => setFormData(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.expiry}
              onChange={e => setFormData(prev => ({ ...prev, expiry: formatExpiry(e.target.value) }))}
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="MM/YY"
              maxLength={5}
              required
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CVC
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.cvc}
              onChange={e => setFormData(prev => ({ ...prev, cvc: e.target.value.replace(/\D/g, '') }))}
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="123"
              maxLength={4}
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
          transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          'Update Payment Method'
        )}
      </button>
    </form>
  );
}