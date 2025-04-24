import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';
import { useBillingStatements } from './hooks/useBillingStatements';

export function BillingStatements() {
  const { statements, downloadStatement } = useBillingStatements();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800">Monthly Statements</h3>
      
      <div className="border rounded-lg divide-y">
        {statements.map((statement) => (
          <div key={statement.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <FileText className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{statement.month}</h4>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{statement.date}</span>
                  <span className="text-gray-300">•</span>
                  <span>{statement.amount}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => downloadStatement(statement.id)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 
                rounded-lg transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Download PDF</span>
            </button>
          </div>
        ))}

        {statements.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No statements available yet
          </div>
        )}
      </div>
    </div>
  );
}