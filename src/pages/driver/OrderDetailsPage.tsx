import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Package, User } from 'lucide-react';
import { useOrder } from '../../hooks/useOrders';
import { PrimaryButton } from '../../components/shared/PrimaryButton';
import { OrderStatusPill } from '../../components/shared/OrderStatusPill';
import { formatDistanceToNow } from 'date-fns';

export const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { order, isLoading } = useOrder(orderId!);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order not found</h1>
          <Link to="/driver">
            <PrimaryButton>Back to Dashboard</PrimaryButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Link to="/driver" className="mr-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
          <div className="flex items-center space-x-4 mt-1">
            <OrderStatusPill status={order.status} />
            <span className="text-sm text-gray-500">
              Placed {formatDistanceToNow(new Date(order.createdAt))} ago
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-ocean-teal-600">${order.total.toFixed(2)}</div>
          <div className="text-sm text-gray-500">{order.items.length} items</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Information */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Order Details
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Delivery Address</p>
                  <p className="text-sm">{order.address}</p>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Delivery Window</p>
                  <p className="text-sm">{order.deliveryWindow}</p>
                </div>
              </div>

              {order.eta && (
                <div className="flex items-center text-ocean-teal-600">
                  <Clock className="h-4 w-4 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Estimated Arrival</p>
                    <p className="text-sm">{Math.floor(order.eta / 60)} minutes</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Customer Information
            </h2>
            
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-900">Customer ID</p>
                <p className="text-sm text-gray-600">#{order.customerId}</p>
              </div>
              
              <div className="flex space-x-3 pt-2">
                <button className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                  <span className="text-sm font-medium">Send SMS</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  <span className="text-sm font-medium">Call Customer</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Items ({order.items.length})</h2>
          
          <div className="space-y-4">
            {order.items.map(item => (
              <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <img
                  src={item.item.image}
                  alt={item.item.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.item.name}</h3>
                  <p className="text-sm text-gray-500">{item.item.description}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                    <span className="font-medium text-gray-900">
                      ${(item.item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className="text-xs text-gray-500">
                      If unavailable: {item.substitution === 'similar' ? 'Similar item' : 
                                     item.substitution === 'none' ? 'No substitution' : 'Refund'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {order.status === 'shopping' && (
            <Link to={`/driver/orders/${order.id}/shopping`} className="flex-1">
              <PrimaryButton className="w-full">
                Continue Shopping
              </PrimaryButton>
            </Link>
          )}
          
          {order.status === 'delivering' && (
            <a
              href={`https://www.google.com/maps/dir/?api=1&origin=13.4443,144.7937&destination=${encodeURIComponent(order.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <PrimaryButton className="w-full">
                <MapPin className="h-4 w-4 mr-2" />
                Navigate to Customer
              </PrimaryButton>
            </a>
          )}
          
          <Link to="/driver" className="flex-shrink-0">
            <PrimaryButton variant="secondary" className="w-full sm:w-auto">
              Back to Dashboard
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};