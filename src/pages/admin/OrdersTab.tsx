import React, { useState } from 'react';
import { mockOrders, mockUsers } from '../../data/mockData';
import { Order } from '../../types';
import { OrderStatusPill } from '../../components/shared/OrderStatusPill';
import { formatDistanceToNow } from 'date-fns';

export const OrdersTab: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleDriverAssign = (orderId: string, driverId: string) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, driverId } : order
      )
    );
  };

  const drivers = mockUsers.filter(user => user.role === 'driver');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Management</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Driver</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Total</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Created</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => {
                const customer = mockUsers.find(u => u.id === order.customerId);
                const driver = order.driverId ? mockUsers.find(u => u.id === order.driverId) : null;
                
                return (
                  <tr key={order.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">#{order.id}</td>
                    <td className="py-3 px-4 text-gray-600">{customer?.name}</td>
                    <td className="py-3 px-4">
                      <OrderStatusPill status={order.status} />
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={order.driverId || ''}
                        onChange={(e) => handleDriverAssign(order.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="">Unassigned</option>
                        {drivers.map(driver => (
                          <option key={driver.id} value={driver.id}>
                            {driver.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">${order.total.toFixed(2)}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {formatDistanceToNow(new Date(order.createdAt))} ago
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="new">New</option>
                        <option value="shopping">Shopping</option>
                        <option value="delivering">Delivering</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};