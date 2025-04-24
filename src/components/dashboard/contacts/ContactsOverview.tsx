import React from 'react';
import { Users, Star, UserPlus, Search } from 'lucide-react';
import { useContacts } from './hooks/useContacts';

export function ContactsOverview() {
  const { totalContacts, favoriteContacts, recentContacts } = useContacts();

  return (
    <div className="bg-white rounded-xl shadow-sm h-[364px]">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-purple-50 rounded-lg">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Address Book</h3>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <UserPlus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 gap-4">
          {/* Total Contacts */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-800">{totalContacts}</div>
            <div className="text-sm text-gray-600">Total Contacts</div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Favorites */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-purple-500" />
                <span className="text-xl font-bold text-gray-800">{favoriteContacts}</span>
              </div>
              <div className="text-xs text-gray-600 mt-0.5">Favorites</div>
            </div>

            {/* Recent */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xl font-bold text-gray-800">{recentContacts}</div>
              <div className="text-xs text-gray-600 mt-0.5">Recent</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}