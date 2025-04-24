import React, { useState } from 'react';
import { CreditCard, DollarSign, Plus, History, Wallet as WalletIcon, ArrowRight, AlertCircle } from 'lucide-react';
import { ThreeDButton } from '../ui/3DButton';

const PRESET_AMOUNTS = [20, 50, 100, 200, 500, 1000];

export function Wallet() {
  const [balance, setBalance] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [transactions] = useState([
    { id: '1', type: 'credit', amount: 100, date: '2025-04-10', description: 'Added credits' },
    { id: '2', type: 'debit', amount: 25, date: '2025-04-09', description: 'Used for calls' },
    { id: '3', type: 'credit', amount: 50, date: '2025-04-08', description: 'Added credits' },
  ]);

  const handleAddCredits = (amount: number) => {
    setSelectedAmount(amount);
    setShowPaymentModal(true);
  };

  const handleCustomAmount = () => {
    const amount = parseFloat(customAmount);
    if (!isNaN(amount) && amount > 0) {
      setSelectedAmount(amount);
      setShowPaymentModal(true);
    }
  };

  return (
    <div className="space-y-6 py-6">
      {/* Balance Card */}
      <div className="crm-tile p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <WalletIcon className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Wallet</h2>
            <p className="text-sm text-gray-600">Manage your credits and payments</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-24 -translate-x-24" />
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5" />
              <span className="text-white/80">Available Credits</span>
            </div>
            <div className="text-4xl font-bold mb-4">
              ${balance.toFixed(2)}
            </div>
            <ThreeDButton
              variant="secondary"
              size="md"
              icon={Plus}
              onClick={() => handleAddCredits(100)}
              className="bg-white/20 hover:bg-white/30 border-white/30"
            >
              Add Credits
            </ThreeDButton>
          </div>
        </div>
      </div>

      {/* Add Credits Section */}
      <div className="crm-tile p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Add Credits</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {PRESET_AMOUNTS.map((amount) => (
            <button
              key={amount}
              onClick={() => handleAddCredits(amount)}
              className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-colors group"
            >
              <div className="text-xl font-bold text-gray-800 group-hover:text-purple-600">
                ${amount}
              </div>
              <div className="text-sm text-gray-500 group-hover:text-purple-500">
                {amount === 20 ? 'Basic' : 
                 amount === 50 ? 'Starter' :
                 amount === 100 ? 'Popular' :
                 amount === 200 ? 'Business' :
                 amount === 500 ? 'Professional' :
                 'Enterprise'}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex gap-4">
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Enter custom amount"
            min="1"
            step="0.01"
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <ThreeDButton
            variant="primary"
            size="md"
            icon={ArrowRight}
            onClick={handleCustomAmount}
            disabled={!customAmount || parseFloat(customAmount) <= 0}
          >
            Continue
          </ThreeDButton>
        </div>
      </div>

      {/* Transaction History */}
      <div className="crm-tile">
        <div className="p-4 sm:p-6 border-b">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-800">Transaction History</h3>
          </div>
        </div>
        
        <div className="divide-y">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <DollarSign className={`w-5 h-5 ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
                <div>
                  <div className="font-medium text-gray-800">{transaction.description}</div>
                  <div className="text-sm text-gray-500">{transaction.date}</div>
                </div>
              </div>
              <div className={`font-medium ${
                transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Add Credits</h3>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-purple-800 font-medium">Adding ${selectedAmount.toFixed(2)} to your wallet</p>
                  <p className="text-sm text-purple-600 mt-1">
                    Your credits will be available immediately after payment
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 flex justify-end gap-3">
              <ThreeDButton
                variant="secondary"
                size="md"
                onClick={() => setShowPaymentModal(false)}
              >
                Cancel
              </ThreeDButton>
              <ThreeDButton
                variant="primary"
                size="md"
                icon={DollarSign}
                onClick={() => {
                  setBalance(prev => prev + selectedAmount);
                  setShowPaymentModal(false);
                }}
              >
                Pay ${selectedAmount.toFixed(2)}
              </ThreeDButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}