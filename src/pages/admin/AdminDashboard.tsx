import React, { useState } from 'react';
import { InventoryTab } from './InventoryTab';
import { OrdersTab } from './OrdersTab';
import { SMSTab } from './SMSTab';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'sms'>('inventory');

  const tabs = [
    { id: 'inventory', label: 'Inventory' },
    { id: 'orders', label: 'Orders' },
    { id: 'sms', label: 'SMS Log' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your store operations</p>
      </div>

      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-ocean-teal-500 text-ocean-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {activeTab === 'inventory' && <InventoryTab />}
      {activeTab === 'orders' && <OrdersTab />}
      {activeTab === 'sms' && <SMSTab />}
    </div>
  );
};