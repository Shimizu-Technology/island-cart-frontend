import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Check, X, MessageCircle, Phone, AlertTriangle } from 'lucide-react';
import { useOrder, updateOrderStatus } from '../../hooks/useOrders';
import { PrimaryButton } from '../../components/shared/PrimaryButton';
import { OrderStatusPill } from '../../components/shared/OrderStatusPill';
import { CartItem } from '../../types';

interface ShoppingItem extends CartItem {
  status: 'pending' | 'found' | 'unavailable' | 'substituted';
  notes?: string;
  substituteItem?: string;
}

export const OrderShoppingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { order, isLoading, mutate } = useOrder(orderId!);
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    if (order) {
      setShoppingItems(order.items.map(item => ({
        ...item,
        status: 'pending' as const
      })));
    }
  }, [order]);

  const updateItemStatus = (itemId: string, status: ShoppingItem['status'], notes?: string, substituteItem?: string) => {
    setShoppingItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, status, notes, substituteItem }
          : item
      )
    );
  };

  const handleCompleteOrder = async () => {
    setIsCompleting(true);
    try {
      await updateOrderStatus(orderId!, 'delivering', 15 * 60); // 15 minutes ETA
      await mutate();
      navigate('/driver');
    } catch (error) {
      console.error('Error completing order:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const allItemsProcessed = shoppingItems.every(item => item.status !== 'pending');
  const foundItems = shoppingItems.filter(item => item.status === 'found').length;
  const unavailableItems = shoppingItems.filter(item => item.status === 'unavailable').length;
  const substitutedItems = shoppingItems.filter(item => item.status === 'substituted').length;

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
          <h1 className="text-2xl font-bold text-gray-900">Shopping for Order #{order.id}</h1>
          <div className="flex items-center space-x-4 mt-1">
            <OrderStatusPill status={order.status} />
            <span className="text-sm text-gray-500">{order.deliveryWindow}</span>
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{shoppingItems.length}</div>
            <div className="text-sm text-gray-500">Total Items</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{foundItems}</div>
            <div className="text-sm text-gray-500">Found</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{substitutedItems}</div>
            <div className="text-sm text-gray-500">Substituted</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{unavailableItems}</div>
            <div className="text-sm text-gray-500">Unavailable</div>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Delivery Address</p>
            <p className="font-medium text-gray-900">{order.address}</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Text Customer</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">Call</span>
            </button>
          </div>
        </div>
      </div>

      {/* Shopping List */}
      <div className="space-y-4 mb-8">
        {shoppingItems.map(item => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-start space-x-4">
              <img
                src={item.item.image}
                alt={item.item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{item.item.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                    <span className="font-medium text-gray-900">
                      ${(item.item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{item.item.description}</p>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-sm text-gray-500">Customer prefers:</span>
                  <span className="text-sm font-medium text-gray-700">
                    {item.substitution === 'similar' && 'Similar item if unavailable'}
                    {item.substitution === 'none' && 'No substitution'}
                    {item.substitution === 'refund' && 'Refund if unavailable'}
                  </span>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-gray-500">Status:</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.status === 'found' ? 'bg-green-100 text-green-800' :
                    item.status === 'unavailable' ? 'bg-red-100 text-red-800' :
                    item.status === 'substituted' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status === 'pending' && 'Searching...'}
                    {item.status === 'found' && 'Found'}
                    {item.status === 'unavailable' && 'Unavailable'}
                    {item.status === 'substituted' && 'Substituted'}
                  </span>
                </div>

                {/* Action Buttons */}
                {item.status === 'pending' && (
                  <div className="flex flex-wrap gap-2">
                    <PrimaryButton
                      size="sm"
                      onClick={() => updateItemStatus(item.id, 'found')}
                      icon={Check}
                    >
                      Found Item
                    </PrimaryButton>
                    <PrimaryButton
                      size="sm"
                      variant="secondary"
                      onClick={() => updateItemStatus(item.id, 'substituted')}
                    >
                      Found Substitute
                    </PrimaryButton>
                    <PrimaryButton
                      size="sm"
                      variant="danger"
                      onClick={() => updateItemStatus(item.id, 'unavailable')}
                      icon={X}
                    >
                      Not Available
                    </PrimaryButton>
                  </div>
                )}

                {/* Substitute Input */}
                {item.status === 'substituted' && (
                  <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What did you substitute it with?
                    </label>
                    <input
                      type="text"
                      value={item.substituteItem || ''}
                      onChange={(e) => updateItemStatus(item.id, 'substituted', item.notes, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-teal-500 focus:border-ocean-teal-500"
                      placeholder="e.g., Organic bananas instead of regular bananas"
                    />
                  </div>
                )}

                {/* Notes Input */}
                {item.status !== 'pending' && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes (optional)
                    </label>
                    <textarea
                      value={item.notes || ''}
                      onChange={(e) => updateItemStatus(item.id, item.status, e.target.value, item.substituteItem)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-teal-500 focus:border-ocean-teal-500"
                      rows={2}
                      placeholder="Any additional notes for the customer..."
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Complete Order Button */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        {!allItemsProcessed && (
          <div className="flex items-center space-x-2 mb-4 p-3 bg-yellow-50 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span className="text-sm text-yellow-800">
              Please process all items before completing the order
            </span>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <PrimaryButton
            onClick={handleCompleteOrder}
            disabled={!allItemsProcessed || isCompleting}
            className="flex-1"
          >
            {isCompleting ? 'Completing Order...' : 'Complete Shopping & Start Delivery'}
          </PrimaryButton>
          
          <Link to="/driver" className="flex-shrink-0">
            <PrimaryButton variant="secondary" className="w-full sm:w-auto">
              Save & Continue Later
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};