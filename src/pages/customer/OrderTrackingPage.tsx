import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Package, ShoppingCart, Truck, CheckCircle } from 'lucide-react';
import { useOrder } from '../../hooks/useOrders';
import { formatDistanceToNow } from 'date-fns';

export const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { order, isLoading } = useOrder(orderId!);
  const [etaMinutes, setEtaMinutes] = useState<number | null>(null);

  useEffect(() => {
    if (order?.eta) {
      const minutes = Math.floor(order.eta / 60);
      setEtaMinutes(minutes);
    }
  }, [order]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order not found</h1>
          <p className="text-gray-500">The order you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const steps = [
    { key: 'new', label: 'Order Placed', icon: Package, completed: true },
    { key: 'shopping', label: 'Shopping', icon: ShoppingCart, completed: ['shopping', 'delivering', 'delivered'].includes(order.status) },
    { key: 'delivering', label: 'Out for Delivery', icon: Truck, completed: ['delivering', 'delivered'].includes(order.status) },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle, completed: order.status === 'delivered' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order #{order.id}</h1>
        <p className="text-gray-600">
          Placed {formatDistanceToNow(new Date(order.createdAt))} ago
        </p>
        {etaMinutes && (
          <p className="text-ocean-teal-600 font-medium mt-2">
            ETA: {etaMinutes} minutes
          </p>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Status</h2>
        
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = order.status === step.key;
            const isCompleted = step.completed;
            
            return (
              <div key={step.key} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  isCompleted 
                    ? 'bg-ocean-teal-600 text-white' 
                    : isActive 
                    ? 'bg-ocean-teal-100 text-ocean-teal-600' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className={`text-lg font-medium ${
                    isCompleted || isActive ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </h3>
                  {isActive && (
                    <p className="text-sm text-ocean-teal-600">In progress</p>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-px h-8 ml-5 ${
                    isCompleted ? 'bg-ocean-teal-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
          <div className="space-y-3">
            {order.items.map(item => (
              <div key={item.id} className="flex items-center space-x-4">
                <img
                  src={item.item.image}
                  alt={item.item.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.item.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="font-medium text-gray-900">
                  ${(item.item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Details</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-gray-900">Address</h3>
              <p className="text-gray-600">{order.address}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Delivery Window</h3>
              <p className="text-gray-600">{order.deliveryWindow}</p>
            </div>
            <div className="pt-3 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};